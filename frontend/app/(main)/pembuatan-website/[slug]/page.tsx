import LegacyPageShell from "@/components/legacy/legacy-page-shell";
import {
  getLegacySectionAliasSlugs,
  getLegacySectionChildren,
  getLegacySectionSlug,
} from "@/lib/legacy-pages/astro-static";
import { generateLegacyPageMetadata } from "@/lib/legacy-pages/metadata";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const directSlugs = getLegacySectionChildren("pembuatan-website").map(
    (item) => item.slug,
  );
  const aliasSlugs = getLegacySectionAliasSlugs("pembuatan-website");

  return Array.from(new Set([...directSlugs, ...aliasSlugs])).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  return generateLegacyPageMetadata(
    getLegacySectionSlug("pembuatan-website", params.slug),
  );
}

export default async function PembuatanWebsiteDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = getLegacySectionSlug("pembuatan-website", params.slug);
  if (!page) notFound();

  return (
    <LegacyPageShell
      page={page}
      siblings={getLegacySectionChildren("pembuatan-website")}
    />
  );
}
