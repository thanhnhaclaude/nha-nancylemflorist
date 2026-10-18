import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import PageHero from "@/components/PageHero";
import { faqs } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ — Ordering, Delivery & Flower Care",
  description: "Answers about ordering, payment, same-day delivery, substitutions and our 7-day freshness promise.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((g) =>
      g.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumb="FAQ"
        eyebrow="Help center"
        title={
          <>
            Questions, <em>answered.</em>
          </>
        }
        intro={
          <>
            Can&rsquo;t find what you need? Call{" "}
            <a href={`tel:${site.phoneHref}`} className="font-semibold text-ink underline underline-offset-4">
              {site.phone}
            </a>{" "}
            or <Link href="/contact" className="font-semibold text-ink underline underline-offset-4">send us a message</Link>.
          </>
        }
      />
      <div className="container-x space-y-16 py-20 md:py-28">
        {faqs.map((g) => (
          <section key={g.group} aria-labelledby={g.group} className="grid gap-8 lg:grid-cols-12">
            <h2 id={g.group} className="text-3xl font-medium md:text-4xl lg:col-span-4">
              {g.group}
            </h2>
            <div className="border-t border-ink lg:col-span-8">
              {g.items.map((item) => (
                <details key={item.q} className="group border-b border-line">
                  <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden />
                  </summary>
                  <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
