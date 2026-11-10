import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { fetchSanitySeoSettings } from "@/sanity/lib/fetch";

// Sanity-only sitemap (F2): every URL originates from Sanity documents.
// No code-driven (cities.json / json-usaha / manifest) or template-route entries.
// Pages are gated by `contentStatus == "index"`; pre-migration docs default to
// "index" via coalesce so existing pages stay in the sitemap until backfilled.

const PAGES_SITEMAP_QUERY = groq`
  *[
    _type == "page"
    && (defined(path) || defined(slug))
    && coalesce(contentStatus, "index") == "index"
    && meta.noindex != true
  ]{
    "path": coalesce(path, "/" + slug.current),
    _updatedAt,
  }
`;

const CONTENT_SITEMAP_QUERY = groq`
  *[
    _type in ["post", "product", "service", "project"]
    && meta.noindex != true
    && defined(slug.current)
  ]{
    _type,
    slug,
    _updatedAt,
  }
`;

const CATEGORY_SITEMAP_QUERY = groq`
  *[
    _type == "category"
    && meta.noindex != true
    && defined(slug.current)
  ]{
    slug,
    _updatedAt,
    "postCount": count(*[_type == "post" && references(^._id)]),
    "productCount": count(*[_type == "product" && references(^._id)]),
    "serviceCount": count(*[_type == "service" && references(^._id)]),
  }
`;

type PageItem = { path?: string | null; _updatedAt?: string };
type ContentItem = {
  _type: "post" | "product" | "service" | "project";
  slug?: { current?: string | null } | null;
  _updatedAt?: string;
};
type CategoryItem = {
  slug?: { current?: string | null } | null;
  _updatedAt?: string;
  postCount?: number;
  productCount?: number;
  serviceCount?: number;
};

function makeAbsoluteUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/+$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (!baseUrl) return [];

  const seo = (await fetchSanitySeoSettings()) as
    | {
        defaultNoIndex?: boolean;
        noIndexBlogCategories?: boolean;
        noIndexProductCategories?: boolean;
        noIndexServiceCategories?: boolean;
      }
    | null;

  if (seo?.defaultNoIndex) return [];

  const [{ data: pageData }, { data: contentData }, { data: categoryData }] =
    await Promise.all([
      sanityFetch({ query: PAGES_SITEMAP_QUERY }),
      sanityFetch({ query: CONTENT_SITEMAP_QUERY }),
      sanityFetch({ query: CATEGORY_SITEMAP_QUERY }),
    ]);

  const pages = (pageData || []) as PageItem[];
  const content = (contentData || []) as ContentItem[];
  const categories = (categoryData || []) as CategoryItem[];

  const entries: MetadataRoute.Sitemap = [];
  const addedUrls = new Set<string>();

  const addEntry = (entry: MetadataRoute.Sitemap[number]) => {
    if (!addedUrls.has(entry.url)) {
      addedUrls.add(entry.url);
      entries.push(entry);
    }
  };

  for (const page of pages) {
    const path = (page.path || "").trim();
    if (!path || !path.startsWith("/")) continue;
    addEntry({
      url: makeAbsoluteUrl(baseUrl, path),
      lastModified: page._updatedAt || undefined,
      changeFrequency: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1 : 0.7,
    });
  }

  for (const item of content) {
    const slug = item.slug?.current;
    if (!slug) continue;
    const path =
      item._type === "post"
        ? `/blog/${slug}`
        : item._type === "product"
          ? `/products/${slug}`
          : item._type === "service"
            ? `/services/${slug}`
            : `/projects/${slug}`;
    addEntry({
      url: makeAbsoluteUrl(baseUrl, path),
      lastModified: item._updatedAt || undefined,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const category of categories) {
    const slug = category.slug?.current;
    if (!slug) continue;
    if ((category.postCount || 0) > 0 && !seo?.noIndexBlogCategories) {
      addEntry({
        url: makeAbsoluteUrl(baseUrl, `/blog/category/${slug}`),
        lastModified: category._updatedAt || undefined,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
    if ((category.productCount || 0) > 0 && !seo?.noIndexProductCategories) {
      addEntry({
        url: makeAbsoluteUrl(baseUrl, `/products/category/${slug}`),
        lastModified: category._updatedAt || undefined,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
    if ((category.serviceCount || 0) > 0 && !seo?.noIndexServiceCategories) {
      addEntry({
        url: makeAbsoluteUrl(baseUrl, `/services/category/${slug}`),
        lastModified: category._updatedAt || undefined,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries.sort((a, b) => a.url.localeCompare(b.url));
}
