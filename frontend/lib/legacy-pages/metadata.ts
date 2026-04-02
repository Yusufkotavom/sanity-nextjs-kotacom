import type { Metadata } from "next";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { buildLegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import { generateBasicMetadata } from "@/sanity/lib/metadata";

function routeToSlug(route: string) {
  const normalized = route.replace(/^\/+/, "");
  return normalized || "index";
}

export async function generateLegacyPageMetadata(
  page: LegacyAstroPage | null,
): Promise<Metadata> {
  if (!page) return {};

  const copy = buildLegacyRewriteCopy(page);

  return generateBasicMetadata({
    title: copy.primaryKeyword,
    description: copy.description,
    slug: routeToSlug(page.route),
  });
}
