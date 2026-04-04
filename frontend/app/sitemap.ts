import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { fetchSanitySeoSettings } from "@/sanity/lib/fetch";

type SitemapItem = {
  _type: "page" | "post" | "product" | "service" | "project";
  slug?: { current?: string | null } | null;
  _updatedAt?: string;
};

type CategorySitemapItem = {
  slug?: { current?: string | null } | null;
  _updatedAt?: string;
  postCount?: number;
  productCount?: number;
  serviceCount?: number;
};

const CONTENT_SITEMAP_QUERY = groq`
  *[
    _type in ["page", "post", "product", "service", "project"]
    && meta.noindex != true
    && defined(slug.current)
  ]{
    _type,
    slug,
    _updatedAt
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
    "serviceCount": count(*[_type == "service" && references(^._id)])
  }
`;

function makeAbsoluteUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/+$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

function mapContentPath(item: SitemapItem): string | null {
  const slug = item.slug?.current;
  if (!slug) return null;
  if (item._type === "page") return slug === "index" ? "/" : `/${slug}`;
  if (item._type === "post") return `/blog/${slug}`;
  if (item._type === "product") return `/products/${slug}`;
  if (item._type === "service") return `/services/${slug}`;
  if (item._type === "project") return `/projects/${slug}`;
  return null;
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

  const [{ data: contentData }, { data: categoryData }] = await Promise.all([
    sanityFetch({ query: CONTENT_SITEMAP_QUERY }),
    sanityFetch({ query: CATEGORY_SITEMAP_QUERY }),
  ]);

  const contentItems = (contentData || []) as SitemapItem[];
  const categoryItems = (categoryData || []) as CategorySitemapItem[];

  const entries: MetadataRoute.Sitemap = [];

  for (const item of contentItems) {
    const path = mapContentPath(item);
    if (!path) continue;
    entries.push({
      url: makeAbsoluteUrl(baseUrl, path),
      lastModified: item._updatedAt || undefined,
      changeFrequency: item._type === "page" ? "daily" : "weekly",
      priority: item._type === "page" && item.slug?.current === "index" ? 1 : 0.7,
    });
  }

  for (const category of categoryItems) {
    const slug = category.slug?.current;
    if (!slug) continue;

    if ((category.postCount || 0) > 0 && !seo?.noIndexBlogCategories) {
      entries.push({
        url: makeAbsoluteUrl(baseUrl, `/blog/category/${slug}`),
        lastModified: category._updatedAt || undefined,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
    if ((category.productCount || 0) > 0 && !seo?.noIndexProductCategories) {
      entries.push({
        url: makeAbsoluteUrl(baseUrl, `/products/category/${slug}`),
        lastModified: category._updatedAt || undefined,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
    if ((category.serviceCount || 0) > 0 && !seo?.noIndexServiceCategories) {
      entries.push({
        url: makeAbsoluteUrl(baseUrl, `/services/category/${slug}`),
        lastModified: category._updatedAt || undefined,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries.sort((a, b) => a.url.localeCompare(b.url));
}
