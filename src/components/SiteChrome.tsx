import Header from "./Header";
import Footer from "./Footer";
import { CartProvider } from "./cart/CartProvider";
import LazyCartDrawer from "./cart/LazyCartDrawer";

/** Public storefront frame: skip link, header, footer and cart. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <LazyCartDrawer />
    </CartProvider>
  );
}
