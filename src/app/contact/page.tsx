import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import PageHero from "@/components/PageHero";
import { site, addressLine } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact NancyLem Florist by phone at ${site.phone} or email ${site.email}. We reply within one business day.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get in touch"
        title={
          <>
            Let&rsquo;s <em className="text-poppy">talk</em> flowers.
          </>
        }
        intro="NancyLem Florist is the retail fresh-flower brand of NancyLem LLC. Questions about an order, a corporate account or something completely custom — call, email or use the form below and a real florist will reply within one business day."
      />
      <section className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <aside className="space-y-8 lg:col-span-4">
          <ContactItem icon={Phone} label="Call or text">
            <a href={`tel:${site.phoneHref}`} className="link-u font-display text-3xl">
              {site.phone}
            </a>
          </ContactItem>
          <ContactItem icon={Mail} label="Email">
            <a href={`mailto:${site.email}`} className="link-u text-lg font-medium">
              {site.email}
            </a>
          </ContactItem>
          <ContactItem icon={Clock} label="Hours">
            <ul className="space-y-1">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-6">
                  <span>{h.days}</span>
                  <span className="tabular-nums text-ink-soft">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-ink-soft">{site.hoursNote}</p>
          </ContactItem>
          <ContactItem icon={MapPin} label="Registered address">
            <address className="not-italic">
              {site.company.legalName}
              <br />
              Attn: {site.contactPerson}
              <br />
              {addressLine}
              <br />
              {site.company.address.country}
            </address>
            <p className="mt-2 text-xs text-ink-soft">Registered business office of {site.company.legalName}. Not a walk-in storefront — all orders are placed online or by phone.</p>
          </ContactItem>
        </aside>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 className="mb-8 text-4xl font-medium">Send a message</h2>
          <InquiryForm kind="contact" />
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean; strokeWidth?: number }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-ink pt-5">
      <p className="eyebrow mb-3 flex items-center gap-2 text-[0.68rem] text-ink-soft">
        <Icon className="size-4 text-poppy" aria-hidden strokeWidth={1.75} /> {label}
      </p>
      {children}
    </div>
  );
}
