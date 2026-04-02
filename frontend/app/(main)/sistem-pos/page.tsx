import LegacyPageShell from "@/components/legacy/legacy-page-shell";
import { getLegacySinglePage } from "@/lib/legacy-pages/astro-static";
import { generateLegacyPageMetadata } from "@/lib/legacy-pages/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return generateLegacyPageMetadata(getLegacySinglePage("sistem-pos"));
}

export default function SistemPosPage() {
  const page = getLegacySinglePage("sistem-pos");
  if (!page) notFound();
  return <LegacyPageShell page={page} />;
}
