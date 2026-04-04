import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export function buildWebsiteIndexPageCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Jasa Pembuatan Website",
    secondaryKeywords: [
      "Jasa pembuatan website profesional",
      "Pembuatan website bisnis",
      "Website company profile",
      "Website siap SEO",
      "Jasa website untuk lead dan penjualan",
    ],
    description:
      "Jasa pembuatan website untuk bisnis yang membutuhkan tampilan kredibel, loading cepat, struktur SEO rapi, dan CTA yang siap menghasilkan lead.",
    intro:
      "Kami membantu bisnis membangun website yang tidak hanya enak dilihat, tetapi juga jelas pesannya, cepat diakses, dan siap dipakai untuk menangkap inquiry, lead, dan penjualan.",
    highlights: [
      "Struktur halaman disusun agar pengunjung cepat paham layanan dan langkah berikutnya.",
      "Desain dan pesan utama diarahkan untuk meningkatkan inquiry, lead, dan penjualan.",
      "Optimasi performa, metadata, dan SEO on-page disiapkan sejak awal.",
      "Website mudah dikembangkan saat bisnis membutuhkan halaman atau fitur tambahan.",
    ],
    process: [
      "Pahami tujuan bisnis, target pasar, dan layanan yang paling ingin ditonjolkan.",
      "Susun struktur halaman, pesan utama, dan arah keyword untuk tiap halaman inti.",
      "Kerjakan desain, development, dan pengecekan teknis sebelum website live.",
      "Lanjutkan optimasi setelah launch berdasarkan performa halaman dan respon pengunjung.",
    ],
    faqs: [
      {
        question: "Apakah website bisa dikembangkan bertahap?",
        answer:
          "Bisa. Kami menyusun fondasi yang fleksibel agar fitur dan konten baru dapat ditambahkan tanpa mengulang dari awal.",
      },
      {
        question: "Apakah website sudah siap untuk SEO dan iklan?",
        answer:
          "Ya. Struktur teknis, kecepatan, metadata, dan alur CTA disiapkan agar website lebih siap mendukung traffic organik maupun iklan.",
      },
    ],
    ctaLabel: "Mulai Proyek Website",
    ctaHref: DEFAULT_CTA,
  };
}
