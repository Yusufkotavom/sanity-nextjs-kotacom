import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export function buildSoftwareIndexPageCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Jasa Software Development Surabaya",
    secondaryKeywords: [
      "Software custom untuk bisnis",
      "Pengembangan aplikasi custom",
      "Sistem operasional terintegrasi",
      "Jasa software house Indonesia",
      "Implementasi dan instalasi software Surabaya",
      "Software enterprise dan UMKM",
    ],
    description:
      "Jasa software development Surabaya untuk bisnis yang membutuhkan software custom, implementasi sistem, dan instalasi yang lebih terukur demi efisiensi operasional, visibilitas data, dan eksekusi tim yang lebih cepat.",
    intro:
      "Kami membangun software dengan pendekatan produk: kebutuhan dipetakan lebih dulu, fitur inti diprioritaskan, lalu implementasi dijalankan bertahap agar dampaknya lebih cepat terasa untuk bisnis.",
    highlights: [
      "Desain fitur berdasarkan alur kerja nyata tim.",
      "Skema data disiapkan agar mudah dikembangkan.",
      "Laporan dan tampilan data diarahkan untuk keputusan bisnis yang lebih cepat.",
      "Integrasi dijalankan bertahap tanpa mengganggu operasi yang sedang berjalan.",
    ],
    process: [
      "Pelajari proses bisnis dan hambatan yang paling sering memperlambat tim.",
      "Prioritaskan modul inti agar hasil awal lebih cepat memberi nilai.",
      "Pengembangan iteratif dengan demo berkala.",
      "Handover, dokumentasi, dan rencana pengembangan tahap berikutnya.",
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
