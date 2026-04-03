import { DEFAULT_CTA } from "../constants";
import { buildGenericCopy } from "../core";
import type { LegacyRewriteCopy } from "../types";
import type { LegacyAstroPage } from "../../astro-static";

export function buildPercetakanCetakCompanyProfilePageCopy(
  page: LegacyAstroPage,
): LegacyRewriteCopy {
  return {
    ...buildGenericCopy(page),
    primaryKeyword: "Jasa Cetak Company Profile Surabaya",
    secondaryKeywords: [
      "Cetak profil perusahaan",
      "Buku company profile",
      "Company profile premium",
      "Percetakan corporate profile",
      "Cetak katalog perusahaan",
      "Cetak company profile Surabaya",
    ],
    description:
      "Jasa cetak company profile Surabaya untuk memperkuat citra profesional perusahaan melalui profil perusahaan, katalog produk, dan materi presentasi brand yang rapi dan berkualitas.",
    intro:
      "Kami menyiapkan cetak company profile dengan struktur material dan finishing yang mendukung kebutuhan presentasi bisnis dan tender. Coverage ini juga kami extend untuk menangkap intent katalog produk dan materi branding perusahaan yang kuat di live site.",
    ctaLabel: "Diskusi Company Profile",
    ctaHref: DEFAULT_CTA,
  };
}
