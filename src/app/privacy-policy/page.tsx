import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site, addressLine } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NancyLem Florist (NancyLem LLC) collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" crumb="Privacy Policy">
      <p>
        {site.company.legalName} (&ldquo;we,&rdquo; &ldquo;us&rdquo;), doing business as {site.name}, operates{" "}
        {site.domain}. This policy describes what personal information we collect, how we use it and the choices you
        have.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Order information:</strong> your name, email and phone; the recipient&rsquo;s name, phone and delivery address; card messages and delivery notes.</li>
        <li><strong>Inquiry information:</strong> details you share through our contact and event forms.</li>
        <li><strong>Technical information:</strong> IP address and basic request logs used for security and spam prevention.</li>
      </ul>
      <p>
        We do not collect payment card numbers on this website. Payments are processed by a third-party payment
        provider through a secure link, under that provider&rsquo;s privacy policy.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To confirm, fulfill and deliver your order, including sharing delivery details with the florist and courier who deliver it.</li>
        <li>To communicate with you about your order or inquiry.</li>
        <li>To prevent fraud and abuse and keep our services secure.</li>
        <li>To comply with legal, tax and accounting obligations.</li>
      </ul>
      <p>We do not sell or rent your personal information, and we do not share it for cross-context behavioral advertising.</p>

      <h2>Cookies</h2>
      <p>
        This website uses only cookies that are strictly necessary for it to work (for example, to keep our staff
        signed in to the order dashboard). We do not use advertising or tracking cookies.
      </p>

      <h2>Retention</h2>
      <p>
        We keep order records for as long as needed to provide our services and meet legal and accounting
        requirements (generally up to seven years), and inquiry records for up to two years.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your state of residence (for example, California, Colorado, Connecticut, Virginia and others),
        you may have the right to access, correct, delete or obtain a copy of your personal information, and to opt
        out of certain processing. To make a request, email <a href={`mailto:${site.email}`}>{site.email}</a>. We will
        verify and respond within the time required by law. We will not discriminate against you for exercising these
        rights.
      </p>

      <h2>Children</h2>
      <p>Our services are not directed to children under 13, and we do not knowingly collect their personal information.</p>

      <h2>Security</h2>
      <p>
        We use HTTPS encryption, access controls and reasonable administrative safeguards to protect your information.
        No method of transmission or storage is completely secure, but we work hard to protect your data.
      </p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date above shows when it last changed.</p>

      <h2>Contact</h2>
      <p>
        {site.company.legalName}, Attn: Privacy — {addressLine}, {site.company.address.country}
        <br />
        <a href={`mailto:${site.email}`}>{site.email}</a> · {site.phone}
      </p>
    </LegalPage>
  );
}
