export const site = {
  name: "NancyLem Florist",
  shortName: "NancyLem",
  domain: "nancylemflorist.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://nancylemflorist.com").replace(/\/$/, ""),
  tagline: "Bold, hand-tied flowers delivered across the United States.",
  description:
    "NancyLem Florist designs bold, seasonal bouquets and event florals, hand-delivered across the United States. Same-day delivery in partner cities, wedding and corporate flowers, and a 7-day freshness promise.",
  email: "contact@nancylemflorist.com",
  phone: "(567) 333-1563",
  phoneHref: "+15673331563",
  contactPerson: "Nat Smith",
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 7:00 PM" },
    { days: "Saturday", time: "9:00 AM – 5:00 PM" },
    { days: "Sunday", time: "10:00 AM – 3:00 PM" },
  ],
  hoursNote: "Mountain Time (MT). Online orders are accepted 24/7.",
  sameDayCutoff: "1:00 PM",
  company: {
    legalName: "NancyLem LLC",
    type: "Single Member-Managed Limited Liability Company",
    state: "Wyoming",
    registeredWith: "Wyoming Secretary of State",
    filingId: "2026-002096431",
    formed: "January 10, 2026",
    address: {
      street: "30 N Gould St Ste N",
      city: "Sheridan",
      region: "WY",
      postalCode: "82801",
      country: "United States",
      countryCode: "US",
    },
  },
} as const;

export const addressLine = `${site.company.address.street}, ${site.company.address.city}, ${site.company.address.region} ${site.company.address.postalCode}`;

export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/collections/love-romance", label: "Love" },
  { href: "/collections/birthday", label: "Birthday" },
  { href: "/collections/sympathy", label: "Sympathy" },
  { href: "/weddings-events", label: "Weddings & Events" },
  { href: "/about", label: "Our Story" },
] as const;

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS",
  "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC",
  "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
] as const;
