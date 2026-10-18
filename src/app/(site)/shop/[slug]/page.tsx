import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Flower2, PenLine, Truck } from "lucide-react";
import AddToCart from "@/components/cart/AddToCart";
import ProductCard from "@/components/ProductCard";
import { getCollection, getProduct, products, usd } from "@/lib/catalog";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.short.replace(/\.$/, "")}`,
    description: `${p.description.slice(0, 150)}…`,
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: { title: `${p.name} | ${site.name}`, images: [{ url: p.image, alt: p.imageAlt }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const primary = getCollection(product.collections[0]);
  const related = products
    .filter((p) => p.slug !== product.slug && p.collections.some((c) => product.collections.includes(c)))
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `${site.url}${product.image}`,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${site.url}/shop/${product.slug}`,
      seller: { "@type": "Organization", name: site.company.legalName },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x pt-6 md:pt-10">
        <nav aria-label="Breadcrumb" className="eyebrow text-[0.68rem] text-ink-soft">
          <Link href="/" className="link-u">Home</Link>
          <span aria-hidden> / </span>
          <Link href="/shop" className="link-u">Shop</Link>
          {primary && (
            <>
              <span aria-hidden> / </span>
              <Link href={`/collections/${primary.slug}`} className="link-u">{primary.name}</Link>
            </>
          )}
          <span aria-hidden> / </span>
          <span aria-current="page">{product.name}</span>
        </nav>
      </div>

      <section className="container-x grid gap-10 pb-20 pt-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-2">
              <Image src={product.image} alt={product.imageAlt} fill preload fetchPriority="high" sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
              {product.badge && (
                <span className="eyebrow absolute left-4 top-4 rounded-full bg-paper px-3.5 py-2 text-[0.65rem]">{product.badge}</span>
              )}
            </div>
            <ul className="mt-5 grid grid-cols-3 gap-3 text-xs text-ink-soft">
              <li className="flex items-center gap-2 rounded-2xl border border-line p-3">
                <Truck className="size-4 shrink-0 text-poppy" aria-hidden /> Same-day available
              </li>
              <li className="flex items-center gap-2 rounded-2xl border border-line p-3">
                <PenLine className="size-4 shrink-0 text-poppy" aria-hidden /> Handwritten card
              </li>
              <li className="flex items-center gap-2 rounded-2xl border border-line p-3">
                <Flower2 className="size-4 shrink-0 text-poppy" aria-hidden /> 7-day freshness
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6">
          <p className="eyebrow text-poppy">{product.palette}</p>
          <h1 className="mt-3 text-[clamp(2.75rem,6vw,5rem)] font-medium leading-[0.92] tracking-[-0.035em]">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold tabular-nums">
            {!product.singleSize && <span className="text-base font-normal text-ink-soft">from </span>}
            {usd(product.price)}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.stems.map((s) => (
              <span key={s} className="rounded-full border border-line px-3.5 py-1.5 text-xs">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            Every bouquet is designed by hand from that day&rsquo;s fresh stock, so stems and shades may vary slightly
            from the photo while keeping the same look, value and feeling.
          </p>

          <div className="mt-10 border-t border-ink pt-10">
            <AddToCart product={product} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related" className="border-t border-line bg-card">
          <div className="container-x py-20">
            <h2 id="related" className="text-4xl font-medium md:text-5xl">
              You might also <em>love</em>
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
