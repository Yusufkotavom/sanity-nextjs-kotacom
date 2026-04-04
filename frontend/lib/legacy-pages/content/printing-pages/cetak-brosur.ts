import { DEFAULT_CTA } from "../constants";
import { buildGenericCopy } from "../core";
import type { LegacyRewriteCopy } from "../types";
import type { LegacyAstroPage } from "../../astro-static";

export function buildPercetakanCetakBrosurPageCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  return {
    ...buildGenericCopy(page),
    primaryKeyword: "Jasa Cetak Brosur Surabaya",
    secondaryKeywords: [
      "Cetak brosur murah Surabaya",
      "Percetakan flyer dan leaflet",
      "Brosur promosi cepat",
      "Cetak bahan promosi Surabaya",
      "Jasa cetak brosur tanpa ribet",
      "Percetakan brosur berkualitas",
      "Cetak brosur untuk campaign promosi",
    ],
    description:
      "Layanan cetak brosur, flyer, dan leaflet Surabaya untuk promosi bisnis, produk, dan layanan dengan hasil cetak yang rapi, mudah dibagikan, dan siap dipakai untuk campaign offline.",
    intro:
      "Butuh brosur promosi yang menarik dan sesuai target pemasaran? Kami bantu menyiapkan cetak brosur dari pengecekan file, pemilihan ukuran dan kertas, sampai produksi dan pengiriman agar materi campaign Anda siap dipakai tanpa banyak hambatan teknis.",
    ctaLabel: "Konsultasi Cetak Brosur Sekarang",
    ctaHref: DEFAULT_CTA,
    highlights: [
      "Cocok untuk promo produk, profil layanan, event, dan materi distribusi lapangan.",
      "Ukuran, lipatan, dan material bisa dipilih sesuai isi dan target pembaca.",
      "File dicek lebih dulu agar layout dan hasil cetak lebih aman.",
      "Produksi dapat diatur untuk campaign singkat maupun kebutuhan distribusi rutin.",
    ],
    process: [
      "Tentukan tujuan brosur, target pembaca, jumlah, dan deadline distribusi.",
      "Kami bantu cek file desain serta memberi masukan soal ukuran dan material.",
      "Produksi dijalankan setelah layout dan spesifikasi disetujui.",
      "Brosur dicek kualitasnya sebelum dikemas dan dikirim.",
    ],
    faqs: [
      {
        question: "Apa bedanya brosur, flyer, dan leaflet?",
        answer:
          "Perbedaannya biasanya ada pada jumlah lipatan, kapasitas informasi, dan cara distribusinya. Kami bantu memilih format yang paling sesuai dengan tujuan promosi Anda.",
      },
      {
        question: "Kertas apa yang cocok untuk brosur promosi?",
        answer:
          "Tergantung kesan yang ingin ditampilkan. Art paper atau art carton sering dipilih untuk visual yang lebih tajam, sementara jenis lain bisa disesuaikan dengan budget dan kebutuhan distribusi.",
      },
      {
        question: "Apakah brosur masih efektif untuk promosi offline?",
        answer:
          "Masih efektif jika pesan utamanya jelas, desainnya rapi, dan distribusinya diarahkan ke audiens yang tepat seperti event, toko, atau meeting penjualan.",
      },
    ],
    ctaLinks: [
      { label: "Konsultasi Cetak Brosur", href: DEFAULT_CTA },
      { label: "Minta Rekomendasi Ukuran Brosur", href: DEFAULT_CTA },
      { label: "Lihat FAQ Brosur", href: "#faq" },
      { label: "Bandingkan dengan Cetak Banner", href: "/percetakan/cetak-banner-spanduk" },
    ],
    finalCtaTitle: "Siapkan Brosur yang Lebih Siap Dibagikan dan Lebih Mudah Dipahami",
    finalCtaDescription:
      "Kirim detail campaign atau materi Anda, lalu kami bantu memilih format brosur yang paling tepat untuk distribusi dan promosi.",
  };
}
