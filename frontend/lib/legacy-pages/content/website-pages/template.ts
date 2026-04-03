import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteTemplatePageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Template Website Siap Pakai",
    secondaryKeywords: [
      "Template website bisnis",
      "Desain website profesional",
      "Template landing page",
      "Template company profile",
    ],
    description:
      "Template website siap pakai untuk mempercepat proses go-live bisnis tanpa mengorbankan kualitas struktur dan tampilan.",
    intro:
      "Kami menyediakan opsi template website untuk bisnis yang membutuhkan implementasi cepat dengan fondasi desain dan konten yang tetap profesional.",
    ctaLabel: "Pilih Template Website",
    ctaHref: DEFAULT_CTA,
  };
}
