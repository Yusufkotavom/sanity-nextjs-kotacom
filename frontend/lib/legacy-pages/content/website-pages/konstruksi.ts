import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteKonstruksiPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Website Konstruksi",
    secondaryKeywords: [
      "Website perusahaan konstruksi",
      "Website kontraktor profesional",
      "Website portofolio proyek konstruksi",
      "Website tender dan layanan konstruksi",
    ],
    description:
      "Jasa pembuatan website konstruksi untuk menampilkan portofolio proyek, kompetensi teknis, dan kredibilitas perusahaan secara profesional.",
    intro:
      "Website konstruksi kami fokuskan pada penyajian portofolio proyek, layanan inti, dan keunggulan perusahaan agar mendukung peluang tender maupun klien baru.",
    ctaLabel: "Buat Website Konstruksi",
    ctaHref: DEFAULT_CTA,
  };
}
