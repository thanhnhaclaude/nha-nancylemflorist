import { NextResponse, after } from "next/server";
import { priceCart } from "@/lib/catalog";
import { checkoutSchema, fieldErrors } from "@/lib/schemas";
import { insert, mutate, newId, type OrderRecord } from "@/lib/store";
import { sendOrderEmails } from "@/lib/mailer";
import { paymentsEnabled, stripe } from "@/lib/payments";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

const cents = (n: number) => Math.round(n * 100);

/** Absolute base URL for Stripe redirects: the site URL, or the local dev origin. */
function baseUrl(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && (origin === site.url || /^http:\/\/localhost:\d+$/.test(origin))) return origin;
  return site.url;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`checkout:${ip}`, 10, 10 * 60_000)) {
    return NextResponse.json({ message: "Too many attempts. Please wait a few minutes or call us." }, { status: 429 });
  }

  const parsed = checkoutSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the highlighted fields.", errors: fieldErrors(parsed.error) }, { status: 422 });
  }
  const { company, items: lines, agreeTerms: _agreed, ...details } = parsed.data;
  if (company) return NextResponse.json({ id: newId("NF") });

  const cart = priceCart(lines);
  if (cart.items.length === 0) {
    return NextResponse.json({ message: "The items in your cart are no longer available." }, { status: 422 });
  }

  const online = paymentsEnabled();
  const record: OrderRecord = {
    ...details,
    id: newId("NF"),
    createdAt: new Date().toISOString(),
    status: online ? "awaiting_payment" : "new",
    payment: online ? "stripe" : "request",
    items: cart.items.map((i) => ({
      slug: i.slug,
      name: i.product.name,
      size: i.size,
      sizeLabel: i.sizeLabel,
      addOns: i.addOns,
      addOnLabels: i.addOnLabels,
      qty: i.qty,
      unit: i.unit,
      lineTotal: i.lineTotal,
    })),
    subtotal: cart.subtotal,
    delivery: cart.delivery,
    total: cart.total,
    ip,
  };

  try {
    await insert("orders", record);
  } catch (e) {
    console.error("[checkout] save failed:", e);
    return NextResponse.json({ message: "We couldn't save your order. Please call us to complete it." }, { status: 500 });
  }

  if (!online) {
    after(() => sendOrderEmails(record));
    return NextResponse.json({ id: record.id, redirect: `/order/thank-you?ref=${record.id}` }, { status: 201 });
  }

  const base = baseUrl(req);
  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      client_reference_id: record.id,
      customer_email: record.senderEmail,
      metadata: { orderId: record.id, deliveryDate: record.deliveryDate },
      payment_intent_data: {
        description: `${site.name} order ${record.id}`,
        metadata: { orderId: record.id },
      },
      line_items: [
        ...cart.items.map((i) => ({
          quantity: i.qty,
          price_data: {
            currency: "usd",
            unit_amount: cents(i.unit),
            product_data: {
              name: `${i.product.name}${i.sizeLabel ? ` — ${i.sizeLabel}` : ""}`,
              description: i.addOnLabels.length ? `Includes: ${i.addOnLabels.join(", ")}` : i.product.short,
              images: base.startsWith("https://") ? [`${base}${i.product.image}`] : undefined,
            },
          },
        })),
        ...(cart.delivery > 0
          ? [{ quantity: 1, price_data: { currency: "usd", unit_amount: cents(cart.delivery), product_data: { name: "Hand delivery" } } }]
          : []),
      ],
      automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "true" },
      success_url: `${base}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/checkout?canceled=1`,
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
    });

    await mutate("orders", record.id, (o) => ({ ...o, stripeSessionId: session.id }));
    return NextResponse.json({ id: record.id, redirect: session.url }, { status: 201 });
  } catch (e) {
    console.error("[checkout] stripe session failed:", (e as Error).message);
    await mutate("orders", record.id, (o) => ({ ...o, status: "cancelled", adminNote: "Stripe session could not be created" }));
    return NextResponse.json(
      { message: "Our payment page is temporarily unavailable. Please try again in a minute or call us to order." },
      { status: 502 },
    );
  }
}
