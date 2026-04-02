import type { Metadata } from "next";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { buildLegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import { normalizeSeoDescription, normalizeSeoTitle } from "@/lib/seo-normalize";
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
  const title = normalizeSeoTitle(copy.primaryKeyword);
  const description = normalizeSeoDescription(copy.description);

  return generateBasicMetadata({
    title,
    description,
    slug: routeToSlug(page.route),
  });
}
