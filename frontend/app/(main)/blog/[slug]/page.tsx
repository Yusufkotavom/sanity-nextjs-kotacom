import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import PostHero from "@/components/blocks/post-hero";
import PortableTextRenderer from "@/components/portable-text-renderer";
import BlogTableOfContents from "@/components/ui/blog-table-of-contents";
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { extractTableOfContents } from "@/lib/table-of-contents";
import {
  fetchSanityPostBySlug,
  fetchSanityPostsStaticParams,
} from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import JsonLd from "@/components/seo/json-ld";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo-jsonld";

type BreadcrumbLink = {
  label: string;
  href: string;
};

export async function generateStaticParams() {
  const posts = await fetchSanityPostsStaticParams();

  return posts.map((post) => ({
    slug: post.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityPostBySlug({ slug: params.slug });

  if (!post) {
    notFound();
  }

  return await generatePageMetadata({
    page: post,
    slug: `blog/${params.slug}`,
    pageType: "article",
  });
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityPostBySlug(params);

  if (!post) {
    notFound();
  }

  const links: BreadcrumbLink[] = post
    ? [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "Blog",
          href: "/blog",
        },
        {
          label: post.title as string,
          href: "#",
        },
      ]
    : [];

  const tocItems = extractTableOfContents(post.body);
  const headingIdMap = Object.fromEntries(
    tocItems.map((item) => [item.key, item.id]),
  );
  const postPath = `/blog/${params.slug}`;
  const postExcerpt = (post as any)?.excerpt;
  const articleJsonLd = buildArticleJsonLd({
    title: post.title || "",
    description: post.meta?.description || postExcerpt,
    path: postPath,
    image: post.meta?.image || post.image,
    datePublished: post._createdAt || undefined,
    dateModified: post._updatedAt || undefined,
    authorName: post.author?.name || undefined,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title || "Post", path: postPath },
  ]);

  return (
    <section>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="container py-16 xl:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="max-w-3xl">
            <Breadcrumbs links={links} />
            <PostHero {...post} />
            {(post as any)?.categories?.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {(post as any).categories.map((category: any, index: number) => (
                  <Link
                    key={`${category?._id || category?.slug?.current || category?.title || "category"}-${index}`}
                    href={`/blog/category/${category.slug?.current}`}
                    className={cn(badgeVariants({ variant: "secondary" }))}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}
            <BlogTableOfContents items={tocItems} variant="mobile" />
            {post.body && (
              <PortableTextRenderer value={post.body} headingIdMap={headingIdMap} />
            )}
          </article>
          <BlogTableOfContents items={tocItems} variant="desktop" />
        </div>
      </div>
    </section>
  );
}
