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
      "Platform e-commerce untuk bisnis",
      "Website toko online dengan payment gateway",
      "Website toko online dengan manajemen pesanan",
      "Website katalog produk",
      "Pembuatan website jualan online",
      "Website checkout online",
    ],
    description:
      "Jasa pembuatan website toko online untuk bisnis yang ingin menampilkan produk dengan rapi, memudahkan checkout, dan mengelola pesanan lebih teratur.",
    intro:
      "Website toko online kami rancang untuk bisnis yang ingin menjual lebih serius lewat kanal milik sendiri. Fokusnya bukan hanya katalog produk, tetapi juga pengalaman belanja yang jelas, checkout yang mudah, dan pengelolaan pesanan yang lebih rapi.",
    highlights: [
      "Alur belanja disusun agar pelanggan cepat menemukan produk dan menyelesaikan checkout.",
      "Pembayaran, pengiriman, dan pengelolaan pesanan bisa disiapkan sesuai kebutuhan bisnis.",
      "Halaman produk disusun agar manfaat, harga, dan CTA pembelian lebih mudah dipahami.",
      "Fondasi toko online disiapkan untuk mendukung promosi, katalog, dan pertumbuhan penjualan.",
    ],
    process: [
      "Pelajari model penjualan, jenis produk, dan hambatan utama saat pelanggan membeli.",
      "Rancang struktur katalog, halaman produk, keranjang, dan checkout yang lebih sederhana.",
      "Siapkan alur pembayaran, pengiriman, dan pengelolaan order sesuai kebutuhan transaksi.",
      "Lanjutkan optimasi setelah live untuk meningkatkan konversi dan nilai transaksi.",
    ],
    faqs: [
      {
        question: "Apakah website toko online bisa terhubung ke payment gateway dan inventory?",
        answer:
          "Bisa. Struktur platform dapat disiapkan agar pembayaran, stok, dan data order terhubung lebih rapi dalam satu alur kerja.",
      },
      {
        question: "Apakah cocok untuk bisnis yang sebelumnya hanya jualan lewat marketplace atau chat?",
        answer:
          "Cocok. Website bisa menjadi kanal milik sendiri untuk memperkuat brand, mengumpulkan data pelanggan, dan mengurangi ketergantungan pada platform pihak ketiga.",
      },
      {
        question: "Bagaimana agar website toko online tidak hanya ramai, tetapi juga menghasilkan order?",
        answer:
          "Kami menata halaman produk, trust signal, CTA, dan alur checkout agar pengunjung lebih mudah bergerak dari melihat produk ke melakukan pembelian.",
      },
    ],
    ctaLinks: [
      { label: "Konsultasi Toko Online", href: DEFAULT_CTA },
      { label: "Bandingkan Paket Website", href: "/pembuatan-website/harga" },
      { label: "Lihat Portfolio Website", href: "/pembuatan-website/portfolio" },
      { label: "Lihat FAQ Toko Online", href: "#faq" },
    ],
    ctaLabel: "Bangun Website Toko Online",
    ctaHref: DEFAULT_CTA,
  };
}
