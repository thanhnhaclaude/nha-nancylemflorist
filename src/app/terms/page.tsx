import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site, addressLine } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of nancylemflorist.com and orders placed with NancyLem Florist (NancyLem LLC).",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" crumb="Terms of Service">
      <p>
        These Terms of Service govern your use of {site.domain} and any order or inquiry you place with {site.name}, a
        trade name of {site.company.legalName}, a {site.company.state} limited liability company (Filing ID{" "}
        {site.company.filingId}). By using the site you agree to these terms.
      </p>

      <h2>1. Orders</h2>
      <p>
        Submitting an order form is a request, not a completed purchase. An order becomes binding only after we
        confirm availability and you complete payment through the secure link we send. We may decline any order, for
        example if delivery isn&rsquo;t possible to the address provided.
      </p>

      <h2>2. Prices</h2>
      <p>
        Prices are in U.S. dollars and may change without notice. The price shown when you submit your request is
        honored once confirmed. Sales tax and any applicable fees are shown before payment. If a pricing error occurs,
        we will contact you before charging anything.
      </p>

      <h2>3. Product appearance & substitutions</h2>
      <p>
        Photos are representative. Flowers are natural products; colors, sizes and varieties vary by season and
        region. Substitutions are handled as described in our <Link href="/delivery-policy">Delivery & Refund Policy</Link>.
      </p>

      <h2>4. Delivery, cancellations & refunds</h2>
      <p>
        Delivery timing, cancellations and our freshness guarantee are governed by our{" "}
        <Link href="/delivery-policy">Delivery & Refund Policy</Link>, which is part of these terms.
      </p>

      <h2>5. Card messages & content</h2>
      <p>
        You are responsible for the content of card messages and information you submit. We may refuse to include
        messages that are unlawful, harassing or offensive.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The site&rsquo;s design, text, logos and arrangements are owned by or licensed to {site.company.legalName}.
        Some photographs are used under license from their creators. You may not copy or reuse site content without
        permission.
      </p>

      <h2>7. Acceptable use</h2>
      <p>You agree not to misuse the site, submit false information, attempt to gain unauthorized access, or interfere with its operation.</p>

      <h2>8. Disclaimer & limitation of liability</h2>
      <p>
        The site is provided &ldquo;as is.&rdquo; To the fullest extent permitted by law, our total liability for any
        claim relating to an order is limited to the amount you paid for that order, and we are not liable for
        indirect, incidental or consequential damages.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of {site.company.state}, without regard to conflict-of-law
        rules. Disputes will be resolved in the state or federal courts located in {site.company.state}, unless
        applicable consumer-protection law provides otherwise.
      </p>

      <h2>10. Changes</h2>
      <p>We may update these terms. Changes apply to orders placed after the updated terms are posted.</p>

      <h2>Contact</h2>
      <p>
        {site.company.legalName} — {addressLine}, {site.company.address.country}
        <br />
        <a href={`mailto:${site.email}`}>{site.email}</a> · {site.phone}
      </p>
    </LegalPage>
  );
}
