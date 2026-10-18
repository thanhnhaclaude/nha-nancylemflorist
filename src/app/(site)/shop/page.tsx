import type { Metadata } from "next";
import ShopView from "@/components/ShopView";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop Flowers — Bouquets, Arrangements & Plants",
  description:
    "Shop hand-tied bouquets, vased arrangements and plants from NancyLem Florist. Same-day delivery in partner cities and next-day delivery nationwide.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return <ShopView products={products} />;
}
