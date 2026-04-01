import Link from "next/link";
import { fetchSanityCategories, fetchSanitySeoSettings } from "@/sanity/lib/fetch";
import { generateBasicMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata() {
  const seo = (await fetchSanitySeoSettings()) as
    | { noIndexBlogCategories?: boolean }
    | null;

  return await generateBasicMetadata({
    title: "Blog Categories",
    description: "Browse blog posts by category.",
    slug: "blog/category",
    noindex: Boolean(seo?.noIndexBlogCategories),
  });
}

export default async function BlogCategoriesPage() {
  const categories = await fetchSanityCategories();

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <div className="mb-10">
          <h1 className="text-4xl font-bold md:text-5xl">Categories</h1>
          <p className="mt-3 max-w-2xl text-foreground/70">
            Pick a category to see related posts.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category: any) => (
            <Link
              key={category._id}
              href={`/blog/category/${category.slug?.current}`}
              className="rounded-2xl border p-5 transition hover:border-primary"
            >
              <h2 className="text-xl font-semibold">{category.title}</h2>
              {category.description && (
                <p className="mt-2 text-sm text-foreground/70">{category.description}</p>
              )}
              <p className="mt-3 text-sm text-foreground/60">
                {category.postCount || 0} post{category.postCount === 1 ? "" : "s"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
