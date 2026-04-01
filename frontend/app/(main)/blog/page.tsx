import Link from "next/link";
import Image from "next/image";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import ArchiveCategoryFilter from "@/components/ui/archive-category-filter";
import { fetchSanityBlogCategories, fetchSanityPosts } from "@/sanity/lib/fetch";
import { generateBasicMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata() {
  return await generateBasicMetadata({
    title: "Blog",
    description: "Read the latest articles.",
    slug: "blog",
  });
}

export default async function BlogPage() {
  const posts = (await fetchSanityPosts()) as any[];
  const categories = await fetchSanityBlogCategories();

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <div className="mb-10">
          <h1 className="text-4xl font-bold md:text-5xl">Blog</h1>
          <p className="mt-3 max-w-2xl text-foreground/70">
            Articles and updates from our team.
          </p>
          <Link
            href="/blog/category"
            className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
          >
            Browse by category
          </Link>
          <div className="mt-4">
            <ArchiveCategoryFilter
              currentValue="/blog"
              allValue="/blog"
              options={categories.map((category: any) => ({
                label: category.title,
                value: `/blog/category/${category.slug?.current}`,
              }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
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
                  {post.categories.map((category: any, index: number) => (
                    <span
                      key={`${category?._id || category?.slug?.current || category?.title || "category"}-${index}`}
                      className={cn(badgeVariants({ variant: "secondary" }))}
                    >
                      {category.title}
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
