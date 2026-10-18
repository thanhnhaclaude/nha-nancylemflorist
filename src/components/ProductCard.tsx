import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Product, usd } from "@/lib/catalog";

export default function ProductCard({
  product,
  priority = false,
  tall = false,
  index = 0,
}: {
  product: Product;
  priority?: boolean;
  tall?: boolean;
  index?: number;
}) {
  return (
    <article data-reveal style={{ ["--d" as string]: `${(index % 4) * 80}ms` }} className="group relative">
      <div className={`relative overflow-hidden rounded-[1.25rem] bg-paper-2 ${tall ? "aspect-[3/4.3]" : "aspect-[4/5]"}`}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          loading={priority ? "eager" : "lazy"}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
        />
        {product.badge && (
          <span className="eyebrow absolute left-3 top-3 rounded-full bg-paper px-3 py-1.5 text-[0.62rem]">{product.badge}</span>
        )}
        <span
          aria-hidden
          className="absolute bottom-3 right-3 inline-flex size-11 translate-y-2 items-center justify-center rounded-full bg-poppy text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-medium md:text-2xl">
            <Link href={`/shop/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{product.short}</p>
        </div>
        <p className="shrink-0 pt-1 text-sm font-semibold tabular-nums">
          {product.singleSize ? "" : <span className="font-normal text-ink-soft">from </span>}
          {usd(product.price)}
        </p>
      </div>
    </article>
  );
}
