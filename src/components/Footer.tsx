"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Lock, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { site, addressFull } from "@/lib/site";
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
          <div className="lg:col-span-3">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/70">{site.tagline}</p>
            <p className="mt-6 text-sm text-paper/60">
              {site.hours.map((h) => (
                <span key={h.days} className="block">
                  {h.days}: {h.time}
                </span>
              ))}
              <span className="mt-1 block text-xs">{site.hoursNote}</span>
            </p>
          </div>

          <FooterCol title="Shop" className="lg:col-span-3">
            <FooterLink href="/shop">All flowers</FooterLink>
            {collections.map((c) => (
              <FooterLink key={c.slug} href={`/collections/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company" className="lg:col-span-3">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/weddings-events">Weddings & Events</FooterLink>
            <FooterLink href="/weddings-events#corporate">Corporate Flowers</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </FooterCol>

          <FooterCol title="Policies" className="lg:col-span-3">
            <FooterLink href="/shipping-policy">Shipping & Delivery Policy</FooterLink>
            <FooterLink href="/refund-policy">Refund & Return Policy</FooterLink>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </FooterCol>
        </div>

        <section aria-labelledby="company-info" className="mt-14 rounded-[1.5rem] border border-paper/15 p-6 md:p-8">
          <h2 id="company-info" className="eyebrow font-sans text-paper/50">
            Company information
          </h2>
          <dl className="mt-5 grid gap-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="flex items-center gap-2 text-paper/55">
                <Building2 className="size-4" aria-hidden /> Company Name
              </dt>
              <dd className="mt-1 font-medium">{site.company.legalName}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-paper/55">
                <MapPin className="size-4" aria-hidden /> Address
              </dt>
              <dd className="mt-1 font-medium">
                <address className="not-italic">{addressFull()}</address>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-paper/55">
                <Mail className="size-4" aria-hidden /> Support Email
              </dt>
              <dd className="mt-1 font-medium">
                <a href={`mailto:${site.email}`} className="hover:text-blush">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-paper/55">
                <Phone className="size-4" aria-hidden /> Customer Support
              </dt>
              <dd className="mt-1 font-medium">
                <a href={`tel:${site.phoneHref}`} className="hover:text-blush">
                  {site.phone}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <div className="mt-10 flex flex-col gap-4 border-t border-paper/15 pt-8 text-xs leading-relaxed text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.company.legalName}. All rights reserved. {site.name} is owned and operated by{" "}
            {site.company.legalName}, a {site.company.state} limited liability company (Filing ID {site.company.filingId}).
          </p>
          <p className="flex shrink-0 items-center gap-2">
            <Lock className="size-3.5" aria-hidden /> Secure checkout · SSL encrypted · Payments by Stripe
          </p>
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
