import { DEFAULT_CTA } from "./constants";
import type { LegacyRewriteCopy } from "./types";

export const PRINTING_PRIORITY_OVERRIDES: Record<string, Partial<LegacyRewriteCopy>> = {
  percetakan: {
    intro:
      "Layanan percetakan ini difokuskan untuk bisnis yang membutuhkan hasil cetak rapi, timeline produksi jelas, dan quality control yang konsisten agar materi promosi maupun operasional siap dipakai tanpa banyak revisi.",
    ctaLabel: "Konsultasi Produksi Cetak",
    finalCtaTitle: "Butuh Mitra Percetakan yang Cepat dan Konsisten?",
    finalCtaDescription:
      "Kirim spesifikasi cetak Anda, dan kami bantu susun skema produksi paling efisien sesuai deadline campaign.",
    faqs: [
      {
        question: "Bagaimana memastikan hasil cetak sesuai ekspektasi brand?",
        answer:
          "Kami gunakan tahap pre-press checking dan quality control agar warna, ukuran, dan finishing lebih presisi.",
      },
      {
        question: "Apakah layanan cocok untuk kebutuhan rutin bulanan?",
        answer:
          "Ya. Kami dapat menyiapkan skema produksi berkala untuk kebutuhan promosi atau operasional bisnis.",
      },
    ],
  },
  "cetak-buku": {
    primaryKeyword: "Jasa Cetak Buku Surabaya Profesional",
    secondaryKeywords: [
      "Jasa cetak buku Surabaya",
      "Cetak buku premium dan katalog",
      "Percetakan buku untuk penulis dan sekolah",
      "Print on demand buku",
      "Cetak majalah dan buku tahunan",
    ],
    description:
      "Jasa cetak buku Surabaya untuk penulis, sekolah, komunitas, dan perusahaan dengan opsi produksi satuan hingga massal untuk novel, katalog, majalah, buku tahunan, dan buku premium.",
    intro:
      "Untuk halaman cetak buku, kami menyesuaikan copy agar menjawab intent penulis dan institusi: pilihan metode cetak, efisiensi biaya per volume, serta kepastian kualitas hasil akhir. Setelah dibandingkan dengan live site, halaman ini juga kami perluas untuk menangkap kebutuhan katalog, majalah, buku tahunan, dan buku premium.",
    ctaLabel: "Minta Simulasi Cetak Buku",
    ctaLinks: [
      { label: "Konsultasi Cetak Buku", href: DEFAULT_CTA },
      { label: "Lihat Layanan Percetakan", href: "/percetakan" },
      { label: "Bandingkan dengan Cetak Company Profile", href: "/percetakan/cetak-company-profile" },
      { label: "Baca FAQ Cetak Buku", href: "#faq" },
    ],
    finalCtaTitle: "Cetak Buku dengan Spesifikasi Tepat Sejak Awal",
    finalCtaDescription:
      "Diskusikan naskah, jumlah, dan target distribusi Anda. Kami bantu pilih metode produksi paling efisien.",
    faqs: [
      {
        question: "Kapan sebaiknya memilih POD dan kapan offset?",
        answer:
          "POD cocok untuk uji pasar/jumlah kecil, sedangkan offset lebih hemat untuk volume besar dengan spesifikasi stabil.",
      },
      {
        question: "Bisakah saya konsultasi spesifikasi sebelum kirim file final?",
        answer:
          "Bisa. Kami bantu validasi ukuran, kertas, jilid, dan finishing agar proses produksi lebih aman.",
      },
      {
        question: "Apakah bisa mencetak katalog, majalah, atau buku tahunan dengan standar premium?",
        answer:
          "Bisa. Kami dapat menyesuaikan spesifikasi kertas, akurasi warna, jenis jilid, dan finishing agar hasil akhir cocok untuk kebutuhan presentasi brand maupun distribusi institusi.",
      },
    ],
  },
  "cetak-brosur": {
    intro:
      "Brosur efektif saat pesan inti langsung terbaca dan visualnya konsisten dengan brand. Karena itu copy halaman ini menekankan tujuan campaign, segmentasi audiens, dan kesiapan distribusi.",
    ctaLabel: "Diskusikan Brosur Campaign",
    finalCtaTitle: "Buat Brosur yang Benar-Benar Menggerakkan Aksi",
    finalCtaDescription:
      "Kami bantu menentukan format, material, dan pesan utama agar brosur Anda lebih kuat untuk promosi.",
    faqs: [
      {
        question: "Ukuran brosur apa yang paling cocok untuk campaign offline?",
        answer:
          "Tergantung distribusi dan volume informasi. Kami bantu pilih format paling efektif untuk konteks campaign Anda.",
      },
      {
        question: "Apakah bisa cetak brosur untuk kebutuhan rutin promo bulanan?",
        answer:
          "Bisa. Kami dapat menyiapkan ritme produksi berkala agar materi promosi selalu siap tepat waktu.",
      },
    ],
  },
  "cetak-company-profile": {
    intro:
      "Halaman ini difokuskan untuk intent B2B: materi company profile yang rapi, kredibel, dan siap dipakai untuk presentasi klien, partnership, maupun tender.",
    ctaLabel: "Cetak Company Profile Saya",
    finalCtaTitle: "Perkuat Presentasi Bisnis dengan Company Profile Berkualitas",
    finalCtaDescription:
      "Kami bantu menyusun spesifikasi cetak company profile agar pesan brand tampil profesional dan meyakinkan.",
    faqs: [
      {
        question: "Apakah company profile cocok untuk kebutuhan tender?",
        answer:
          "Ya. Materi ini efektif menampilkan kapabilitas, portofolio, dan value perusahaan secara terstruktur.",
      },
      {
        question: "Bisakah menyesuaikan finishing agar terlihat premium?",
        answer:
          "Bisa. Kami sediakan opsi material dan finishing untuk menyesuaikan kesan brand yang ingin ditampilkan.",
      },
    ],
  },
  "cetak-kemasan-product": {
    intro:
      "Untuk kemasan produk, intent user biasanya terkait daya tarik rak dan kekuatan identitas brand. Copy kami menekankan ketepatan ukuran, kualitas cetak, dan kesiapan untuk distribusi.",
    ctaLabel: "Konsultasi Kemasan Produk",
    finalCtaTitle: "Kemasan Produk yang Siap Jual dan Konsisten dengan Brand",
    finalCtaDescription:
      "Diskusikan tipe produk, dimensi, dan target pasar Anda agar kemasan yang dicetak mendukung konversi penjualan.",
    faqs: [
      {
        question: "Apakah bisa cetak kemasan dalam jumlah kecil untuk trial pasar?",
        answer:
          "Bisa. Kami dapat menyesuaikan skema produksi awal sebelum masuk volume lebih besar.",
      },
      {
        question: "Bagaimana memastikan kemasan cocok dengan karakter produk?",
        answer:
          "Kami bantu menentukan material, struktur box/label, dan finishing berdasarkan kebutuhan proteksi dan branding.",
      },
    ],
  },
  "cetak-kartu-nama": {
    intro:
      "Kartu nama masih relevan untuk sales meeting, networking, dan event B2B. Halaman ini dipoles untuk intent profesional: kesan pertama yang kuat, rapi, dan konsisten dengan identitas bisnis.",
    ctaLabel: "Pesan Kartu Nama Sekarang",
    finalCtaTitle: "Kartu Nama Profesional untuk Kesan Pertama yang Kuat",
    finalCtaDescription:
      "Pilih material dan finishing yang tepat agar kartu nama Anda lebih representatif saat bertemu calon klien.",
    faqs: [
      {
        question: "Material kartu nama apa yang paling sering dipilih bisnis?",
        answer:
          "Umumnya art carton dengan laminasi doff/gloss, lalu ditingkatkan dengan spot UV atau emboss untuk kesan premium.",
      },
      {
        question: "Apakah bisa cetak kartu nama tim dalam satu batch?",
        answer:
          "Bisa. Kami dapat menyiapkan produksi multi-nama agar konsisten secara desain dan efisien secara proses.",
      },
    ],
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
  "cetak-album-pernikahan": {
    intro:
      "Intent utama halaman ini adalah menjaga momen spesial tetap premium. Karena itu copy difokuskan pada ketajaman visual, pilihan material eksklusif, dan detail finishing agar hasil album benar-benar berkesan.",
    ctaLabel: "Konsultasi Album Pernikahan",
    finalCtaTitle: "Wujudkan Album Pernikahan yang Elegan dan Tahan Lama",
    finalCtaDescription:
      "Diskusikan konsep album Anda, lalu kami bantu pilih material dan finishing yang paling sesuai untuk hasil akhir premium.",
    faqs: [
      {
        question: "Finishing apa yang populer untuk album pernikahan premium?",
        answer:
          "Umumnya hard cover premium dengan laminasi doff/gloss dan opsi emboss atau spot UV untuk meningkatkan kesan eksklusif.",
      },
      {
        question: "Apakah bisa cetak album dalam jumlah terbatas untuk keluarga inti?",
        answer:
          "Bisa. Kami dapat menyesuaikan kuantitas produksi dari jumlah kecil hingga batch tambahan sesuai kebutuhan.",
      },
    ],
  },
  "cetak-banner-spanduk": {
    intro:
      "Halaman banner-spanduk kami perkuat untuk intent campaign cepat: bisnis membutuhkan media promosi yang terbaca jelas, siap tayang, dan diproduksi sesuai timeline aktivitas marketing.",
    ctaLabel: "Pesan Banner Spanduk",
    finalCtaTitle: "Siap Jalankan Campaign dengan Materi Outdoor yang Menonjol?",
    finalCtaDescription:
      "Kami bantu memilih ukuran, material, dan ketahanan media agar banner-spanduk Anda efektif untuk kebutuhan promosi.",
    faqs: [
      {
        question: "Bagaimana menentukan ukuran banner yang efektif untuk lokasi tertentu?",
        answer:
          "Ukuran ditentukan dari jarak baca, area pemasangan, dan tujuan pesan. Kami bantu rekomendasikan ukuran yang paling relevan sebelum produksi.",
      },
      {
        question: "Apakah tersedia opsi produksi cepat untuk kebutuhan event mendadak?",
        answer:
          "Tersedia untuk kondisi tertentu, dengan estimasi mengikuti jenis material, volume, dan antrean produksi saat itu.",
      },
    ],
  },
  "cetak-kaos": {
    intro:
      "Copy halaman cetak kaos difokuskan pada intent branding: bisnis dan komunitas butuh merchandise yang nyaman dipakai, visual konsisten, dan siap untuk event atau kampanye promosi.",
    ctaLabel: "Konsultasi Cetak Kaos",
    finalCtaTitle: "Butuh Merchandise Kaos yang Siap Pakai dan Konsisten Brand?",
    finalCtaDescription:
      "Kami bantu menentukan bahan, teknik cetak, dan skema produksi agar kaos promosi Anda lebih efektif untuk branding.",
    faqs: [
      {
        question: "Teknik cetak kaos apa yang cocok untuk produksi event?",
        answer:
          "Tergantung desain, jumlah, dan target pemakaian. Kami bantu memilih teknik yang seimbang antara kualitas visual, kenyamanan, dan efisiensi biaya.",
      },
      {
        question: "Apakah bisa produksi ukuran campuran dalam satu batch?",
        answer:
          "Bisa. Kami dapat mengatur komposisi size sesuai kebutuhan tim, komunitas, atau peserta event.",
      },
    ],
  },
  "cetak-stiker": {
    intro:
      "Halaman ini dipoles untuk intent produk dan promosi: user butuh stiker yang kuat secara visual, rapi saat ditempel, dan mudah diproduksi dengan varian ukuran yang fleksibel.",
    ctaLabel: "Pesan Cetak Stiker",
    finalCtaTitle: "Ingin Stiker Produk yang Lebih Menonjol di Rak?",
    finalCtaDescription:
      "Kami bantu menentukan material, laminasi, dan cutting agar stiker Anda mendukung branding sekaligus fungsi label produk.",
    faqs: [
      {
        question: "Apa bedanya stiker untuk label produk dan stiker promosi?",
        answer:
          "Label produk lebih fokus pada ketahanan dan informasi, sedangkan stiker promosi fokus pada visual campaign. Material dan laminasinya biasanya berbeda.",
      },
      {
        question: "Apakah bisa cetak stiker dengan bentuk potong custom?",
        answer:
          "Bisa. Kami melayani cutting custom sesuai bentuk desain agar hasil akhir lebih presisi dan siap aplikasikan.",
      },
    ],
  },
  "cetak-undangan": {
    intro:
      "Untuk undangan, intent utama pengunjung adalah hasil yang berkesan namun tetap tepat waktu. Copy kami menekankan pemilihan material, detail finishing, dan kontrol timeline produksi.",
    ctaLabel: "Konsultasi Cetak Undangan",
    finalCtaTitle: "Siapkan Undangan Acara dengan Tampilan yang Lebih Berkelas",
    finalCtaDescription:
      "Diskusikan konsep acara Anda, lalu kami bantu pilih opsi cetak undangan yang paling sesuai dengan karakter acara.",
    faqs: [
      {
        question: "Apakah bisa pilih beberapa opsi kertas sebelum final produksi?",
        answer:
          "Bisa. Kami bantu membandingkan opsi material agar hasil undangan sesuai ekspektasi visual dan budget acara.",
      },
      {
        question: "Bagaimana memastikan undangan selesai sebelum tanggal acara?",
        answer:
          "Kami susun estimasi produksi berdasarkan volume dan finishing, lalu menetapkan buffer waktu agar distribusi tetap aman.",
      },
    ],
  },
  "cetak-yasin": {
    intro:
      "Halaman cetak yasin difokuskan pada intent keluarga dan penyelenggara acara: hasil cetak harus rapi, mudah dibaca, dan selesai sesuai jadwal kegiatan.",
    ctaLabel: "Pesan Cetak Yasin",
    finalCtaTitle: "Butuh Cetak Yasin Rapi dengan Proses yang Lebih Tenang?",
    finalCtaDescription:
      "Kami bantu menyiapkan produksi buku yasin dengan detail spesifikasi jelas agar hasil akhir siap digunakan tepat waktu.",
    faqs: [
      {
        question: "Apakah tersedia pilihan desain cover untuk cetak yasin?",
        answer:
          "Tersedia. Kami dapat menyesuaikan desain cover dan format isi berdasarkan kebutuhan acara dan preferensi keluarga.",
      },
      {
        question: "Bisa produksi cepat untuk kebutuhan mendesak?",
        answer:
          "Bisa untuk kondisi tertentu, dengan estimasi menyesuaikan jumlah buku, kompleksitas finishing, dan antrean produksi.",
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
