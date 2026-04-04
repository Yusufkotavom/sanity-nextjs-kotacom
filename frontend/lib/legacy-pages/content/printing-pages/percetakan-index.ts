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
      "Percetakan berkualitas untuk UMKM"
    ],
    description:
      "Percetakan Surabaya terpercaya untuk banner, kartu nama, brosur, spanduk, stiker, undangan, dan bahan promosi bisnis dengan hasil cetak berkualitas, harga kompetitif, dan layanan profesional.",
    intro:
      "Butuh hasil cetak yang rapi dan sesuai spesifikasi? Kami membantu UMKM dan bisnis di Surabaya mencetak berbagai kebutuhan promosi mulai dari kartu nama, brosur, hingga banner besar dengan proses yang mudah dan transparan. Cukup kirim desain Anda, lalu kami bantu lanjutkan dari pengecekan file sampai pengiriman ke seluruh Indonesia.",
    highlights: [
      "Hasil cetak tajam dan konsisten",
      "Proses order yang mudah melalui WhatsApp",
      "Pengecekan file gratis sebelum produksi",
      "Pengiriman cepat ke seluruh Indonesia",
      "Konsultasi spesifikasi tanpa biaya",
      "Harga transparan tanpa biaya tersembunyi"
    ],
    process: [
      "Kirim detail kebutuhan cetak melalui WhatsApp",
      "Kami cek file desain dan beri rekomendasi spesifikasi",
      "Setelah disetujui, kami mulai proses produksi",
      "Hasil cetak dicek kualitas sebelum dikirim",
      "Pesanan dikirim dengan layanan ekspedisi terpercaya"
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
        title: "Ribu UMKM Percaya Layanan Kami",
        description:
          "Lebih dari 500 UMKM di Surabaya dan sekitarnya telah menggunakan layanan cetak kami untuk kebutuhan promosi dan operasional bisnis mereka.",
        href: "/testimonials"
      },
      {
        title: "Hasil Cetak yang Konsisten dan Berkualitas",
        description:
          "Setiap hasil cetak melalui proses pengecekan kualitas standar untuk menjamin kepuasan pelanggan.",
        href: "/gallery"
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
        title: "Memilih Jenis Cetak yang Tepat untuk Bisnis Anda",
        description:
          "Banner cocok untuk promosi luar ruangan yang perlu daya tarik tinggi, brosur untuk menjelaskan produk atau layanan secara detail, kartu nama untuk networking profesional, dan stiker untuk branding produk atau kemasan."
      },
      {
        title: "Tips Mengirim File Desain untuk Hasil Cetak Maksimal",
        description:
          "Pastikan file dalam format PDF, CDR, atau AI dengan resolusi minimal 300 DPI, sertakan bleed 3mm, konversi font ke outline atau sertakan file font, dan gunakan mode warna CMYK untuk hasil cetak yang akurat."
      }
    ]
  };
}
