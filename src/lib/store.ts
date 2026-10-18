import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import type { CheckoutData, InquiryData } from "./schemas";

/**
 * awaiting_payment: sent to Stripe, not paid yet · paid: Stripe confirmed payment ·
 * new: request placed without online payment (Stripe not configured)
 */
export const ORDER_STATUSES = ["awaiting_payment", "paid", "new", "confirmed", "delivered", "cancelled", "refunded"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];
export const INQUIRY_STATUSES = ["new", "replied", "booked", "closed"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export type OrderItem = {
  slug: string;
  name: string;
  size: string;
  sizeLabel: string;
  addOns: string[];
  addOnLabels: string[];
  qty: number;
  unit: number;
  lineTotal: number;
};

export type OrderRecord = Omit<CheckoutData, "company" | "items" | "agreeTerms"> & {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
  payment: "stripe" | "request";
  stripeSessionId?: string;
  stripePaymentIntent?: string;
  amountPaid?: number;
  paidAt?: string;
  emailedAt?: string;
  ip?: string;
  adminNote?: string;
};

export type InquiryRecord = Omit<InquiryData, "company"> & {
  id: string;
  createdAt: string;
  status: InquiryStatus;
  ip?: string;
  adminNote?: string;
};

type Kind = "orders" | "inquiries";
type RecordOf<K extends Kind> = K extends "orders" ? OrderRecord : InquiryRecord;

/** Runtime data folder — resolved at runtime, not traced into the build. */
export const dataDir = () =>
  process.env.DATA_DIR ? path.resolve(/*turbopackIgnore: true*/ process.env.DATA_DIR) : path.join(/*turbopackIgnore: true*/ process.cwd(), "data");
const fileFor = (kind: Kind) => path.join(dataDir(), `${kind}.json`);

// Serialize writes per file inside this process so concurrent requests never clobber each other.
const queues = new Map<Kind, Promise<unknown>>();
function serialize<T>(kind: Kind, task: () => Promise<T>): Promise<T> {
  const prev = queues.get(kind) ?? Promise.resolve();
  const next = prev.then(task, task);
  queues.set(kind, next.catch(() => undefined));
  return next;
}

export async function readAll<K extends Kind>(kind: K): Promise<RecordOf<K>[]> {
  try {
    const raw = await fs.readFile(fileFor(kind), "utf8");
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

async function writeAll(kind: Kind, list: unknown[]) {
  await fs.mkdir(dataDir(), { recursive: true });
  const target = fileFor(kind);
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2), "utf8");
  await fs.rename(tmp, target);
}

export function newId(prefix: string) {
  const d = new Date();
  const ymd = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const rand = randomBytes(3).toString("hex").toUpperCase().slice(0, 4);
  return `${prefix}-${ymd}-${rand}`;
}

export function insert<K extends Kind>(kind: K, record: RecordOf<K>) {
  return serialize(kind, async () => {
    const list = await readAll(kind);
    list.unshift(record);
    await writeAll(kind, list);
    return record;
  });
}

export async function findById<K extends Kind>(kind: K, id: string) {
  return (await readAll(kind)).find((r) => r.id === id) ?? null;
}

/** Atomically read-modify-write one record. Return null from fn to leave it unchanged. */
export function mutate<K extends Kind>(kind: K, id: string, fn: (rec: RecordOf<K>) => RecordOf<K> | null) {
  return serialize(kind, async () => {
    const list = await readAll(kind);
    const i = list.findIndex((r) => r.id === id);
    if (i === -1) return { before: null, after: null };
    const before = list[i];
    const next = fn(before);
    if (!next) return { before, after: before, changed: false };
    list[i] = next;
    await writeAll(kind, list);
    return { before, after: next, changed: true };
  });
}

export function update<K extends Kind>(kind: K, id: string, patch: Partial<Pick<RecordOf<K>, "status" | "adminNote">>) {
  return serialize(kind, async () => {
    const list = await readAll(kind);
    const i = list.findIndex((r) => r.id === id);
    if (i === -1) return null;
    list[i] = { ...list[i], ...patch };
    await writeAll(kind, list);
    return list[i];
  });
}
