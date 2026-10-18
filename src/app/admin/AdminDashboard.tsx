"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CreditCard, ExternalLink, LogOut, Mail, Phone, RefreshCw, Search } from "lucide-react";
import Logo from "@/components/Logo";
import { usd } from "@/lib/catalog";
import type { InquiryRecord, OrderRecord } from "@/lib/store";

const ORDER_STATUSES = ["awaiting_payment", "paid", "new", "confirmed", "delivered", "cancelled", "refunded"] as const;
const INQUIRY_STATUSES = ["new", "replied", "booked", "closed"] as const;

const badge: Record<string, string> = {
  new: "bg-poppy text-white",
  awaiting_payment: "bg-paper-2 text-ink-soft",
  refunded: "bg-paper-2 text-ink-soft",
  confirmed: "bg-blush text-ink",
  paid: "bg-moss text-paper",
  delivered: "bg-moss-soft text-ink",
  cancelled: "bg-paper-2 text-ink-soft line-through",
  replied: "bg-blush text-ink",
  booked: "bg-moss text-paper",
  closed: "bg-paper-2 text-ink-soft",
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export default function AdminDashboard({
  orders: initialOrders,
  inquiries: initialInquiries,
  smtp,
}: {
  orders: OrderRecord[];
  inquiries: InquiryRecord[];
  smtp: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"orders" | "inquiries">("orders");
  const [orders, setOrders] = useState(initialOrders);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [saving, setSaving] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const visibleOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          (statusFilter === "all" || o.status === statusFilter) &&
          (!q || [o.id, o.senderName, o.senderEmail, o.recipientName, o.city, ...o.items.map((i) => i.name)].join(" ").toLowerCase().includes(q)),
      ),
    [orders, q, statusFilter],
  );
  const visibleInquiries = useMemo(
    () =>
      inquiries.filter(
        (i) =>
          (statusFilter === "all" || i.status === statusFilter) &&
          (!q || [i.id, i.name, i.email, i.message, i.venue].join(" ").toLowerCase().includes(q)),
      ),
    [inquiries, q, statusFilter],
  );

  const stats = {
    newOrders: orders.filter((o) => o.status === "paid" || o.status === "new").length,
    openValue: orders
      .filter((o) => ["paid", "new", "confirmed", "delivered"].includes(o.status))
      .reduce((s, o) => s + (o.amountPaid ?? o.total), 0),
    newInquiries: inquiries.filter((i) => i.status === "new").length,
  };

  async function patch(kind: "orders" | "inquiries", id: string, body: Record<string, string>) {
    setSaving(id);
    const res = await fetch("/api/admin/records", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, id, ...body }),
    });
    setSaving(null);
    if (res.status === 401) return router.refresh();
    if (!res.ok) return alert("Could not save. Please try again.");
    const { record } = await res.json();
    if (kind === "orders") setOrders((list) => list.map((o) => (o.id === id ? record : o)));
    else setInquiries((list) => list.map((i) => (i.id === id ? record : i)));
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="min-h-svh bg-paper">
      <header className="border-b border-line bg-card">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="eyebrow hidden text-ink-soft sm:inline">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => router.refresh()} className="btn btn-outline !min-h-10 !px-4" aria-label="Refresh">
              <RefreshCw className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={logout} className="btn btn-ink !min-h-10 !px-4">
              <LogOut className="size-4" aria-hidden /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container-x py-8">
        {!smtp && (
          <p className="mb-6 flex items-start gap-3 rounded-2xl bg-blush/60 p-4 text-sm">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
            Email is not configured (SMTP_*). New requests are saved here, but no notification emails are sent.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="To fulfill (paid / new)" value={String(stats.newOrders)} />
          <Stat label="Order value (paid & active)" value={usd(stats.openValue)} />
          <Stat label="New inquiries" value={String(stats.newInquiries)} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div role="tablist" className="inline-flex rounded-full border border-line bg-card p-1">
            {(["orders", "inquiries"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => {
                  setTab(t);
                  setStatusFilter("all");
                }}
                className={`min-h-10 rounded-full px-5 text-sm font-semibold capitalize ${tab === t ? "bg-ink text-paper" : ""}`}
              >
                {t} ({t === "orders" ? orders.length : inquiries.length})
              </button>
            ))}
          </div>
          <label className="relative flex-1 sm:max-w-xs">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft" aria-hidden />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, ID…" className="field !min-h-11 !pl-10" />
          </label>
          <label>
            <span className="sr-only">Filter by status</span>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="field !min-h-11 capitalize">
              <option value="all">All statuses</option>
              {(tab === "orders" ? ORDER_STATUSES : INQUIRY_STATUSES).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 space-y-4">
          {tab === "orders" &&
            (visibleOrders.length === 0 ? (
              <Empty />
            ) : (
              visibleOrders.map((o) => (
                <details key={o.id} className="group rounded-2xl border border-line bg-card open:shadow-sm">
                  <summary className="flex flex-wrap items-center gap-x-6 gap-y-2 p-5 [&::-webkit-details-marker]:hidden">
                    <span className={`eyebrow rounded-full px-2.5 py-1 text-[0.62rem] ${badge[o.status]}`}>{o.status.replace("_", " ")}</span>
                    <span className="font-mono text-sm">{o.id}</span>
                    <span className="font-semibold">
                      {o.items[0]?.name}
                      {o.items.length > 1 && ` +${o.items.length - 1} more`}
                    </span>
                    <span className="text-sm text-ink-soft">→ {o.recipientName}, {o.city} {o.state}</span>
                    <span className="text-sm">Deliver {o.deliveryDate}</span>
                    <span className="ml-auto font-semibold tabular-nums">{usd(o.total)}</span>
                    <span className="w-full text-xs text-ink-soft sm:w-auto">{fmtDate(o.createdAt)}</span>
                  </summary>
                  <div className="grid gap-6 border-t border-line p-5 text-sm md:grid-cols-3">
                    <Info title="Customer">
                      <p className="font-semibold">{o.senderName}</p>
                      <a className="flex items-center gap-2 underline" href={`mailto:${o.senderEmail}?subject=${encodeURIComponent(`Your NancyLem Florist order ${o.id}`)}`}>
                        <Mail className="size-3.5" aria-hidden /> {o.senderEmail}
                      </a>
                      <a className="flex items-center gap-2 underline" href={`tel:${o.senderPhone}`}>
                        <Phone className="size-3.5" aria-hidden /> {o.senderPhone}
                      </a>
                    </Info>
                    <Info title="Delivery">
                      <p className="font-semibold">{o.recipientName} · {o.recipientPhone}</p>
                      <p>
                        {o.address1}
                        {o.address2 && `, ${o.address2}`}
                        <br />
                        {o.city}, {o.state} {o.zip} ({o.locationType})
                      </p>
                      <p>Date: {o.deliveryDate}</p>
                    </Info>
                    <Info title="Items">
                      <ul className="space-y-1">
                        {o.items.map((i) => (
                          <li key={`${i.slug}-${i.size}-${i.addOns.join()}`}>
                            {i.qty} × {i.name}
                            {i.sizeLabel && ` · ${i.sizeLabel}`}
                            {i.addOnLabels.length > 0 && <span className="text-ink-soft"> + {i.addOnLabels.join(", ")}</span>}
                            <span className="tabular-nums"> — {usd(i.lineTotal)}</span>
                          </li>
                        ))}
                      </ul>
                      <p>
                        Subtotal {usd(o.subtotal)} · Delivery {o.delivery ? usd(o.delivery) : "free"} · <strong>{usd(o.total)}</strong>
                      </p>
                    </Info>
                    <Info title="Payment">
                      <p className="flex items-center gap-2">
                        <CreditCard className="size-3.5" aria-hidden />
                        {o.payment === "stripe" ? "Stripe Checkout" : "Order request (pay later)"}
                      </p>
                      {o.amountPaid != null && (
                        <p>
                          Paid <strong>{usd(o.amountPaid)}</strong>
                          {o.paidAt && ` · ${fmtDate(o.paidAt)}`}
                        </p>
                      )}
                      {o.stripePaymentIntent && (
                        <a
                          className="flex items-center gap-1.5 underline"
                          href={`https://dashboard.stripe.com/payments/${o.stripePaymentIntent}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View in Stripe <ExternalLink className="size-3" aria-hidden />
                        </a>
                      )}
                    </Info>
                    {o.cardMessage && (
                      <Info title="Card message" className="md:col-span-2">
                        <p className="whitespace-pre-wrap font-display text-lg italic">“{o.cardMessage}”</p>
                      </Info>
                    )}
                    {o.instructions && (
                      <Info title="Notes">
                        <p className="whitespace-pre-wrap">{o.instructions}</p>
                      </Info>
                    )}
                    <StatusEditor
                      statuses={ORDER_STATUSES}
                      status={o.status}
                      note={o.adminNote}
                      saving={saving === o.id}
                      onSave={(body) => patch("orders", o.id, body)}
                    />
                  </div>
                </details>
              ))
            ))}

          {tab === "inquiries" &&
            (visibleInquiries.length === 0 ? (
              <Empty />
            ) : (
              visibleInquiries.map((i) => (
                <details key={i.id} className="rounded-2xl border border-line bg-card open:shadow-sm">
                  <summary className="flex flex-wrap items-center gap-x-6 gap-y-2 p-5 [&::-webkit-details-marker]:hidden">
                    <span className={`eyebrow rounded-full px-2.5 py-1 text-[0.62rem] ${badge[i.status]}`}>{i.status}</span>
                    <span className="font-mono text-sm">{i.id}</span>
                    <span className="font-semibold">{i.name}</span>
                    <span className="text-sm text-ink-soft">
                      {i.kind === "event" ? `${i.eventType || "Event"}${i.eventDate ? ` · ${i.eventDate}` : ""}` : i.subject || "General message"}
                    </span>
                    <span className="ml-auto text-xs text-ink-soft">{fmtDate(i.createdAt)}</span>
                  </summary>
                  <div className="grid gap-6 border-t border-line p-5 text-sm md:grid-cols-3">
                    <Info title="Contact">
                      <a className="flex items-center gap-2 underline" href={`mailto:${i.email}`}>
                        <Mail className="size-3.5" aria-hidden /> {i.email}
                      </a>
                      {i.phone && (
                        <a className="flex items-center gap-2 underline" href={`tel:${i.phone}`}>
                          <Phone className="size-3.5" aria-hidden /> {i.phone}
                        </a>
                      )}
                    </Info>
                    {i.kind === "event" && (
                      <Info title="Event">
                        {i.venue && <p>Venue: {i.venue}</p>}
                        {i.guests && <p>Guests: {i.guests}</p>}
                        {i.budget && <p>Budget: {i.budget}</p>}
                      </Info>
                    )}
                    <Info title="Message" className={i.kind === "event" ? "" : "md:col-span-2"}>
                      <p className="whitespace-pre-wrap">{i.message}</p>
                    </Info>
                    <StatusEditor
                      statuses={INQUIRY_STATUSES}
                      status={i.status}
                      note={i.adminNote}
                      saving={saving === i.id}
                      onSave={(body) => patch("inquiries", i.id, body)}
                    />
                  </div>
                </details>
              ))
            ))}
        </div>
      </div>
    </div>
  );
}

function StatusEditor({
  statuses,
  status,
  note,
  saving,
  onSave,
}: {
  statuses: readonly string[];
  status: string;
  note?: string;
  saving: boolean;
  onSave: (body: Record<string, string>) => void;
}) {
  const [s, setS] = useState(status);
  const [n, setN] = useState(note ?? "");
  const dirty = s !== status || n !== (note ?? "");
  return (
    <div className="space-y-3 rounded-xl bg-paper p-4 md:col-span-3">
      <div className="flex flex-wrap items-end gap-3">
        <label className="min-w-40">
          <span className="label">Status</span>
          <select value={s} onChange={(e) => setS(e.target.value)} className="field !min-h-11 capitalize">
            {statuses.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-60 flex-1">
          <span className="label">Internal note</span>
          <input value={n} onChange={(e) => setN(e.target.value)} className="field !min-h-11" placeholder="Payment link sent, driver assigned…" />
        </label>
        <button type="button" disabled={!dirty || saving} onClick={() => onSave({ status: s, adminNote: n })} className="btn btn-primary !min-h-11">
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}

function Info({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <h3 className="eyebrow font-sans text-[0.65rem] text-ink-soft">{title}</h3>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <p className="eyebrow text-[0.65rem] text-ink-soft">{label}</p>
      <p className="mt-2 font-display text-4xl font-medium tabular-nums">{value}</p>
    </div>
  );
}

function Empty() {
  return <p className="rounded-2xl border border-dashed border-line p-12 text-center text-ink-soft">Nothing here yet.</p>;
}
