import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import ArchiveCategoryFilter from "@/components/ui/archive-category-filter";
import ProductGrid from "@/components/products/product-grid";
import InlineMetaList from "@/components/ui/inline-meta-list";
import TaxonomyBadgeList from "@/components/ui/taxonomy-badge-list";
import {
  fetchSanityCategoryBySlug,
  fetchSanityProductBySlug,
  fetchSanityProductCategories,
  fetchSanityProductsByCategorySlug,
  fetchSanityProductsStaticParams,
  fetchSanitySeoSettings,
} from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd, buildProductJsonLd } from "@/lib/seo-jsonld";

type BreadcrumbLink = {
  label: string;
  href: string;
};

export async function generateStaticParams() {
  const [products, categories] = await Promise.all([
    fetchSanityProductsStaticParams(),
    fetchSanityProductCategories(),
  ]);

  const slugs = new Set<string>();

  for (const product of products as any[]) {
    if (product?.slug?.current) slugs.add(product.slug.current);
  }
  for (const category of categories as any[]) {
    if (category?.slug?.current) slugs.add(category.slug.current);
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const [categories, product, seo] = await Promise.all([
    fetchSanityProductCategories(),
    fetchSanityProductBySlug({ slug: params.slug }),
    fetchSanitySeoSettings(),
  ]);

  const isProductCategory = (categories as any[]).some(
    (item) => item?.slug?.current === params.slug,
  );

  if (isProductCategory) {
    const category = await fetchSanityCategoryBySlug({ slug: params.slug });
    if (!category) notFound();
    return await generatePageMetadata({
      page: {
        title: `${category.title} | Product Category`,
        excerpt: category.description || `Products in ${category.title}`,
        meta: {
          ...(category.meta || {}),
          noindex: Boolean(category.meta?.noindex || (seo as any)?.noIndexProductCategories),
        },
      },
      slug: `products/${params.slug}`,
    });
  }

  if (!product) notFound();
  return await generatePageMetadata({ page: product, slug: `products/${params.slug}` });
}

export default async function ProductSlugPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const [categories, product] = await Promise.all([
    fetchSanityProductCategories(),
    fetchSanityProductBySlug({ slug: params.slug }),
  ]);

  const isProductCategory = (categories as any[]).some(
    (item) => item?.slug?.current === params.slug,
  );

  if (isProductCategory) {
    const [category, products] = await Promise.all([
      fetchSanityCategoryBySlug({ slug: params.slug }),
      fetchSanityProductsByCategorySlug({ slug: params.slug }),
    ]);
    if (!category) notFound();

    return (
      <section>
        <div className="container py-16 xl:py-20">
          <div className="mb-10">
            <h1 className="text-4xl font-bold md:text-5xl">{category.title}</h1>
            {category.description && (
              <p className="mt-3 max-w-2xl text-foreground/70">{category.description}</p>
            )}
            <div className="mt-4">
              <ArchiveCategoryFilter
                currentValue={`/products/${params.slug}`}
                allValue="/products"
                options={(categories as any[]).map((item: any) => ({
                  label: item.title,
                  value: `/products/${item.slug?.current}`,
                }))}
              />
            </div>
          </div>
          <ProductGrid products={products as any[]} />
        </div>
      </section>
    );
  }

  if (!product) notFound();

  const links: BreadcrumbLink[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.title as string, href: "#" },
  ];
  const productPath = `/products/${params.slug}`;
  const productJsonLd = buildProductJsonLd({
    title: product.title || "",
    description: product.meta?.description || product.excerpt,
    path: productPath,
    image: product.meta?.image || product.image,
    price: product.price,
    currency: product.currency,
    availability: product.availability,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.title || "Product", path: productPath },
  ]);

  return (
    <section>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="container py-16 xl:py-20">
        <article className="mx-auto max-w-4xl">
          <Breadcrumbs links={links} />
          <h1 className="mb-4 text-3xl lg:text-5xl">{product.title}</h1>
          {product.excerpt && (
            <p className="mb-6 text-lg text-foreground/75">{product.excerpt}</p>
          )}
          {product.image?.asset?._id && (
            <div className="mb-6 overflow-hidden rounded-2xl">
              <Image
                src={urlFor(product.image).url()}
                alt={product.image.alt || ""}
                width={product.image.asset?.metadata?.dimensions?.width || 1200}
                height={product.image.asset?.metadata?.dimensions?.height || 720}
                quality={100}
              />
            </div>
          )}
          <InlineMetaList
            className="mb-6"
            items={[
              typeof product.price === "number"
                ? `${product.currency || "IDR"} ${product.price}`
                : undefined,
              product.availability,
            ]}
          />
          <TaxonomyBadgeList
            items={product.categories}
            baseHref="/products"
            className="mb-6"
          />

          {product.body && <PortableTextRenderer value={product.body} />}
          {product.cta?.href && (
            <div className="mt-8">
              <Button asChild>
                <Link
                  href={product.cta.href}
                  target={product.cta.target ? "_blank" : undefined}
                  rel={product.cta.target ? "noopener noreferrer" : undefined}
                >
                  {product.cta.title || "Get Product"}
                </Link>
              </Button>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
