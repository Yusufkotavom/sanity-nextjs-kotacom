import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export const SOFTWARE_PAGE_OVERRIDES: Record<string, Partial<LegacyRewriteCopy>> = {
  software: {
    intro:
      "Halaman software ini ditujukan untuk pemilik bisnis dan decision-maker yang ingin membuat proses kerja lebih efisien, data lebih rapi, dan pengambilan keputusan lebih cepat lewat sistem yang benar-benar dipakai tim.",
    ctaLabel: "Audit Kebutuhan Software",
    ctaLinks: [
      { label: "Audit Kebutuhan Software", href: DEFAULT_CTA },
      { label: "Minta Scope Modul Inti", href: DEFAULT_CTA },
      { label: "Lihat FAQ Implementasi", href: "#faq" },
      { label: "Jadwalkan Discovery Call", href: DEFAULT_CTA },
    ],
    finalCtaTitle: "Bangun Software yang Menyelesaikan Bottleneck Operasional",
    finalCtaDescription:
      "Kami bantu memetakan kebutuhan prioritas dan merancang roadmap software bertahap agar impact bisnis lebih cepat terasa.",
    faqs: [
      {
        question: "Apakah software custom selalu harus dimulai dari sistem besar?",
        answer:
          "Tidak. Kami biasanya memulai dari modul inti yang paling berdampak, lalu dikembangkan bertahap.",
      },
      {
        question: "Bagaimana memastikan software benar-benar dipakai tim?",
        answer:
          "Kami merancang alur berdasarkan proses kerja nyata dan menyiapkan fase adopsi agar transisi lebih mulus.",
      },
    ],
  },
  "pembuatan-software": {
    intro:
      "Halaman pembuatan software ini menekankan kebutuhan paling penting di tahap awal: requirement yang jelas, prioritas fitur inti, dan delivery iteratif agar bisnis tidak menunggu terlalu lama untuk melihat hasil.",
    ctaLabel: "Mulai Pembuatan Software",
    ctaLinks: [
      { label: "Mulai Discovery Software", href: DEFAULT_CTA },
      { label: "Minta Breakdown Fase", href: DEFAULT_CTA },
      { label: "Cek FAQ Pembuatan", href: "#faq" },
      { label: "Jadwalkan Kickoff", href: DEFAULT_CTA },
    ],
    finalCtaTitle: "Mulai dari Modul Inti, Rasakan Dampak Lebih Cepat",
    finalCtaDescription:
      "Diskusikan alur operasional bisnis Anda dan kami susun fase pengembangan software yang terukur.",
    faqs: [
      {
        question: "Berapa lama fase awal pembuatan software biasanya berjalan?",
        answer:
          "Tergantung scope, namun fase awal biasanya difokuskan pada modul inti yang memberi dampak operasional paling cepat.",
      },
      {
        question: "Apakah software bisa diintegrasikan ke sistem lama?",
        answer:
          "Bisa. Integrasi dirancang sejak awal agar perpindahan data dan proses tidak mengganggu operasional.",
      },
    ],
  },
  "implementasi-software": {
    intro:
      "Pada tahap implementasi, fokus utamanya adalah go-live yang lebih lancar. Karena itu kami menekankan rencana transisi, training pengguna, dan monitoring awal supaya adopsi sistem lebih stabil.",
    ctaLabel: "Rencanakan Implementasi",
    ctaLinks: [
      { label: "Rencanakan Go-Live", href: DEFAULT_CTA },
      { label: "Minta Checklist Implementasi", href: DEFAULT_CTA },
      { label: "Lihat FAQ Go-Live", href: "#faq" },
      { label: "Diskusikan Training Tim", href: DEFAULT_CTA },
    ],
    finalCtaTitle: "Go-Live Lebih Terkontrol dengan Implementasi Terstruktur",
    finalCtaDescription:
      "Kami dampingi implementasi dari persiapan data hingga fase stabilisasi pasca go-live.",
    faqs: [
      {
        question: "Apa risiko terbesar saat implementasi software?",
        answer:
          "Biasanya ada di adopsi pengguna dan kesiapan data. Keduanya kami mitigasi lewat checklist transisi dan pelatihan.",
      },
      {
        question: "Apakah ada pendampingan setelah sistem live?",
        answer:
          "Ada. Fase pasca go-live digunakan untuk menangani isu prioritas dan menyempurnakan alur kerja.",
      },
    ],
  },
  "instalasi-software": {
    intro:
      "Untuk instalasi software, fokus utamanya adalah konfigurasi yang aman, verifikasi fungsi, dan kesiapan pengguna agar software bisa langsung dipakai tanpa kebingungan.",
    ctaLabel: "Jadwalkan Instalasi",
    ctaLinks: [
      { label: "Jadwalkan Instalasi", href: DEFAULT_CTA },
      { label: "Minta Checklist Setup", href: DEFAULT_CTA },
      { label: "Lihat FAQ Instalasi", href: "#faq" },
      { label: "Diskusikan Handover Teknis", href: DEFAULT_CTA },
    ],
    finalCtaTitle: "Instalasi Software Aman, Tim Siap Pakai Sejak Hari Pertama",
    finalCtaDescription:
      "Kami bantu setup teknis, uji fungsional, dan handover agar sistem siap dipakai untuk operasional harian.",
    faqs: [
      {
        question: "Apakah instalasi mencakup pengujian setelah setup?",
        answer:
          "Ya. Setelah instalasi kami lakukan validasi fungsi utama untuk memastikan sistem berjalan sesuai kebutuhan.",
      },
      {
        question: "Apakah ada dokumentasi untuk tim pengelola?",
        answer:
          "Ada. Kami siapkan dokumentasi dan panduan singkat agar tim dapat mengoperasikan sistem dengan lebih percaya diri.",
      },
    ],
  },
  "sistem-pos": {
    primaryKeyword: "Sistem POS Surabaya untuk Retail dan F&B",
    secondaryKeywords: [
      "Software POS Surabaya",
      "Sistem kasir untuk UMKM",
      "POS retail dan F&B multi outlet",
      "Aplikasi kasir dengan inventory dan laporan",
      "Sistem point of sale support operasional",
    ],
    description:
      "Sistem POS Surabaya untuk UMKM, retail, dan F&B yang membutuhkan transaksi cepat, inventory akurat, laporan real-time, dan setup yang siap dipakai tim operasional.",
    intro:
      "Halaman sistem POS ini menekankan kebutuhan utama pemilik outlet: transaksi cepat, stok akurat, dan laporan real-time untuk keputusan harian. Fokusnya pada implementasi outlet, setup perangkat, dan adopsi tim kasir agar sistem benar-benar dipakai di lapangan.",
  },
};
