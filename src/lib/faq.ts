import { site } from "./site";

export const faqs: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Ordering & payment",
    items: [
      {
        q: "How do I pay?",
        a: "Add your flowers to the cart and check out. Payment is processed securely by Stripe — we accept Visa, Mastercard, American Express, Discover, Apple Pay and Google Pay. We never see or store your full card number. You receive an email receipt as soon as payment is complete.",
      },
      {
        q: "Will I get an order confirmation?",
        a: `Yes. You receive an email confirmation with your order number and receipt right after payment. If anything about your order needs clarifying, a florist will contact you during business hours (${site.hours[0].days}, ${site.hours[0].time} MT).`,
      },
      {
        q: "Can I order for a future date?",
        a: "Yes — you can schedule delivery up to 120 days ahead. For Valentine's Day and Mother's Day we recommend ordering at least a week early.",
      },
      {
        q: "Do you charge sales tax?",
        a: "Where applicable, sales tax is calculated from the delivery address and shown on the secure payment page before you pay.",
      },
    ],
  },
  {
    group: "Delivery",
    items: [
      {
        q: "Do you deliver same-day?",
        a: `Yes, in most metropolitan areas. Place your order by ${site.sameDayCutoff} in the recipient's time zone, Monday through Saturday, and we'll do our best to deliver that day. We'll tell you right away if same-day isn't possible for a particular address.`,
      },
      {
        q: "Where do you deliver?",
        a: "All 50 states and Washington, DC. Larger cities are served by our own studio or our vetted partner florists; for some rural addresses we may suggest next-day delivery.",
      },
      {
        q: "How much is delivery?",
        a: "Delivery is $15.99 per order and free on orders of $150 or more (before tax). See our Shipping & Delivery Policy for details.",
      },
      {
        q: "What if the recipient isn't home?",
        a: "Our driver will call the recipient, then leave the flowers in a safe, shaded spot or with a neighbor or front desk where appropriate. If none of those is possible we'll contact you to reschedule at no additional cost.",
      },
    ],
  },
  {
    group: "Flowers & care",
    items: [
      {
        q: "Will my bouquet look exactly like the photo?",
        a: "It will have the same style, palette and value. Because we design with what's freshest that day, individual stems may vary slightly. If a key flower is unavailable we'll substitute something of equal or greater value and let you know.",
      },
      {
        q: "What if my flowers arrive damaged or don't last?",
        a: "Contact us within 24 hours of delivery with a photo and we'll send a fresh replacement or refund you. Fresh flowers are also guaranteed to last at least seven days with basic care. Full details are in our Return & Replacement Policy.",
      },
      {
        q: "Can I request specific flowers or colors?",
        a: "Absolutely. Add a note for the florist when you order. For fully custom designs, contact us and we'll build something just for you.",
      },
    ],
  },
];
