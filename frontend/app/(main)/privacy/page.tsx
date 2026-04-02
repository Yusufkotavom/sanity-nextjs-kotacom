import RewritePageShell from "@/components/ui/rewrite/page-shell";
import { getLegacySinglePage } from "@/lib/legacy-pages/astro-static";
import { generateLegacyPageMetadata } from "@/lib/legacy-pages/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return generateLegacyPageMetadata(getLegacySinglePage("privacy"));
}

export default function PrivacyPage() {
  const page = getLegacySinglePage("privacy");
  if (!page) notFound();
  return <RewritePageShell page={page} />;
}
