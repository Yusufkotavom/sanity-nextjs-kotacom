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
      "Jasa web developer Indonesia",
    ],
    description:
      "Jasa pembuatan website untuk bisnis yang membutuhkan tampilan kredibel, performa cepat, dan struktur SEO yang siap dikembangkan.",
    intro:
      "Kami membantu bisnis membangun website yang tidak hanya menarik secara visual, tetapi juga siap mendukung traffic organik, campaign iklan, dan konversi lead.",
    highlights: [
      "Struktur halaman disusun berdasarkan intent pencarian.",
      "Desain dan copy diarahkan untuk meningkatkan konversi.",
      "Optimasi performa, metadata, dan internal linking sejak awal.",
      "Website mudah dikembangkan untuk kebutuhan jangka panjang.",
    ],
    process: [
      "Audit tujuan bisnis, audience, dan positioning layanan.",
      "Penyusunan arsitektur halaman serta keyword mapping.",
      "Eksekusi desain, development, dan QA teknis.",
      "Launch, monitoring performa, dan iterasi konversi.",
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
          "Ya. Struktur teknis, kecepatan, metadata, dan alur CTA disiapkan agar mendukung akuisisi dari organik maupun paid traffic.",
      },
    ],
    ctaLabel: "Mulai Proyek Website",
    ctaHref: DEFAULT_CTA,
  };
}
