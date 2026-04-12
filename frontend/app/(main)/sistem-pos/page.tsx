import Blocks from "@/components/blocks";
import RewritePageShell from "@/components/ui/rewrite/page-shell";
import { resolveTemplateMeta } from "@/lib/templates/resolve-template";
import { fetchSanityPageBySlug, fetchTemplatePageByRoute } from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const templatePage = await fetchTemplatePageByRoute({ route: "/sistem-pos" });
  if (templatePage) {
    const meta = resolveTemplateMeta({ page: templatePage.meta || null, template: templatePage.template?.metaDefaults || null });
    return generatePageMetadata({ page: { title: templatePage.title || "Sistem POS", meta: meta || undefined }, slug: "sistem-pos" });
  }
  const page = await fetchSanityPageBySlug({ slug: "sistem-pos" });
  if (page) return generatePageMetadata({ page, slug: "sistem-pos" });
  return generatePageMetadata({ page: { title: "Sistem POS" }, slug: "sistem-pos" });
}

export default async function SistemPosPage() {
  const templatePage = await fetchTemplatePageByRoute({ route: "/sistem-pos" });
  if (templatePage) {
    const virtualPage: LegacyAstroPage = {
      route: "/sistem-pos",
      section: templatePage.template?.shellId || "software",
      slug: "sistem-pos",
      sourceFile: "sanity-template",
      title: templatePage.title || "Sistem POS",
      migrationStatus: "draft",
    };
    return <RewritePageShell page={virtualPage} />;
  }

  const page = await fetchSanityPageBySlug({ slug: "sistem-pos" });
  if (page) return <Blocks blocks={page?.blocks ?? []} pageTitle={page.title} />;

  notFound();
}
