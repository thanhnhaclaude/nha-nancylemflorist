import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delivery, Substitution & Refund Policy",
  description: "NancyLem Florist delivery areas, same-day cutoff, fees, substitutions, cancellations and refunds.",
  alternates: { canonical: "/delivery-policy" },
};

export default function DeliveryPolicyPage() {
  return (
    <LegalPage title="Delivery & Refunds" crumb="Delivery & Refunds">
      <p>
        This policy explains how {site.name} (operated by {site.company.legalName}) delivers your flowers and what
        happens if something isn&rsquo;t right.
      </p>

      <h2>Delivery areas</h2>
      <p>
        We deliver to all 50 states and Washington, DC. Orders are fulfilled by our studio or by independent partner
        florists we&rsquo;ve vetted, who design from our recipes and hand-deliver locally. We do not currently deliver
        to P.O. boxes, APO/FPO addresses or outside the United States.
      </p>

      <h2>Same-day and scheduled delivery</h2>
      <ul>
        <li>Same-day delivery is available Monday–Saturday for orders confirmed by {site.sameDayCutoff} in the recipient&rsquo;s time zone, subject to local availability.</li>
        <li>Sunday and holiday delivery is limited; we&rsquo;ll confirm availability with you.</li>
        <li>Delivery windows are typically 9:00 AM–7:00 PM. Specific times cannot be guaranteed, but we&rsquo;ll do our best to honor requests for events and services.</li>
      </ul>

      <h2>Delivery fees</h2>
      <p>Delivery is $15.99 per address and free for orders of $150 or more before tax. Applicable sales tax is shown on your payment link.</p>

      <h2>Incorrect or incomplete addresses</h2>
      <p>
        Please double-check the recipient&rsquo;s address and phone number. If an order can&rsquo;t be delivered
        because of incorrect information, or the recipient refuses delivery, a redelivery fee may apply.
      </p>

      <h2>Substitutions</h2>
      <p>
        Flowers are seasonal and natural. To deliver the freshest possible product, we may substitute stems, colors or
        containers of equal or greater value while preserving the overall look and feel of your arrangement. For
        significant substitutions we will contact you first.
      </p>

      <h2>Cancellations & changes</h2>
      <ul>
        <li>Because nothing is charged until we confirm your order, you can cancel an unconfirmed request at any time at no cost.</li>
        <li>Paid orders can be cancelled for a full refund up to 24 hours before the scheduled delivery date.</li>
        <li>Within 24 hours of delivery, design work may already be underway; we&rsquo;ll offer a store credit or partial refund where possible.</li>
        <li>Event and wedding bookings are governed by the terms in your signed proposal.</li>
      </ul>

      <h2>7-day freshness promise & refunds</h2>
      <p>
        If your flowers arrive damaged, are noticeably different from what you ordered, or don&rsquo;t last at least
        seven days with basic care, contact us within seven days of delivery with a photo. We will, at your choice,
        redeliver a replacement or issue a refund or store credit. Plants are guaranteed for 30 days.
      </p>
      <p>
        Contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone}. See also our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
