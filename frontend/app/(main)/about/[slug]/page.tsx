import Blocks from "@/components/blocks";
import RewritePageShell from "@/components/ui/rewrite/page-shell";
import { getLegacySectionChildren, getLegacySectionSlug } from "@/lib/legacy-pages/astro-static";
import { resolveTemplateMeta } from "@/lib/templates/resolve-template";
import { fetchTemplatePageByRoute } from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getLegacySectionChildren("about").map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const route = `/about/${slug}`;
  const templatePage = await fetchTemplatePageByRoute({ route });
  if (templatePage) {
    const meta = resolveTemplateMeta({
      page: templatePage.meta || null,
      template: templatePage.template?.metaDefaults || null,
    });
    return generatePageMetadata({ page: { title: templatePage.title || slug, meta: meta || undefined }, slug: `about/${slug}` });
  }
  return generatePageMetadata({ page: { title: slug }, slug: `about/${slug}` });
}

export default async function AboutDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const route = `/about/${slug}`;

  const templatePage = await fetchTemplatePageByRoute({ route });
  if (templatePage) {
    const virtualPage: LegacyAstroPage = {
      route,
      section: templatePage.template?.shellId || "layanan",
      slug,
      sourceFile: "sanity-template",
      title: templatePage.title || slug,
      migrationStatus: "draft",
    };
    return <RewritePageShell page={virtualPage} siblings={getLegacySectionChildren("about")} />;
  }

  // Fallback: legacy local
  const page = getLegacySectionSlug("about", slug);
  if (!page) notFound();
  return <RewritePageShell page={page} siblings={getLegacySectionChildren("about")} />;
}
