import type { LegacyRewriteCopy } from "../types";

export function buildSistemPosPageCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Software Sistem POS",
    secondaryKeywords: [
      "Aplikasi kasir online",
      "Sistem POS retail",
      "Software POS restoran",
      "POS terintegrasi stok",
      "Sistem point of sale",
    ],
    description:
      "Software sistem POS untuk bisnis retail dan F&B yang membutuhkan transaksi cepat, kontrol stok akurat, dan laporan real-time.",
    intro:
      "Sistem POS ini difokuskan untuk pemilik outlet yang membutuhkan transaksi cepat, stok akurat, dan laporan real-time untuk keputusan harian maupun pengawasan multi-cabang.",
    highlights: [
      "Transaksi cepat dengan alur kasir yang efisien.",
      "Sinkronisasi stok dan penjualan lintas outlet.",
      "Laporan real-time untuk owner dan supervisor.",
      "Implementasi bertahap sesuai ritme operasional outlet.",
    ],
    process: [
      "Audit alur kasir, stok, dan kebutuhan outlet.",
      "Konfigurasi produk, pengguna, dan rule operasional inti.",
      "Uji alur transaksi dan monitoring pilot go-live.",
      "Training tim dan stabilisasi pasca implementasi.",
    ],
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
    ctaLabel: "Konsultasi Sistem POS",
    ctaHref: "/contact",
    ctaLinks: [
      { label: "Konsultasi Sistem POS", href: "/contact" },
      { label: "Minta Demo Alur POS", href: "/contact" },
      { label: "Lihat FAQ Operasional", href: "#faq" },
      { label: "Diskusikan Integrasi Outlet", href: "/contact" },
    ],
    finalCtaTitle: "Siap Menyatukan Kasir, Stok, dan Laporan dalam Satu Sistem?",
    finalCtaDescription:
      "Kami bantu menyiapkan implementasi POS yang sesuai ritme operasional outlet Anda, dari setup hingga adopsi tim.",
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
  };
}
