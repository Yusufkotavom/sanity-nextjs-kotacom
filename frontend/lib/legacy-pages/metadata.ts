import type { Metadata } from "next";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { buildLegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import {
  applyLegacyCopyOverrides,
  type LegacyPageOverride,
} from "@/lib/legacy-pages/legacy-overrides";
import { normalizeSeoDescription, normalizeSeoTitle } from "@/lib/seo-normalize";
import { generateBasicMetadata, generatePageMetadata } from "@/sanity/lib/metadata";
import { fetchLegacyPageOverrideByRoute, fetchTemplatePageByRoute } from "@/sanity/lib/fetch";
import { resolveTemplateCopy, resolveTemplateMeta } from "@/lib/templates/resolve-template";

function routeToSlug(route: string) {
  const normalized = route.replace(/^\/+/, "");
  return normalized || "index";
}

export async function generateLegacyPageMetadata(
  page: LegacyAstroPage | null,
): Promise<Metadata> {
  if (!page) return {};

  const templatePage = await fetchTemplatePageByRoute({ route: page.route });
  const override = (await fetchLegacyPageOverrideByRoute({
    route: page.route,
  })) as LegacyPageOverride;
  const baseCopy = buildLegacyRewriteCopy(page);
  const resolvedCopy = templatePage
    ? resolveTemplateCopy({
        base: baseCopy,
        page: templatePage,
        template: templatePage.template || null,
      })
    : baseCopy;
  const copy = applyLegacyCopyOverrides(resolvedCopy, override);
  const title = normalizeSeoTitle(copy.primaryKeyword);
  const description = normalizeSeoDescription(copy.description);

  if (override?.meta) {
    return generatePageMetadata({
      page: {
        title: copy.primaryKeyword,
        excerpt: copy.description,
        meta: override.meta,
      },
      slug: routeToSlug(page.route),
      pageType: "website",
    });
  }

  const templateMeta = resolveTemplateMeta({
    page: templatePage?.meta || null,
    template: templatePage?.template?.metaDefaults || null,
  });
  if (templateMeta) {
    return generatePageMetadata({
      page: {
        title: copy.primaryKeyword,
        excerpt: copy.description,
        meta: templateMeta,
      },
      slug: routeToSlug(page.route),
      pageType: "website",
    });
  }

  return generateBasicMetadata({
    title,
    description,
    slug: routeToSlug(page.route),
  });
}
