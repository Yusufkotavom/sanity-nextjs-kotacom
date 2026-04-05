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
      "Template website cepat live",
      "Template website untuk UMKM",
    ],
    description:
      "Template website siap pakai untuk mempercepat proses go-live bisnis tanpa mengorbankan kualitas tampilan, struktur halaman, dan fondasi SEO.",
    intro:
      "Kami menyediakan opsi template website untuk bisnis yang ingin segera live dengan tampilan profesional, struktur halaman yang rapi, dan basis konten yang tetap mudah disesuaikan.",
    highlights: [
      "Template membantu bisnis segera live tanpa harus mulai dari nol.",
      "Struktur halaman sudah disiapkan untuk company profile, landing page, atau kebutuhan promosi dasar.",
      "Desain tetap bisa disesuaikan agar lebih dekat dengan identitas brand Anda.",
      "Template cocok untuk tahap awal lalu dapat dikembangkan lagi ketika bisnis bertumbuh.",
    ],
    process: [
      "Pilih template yang paling mendekati kebutuhan bisnis dan model layanan Anda.",
      "Sesuaikan identitas visual, konten utama, dan CTA agar tidak terasa generik.",
      "Lengkapi halaman inti lalu cek tampilan mobile, kecepatan, dan kejelasan pesan.",
      "Live lebih cepat, lalu lanjutkan pengembangan bila bisnis membutuhkan halaman atau fitur tambahan.",
    ],
    faqs: [
      {
        question: "Apakah template website cocok untuk bisnis yang baru mulai?",
        answer:
          "Sangat cocok, terutama jika Anda butuh website yang cepat live dengan biaya dan waktu pengerjaan yang lebih efisien.",
      },
      {
        question: "Apakah template akan terlihat sama dengan bisnis lain?",
        answer:
          "Tidak harus. Template bisa tetap dipersonalisasi lewat warna, copy, gambar, struktur blok, dan CTA agar lebih sesuai dengan positioning bisnis Anda.",
      },
      {
        question: "Apakah template bisa dikembangkan menjadi website yang lebih besar?",
        answer:
          "Bisa. Template sering dipakai sebagai fondasi awal sebelum website diperluas dengan halaman, konten, atau fitur tambahan.",
      },
    ],
    ctaLabel: "Pilih Template Website",
    ctaHref: DEFAULT_CTA,
  };
}
