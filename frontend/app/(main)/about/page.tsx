import LegacyPageShell from "@/components/legacy/legacy-page-shell";
import {
  getLegacySectionChildren,
  getLegacySectionIndex,
} from "@/lib/legacy-pages/astro-static";
import { generateLegacyPageMetadata } from "@/lib/legacy-pages/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return generateLegacyPageMetadata(getLegacySectionIndex("about"));
}

export default function AboutPage() {
  const page = getLegacySectionIndex("about");
  if (!page) notFound();

  return <LegacyPageShell page={page} siblings={getLegacySectionChildren("about")} />;
}
