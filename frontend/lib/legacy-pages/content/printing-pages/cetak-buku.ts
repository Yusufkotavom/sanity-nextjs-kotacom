import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export function buildPercetakanCetakBukuPageCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Jasa Cetak Buku Surabaya Profesional",
    secondaryKeywords: [
      "Cetak buku murah Surabaya",
      "Percetakan buku untuk pemula",
      "Jasa cetak buku tanpa ribet",
      "Cetak buku Surabaya cepat",
      "Percetakan buku berkualitas",
      "Jasa cetak buku online Surabaya"
    ],
    description:
      "Layanan cetak buku Surabaya untuk penulis, sekolah, komunitas, dan produsen konten yang butuh hasil cetak berkualitas dengan proses yang mudah dipahami. Kami menangani segala hal mulai dari pengecekan file hingga pengiriman ke seluruh Indonesia.",
    intro:
      "Punya naskah siap dicetak tapi bingung mulai dari mana? Kami bantu Anda cetak buku dengan proses yang sederhana: mulai dari konsultasi spesifikasi, pengecekan file, produksi, hingga pengiriman. Anda tidak perlu repot memikirkan detail teknis cetak, karena kami bantu mengarahkan prosesnya dari awal.",
    highlights: [
      "Proses cetak yang jelas dan mudah dipahami",
      "Pengecekan file gratis sebelum produksi",
      "Hasil cetak sesuai spesifikasi yang disetujui",
      "Pengiriman ke seluruh Indonesia dengan layanan terpercaya",
      "Konsultasi spesifikasi tanpa biaya",
      "Pilihan kertas dan jilid sesuai budget"
    ],
    process: [
      "Kirim detail spesifikasi buku Anda (ukuran, jumlah halaman, dll)",
      "Kami cek file desain Anda dan beri feedback jika diperlukan",
      "Setelah file disetujui, kami mulai proses produksi",
      "Setiap hasil cetak dicek kualitas sebelum dikirim",
      "Buku Anda dikirim dengan pengamanan yang baik"
    ],
    faqs: [
      {
        question: "Berapa lama waktu proses cetak buku?",
        answer:
          "Untuk jumlah kecil (1-10 buku), proses produksi biasanya 2-3 hari kerja setelah file disetujui. Untuk jumlah menengah (11-100 buku), butuh waktu 4-7 hari kerja. Untuk jumlah besar di atas 100 buku, kami akan memberikan estimasi waktu produksi setelah mengecek spesifikasinya."
      },
      {
        question: "Saya belum punya desain cover, bisakah Anda bantu?",
        answer:
          "Tentu! Kami bisa memberikan panduan desain cover sederhana atau menghubungkan Anda dengan desainer kami yang bisa membuat desain cover profesional dengan biaya tambahan sesuai kesepakatan."
      },
      {
        question: "Format file apa yang harus saya kirim untuk cetak buku?",
        answer:
          "Format terbaik untuk cetak buku adalah PDF siap cetak. Pastikan file dalam ukuran final dengan bleed 3mm, resolusi gambar minimal 300 DPI, dan font sudah di-outline atau disertakan file fontnya."
      },
      {
        question: "Bisakah saya lihat contoh hasil cetak sebelum order besar?",
        answer:
          "Bisa. Kami menyediakan layanan proof cetak untuk 1-2 buku dengan biaya produksi normal. Ini cocok untuk memastikan hasil cetak sesuai ekspektasi sebelum melakukan order dalam jumlah besar."
      },
      {
        question: "Apakah kami melayani pengiriman ke luar pulau Jawa?",
        answer:
          "Tentu! Kami melayani pengiriman ke seluruh Indonesia melalui layanan ekspedisi terpercaya. Ongkir akan dihitung berdasarkan berat total pesanan dan tujuan pengiriman."
      }
    ],
    ctaLabel: "Konsultasi Cetak Buku Sekarang",
    ctaHref: DEFAULT_CTA,
    ctaLinks: [
      { label: "Hubungi Kami Sekarang", href: DEFAULT_CTA },
      { label: "Tanya di Sini", href: DEFAULT_CTA },
      { label: "Minta Penawaran Akurat di Sini", href: DEFAULT_CTA },
      { label: "Chat & Cetak Sekarang", href: DEFAULT_CTA }
    ],
    finalCtaTitle: "Punya Naskah dan Siap Terbit?",
    finalCtaDescription:
      "Kirim detail naskah Anda. Kami bantu hitung estimasi paling efisien sesuai jumlah, spesifikasi, dan target deadline.",
    longGuide: [
      {
        title: "Mengapa Memilih Cetak Buku Profesional Lebih Baik daripada Sendiri",
        description:
          "Meskipun ada opsi cetak sendiri, menggunakan jasa cetak profesional membantu menjaga hasil cetak tetap konsisten dan berkualitas. Proses produksi yang lebih stabil juga mengurangi risiko hasil bercak, potongan tidak presisi, atau warna yang tidak merata."
      },
      {
        title: "Memilih Tipe Jilid yang Tepat untuk Buku Anda",
        description:
          "Untuk buku tebal, jilid lem panas atau jahit benang biasanya lebih cocok. Untuk buku tipis, opsi saddle stitch atau spiral bisa lebih ekonomis dan fungsional. Rekomendasi terbaik tetap mengikuti jenis buku, frekuensi pemakaian, dan target kualitas yang Anda inginkan."
      }
    ]
  };
}
