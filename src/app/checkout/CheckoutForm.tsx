"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Lock, ShieldCheck, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import QtyStepper from "@/components/cart/QtyStepper";
import { usd } from "@/lib/catalog";
import { checkoutSchema, earliestDeliveryDate, fieldErrors, latestDeliveryDate } from "@/lib/schemas";
import { US_STATES } from "@/lib/site";

type Errors = Record<string, string>;

export default function CheckoutForm({ online }: { online: boolean }) {
  const router = useRouter();
  const { lines, ready, totals, setQty, remove, clear } = useCart();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [card, setCard] = useState("");
  const minDate = useMemo(() => earliestDeliveryDate(), []);
  const maxDate = useMemo(() => latestDeliveryDate(), []);

  if (!ready) {
    return <div className="mt-12 h-96 animate-pulse rounded-[1.5rem] bg-paper-2" aria-label="Loading cart" />;
  }

  if (totals.items.length === 0) {
    return (
      <div className="mt-12 max-w-xl rounded-[1.5rem] border border-line bg-card p-10">
        <p className="text-lg">Your cart is empty.</p>
        <Link href="/shop" className="btn btn-ink mt-6">
          Shop flowers <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries([...fd.entries()].filter(([k]) => k !== "agreeTerms")),
      agreeTerms: fd.get("agreeTerms") === "on",
      items: lines,
    };
    const parsed = checkoutSchema.safeParse(payload);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      focusFirst(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    setServerMsg("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.redirect) {
        if (data.errors) {
          setErrors(data.errors);
          focusFirst(data.errors);
        }
        setServerMsg(data.message || "Something went wrong. Please try again or call us.");
        setStatus("error");
        return;
      }
      if (online) {
        window.location.assign(data.redirect);
      } else {
        clear();
        router.push(data.redirect);
      }
    } catch {
      setServerMsg("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  function focusFirst(errs: Errors) {
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
    el?.focus();
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const err = (n: string) => errors[n];
  const fp = (n: string) => ({
    id: n,
    name: n,
    "aria-invalid": err(n) ? true : undefined,
    "aria-describedby": err(n) ? `${n}-error` : undefined,
    onInput: () => err(n) && setErrors(({ [n]: _, ...rest }) => rest),
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-12 grid gap-12 lg:grid-cols-12">
      <div className="space-y-12 lg:col-span-7">
        <fieldset className="space-y-5">
          <legend className="eyebrow mb-5 text-base">1 · Delivery</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Delivery date" name="deliveryDate" error={err("deliveryDate")} hint="Same-day if ordered by 1 PM recipient time">
              <input type="date" min={minDate} max={maxDate} className="field" {...fp("deliveryDate")} />
            </Field>
            <Field label="Delivering to a" name="locationType" error={err("locationType")}>
              <select className="field" defaultValue="Residence" {...fp("locationType")}>
                {["Residence", "Business", "Funeral home", "Hospital", "Other"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
            <Field label="Recipient's full name" name="recipientName" error={err("recipientName")}>
              <input className="field" autoComplete="off" {...fp("recipientName")} />
            </Field>
            <Field label="Recipient's phone" name="recipientPhone" error={err("recipientPhone")} hint="Only used to arrange delivery">
              <input type="tel" inputMode="tel" className="field" {...fp("recipientPhone")} />
            </Field>
            <Field label="Street address" name="address1" error={err("address1")} className="sm:col-span-2">
              <input className="field" autoComplete="off" {...fp("address1")} />
            </Field>
            <Field label="Apt, suite, floor (optional)" name="address2" error={err("address2")} className="sm:col-span-2">
              <input className="field" autoComplete="off" {...fp("address2")} />
            </Field>
            <Field label="City" name="city" error={err("city")}>
              <input className="field" {...fp("city")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="State" name="state" error={err("state")}>
                <select className="field" defaultValue="" {...fp("state")}>
                  <option value="" disabled>
                    —
                  </option>
                  {US_STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="ZIP" name="zip" error={err("zip")}>
                <input inputMode="numeric" className="field" maxLength={10} {...fp("zip")} />
              </Field>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-5 text-base">2 · Card message</legend>
          <Field label="Handwritten card (optional)" name="cardMessage" error={err("cardMessage")} hint={`${card.length}/250 · Sign it the way you'd like it signed`}>
            <textarea rows={4} maxLength={250} className="field resize-y" value={card} {...fp("cardMessage")} onChange={(e) => setCard(e.target.value)} />
          </Field>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="eyebrow mb-5 text-base">3 · Your details</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" name="senderName" error={err("senderName")}>
              <input className="field" autoComplete="name" {...fp("senderName")} />
            </Field>
            <Field label="Your phone" name="senderPhone" error={err("senderPhone")}>
              <input type="tel" inputMode="tel" autoComplete="tel" className="field" {...fp("senderPhone")} />
            </Field>
            <Field label="Your email" name="senderEmail" error={err("senderEmail")} className="sm:col-span-2" hint="Your receipt and delivery updates go here">
              <input type="email" autoComplete="email" className="field" {...fp("senderEmail")} />
            </Field>
            <Field label="Notes for the florist (optional)" name="instructions" error={err("instructions")} className="sm:col-span-2" hint="Color preferences, gate codes, delivery timing…">
              <textarea rows={3} className="field resize-y" {...fp("instructions")} />
            </Field>
          </div>
          <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>
        </fieldset>
      </div>

      <aside className="lg:col-span-5">
        <div className="space-y-6 lg:sticky lg:top-28">
          <div className="rounded-[1.5rem] border border-line bg-card p-6">
            <h2 className="text-2xl font-medium">Order summary</h2>
            <ul className="mt-4 divide-y divide-line">
              {totals.items.map((item, index) => (
                <li key={`${item.slug}-${item.size}-${item.addOns.join()}`} className="flex gap-4 py-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-paper-2">
                    <Image src={item.product.image} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <p className="font-medium leading-snug">{item.product.name}</p>
                      <p className="shrink-0 text-sm font-semibold tabular-nums">{usd(item.lineTotal)}</p>
                    </div>
                    <p className="text-xs text-ink-soft">{[item.sizeLabel, ...item.addOnLabels].filter(Boolean).join(" · ") || "One size"}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <QtyStepper size="sm" value={item.qty} onChange={(n) => setQty(index, n)} label={`Quantity of ${item.product.name}`} />
                      <button type="button" onClick={() => remove(index)} className="inline-flex size-9 items-center justify-center rounded-full text-ink-soft hover:bg-paper-2 hover:text-poppy-dark" aria-label={`Remove ${item.product.name}`}>
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-2 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="tabular-nums">{usd(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Delivery</dt>
                <dd className="tabular-nums">{totals.delivery ? usd(totals.delivery) : "Free"}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-line pt-3">
                <dt className="eyebrow">Total</dt>
                <dd className="font-display text-4xl font-medium tabular-nums">{usd(totals.total)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-ink-soft">Sales tax, if applicable, is calculated on the payment page.</p>
          </div>

          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
              <input
                type="checkbox"
                name="agreeTerms"
                className="mt-1 size-4 shrink-0 accent-[var(--color-poppy)]"
                aria-invalid={err("agreeTerms") ? true : undefined}
                aria-describedby={err("agreeTerms") ? "agreeTerms-error" : undefined}
                onChange={() => err("agreeTerms") && setErrors(({ agreeTerms: _, ...rest }) => rest)}
              />
              <span>
                I agree to the <Link href="/terms" target="_blank" className="underline underline-offset-2">Terms of Service</Link>,{" "}
                <Link href="/shipping-policy" target="_blank" className="underline underline-offset-2">Shipping & Delivery Policy</Link> and{" "}
                <Link href="/return-policy" target="_blank" className="underline underline-offset-2">Return & Replacement Policy</Link>.
              </span>
            </label>
            {err("agreeTerms") && (
              <p id="agreeTerms-error" className="error-text">
                {err("agreeTerms")}
              </p>
            )}
          </div>

          {(status === "error" && serverMsg) || Object.keys(errors).length > 0 ? (
            <p role="alert" className="rounded-xl bg-poppy px-4 py-3 text-sm text-white">
              {status === "error" && serverMsg
                ? serverMsg
                : `Please fix the ${Object.keys(errors).length} highlighted ${Object.keys(errors).length === 1 ? "field" : "fields"}.`}
            </p>
          ) : null}

          <button type="submit" className="btn btn-primary w-full !min-h-14" disabled={status === "sending"}>
            {status === "sending" ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden /> {online ? "Opening secure payment…" : "Placing order…"}
              </>
            ) : online ? (
              <>
                <Lock className="size-4" aria-hidden /> Pay {usd(totals.total)} securely
              </>
            ) : (
              <>
                Place order request <ArrowRight className="size-4" aria-hidden />
              </>
            )}
          </button>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            {online
              ? "Payments are processed by Stripe over an encrypted connection. We never see or store your card number. Visa, Mastercard, American Express, Discover, Apple Pay and Google Pay accepted."
              : "Online payment is being set up. Place your order request and a florist will contact you to complete payment securely."}
          </p>
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  hint,
  className = "",
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="label">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="error-text">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>
      ) : null}
    </div>
  );
}
