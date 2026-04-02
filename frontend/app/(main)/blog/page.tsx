import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ArchiveCategoryFilter from "@/components/ui/archive-category-filter";
import PostGrid from "@/components/posts/post-grid";
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

        <PostGrid posts={posts} />
      </div>
    </section>
  );
}
