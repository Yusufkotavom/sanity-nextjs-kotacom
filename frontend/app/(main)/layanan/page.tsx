import RewritePageShell from "@/components/ui/rewrite/page-shell";
import { getLegacySinglePage } from "@/lib/legacy-pages/astro-static";
import { generateLegacyPageMetadata } from "@/lib/legacy-pages/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return generateLegacyPageMetadata(getLegacySinglePage("layanan"));
}

export default function LayananPage() {
  const page = getLegacySinglePage("layanan");
  if (!page) notFound();
  return <RewritePageShell page={page} />;
}
