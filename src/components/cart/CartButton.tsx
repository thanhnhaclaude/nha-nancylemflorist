"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export default function CartButton() {
  const { count, ready, openDrawer } = useCart();
  return (
    <button
      type="button"
      onClick={openDrawer}
      className="relative inline-flex size-11 items-center justify-center rounded-full border border-line hover:border-ink"
      aria-label={`Open cart${ready && count ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
    >
      <ShoppingBag className="size-5" aria-hidden />
      {ready && count > 0 && (
        <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-poppy px-1 text-[0.68rem] font-bold leading-5 text-white tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}
