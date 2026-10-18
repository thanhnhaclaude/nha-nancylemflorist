import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Request Received",
  robots: { index: false },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  const safeRef = ref && /^[A-Z]{2,3}-\d{6}-[A-F0-9]{4}$/.test(ref) ? ref : null;

  return (
    <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-7">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-success text-white">
          <Check className="size-7" aria-hidden />
        </span>
        <h1 className="mt-8 text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.04em]">
          Request <em className="text-poppy">received.</em>
        </h1>
        {safeRef && (
          <p className="mt-6 text-lg">
            Your reference: <span className="font-mono font-semibold">{safeRef}</span>
          </p>
        )}
        <ol className="mt-10 space-y-5 border-t border-ink pt-8">
          {[
            ["Check your inbox", "A confirmation with your order details is on its way."],
            ["We'll be in touch", `A florist will confirm by phone or email — usually within an hour during business hours — and send a secure payment link.`],
            ["We design & deliver", "Once paid, your flowers are designed that morning and hand-delivered with your card."],
          ].map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-4">
              <span className="font-display text-3xl italic text-poppy">{i + 1}</span>
              <div>
                <p className="font-semibold">{t}</p>
                <p className="text-ink-soft">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-ink-soft">
          Need to change something or sending same-day? Call{" "}
          <a href={`tel:${site.phoneHref}`} className="font-semibold text-ink underline underline-offset-4">
            {site.phone}
          </a>
          .
        </p>
        <Link href="/shop" className="btn btn-ink mt-10">
          Keep browsing <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[2rem] lg:col-span-5 lg:block">
        <Image src="/images/heart-of-flowers.jpg" alt="" fill sizes="40vw" className="object-cover" />
      </div>
    </section>
  );
}
