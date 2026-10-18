"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { priceCart, type CartLine } from "@/lib/catalog";

const STORAGE_KEY = "nf_cart_v1";

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  totals: ReturnType<typeof priceCart>;
  add: (line: CartLine) => void;
  setQty: (index: number, qty: number) => void;
  remove: (index: number) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const sameLine = (a: CartLine, b: CartLine) =>
  a.slug === b.slug && a.size === b.size && [...a.addOns].sort().join() === [...b.addOns].sort().join();

function load(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((l) => l && typeof l.slug === "string" && l.qty > 0) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setLines(load());
    setReady(true);
    const onStorage = (e: StorageEvent) => e.key === STORAGE_KEY && setLines(load());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const add = useCallback((line: CartLine) => {
    setLines((cur) => {
      const i = cur.findIndex((l) => sameLine(l, line));
      if (i === -1) return [...cur, line];
      const next = [...cur];
      next[i] = { ...next[i], qty: Math.min(10, next[i].qty + line.qty) };
      return next;
    });
    setDrawerOpen(true);
  }, []);

  const setQty = useCallback(
    (index: number, qty: number) =>
      setLines((cur) => cur.map((l, i) => (i === index ? { ...l, qty: Math.max(1, Math.min(10, qty)) } : l))),
    [],
  );
  const remove = useCallback((index: number) => setLines((cur) => cur.filter((_, i) => i !== index)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const totals = priceCart(lines);
    return {
      lines,
      ready,
      count: lines.reduce((s, l) => s + l.qty, 0),
      totals,
      add,
      setQty,
      remove,
      clear,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    };
  }, [lines, ready, add, setQty, remove, clear, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
