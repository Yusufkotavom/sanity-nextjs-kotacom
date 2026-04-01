import { urlFor } from "@/sanity/lib/image";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

const toAbsoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

const resolveImageUrl = (image: any, fallback = "/images/og-image.jpg") => {
  if (image) {
    try {
      return urlFor(image).quality(100).url();
    } catch {
      return toAbsoluteUrl(fallback);
    }
  }
  return toAbsoluteUrl(fallback);
};

export const buildBreadcrumbJsonLd = (
  items: Array<{ name: string; path: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: toAbsoluteUrl(item.path),
  })),
});

export const buildArticleJsonLd = ({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description?: string | null;
  path: string;
  image?: any;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description: description || undefined,
  image: resolveImageUrl(image),
  mainEntityOfPage: toAbsoluteUrl(path),
  datePublished: datePublished || undefined,
  dateModified: dateModified || undefined,
  author: authorName
    ? {
        "@type": "Person",
        name: authorName,
      }
    : undefined,
});

export const buildProductJsonLd = ({
  title,
  description,
  path,
  image,
  price,
  currency,
  availability,
}: {
  title: string;
  description?: string | null;
  path: string;
  image?: any;
  price?: number;
  currency?: string;
  availability?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: title,
  description: description || undefined,
  image: resolveImageUrl(image),
  url: toAbsoluteUrl(path),
  offers:
    typeof price === "number"
      ? {
          "@type": "Offer",
          price,
          priceCurrency: currency || "USD",
          availability: availability
            ? `https://schema.org/${
                availability === "in-stock"
                  ? "InStock"
                  : availability === "out-of-stock"
                    ? "OutOfStock"
                    : "PreOrder"
              }`
            : undefined,
        }
      : undefined,
});

export const buildServiceJsonLd = ({
  title,
  description,
  path,
  image,
  startingPrice,
  currency,
}: {
  title: string;
  description?: string | null;
  path: string;
  image?: any;
  startingPrice?: number;
  currency?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: title,
  description: description || undefined,
  image: resolveImageUrl(image),
  url: toAbsoluteUrl(path),
  offers:
    typeof startingPrice === "number"
      ? {
          "@type": "Offer",
          price: startingPrice,
          priceCurrency: currency || "USD",
        }
      : undefined,
});
