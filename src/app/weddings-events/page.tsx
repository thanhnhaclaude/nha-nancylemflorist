import type { Metadata } from "next";
import Image from "next/image";
import { Building2, CalendarHeart, Gem, Sparkles } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wedding, Event & Corporate Flowers",
  description:
    "Custom wedding florals, event installations and weekly corporate flowers by NancyLem Florist. Request a tailored proposal within two business days.",
  alternates: { canonical: "/weddings-events" },
  openGraph: { images: ["/images/bridal-bouquet.jpg"] },
};

const services = [
  {
    icon: Gem,
    title: "Weddings & elopements",
    text: "Bridal and bridesmaid bouquets, boutonnieres, ceremony arches, aisle florals, reception centerpieces and cake flowers.",
    from: "Full weddings from $2,500",
  },
  {
    icon: Sparkles,
    title: "Events & parties",
    text: "Showers, milestone birthdays, galas and launches. From a single statement installation to every table in the room.",
    from: "Events from $800",
  },
  {
    icon: Building2,
    title: "Corporate & weekly",
    text: "Lobby, reception and restaurant arrangements refreshed weekly, plus client gifting programs with consolidated invoicing.",
    from: "Weekly service from $150/week",
  },
  {
    icon: CalendarHeart,
    title: "Sympathy & services",
    text: "Casket sprays, standing pieces and memorial arrangements, coordinated directly and discreetly with funeral homes.",
    from: "Service pieces from $195",
  },
];

const process = [
  ["Discovery", "Share your date, venue and vision through the form below. We reply within two business days."],
  ["Proposal", "A visual mood board and itemized proposal. Adjust as much as you like — no pressure, no obligation."],
  ["Reserve", "A 30% retainer secures your date. The balance is due 14 days before your event."],
  ["The day", "Our team delivers, installs and strikes everything, so you never think about flowers once."],
];

export default function WeddingsEventsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-moss text-paper">
        <div className="container-x grid gap-10 pb-16 pt-12 md:pb-24 md:pt-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-moss-soft">Weddings · Events · Corporate</p>
            <h1 className="mt-5 text-[clamp(3.2rem,9vw,8rem)] font-medium leading-[0.88] tracking-[-0.045em]">
              Big days deserve <em className="text-blush">bigger</em> flowers.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75">
              From an intimate courthouse elopement to a 300-guest gala, our event studio designs florals that are
              photographed, remembered and talked about.
            </p>
            <a href="#inquire" className="btn mt-9 bg-paper text-ink hover:bg-blush">
              Start your proposal
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            <div className="relative col-span-2 aspect-[16/11] overflow-hidden rounded-[1.75rem]">
              <Image src="/images/wedding-aisle.jpg" alt="Outdoor wedding ceremony aisle lined with roses" fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[1.75rem]">
              <Image src="/images/bridal-bouquet.jpg" alt="Bridal bouquet held by a bride" fill sizes="20vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[1.75rem]">
              <Image src="/images/floral-cake.jpg" alt="Wedding cake with fresh flowers" fill sizes="20vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="services" className="container-x py-20 md:py-28">
        <h2 id="services" className="text-5xl font-medium md:text-7xl">
          What we <em>make</em>
        </h2>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:grid-cols-2">
          {services.map(({ icon: Icon, title, text, from }, i) => (
            <li
              key={title}
              id={title.startsWith("Corporate") ? "corporate" : undefined}
              data-reveal
              style={{ ["--d" as string]: `${(i % 2) * 100}ms` }}
              className="scroll-mt-28 bg-paper p-8 md:p-12"
            >
              <Icon className="size-8 text-poppy" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-6 text-3xl font-medium md:text-4xl">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{text}</p>
              <p className="eyebrow mt-6 text-[0.7rem]">{from}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="process" className="border-y border-line bg-card">
        <div className="container-x py-20 md:py-28">
          <h2 id="process" className="text-5xl font-medium md:text-7xl">
            How it <em>comes together</em>
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-4">
            {process.map(([t, d], i) => (
              <li key={t} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }} className="border-t-2 border-ink pt-6">
                <span className="font-display text-6xl italic text-poppy">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-medium">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="inquire" aria-labelledby="inquire-title" className="scroll-mt-24 bg-ink text-paper">
        <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-blush">Request a proposal</p>
            <h2 id="inquire-title" className="mt-4 text-5xl font-medium md:text-6xl">
              Tell us <em>everything.</em>
            </h2>
            <p className="mt-6 text-paper/70">
              The more we know, the better the proposal. Prefer to talk? Call{" "}
              <a href={`tel:${site.phoneHref}`} className="underline underline-offset-4">
                {site.phone}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <InquiryForm kind="event" dark />
          </div>
        </div>
      </section>
    </>
  );
}
