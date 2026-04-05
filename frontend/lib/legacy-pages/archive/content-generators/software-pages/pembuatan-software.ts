import { DEFAULT_CTA } from "../constants";
import { buildSoftwareIndexPageCopy } from "./software-index";
import type { LegacyRewriteCopy } from "../types";

export function buildPembuatanSoftwarePageCopy(): LegacyRewriteCopy {
  return {
    ...buildSoftwareIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Software Custom Surabaya",
    secondaryKeywords: [
      "Pengembangan software custom",
      "Aplikasi bisnis sesuai workflow",
      "Sistem custom perusahaan",
      "Software operasional terintegrasi",
      "Custom software development Surabaya",
      "Aplikasi web dan mobile bisnis",
    ],
    description:
      "Jasa pembuatan software custom Surabaya untuk bisnis yang membutuhkan aplikasi web, mobile, dan sistem operasional yang mengikuti alur kerja nyata serta target pertumbuhan perusahaan.",
    intro:
      "Layanan pembuatan software ini cocok untuk bisnis yang membutuhkan sistem yang lebih pas dengan proses kerja, data, dan target operasional sehari-hari. Fokusnya adalah membangun software yang jelas prioritasnya dan realistis untuk dijalankan bertahap.",
    highlights: [
      "Fitur disusun berdasarkan kebutuhan bisnis yang paling mendesak lebih dulu.",
      "Alur kerja software diarahkan agar tim lebih cepat beradaptasi saat implementasi.",
      "Arsitektur sistem disiapkan agar mudah dikembangkan untuk modul berikutnya.",
      "Setiap tahap pengembangan membantu bisnis bergerak tanpa menunggu sistem besar selesai total.",
    ],
    process: [
      "Petakan proses kerja, masalah utama, dan target hasil yang ingin dicapai.",
      "Tentukan modul inti yang paling penting untuk dikerjakan lebih dulu.",
      "Bangun software secara iteratif dengan review berkala agar arah proyek tetap terjaga.",
      "Lanjutkan ke fase implementasi dan penyempurnaan setelah modul awal stabil.",
    ],
    faqs: [
      {
        question: "Kapan bisnis perlu membuat software custom?",
        answer:
          "Biasanya saat proses kerja mulai terlalu rumit ditangani dengan spreadsheet, chat, atau aplikasi umum yang tidak lagi cukup mengikuti kebutuhan tim.",
      },
      {
        question: "Apakah software custom harus langsung lengkap sejak awal?",
        answer:
          "Tidak. Pendekatan yang lebih aman biasanya dimulai dari modul paling penting dulu, lalu dikembangkan bertahap sesuai kebutuhan dan kapasitas tim.",
      },
      {
        question: "Apakah software custom bisa dibuat untuk web dan mobile sekaligus?",
        answer:
          "Bisa, tetapi scope-nya perlu ditentukan dengan jelas agar prioritas pengembangan tetap realistis dan hasil awal tetap cepat dipakai.",
      },
    ],
    ctaLabel: "Mulai Proyek Software",
    ctaHref: DEFAULT_CTA,
  };
}
