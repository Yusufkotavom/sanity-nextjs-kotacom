import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";

export type RewriteLandingSectionsProps = {
  page: LegacyAstroPage;
  copy: LegacyRewriteCopy;
};

export type TocItem = {
  id: string;
  label: string;
};
