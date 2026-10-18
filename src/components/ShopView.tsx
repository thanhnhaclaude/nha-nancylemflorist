import Image from "next/image";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { collections, type Collection, type Product } from "@/lib/catalog";

export default function ShopView({
  products,
  collection,
}: {
  products: Product[];
  collection?: Collection;
}) {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-x grid gap-10 pb-14 pt-10 md:pt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="eyebrow text-[0.68rem] text-ink-soft">
              <Link href="/" className="link-u">Home</Link>
              <span aria-hidden> / </span>
              {collection ? (
                <>
                  <Link href="/shop" className="link-u">Shop</Link>
                  <span aria-hidden> / </span>
                  <span aria-current="page">{collection.name}</span>
                </>
              ) : (
                <span aria-current="page">Shop</span>
              )}
            </nav>
            <p className="eyebrow mt-8 text-poppy">{collection ? collection.kicker : "Every bouquet, every occasion"}</p>
            <h1 className="mt-4 text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.04em]">
              {collection ? collection.name : <>Shop <em>all</em> flowers</>}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              {collection
                ? collection.intro
                : "Hand-tied bouquets, vased arrangements and plants — every one designed the morning it ships."}
            </p>
          </div>
          {collection && (
            <div className="relative hidden aspect-[5/4] overflow-hidden rounded-[1.75rem] lg:col-span-4 lg:col-start-9 lg:block">
              <Image src={collection.image} alt="" fill loading="eager" sizes="33vw" className="object-cover" />
            </div>
          )}
        </div>

        <div className="container-x pb-6">
          <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]" aria-label="Collections">
            <Chip href="/shop" active={!collection}>All</Chip>
            {collections.map((c) => (
              <Chip key={c.slug} href={`/collections/${c.slug}`} active={collection?.slug === c.slug}>
                {c.name}
              </Chip>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <p className="mb-8 text-sm text-ink-soft" aria-live="polite">
          {products.length} {products.length === 1 ? "design" : "designs"}
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} priority={i < 4} />
          ))}
        </div>
      </section>
    </>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <li className="shrink-0">
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors ${
          active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
