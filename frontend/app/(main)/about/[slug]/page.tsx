import LegacyPageShell from "@/components/legacy/legacy-page-shell";
import {
  getLegacySectionChildren,
  getLegacySectionSlug,
} from "@/lib/legacy-pages/astro-static";
import { generateLegacyPageMetadata } from "@/lib/legacy-pages/metadata";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getLegacySectionChildren("about").map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  return generateLegacyPageMetadata(getLegacySectionSlug("about", params.slug));
}

export default async function AboutDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = getLegacySectionSlug("about", params.slug);
  if (!page) notFound();

  return (
    <LegacyPageShell
      page={page}
      siblings={getLegacySectionChildren("about")}
    />
  );
}
