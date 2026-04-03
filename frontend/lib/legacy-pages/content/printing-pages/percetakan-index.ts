import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export function buildPercetakanIndexPageCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Jasa Percetakan Surabaya",
    secondaryKeywords: [
      "Jasa percetakan cepat dan presisi",
      "Percetakan untuk UMKM dan perusahaan",
      "Cetak promosi dan corporate",
      "Percetakan Surabaya dan nasional",
      "Jasa cetak custom sesuai kebutuhan",
      "Cetak banner kartu nama brosur spanduk stiker",
    ],
    description:
      "Jasa percetakan Surabaya untuk banner, kartu nama, brosur, spanduk, stiker, company profile, dan materi branding bisnis dengan kualitas stabil, timeline terukur, dan pengiriman nasional.",
    intro:
      "Kami membantu bisnis mengeksekusi kebutuhan cetak dari tahap konsultasi spesifikasi, pengecekan file desain, produksi, quality control, hingga pengiriman. Dibanding live site, rewrite ini kami perluas agar lebih jelas menangkap intent pembelian: user ingin tahu jenis materi yang bisa dicetak, kecepatan proses, kualitas hasil, dan apakah percetakan siap menangani kebutuhan promosi maupun operasional secara berulang.",
    highlights: [
      "Spesifikasi material transparan sejak awal.",
      "Pre-press check untuk meminimalkan risiko salah cetak.",
      "Kontrol kualitas setiap batch produksi.",
      "Timeline pengerjaan jelas dan terukur.",
    ],
    process: [
      "Konsultasi kebutuhan: ukuran, material, finishing, jumlah, dan target deadline.",
      "Review file desain: bleed, margin aman, resolusi gambar, dan mode warna.",
      "Produksi + quality control: pengecekan hasil cetak sebelum final packing.",
      "Pengiriman/serah-terima dengan update status progres yang jelas.",
    ],
    faqs: [
      {
        question: "Apakah bisa konsultasi dulu sebelum cetak?",
        answer:
          "Bisa. Tim kami membantu merekomendasikan ukuran, material, finishing, dan estimasi produksi sebelum Anda memutuskan.",
      },
      {
        question: "Jika belum punya file siap cetak, apakah bisa dibantu?",
        answer:
          "Bisa. Kami bisa bantu review, koreksi minor, dan memberi arahan format file agar aman saat proses cetak.",
      },
      {
        question: "Apakah melayani pengerjaan dengan deadline cepat?",
        answer:
          "Ya, untuk kebutuhan tertentu kami sediakan opsi prioritas produksi. Estimasi final mengikuti jenis produk dan antrean produksi.",
      },
      {
        question: "Apakah bisa kirim ke luar kota?",
        answer:
          "Bisa. Kami melayani pengiriman ke seluruh Indonesia melalui ekspedisi yang disepakati.",
      },
    ],
    serviceTypes: [
      {
        title: "Cetak Buku & Dokumen",
        description:
          "Buku, modul, company profile, booklet, hingga materi dokumentasi internal dengan finishing rapi.",
        href: "/percetakan/cetak-buku",
      },
      {
        title: "Cetak Materi Promosi",
        description:
          "Banner, spanduk, brosur, stiker, dan materi campaign untuk kebutuhan marketing online-offline.",
        href: "/percetakan/cetak-brosur",
      },
      {
        title: "Cetak Branding Perusahaan",
        description:
          "Kartu nama, company profile, dan kebutuhan identitas visual untuk memperkuat kredibilitas bisnis.",
        href: "/percetakan/cetak-company-profile",
      },
      {
        title: "Cetak Event & Acara",
        description:
          "Undangan, album, dan kebutuhan cetak acara dengan opsi material premium dan estimasi jelas.",
        href: "/percetakan/cetak-undangan",
      },
    ],
    pricingPlans: [
      {
        name: "Starter",
        price: "Mulai 500rb",
        description: "Untuk kebutuhan cetak ringan dengan volume kecil dan spesifikasi standar.",
        items: [
          "Material standar berkualitas",
          "Pre-press check dasar",
          "Estimasi produksi cepat",
        ],
      },
      {
        name: "Growth",
        price: "Mulai 1,5jt",
        description:
          "Untuk bisnis yang menjalankan campaign rutin dan butuh hasil cetak konsisten.",
        items: [
          "Pilihan material lebih luas",
          "Quality control bertahap",
          "Prioritas jadwal produksi",
        ],
        recommended: true,
      },
      {
        name: "Scale",
        price: "Custom Quotation",
        description:
          "Untuk volume besar, multi-varian cetak, atau kebutuhan finishing khusus tingkat lanjut.",
        items: [
          "Skema produksi skala besar",
          "Opsional SLA proyek",
          "Pendampingan teknis produksi",
        ],
      },
    ],
    features: [
      {
        title: "Pre-Press Checklist",
        description:
          "File dicek lebih dulu untuk mengurangi risiko salah ukuran, blur, atau layout terpotong.",
        icon: "security",
      },
      {
        title: "Produksi Cepat Terarah",
        description:
          "Alur produksi dibagi per tahap agar progress mudah dipantau dan deadline lebih aman.",
        icon: "speed",
      },
      {
        title: "Pilihan Material Lengkap",
        description:
          "Kertas, gramasi, laminasi, dan finishing disesuaikan dengan tujuan penggunaan cetakan.",
        icon: "boxes",
      },
      {
        title: "Konsultasi Teknis",
        description:
          "Tim membantu Anda memilih spesifikasi paling efisien antara kualitas, fungsi, dan biaya.",
        icon: "support",
      },
    ],
    proofItems: [
      {
        title: "Materi Campaign UMKM",
        description:
          "Produksi brosur, banner, dan stiker untuk campaign promosi musiman usaha lokal.",
        href: "/percetakan/cetak-brosur",
      },
      {
        title: "Company Profile Kit",
        description:
          "Paket cetak profil perusahaan untuk kebutuhan presentasi mitra dan proses tender.",
        href: "/percetakan/cetak-company-profile",
      },
      {
        title: "Kebutuhan Cetak Event",
        description:
          "Pengerjaan materi cetak event dengan timeline ketat dan kualitas visual yang terjaga.",
        href: "/percetakan/cetak-undangan",
      },
    ],
    testimonials: [
      {
        name: "Andri S.",
        role: "Owner UMKM Kuliner",
        quote:
          "Brosur dan stiker brand kami jadi lebih rapi dan konsisten. Prosesnya jelas dari awal sampai barang diterima.",
      },
      {
        name: "Mega P.",
        role: "Marketing Executive",
        quote:
          "Timnya responsif, enak diajak diskusi spesifikasi, dan hasil cetak banner sesuai ekspektasi campaign kami.",
      },
      {
        name: "Rendy H.",
        role: "Koordinator Event",
        quote:
          "Kami terbantu dengan timeline produksi yang terukur. Semua materi event selesai tepat waktu.",
      },
    ],
    finalCtaTitle: "Siap Produksi Materi Cetak untuk Bisnis Anda?",
    finalCtaDescription:
      "Kirim kebutuhan Anda sekarang. Tim kami akan bantu susun spesifikasi, estimasi, dan skema produksi paling efisien.",
    ctaLabel: "Konsultasi Layanan Percetakan",
    ctaHref: DEFAULT_CTA,
    longGuide: [
      {
        title: "Jenis Materi Cetak yang Paling Sering Dicari Bisnis",
        description:
          "Permintaan paling umum biasanya jatuh pada banner, brosur, company profile, kartu nama, stiker, dan buku. Setiap materi punya target distribusi dan standar finishing berbeda, sehingga spesifikasi sebaiknya ditentukan berdasarkan fungsi, bukan sekadar harga per item.",
      },
      {
        title: "Cara Menekan Risiko Revisi Produksi",
        description:
          "Risiko revisi paling sering muncul dari file desain yang belum siap cetak, pemilihan material yang tidak sesuai, dan ekspektasi warna yang belum disepakati. Karena itu tahap pre-press dan approval spesifikasi menjadi bagian penting sebelum produksi dijalankan.",
      },
      {
        title: "Kapan Bisnis Perlu Mitra Percetakan Berkala",
        description:
          "Jika kebutuhan cetak muncul rutin untuk campaign, promosi cabang, materi sales, atau event, pola kerja berkala biasanya lebih efisien daripada order satuan acak. Ini memudahkan konsistensi kualitas, perencanaan timeline, dan kontrol biaya produksi.",
      },
    ],
  };
}
