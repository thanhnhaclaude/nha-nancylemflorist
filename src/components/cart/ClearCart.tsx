"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

/** Empties the cart once the page confirms a completed order. */
export default function ClearCart() {
  const { clear, ready } = useCart();
  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);
  return null;
}
