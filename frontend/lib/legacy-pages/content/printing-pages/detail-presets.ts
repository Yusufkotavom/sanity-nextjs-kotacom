import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export const PRINTING_DETAIL_PRESETS: Record<string, Partial<LegacyRewriteCopy>> = {
  "cetak-album-pernikahan": {
    primaryKeyword: "Jasa Cetak Album Pernikahan",
    secondaryKeywords: [
      "Cetak album wedding premium",
      "Album pernikahan custom",
      "Album foto nikah eksklusif",
      "Percetakan album pernikahan",
    ],
    description:
      "Jasa cetak album pernikahan premium dengan kualitas warna stabil, material eksklusif, dan finishing rapi untuk momen spesial.",
    intro:
      "Kami membantu produksi album pernikahan custom agar dokumentasi momen istimewa tampil elegan dan tahan lama.",
    ctaLabel: "Konsultasi Cetak Album",
  },
  "cetak-banner-spanduk": {
    primaryKeyword: "Jasa Cetak Banner Spanduk",
    secondaryKeywords: [
      "Cetak banner promosi",
      "Cetak spanduk event",
      "Banner outdoor bisnis",
      "Percetakan spanduk cepat",
    ],
    description:
      "Jasa cetak banner dan spanduk untuk kebutuhan promosi bisnis, event, dan branding dengan hasil cetak tajam dan cepat produksi.",
    intro:
      "Layanan cetak banner-spanduk kami disiapkan untuk kebutuhan promosi yang membutuhkan visual kuat dan turnaround cepat.",
    ctaLabel: "Pesan Banner Spanduk",
  },
  "cetak-kaos": {
    primaryKeyword: "Jasa Cetak Kaos",
    secondaryKeywords: [
      "Cetak kaos custom",
      "Kaos sablon promosi",
      "Kaos event perusahaan",
      "Produksi kaos brand",
    ],
    description:
      "Jasa cetak kaos custom untuk kebutuhan brand, komunitas, dan event dengan hasil sablon rapi dan material nyaman.",
    intro:
      "Layanan cetak kaos kami mendukung kebutuhan promosi maupun merchandise dengan opsi produksi fleksibel sesuai jumlah dan desain.",
    ctaLabel: "Konsultasi Cetak Kaos",
  },
  "cetak-kartu-nama": {
    primaryKeyword: "Jasa Cetak Kartu Nama",
    secondaryKeywords: [
      "Cetak business card premium",
      "Kartu nama perusahaan",
      "Kartu nama custom",
      "Percetakan kartu nama cepat",
    ],
    description:
      "Jasa cetak kartu nama profesional dengan opsi material dan finishing premium untuk memperkuat kesan pertama bisnis Anda.",
    intro:
      "Kami membantu produksi kartu nama yang clean dan representatif agar komunikasi brand tetap konsisten di setiap interaksi bisnis.",
    ctaLabel: "Pesan Kartu Nama",
  },
  "cetak-kemasan-product": {
    primaryKeyword: "Jasa Cetak Kemasan Produk",
    secondaryKeywords: [
      "Cetak packaging custom",
      "Kemasan produk branding",
      "Box produk custom",
      "Percetakan kemasan UMKM",
    ],
    description:
      "Jasa cetak kemasan produk custom untuk meningkatkan daya tarik visual, identitas brand, dan kesiapan produk di pasar.",
    intro:
      "Kami memproduksi kemasan produk dengan fokus kualitas cetak, ketepatan ukuran, dan konsistensi brand agar siap distribusi.",
    ctaLabel: "Konsultasi Kemasan Produk",
  },
  "cetak-stiker": {
    primaryKeyword: "Jasa Cetak Stiker",
    secondaryKeywords: [
      "Cetak stiker custom",
      "Stiker label produk",
      "Stiker promosi bisnis",
      "Percetakan stiker branding",
    ],
    description:
      "Jasa cetak stiker custom untuk label produk, promosi, dan branding dengan hasil potong presisi serta warna stabil.",
    intro:
      "Kami menyediakan layanan cetak stiker untuk kebutuhan branding produk dan campaign promosi dengan opsi material beragam.",
    ctaLabel: "Pesan Cetak Stiker",
  },
  "cetak-undangan": {
    primaryKeyword: "Jasa Cetak Undangan",
    secondaryKeywords: [
      "Cetak undangan custom",
      "Undangan pernikahan premium",
      "Undangan event perusahaan",
      "Percetakan undangan eksklusif",
    ],
    description:
      "Jasa cetak undangan custom untuk kebutuhan pernikahan dan event dengan desain elegan, material premium, dan finishing rapi.",
    intro:
      "Layanan cetak undangan kami dirancang agar detail visual dan pesan acara tersampaikan dengan kualitas yang berkesan.",
    ctaLabel: "Konsultasi Cetak Undangan",
  },
  "cetak-yasin": {
    primaryKeyword: "Jasa Cetak Yasin",
    secondaryKeywords: [
      "Cetak buku yasin",
      "Yasin custom",
      "Cetak yasin acara",
      "Percetakan yasin berkualitas",
    ],
    description:
      "Jasa cetak yasin custom dengan kualitas cetak rapi dan opsi finishing sesuai kebutuhan acara keagamaan maupun keluarga.",
    intro:
      "Kami membantu produksi cetak yasin dengan proses terstruktur agar hasil akhir tetap rapi, jelas dibaca, dan tepat waktu.",
    ctaLabel: "Pesan Cetak Yasin",
  },
  "cetak-al-quran": {
    intro:
      "Halaman ini dioptimasi untuk kebutuhan cetak mushaf dengan standar ketelitian lebih tinggi: keterbacaan teks, ketahanan jilid, dan kualitas finishing yang nyaman dipakai jangka panjang.",
    ctaLabel: "Konsultasi Cetak Al-Quran",
    finalCtaTitle: "Butuh Cetak Al-Quran dengan Hasil Rapi dan Presisi?",
    finalCtaDescription:
      "Kami bantu memilih spesifikasi kertas, jilid, dan finishing agar hasil cetak Al-Quran lebih nyaman dibaca dan tahan lama.",
    faqs: [
      {
        question: "Apa fokus quality control untuk cetak Al-Quran?",
        answer:
          "Fokus utamanya pada keterbacaan teks, konsistensi cetak halaman, serta ketahanan jilid agar mushaf tetap nyaman digunakan dalam jangka panjang.",
      },
      {
        question: "Apakah bisa konsultasi material sebelum produksi massal?",
        answer:
          "Bisa. Kami sarankan opsi material sesuai tujuan penggunaan agar kualitas tetap terjaga sekaligus efisien secara biaya.",
      },
    ],
  },
  "cetak-buku-kenangan-sekolah": {
    intro:
      "Halaman ini dioptimasi untuk kebutuhan institusi pendidikan yang ingin menghasilkan buku kenangan dengan visual konsisten, layout rapi, dan proses produksi yang terkoordinasi lintas kelas atau angkatan.",
    ctaLabel: "Konsultasi Buku Kenangan",
    finalCtaTitle: "Siap Produksi Buku Kenangan Sekolah yang Lebih Berkesan?",
    finalCtaDescription:
      "Kami bantu sekolah menyusun spesifikasi, alur pengumpulan konten, dan jadwal produksi agar buku kenangan selesai tepat waktu.",
    faqs: [
      {
        question: "Bagaimana mengelola produksi buku kenangan untuk banyak kelas?",
        answer:
          "Produksi dibagi per tahap: pengumpulan konten, validasi layout, persetujuan final, lalu cetak batch agar koordinasi lebih tertata.",
      },
      {
        question: "Apakah bisa bantu menyesuaikan layout agar seragam antar halaman?",
        answer:
          "Bisa. Kami dapat membantu standarisasi layout agar tampilan buku kenangan tetap konsisten dan profesional.",
      },
    ],
  },
};
