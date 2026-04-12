import Blocks from "@/components/blocks";
import RewritePageShell from "@/components/ui/rewrite/page-shell";
import { resolveTemplateMeta } from "@/lib/templates/resolve-template";
import { fetchSanityPageBySlug, fetchTemplatePageByRoute } from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const templatePage = await fetchTemplatePageByRoute({ route: "/privacy" });
  if (templatePage) {
    const meta = resolveTemplateMeta({ page: templatePage.meta || null, template: templatePage.template?.metaDefaults || null });
    return generatePageMetadata({ page: { title: templatePage.title || "Kebijakan Privasi", meta: meta || undefined }, slug: "privacy" });
  }
  const page = await fetchSanityPageBySlug({ slug: "privacy" });
  if (page) return generatePageMetadata({ page, slug: "privacy" });
  return generatePageMetadata({ page: { title: "Kebijakan Privasi" }, slug: "privacy" });
}

export default async function PrivacyPage() {
  const templatePage = await fetchTemplatePageByRoute({ route: "/privacy" });
  if (templatePage) {
    const virtualPage: LegacyAstroPage = {
      route: "/privacy",
      section: templatePage.template?.shellId || "layanan",
      slug: "privacy",
      sourceFile: "sanity-template",
      title: templatePage.title || "Kebijakan Privasi",
      migrationStatus: "draft",
    };
    return <RewritePageShell page={virtualPage} />;
  }

  const page = await fetchSanityPageBySlug({ slug: "privacy" });
  if (page) return <Blocks blocks={page?.blocks ?? []} pageTitle={page.title} />;

  notFound();
}
