import ArchiveCategoryFilter from "@/components/ui/archive-category-filter";
import ProductGrid from "@/components/products/product-grid";
import {
  fetchSanityProductCategories,
  fetchSanityProducts,
} from "@/sanity/lib/fetch";
import { generateBasicMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata() {
  return await generateBasicMetadata({
    title: "Products",
    description: "Browse our products.",
    slug: "products",
  });
}

export default async function ProductsPage() {
  const products = await fetchSanityProducts();
  const categories = await fetchSanityProductCategories();

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <div className="mb-10">
          <h1 className="text-4xl font-bold md:text-5xl">Products</h1>
          <p className="mt-3 max-w-2xl text-foreground/70">
            Explore our latest products with complete details and pricing.
          </p>
          <div className="mt-4">
            <ArchiveCategoryFilter
              currentValue="/products"
              allValue="/products"
              options={categories.map((category: any) => ({
                label: category.title,
                value: `/products/${category.slug?.current}`,
              }))}
            />
          </div>
        </div>
        <ProductGrid products={products as any[]} />
      </div>
    </section>
  );
}
