"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { site, addressLine } from "@/lib/site";
import { collections } from "@/lib/catalog";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="container-x pb-10 pt-20 md:pt-28">
        <p className="max-w-5xl font-display text-[clamp(2.5rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
          Flowers that say it <em className="text-blush">louder.</em>
        </p>

        <div className="mt-16 grid gap-12 border-t border-paper/15 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/70">{site.tagline}</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={`tel:${site.phoneHref}`} className="inline-flex items-center gap-3 hover:text-blush">
                  <Phone className="size-4 shrink-0" aria-hidden /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-blush">
                  <Mail className="size-4 shrink-0" aria-hidden /> {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-paper/80">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>{addressLine}</span>
              </li>
            </ul>
          </div>

          <FooterCol title="Shop" className="lg:col-span-3">
            <FooterLink href="/shop">All flowers</FooterLink>
            {collections.map((c) => (
              <FooterLink key={c.slug} href={`/collections/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Studio" className="lg:col-span-2">
            <FooterLink href="/weddings-events">Weddings & Events</FooterLink>
            <FooterLink href="/weddings-events#corporate">Corporate</FooterLink>
            <FooterLink href="/about">Our Story</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>

          <FooterCol title="Policies" className="lg:col-span-3">
            <FooterLink href="/delivery-policy">Delivery & Refunds</FooterLink>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <li className="pt-3 text-sm text-paper/60">
              {site.hours.map((h) => (
                <span key={h.days} className="block">
                  {h.days}: {h.time}
                </span>
              ))}
              <span className="mt-1 block text-xs">{site.hoursNote}</span>
            </li>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-8 text-xs leading-relaxed text-paper/55 md:flex-row md:justify-between">
          <p>
            © {year} {site.company.legalName}. {site.name} is a trade name of {site.company.legalName}, a{" "}
            {site.company.state} limited liability company (Filing ID {site.company.filingId}).
          </p>
          <p className="shrink-0">nancylemflorist.com</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="eyebrow mb-5 font-sans text-paper/50">{title}</h2>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-u text-sm text-paper/85 hover:text-paper">
        {children}
      </Link>
    </li>
  );
}
