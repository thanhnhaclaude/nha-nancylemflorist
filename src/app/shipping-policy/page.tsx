import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { DELIVERY_FEE, FREE_DELIVERY_OVER, usd } from "@/lib/catalog";
import { site, addressFull } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description:
    "NancyLem Florist delivery areas, delivery windows, same-day cutoff, fees and how we keep flowers fresh in transit. Operated by NancyLem LLC.",
  alternates: { canonical: "/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping & Delivery Policy" crumb="Shipping & Delivery Policy">
      <p>
        This Shipping &amp; Delivery Policy applies to all orders placed on {site.domain}, operated by{" "}
        {site.company.legalName} (&ldquo;{site.name},&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). Fresh flowers are
        perishable, so we hand-deliver them rather than shipping them by parcel carrier.
      </p>

      <h2>1. Where we deliver</h2>
      <ul>
        <li>All 50 U.S. states and Washington, DC.</li>
        <li>
          Orders are designed and hand-delivered by our own studio team or by an independent local partner florist we
          have vetted for quality, working from our designs.
        </li>
        <li>We do not deliver to P.O. boxes, APO/FPO/DPO addresses, or addresses outside the United States.</li>
        <li>For some rural or remote addresses we may need to schedule next-day delivery; we will contact you first.</li>
      </ul>

      <h2>2. Delivery days and time windows</h2>
      <table className="my-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-ink">
            <th className="py-2 pr-4 font-semibold">Delivery type</th>
            <th className="py-2 pr-4 font-semibold">Order by</th>
            <th className="py-2 font-semibold">Delivery window</th>
          </tr>
        </thead>
        <tbody className="text-ink-soft">
          <tr className="border-b border-line">
            <td className="py-3 pr-4">Same-day (Mon–Sat)</td>
            <td className="py-3 pr-4">{site.sameDayCutoff} recipient&rsquo;s local time</td>
            <td className="py-3">12:00 PM – 7:00 PM</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-3 pr-4">Scheduled (Mon–Sat)</td>
            <td className="py-3 pr-4">Any time before the delivery date</td>
            <td className="py-3">9:00 AM – 7:00 PM</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-3 pr-4">Sunday &amp; holidays</td>
            <td className="py-3 pr-4">Limited availability</td>
            <td className="py-3">We confirm by email</td>
          </tr>
        </tbody>
      </table>
      <p>
        We cannot guarantee a specific time of day, but we will do our best to honor timing requests for events,
        hospitals, offices and funeral services. Add them in &ldquo;Notes for the florist&rdquo; at checkout. On peak
        holidays (Valentine&rsquo;s Day, Mother&rsquo;s Day) delivery may run until 9:00 PM.
      </p>

      <h2>3. Delivery fees</h2>
      <ul>
        <li>Standard hand delivery: {usd(DELIVERY_FEE)} per order (one delivery address).</li>
        <li>Free delivery on orders of {usd(FREE_DELIVERY_OVER)} or more before tax.</li>
        <li>All fees are shown in your cart and on the secure payment page before you pay. There are no hidden charges.</li>
      </ul>

      <h2>4. How we care for flowers in transit</h2>
      <ul>
        <li>Every bouquet is designed on the day of delivery from fresh stock that has been conditioned in water for at least 24 hours.</li>
        <li>Bouquets are delivered with a water source (hydration pack or vase) so stems never sit dry.</li>
        <li>Deliveries travel in climate-controlled vehicles and are hand-carried to the door — never boxed and shipped overnight.</li>
        <li>In extreme heat or cold we time deliveries to limit exposure and will not leave flowers outside in unsafe temperatures.</li>
        <li>Each order includes a care card with instructions to keep your flowers fresh for at least seven days.</li>
      </ul>

      <h2>5. If the recipient is not available</h2>
      <p>
        Our driver will call the recipient on arrival. If no one answers, flowers may be left in a safe, shaded spot,
        with a neighbor, or at a front desk or reception where appropriate. If none of these is possible, we will contact
        you and reattempt delivery the next delivery day at no extra cost.
      </p>

      <h2>6. Incorrect address or refused delivery</h2>
      <p>
        Please double-check the recipient&rsquo;s name, address and phone number. If a delivery fails because of
        incorrect or incomplete information provided at checkout, or the recipient refuses the delivery, a redelivery
        fee of {usd(DELIVERY_FEE)} may apply. You can update delivery details by contacting us before the delivery
        date.
      </p>

      <h2>7. Delivery confirmation</h2>
      <p>
        You receive an order confirmation by email immediately after payment. On request we can send a delivery
        confirmation once your flowers have been delivered.
      </p>

      <h2>8. Problems with your delivery</h2>
      <p>
        If your flowers arrive late, damaged or different from what you ordered, please see our{" "}
        <Link href="/refund-policy">Refund &amp; Return Policy</Link> — we will make it right.
      </p>

      <h2>Contact</h2>
      <p>
        {site.company.legalName} · {addressFull()}
        <br />
        Email <a href={`mailto:${site.email}`}>{site.email}</a> · Phone {site.phone}
      </p>
    </LegalPage>
  );
}
