import { DEFAULT_CTA } from "./constants";
import { SOFTWARE_PAGE_OVERRIDES } from "./software-pages/overrides";
import type { LegacyRewriteCopy } from "./types";

export const SOFTWARE_PRIORITY_OVERRIDES: Record<string, Partial<LegacyRewriteCopy>> = {
  ...SOFTWARE_PAGE_OVERRIDES,
  "sistem-pos": {
    ...SOFTWARE_PAGE_OVERRIDES["sistem-pos"],
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
          "Di lapangan, hal yang paling sering menentukan keberhasilan implementasi bukan banyaknya menu di sistem, melainkan kecepatan transaksi, akurasi stok, kemudahan koreksi, dan kualitas laporan yang bisa dipahami owner setiap hari.",
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
