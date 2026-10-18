"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import QtyStepper from "./QtyStepper";
import { FREE_DELIVERY_OVER, usd } from "@/lib/catalog";

export default function CartDrawer() {
  const { totals, drawerOpen, closeDrawer, setQty, remove } = useCart();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  // Follows drawerOpen one frame later so the slide-in also animates on the very first open.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(drawerOpen));
    return () => cancelAnimationFrame(id);
  }, [drawerOpen]);

  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      closeDrawer();
    }
  }, [pathname, closeDrawer]);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [drawerOpen, closeDrawer]);

  const toFree = FREE_DELIVERY_OVER - totals.subtotal;

  return (
    <div className={`fixed inset-0 z-[60] ${drawerOpen ? "visible" : "invisible"}`} aria-hidden={!drawerOpen} inert={!drawerOpen}>
      <div
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"}`}
        onClick={closeDrawer}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          shown ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 id="cart-title" className="text-3xl font-medium">
            Your cart
          </h2>
          <button type="button" onClick={closeDrawer} className="inline-flex size-11 items-center justify-center rounded-full border border-line" aria-label="Close cart">
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {totals.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <ShoppingBag className="size-10 text-ink-soft" strokeWidth={1.25} aria-hidden />
            <p className="text-ink-soft">Your cart is empty.</p>
            <Link href="/shop" className="btn btn-ink" onClick={closeDrawer}>
              Shop flowers
            </Link>
          </div>
        ) : (
          <>
            <p className="bg-blush/50 px-6 py-3 text-sm">
              {toFree > 0 ? (
                <>
                  Add <strong>{usd(toFree)}</strong> more for free delivery.
                </>
              ) : (
                <strong>You&rsquo;ve unlocked free delivery.</strong>
              )}
            </p>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {totals.items.map((item, index) => (
                <li key={`${item.slug}-${item.size}-${item.addOns.join()}`} className="flex gap-4 py-5">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-paper-2">
                    <Image src={item.product.image} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/shop/${item.slug}`} className="font-display text-xl leading-tight hover:text-poppy-dark">
                        {item.product.name}
                      </Link>
                      <span className="shrink-0 text-sm font-semibold tabular-nums">{usd(item.lineTotal)}</span>
                    </div>
                    <p className="mt-1 text-xs text-ink-soft">
                      {[item.sizeLabel, ...item.addOnLabels].filter(Boolean).join(" · ") || "One size"}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <QtyStepper size="sm" value={item.qty} onChange={(n) => setQty(index, n)} label={`Quantity of ${item.product.name}`} />
                      <button type="button" onClick={() => remove(index)} className="inline-flex size-9 items-center justify-center rounded-full text-ink-soft hover:bg-paper-2 hover:text-poppy-dark" aria-label={`Remove ${item.product.name}`}>
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-6 pb-6 pt-5">
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Subtotal</dt>
                  <dd className="font-semibold tabular-nums">{usd(totals.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Delivery</dt>
                  <dd className="tabular-nums">{totals.delivery ? usd(totals.delivery) : "Free"}</dd>
                </div>
              </dl>
              <Link href="/checkout" className="btn btn-primary mt-5 w-full !min-h-14" onClick={closeDrawer}>
                Checkout · {usd(totals.total)} <ArrowRight className="size-4" aria-hidden />
              </Link>
              <button type="button" onClick={closeDrawer} className="mt-3 w-full py-2 text-sm font-medium underline underline-offset-4">
                Continue shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
