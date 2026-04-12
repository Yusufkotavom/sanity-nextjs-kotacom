import Blocks from "@/components/blocks";
import RewritePageShell from "@/components/ui/rewrite/page-shell";
import { getLegacySectionChildren } from "@/lib/legacy-pages/astro-static";
import { resolveTemplateMeta } from "@/lib/templates/resolve-template";
import { fetchSanityPageBySlug, fetchTemplatePageByRoute } from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { notFound } from "next/navigation";

const ROUTE = "/about";
const SLUG = "about";

export async function generateMetadata() {
  const templatePage = await fetchTemplatePageByRoute({ route: ROUTE });
  if (templatePage) {
    const meta = resolveTemplateMeta({
      page: templatePage.meta || null,
      template: templatePage.template?.metaDefaults || null,
    });
    return generatePageMetadata({ page: { title: templatePage.title || "Tentang Kami", meta: meta || undefined }, slug: SLUG });
  }
  const page = await fetchSanityPageBySlug({ slug: SLUG });
  if (page) return generatePageMetadata({ page, slug: SLUG });
  return generatePageMetadata({ page: { title: "Tentang Kami" }, slug: SLUG });
}

export default async function AboutPage() {
  const templatePage = await fetchTemplatePageByRoute({ route: ROUTE });
  if (templatePage) {
    const virtualPage: LegacyAstroPage = {
      route: ROUTE,
      section: templatePage.template?.shellId || "layanan",
      slug: SLUG,
      sourceFile: "sanity-template",
      title: templatePage.title || "Tentang Kami",
      migrationStatus: "draft",
    };
    return <RewritePageShell page={virtualPage} siblings={getLegacySectionChildren("about")} />;
  }

  const page = await fetchSanityPageBySlug({ slug: SLUG });
  if (page) return <Blocks blocks={page?.blocks ?? []} pageTitle={page.title} />;

  notFound();
}
