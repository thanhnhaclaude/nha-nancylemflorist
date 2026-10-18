import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteChrome from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <SiteChrome>
    <section className="container-x py-24 md:py-36">
      <p className="eyebrow text-poppy">Error 404</p>
      <h1 className="mt-4 text-[clamp(3.5rem,11vw,9rem)] font-medium leading-[0.88] tracking-[-0.045em]">
        This page has <em>wilted.</em>
      </h1>
      <p className="mt-8 max-w-lg text-lg text-ink-soft">
        The link may be old or mistyped. Our fresh flowers, however, are right this way.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/shop" className="btn btn-primary">
          Shop flowers <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link href="/" className="btn btn-outline">
          Back home
        </Link>
      </div>
    </section>
    </SiteChrome>
  );
}
