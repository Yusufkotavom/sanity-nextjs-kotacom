import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export function buildPercetakanIndexPageCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Jasa Percetakan Surabaya",
    secondaryKeywords: [
      "Cetak banner dan spanduk",
      "Percetakan kartu nama dan brosur",
      "Jasa cetak stiker dan undangan",
      "Percetakan murah Surabaya",
      "Cetak bahan promosi cepat",
      "Jasa percetakan online Surabaya",
      "Percetakan berkualitas untuk UMKM",
      "Percetakan company profile dan buku",
    ],
    description:
      "Percetakan Surabaya untuk banner, buku, company profile, brosur, spanduk, stiker, undangan, dan materi promosi bisnis dengan hasil cetak rapi, spesifikasi jelas, dan proses produksi terukur.",
    intro:
      "Butuh hasil cetak yang rapi dan sesuai spesifikasi? Kami membantu bisnis di Surabaya menyiapkan berbagai kebutuhan percetakan mulai dari company profile, buku, brosur, sampai banner dan materi promosi dengan proses yang lebih mudah, lebih jelas, dan lebih aman untuk produksi.",
    highlights: [
      "Hasil cetak tajam dan konsisten untuk kebutuhan promosi maupun operasional.",
      "Pengecekan file dilakukan sebelum produksi dimulai.",
      "Konsultasi spesifikasi membantu memilih material dan finishing yang tepat.",
      "Pengiriman dapat diatur untuk Surabaya maupun luar kota.",
      "Pilihan produk cetak bisa disusun sesuai campaign, event, atau kebutuhan brand.",
      "Harga lebih mudah dipetakan berdasarkan jumlah, material, dan target timeline."
    ],
    process: [
      "Kirim detail kebutuhan cetak, target penggunaan, dan deadline yang diinginkan.",
      "Kami cek file desain lalu bantu arahkan spesifikasi yang paling sesuai.",
      "Produksi dijalankan setelah file dan detail pekerjaan disetujui.",
      "Hasil cetak dicek kualitasnya sebelum packing dan pengiriman.",
      "Pesanan dikirim sesuai skema yang paling aman untuk lokasi tujuan."
    ],
    faqs: [
      {
        question: "Berapa lama waktu proses cetaknya?",
        answer:
          "Waktu produksi bergantung pada jenis produk dan jumlah order. Biasanya bahan promosi seperti brosur atau stiker membutuhkan 2-3 hari kerja setelah file disetujui. Untuk banner, spanduk, atau pesanan volume besar, estimasi akan kami sesuaikan setelah mengecek spesifikasinya."
      },
      {
        question: "Apakah saya perlu punya desain terlebih dahulu?",
        answer:
          "Tidak harus. Jika Anda belum punya desain, kami bisa bantu menyiapkan desain sederhana sesuai kebutuhan. Namun untuk hasil yang maksimal, kami sarankan file siap cetak dalam format PDF, CDR, atau AI dengan resolusi minimal 300 DPI."
      },
      {
        question: "Produk percetakan apa yang paling sering dipesan bisnis?",
        answer:
          "Biasanya meliputi company profile, buku, brosur, banner, stiker, kartu nama, dan materi promosi untuk event atau aktivitas penjualan.",
      },
      {
        question: "Bagaimana cara saya bisa memastikan hasil cetaknya sesuai ekspektasi?",
        answer:
          "Sebelum produksi dimulai, kami dapat memberikan proof digital atau contoh cetak kecil bila diperlukan. Kami juga selalu mengecek bleed, margin, dan resolusi file untuk meminimalkan risiko kesalahan cetak."
      },
      {
        question: "Apakah ada jumlah minimum order?",
        answer:
          "Tidak ada minimum order untuk sebagian produk seperti stiker, kartu nama, atau brosur kecil. Untuk produk spesifik seperti banner besar atau spanduk custom, kami bisa diskusikan terlebih dahulu sesuai kebutuhan dan budget Anda."
      },
      {
        question: "Bisakah pesanan dikirim ke luar kota atau pulau?",
        answer:
          "Bisa! Kami melayani pengiriman ke seluruh Indonesia melalui layanan ekspedisi terpercaya seperti JNE, TIKI, atau POS Indonesia. Ongkir dihitung berdasarkan berat dan tujuan pengiriman."
      }
    ],
    ctaLabel: "Mulai Konsultasi Percetakan Sekarang",
    ctaHref: DEFAULT_CTA,
    proofItems: [
      {
        title: "Material promosi untuk kebutuhan bisnis harian",
        description:
          "Mulai dari banner, brosur, kartu nama, sampai company profile dapat diproduksi dengan spesifikasi yang disesuaikan kebutuhan lapangan.",
        href: "/percetakan/cetak-company-profile"
      },
      {
        title: "Produksi buku dan materi presentasi yang lebih rapi",
        description:
          "Kebutuhan buku, company profile, dan materi branding bisa diarahkan dengan alur produksi yang lebih jelas dari awal.",
        href: "/percetakan/cetak-buku"
      }
    ],
    testimonials: [
      {
        name: "Andri S.",
        role: "Owner UMKM Kuliner",
        quote:
          "Brosur dan stiker brand kami jadi lebih rapi dan konsisten. Prosesnya jelas dari awal sampai barang diterima."
      },
      {
        name: "Mega P.",
        role: "Marketing Executive",
        quote:
          "Timnya responsif, enak diajak diskusi spesifikasi, dan hasil cetak banner sesuai ekspektasi campaign kami."
      },
      {
        name: "Rendy H.",
        role: "Koordinator Event",
        quote:
          "Kami terbantu dengan timeline produksi yang terukur. Semua materi event selesai tepat waktu."
      }
    ],
    finalCtaTitle: "Siap Cetak Kebutuhan Promosi Bisnis Anda?",
    finalCtaDescription:
      "Kirim spesifikasi cetak Anda sekarang. Tim kami akan bantu hitung estimasi biaya dan waktu produksi paling efisien.",
    longGuide: [
      {
        title: "Memilih Produk Cetak yang Tepat untuk Tujuan Bisnis",
        description:
          "Banner cocok untuk promosi luar ruangan, brosur untuk menjelaskan layanan secara ringkas, company profile untuk presentasi bisnis, dan buku atau katalog untuk kebutuhan distribusi konten yang lebih panjang."
      },
      {
        title: "Persiapan File Desain agar Produksi Lebih Aman",
        description:
          "Pastikan file dalam format PDF, CDR, atau AI dengan resolusi minimal 300 DPI, sertakan bleed 3mm, dan gunakan mode warna CMYK agar proses cetak berjalan lebih aman dan hasil warna lebih konsisten."
      }
    ]
  };
}
