import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: "NancyLem Florist is a modern flower studio sending bold, hand-tied bouquets across the United States. Meet the people and principles behind every stem.",
  alternates: { canonical: "/about" },
};

const values = [
  ["Market-fresh, every morning", "We buy close to the day we design, so stems arrive at your door with their best days still ahead."],
  ["Designed, not assembled", "Every order is composed by a trained florist with a point of view — not packed by a fulfillment line."],
  ["Honest about substitutions", "Flowers are seasonal. If a stem isn't at its best, we swap for equal or greater value and tell you first."],
  ["People you can reach", `Real humans answer ${site.phone} and ${site.email} — before, during and after delivery.`],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="Our Story"
        eyebrow="About NancyLem Florist"
        title={
          <>
            We believe flowers should <em className="text-poppy">make noise.</em>
          </>
        }
        intro="NancyLem Florist started with a simple frustration: too many flower deliveries arrive looking like they came off a conveyor belt. So we built the opposite — a studio where every bouquet is designed by hand, with color, scale and a little bit of nerve."
      />

      <section className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
        <div data-reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:col-span-5">
          <Image src="/images/flower-shop-front.jpg" alt="A flower shop front overflowing with fresh bouquets in buckets" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="text-5xl font-medium md:text-6xl">
            A studio, <em>not a warehouse.</em>
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              Our designers work with growers and wholesale markets across the country, choosing stems the way a chef
              chooses produce: by what&rsquo;s at its peak right now. That&rsquo;s why our bouquets look a little
              different from week to week — and why they last.
            </p>
            <p>
              For deliveries outside our own studio area, we partner with independent local florists we&rsquo;ve
              vetted for quality. They design from our recipes and photos, and hand-deliver within hours, so your
              flowers never spend a night in a cardboard box.
            </p>
            <p>
              Whether you&rsquo;re sending two dozen roses across the country or planning flowers for a
              three-hundred-guest wedding, you&rsquo;ll talk to a florist — not a chatbot.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values" className="bg-ink text-paper">
        <div className="container-x py-20 md:py-28">
          <h2 id="values" className="text-5xl font-medium md:text-7xl">
            What we <em className="text-blush">stand for</em>
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-2">
            {values.map(([t, d], i) => (
              <li key={t} data-reveal style={{ ["--d" as string]: `${(i % 2) * 100}ms` }} className="grid grid-cols-[auto_1fr] gap-6 border-t border-paper/20 pt-6">
                <span className="font-display text-5xl italic text-poppy">0{i + 1}</span>
                <div>
                  <h3 className="text-3xl font-medium">{t}</h3>
                  <p className="mt-2 text-paper/70">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="company" className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="company" className="text-4xl font-medium md:text-5xl">
              The company <em>behind the flowers</em>
            </h2>
            <p className="mt-6 text-ink-soft">
              {site.name} is a trade name of {site.company.legalName}, a {site.company.type.toLowerCase()} registered
              in the State of {site.company.state}.
            </p>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line text-sm sm:grid-cols-2 lg:col-span-7">
            {[
              ["Legal name", site.company.legalName],
              ["Entity type", site.company.type],
              ["Registered with", site.company.registeredWith],
              ["Filing ID", site.company.filingId],
              ["Formed", site.company.formed],
              ["Contact", site.contactPerson],
              ["Address", `${site.company.address.street}, ${site.company.address.city}, ${site.company.address.region} ${site.company.address.postalCode}, ${site.company.address.country}`],
              ["Phone · Email", `${site.phone} · ${site.email}`],
            ].map(([k, v]) => (
              <div key={k} className="bg-card p-5">
                <dt className="eyebrow text-[0.65rem] text-ink-soft">{k}</dt>
                <dd className="mt-1.5 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-16 flex flex-wrap gap-3">
          <Link href="/shop" className="btn btn-primary">
            Shop flowers <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
