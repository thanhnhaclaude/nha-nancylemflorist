import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site, addressFull } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund & Return Policy",
  description:
    "Replacements and refunds for damaged, late or incorrect flower deliveries, our 7-day freshness guarantee, and cancellations. NancyLem Florist is operated by NancyLem LLC.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund & Return Policy" crumb="Refund & Return Policy">
      <p>
        At {site.name}, operated by {site.company.legalName}, we want every delivery to be right. Because flowers and
        plants are perishable, we cannot accept physical returns — but if something isn&rsquo;t right, we will replace
        your order or refund you as described below.
      </p>

      <h2>1. Damaged, wilted or incorrect deliveries</h2>
      <p>If your order arrives damaged, crushed, wilted, or noticeably different from what you ordered:</p>
      <ul>
        <li>
          Contact us within <strong>48 hours of delivery</strong> at <a href={`mailto:${site.email}`}>{site.email}</a>{" "}
          or {site.phone}, with your order number and a photo of the flowers as received.
        </li>
        <li>
          We will, at your choice, <strong>redeliver a fresh replacement at no charge</strong> (usually within one
          delivery day) or issue a <strong>full refund</strong> of the affected items and delivery fee.
        </li>
        <li>You do not need to return the damaged flowers.</li>
      </ul>

      <h2>2. 7-day freshness guarantee</h2>
      <p>
        Fresh-cut flowers are guaranteed to last at least <strong>7 days</strong> from delivery when cared for as
        described on the included care card (trim stems, change water every two days, keep away from heat and ripening
        fruit). If they don&rsquo;t, send us a photo within 7 days of delivery and we will send a replacement or issue a
        refund or store credit. Potted plants are guaranteed for <strong>30 days</strong>; dried and preserved
        arrangements are guaranteed to arrive intact.
      </p>

      <h2>3. Late or missed deliveries</h2>
      <p>
        If we miss the delivery date you selected for reasons within our control, we will refund the delivery fee and,
        if the occasion has passed and you no longer want the flowers, refund the full order.
      </p>

      <h2>4. Substitutions</h2>
      <p>
        Flowers are seasonal. We may substitute stems, colors or containers of equal or greater value while keeping the
        style and palette of your arrangement. Substitutions of this kind are not grounds for a refund; if a key flower
        is unavailable we will contact you first and you may cancel for a full refund.
      </p>

      <h2>5. Cancellations and changes</h2>
      <ul>
        <li>
          <strong>More than 24 hours before the delivery date:</strong> cancel for a full refund, or change the date,
          address or card message free of charge.
        </li>
        <li>
          <strong>Within 24 hours of the delivery date:</strong> your flowers may already be purchased and designed. We
          will offer a full store credit or, where the order has not yet been prepared, a refund.
        </li>
        <li>
          <strong>Weddings and events:</strong> governed by the deposit and cancellation terms in your signed proposal.
        </li>
      </ul>

      <h2>6. How refunds are issued</h2>
      <ul>
        <li>Refunds go back to the original payment method through our payment processor, Stripe.</li>
        <li>We issue approved refunds within 2 business days; your bank may take 5–10 business days to post them.</li>
        <li>Store credits do not expire and can be used on any future order.</li>
      </ul>

      <h2>7. Non-refundable situations</h2>
      <ul>
        <li>Delivery failed because of an incorrect address or phone number provided at checkout, or the recipient refused delivery.</li>
        <li>Flowers left as instructed (for example, at a front desk) and later mishandled by a third party.</li>
        <li>Claims made more than 7 days after delivery (30 days for plants).</li>
      </ul>

      <h2>Contact us</h2>
      <p>
        {site.company.legalName} · {addressFull()}
        <br />
        Email <a href={`mailto:${site.email}`}>{site.email}</a> · Phone {site.phone}
        <br />
        See also our <Link href="/shipping-policy">Shipping &amp; Delivery Policy</Link> and{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
