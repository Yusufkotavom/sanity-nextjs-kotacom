import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export function buildPercetakanCetakBukuPageCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Jasa Cetak Buku Surabaya Profesional",
    secondaryKeywords: [
      "Cetak buku Surabaya",
      "Percetakan buku untuk penulis dan institusi",
      "Print on demand buku",
      "Cetak buku satuan dan massal",
      "Percetakan buku berkualitas",
      "Jasa cetak buku online Surabaya",
      "Cetak katalog dan buku tahunan",
    ],
    description:
      "Layanan cetak buku Surabaya untuk penulis, sekolah, komunitas, dan perusahaan yang membutuhkan hasil cetak rapi, pilihan metode produksi yang jelas, dan proses yang lebih mudah dipahami dari awal.",
    intro:
      "Punya naskah atau materi siap dicetak tapi belum yakin harus mulai dari mana? Kami bantu menyiapkan proses cetak buku dari konsultasi spesifikasi, pengecekan file, pemilihan metode produksi, hingga pengiriman agar hasilnya sesuai kebutuhan dan target distribusi Anda.",
    highlights: [
      "Pilihan POD maupun offset dapat disesuaikan dengan jumlah dan target penggunaan.",
      "Pengecekan file dilakukan sebelum produksi untuk menekan risiko revisi.",
      "Pilihan kertas, jilid, dan finishing bisa disesuaikan dengan budget dan kualitas yang diinginkan.",
      "Cocok untuk novel, buku profil, katalog, majalah, dan buku tahunan.",
      "Pengiriman bisa disiapkan untuk Surabaya maupun luar kota.",
      "Konsultasi awal membantu menentukan spesifikasi yang paling efisien."
    ],
    process: [
      "Kirim detail buku seperti ukuran, jumlah halaman, kuantitas, dan target deadline.",
      "Kami cek file desain dan bantu arahkan spesifikasi yang paling sesuai.",
      "Metode produksi dipilih berdasarkan jumlah, budget, dan target distribusi.",
      "Buku diproduksi lalu dicek kualitasnya sebelum dikirim.",
      "Pesanan dikemas dengan aman untuk menjaga hasil cetak tetap rapi saat sampai."
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
          "Bisa. Kami dapat memberi panduan desain cover sederhana atau membantu mengarahkan kebutuhan desain sebelum file masuk ke tahap produksi."
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
      },
      {
        question: "Apakah layanan ini hanya untuk buku satuan?",
        answer:
          "Tidak. Kami melayani cetak buku satuan untuk kebutuhan proof atau jumlah kecil, sekaligus produksi massal untuk distribusi yang lebih luas."
      }
    ],
    ctaLabel: "Konsultasi Cetak Buku Sekarang",
    ctaHref: DEFAULT_CTA,
    ctaLinks: [
      { label: "Konsultasi Cetak Buku", href: DEFAULT_CTA },
      { label: "Minta Simulasi POD vs Offset", href: DEFAULT_CTA },
      { label: "Lihat FAQ Cetak Buku", href: "#faq" },
      { label: "Bandingkan dengan Cetak Company Profile", href: "/percetakan/cetak-company-profile" }
    ],
    finalCtaTitle: "Punya Naskah dan Siap Terbit?",
    finalCtaDescription:
      "Kirim detail naskah Anda. Kami bantu hitung estimasi paling efisien sesuai jumlah, spesifikasi, dan target deadline.",
    testimonials: [
      {
        name: "Dimas A.",
        role: "Penulis Indie",
        quote: "Layanan Print on Demand-nya sangat membantu penulis pemula. Kertas paperbook-nya nyaman dibaca dan lemnya kuat tidak gampang rontok."
      },
      {
        name: "Bu Sari",
        role: "Kepala Instansi Pendidikan",
        quote: "Kami cetak ratusan eksemplar modul siswa. Pengerjaan cepat dan seluruh isi konsisten tidak ada halaman yang terbalik."
      }
    ],
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
