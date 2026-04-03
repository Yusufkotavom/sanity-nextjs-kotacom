import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteTokoOnlinePageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Website Toko Online",
    secondaryKeywords: [
      "Website e-commerce custom",
      "Website toko online profesional",
      "Platform e-commerce terintegrasi",
      "Website toko online dengan inventory management",
      "Website toko online dengan payment gateway",
      "Customer management dan sales analytics",
      "Pembuatan website jualan online",
      "Website katalog produk",
    ],
    description:
      "Jasa pembuatan website toko online dan platform e-commerce terintegrasi untuk bisnis yang membutuhkan inventory management, payment gateway, customer management, dan sales analytics dalam satu platform.",
    intro:
      "Website toko online kami rancang untuk bisnis yang ingin bergerak lebih serius di e-commerce. Fokusnya bukan hanya katalog produk, tetapi juga integrasi payment gateway, inventory management, customer management, dan dashboard analytics agar penjualan bisa dipantau lebih rapi.",
    highlights: [
      "Alur belanja disusun agar pelanggan cepat menemukan produk dan menyelesaikan checkout.",
      "Payment gateway, inventory, dan customer management dapat diintegrasikan sejak awal.",
      "Dashboard penjualan membantu owner memantau performa produk dan kanal penjualan.",
      "Fondasi toko online disiapkan untuk scale-up promosi, katalog, dan operasional.",
    ],
    process: [
      "Audit model penjualan, katalog, pembayaran, dan pengiriman yang dipakai bisnis.",
      "Rancang struktur katalog, halaman produk, checkout, dan dashboard operasional inti.",
      "Integrasikan payment, inventory, dan data pelanggan sesuai kebutuhan transaksi.",
      "Go-live dengan monitoring funnel penjualan dan iterasi untuk meningkatkan konversi.",
    ],
    faqs: [
      {
        question: "Apakah website toko online bisa terhubung ke payment gateway dan inventory?",
        answer:
          "Bisa. Struktur platform dapat disiapkan agar pembayaran, stok, dan data order terhubung lebih rapi dalam satu alur operasional.",
      },
      {
        question: "Apakah cocok untuk bisnis yang sebelumnya hanya jualan lewat marketplace atau chat?",
        answer:
          "Cocok. Website bisa menjadi kanal milik sendiri untuk memperkuat brand, mengumpulkan data pelanggan, dan mengurangi ketergantungan pada platform pihak ketiga.",
      },
      {
        question: "Apa manfaat dashboard analytics di toko online?",
        answer:
          "Dashboard membantu owner melihat performa produk, tren penjualan, dan perilaku pelanggan sehingga keputusan promosi dan stok lebih cepat dibuat.",
      },
    ],
    ctaLinks: [
      { label: "Konsultasi Toko Online", href: DEFAULT_CTA },
      { label: "Diskusikan Payment Gateway", href: DEFAULT_CTA },
      { label: "Bandingkan Paket Website", href: "/pembuatan-website/harga" },
      { label: "Lihat FAQ Toko Online", href: "#faq" },
    ],
    ctaLabel: "Bangun Website Toko Online",
    ctaHref: DEFAULT_CTA,
  };
}
