"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShoppingBag, Zap } from "lucide-react";
import { addOns, quote, sizes, usd, DELIVERY_FEE, FREE_DELIVERY_OVER, type AddOnId, type Product, type SizeId } from "@/lib/catalog";
import { useCart } from "./CartProvider";
import QtyStepper from "./QtyStepper";

export default function AddToCart({ product }: { product: Product }) {
  const router = useRouter();
  const { add, closeDrawer } = useCart();
  const [size, setSize] = useState<SizeId>("classic");
  const [extras, setExtras] = useState<AddOnId[]>([]);
  const [qty, setQty] = useState(1);

  const q = quote(product, size, extras);
  const unit = q.item + q.extras;
  const line = { slug: product.slug, size: product.singleSize ? "classic" : size, addOns: extras, qty };

  const toggleExtra = (id: AddOnId) => setExtras((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <div className="space-y-9">
      {!product.singleSize && (
        <fieldset>
          <legend className="eyebrow mb-4">Choose a size</legend>
          <div className="grid grid-cols-3 gap-2.5">
            {sizes.map((s) => {
              const active = size === s.id;
              return (
                <label
                  key={s.id}
                  className={`relative flex cursor-pointer flex-col rounded-2xl border-[1.5px] p-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-poppy md:p-4 ${
                    active ? "border-ink bg-card" : "border-line hover:border-ink/50"
                  }`}
                >
                  <input type="radio" name="size" value={s.id} checked={active} onChange={() => setSize(s.id)} className="sr-only" />
                  <span className="font-display text-lg font-medium md:text-xl">{s.label}</span>
                  <span className="mt-0.5 text-sm font-semibold tabular-nums">{usd(product.price + s.add)}</span>
                  <span className="mt-1 text-xs leading-snug text-ink-soft">{s.note}</span>
                  {active && (
                    <span className="absolute right-2.5 top-2.5 inline-flex size-5 items-center justify-center rounded-full bg-ink text-paper">
                      <Check className="size-3" aria-hidden />
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="eyebrow mb-4">Make it extra (optional)</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {addOns.map((a) => {
            const on = extras.includes(a.id);
            return (
              <label
                key={a.id}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border-[1.5px] px-4 py-3 text-sm transition-colors ${
                  on ? "border-ink bg-card" : "border-line hover:border-ink/50"
                }`}
              >
                <input type="checkbox" checked={on} onChange={() => toggleExtra(a.id)} className="size-4 accent-[var(--color-poppy)]" />
                <span className="flex-1">{a.label}</span>
                <span className="font-semibold tabular-nums">+{usd(a.price)}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="rounded-[1.5rem] bg-ink p-6 text-paper md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-paper/60">Price</p>
            <p className="font-display text-4xl font-medium tabular-nums" aria-live="polite">
              {usd(unit * qty)}
            </p>
          </div>
          <div className="rounded-full bg-paper text-ink">
            <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, Math.min(10, n)))} label="Quantity" />
          </div>
        </div>
        <p className="mt-2 text-xs text-paper/60">
          Delivery {usd(DELIVERY_FEE)} · free on orders over {usd(FREE_DELIVERY_OVER)}. Choose your delivery date at checkout.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button type="button" className="btn btn-primary !min-h-14" onClick={() => add(line)}>
            <ShoppingBag className="size-4" aria-hidden /> Add to cart
          </button>
          <button
            type="button"
            className="btn !min-h-14 bg-paper text-ink hover:bg-blush"
            onClick={() => {
              add(line);
              closeDrawer();
              router.push("/checkout");
            }}
          >
            <Zap className="size-4" aria-hidden /> Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
