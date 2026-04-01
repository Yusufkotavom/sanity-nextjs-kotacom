import type { Metadata } from "next";
import { cache } from "react";
import { urlFor } from "@/sanity/lib/image";
import { fetchSanitySeoSettings } from "@/sanity/lib/fetch";
import { PAGE_QUERY_RESULT, POST_QUERY_RESULT } from "@/sanity.types";
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

type MetaCompatiblePage = {
  title?: string | null;
  excerpt?: string | null;
  meta?: any | null;
};

type SeoSettings = {
  siteName?: string;
  titleSuffix?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultNoIndex?: boolean;
  twitterHandle?: string;
  defaultImage?: {
    asset?: {
      metadata?: {
        dimensions?: {
          width?: number;
          height?: number;
        };
      };
    };
  };
};

const getSeoSettings = cache(async (): Promise<SeoSettings | null> => {
  return (await fetchSanitySeoSettings()) || null;
});

const getCanonicalUrl = (slug?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (!slug || slug === "index") return `${baseUrl}/`;
  return `${baseUrl}/${slug.replace(/^\/+/, "")}`;
};

const resolveImage = (
  page?: MetaCompatiblePage | null,
  seo?: SeoSettings | null,
) => {
  if (page?.meta?.image) {
    return {
      url: urlFor(page.meta.image).quality(100).url(),
      width: page.meta.image.asset?.metadata?.dimensions?.width || 1200,
      height: page.meta.image.asset?.metadata?.dimensions?.height || 630,
    };
  }

  if (seo?.defaultImage) {
    return {
      url: urlFor(seo.defaultImage).quality(100).url(),
      width: seo.defaultImage.asset?.metadata?.dimensions?.width || 1200,
      height: seo.defaultImage.asset?.metadata?.dimensions?.height || 630,
    };
  }

  return {
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
    width: 1200,
    height: 630,
  };
};

const buildMetadata = ({
  title,
  description,
  noindex,
  slug,
  page,
  seo,
}: {
  title?: string;
  description?: string;
  noindex?: boolean;
  slug?: string;
  page?: MetaCompatiblePage | null;
  seo?: SeoSettings | null;
}): Metadata => {
  const image = resolveImage(page, seo);
  const resolvedTitle = title || seo?.defaultTitle || seo?.siteName;
  const resolvedDescription = description || seo?.defaultDescription;
  const robotsValue =
    !isProduction || noindex || seo?.defaultNoIndex ? "noindex, nofollow" : "index, follow";

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    openGraph: {
      title: resolvedTitle || undefined,
      description: resolvedDescription || undefined,
      siteName: seo?.siteName || undefined,
      images: [image],
      locale: "en_US",
      type: "website",
      url: getCanonicalUrl(slug),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle || undefined,
      description: resolvedDescription || undefined,
      images: [image.url],
      creator: seo?.twitterHandle || undefined,
    },
    robots: robotsValue,
    alternates: {
      canonical: getCanonicalUrl(slug),
    },
  };
};

export async function generateRootMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const siteName = seo?.siteName || "Schema UI";
  const suffix = seo?.titleSuffix || siteName;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    title: {
      template: `%s | ${suffix}`,
      default: seo?.defaultTitle || siteName,
    },
    description: seo?.defaultDescription || undefined,
    openGraph: {
      ...buildMetadata({ seo }).openGraph,
    },
    twitter: {
      ...buildMetadata({ seo }).twitter,
    },
    robots: !isProduction || seo?.defaultNoIndex ? "noindex, nofollow" : "index, follow",
  };
}

export async function generatePageMetadata({
  page,
  slug,
}: {
  page: PAGE_QUERY_RESULT | POST_QUERY_RESULT | MetaCompatiblePage | null;
  slug: string;
}): Promise<Metadata> {
  const seo = await getSeoSettings();
  const compatiblePage = page as MetaCompatiblePage | null;

  return buildMetadata({
    page: compatiblePage,
    slug,
    title: compatiblePage?.meta?.title || compatiblePage?.title,
    description: compatiblePage?.meta?.description || compatiblePage?.excerpt,
    noindex: compatiblePage?.meta?.noindex || undefined,
    seo,
  });
}

export async function generateBasicMetadata({
  title,
  description,
  slug,
  noindex,
}: {
  title?: string;
  description?: string;
  slug: string;
  noindex?: boolean;
}): Promise<Metadata> {
  const seo = await getSeoSettings();

  return buildMetadata({
    title,
    description,
    slug,
    noindex,
    seo,
  });
}
