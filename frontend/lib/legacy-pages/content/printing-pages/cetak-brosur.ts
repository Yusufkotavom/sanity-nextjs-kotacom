import { DEFAULT_CTA } from "../constants";
import { buildGenericCopy } from "../core";
import type { LegacyRewriteCopy } from "../types";
import type { LegacyAstroPage } from "../../astro-static";

export function buildPercetakanCetakBrosurPageCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  return {
    ...buildGenericCopy(page),
    primaryKeyword: "Jasa Cetak Brosur Surabaya",
    secondaryKeywords: [
      "Cetak brosur murah Surabaya",
      "Percetakan flyer dan leaflet",
      "Brosur promosi cepat",
      "Cetak bahan promosiSurabaya",
      "Jasa cetak brosur tanpa ribet",
      "Percetakan brosur berkualitas"
    ],
    description:
      "Layanan cetak brosur, flyer, dan leaflet Surabaya untuk kebutuhan promosi bisnis, produk, atau layanan dengan hasil cetak yang menarik, kualitas konsisten, dan harga yang terjangkau.",
    intro:
      "Butuh brosur promosi yang menarik dan sesuai target pemasaran? Kami bisa bantu cetak brosur Anda dengan proses yang mudah: mulai dari pengecekan file desain, produksi cetak, hingga pengiriman. Tidak perlu lagi mikir teknis cetak, kami yang akanuruskan bagian teknisnya sehingga Anda bisa fokus pada bisnis Anda.",
    ctaLabel: "Konsultasi Cetak Brosur Sekarang",
    ctaHref: DEFAULT_CTA,
  };
}