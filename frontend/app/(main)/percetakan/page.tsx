import PageHybridShell from "@/components/hybrid/page-hybrid-shell";
import RewritePageShell from "@/components/ui/rewrite/page-shell";
import {
  getLegacySectionChildren,
  getLegacySectionIndex,
} from "@/lib/legacy-pages/astro-static";
import { generateLegacyPageMetadata } from "@/lib/legacy-pages/metadata";
import { notFound } from "next/navigation";
import { fetchSanityProducts } from "@/sanity/lib/fetch";
import ProductGrid from "@/components/products/product-grid";

export async function generateMetadata() {
  return generateLegacyPageMetadata(getLegacySectionIndex("percetakan"));
}

export default async function PercetakanPage() {
  const page = getLegacySectionIndex("percetakan");
  if (!page) notFound();

  const products = await fetchSanityProducts();

  return (
    <PageHybridShell slug="percetakan">
      <RewritePageShell
        page={page}
        siblings={getLegacySectionChildren("percetakan")}
      >
        <section className="container mt-16 lg:mt-24 mb-6">
          <div className="rounded-[2rem] bg-muted/20 border border-border/40 p-8 md:p-12 shadow-sm">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Katalog Produk Percetakan
              </h2>
              <p className="mt-4 text-foreground/70 lg:text-lg">
                Temukan spesifikasi standar dan harga estimasi untuk berbagai kebutuhan cetak promosi dan operasional bisnis Anda.
              </p>
            </div>
            <ProductGrid products={products} />
          </div>
        </section>
      </RewritePageShell>
    </PageHybridShell>
  );
}
