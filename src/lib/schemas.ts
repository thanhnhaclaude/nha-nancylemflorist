import { z } from "zod";
import { addOns, sizes } from "./catalog";
import { US_STATES } from "./site";

const phone = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a 10-digit US phone number")
  .refine((v) => v.replace(/\D/g, "").length <= 15, "Phone number is too long");

const name = (label: string) => z.string().trim().min(2, `${label} is required`).max(80, "Too long");

/** Earliest allowed delivery date, as YYYY-MM-DD in US Pacific time (most lenient mainland zone). */
export function earliestDeliveryDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(now);
}

export function latestDeliveryDate(now = new Date()) {
  const d = new Date(now);
  d.setDate(d.getDate() + 120);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(d);
}

export const cartItemSchema = z.object({
  slug: z.string().min(1).max(80),
  size: z.enum(sizes.map((s) => s.id) as [string, ...string[]]),
  addOns: z.array(z.enum(addOns.map((a) => a.id) as [string, ...string[]])).max(addOns.length).default([]),
  qty: z.number().int().min(1).max(10),
});

export type CartItemInput = z.input<typeof cartItemSchema>;

export const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Your cart is empty").max(20, "Too many items in one order"),
  deliveryDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a delivery date")
    .refine((v) => v >= earliestDeliveryDate(), "Choose today or a future date")
    .refine((v) => v <= latestDeliveryDate(), "We take orders up to 120 days ahead"),
  recipientName: name("Recipient name"),
  recipientPhone: phone,
  locationType: z.enum(["Residence", "Business", "Funeral home", "Hospital", "Other"]),
  address1: z.string().trim().min(4, "Street address is required").max(120),
  address2: z.string().trim().max(80).optional().default(""),
  city: z.string().trim().min(2, "City is required").max(60),
  state: z.enum(US_STATES, { message: "Choose a state" }),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Enter a 5-digit ZIP code"),
  cardMessage: z.string().trim().max(250, "Keep it under 250 characters").optional().default(""),
  senderName: name("Your name"),
  senderEmail: z.string().trim().email("Enter a valid email").max(120),
  senderPhone: phone,
  instructions: z.string().trim().max(500, "Keep it under 500 characters").optional().default(""),
  agreeTerms: z.literal(true, { message: "Please accept the terms and policies" }),
  /** honeypot — must stay empty */
  company: z.string().max(0).optional().default(""),
});

export type CheckoutInput = z.input<typeof checkoutSchema>;
export type CheckoutData = z.output<typeof checkoutSchema>;

export const inquirySchema = z.object({
  kind: z.enum(["event", "contact"]),
  name: name("Name"),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().max(30).optional().default(""),
  eventType: z.string().trim().max(60).optional().default(""),
  eventDate: z.string().trim().max(20).optional().default(""),
  venue: z.string().trim().max(160).optional().default(""),
  guests: z.string().trim().max(20).optional().default(""),
  budget: z.string().trim().max(40).optional().default(""),
  subject: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(3000, "Message is too long"),
  company: z.string().max(0).optional().default(""),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryData = z.output<typeof inquirySchema>;

/** Flatten zod issues into { field: message } for inline form errors. */
export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
