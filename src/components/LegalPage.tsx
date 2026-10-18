import PageHero from "./PageHero";

export const LEGAL_UPDATED = "October 18, 2026";

export default function LegalPage({ title, crumb, children }: { title: string; crumb: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero crumb={crumb} eyebrow={`Last updated ${LEGAL_UPDATED}`} title={title} />
      <article className="container-x py-16 md:py-24">
        <div className="prose-legal max-w-3xl">{children}</div>
      </article>
    </>
  );
}
