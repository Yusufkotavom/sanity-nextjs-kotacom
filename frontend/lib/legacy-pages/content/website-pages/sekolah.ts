import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteSekolahPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Website Sekolah",
    secondaryKeywords: [
      "Website sekolah modern",
      "Website pendidikan profesional",
      "Website informasi akademik",
      "Website profil sekolah",
    ],
    description:
      "Jasa pembuatan website sekolah untuk menyajikan profil institusi, informasi akademik, dan komunikasi orang tua-siswa secara terstruktur.",
    intro:
      "Kami membantu sekolah membangun website yang informatif dan mudah diakses agar komunikasi institusi, publikasi kegiatan, dan branding pendidikan lebih efektif.",
    ctaLabel: "Konsultasi Website Sekolah",
    ctaHref: DEFAULT_CTA,
  };
}
