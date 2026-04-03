import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export function buildPercetakanCetakBukuPageCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Jasa Cetak Buku Surabaya Profesional",
    secondaryKeywords: [
      "Cetak buku satuan dan massal",
      "Percetakan buku untuk penulis",
      "Cetak buku untuk lembaga dan sekolah",
      "Print on demand buku",
      "Jasa cetak buku cepat dan rapi",
      "Cetak buku premium Surabaya",
      "Cetak majalah katalog buku tahunan",
    ],
    description:
      "Jasa cetak buku Surabaya untuk penulis, sekolah, komunitas, dan perusahaan dengan opsi produksi satuan hingga massal untuk novel, katalog, majalah, buku tahunan, dan buku premium.",
    intro:
      "Kami menangani cetak buku dari kebutuhan penulis indie sampai lembaga pendidikan dan perusahaan. Anda bisa mulai dari jumlah kecil (POD) atau produksi skala besar, dengan pendampingan teknis agar hasil akhir tetap rapi, presisi, dan sesuai tujuan terbit. Coverage ini juga kami extend untuk menangkap intent katalog, majalah, buku tahunan, dan kebutuhan buku premium.",
    highlights: [
      "Melayani POD (print on demand) hingga volume besar.",
      "Pilihan kertas, jilid, dan finishing sesuai karakter buku.",
      "Tim bantu review file agar aman masuk produksi.",
      "Opsi pengiriman ke seluruh Indonesia.",
    ],
    process: [
      "Diskusi spesifikasi buku: ukuran, jumlah halaman, kertas isi, cover, dan jilid.",
      "Cek file final: margin, bleed, resolusi, dan kesiapan layout cetak.",
      "Produksi + quality control untuk memastikan hasil sesuai spesifikasi.",
      "Packing aman dan pengiriman ke alamat tujuan.",
    ],
    faqs: [
      {
        question: "Berapa minimal order untuk cetak buku?",
        answer:
          "Kami melayani cetak satuan (POD) maupun produksi jumlah besar. Anda bisa mulai sesuai kebutuhan.",
      },
      {
        question: "Apakah bisa bantu jika saya belum punya desain cover?",
        answer:
          "Bisa. Kami dapat bantu arahan format cover dan kebutuhan teknis agar file siap cetak.",
      },
      {
        question: "Format file apa yang paling aman untuk dikirim?",
        answer:
          "Format PDF siap cetak adalah yang paling aman. Pastikan ukuran final, bleed, dan resolusi gambar sudah sesuai.",
      },
      {
        question: "Apakah melayani pengiriman luar kota?",
        answer:
          "Ya. Kami melayani pengiriman ke seluruh Indonesia dengan opsi ekspedisi yang disepakati.",
      },
      {
        question: "Berapa lama proses produksi cetak buku?",
        answer:
          "Durasi produksi mengikuti jumlah halaman, spesifikasi, dan kuantitas. Estimasi detail kami berikan setelah data final diterima.",
      },
      {
        question: "Apakah bisa bantu pengurusan ISBN?",
        answer:
          "Untuk kebutuhan ISBN, kami dapat memberikan arahan alur persiapan dokumen dan format buku yang umumnya diperlukan.",
      },
      {
        question: "Apa beda bookpaper dan HVS untuk isi buku?",
        answer:
          "Bookpaper lebih nyaman untuk membaca durasi panjang karena warna krem dan bobotnya ringan, sedangkan HVS lebih putih dan cocok untuk buku kerja atau dokumen formal.",
      },
      {
        question: "Bagaimana jika ada kesalahan hasil cetak?",
        answer:
          "Jika kesalahan berasal dari proses produksi kami, akan ada evaluasi QC dan tindak lanjut perbaikan sesuai kesepakatan.",
      },
    ],
    serviceTypes: [
      {
        title: "Novel & Buku Nonfiksi",
        description:
          "Cetak untuk penulis independen, penerbit mini, dan komunitas literasi.",
      },
      {
        title: "Buku Pendidikan",
        description:
          "Cetak modul, buku ajar, LKS, dan buku pelatihan untuk sekolah/lembaga.",
      },
      {
        title: "Booklet & Company Profile",
        description:
          "Materi cetak informatif untuk kebutuhan presentasi brand dan institusi.",
      },
      {
        title: "Buku Event & Kenangan",
        description:
          "Buku tahunan, photobook, dan dokumentasi acara dengan finishing personal.",
      },
      {
        title: "Majalah & Katalog Produk",
        description:
          "Produksi materi visual yang menuntut konsistensi warna dan finishing rapi untuk promosi maupun presentasi brand.",
      },
    ],
    pricingPlans: [
      {
        name: "POD",
        price: "Mulai 45rb",
        description: "Cocok untuk sample, proof, atau kebutuhan cetak buku satuan.",
        items: ["Cetak 1-20 buku", "Waktu produksi fleksibel", "Cocok untuk validasi naskah"],
      },
      {
        name: "Bulk",
        price: "Mulai 25rb/buku",
        description:
          "Untuk kebutuhan sekolah, komunitas, atau perusahaan dengan kuantitas menengah.",
        items: [
          "Efisiensi biaya per buku",
          "Opsi kertas/jilid lebih variatif",
          "Quality control batch",
        ],
        recommended: true,
      },
      {
        name: "Enterprise",
        price: "Custom Quotation",
        description:
          "Untuk produksi skala besar dan kebutuhan distribusi multi-lokasi.",
        items: [
          "Rencana produksi bertahap",
          "Spesifikasi custom",
          "Koordinasi jadwal kirim",
        ],
      },
    ],
    longGuide: [
      {
        title: "Mengapa Buku Fisik Tetap Penting di Era Digital",
        description:
          "Dari ratusan konten `jasa-cetak-buku-*`, pola paling kuat adalah nilai emosional dan kredibilitas buku fisik. Buku cetak memberi pengalaman nyata, lebih mudah dipresentasikan ke klien/lembaga, dan memperkuat positioning penulis maupun brand sebagai pihak yang serius pada kualitas konten.",
      },
      {
        title: "Memilih Metode Cetak: Digital (POD) vs Offset",
        description:
          "Cetak digital cocok untuk jumlah kecil, kebutuhan cepat, atau validasi pasar awal. Offset lebih optimal untuk volume tinggi karena biaya per buku turun signifikan ketika jumlah naik. Kami menyarankan metode berdasarkan target distribusi, timeline, dan efisiensi biaya total proyek.",
      },
      {
        title: "Memahami Opsi Jilid agar Buku Tahan Lama",
        description:
          "Untuk buku softcover umum, lem panas adalah opsi paling populer. Untuk daya tahan lebih tinggi, jilid jahit benang lebih kuat dan nyaman dibuka. Untuk booklet tipis, saddle stitch lebih ekonomis. Pemilihan jilid sebaiknya disesuaikan dengan ketebalan buku dan intensitas pemakaian.",
      },
      {
        title: "Panduan Praktis Memilih Kertas",
        description:
          "HVS cocok untuk buku kerja/edukasi, bookpaper ideal untuk novel atau bacaan panjang, art paper/matte untuk konten visual berwarna, dan art carton umum dipakai untuk cover. Pemilihan gramasi memengaruhi kenyamanan baca, kesan premium, serta ongkos produksi dan pengiriman.",
      },
      {
        title: "Jenis Buku yang Umum Dicetak untuk Bisnis dan Institusi",
        description:
          "Selain novel dan buku ajar, permintaan tinggi juga datang dari katalog, majalah internal, buku tahunan sekolah, booklet event, dan company profile. Masing-masing membutuhkan pendekatan layout, kertas, dan finishing yang berbeda agar hasil akhirnya tepat guna.",
      },
      {
        title: "Menjaga Kualitas Buku Premium pada Produksi Menengah hingga Besar",
        description:
          "Untuk buku premium, faktor pentingnya bukan hanya kualitas cetak isi, tetapi juga konsistensi cover, akurasi trimming, kekuatan jilid, dan cara packing saat distribusi. Kontrol detail ini menjadi pembeda antara buku yang hanya selesai dicetak dan buku yang benar-benar siap dipresentasikan ke pasar.",
      },
      {
        title: "Checklist Sebelum File Naik Produksi",
        description:
          "Pastikan ukuran final, bleed, margin aman, resolusi gambar, dan konsistensi font sudah benar. Untuk isi buku, gunakan PDF siap cetak. Checklist ini sangat krusial untuk menurunkan risiko revisi dan mencegah keterlambatan saat proses produksi.",
      },
    ],
    finalCtaTitle: "Punya Naskah dan Siap Terbit?",
    finalCtaDescription:
      "Kirim detail naskah Anda. Kami bantu hitung estimasi paling efisien sesuai jumlah, spesifikasi, dan target deadline.",
    ctaLabel: "Minta Penawaran Cetak Buku",
    ctaHref: DEFAULT_CTA,
    ctaLinks: [
      { label: "Hubungi Kami Sekarang", href: DEFAULT_CTA },
      { label: "Tanya di Sini", href: DEFAULT_CTA },
      { label: "Minta Penawaran Akurat di Sini", href: DEFAULT_CTA },
      { label: "Chat & Cetak Sekarang", href: DEFAULT_CTA },
    ],
  };
}
