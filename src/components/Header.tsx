"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import CartButton from "./cart/CartButton";
import { nav, site } from "@/lib/site";

const announcements = [
  `Same-day delivery on orders placed by ${site.sameDayCutoff} recipient time`,
  "Hand-delivered nationwide",
  "Free delivery on orders over $150",
  "7-day freshness promise",
  "A handwritten card with every order",
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="marquee overflow-hidden bg-ink py-2.5 text-paper" aria-label="Store announcements">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {[...announcements, ...announcements].map((a, i) => (
            <span key={i} className="eyebrow flex items-center gap-12 text-[0.68rem] font-medium" aria-hidden={i >= announcements.length}>
              {a}
              <span className="text-poppy" aria-hidden>
                ✻
              </span>
            </span>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-paper"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-7">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`link-u whitespace-nowrap py-1 text-[0.9rem] font-medium ${active ? "bg-[length:100%_1.5px]" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phoneHref}`}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium xl:inline-flex"
            >
              <Phone className="size-4" aria-hidden /> {site.phone}
            </a>
            <Link href="/shop" className="btn btn-ink hidden whitespace-nowrap !min-h-11 !px-5 xl:inline-flex">
              Send flowers <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <CartButton />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-ink text-paper transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="container-x flex h-full flex-col justify-between pb-10 pt-36">
          <ul className="space-y-1">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/faq", label: "FAQ" }, { href: "/contact", label: "Contact" }].map(
              (item, i) => (
                <li key={item.href} className={open ? "rise" : ""} style={{ ["--d" as string]: `${i * 45}ms` }}>
                  <Link href={item.href} tabIndex={open ? 0 : -1} className="block py-1.5 font-display text-4xl italic">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="space-y-2 text-sm text-paper/75">
            <a href={`tel:${site.phoneHref}`} tabIndex={open ? 0 : -1} className="block text-lg text-paper">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1} className="block">
              {site.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
