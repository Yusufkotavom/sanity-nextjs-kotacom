import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteHargaPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Harga Jasa Pembuatan Website",
    secondaryKeywords: [
      "Biaya pembuatan website",
      "Paket website bisnis",
      "Harga website company profile",
      "Estimasi biaya web profesional",
      "Harga website toko online",
      "Biaya landing page bisnis",
    ],
    description:
      "Informasi harga jasa pembuatan website yang lebih transparan, dengan pilihan paket yang bisa disesuaikan untuk company profile, landing page, maupun toko online.",
    intro:
      "Halaman harga ini membantu Anda memahami kisaran biaya, ruang lingkup pekerjaan, dan pilihan paket website agar keputusan investasi digital terasa lebih jelas sejak awal.",
    highlights: [
      "Gambaran biaya dibuat lebih mudah dipahami untuk kebutuhan bisnis yang berbeda.",
      "Paket bisa diarahkan ke company profile, landing page, atau toko online.",
      "Scope pengerjaan dijelaskan agar ekspektasi hasil dan timeline lebih realistis.",
      "Estimasi dapat disesuaikan lagi saat kebutuhan fitur dan konten sudah lebih detail.",
    ],
    process: [
      "Pelajari tujuan website, jumlah halaman, dan fungsi utama yang dibutuhkan.",
      "Tentukan paket atau skenario pengerjaan yang paling sesuai dengan tahap bisnis Anda.",
      "Susun estimasi berdasarkan scope, konten, desain, dan kebutuhan fitur.",
      "Finalkan proposal kerja setelah alur halaman dan prioritas implementasi disepakati.",
    ],
    faqs: [
      {
        question: "Apa yang paling memengaruhi harga pembuatan website?",
        answer:
          "Biasanya ditentukan oleh jumlah halaman, tingkat kustomisasi desain, kebutuhan fitur, volume konten, dan tingkat kompleksitas integrasi.",
      },
      {
        question: "Apakah saya bisa mulai dari paket kecil dulu?",
        answer:
          "Bisa. Banyak bisnis memulai dari halaman inti yang paling berdampak, lalu menambah halaman atau fitur ketika kebutuhan sudah berkembang.",
      },
      {
        question: "Apakah estimasi harga bisa berubah setelah diskusi?",
        answer:
          "Bisa. Estimasi awal biasanya disesuaikan lagi setelah struktur halaman, jumlah konten, dan detail fitur benar-benar jelas.",
      },
    ],
    ctaLabel: "Minta Estimasi Harga",
    ctaHref: DEFAULT_CTA,
  };
}
