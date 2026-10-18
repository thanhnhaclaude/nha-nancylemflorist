import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import ClearCart from "@/components/cart/ClearCart";
import { usd } from "@/lib/catalog";
import { markPaidFromSession, paymentsEnabled, stripe } from "@/lib/payments";
import { findById } from "@/lib/store";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

async function loadOrder(sessionId?: string) {
  if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId) || !paymentsEnabled()) return null;
  try {
    const session = await stripe().checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata?.orderId || session.client_reference_id;
    if (!orderId) return null;
    const order = (await markPaidFromSession(session)) ?? (await findById("orders", orderId));
    if (!order || order.stripeSessionId !== session.id) return null;
    return { order, paid: session.payment_status === "paid" };
  } catch (e) {
    console.error("[success] could not load session:", (e as Error).message);
    return null;
  }
}

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const result = await loadOrder(session_id);

  if (!result) {
    return (
      <section className="container-x py-24">
        <h1 className="text-5xl font-medium">We couldn&rsquo;t find that order.</h1>
        <p className="mt-6 max-w-xl text-ink-soft">
          If you completed payment, your confirmation email is on its way. Questions? Call {site.phone} or email{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>.
        </p>
        <Link href="/" className="btn btn-ink mt-8">Back home</Link>
      </section>
    );
  }

  const { order, paid } = result;
  return (
    <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12">
      {paid && <ClearCart />}
      <div className="lg:col-span-7">
        <span className={`inline-flex size-14 items-center justify-center rounded-full text-white ${paid ? "bg-success" : "bg-ink-soft"}`}>
          {paid ? <Check className="size-7" aria-hidden /> : <Clock className="size-7" aria-hidden />}
        </span>
        <h1 className="mt-8 text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.04em]">
          {paid ? (
            <>
              Order <em className="text-poppy">confirmed.</em>
            </>
          ) : (
            <>
              Payment <em className="text-poppy">processing.</em>
            </>
          )}
        </h1>
        <p className="mt-6 text-lg">
          Order number <span className="font-mono font-semibold">{order.id}</span>
        </p>
        <p className="mt-4 max-w-xl text-ink-soft">
          {paid
            ? `Thank you, ${order.senderName.split(" ")[0]}. A receipt is on its way to ${order.senderEmail}. We'll design your flowers on ${order.deliveryDate} and hand-deliver them to ${order.recipientName} in ${order.city}, ${order.state}.`
            : "Your bank is still confirming the payment. You'll receive an email as soon as it clears — no need to order again."}
        </p>
        <p className="mt-6 text-ink-soft">
          Need to change something? Call{" "}
          <a href={`tel:${site.phoneHref}`} className="font-semibold text-ink underline underline-offset-4">{site.phone}</a>.
        </p>
        <Link href="/shop" className="btn btn-ink mt-10">
          Keep browsing <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <aside className="lg:col-span-5">
        <div className="rounded-[1.5rem] border border-line bg-card p-6">
          <h2 className="text-2xl font-medium">Summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {order.items.map((i) => (
              <li key={`${i.slug}-${i.size}-${i.addOns.join()}`} className="flex justify-between gap-4">
                <span>
                  {i.qty} × {i.name}
                  {i.sizeLabel && ` · ${i.sizeLabel}`}
                </span>
                <span className="tabular-nums">{usd(i.lineTotal)}</span>
              </li>
            ))}
            <li className="flex justify-between gap-4 text-ink-soft">
              <span>Delivery</span>
              <span className="tabular-nums">{order.delivery ? usd(order.delivery) : "Free"}</span>
            </li>
          </ul>
          <p className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
            <span className="eyebrow">{paid ? "Paid" : "Total"}</span>
            <span className="font-display text-3xl tabular-nums">{usd(order.amountPaid ?? order.total)}</span>
          </p>
        </div>
      </aside>
    </section>
  );
}
