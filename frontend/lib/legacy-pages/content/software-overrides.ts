import { DEFAULT_CTA } from "./constants";
import type { LegacyRewriteCopy } from "./types";

export const SOFTWARE_PRIORITY_OVERRIDES: Record<string, Partial<LegacyRewriteCopy>> = {
  software: {
    intro:
      "Halaman software kami arahkan ke intent decision-maker: meningkatkan efisiensi proses, menyatukan data, dan mempercepat pengambilan keputusan lewat sistem yang benar-benar dipakai tim.",
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
        question: "Bagaimana memastikan software benar-benar dipakai tim internal?",
        answer:
          "Kami merancang alur berdasarkan proses kerja nyata dan menyiapkan fase adopsi agar transisi lebih mulus.",
      },
    ],
  },
  "pembuatan-software": {
    intro:
      "Copy halaman pembuatan software difokuskan pada intent eksekusi: requirement jelas, prioritas fitur inti, dan delivery iteratif agar bisnis tidak menunggu terlalu lama untuk melihat hasil.",
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
      "Pada tahap implementasi, user intent utamanya adalah kelancaran go-live. Karena itu kami tekankan rencana transisi, training pengguna, dan monitoring awal supaya adopsi sistem lebih stabil.",
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
      "Untuk instalasi software, fokus copy kami adalah keamanan konfigurasi, verifikasi fungsi, dan kesiapan tim operasional agar software bisa langsung dipakai tanpa kebingungan.",
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
        question: "Apakah ada dokumentasi untuk tim internal?",
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
      "Halaman sistem POS ini dioptimalkan untuk intent pemilik outlet: transaksi cepat, stok akurat, dan laporan real-time untuk keputusan harian. Setelah dibandingkan dengan live site, copy kami perluas agar lebih kuat untuk keyword UMKM, retail, dan F&B dengan penekanan pada implementasi outlet, setup perangkat, dan adopsi tim kasir.",
    ctaLabel: "Konsultasi Sistem POS",
    ctaLinks: [
      { label: "Konsultasi Sistem POS", href: DEFAULT_CTA },
      { label: "Minta Demo Alur POS", href: DEFAULT_CTA },
      { label: "Lihat FAQ Operasional", href: "#faq" },
      { label: "Diskusikan Integrasi Outlet", href: DEFAULT_CTA },
    ],
    finalCtaTitle: "Siap Menyatukan Kasir, Stok, dan Laporan dalam Satu Sistem?",
    finalCtaDescription:
      "Kami bantu menyiapkan implementasi POS yang sesuai ritme operasional outlet Anda, dari setup hingga adopsi tim.",
    faqs: [
      {
        question: "Apakah sistem POS bisa dipakai untuk multi-cabang?",
        answer:
          "Bisa. Struktur data dapat disiapkan untuk pemantauan stok dan penjualan lintas outlet secara terpusat.",
      },
      {
        question: "Bagaimana jika internet di outlet tidak stabil?",
        answer:
          "Arsitektur POS dapat disesuaikan dengan kebutuhan operasional agar transaksi tetap aman dan sinkron saat koneksi tersedia.",
      },
      {
        question: "Apakah sistem POS cocok untuk UMKM yang baru mulai digitalisasi?",
        answer:
          "Cocok. Implementasi bisa dimulai dari alur kasir, stok, dan laporan inti dulu, lalu dikembangkan bertahap sesuai pertumbuhan outlet dan kebutuhan operasional.",
      },
    ],
    longGuide: [
      {
        title: "Fitur POS yang Paling Berdampak untuk Outlet Harian",
        description:
          "Di lapangan, fitur yang paling sering menentukan keberhasilan implementasi bukan jumlah menu di dashboard, melainkan kecepatan transaksi, akurasi stok, kemudahan koreksi, dan kualitas laporan yang bisa dipahami owner setiap hari.",
      },
      {
        title: "POS untuk UMKM vs Multi-Outlet",
        description:
          "Kebutuhan outlet tunggal biasanya fokus pada kasir dan kontrol stok dasar, sedangkan bisnis multi-outlet membutuhkan sinkronisasi master produk, kontrol cabang, dan laporan gabungan. Fondasi sistem sebaiknya dipilih sesuai arah pertumbuhan bisnis agar tidak cepat mentok.",
      },
      {
        title: "Peran Setup dan Training dalam Keberhasilan POS",
        description:
          "Banyak implementasi POS gagal bukan karena software-nya, tetapi karena setup awal, mapping produk, dan training operator yang kurang rapi. Karena itu fase onboarding menjadi bagian penting untuk memastikan sistem benar-benar dipakai di meja kasir.",
      },
    ],
  },
};
