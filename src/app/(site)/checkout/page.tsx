import type { Metadata } from "next";
import CheckoutForm from "./CheckoutForm";
import { paymentsEnabled } from "@/lib/payments";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ canceled?: string }> }) {
  const { canceled } = await searchParams;
  return (
    <section className="container-x pb-20 pt-8 md:pt-12">
      <p className="eyebrow text-poppy">Secure checkout</p>
      <h1 className="mt-3 text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.04em]">
        Almost <em>there.</em>
      </h1>
      {canceled && (
        <p role="status" className="mt-6 max-w-2xl rounded-xl bg-blush/60 px-4 py-3 text-sm">
          Payment was canceled and you have not been charged. Your cart is saved — you can try again below.
        </p>
      )}
      <CheckoutForm online={paymentsEnabled()} />
    </section>
  );
}
