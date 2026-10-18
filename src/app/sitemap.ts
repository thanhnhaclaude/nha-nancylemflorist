import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/catalog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" | "yearly" = "weekly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "daily"),
    page("/shop", 0.9, "daily"),
    ...collections.map((c) => page(`/collections/${c.slug}`, 0.8)),
    ...products.map((p) => page(`/shop/${p.slug}`, 0.7)),
    page("/weddings-events", 0.8, "monthly"),
    page("/about", 0.5, "monthly"),
    page("/faq", 0.5, "monthly"),
    page("/contact", 0.5, "monthly"),
    page("/shipping-policy", 0.3, "yearly"),
    page("/return-policy", 0.3, "yearly"),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
