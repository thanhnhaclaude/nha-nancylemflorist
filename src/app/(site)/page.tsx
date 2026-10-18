import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Flower2, PenLine, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { collections, getProduct, productsIn, type Product } from "@/lib/catalog";
import { site } from "@/lib/site";

const featured = ["midnight-garden", "sunny-disposition", "two-dozen-red-roses", "garden-party"]
  .map(getProduct)
  .filter(Boolean) as Product[];

const promises = [
  { icon: Truck, title: "Hand-delivered", text: `Same-day in partner cities when you order by ${site.sameDayCutoff} recipient time. Nationwide next-day.` },
  { icon: Flower2, title: "7-day freshness", text: "If your flowers don't last a week with simple care, we'll replace them. No forms, no fuss." },
  { icon: PenLine, title: "Handwritten cards", text: "Every order includes a card written by hand — never a printed slip." },
  { icon: ShieldCheck, title: "Secure checkout", text: "Pay safely with card, Apple Pay or Google Pay through Stripe. We never see or store your card number." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-x grid gap-10 pb-16 pt-8 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-24">
          <div className="flex flex-col justify-center lg:col-span-7 lg:pr-8">
            <p className="eyebrow rise text-ink-soft" style={{ ["--d" as string]: "0ms" }}>
              NancyLem Florist · Nationwide flower delivery
            </p>
            <h1 className="mt-6 text-[clamp(3.4rem,10.5vw,9.25rem)] font-medium leading-[0.88] tracking-[-0.045em]">
              <span className="block">
                Bold flowers
              </span>
              <span className="block">
                for <em className="font-normal text-poppy">big</em>
              </span>
              <span className="block">
                feelings.
              </span>
            </h1>
            <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-ink-soft" style={{ ["--d" as string]: "340ms" }}>
              Hand-tied, seasonal bouquets with real presence — designed by florists, never by an algorithm, and
              delivered to doorsteps across the United States.
            </p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "420ms" }}>
              <Link href="/shop" className="btn btn-primary">
                Shop bouquets <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/weddings-events" className="btn btn-outline">
                Plan an event
              </Link>
            </div>
            <dl className="rise mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6" style={{ ["--d" as string]: "500ms" }}>
              {[
                ["Same‑day", `Order by ${site.sameDayCutoff}`],
                ["50 states", "+ Washington, DC"],
                ["7 days", "Freshness promise"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="whitespace-nowrap font-display text-[1.4rem] font-medium sm:text-2xl md:text-3xl">{k}</dt>
                  <dd className="mt-1 text-xs text-ink-soft md:text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:aspect-auto lg:h-full lg:min-h-[640px]">
              <Image
                src="/images/hero-moody-bouquet.jpg"
                alt="The Midnight Garden — a dark, jewel-toned bouquet of protea, ranunculus and anemone"
                fill
                loading="eager"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6 pt-24 text-paper">
                <p className="eyebrow text-[0.65rem] text-paper/80">Studio favorite</p>
                <Link href="/shop/midnight-garden" className="mt-1 inline-flex items-center gap-2 font-display text-2xl italic">
                  The Midnight Garden <ArrowUpRight className="size-5" aria-hidden />
                </Link>
              </div>
            </div>
            <RotatingBadge />
          </div>
        </div>
      </section>

      {/* OCCASIONS INDEX */}
      <section aria-labelledby="occasions" className="border-y border-line bg-card">
        <div className="container-x py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-poppy">Shop by occasion</p>
              <h2 id="occasions" className="mt-4 text-5xl font-medium md:text-7xl">
                What are we <em>saying</em>?
              </h2>
            </div>
            <Link href="/shop" className="link-u eyebrow pb-1">
              View all flowers
            </Link>
          </div>

          <ol className="mt-14 border-t border-ink">
            {collections.map((c, i) => (
              <li key={c.slug} data-reveal className="border-b border-ink/15">
                <Link
                  href={`/collections/${c.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 md:grid-cols-[4rem_1fr_14rem_auto] md:gap-8 md:py-7"
                >
                  <span className="text-sm tabular-nums text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[clamp(1.9rem,5vw,4.25rem)] font-medium leading-none transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:italic group-hover:text-poppy">
                    {c.name}
                  </span>
                  <span className="hidden text-sm text-ink-soft md:block">{c.kicker}</span>
                  <span className="relative size-16 overflow-hidden rounded-full md:size-20">
                    <Image src={c.image} alt="" fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section aria-labelledby="bestsellers" className="cv-auto container-x py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-poppy">Most sent this season</p>
            <h2 id="bestsellers" className="mt-4 text-5xl font-medium md:text-7xl">
              The studio&rsquo;s <em>greatest hits</em>
            </h2>
          </div>
          <p className="text-ink-soft md:col-span-4 md:col-start-9">
            Four designs our florists make every single day — each one built from that morning&rsquo;s market delivery.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {featured.map((p, i) => (
            <div key={p.slug} className={i % 2 === 1 ? "lg:mt-16" : ""}>
              <ProductCard product={p} index={i} tall />
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/shop" className="btn btn-ink">
            Shop all flowers <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* STATEMENT */}
      <section aria-label="Our philosophy" className="cv-auto overflow-hidden bg-ink py-24 text-paper md:py-36">
        <div className="container-x">
          <p data-reveal className="font-display text-[clamp(2.5rem,7.5vw,7.5rem)] font-medium leading-[1] tracking-[-0.035em]">
            Designed{" "}
            <InlineImg src="/images/flower-market.jpg" alt="" /> by hand,{" "}
            <em className="text-blush">delivered</em>{" "}
            <InlineImg src="/images/hands-coral-bouquet.jpg" alt="" /> with heart — never boxed,{" "}
            <span className="text-paper/40">never wilted,</span> never boring.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section aria-labelledby="how" className="cv-auto container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-poppy">How it works</p>
            <h2 id="how" className="mt-4 text-5xl font-medium md:text-6xl lg:text-5xl xl:text-6xl">
              Three steps. <em>Zero</em> guesswork.
            </h2>
            <p className="mt-6 text-ink-soft">
              Add your favorites to the cart, choose a delivery date and pay securely in under two minutes. A real
              florist designs every order by hand on the day it&rsquo;s delivered.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-3 lg:col-span-8">
            {[
              ["Choose", "Pick a bouquet and a size. Add a vase, chocolates or a candle, then add it to your cart."],
              ["Checkout", "Choose the delivery date, write your card message and pay securely with Stripe."],
              ["Delight", "We design it that morning and hand-deliver with your handwritten card."],
            ].map(([t, d], i) => (
              <li key={t} data-reveal style={{ ["--d" as string]: `${i * 100}ms` }} className="bg-paper p-8 md:p-10">
                <span className="font-display text-7xl font-medium italic text-poppy">{i + 1}</span>
                <h3 className="mt-6 text-3xl font-medium">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SIGNATURE SPLIT */}
      <section aria-labelledby="signature" className="cv-auto bg-blush/45">
        <div className="container-x grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <div data-reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/images/lush-garden-bouquet.jpg"
                alt="Lush Atelier — garden roses, scabiosa and astilbe"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              data-reveal
              style={{ ["--d" as string]: "200ms" }}
              className="absolute -bottom-8 -right-2 hidden w-[42%] overflow-hidden rounded-[1.5rem] border-[6px] border-paper sm:block md:-right-8"
            >
              <div className="relative aspect-square">
                <Image src="/images/pink-peonies.jpg" alt="" fill sizes="20vw" className="object-cover" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow text-poppy-dark">The Signature Collection</p>
            <h2 id="signature" className="mt-4 text-5xl font-medium md:text-6xl 2xl:text-7xl">
              When only <em>extraordinary</em> will do.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Rare garden roses, protea, peonies at their peak. Our largest compositions, hand-tied by senior florists
              and photographed before they leave the studio so you can see exactly what was sent.
            </p>
            <ul className="mt-8 space-y-3 border-t border-ink/15 pt-6">
              {productsIn("signature").map((p) => (
                <li key={p.slug}>
                  <Link href={`/shop/${p.slug}`} className="group flex items-baseline justify-between gap-4">
                    <span className="font-display text-2xl group-hover:italic group-hover:text-poppy-dark">{p.name}</span>
                    <span className="text-sm tabular-nums text-ink-soft">from ${p.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/collections/signature" className="btn btn-ink mt-10">
              Explore Signature <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* WEDDINGS */}
      <section aria-labelledby="weddings" className="cv-auto bg-moss text-paper">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow text-moss-soft">Weddings · Events · Corporate</p>
            <h2 id="weddings" className="mt-4 text-5xl font-medium md:text-7xl">
              Florals for the <em className="text-blush">big day</em> — and every day after.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-paper/75">
              Bridal bouquets, ceremony arches, centerpieces and weekly lobby arrangements. Tell us your date, your
              venue and your vision; we&rsquo;ll send a custom proposal within two business days.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/weddings-events" className="btn bg-paper text-ink hover:bg-blush">
                Request a proposal <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 lg:col-span-7">
            <div data-reveal className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-[1.5rem]">
              <Image src="/images/bridal-bouquet.jpg" alt="A bride holding a garden-style bridal bouquet" fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
            </div>
            <div className="col-span-2 flex flex-col gap-4 pt-12">
              <div data-reveal style={{ ["--d" as string]: "120ms" }} className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem]">
                <Image src="/images/wedding-aisle.jpg" alt="Wedding ceremony aisle lined with roses" fill sizes="25vw" className="object-cover" />
              </div>
              <div data-reveal style={{ ["--d" as string]: "220ms" }} className="relative aspect-square overflow-hidden rounded-[1.5rem]">
                <Image src="/images/floral-cake.jpg" alt="Tiered wedding cake decorated with fresh flowers" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMISES */}
      <section aria-labelledby="promise" className="cv-auto container-x py-20 md:py-28">
        <h2 id="promise" className="max-w-3xl text-5xl font-medium md:text-6xl">
          The NancyLem <em>promise</em>
        </h2>
        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map(({ icon: Icon, title, text }, i) => (
            <li key={title} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }} className="border-t-2 border-ink pt-6">
              <Icon className="size-7 text-poppy" aria-hidden strokeWidth={1.5} />
              <h3 className="mt-5 text-2xl font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta" className="cv-auto container-x pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-poppy px-6 py-16 text-white md:px-16 md:py-24">
          <Clock className="absolute -right-10 -top-10 size-72 text-white/10" aria-hidden strokeWidth={1} />
          <p className="eyebrow text-white">Need it today?</p>
          <h2 id="cta" className="mt-4 max-w-4xl text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.95]">
            Order by {site.sameDayCutoff}. <em>Smiles by sunset.</em>
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="btn bg-white text-ink hover:bg-paper">
              Send flowers now <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a href={`tel:${site.phoneHref}`} className="btn btn-outline border-white hover:!border-ink">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function InlineImg({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative mx-1 inline-block h-[0.78em] w-[1.5em] translate-y-[0.06em] overflow-hidden rounded-full align-baseline">
      <Image src={src} alt={alt} fill sizes="200px" className="object-cover" />
    </span>
  );
}

function RotatingBadge() {
  return (
    <div className="absolute right-4 top-4 size-24 sm:size-32 lg:-left-10 lg:right-auto lg:top-10 lg:size-40" aria-hidden>
      <div className="flex size-full items-center justify-center rounded-full bg-poppy text-white shadow-xl">
        <svg viewBox="0 0 100 100" className="absolute size-full animate-[spin_22s_linear_infinite]">
          <defs>
            <path id="circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
          </defs>
          <text fontSize="7.4" fill="currentColor" fontWeight="600">
            <textPath href="#circle" textLength="228" lengthAdjust="spacing">HAND-TIED TODAY · DELIVERED TODAY ·</textPath>
          </text>
        </svg>
        <Flower2 className="size-8" strokeWidth={1.5} />
      </div>
    </div>
  );
}
