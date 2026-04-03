import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export function buildSoftwareIndexPageCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Jasa Software Development Surabaya",
    secondaryKeywords: [
      "Software custom untuk bisnis",
      "Pengembangan aplikasi internal",
      "Sistem operasional terintegrasi",
      "Jasa software house Indonesia",
      "Implementasi dan instalasi software Surabaya",
      "Software enterprise dan UMKM",
    ],
    description:
      "Jasa software development Surabaya untuk bisnis yang membutuhkan software custom, implementasi sistem, dan instalasi yang lebih terukur demi efisiensi operasional, visibilitas data, dan eksekusi tim yang lebih cepat.",
    intro:
      "Kami membangun software dengan pendekatan produk: requirement jelas, prioritas fitur terukur, dan implementasi bertahap agar cepat memberi dampak bisnis. Dibanding live site, rewrite ini kami perluas agar intent pencarian software custom, implementasi enterprise, dan instalasi operasional tertangkap lebih jelas dalam satu cluster SEO.",
    highlights: [
      "Desain fitur berdasarkan alur kerja nyata tim.",
      "Skema data disiapkan agar mudah dikembangkan.",
      "Dashboard dan reporting fokus keputusan bisnis.",
      "Integrasi bertahap tanpa ganggu operasi berjalan.",
    ],
    process: [
      "Discovery proses bisnis dan bottleneck utama.",
      "Prioritas modul inti (MVP) untuk nilai tercepat.",
      "Pengembangan iteratif dengan demo berkala.",
      "Handover, dokumentasi, dan rencana scale-up.",
    ],
    faqs: [
      {
        question: "Apakah bisa integrasi dengan tools yang sudah dipakai?",
        answer:
          "Bisa. Integrasi direncanakan dari awal agar data flow tetap konsisten dan minim pekerjaan manual.",
      },
      {
        question: "Bagaimana pendekatan agar proyek tidak molor?",
        answer:
          "Scope dipecah per fase dengan indikator hasil yang jelas, sehingga prioritas dan delivery lebih terkontrol.",
      },
    ],
    ctaLabel: "Diskusi Pengembangan Software",
    ctaHref: DEFAULT_CTA,
  };
}
