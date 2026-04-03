import PageHybridShell from "@/components/hybrid/page-hybrid-shell";
import RewritePageShell from "@/components/ui/rewrite/page-shell";
import {
  getLegacySectionChildren,
  getLegacySectionIndex,
} from "@/lib/legacy-pages/astro-static";
import { generateLegacyPageMetadata } from "@/lib/legacy-pages/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return generateLegacyPageMetadata(getLegacySectionIndex("percetakan"));
}

export default function PercetakanPage() {
  const page = getLegacySectionIndex("percetakan");
  if (!page) notFound();

  return (
    <PageHybridShell slug="percetakan">
      <RewritePageShell
        page={page}
        siblings={getLegacySectionChildren("percetakan")}
      />
    </PageHybridShell>
  );
}
