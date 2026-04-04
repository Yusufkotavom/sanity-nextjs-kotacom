import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export function buildPercetakanCetakBukuPageCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Jasa Cetak Buku Surabaya Profesional",
    secondaryKeywords: [
      "Cetak buku murah Surabaya",
      "Percetakan buku untuk pemula",
      "Jasa cetak buku tanpa ribet",
      "Cetak bokus Surabaya cepat",
      "Percetakan buku berkualitas",
      "Jasa cetak buku online Surabaya"
    ],
    description:
      "Layanan cetak buku Surabaya untuk penulis, sekolah, komunitas, dan produsen konten yang butuh hasil cetak berkualitas dengan proses yang mudah dipahami. Kami menangani segala hal mulai dari pengecekan file hingga pengiriman ke seluruh Indonesia.",
    intro:
      "Punya naskah siap dicetak tapi bingung mulai dari mana? Kami bantu Anda cetak buku dengan proses yang sederhana: mulai dari konsultasi spesifikasi, pengecekan file, produksi, hingga pengiriman. Tidak perlu lagi mikir teknis cetak, kami yang akanuruskan bagian teknisnya.",
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
          "Bisa! Kami menyediakan layanan proof cetak untuk 1-2 buah buku dengan biaya produksi normal. Ini Cocok untuk memastikan hasil cetak sesuai ekspektasi sebelum melakukan order jumlah besar."
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
          "Meskipun ada opsi cetak sendiri, menggunakan jasa cetak profesional seperti kami menjamin hasil cetak yang konsisten dan berkualitas. Kami memiliki mesin cetak profesional yang terawat secara rutin, sehingga hasil cetak tidak bercak atau bersyarap yang sering terjadi pada printer biasa."
      },
      {
        title: "Memilih Tipe Jilid yang Tepat untuk Buku Anda",
        description:
          "Untuk buku tebal (di atas 50 halaman), jilid lem panas atau jahit benang lebih cocok. Untuk buku tipis (di bawah 50 halaman), opsi saddle stitch atau spirale lebih ekonomis dan fungsional. Konsultasikan dengan kami untuk rekomendasi sesuai jenis buku Anda."
      }
    ]
  };
}