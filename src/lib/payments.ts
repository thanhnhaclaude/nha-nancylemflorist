import "server-only";
import Stripe from "stripe";
import { mutate } from "./store";
import { sendOrderEmails } from "./mailer";

let client: Stripe | null = null;

export function paymentsEnabled() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function stripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not set");
  if (!client) client = new Stripe(process.env.STRIPE_SECRET_KEY, { appInfo: { name: "NancyLem Florist" } });
  return client;
}

/**
 * Mark an order paid from a completed Checkout Session. Idempotent: the success page and the
 * webhook may both call it; emails go out only on the first transition to "paid".
 */
export async function markPaidFromSession(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId || session.client_reference_id;
  if (!orderId || session.payment_status !== "paid") return null;

  const { after, changed } = await mutate("orders", orderId, (o) => {
    if (o.stripeSessionId && o.stripeSessionId !== session.id) return null;
    if (o.status !== "awaiting_payment") return null;
    return {
      ...o,
      status: "paid",
      paidAt: new Date().toISOString(),
      amountPaid: (session.amount_total ?? 0) / 100,
      stripePaymentIntent: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
    };
  });

  if (after && changed) {
    await sendOrderEmails(after);
    await mutate("orders", orderId, (o) => ({ ...o, emailedAt: new Date().toISOString() }));
  }
  return after;
}
