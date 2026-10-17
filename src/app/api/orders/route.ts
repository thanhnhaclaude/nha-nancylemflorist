import { NextResponse, after } from "next/server";
import { getProduct, quote, addOns, type AddOnId, type SizeId } from "@/lib/catalog";
import { fieldErrors, orderSchema } from "@/lib/schemas";
import { insert, newId, type OrderRecord } from "@/lib/store";
import { sendOrderEmails } from "@/lib/mailer";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`order:${ip}`, 8, 10 * 60_000)) {
    return NextResponse.json({ message: "Too many requests. Please wait a few minutes or call us." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the highlighted fields.", errors: fieldErrors(parsed.error) }, { status: 422 });
  }
  const { company, ...data } = parsed.data;
  // Honeypot filled: pretend success so bots learn nothing.
  if (company) return NextResponse.json({ id: newId("NF") });

  const product = getProduct(data.productSlug);
  if (!product) return NextResponse.json({ message: "That arrangement is no longer available." }, { status: 404 });

  const q = quote(product, data.size as SizeId, data.addOns as AddOnId[]);
  const record: OrderRecord = {
    ...data,
    size: product.singleSize ? "classic" : data.size,
    id: newId("NF"),
    createdAt: new Date().toISOString(),
    status: "new",
    productName: product.name,
    sizeLabel: product.singleSize ? "" : q.size.label,
    addOnLabels: addOns.filter((a) => data.addOns.includes(a.id)).map((a) => `${a.label} (+$${a.price})`),
    subtotal: q.subtotal,
    delivery: q.delivery,
    total: q.total,
    ip,
  };

  try {
    await insert("orders", record);
  } catch (e) {
    console.error("[orders] save failed:", e);
    return NextResponse.json({ message: "We couldn't save your order. Please call us to complete it." }, { status: 500 });
  }

  after(() => sendOrderEmails(record));
  return NextResponse.json({ id: record.id }, { status: 201 });
}
