import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteDokterKlinikPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Website Dokter Klinik",
    secondaryKeywords: [
      "Website klinik profesional",
      "Website praktik dokter",
      "Website layanan kesehatan",
      "Website klinik siap SEO",
    ],
    description:
      "Jasa pembuatan website dokter dan klinik untuk meningkatkan kredibilitas layanan kesehatan dan memudahkan pasien menemukan informasi penting.",
    intro:
      "Kami membantu klinik dan praktik dokter membangun website informatif, terpercaya, dan mudah diakses untuk mendukung akuisisi pasien.",
    ctaLabel: "Konsultasi Website Klinik",
    ctaHref: DEFAULT_CTA,
  };
}
