import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopView from "@/components/ShopView";
import { collections, getCollection, productsIn } from "@/lib/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCollection((await params).slug);
  if (!c) return {};
  return {
    title: `${c.name} Flowers & Delivery`,
    description: c.intro,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: { images: [c.image] },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCollection((await params).slug);
  if (!c) notFound();
  return <ShopView collection={c} products={productsIn(c.slug)} />;
}
