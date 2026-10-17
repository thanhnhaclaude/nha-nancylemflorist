import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { site, addressLine } from "./site";
import { usd } from "./catalog";
import type { InquiryRecord, OrderRecord } from "./store";

export function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

let transporter: Transporter | null = null;
function getTransport() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f4eee6;font-family:Helvetica,Arial,sans-serif;color:#17120f">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fbf8f4;border-radius:16px;overflow:hidden">
<tr><td style="background:#17120f;color:#f4eee6;padding:24px 32px;font-family:Georgia,serif;font-size:26px;font-style:italic">NancyLem <span style="font-family:Helvetica,Arial,sans-serif;font-style:normal;font-size:11px;letter-spacing:3px">FLORIST<span style="color:#d42a3a">.</span></span></td></tr>
<tr><td style="padding:32px"><h1 style="font-family:Georgia,serif;font-weight:normal;font-size:28px;margin:0 0 16px">${title}</h1>${body}</td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #d8ccbd;font-size:12px;color:#4a403a;line-height:1.6">
${site.name} · ${site.phone} · <a href="mailto:${site.email}" style="color:#4a403a">${site.email}</a><br>${site.company.legalName} · ${esc(addressLine)}
</td></tr></table></td></tr></table></body></html>`;
}

function rows(pairs: [string, string | undefined][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5">${pairs
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:#4a403a;width:38%;vertical-align:top">${k}</td><td style="padding:6px 0;vertical-align:top">${esc(v!).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;
}

function orderRows(o: OrderRecord) {
  return rows([
    ["Order", o.id],
    ["Arrangement", `${o.productName}${o.sizeLabel ? ` (${o.sizeLabel})` : ""}`],
    ["Extras", o.addOnLabels.join(", ") || undefined],
    ["Delivery date", o.deliveryDate],
    ["Recipient", `${o.recipientName}\n${o.recipientPhone}`],
    ["Address", `${o.address1}${o.address2 ? `, ${o.address2}` : ""}\n${o.city}, ${o.state} ${o.zip}\n(${o.locationType})`],
    ["Card message", o.cardMessage || undefined],
    ["Notes", o.instructions || undefined],
    ["Subtotal", usd(o.subtotal)],
    ["Delivery", o.delivery ? usd(o.delivery) : "Free"],
    ["Estimated total", `${usd(o.total)} + tax`],
  ]);
}

async function send(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  if (!smtpConfigured()) {
    console.warn(`[mail] SMTP not configured — skipped "${opts.subject}"`);
    return false;
  }
  try {
    await getTransport().sendMail({
      from: `"${site.name}" <${process.env.SMTP_USER}>`,
      ...opts,
    });
    return true;
  } catch (e) {
    console.error("[mail] send failed:", (e as Error).message);
    return false;
  }
}

const shopInbox = () => process.env.SHOP_EMAIL || site.email;

export async function sendOrderEmails(o: OrderRecord) {
  await Promise.all([
    send({
      to: shopInbox(),
      replyTo: o.senderEmail,
      subject: `New order ${o.id} · ${o.productName} · ${o.deliveryDate}`,
      html: layout(
        `New order request`,
        `${rows([["Customer", `${o.senderName}\n${o.senderEmail}\n${o.senderPhone}`]])}<hr style="border:0;border-top:1px solid #d8ccbd;margin:16px 0">${orderRows(o)}`,
      ),
    }),
    send({
      to: o.senderEmail,
      subject: `We received your order request — ${o.id}`,
      html: layout(
        `Thank you, ${esc(o.senderName.split(" ")[0])}.`,
        `<p style="font-size:15px;line-height:1.6;margin:0 0 20px">A florist will review your order and contact you within business hours to confirm the details and send a secure payment link. <strong>Nothing has been charged yet.</strong></p>${orderRows(o)}<p style="font-size:14px;line-height:1.6;margin:20px 0 0">Questions? Reply to this email or call ${site.phone}.</p>`,
      ),
    }),
  ]);
}

export async function sendInquiryEmails(q: InquiryRecord) {
  const label = q.kind === "event" ? "Event inquiry" : "Contact message";
  await Promise.all([
    send({
      to: shopInbox(),
      replyTo: q.email,
      subject: `${label} ${q.id} · ${q.name}${q.eventDate ? ` · ${q.eventDate}` : ""}`,
      html: layout(
        label,
        rows([
          ["Reference", q.id],
          ["Name", q.name],
          ["Email", q.email],
          ["Phone", q.phone || undefined],
          ["Subject", q.subject || undefined],
          ["Event type", q.eventType || undefined],
          ["Event date", q.eventDate || undefined],
          ["Venue / city", q.venue || undefined],
          ["Guests", q.guests || undefined],
          ["Budget", q.budget || undefined],
          ["Message", q.message],
        ]),
      ),
    }),
    send({
      to: q.email,
      subject: `${site.name} — we got your message (${q.id})`,
      html: layout(
        `Thanks, ${esc(q.name.split(" ")[0])}.`,
        `<p style="font-size:15px;line-height:1.6;margin:0">${
          q.kind === "event"
            ? "Our events team will review your details and reply with ideas and a custom proposal within two business days."
            : "We'll get back to you within one business day. For same-day orders, please call us."
        }</p><p style="font-size:14px;color:#4a403a;margin:20px 0 0">Reference: ${q.id}</p>`,
      ),
    }),
  ]);
}
