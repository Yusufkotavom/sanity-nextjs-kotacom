import RewritePageShell from "@/components/ui/rewrite/page-shell";
import {
  getLegacySectionChildren,
  getLegacySectionIndex,
} from "@/lib/legacy-pages/astro-static";
import { generateLegacyPageMetadata } from "@/lib/legacy-pages/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return generateLegacyPageMetadata(getLegacySectionIndex("software"));
}

export default function SoftwarePage() {
  const page = getLegacySectionIndex("software");
  if (!page) notFound();

  return (
    <RewritePageShell
      page={page}
      siblings={getLegacySectionChildren("software")}
    />
  );
}
