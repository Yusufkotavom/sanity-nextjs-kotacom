import { MetadataRoute } from "next";
import { fetchSanitySeoSettings } from "@/sanity/lib/fetch";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = (await fetchSanitySeoSettings()) as
    | {
        defaultNoIndex?: boolean;
        robotsDisallowPaths?: string[] | null;
      }
    | null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const disallowPaths = (seo?.robotsDisallowPaths || []).filter(
    (path): path is string => typeof path === "string" && path.startsWith("/"),
  );
  const siteWideNoIndex = Boolean(seo?.defaultNoIndex);

  const rules: MetadataRoute.Robots["rules"] = [
    {
      userAgent: "*",
      ...(siteWideNoIndex ? { disallow: "/" } : { allow: "/" }),
    },
  ];

  if (!siteWideNoIndex && disallowPaths.length) {
    rules.push({
      userAgent: "*",
      disallow: disallowPaths,
    });
  }

  return {
    rules,
    sitemap: siteUrl ? [`${siteUrl}/sitemap.xml`] : [],
  };
}
