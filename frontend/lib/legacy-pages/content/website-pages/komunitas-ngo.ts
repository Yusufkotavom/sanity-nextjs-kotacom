import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteKomunitasNgoPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Website Komunitas NGO",
    secondaryKeywords: [
      "Website NGO profesional",
      "Website organisasi sosial",
      "Website komunitas nirlaba",
      "Website kampanye sosial",
    ],
    description:
      "Jasa pembuatan website komunitas dan NGO untuk memperkuat komunikasi program, kredibilitas organisasi, dan dukungan publik.",
    intro:
      "Kami membantu NGO dan komunitas membangun website yang mudah dikelola untuk publikasi program, transparansi kegiatan, dan penguatan engagement.",
    ctaLabel: "Konsultasi Website NGO",
    ctaHref: DEFAULT_CTA,
  };
}
