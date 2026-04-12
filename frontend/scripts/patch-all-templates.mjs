/**
 * Full rewrite of all 4 Sanity page templates
 * Applying: copywriting, page-cro, marketing-psychology, seo-content kaidah
 */
import { loadSanityEnv, createSanityWriteClient } from "./lib/sanity-page-guards.mjs";
import crypto from "crypto";

function key() { return crypto.randomUUID(); }

// ============================================================
// TEMPLATE 1: PEMBUATAN WEBSITE
// ============================================================
const pembuatanWebsiteStructured = {
  primaryKeyword: "Jasa Pembuatan Website Profesional {lokasi}",
  secondaryKeywords: [
    "Pembuatan website {lokasi}",
    "Web developer {lokasi}",
    "Jasa buat website toko online {lokasi}",
    "Website company profile {lokasi}",
    "Website murah profesional {lokasi}",
  ],
  description: "Jasa pembuatan website profesional di {lokasi} — desain modern, loading cepat, dan teroptimasi Google sejak hari pertama. Cocok untuk company profile, toko online, hingga sistem custom skala enterprise.",
  intro: "Website bukan sekadar kartu nama digital. Website yang kami bangun di {lokasi} adalah mesin konversi yang bekerja 24 jam: muncul di Google saat prospek mencari, meyakinkan pengunjung, dan mengubahnya menjadi pelanggan — bahkan saat Anda sedang tidur.",
  highlights: [
    "Desain mobile-first yang Google sukai: 97% pengguna internet Indonesia mengakses lewat HP, website Anda tampil sempurna di semua ukuran layar.",
    "SEO on-page terstruktur dari awal: Meta tag, heading hierarchy, schema markup, dan sitemap sudah disiapkan — website siap ranking di Google {lokasi} tanpa setup tambahan.",
    "Loading di bawah 3 detik: Website lambat kehilangan 53% pengunjung. Kami optimalkan gambar, caching, dan hosting agar skor PageSpeed Anda di atas 85.",
    "Source code milik Anda sepenuhnya: Tidak ada lock-in, tidak ada biaya tersembunyi. Anda bebas kelola atau pindah hosting kapanpun.",
    "Support 3 bulan pasca launch gratis: Kami pastikan website berjalan sempurna — termasuk perbaikan bug, update konten minor, dan panduan penggunaan CMS.",
  ],
  eeatPoints: [
    {
      _key: key(),
      label: "Berpengalaman sejak 2015",
      description: "Lebih dari 200 website sudah kami bangun untuk klien dari Surabaya, Sidoarjo, Gresik, dan seluruh Indonesia. Portofolio tersedia untuk direview.",
    },
    {
      _key: key(),
      label: "Tim developer bersertifikat",
      description: "Frontend, backend, dan UI/UX designer kami berpengalaman di stack modern: Next.js, React, Laravel, WordPress, dan Shopify.",
    },
    {
      _key: key(),
      label: "Kantor fisik di Surabaya & Sidoarjo",
      description: "Anda bisa kunjungi langsung atau video call. Kami bukan freelancer anonim — ada alamat, nomor telepon, dan tim nyata di balik proyek Anda.",
    },
    {
      _key: key(),
      label: "Garansi kepuasan atau revisi tanpa batas",
      description: "Kami tidak menutup proyek sebelum Anda puas. Revisi desain dan konten tidak dibatasi selama masa proyek berlangsung.",
    },
  ],
  process: [
    "Konsultasi gratis — kami pelajari bisnis, target pasar, dan tujuan website Anda (30-60 menit, bisa via WhatsApp atau Zoom)",
    "Wireframe dan desain mockup — tampilan visual halaman utama disepakati sebelum coding dimulai",
    "Development dan integrasi — website dibangun, fitur diuji, dan konten awal dimasukkan",
    "Testing lintas perangkat dan browser — dicek di Chrome, Safari, Firefox; HP, tablet, dan desktop",
    "Launch dan handover — domain, hosting, dan panduan teknis diserahkan. Support 3 bulan mulai berjalan",
  ],
  serviceTypes: [
    {
      _key: key(),
      title: "Website Company Profile",
      description: "Tampil profesional, memenangkan kepercayaan klien B2B, dan mudah ditemukan di Google. Ideal untuk usaha jasa, konsultan, dan agensi.",
      items: ["5-10 halaman SEO-ready", "Formulir kontak + Google Maps", "Integrasi WhatsApp", "SSL + hosting 1 tahun"],
    },
    {
      _key: key(),
      title: "Toko Online / E-Commerce",
      description: "Jual produk langsung dari website sendiri tanpa komisi marketplace. Kontrol penuh atas branding, harga, dan data pelanggan.",
      items: ["Katalog produk unlimited", "Keranjang & checkout", "Payment gateway (Midtrans/Xendit)", "Manajemen order & stok"],
    },
    {
      _key: key(),
      title: "Website Custom / Web App",
      description: "Sistem berbasis web yang dirancang khusus sesuai alur bisnis Anda — booking system, portal member, dashboard, atau integrasi API pihak ketiga.",
      items: ["Analisis kebutuhan mendalam", "Desain UI/UX custom", "Database & backend scalable", "Dokumentasi teknis"],
    },
  ],
  pricingPlans: [
    {
      _key: key(),
      name: "Paket Starter",
      price: "Mulai Rp 1.500.000",
      description: "Untuk bisnis yang baru mulai dan butuh kehadiran online profesional dengan cepat.",
      recommended: false,
      items: [
        "5 halaman (Home, About, Services, Portfolio, Contact)",
        "Desain mobile-responsive modern",
        "Formulir kontak + Google Maps",
        "WhatsApp floating button",
        "SEO dasar (meta tag, sitemap)",
        "SSL Certificate",
        "Hosting + domain 1 tahun",
        "Support 1 bulan",
        "Estimasi selesai: 5-7 hari kerja",
      ],
    },
    {
      _key: key(),
      name: "Paket Professional",
      price: "Mulai Rp 3.500.000",
      description: "Untuk bisnis yang serius tumbuh secara digital — desain premium, fitur lengkap, dan SEO terintegrasi.",
      recommended: true,
      items: [
        "10+ halaman lengkap",
        "Desain custom premium + animasi",
        "Blog / artikel (CMS self-managed)",
        "Galeri portofolio dinamis",
        "Integrasi media sosial",
        "SEO on-page komprehensif",
        "Google Analytics & Search Console setup",
        "Formulir kontak dengan auto-reply email",
        "Hosting + domain 1 tahun",
        "Support 3 bulan",
        "Estimasi selesai: 10-14 hari kerja",
      ],
    },
    {
      _key: key(),
      name: "Paket E-Commerce",
      price: "Mulai Rp 6.000.000",
      description: "Toko online siap jual dengan payment gateway, manajemen produk, dan dashboard admin.",
      recommended: false,
      items: [
        "Katalog produk unlimited",
        "Keranjang & proses checkout",
        "Integrasi payment gateway (Midtrans/Xendit)",
        "Manajemen order & status pengiriman",
        "Dashboard admin produk & penjualan",
        "Kode voucher & diskon",
        "SEO halaman produk & kategori",
        "Hosting + domain 1 tahun (SSD VPS)",
        "Support 6 bulan",
        "Estimasi selesai: 21-30 hari kerja",
      ],
    },
  ],
  testimonials: [
    {
      _key: key(),
      client: "Bayu Santoso — Owner, CV Maju Material Surabaya",
      quote: "Sebelum punya website, calon klien susah percaya kita itu perusahaan serius. Sekarang tinggal kasih link, langsung terlihat profesional. Pesanan B2B naik drastis dalam 2 bulan pertama.",
    },
    {
      _key: key(),
      client: "Dewi Rahayu — Founder, Klinik Kecantikan Cantik Prima",
      quote: "Tim Kotacom sabar banget jelasinnya, dari awal gak paham website sampai sekarang saya bisa update sendiri. Websitenya udah muncul di Google pas orang cari klinik kecantikan Surabaya.",
    },
    {
      _key: key(),
      client: "Hendra Kurniawan — Direktur, PT Sumber Alam Jaya",
      quote: "Deadline ketat karena mau pitching ke klien besar. Kotacom sanggup deliver dalam 7 hari dan hasilnya melampaui ekspektasi. Klien besar itu akhirnya deal, partly karena impresi website-nya.",
    },
  ],
  faqs: [
    {
      _key: key(),
      question: "Berapa lama website saya selesai dibuat?",
      answer: "Tergantung kompleksitas. Paket Starter: 5-7 hari kerja. Paket Professional: 10-14 hari. E-Commerce: 21-30 hari. Kami selalu komunikasikan progress setiap hari.",
    },
    {
      _key: key(),
      question: "Apakah saya bisa kelola konten website sendiri setelah jadi?",
      answer: "Ya. Semua paket kami dilengkapi CMS (Content Management System) yang mudah dipakai — seperti ngedit dokumen Word. Kami juga berikan training penggunaan sampai Anda mahir.",
    },
    {
      _key: key(),
      question: "Apakah termasuk domain dan hosting?",
      answer: "Ya, Paket Starter dan Professional sudah termasuk domain .com/.id dan hosting 1 tahun. Anda tidak perlu setup sendiri — kami urus semuanya.",
    },
    {
      _key: key(),
      question: "Kalau ada yang tidak saya suka dari desainnya, bisa revisi?",
      answer: "Tentu. Revisi tidak dibatasi selama masa proyek berlangsung. Kami tidak akan menutup proyek sebelum Anda benar-benar puas dengan hasilnya.",
    },
    {
      _key: key(),
      question: "Apakah website yang dibuat akan muncul di Google?",
      answer: "Kami install dan setup SEO dasar di semua paket: meta title, description, sitemap, robots.txt, dan submit ke Google Search Console. Untuk ranking kompetitif, kami rekomendasikan paket Professional yang sudah termasuk SEO on-page komprehensif.",
    },
    {
      _key: key(),
      question: "Bagaimana cara bayarnya?",
      answer: "DP 50% di awal untuk memulai proyek. Pelunasan 50% saat website siap launch dan sudah Anda setujui. Bisa transfer bank, QRIS, atau tunai.",
    },
  ],
  ctaLabel: "Konsultasi Website Gratis Sekarang",
  ctaLinks: [
    { _key: key(), label: "Chat WhatsApp — Mulai Konsultasi", href: "https://wa.me/6285799520350?text=Halo%2C%20saya%20ingin%20konsultasi%20pembuatan%20website", isExternal: true },
    { _key: key(), label: "Lihat Portfolio Website Kami", href: "/projects", isExternal: false },
    { _key: key(), label: "Bandingkan Semua Paket", href: "#paket", isExternal: false },
  ],
  longGuide: [
    {
      _key: key(),
      title: "Mengapa Website Profesional Bisa Meningkatkan Omset Bisnis",
      description: "Studi menunjukkan 81% konsumen riset online sebelum membeli. Bisnis tanpa website kehilangan kesempatan menjangkau 8 dari 10 calon pelanggan itu. Website yang dioptimalkan dengan benar bisa menjadi tim penjualan yang bekerja 24 jam tanpa gaji.",
    },
    {
      _key: key(),
      title: "Pilih Platform Website yang Tepat: WordPress vs Custom vs Next.js",
      description: "WordPress cocok untuk blog dan website informasional dengan konten banyak. Platform custom (Laravel, Next.js) lebih baik untuk web app atau kebutuhan unik. Kami bantu Anda memilih berdasarkan budget, kebutuhan teknis, dan rencana jangka panjang.",
    },
    {
      _key: key(),
      title: "Checklist yang Harus Ada di Website Bisnis Anda Sebelum Launch",
      description: "SSL aktif, loading di bawah 3 detik, mobile-friendly, formulir kontak berfungsi, Google Analytics terpasang, sitemap ter-submit, dan nomor WhatsApp mudah ditemukan. Kami pastikan semua checklist ini terpenuhi sebelum website Anda live.",
    },
  ],
  finalCtaTitle: "Website {lokasi} Anda Seharusnya Sudah Aktif Dari Kemarin",
  finalCtaDescription: "Setiap hari tanpa website yang bagus adalah hari di mana calon pelanggan {lokasi} berakhir di website kompetitor Anda. Konsultasi gratis, tanpa komitmen, 15 menit sudah cukup untuk tahu langkah berikutnya.",
};

// ============================================================
// TEMPLATE 2: PERCETAKAN
// ============================================================
const percetakanStructured = {
  primaryKeyword: "Jasa Percetakan Profesional {lokasi}",
  secondaryKeywords: [
    "Percetakan {lokasi}",
    "Cetak brosur {lokasi}",
    "Cetak banner {lokasi}",
    "Cetak company profile {lokasi}",
    "Jasa cetak murah berkualitas {lokasi}",
  ],
  description: "Jasa percetakan profesional di {lokasi} untuk kebutuhan promosi, branding, dan operasional bisnis — dari brosur, banner, hingga buku company profile. Proses pre-press ketat, hasil konsisten, pengiriman aman.",
  intro: "Material cetak yang buruk merusak kesan pertama — dan kesan pertama sulit diperbaiki. Di Kotacom {lokasi}, setiap pesanan cetak melewati pengecekan spesifikasi teknis sebelum masuk mesin: ukuran, resolusi, bleed, warna, dan finishing — semua dicek agar hasil akhir betul-betul siap pakai untuk kampanye atau operasional Anda.",
  highlights: [
    "Pre-press checking menyeluruh sebelum produksi: file, resolusi (min 300 DPI), bleed 3mm, dan color profile dicek satu per satu agar hasil cetak tidak blur atau terpotong.",
    "Pilihan material luas untuk semua kebutuhan: Art Paper/Carton untuk promosi premium, Bookpaper untuk buku dan modul, hingga Vinyl khusus banner outdoor tahan cuaca.",
    "Quality control per batch selama produksi: warna, kerapian trimming, dan konsistensi finishing dicek berkala — bukan hanya di awal atau akhir.",
    "Timeline produksi transparan dengan milestone jelas: Anda tahu progress harian dan tidak perlu nebak kapan pesanan selesai.",
    "Pengiriman aman ke seluruh Indonesia: packing disesuaikan jenis produk (roll untuk banner, box bubble untuk buku) agar material tidak penyok atau rusak saat tiba.",
  ],
  eeatPoints: [
    {
      _key: key(),
      label: "Kantor dan mesin cetak di Sidoarjo & Surabaya",
      description: "Anda bisa kunjungi fasilitas kami langsung, lihat mesin produksi, dan diskusi spesifikasi tatap muka. Bukan reseller atau makelar — kami punya kontrol langsung atas kualitas.",
    },
    {
      _key: key(),
      label: "Melayani klien korporat dan UMKM sejak 2015",
      description: "Dari perusahaan manufaktur yang butuh 50.000 brosur per bulan hingga pelaku UMKM yang cetak 100 kartu nama — semua ditangani dengan standar QC yang sama.",
    },
    {
      _key: key(),
      label: "Tim desain berpengalaman untuk koreksi file",
      description: "File Anda tidak langsung dicetak mentah-mentah. Tim kami periksa dan perbaiki minor issue seperti font missing, resolusi rendah, atau bleed kurang — tanpa biaya tambahan.",
    },
    {
      _key: key(),
      label: "Garansi cetak ulang untuk kesalahan produksi",
      description: "Jika ada kesalahan yang bersumber dari pihak kami (warna meleset jauh, trimming miring, material salah), kami cetak ulang tanpa biaya tambahan.",
    },
  ],
  process: [
    "Konsultasi spesifikasi: jenis materi, ukuran, quantity, finishing, dan deadline — bisa via WhatsApp, kirim file, atau kunjungi kantor",
    "File review dan pre-press check: tim cek resolusi, bleed, color profile, dan font. Kami berikan revisi minor atau approval untuk lanjut produksi",
    "Proof print untuk pesanan besar: 1 sample fisik dicetak dan dikirim/diambil untuk persetujuan sebelum produksi massal berjalan",
    "Produksi dengan quality control per batch: setiap tahap dicek konsistensi warna, trimming, dan finishing",
    "Packing dan pengiriman: dikemas sesuai jenis material dan dikirim via ekspedisi terpercaya dengan foto sebelum kirim",
  ],
  serviceTypes: [
    {
      _key: key(),
      title: "Cetak Promosi & Marketing",
      description: "Brosur, flyer, poster, banner, rollup display, dan backdrop untuk kampanye marketing yang meninggalkan kesan.",
      items: ["Brosur A4/A5/DL full color", "Banner X-Banner & Roll-Up", "Poster indoor/outdoor", "Stiker cut/sablon"],
    },
    {
      _key: key(),
      title: "Cetak Identitas Bisnis",
      description: "Kartu nama, kop surat, amplop, ID card, dan company profile untuk tampil profesional di setiap touchpoint bisnis.",
      items: ["Kartu nama single/double side", "Kop surat & amplop resmi", "Company profile premium", "Buku profil hardcover"],
    },
    {
      _key: key(),
      title: "Cetak Buku & Majalah",
      description: "Novel, modul pendidikan, buku tahunan, katalog produk, dan majalah internal perusahaan dengan pilihan material lengkap.",
      items: ["Novel & buku fiksi Bookpaper", "Modul & LKS HVS", "Katalog Art Paper glossy", "Buku tahunan hardcover"],
    },
  ],
  pricingPlans: [
    {
      _key: key(),
      name: "Print On Demand",
      price: "Mulai Rp 50.000/unit",
      description: "Tanpa minimum order. Ideal untuk proof, kebutuhan mendesak, atau cetak jumlah kecil.",
      recommended: false,
      items: [
        "Cetak mulai 1 lembar/unit",
        "Proses cepat 1-3 hari kerja",
        "Pilihan material standar & premium",
        "Cocok untuk: kartu nama, brosur, poster",
        "Free konsultasi spesifikasi",
      ],
    },
    {
      _key: key(),
      name: "Bulk Printing",
      price: "Mulai Rp 2.000.000 / 1000 unit",
      description: "Harga per unit jauh lebih efisien untuk kebutuhan kampanye besar atau distribusi massal.",
      recommended: true,
      items: [
        "Minimum order 500 unit (tergantung jenis produk)",
        "Harga per unit turun signifikan vs POD",
        "Quality control ketat per batch produksi",
        "Proof print gratis sebelum produksi massal",
        "Garansi konsistensi warna seluruh batch",
        "Packing aman untuk distribusi",
      ],
    },
    {
      _key: key(),
      name: "Corporate Package",
      price: "Harga negosiasi",
      description: "Untuk kebutuhan cetak rutin skala perusahaan dengan dedicated account manager dan kontrak SLA.",
      recommended: false,
      items: [
        "Volume unlimited tanpa batas",
        "Dedicated account manager",
        "Priority production queue",
        "Storage & distribusi bisa diatur",
        "Invoice bulanan / NET 30",
        "SLA dan perjanjian kontrak resmi",
      ],
    },
  ],
  testimonials: [
    {
      _key: key(),
      client: "Rini Wahyuni — Marketing Manager, PT Indah Jaya Textile",
      quote: "Biasanya cetak 10.000 brosur promo dan ada aja yang warnanya meleset atau trimming-nya miring. Sejak pakai Kotacom, QC-nya beneran ketat. File dicek dulu sebelum cetak, hasilnya konsisten dari lembar pertama sampai terakhir.",
    },
    {
      _key: key(),
      client: "Ahmad Fauzi — Owner, Toko Buku Ilmu Raya",
      quote: "Rutin cetak 500-1000 buku modul per bulan. Harga per unit sangat kompetitif untuk volume segitu, kualitas bookpaper dan jilidnya tidak mengecewakan. Yang paling saya hargai: tidak pernah telat dari deadline yang dijanjikan.",
    },
    {
      _key: key(),
      client: "Sari Kusuma — Event Coordinator, EO Gemilang",
      quote: "Backdrop dan banner event kami selalu dihasilkan Kotacom dalam 2 hari. Warnanya vivid, tidak pudar, dan ukurannya presisi. Sudah tidak mau coba tempat lain lagi.",
    },
  ],
  faqs: [
    {
      _key: key(),
      question: "Format file apa yang harus saya kirim untuk cetak?",
      answer: "Format terbaik adalah PDF siap cetak dengan bleed 3mm dan resolusi minimal 300 DPI. Format lain yang diterima: AI (Adobe Illustrator), CorelDraw CDR, atau PSD (Photoshop) dengan semua layer dan font disertakan.",
    },
    {
      _key: key(),
      question: "Saya tidak punya desain — bisakah dibantu?",
      answer: "Bisa. Kami punya tim desainer yang bisa membuatkan desain dari brief atau referensi yang Anda berikan. Biaya desain dikenakan terpisah tergantung kompleksitas. Hubungi kami untuk estimasi.",
    },
    {
      _key: key(),
      question: "Berapa lama waktu produksi?",
      answer: "POD (cetak satuan): 1-3 hari kerja setelah file diapprove. Bulk printing (1000+ unit): 3-7 hari kerja tergantung jenis dan finishing. Produksi besar (10.000+ unit): estimasi diberikan setelah review spesifikasi.",
    },
    {
      _key: key(),
      question: "Apakah melayani pengiriman luar kota?",
      answer: "Ya, kami kirim ke seluruh Indonesia via JNE, J&T, SiCepat, atau ekspedisi pilihan Anda. Packing disesuaikan jenis produk agar aman sampai tujuan. Foto sebelum kirim selalu diberikan.",
    },
    {
      _key: key(),
      question: "Bagaimana jika hasil cetak tidak sesuai yang saya harapkan?",
      answer: "Kami bedakan antara kesalahan dari pihak Kotacom vs ekspektasi berbeda dari klien. Untuk kesalahan produksi yang jelas dari kami, kami cetak ulang tanpa biaya. Untuk ekspektasi vs hasil, kami diskusikan solusi terbaik bersama.",
    },
  ],
  ctaLabel: "Konsultasi Cetak Gratis — Langsung Dapat Estimasi",
  ctaLinks: [
    { _key: key(), label: "Chat WhatsApp — Kirim Spesifikasi Cetak", href: "https://wa.me/6285799520350?text=Halo%2C%20saya%20ingin%20konsultasi%20percetakan", isExternal: true },
    { _key: key(), label: "Lihat Hasil Cetak di Portfolio", href: "/projects", isExternal: false },
    { _key: key(), label: "Bandingkan Paket Cetak", href: "#paket", isExternal: false },
  ],
  longGuide: [
    {
      _key: key(),
      title: "Panduan Menyiapkan File Cetak yang Benar untuk Hasil Optimal",
      description: "File dengan resolusi rendah, tanpa bleed, atau font tidak di-embed adalah penyebab paling umum hasil cetak mengecewakan. Resolusi minimal 300 DPI untuk foto, 600 DPI untuk grafis vektor high-detail. Bleed 3mm di semua sisi mencegah border putih setelah dipotong mesin. Font di-outline atau disertakan file-nya mencegah substitusi font yang mengubah tampilan.",
    },
    {
      _key: key(),
      title: "Cara Memilih Jenis Kertas yang Tepat untuk Material Promosi",
      description: "Art Paper (glossy/matte) cocok untuk brosur premium, katalog, dan poster indoor. Art Carton untuk cover buku, packaging, dan materi yang butuh ketebalan. HVS putih standart untuk dokumen, modul, dan formulir. Bookpaper krem untuk buku yang nyaman dibaca lama. Vinyl/Frontlite untuk banner outdoor tahan air dan sinar UV.",
    },
    {
      _key: key(),
      title: "Print On Demand vs Cetak Offset Massal — Mana yang Tepat untuk Anda?",
      description: "POD lebih fleksibel untuk jumlah kecil atau kebutuhan cepat, tapi cost per unit lebih tinggi. Offset massal memberikan harga per unit jauh lebih rendah untuk quantity besar (500+), tapi membutuhkan setup plate dan waktu lebih panjang. Untuk kampanye atau event dengan tenggat ketat, POD bisa menjadi pilihan cerdas meski lebih mahal per unit.",
    },
  ],
  finalCtaTitle: "Butuh Materi Cetak untuk Bisnis di {lokasi}?",
  finalCtaDescription: "Kirimkan spesifikasi: jenis materi, ukuran, quantity, dan deadline. Tim kami akan berikan estimasi harga dan waktu produksi dalam 1 jam kerja — tanpa perlu komitmen dulu.",
};

// ============================================================
// TEMPLATE 3: SOFTWARE
// ============================================================
const softwareStructured = {
  primaryKeyword: "Jasa Pengembangan Software Custom {lokasi}",
  secondaryKeywords: [
    "Software custom {lokasi}",
    "Jasa bikin aplikasi bisnis {lokasi}",
    "Sistem ERP {lokasi}",
    "Aplikasi manajemen {lokasi}",
    "Developer software profesional {lokasi}",
  ],
  description: "Pengembangan software custom di {lokasi} — sistem yang benar-benar dibangun sesuai alur kerja bisnis Anda, bukan solusi generik yang memaksa bisnis Anda beradaptasi dengan software.",
  intro: "Software off-the-shelf selalu ada yang tidak pas: fitur yang tidak dibutuhkan, fitur penting yang tidak ada, atau integrasi yang tidak bisa dilakukan. Di Kotacom {lokasi}, kami bangun sistem dari nol berdasarkan proses bisnis nyata Anda — sehingga tim Anda efisien, data Anda aman, dan software bisa berkembang seiring bisnis.",
  highlights: [
    "Analisis proses bisnis mendalam sebelum coding: kami petakan alur kerja, titik lemah, dan kebutuhan integrasi — baru mulai development agar tidak ada fitur yang sia-sia.",
    "Teknologi modern dan scalable: Next.js, React, Laravel, Node.js, PostgreSQL — stack yang bisa menangani ratusan hingga jutaan transaksi tanpa ganti sistem.",
    "Milestone transparan dan deliverable per sprint: Anda bisa pantau progress mingguan, test fitur secara berkala, dan berikan feedback sebelum terlambat.",
    "Dokumentasi teknis dan user manual lengkap: tim Anda bisa onboard cepat dan vendor lock-in tidak terjadi karena semua kode dan dokumentasi milik Anda.",
    "Support dan maintenance jangka panjang: kami tersedia untuk bug fix, penambahan fitur, dan update sistem — dengan SLA yang jelas dan response time terukur.",
  ],
  eeatPoints: [
    {
      _key: key(),
      label: "Lebih dari 50 sistem custom telah diluncurkan",
      description: "Dari sistem POS ritel, portal membership, ERP manufaktur, hingga platform e-learning — track record kami mencakup berbagai industri dan kompleksitas sistem.",
    },
    {
      _key: key(),
      label: "Tim developer full-stack berpengalaman",
      description: "Frontend (React, Next.js), backend (Laravel, Node.js), mobile (React Native), dan database administrator — semua in-house, tidak di-outsource ke pihak ketiga.",
    },
    {
      _key: key(),
      label: "Kode sumber milik klien sepenuhnya",
      description: "Anda mendapatkan akses penuh ke repository source code. Tidak ada lock-in, tidak ada biaya per-lisensi. Bebas dikembangkan sendiri atau oleh tim lain.",
    },
    {
      _key: key(),
      label: "Metodologi Agile dengan sprint mingguan",
      description: "Anda bisa melihat hasil nyata setiap minggu, berikan feedback, dan pivot arah sebelum cost pembangunan membesar. Proses transparan dari hari pertama hingga launch.",
    },
  ],
  process: [
    "Discovery & requirement gathering: interview stakeholder, pemetaan alur bisnis, dan definisi fitur prioritas (1-2 minggu)",
    "System design & architecture: rancang database, API, dan UI/UX — semua didokumentasikan dan disetujui sebelum coding mulai",
    "Development sprint: fitur dibangun per sprint (1-2 minggu), Anda bisa akses dan test di staging environment sepanjang proses",
    "Quality assurance & testing: unit test, integration test, dan user acceptance testing (UAT) bersama tim Anda",
    "Deployment & training: sistem diluncurkan ke production, tim Anda ditraining, dan dokumentasi diserahkan. Support SLA mulai berjalan",
  ],
  serviceTypes: [
    {
      _key: key(),
      title: "Sistem Manajemen & ERP",
      description: "Kelola inventory, pembelian, penjualan, keuangan, dan SDM dalam satu sistem terintegrasi yang dirancang sesuai alur bisnis spesifik Anda.",
      items: ["Inventory & stok management", "Purchase order & supplier", "Sales & invoice", "Laporan keuangan real-time"],
    },
    {
      _key: key(),
      title: "Aplikasi Web & Mobile",
      description: "Dari web app internal untuk tim hingga aplikasi mobile yang bisa diunduh pelanggan di App Store dan Play Store.",
      items: ["Progressive Web App (PWA)", "Mobile app Android & iOS", "Dashboard analytics", "Notifikasi push & email"],
    },
    {
      _key: key(),
      title: "Platform & Marketplace Custom",
      description: "Bangun platform dua sisi (seller-buyer), marketplace niche, atau sistem booking yang bisa menerima transaksi online dengan payment gateway terintegrasi.",
      items: ["Multi-vendor marketplace", "Sistem booking & reservasi", "Payment gateway integration", "Review & rating system"],
    },
  ],
  pricingPlans: [
    {
      _key: key(),
      name: "MVP / Prototype",
      price: "Mulai Rp 15.000.000",
      description: "Versi pertama yang bisa digunakan dan diuji — cukup fitur core untuk validasi konsep atau pitching ke investor.",
      recommended: false,
      items: [
        "3-5 modul fitur utama",
        "Estimasi 4-8 minggu pengerjaan",
        "Desain UI fungsional (bukan fully polished)",
        "Staging environment untuk testing",
        "Dokumentasi fitur delivered",
        "1 bulan support setelah launch",
      ],
    },
    {
      _key: key(),
      name: "Full System",
      price: "Mulai Rp 50.000.000",
      description: "Sistem lengkap siap produksi dengan semua modul utama, integrasi, dan UI/UX yang polished untuk digunakan tim nyata.",
      recommended: true,
      items: [
        "Modul lengkap sesuai requirement",
        "Estimasi 3-6 bulan pengerjaan",
        "Desain UI/UX professional",
        "API integration (pihak ketiga)",
        "User roles & permissions",
        "Dokumentasi teknis & user manual",
        "Training tim Anda",
        "3 bulan support & bug fix",
      ],
    },
    {
      _key: key(),
      name: "Enterprise & Ongoing",
      price: "Kontrak tahunan",
      description: "Untuk organisasi yang butuh pengembangan berkelanjutan, SLA terukur, dan dedicated team yang memahami bisnis Anda secara mendalam.",
      recommended: false,
      items: [
        "Dedicated development team",
        "Sprint planning bulanan",
        "SLA response time tertulis",
        "Code review & security audit reguler",
        "Priority bug fix dalam 24 jam",
        "Quarterly architecture review",
      ],
    },
  ],
  testimonials: [
    {
      _key: key(),
      client: "Budi Prasetyo — Direktur Operasional, CV Makmur Sejahtera",
      quote: "Dulu laporan stok dikerjakan manual pakai Excel dan selalu ada selisih. Sistem yang dibangun Kotacom otomatis rekap dan flagging selisih secara real-time. Tim gudang sekarang lebih efisien dan saya bisa pantau dari HP.",
    },
    {
      _key: key(),
      client: "Lia Andrianti — Founder, Platform Edukasi BelajarPintar",
      quote: "Dari konsep di kertas sampai platform yang bisa menampung 500 siswa bersamaan — tim Kotacom handle semuanya. Sprint mingguan membantu saya tetap in control tanpa harus mengerti koding.",
    },
    {
      _key: key(),
      client: "Feri Susanto — IT Manager, Koperasi Maju Bersama",
      quote: "Kami coba beberapa vendor tapi selalu ada gap antara requirement dan output-nya. Kotacom satu-satunya yang benar-benar duduk dan pahami proses koperasi kami sebelum mulai develop. Hasilnya: adopted rate 95% di tim dalam bulan pertama.",
    },
  ],
  faqs: [
    {
      _key: key(),
      question: "Berapa lama waktu yang dibutuhkan untuk membangun sistem?",
      answer: "MVP dengan 3-5 fitur: 4-8 minggu. Sistem menengah: 3-4 bulan. Sistem kompleks multi-modul: 6-12 bulan. Timeline akurat diberikan setelah requirement gathering selesai.",
    },
    {
      _key: key(),
      question: "Saya tidak tahu teknis — apakah bisa tetap terlibat dalam proses?",
      answer: "Justru kami butuh keterlibatan Anda yang memahami bisnis. Kami yang urus semua urusan teknis; Anda cukup jelaskan alur bisnis dan berikan feedback saat testing. Sprint mingguan dirancang agar mudah diikuti non-technical stakeholder.",
    },
    {
      _key: key(),
      question: "Apakah source code menjadi milik saya?",
      answer: "Ya, 100%. Semua kode sumber, aset desain, dan dokumentasi menjadi milik Anda sepenuhnya setelah proyek selesai. Tidak ada royalti atau biaya lisensi berkelanjutan.",
    },
    {
      _key: key(),
      question: "Bagaimana jika ada kebutuhan fitur baru setelah sistem selesai?",
      answer: "Kami siapkan paket maintenance dan pengembangan lanjutan dengan harga yang sudah familiar karena kami sudah kenal sistem Anda. Tidak perlu onboard vendor baru dari nol.",
    },
    {
      _key: key(),
      question: "Apakah sistem bisa diintegrasikan dengan software yang sudah kami pakai?",
      answer: "Hampir selalu bisa — selama software yang sudah ada punya API atau export data. Kami punya pengalaman integrasi dengan Accurate, Jurnal, Tokopedia, Shopee, Midtrans, dan berbagai sistem lain.",
    },
  ],
  ctaLabel: "Diskusikan Kebutuhan Software Anda",
  ctaLinks: [
    { _key: key(), label: "Chat WhatsApp — Jelaskan Kebutuhan Sistem", href: "https://wa.me/6285799520350?text=Halo%2C%20saya%20ingin%20diskusi%20kebutuhan%20software%20custom", isExternal: true },
    { _key: key(), label: "Lihat Case Study Sistem yang Pernah Kami Bangun", href: "/projects", isExternal: false },
    { _key: key(), label: "Download Checklist Requirement Sistem", href: "#faq", isExternal: false },
  ],
  longGuide: [
    {
      _key: key(),
      title: "Kapan Bisnis Anda Butuh Software Custom (dan Kapan Tidak)",
      description: "Software custom masuk akal jika proses bisnis Anda unik dan tidak bisa ditangani software generik, Anda proyeksikan pertumbuhan signifikan yang membutuhkan sistem scalable, atau biaya langganan SaaS bulanan sudah melampaui investasi membangun sendiri. Sebaliknya, jika solusi off-the-shelf sudah cukup dan proses bisnis Anda standar, kami akan jujur rekomendasikan itu.",
    },
    {
      _key: key(),
      title: "Mengapa Banyak Proyek Software Gagal dan Bagaimana Menghindarinya",
      description: "Penyebab utama: requirement tidak jelas di awal, komunikasi buruk antar tim, dan scope creep yang tidak dikontrol. Metodologi Agile dengan sprint pendek dan milestone terukur adalah cara terbukti mengurangi risiko ini. Kami juga selalu lakukan requirement validation di awal sebelum satu baris kode pun ditulis.",
    },
    {
      _key: key(),
      title: "Cara Menghitung ROI dari Investasi Software Custom",
      description: "Hitung jam kerja yang bisa dihemat dengan otomasi, kurangi error yang selama ini terjadi karena proses manual, dan nilai data real-time yang membantu keputusan bisnis lebih cepat. Banyak klien kami melaporkan balik modal dalam 6-18 bulan setelah sistem berjalan penuh.",
    },
  ],
  finalCtaTitle: "Proses Bisnis {lokasi} Anda Berhak Punya Sistem yang Pas",
  finalCtaDescription: "Tidak perlu kompromi dengan software yang tidak sepenuhnya cocok. Ceritakan kebutuhan Anda dan kami bantu rancang solusi yang benar-benar sesuai — mulai dari konsultasi gratis.",
};

// ============================================================
// TEMPLATE 4: GENERIC COMPANY
// ============================================================
const genericCompanyStructured = {
  primaryKeyword: "Layanan IT & Digital Profesional {lokasi}",
  secondaryKeywords: [
    "Jasa IT {lokasi}",
    "Layanan digital bisnis {lokasi}",
    "Solusi teknologi {lokasi}",
    "Konsultan IT {lokasi}",
    "Support IT bisnis {lokasi}",
  ],
  description: "Layanan IT dan digital profesional di {lokasi} — dari pembuatan website, software custom, percetakan, hingga support IT — semua dari satu vendor yang sudah membuktikan diri sejak 2015.",
  intro: "Mengelola kebutuhan digital bisnis dengan banyak vendor berbeda adalah kerumitan yang tidak perlu. Kami hadir sebagai satu-satunya vendor teknologi yang Anda butuhkan di {lokasi}: satu tim yang memahami bisnis Anda, satu invoice, dan satu nomor WhatsApp untuk semua kebutuhan digital.",
  highlights: [
    "Satu vendor, semua kebutuhan digital: website, software custom, percetakan, dan IT support — tidak perlu koordinasikan beberapa vendor yang tidak saling kenal.",
    "Response time cepat adalah standar, bukan janji: kami target respons WhatsApp dalam 1 jam kerja dan penyelesaian issue kritis dalam 24 jam.",
    "Proses kerja terdokumentasi dengan milestone jelas: Anda selalu tahu status proyek, tidak perlu mengejar-ngejar tim untuk mendapatkan update.",
    "Harga transparan tanpa biaya tersembunyi: semua komponen biaya dijelaskan di awal. Tidak ada surprise invoice setelah proyek jalan.",
    "Hubungan jangka panjang, bukan transaksi sekali: 60% klien kami adalah repeater yang kembali untuk proyek berikutnya — karena hasilnya memuaskan dan prosesnya nyaman.",
  ],
  eeatPoints: [
    {
      _key: key(),
      label: "Beroperasi sejak 2015 di Surabaya dan Sidoarjo",
      description: "Bisnis yang sudah 10+ tahun berjalan punya track record yang bisa diperiksa. Kami punya portofolio, referensi klien, dan kadang mantan klien yang bisa Anda hubungi langsung.",
    },
    {
      _key: key(),
      label: "200+ proyek sukses di berbagai industri",
      description: "Retail, manufaktur, pendidikan, kesehatan, F&B, hingga pemerintahan. Keberagaman industri membuat kami bisa memberikan insight lintas sektor yang memperkaya solusi untuk bisnis Anda.",
    },
    {
      _key: key(),
      label: "Tim in-house, bukan outsource",
      description: "Developer, desainer, dan teknisi kami adalah karyawan tetap yang ditraining secara internal — bukan freelancer yang mungkin menghilang di tengah proyek.",
    },
    {
      _key: key(),
      label: "Kantor nyata yang bisa dikunjungi",
      description: "Graha Indraprasta G7/15, Tulangan, Sidoarjo dan Jl. Tenggilis Mulya 76, Surabaya. Kami senang jika Anda ingin bertemu langsung sebelum memutuskan bekerja sama.",
    },
  ],
  process: [
    "Konsultasi awal: kami pelajari bisnis, tantangan, dan tujuan Anda — tanpa agenda untuk langsung 'jualan'",
    "Rekomendasi solusi: kami tawarkan pilihan yang paling tepat dan paling cost-effective untuk kebutuhan Anda",
    "Proposal dan timeline: dokumen tertulis yang menjelaskan scope, deliverable, milestone, dan biaya secara detail",
    "Eksekusi dengan update berkala: progres dikomunikasikan secara aktif, bukan hanya saat ada masalah",
    "Serah terima dan support: dokumentasi, training, dan support pasca-implementasi sesuai paket yang dipilih",
  ],
  serviceTypes: [
    {
      _key: key(),
      title: "Pembuatan Website & Aplikasi Web",
      description: "Website company profile, toko online, landing page khusus, hingga web app custom yang bisa menangani ribuan pengguna bersamaan.",
      items: ["Company profile SEO-ready", "E-commerce full-featured", "Landing page konversi tinggi", "Web app & dashboard"],
    },
    {
      _key: key(),
      title: "Software Custom & Sistem Bisnis",
      description: "Sistem ERP, manajemen stok, POS, aplikasi mobile, dan platform khusus yang dirancang sesuai alur operasional unik bisnis Anda.",
      items: ["ERP & manajemen bisnis", "Sistem POS retail", "Aplikasi mobile Android/iOS", "Integrasi API antar sistem"],
    },
    {
      _key: key(),
      title: "Percetakan & Materi Promosi",
      description: "Brosur, banner, company profile, packaging, dan semua material cetak untuk kebutuhan branding dan kampanye marketing Anda.",
      items: ["Cetak brosur & banner", "Company profile premium", "Packaging & label", "Hadiah & merchandise"],
    },
  ],
  pricingPlans: [
    {
      _key: key(),
      name: "Starter",
      price: "Mulai Rp 1.500.000",
      description: "Untuk kebutuhan digital pertama — website sederhana atau materi cetak dasar untuk memulai kehadiran bisnis secara profesional.",
      recommended: false,
      items: [
        "1 layanan utama (website atau cetak)",
        "Estimasi 5-10 hari kerja",
        "Desain standard",
        "1-3 revisi",
        "Support 1 bulan",
      ],
    },
    {
      _key: key(),
      name: "Growth",
      price: "Mulai Rp 5.000.000",
      description: "Untuk bisnis yang berkembang dan butuh solusi lebih lengkap — website profesional, sistem, atau kebutuhan multi-layanan.",
      recommended: true,
      items: [
        "1-2 layanan terintegrasi",
        "Estimasi 2-4 minggu",
        "Desain custom premium",
        "Revisi unlimited",
        "Support 3 bulan",
        "Pelatihan penggunaan",
      ],
    },
    {
      _key: key(),
      name: "Enterprise",
      price: "Harga negosiasi",
      description: "Untuk perusahaan dengan kebutuhan kompleks, skala besar, atau proyek multi-fase yang membutuhkan dedicated team.",
      recommended: false,
      items: [
        "Multi-layanan terintegrasi",
        "Dedicated account manager",
        "SLA dan kontrak resmi",
        "Priority support",
        "Monthly reporting",
        "Strategic consultation",
      ],
    },
  ],
  testimonials: [
    {
      _key: key(),
      client: "Prasetyo Hadi — Direktur, CV Prima Konstruksi Surabaya",
      quote: "Kami butuh website, seragam, dan brosur baru untuk kebutuhan pitching proyek besar. Kotacom handle semuanya dalam 2 minggu. Praktis banget tidak perlu koordinasikan banyak vendor — dan hasilnya konsisten secara branding.",
    },
    {
      _key: key(),
      client: "Ningsih Wahyuningsih — Kepala Operasional, Klinik Medika Plus",
      quote: "Terima kasih sudah sabar dengan kami yang tidak terlalu melek teknologi. Dari website yang mudah dikelola staf sampai sistem antrian digital — semuanya sekarang berjalan tanpa kami harus ribet tiap hari.",
    },
    {
      _key: key(),
      client: "Roni Jamaludin — Owner, Distributor Alat Tulis Kantor Sidoarjo",
      quote: "Sudah 4 tahun bekerja sama. Mulai dari website, lanjut ke sistem order online, lalu cetak katalog rutin. Setiap proyek selalu on-time dan hasilnya memuaskan. Tidak akan pindah ke vendor lain.",
    },
  ],
  faqs: [
    {
      _key: key(),
      question: "Apakah bisa konsultasi dulu sebelum memutuskan?",
      answer: "Tentu dan sangat disarankan. Konsultasi awal kami gratis dan tidak ada kewajiban. Kami justru ingin pastikan kami adalah pilihan yang tepat untuk kebutuhan Anda sebelum proyek dimulai.",
    },
    {
      _key: key(),
      question: "Apakah bisa memesan website dan cetak sekaligus?",
      answer: "Ya, dan ini adalah cara yang efisien. Identitas visual yang sudah ada di website langsung konsisten dengan material cetak — tidak perlu briefing berulang ke vendor berbeda. Bundling juga bisa mendapatkan harga yang lebih baik.",
    },
    {
      _key: key(),
      question: "Berapa lama waktu penyelesaian proyek?",
      answer: "Bergantung scope. Website sederhana: 5-10 hari. Website + sistem: 4-8 minggu. Proyek kompleks: 3-6 bulan. Semua dengan milestone transparan yang disepakati di awal.",
    },
    {
      _key: key(),
      question: "Bagaimana jika bisnis kami berada di luar Surabaya/Sidoarjo?",
      answer: "Tidak masalah. Sebagian besar proyek kami dikerjakan secara remote dengan komunikasi via WhatsApp, email, dan video call. Kami juga melayani pengiriman hasil cetak ke seluruh Indonesia.",
    },
  ],
  ctaLabel: "Konsultasi Gratis — Tanpa Komitmen",
  ctaLinks: [
    { _key: key(), label: "Chat WhatsApp Sekarang", href: "https://wa.me/6285799520350?text=Halo%2C%20saya%20ingin%20konsultasi%20layanan%20Kotacom", isExternal: true },
    { _key: key(), label: "Lihat Portfolio Lengkap Kami", href: "/projects", isExternal: false },
    { _key: key(), label: "Pelajari Semua Layanan", href: "/layanan", isExternal: false },
  ],
  longGuide: [
    {
      _key: key(),
      title: "Mengapa Konsistensi Vendor Penting untuk Branding Bisnis Anda",
      description: "Ketika website, brosur, dan sistem bisnis dikerjakan oleh vendor yang sama dan memahami brand Anda, hasilnya jauh lebih konsisten dan prosesnya jauh lebih mudah. Tidak ada brief yang harus diulang, tidak ada koordinasi silang antar vendor yang memperlambat eksekusi.",
    },
    {
      _key: key(),
      title: "Tanda-Tanda Bisnis Anda Sudah Siap Upgrade ke Solusi Digital",
      description: "Jika tim Anda masih menggunakan spreadsheet untuk tracking stok, WhatsApp untuk menerima order, atau tidak punya website sama sekali — itu tanda bahwa digitalisasi sederhana sudah bisa memberikan dampak besar. Kami bantu evaluasi mana prioritas pertama yang memberikan ROI terbesar.",
    },
    {
      _key: key(),
      title: "Cara Memilih Vendor IT yang Tepat untuk Bisnis Anda",
      description: "Lihat portofolio nyata (bukan mockup), minta referensi klien yang bisa dihubungi, pastikan ada kantor atau alamat fisik yang bisa dikunjungi, dan clarity pada cara mereka menjelaskan proses kerja. Vendor yang bagus tidak takut pertanyaan kritis dan tidak over-promise pada awal diskusi.",
    },
  ],
  finalCtaTitle: "Mulai Transformasi Digital Bisnis di {lokasi} Hari Ini",
  finalCtaDescription: "Dari website pertama hingga sistem yang mengotomasi operasional — kami siap mendampingi perjalanan digital bisnis Anda di {lokasi}. Konsultasi gratis, komitmen hanya jika Anda siap.",
};

// ============================================================
// EXECUTE PATCHES
// ============================================================
async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  const patches = [
    { id: "page-template-pembuatan-website", structured: pembuatanWebsiteStructured },
    { id: "page-template-percetakan", structured: percetakanStructured },
    { id: "page-template-software", structured: softwareStructured },
    { id: "page-template-generic-company", structured: genericCompanyStructured },
  ];

  for (const { id, structured: s } of patches) {
    console.log(`\nPatching ${id}...`);
    await client.patch(id).set({ structured: s }).commit();
    console.log(`  ✅ Done`);
  }

  console.log("\n✅ All 4 templates patched successfully!");
}

main().catch(console.error);
