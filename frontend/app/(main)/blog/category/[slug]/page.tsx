import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import ArchiveCategoryFilter from "@/components/ui/archive-category-filter";
import {
  fetchSanityCategoryBySlug,
  fetchSanityBlogCategories,
  fetchSanityCategoriesStaticParams,
  fetchSanityPostsByCategorySlug,
  fetchSanitySeoSettings,
} from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";

export async function generateStaticParams() {
  const categories = await fetchSanityCategoriesStaticParams();
  return categories.map((category: any) => ({
    slug: category.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const [category, seo] = await Promise.all([
    fetchSanityCategoryBySlug({ slug: params.slug }),
    fetchSanitySeoSettings(),
  ]);

  if (!category) notFound();

  return await generatePageMetadata({
    page: {
      title: category.title,
      excerpt: category.description,
      meta: {
        ...(category.meta || {}),
        noindex: Boolean(category.meta?.noindex || (seo as any)?.noIndexBlogCategories),
      },
    },
    slug: `blog/category/${params.slug}`,
  });
}

export default async function BlogCategoryDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const category = await fetchSanityCategoryBySlug({ slug: params.slug });
  if (!category) notFound();

  const categories = await fetchSanityBlogCategories();
  const posts = await fetchSanityPostsByCategorySlug({ slug: params.slug });

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <div className="mb-10">
          <Link
            href="/blog/category"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Back to categories
          </Link>
          <div className="mt-4">
            <ArchiveCategoryFilter
              currentValue={`/blog/category/${params.slug}`}
              allValue="/blog"
              options={categories.map((item: any) => ({
                label: item.title,
                value: `/blog/category/${item.slug?.current}`,
              }))}
            />
          </div>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">{category.title}</h1>
          {category.description && (
            <p className="mt-3 max-w-2xl text-foreground/70">{category.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post: any) => (
            <Link
              key={post.slug?.current || post.title}
              href={`/blog/${post.slug?.current}`}
              className="group overflow-hidden rounded-3xl border p-4 transition hover:border-primary"
            >
              {post.image?.asset?._id && (
                <div className="relative mb-4 h-56 overflow-hidden rounded-2xl">
                  <Image
                    src={urlFor(post.image).url()}
                    alt={post.image.alt || ""}
                    fill
                    style={{ objectFit: "cover" }}
                    placeholder={post.image.asset?.metadata?.lqip ? "blur" : undefined}
                    blurDataURL={post.image.asset?.metadata?.lqip || ""}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold leading-tight">{post.title}</h2>
              {post.categories?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.categories.map((item: any, index: number) => (
                    <span
                      key={`${item?._id || item?.slug?.current || item?.title || "category"}-${index}`}
                      className={cn(badgeVariants({ variant: "secondary" }))}
                    >
                      {item.title}
                    </span>
                  ))}
                </div>
              )}
              {post.excerpt && <p className="mt-3 text-foreground/75">{post.excerpt}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
