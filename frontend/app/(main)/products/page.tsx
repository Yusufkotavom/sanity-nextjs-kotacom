import ProductCard from "@/components/ui/product-card";
import ArchiveCategoryFilter from "@/components/ui/archive-category-filter";
import {
  fetchSanityProductCategories,
  fetchSanityProducts,
} from "@/sanity/lib/fetch";

export const metadata = {
  title: "Products",
  description: "Browse our products.",
};

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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product: any) => (
            <ProductCard key={product.slug?.current || product.title} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
