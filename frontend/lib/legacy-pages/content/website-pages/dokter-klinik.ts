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
      "Website klinik dengan jadwal dokter",
      "Website pendaftaran pasien online",
    ],
    description:
      "Jasa pembuatan website dokter dan klinik untuk meningkatkan kredibilitas layanan kesehatan dan memudahkan pasien menemukan jadwal, layanan, serta informasi penting dengan cepat.",
    intro:
      "Kami membantu klinik dan praktik dokter membangun website yang informatif, terpercaya, dan mudah diakses agar pasien lebih cepat menemukan layanan, jadwal, dan cara menghubungi fasilitas kesehatan Anda.",
    highlights: [
      "Informasi layanan dan jadwal dokter ditata agar mudah ditemukan pasien.",
      "Struktur halaman membantu membangun trust sejak kunjungan pertama.",
      "CTA konsultasi, pendaftaran, atau kontak dibuat lebih jelas di titik penting halaman.",
      "Konten edukasi dapat disiapkan untuk mendukung visibilitas pencarian lokal dan organik.",
    ],
    process: [
      "Pelajari layanan utama, profil dokter, dan alur informasi yang paling sering dibutuhkan pasien.",
      "Susun struktur halaman layanan, jadwal, kontak, dan profil klinik agar lebih rapi.",
      "Bangun website dengan tampilan yang tenang, mudah dibaca, dan nyaman diakses lewat mobile.",
      "Lanjutkan optimasi konten dan CTA agar website membantu akuisisi pasien secara lebih konsisten.",
    ],
    faqs: [
      {
        question: "Apa informasi paling penting di website klinik?",
        answer:
          "Biasanya meliputi layanan, jadwal dokter, lokasi, nomor kontak, prosedur pendaftaran, dan FAQ dasar yang sering ditanyakan pasien.",
      },
      {
        question: "Apakah website klinik bisa membantu pasien baru menemukan layanan yang tepat?",
        answer:
          "Bisa. Struktur layanan, penjelasan manfaat, dan CTA yang jelas membantu pasien memahami layanan dan langkah berikutnya dengan lebih cepat.",
      },
      {
        question: "Apakah website klinik tetap perlu SEO lokal?",
        answer:
          "Ya. SEO lokal membantu klinik lebih mudah ditemukan saat pasien mencari layanan kesehatan di area terdekat.",
      },
    ],
    ctaLabel: "Konsultasi Website Klinik",
    ctaHref: DEFAULT_CTA,
  };
}
