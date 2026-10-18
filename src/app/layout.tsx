import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  // No explicit weights: one variable font file per style instead of eight static files.
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Bold Flowers, Delivered Nationwide`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `${site.name} — Bold Flowers, Delivered Nationwide`,
    description: site.description,
    images: [{ url: "/images/hero-moody-bouquet.jpg", width: 1600, height: 2000, alt: "NancyLem Florist signature bouquet" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#17120f",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Florist",
  "@id": `${site.url}/#florist`,
  name: site.name,
  legalName: site.company.legalName,
  url: site.url,
  logo: `${site.url}/brand/nancylem-logo-square-light.png`,
  image: `${site.url}/images/hero-moody-bouquet.jpg`,
  description: site.description,
  email: site.email,
  telephone: "+1-567-333-1563",
  priceRange: "$$",
  areaServed: { "@type": "Country", name: "United States" },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.company.address.street,
    addressLocality: site.company.address.city,
    addressRegion: site.company.address.region,
    postalCode: site.company.address.postalCode,
    addressCountry: site.company.address.countryCode,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "15:00" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={playfair.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
