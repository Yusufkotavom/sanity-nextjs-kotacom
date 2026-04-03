import { DEFAULT_CTA } from "../constants";
import { buildGenericCopy } from "../core";
import type { LegacyRewriteCopy } from "../types";
import type { LegacyAstroPage } from "../../astro-static";

export function buildPercetakanCetakBrosurPageCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  return {
    ...buildGenericCopy(page),
    primaryKeyword: "Jasa Cetak Brosur Surabaya",
    secondaryKeywords: [
      "Cetak brosur promosi",
      "Brosur company profile",
      "Desain dan cetak brosur",
      "Percetakan brosur bisnis",
      "Cetak flyer leaflet premium",
      "Cetak brosur Surabaya",
    ],
    description:
      "Jasa cetak brosur Surabaya untuk flyer, leaflet, dan materi promosi produk maupun layanan dengan kualitas cetak konsisten serta pilihan material fleksibel.",
    intro:
      "Kami membantu cetak brosur yang informatif dan menarik agar pesan promosi bisnis tersampaikan lebih efektif kepada target audiens. Rewrite ini kami perluas untuk menangkap intent marketing seperti flyer, leaflet, dan kebutuhan distribusi campaign offline.",
    ctaLabel: "Konsultasi Cetak Brosur",
    ctaHref: DEFAULT_CTA,
  };
}
