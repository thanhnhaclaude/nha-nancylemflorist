"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });

/** Loads the drawer's code only after the cart is opened for the first time. */
export default function LazyCartDrawer() {
  const { drawerOpen } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (drawerOpen) setMounted(true);
  }, [drawerOpen]);
  return mounted ? <CartDrawer /> : null;
}
