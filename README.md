# NancyLem Florist — nancylemflorist.com

Marketing site and order-request system for **NancyLem Florist**, a trade name of **NancyLem LLC** (Wyoming).

- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · Zod · Stripe Checkout · Nodemailer
- **Storage:** JSON files in `DATA_DIR` (no database required)
- **Hosting:** Hostinger Node.js Apps — see [HUONG-DAN-DEPLOY-HOSTINGER.md](HUONG-DAN-DEPLOY-HOSTINGER.md)

## Features

- Editorial home page, shop, 6 collections, 22 product pages with JSON-LD
- Shopping cart (sizes, add-ons, quantities) with slide-out drawer, saved in the browser
- Checkout with delivery details and card message, paid through **Stripe Checkout** (cards, Apple Pay, Google Pay); Stripe webhook marks orders paid/refunded
- Falls back to "order request" mode when Stripe keys are not set
- Wedding/event proposal form and contact form
- Emails to the shop and the customer (Hostinger SMTP)
- Password-protected `/admin` dashboard: search, filter, update status, internal notes
- Shipping & Delivery, Refund & Return, Privacy and Terms pages; company information block in the footer
- SEO: metadata, Open Graph, sitemap, robots, `Florist`, `Product` and `FAQPage` structured data
- Accessibility: skip link, visible focus, labelled fields, inline errors, reduced-motion support
- Spam protection: honeypot field and per-IP rate limiting

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in ADMIN_PASSWORD and AUTH_SECRET
npm run dev
```

Open http://localhost:3000. Orders are written to `./data/` (git-ignored).

## Editing content

| What | Where |
|---|---|
| Company info, phone, hours, nav | `src/lib/site.ts` |
| Products, collections, sizes, add-ons, delivery fee | `src/lib/catalog.ts` |
| FAQ | `src/lib/faq.ts` |
| Product photos | `public/images/` |
| Colors & fonts | `src/app/globals.css` (`@theme`) |

## Photo credits

Product and lifestyle photos are from [Unsplash](https://unsplash.com) under the Unsplash License (free for commercial use). Replace them with your own photography when available.
