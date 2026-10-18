import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { markPaidFromSession, stripe } from "@/lib/payments";
import { mutate, readAll } from "@/lib/store";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ message: "Webhook not configured" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(await req.text(), signature, secret);
  } catch (e) {
    console.error("[stripe] bad webhook signature:", (e as Error).message);
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await markPaidFromSession(event.data.object);
      break;
    case "checkout.session.expired": {
      const s = event.data.object;
      const id = s.metadata?.orderId || s.client_reference_id;
      if (id) await mutate("orders", id, (o) => (o.status === "awaiting_payment" ? { ...o, status: "cancelled", adminNote: "Checkout expired without payment" } : null));
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object;
      const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
      const order = pi ? (await readAll("orders")).find((o) => o.stripePaymentIntent === pi) : undefined;
      if (order && charge.refunded) await mutate("orders", order.id, (o) => ({ ...o, status: "refunded" }));
      break;
    }
  }
  return NextResponse.json({ received: true });
}
