import type { LegacyAstroPage } from "./astro-static";

export type LegacyRewriteCopy = {
  primaryKeyword: string;
  secondaryKeywords: string[];
  description: string;
  intro: string;
  highlights: string[];
  process: string[];
  faqs: Array<{ question: string; answer: string }>;
  ctaLabel: string;
  ctaHref: string;
  ctaLinks?: Array<{ label: string; href: string }>;
  serviceTypes?: Array<{ title: string; description: string; href?: string; image?: string }>;
  pricingPlans?: Array<{
    name: string;
    price: string;
    description: string;
    items: string[];
    recommended?: boolean;
  }>;
  features?: Array<{ title: string; description: string; icon?: string }>;
  proofItems?: Array<{ title: string; description: string; image?: string; href?: string }>;
  testimonials?: Array<{ name: string; role: string; quote: string }>;
  longGuide?: Array<{ title: string; description: string }>;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
};

const DEFAULT_CTA = "/contact";

const SECTION_SEMANTIC_KEYWORDS: Record<string, string[]> = {
  "pembuatan-website": [
    "website profesional",
    "optimasi SEO on-page",
    "landing page konversi",
    "pengembangan website bisnis",
    "jasa web developer",
  ],
  percetakan: [
    "percetakan profesional",
    "cetak cepat dan presisi",
    "quality control produksi",
    "cetak buku satuan dan massal",
    "finishing premium",
  ],
  software: [
    "software custom bisnis",
    "implementasi bertahap",
    "integrasi sistem operasional",
    "efisiensi proses bisnis",
    "dashboard dan laporan",
  ],
  "sistem-pos": [
    "aplikasi kasir online",
    "sistem point of sale",
    "sinkronisasi stok",
    "laporan penjualan real-time",
    "POS retail dan F&B",
  ],
  layanan: [
    "layanan IT terintegrasi",
    "implementasi website software percetakan",
    "konsultasi digital bisnis",
  ],
  about: [
    "tim ahli IT",
    "partner teknologi bisnis",
    "pengalaman implementasi proyek",
  ],
  contact: [
    "konsultasi cepat",
    "respon tim profesional",
    "diskusi kebutuhan bisnis",
  ],
  privacy: [
    "perlindungan data pengguna",
    "keamanan informasi",
    "kebijakan privasi digital",
  ],
};

const SECTION_LONG_GUIDE_DEFAULT: Partial<
  Record<LegacyAstroPage["section"], Array<{ title: string; description: string }>>
> = {
  "pembuatan-website": [
    {
      title: "Struktur Halaman Berbasis Intent",
      description:
        "Kami memetakan halaman berdasarkan intent pencarian agar traffic lebih relevan dan peluang konversi lead meningkat.",
    },
    {
      title: "Optimasi SEO Sejak Tahap Build",
      description:
        "Metadata, heading, internal link, dan performa teknis disiapkan dari awal agar halaman lebih siap tumbuh di pencarian organik.",
    },
    {
      title: "Iterasi Berbasis Data",
      description:
        "Setelah live, konten dan CTA dioptimasi bertahap berdasarkan performa agar website terus berkembang sesuai target bisnis.",
    },
  ],
  software: [
    {
      title: "Prioritas Fitur Berorientasi Dampak",
      description:
        "Fitur dipilih berdasarkan dampak bisnis paling tinggi agar implementasi awal memberi hasil nyata lebih cepat.",
    },
    {
      title: "Integrasi dan Adopsi Tim",
      description:
        "Kami menyiapkan alur adopsi pengguna supaya software tidak hanya selesai dibangun, tetapi benar-benar dipakai operasional harian.",
    },
    {
      title: "Roadmap Pengembangan Bertahap",
      description:
        "Pengembangan dibagi dalam fase terukur agar risiko lebih rendah dan investasi sistem tetap efisien.",
    },
  ],
  "sistem-pos": [
    {
      title: "Kontrol Transaksi dan Stok",
      description:
        "Sistem POS dirancang untuk menjaga kecepatan transaksi sekaligus akurasi stok lintas cabang.",
    },
    {
      title: "Laporan Operasional Real-time",
      description:
        "Data penjualan dan performa item bisa dipantau untuk mendukung keputusan harian maupun strategi bulanan.",
    },
    {
      title: "Skalabilitas untuk Pertumbuhan Outlet",
      description:
        "Arsitektur POS disiapkan untuk pertumbuhan bisnis agar penambahan outlet tetap terkontrol.",
    },
  ],
  percetakan: [
    {
      title: "Standar File dan Spesifikasi Cetak",
      description:
        "Pemeriksaan file, ukuran, bleed, dan profil warna dilakukan sejak awal untuk menekan risiko revisi produksi.",
    },
    {
      title: "Produksi dengan Quality Control",
      description:
        "Setiap tahap produksi dipantau agar hasil cetak konsisten, rapi, dan sesuai target kualitas brand.",
    },
    {
      title: "Distribusi dan Ketepatan Waktu",
      description:
        "Timeline produksi dan pengiriman dibuat terukur agar materi cetak siap dipakai sesuai jadwal campaign.",
    },
  ],
};

const SLUG_INTENT_KEYWORDS: Array<{
  match: (page: LegacyAstroPage) => boolean;
  keywords: string[];
}> = [
  {
    match: (page) => page.slug.includes("harga") || page.slug.includes("biaya"),
    keywords: [
      "estimasi biaya",
      "paket layanan bisnis",
      "konsultasi budget",
      "harga transparan",
    ],
  },
  {
    match: (page) => page.slug.includes("migrasi"),
    keywords: [
      "minim downtime",
      "migrasi aman",
      "validasi pasca migrasi",
      "backup dan rollback plan",
    ],
  },
  {
    match: (page) => page.slug.includes("toko-online") || page.slug.includes("ecommerce"),
    keywords: [
      "konversi penjualan",
      "checkout flow",
      "katalog produk",
      "optimasi funnel e-commerce",
    ],
  },
  {
    match: (page) => page.slug.includes("cetak-buku") || page.slug.includes("buku"),
    keywords: [
      "print on demand",
      "offset printing",
      "finishing jilid",
      "estimasi produksi buku",
    ],
  },
  {
    match: (page) => page.slug.includes("kalender"),
    keywords: [
      "kalender promosi",
      "branding tahunan",
      "distribusi corporate gift",
      "produksi kalender custom",
    ],
  },
  {
    match: (page) => page.slug.includes("implementasi") || page.slug.includes("instalasi"),
    keywords: [
      "go-live terukur",
      "adopsi pengguna",
      "training operasional",
      "handover teknis",
    ],
  },
];

const SLUG_INTENT_FAQS: Array<{
  match: (page: LegacyAstroPage) => boolean;
  faqs: Array<{ question: string; answer: string }>;
}> = [
  {
    match: (page) => page.slug.includes("harga") || page.slug.includes("biaya"),
    faqs: [
      {
        question: "Apakah tersedia paket layanan sesuai budget bisnis?",
        answer:
          "Ya. Scope layanan bisa disusun bertahap agar tetap realistis terhadap budget tanpa mengorbankan fondasi utama.",
      },
      {
        question: "Bagaimana cara mendapatkan estimasi biaya yang lebih akurat?",
        answer:
          "Kirim kebutuhan detail (target, timeline, fitur/output) agar estimasi disesuaikan dengan kompleksitas riil proyek.",
      },
    ],
  },
  {
    match: (page) => page.slug.includes("migrasi"),
    faqs: [
      {
        question: "Bagaimana menjaga website tetap aman saat proses migrasi?",
        answer:
          "Kami menyiapkan backup, tahapan validasi, dan checklist pasca migrasi agar risiko gangguan layanan bisa ditekan.",
      },
      {
        question: "Apakah URL dan SEO existing tetap dipertahankan?",
        answer:
          "Ya, struktur URL, redirect, dan elemen SEO penting dipetakan agar visibilitas organik tetap terjaga setelah migrasi.",
      },
    ],
  },
  {
    match: (page) => page.slug.includes("cetak-buku") || page.slug.includes("buku"),
    faqs: [
      {
        question: "Metode cetak apa yang cocok untuk kebutuhan saya: POD atau offset?",
        answer:
          "POD cocok untuk jumlah kecil/validasi awal, sedangkan offset lebih efisien untuk kuantitas besar dengan biaya per unit lebih rendah.",
      },
      {
        question: "Apakah bisa konsultasi spesifikasi sebelum produksi buku dimulai?",
        answer:
          "Bisa. Tim kami bantu menyusun ukuran, jenis kertas, jilid, finishing, dan estimasi timeline agar keputusan produksi lebih tepat.",
      },
    ],
  },
  {
    match: (page) => page.slug.includes("implementasi") || page.slug.includes("instalasi"),
    faqs: [
      {
        question: "Bagaimana memastikan tim internal cepat beradaptasi dengan sistem baru?",
        answer:
          "Implementasi disertai panduan alur, training, dan fase transisi agar proses adopsi lebih lancar dan minim hambatan operasional.",
      },
      {
        question: "Apakah ada pendampingan setelah go-live?",
        answer:
          "Ada. Kami menyediakan fase stabilisasi pasca go-live untuk memastikan sistem berjalan sesuai target operasional.",
      },
    ],
  },
];

const PRIORITY_SLUG_OVERRIDES: Record<string, Partial<LegacyRewriteCopy>> = {
  "pembuatan-website": {
    primaryKeyword: "Jasa Pembuatan Website untuk Lead dan Penjualan",
    intro:
      "Halaman ini kami tulis ulang untuk intent komersial: bisnis yang butuh website bukan hanya tampil menarik, tetapi menghasilkan lead yang bisa ditindaklanjuti tim sales. Fokusnya pada struktur halaman, pesan nilai, dan CTA yang benar-benar mendorong konsultasi.",
    ctaLabel: "Minta Strategi Website",
    finalCtaTitle: "Siap Ubah Website Menjadi Mesin Akuisisi Lead?",
    finalCtaDescription:
      "Ceritakan target lead Anda. Tim Kotacom akan memetakan struktur halaman, prioritas konten, dan roadmap implementasi yang realistis untuk bisnis Anda.",
    faqs: [
      {
        question: "Apa bedanya website biasa dengan website yang fokus konversi?",
        answer:
          "Website konversi menyusun alur informasi, bukti sosial, dan CTA berdasarkan intent user agar kunjungan berubah jadi lead yang siap di-follow-up.",
      },
      {
        question: "Apakah bisa mulai dari halaman inti dulu?",
        answer:
          "Bisa. Umumnya kami mulai dari halaman paling berdampak: homepage, layanan utama, dan halaman kontak sebelum ekspansi konten.",
      },
    ],
  },
  harga: {
    intro:
      "Intent user di halaman harga adalah kepastian budget dan scope. Karena itu kami memprioritaskan transparansi komponen biaya, pilihan paket, serta skenario implementasi bertahap supaya keputusan investasi digital lebih aman.",
    ctaLabel: "Minta Estimasi Final",
    finalCtaTitle: "Ingin Estimasi Biaya yang Benar-Benar Relevan?",
    finalCtaDescription:
      "Kirim kebutuhan dan target bisnis Anda, lalu kami susun estimasi berdasarkan scope aktual, bukan angka template.",
    faqs: [
      {
        question: "Kenapa harga website bisa berbeda antar bisnis?",
        answer:
          "Perbedaan biasanya muncul dari kompleksitas fitur, volume konten, integrasi sistem, dan target performa setelah website live.",
      },
      {
        question: "Bisakah proyek dibagi per fase agar budget lebih ringan?",
        answer:
          "Bisa. Kami sering membagi proyek ke fase fondasi, fase optimasi, lalu fase scale agar cashflow bisnis tetap sehat.",
      },
    ],
  },
  "jasa-migrasi-wordpress": {
    intro:
      "Untuk migrasi WordPress, user intent utamanya adalah aman, minim downtime, dan SEO tidak jatuh. Copy halaman ini difokuskan pada mitigasi risiko, checklist validasi, dan rencana rollback jika dibutuhkan.",
    ctaLabel: "Jadwalkan Audit Migrasi",
    finalCtaTitle: "Migrasi WordPress Tanpa Drama Operasional",
    finalCtaDescription:
      "Kami bantu audit struktur situs Anda, siapkan skenario migrasi, dan eksekusi bertahap agar performa bisnis tetap stabil.",
    faqs: [
      {
        question: "Apakah ranking SEO bisa tetap dijaga saat migrasi?",
        answer:
          "Bisa, dengan pemetaan URL, redirect plan, dan validasi metadata pasca migrasi agar sinyal SEO tetap konsisten.",
      },
      {
        question: "Bagaimana kalau ada bug setelah migrasi?",
        answer:
          "Kami menyiapkan fase stabilisasi pasca go-live untuk menangani isu prioritas tanpa mengganggu operasi utama.",
      },
    ],
  },
  "jasa-pembuatan-website-company-profile": {
    intro:
      "Halaman ini ditulis untuk user yang membutuhkan kredibilitas bisnis di mata calon klien, investor, atau partner. Fokus copy kami adalah trust signal, positioning, dan kemudahan menghubungi tim Anda.",
    ctaLabel: "Rancang Website Company Profile",
    finalCtaTitle: "Bangun Kredibilitas Perusahaan Sejak Kunjungan Pertama",
    finalCtaDescription:
      "Kami bantu susun struktur company profile yang menampilkan value bisnis Anda secara jelas dan meyakinkan.",
    faqs: [
      {
        question: "Konten apa yang wajib ada di website company profile?",
        answer:
          "Minimal meliputi profil perusahaan, layanan inti, portofolio, testimoni, dan kontak yang mudah diakses.",
      },
      {
        question: "Apakah website company profile tetap bisa menghasilkan lead?",
        answer:
          "Bisa. Dengan CTA yang tepat, halaman ini bisa menjadi pintu awal konsultasi dari calon klien berkualitas.",
      },
    ],
  },
  "jasa-pembuatan-website-dokter-klinik": {
    intro:
      "Kami menyesuaikan copy untuk intent pasien: cepat menemukan layanan, jadwal, dan kanal konsultasi. Untuk pemilik klinik, halaman ini menekankan trust, edukasi pasien, dan efisiensi komunikasi.",
    ctaLabel: "Bangun Website Klinik",
    finalCtaTitle: "Permudah Pasien Menemukan Klinik Anda Secara Online",
    finalCtaDescription:
      "Konsultasikan kebutuhan website klinik Anda untuk alur informasi pasien yang lebih jelas dan kredibel.",
    faqs: [
      {
        question: "Apakah bisa menampilkan jadwal dokter dan layanan unggulan?",
        answer:
          "Bisa. Struktur halaman dapat dirancang agar pasien cepat menemukan layanan, jadwal, dan prosedur pendaftaran.",
      },
      {
        question: "Apakah konten medis bisa disiapkan untuk edukasi SEO?",
        answer:
          "Bisa. Kami siapkan kerangka konten edukasi yang tetap ramah pembaca dan relevan dengan intent pencarian pasien.",
      },
    ],
  },
  "jasa-pembuatan-website-sekolah": {
    intro:
      "Intent utama halaman sekolah adalah informasi yang cepat diakses orang tua dan calon siswa. Karena itu copy difokuskan pada kejelasan program, agenda akademik, serta kanal komunikasi resmi.",
    ctaLabel: "Rancang Website Sekolah",
    finalCtaTitle: "Website Sekolah Informatif dan Mudah Dikelola Tim Internal",
    finalCtaDescription:
      "Kami bantu sekolah membangun website yang rapi untuk publikasi program, kegiatan, dan informasi penerimaan siswa.",
    faqs: [
      {
        question: "Apakah website bisa dikelola oleh staf sekolah setelah live?",
        answer:
          "Bisa. Kami menyiapkan struktur konten yang mudah diperbarui tanpa proses teknis rumit.",
      },
      {
        question: "Bisakah dibuat halaman khusus PPDB atau pendaftaran?",
        answer:
          "Bisa. Halaman PPDB dapat dioptimasi agar informasi syarat dan alur pendaftaran lebih jelas bagi orang tua.",
      },
    ],
  },
  "jasa-pembuatan-website-toko-online": {
    intro:
      "Copy halaman toko online disusun untuk intent transaksional: mempercepat user menemukan produk, memahami value, dan menyelesaikan pembelian dengan friksi minimal.",
    ctaLabel: "Optimalkan Toko Online Saya",
    finalCtaTitle: "Siap Dorong Penjualan dari Website Toko Online Anda?",
    finalCtaDescription:
      "Tim kami bantu merancang alur katalog, halaman produk, dan CTA checkout agar konversi penjualan meningkat.",
    faqs: [
      {
        question: "Apakah website toko online bisa diintegrasikan dengan pembayaran dan pengiriman?",
        answer:
          "Bisa. Integrasi disesuaikan dengan kebutuhan operasional agar proses order lebih cepat dan akurat.",
      },
      {
        question: "Bagaimana agar traffic tidak berhenti di halaman produk saja?",
        answer:
          "Kami mengoptimalkan copy, trust element, dan CTA pembelian agar user bergerak dari lihat produk ke aksi checkout.",
      },
    ],
  },
  "jasa-pembuatan-website-expedisi": {
    intro:
      "Halaman ini dipertajam untuk intent operasional logistik: calon klien ingin cek cakupan layanan, SLA pengiriman, dan cara request pickup secepat mungkin. Copy difokuskan agar inquiry B2B masuk dengan data yang siap ditindaklanjuti.",
    ctaLabel: "Bangun Website Expedisi",
    finalCtaTitle: "Siap Tingkatkan Inquiry Layanan Pengiriman Anda?",
    finalCtaDescription:
      "Kami bantu susun website expedisi dengan struktur layanan, area coverage, dan CTA request agar tim sales mendapatkan lead lebih relevan.",
    faqs: [
      {
        question: "Fitur apa yang paling penting untuk website jasa expedisi?",
        answer:
          "Yang paling berdampak biasanya cakupan area, simulasi layanan, kanal request cepat, dan informasi SLA agar calon klien bisa mengambil keputusan lebih cepat.",
      },
      {
        question: "Apakah bisa dibuat alur khusus untuk lead corporate?",
        answer:
          "Bisa. Kami dapat menambahkan alur formulir B2B dengan field kebutuhan pengiriman agar tim Anda menerima prospek dengan data awal yang lebih lengkap.",
      },
    ],
  },
  "jasa-pembuatan-website-komunitas-ngo": {
    intro:
      "Untuk NGO dan komunitas, intent pengunjung biasanya dua hal: memahami dampak program dan tahu bagaimana ikut berkontribusi. Karena itu copy kami menekankan kredibilitas program, transparansi aktivitas, dan CTA donasi/kolaborasi yang jelas.",
    ctaLabel: "Rancang Website NGO",
    finalCtaTitle: "Perkuat Kepercayaan Publik untuk Program Komunitas Anda",
    finalCtaDescription:
      "Kami bantu NGO membangun website yang informatif, mudah dikelola, dan punya alur aksi yang mendorong dukungan publik.",
    faqs: [
      {
        question: "Bagaimana website NGO bisa meningkatkan partisipasi publik?",
        answer:
          "Website perlu menampilkan program secara konkret, bukti dampak, dan CTA kontribusi yang jelas agar pengunjung tahu langkah aksi yang harus dilakukan.",
      },
      {
        question: "Apakah tim internal bisa update konten program secara mandiri?",
        answer:
          "Bisa. Struktur halaman dapat dibuat agar tim non-teknis tetap mudah mengelola update kegiatan, berita, dan agenda komunitas.",
      },
    ],
  },
  "jasa-pembuatan-website-konstruksi": {
    intro:
      "Halaman konstruksi kami arahkan untuk intent tender dan proyek B2B: visitor perlu melihat kapabilitas teknis, portofolio pekerjaan, serta cara menghubungi tim untuk diskusi scope proyek.",
    ctaLabel: "Bangun Website Konstruksi",
    finalCtaTitle: "Tampilkan Kapabilitas Proyek Anda Lebih Meyakinkan",
    finalCtaDescription:
      "Kami bantu perusahaan konstruksi menyusun website berbasis portofolio dan kredensial agar peluang tender dan partnership meningkat.",
    faqs: [
      {
        question: "Konten apa yang wajib ada di website konstruksi B2B?",
        answer:
          "Minimal profil perusahaan, portofolio proyek, sertifikasi, layanan inti, dan CTA diskusi proyek agar calon klien dapat melakukan evaluasi awal dengan cepat.",
      },
      {
        question: "Apakah website bisa diarahkan untuk kebutuhan tender?",
        answer:
          "Bisa. Kami menata struktur konten agar dokumen kapabilitas dan rekam jejak proyek mudah ditemukan oleh evaluator tender.",
      },
    ],
  },
  template: {
    intro:
      "Template kami posisikan untuk bisnis yang butuh go-live cepat tanpa mengorbankan fondasi SEO dan konversi. Ini bukan template generik, melainkan kerangka siap produksi yang bisa dipersonalisasi.",
    ctaLabel: "Pilih Template Terbaik",
    finalCtaTitle: "Go-Live Lebih Cepat dengan Template Siap Bisnis",
    finalCtaDescription:
      "Pilih template yang paling cocok dengan model bisnis Anda, lalu kami bantu adaptasi konten dan CTA agar tetap konversi-ready.",
    faqs: [
      {
        question: "Apakah template tetap bisa dikustomisasi sesuai brand?",
        answer:
          "Bisa. Identitas visual, struktur konten, dan CTA dapat disesuaikan agar selaras dengan positioning bisnis.",
      },
      {
        question: "Template cocok untuk tahap awal atau jangka panjang?",
        answer:
          "Keduanya. Template menjadi fondasi cepat saat awal, lalu bisa dikembangkan bertahap sesuai pertumbuhan bisnis.",
      },
    ],
  },
  portfolio: {
    intro:
      "Portfolio tidak hanya untuk pajangan visual. Copy halaman ini dipoles agar calon klien bisa menilai pendekatan kerja, relevansi hasil, dan potensi dampak bisnis dari proyek yang sudah pernah dikerjakan.",
    ctaLabel: "Diskusikan Proyek Serupa",
    finalCtaTitle: "Ingin Hasil Sejenis untuk Bisnis Anda?",
    finalCtaDescription:
      "Pilih referensi proyek yang paling dekat dengan kebutuhan Anda, lalu tim kami susun strategi implementasi yang realistis.",
    faqs: [
      {
        question: "Bagaimana membaca portfolio agar sesuai dengan kebutuhan bisnis saya?",
        answer:
          "Fokus pada kesamaan tujuan bisnis, kompleksitas fitur, dan model audience. Tim kami dapat membantu memetakan relevansinya untuk konteks Anda.",
      },
      {
        question: "Apakah hasil portfolio bisa dijadikan baseline estimasi proyek?",
        answer:
          "Bisa sebagai acuan awal. Estimasi final tetap disesuaikan dengan scope detail, timeline, dan kebutuhan integrasi aktual.",
      },
    ],
  },
  percetakan: {
    intro:
      "Halaman percetakan kami rewrite untuk intent komersial dengan titik fokus pada kepastian hasil cetak, timeline produksi, dan kontrol kualitas agar materi siap dipakai tanpa banyak revisi.",
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
    intro:
      "Untuk halaman cetak buku, kami menyesuaikan copy agar menjawab intent penulis dan institusi: pilihan metode cetak, efisiensi biaya per volume, serta kepastian kualitas hasil akhir.",
    ctaLabel: "Minta Simulasi Cetak Buku",
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
  software: {
    intro:
      "Halaman software kami arahkan ke intent decision-maker: meningkatkan efisiensi proses, menyatukan data, dan mempercepat pengambilan keputusan lewat sistem yang benar-benar dipakai tim.",
    ctaLabel: "Audit Kebutuhan Software",
    ctaLinks: [
      { label: "Audit Kebutuhan Software", href: DEFAULT_CTA },
      { label: "Minta Scope Modul Inti", href: DEFAULT_CTA },
      { label: "Lihat FAQ Implementasi", href: "#faq" },
      { label: "Jadwalkan Discovery Call", href: DEFAULT_CTA },
    ],
    finalCtaTitle: "Bangun Software yang Menyelesaikan Bottleneck Operasional",
    finalCtaDescription:
      "Kami bantu memetakan kebutuhan prioritas dan merancang roadmap software bertahap agar impact bisnis lebih cepat terasa.",
    faqs: [
      {
        question: "Apakah software custom selalu harus dimulai dari sistem besar?",
        answer:
          "Tidak. Kami biasanya memulai dari modul inti yang paling berdampak, lalu dikembangkan bertahap.",
      },
      {
        question: "Bagaimana memastikan software benar-benar dipakai tim internal?",
        answer:
          "Kami merancang alur berdasarkan proses kerja nyata dan menyiapkan fase adopsi agar transisi lebih mulus.",
      },
    ],
  },
  "pembuatan-software": {
    intro:
      "Copy halaman pembuatan software difokuskan pada intent eksekusi: requirement jelas, prioritas fitur inti, dan delivery iteratif agar bisnis tidak menunggu terlalu lama untuk melihat hasil.",
    ctaLabel: "Mulai Pembuatan Software",
    ctaLinks: [
      { label: "Mulai Discovery Software", href: DEFAULT_CTA },
      { label: "Minta Breakdown Fase", href: DEFAULT_CTA },
      { label: "Cek FAQ Pembuatan", href: "#faq" },
      { label: "Jadwalkan Kickoff", href: DEFAULT_CTA },
    ],
    finalCtaTitle: "Mulai dari Modul Inti, Rasakan Dampak Lebih Cepat",
    finalCtaDescription:
      "Diskusikan alur operasional bisnis Anda dan kami susun fase pengembangan software yang terukur.",
    faqs: [
      {
        question: "Berapa lama fase awal pembuatan software biasanya berjalan?",
        answer:
          "Tergantung scope, namun fase awal biasanya difokuskan pada modul inti yang memberi dampak operasional paling cepat.",
      },
      {
        question: "Apakah software bisa diintegrasikan ke sistem lama?",
        answer:
          "Bisa. Integrasi dirancang sejak awal agar perpindahan data dan proses tidak mengganggu operasional.",
      },
    ],
  },
  "implementasi-software": {
    intro:
      "Pada tahap implementasi, user intent utamanya adalah kelancaran go-live. Karena itu kami tekankan rencana transisi, training pengguna, dan monitoring awal supaya adopsi sistem lebih stabil.",
    ctaLabel: "Rencanakan Implementasi",
    ctaLinks: [
      { label: "Rencanakan Go-Live", href: DEFAULT_CTA },
      { label: "Minta Checklist Implementasi", href: DEFAULT_CTA },
      { label: "Lihat FAQ Go-Live", href: "#faq" },
      { label: "Diskusikan Training Tim", href: DEFAULT_CTA },
    ],
    finalCtaTitle: "Go-Live Lebih Terkontrol dengan Implementasi Terstruktur",
    finalCtaDescription:
      "Kami dampingi implementasi dari persiapan data hingga fase stabilisasi pasca go-live.",
    faqs: [
      {
        question: "Apa risiko terbesar saat implementasi software?",
        answer:
          "Biasanya ada di adopsi pengguna dan kesiapan data. Keduanya kami mitigasi lewat checklist transisi dan pelatihan.",
      },
      {
        question: "Apakah ada pendampingan setelah sistem live?",
        answer:
          "Ada. Fase pasca go-live digunakan untuk menangani isu prioritas dan menyempurnakan alur kerja.",
      },
    ],
  },
  "instalasi-software": {
    intro:
      "Untuk instalasi software, fokus copy kami adalah keamanan konfigurasi, verifikasi fungsi, dan kesiapan tim operasional agar software bisa langsung dipakai tanpa kebingungan.",
    ctaLabel: "Jadwalkan Instalasi",
    ctaLinks: [
      { label: "Jadwalkan Instalasi", href: DEFAULT_CTA },
      { label: "Minta Checklist Setup", href: DEFAULT_CTA },
      { label: "Lihat FAQ Instalasi", href: "#faq" },
      { label: "Diskusikan Handover Teknis", href: DEFAULT_CTA },
    ],
    finalCtaTitle: "Instalasi Software Aman, Tim Siap Pakai Sejak Hari Pertama",
    finalCtaDescription:
      "Kami bantu setup teknis, uji fungsional, dan handover agar sistem siap dipakai untuk operasional harian.",
    faqs: [
      {
        question: "Apakah instalasi mencakup pengujian setelah setup?",
        answer:
          "Ya. Setelah instalasi kami lakukan validasi fungsi utama untuk memastikan sistem berjalan sesuai kebutuhan.",
      },
      {
        question: "Apakah ada dokumentasi untuk tim internal?",
        answer:
          "Ada. Kami siapkan dokumentasi dan panduan singkat agar tim dapat mengoperasikan sistem dengan lebih percaya diri.",
      },
    ],
  },
  "sistem-pos": {
    primaryKeyword: "Software POS untuk Retail dan F&B",
    intro:
      "Halaman sistem POS ini dioptimalkan untuk intent pemilik outlet: transaksi cepat, stok akurat, dan laporan real-time untuk keputusan harian. Copy difokuskan pada hasil operasional, bukan sekadar fitur.",
    ctaLabel: "Konsultasi Sistem POS",
    ctaLinks: [
      { label: "Konsultasi Sistem POS", href: DEFAULT_CTA },
      { label: "Minta Demo Alur POS", href: DEFAULT_CTA },
      { label: "Lihat FAQ Operasional", href: "#faq" },
      { label: "Diskusikan Integrasi Outlet", href: DEFAULT_CTA },
    ],
    finalCtaTitle: "Siap Menyatukan Kasir, Stok, dan Laporan dalam Satu Sistem?",
    finalCtaDescription:
      "Kami bantu menyiapkan implementasi POS yang sesuai ritme operasional outlet Anda, dari setup hingga adopsi tim.",
    faqs: [
      {
        question: "Apakah sistem POS bisa dipakai untuk multi-cabang?",
        answer:
          "Bisa. Struktur data dapat disiapkan untuk pemantauan stok dan penjualan lintas outlet secara terpusat.",
      },
      {
        question: "Bagaimana jika internet di outlet tidak stabil?",
        answer:
          "Arsitektur POS dapat disesuaikan dengan kebutuhan operasional agar transaksi tetap aman dan sinkron saat koneksi tersedia.",
      },
    ],
  },
};

function uniqueKeywords(values: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    const normalized = value.trim();
    if (!normalized) continue;
    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(normalized);
  }
  return result;
}

function uniqueCtaLinks(values: Array<{ label: string; href: string }>) {
  const seen = new Set<string>();
  const result: Array<{ label: string; href: string }> = [];
  for (const item of values) {
    const label = item.label.trim();
    const href = item.href.trim();
    if (!label || !href) continue;
    const key = `${label.toLowerCase()}|||${href.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ label, href });
  }
  return result;
}

function enrichCopyForSeo(page: LegacyAstroPage, copy: LegacyRewriteCopy): LegacyRewriteCopy {
  const priorityOverride = PRIORITY_SLUG_OVERRIDES[page.slug] || {};
  const effectiveCopy: LegacyRewriteCopy = {
    ...copy,
    ...priorityOverride,
  };

  const semantic = SECTION_SEMANTIC_KEYWORDS[page.section] || [];
  const intentKeywords = SLUG_INTENT_KEYWORDS.filter((item) => item.match(page)).flatMap(
    (item) => item.keywords,
  );
  const derived = [
    `${effectiveCopy.primaryKeyword} profesional`,
    `${effectiveCopy.primaryKeyword} terpercaya`,
    `${effectiveCopy.primaryKeyword} untuk bisnis`,
    ...semantic,
    ...intentKeywords,
  ];

  const secondaryKeywords = uniqueKeywords([
    ...(effectiveCopy.secondaryKeywords || []),
    ...derived,
  ]).slice(0, 10);

  const description = effectiveCopy.description.includes("Kotacom")
    ? effectiveCopy.description
    : `${effectiveCopy.description} Didukung tim Kotacom dengan alur kerja terukur untuk hasil yang konsisten.`;

  const intro = /konversi|lead|operasional|produksi|efisiensi/i.test(effectiveCopy.intro)
    ? effectiveCopy.intro
    : `${effectiveCopy.intro} Fokus kami adalah memperkuat konversi, efisiensi operasional, dan kualitas implementasi jangka panjang.`;

  const extraFaqs = [
    {
      question: `Bagaimana estimasi biaya ${effectiveCopy.primaryKeyword.toLowerCase()} ditentukan?`,
      answer:
        "Biaya ditentukan dari ruang lingkup, kompleksitas eksekusi, target timeline, dan kebutuhan output akhir agar proposal lebih akurat.",
    },
    {
      question: "Apakah layanan bisa disesuaikan dengan kebutuhan bisnis spesifik?",
      answer:
        "Bisa. Tim kami menyesuaikan strategi, prioritas, dan deliverable agar implementasi tetap relevan dengan target bisnis Anda.",
    },
    ...SLUG_INTENT_FAQS.filter((item) => item.match(page)).flatMap((item) => item.faqs),
  ];
  const faqs = uniqueKeywords([
    ...(effectiveCopy.faqs || []).map((item) => `${item.question}|||${item.answer}`),
    ...extraFaqs.map((item) => `${item.question}|||${item.answer}`),
  ])
    .slice(0, 5)
    .map((item) => {
      const [question, answer] = item.split("|||");
      return { question, answer };
    });

  const longGuide =
    (effectiveCopy.longGuide && effectiveCopy.longGuide.length > 0)
      ? effectiveCopy.longGuide
      : SECTION_LONG_GUIDE_DEFAULT[page.section];

  const sectionDefaultCtas: Record<string, Array<{ label: string; href: string }>> = {
    "pembuatan-website": [
      { label: "Konsultasi Website", href: DEFAULT_CTA },
      { label: "Minta Estimasi Biaya", href: DEFAULT_CTA },
      { label: "Lihat Paket Layanan", href: "#paket" },
      { label: "Cek FAQ Implementasi", href: "#faq" },
      { label: "Jadwalkan Diskusi", href: DEFAULT_CTA },
    ],
    percetakan: [
      { label: "Konsultasi Spesifikasi Cetak", href: DEFAULT_CTA },
      { label: "Minta Simulasi Harga", href: DEFAULT_CTA },
      { label: "Lihat Paket Produksi", href: "#paket" },
      { label: "Cek Pertanyaan Umum", href: "#faq" },
      { label: "Mulai Proyek Cetak", href: DEFAULT_CTA },
    ],
    software: [
      { label: "Audit Kebutuhan Software", href: DEFAULT_CTA },
      { label: "Minta Scope Awal", href: DEFAULT_CTA },
      { label: "Lihat Opsi Paket", href: "#paket" },
      { label: "Cek FAQ Implementasi", href: "#faq" },
      { label: "Jadwalkan Discovery Call", href: DEFAULT_CTA },
    ],
    "sistem-pos": [
      { label: "Konsultasi Sistem POS", href: DEFAULT_CTA },
      { label: "Minta Demo Alur POS", href: DEFAULT_CTA },
      { label: "Lihat Paket POS", href: "#paket" },
      { label: "Cek FAQ POS", href: "#faq" },
      { label: "Diskusikan Integrasi Outlet", href: DEFAULT_CTA },
    ],
  };

  const ctaSeed = sectionDefaultCtas[page.section] || [
    { label: "Konsultasi Sekarang", href: DEFAULT_CTA },
    { label: "Minta Estimasi", href: DEFAULT_CTA },
    { label: "Lihat FAQ", href: "#faq" },
  ];
  const mergedCtaLinks = uniqueCtaLinks([...(effectiveCopy.ctaLinks || []), ...ctaSeed]).slice(0, 6);
  const defaultCtaLinks = mergedCtaLinks.length > 0 ? mergedCtaLinks : effectiveCopy.ctaLinks;

  const finalCtaTitle =
    effectiveCopy.finalCtaTitle || `Siap Optimalkan ${effectiveCopy.primaryKeyword}?`;
  const finalCtaDescription =
    effectiveCopy.finalCtaDescription ||
    `Diskusikan kebutuhan Anda bersama tim Kotacom untuk menyusun strategi implementasi yang realistis, terukur, dan berorientasi hasil bisnis. Respon awal kami fokus pada langkah eksekusi yang bisa langsung dijalankan.`;

  return {
    ...effectiveCopy,
    secondaryKeywords,
    description,
    intro,
    faqs,
    longGuide,
    ctaLinks: defaultCtaLinks,
    finalCtaTitle,
    finalCtaDescription,
  };
}

function titleCaseFromSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildGenericCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const keyword = page.title;

  return {
    primaryKeyword: keyword,
    secondaryKeywords: [
      `${keyword} profesional`,
      `${keyword} terpercaya`,
      `${keyword} Indonesia`,
    ],
    description: `${keyword} untuk bisnis yang butuh hasil cepat, terukur, dan siap scale dengan alur pengerjaan yang jelas.`,
    intro: `${keyword} difokuskan untuk mendukung pertumbuhan bisnis lewat eksekusi yang rapi, komunikasi jelas, dan hasil yang relevan dengan target market.`,
    highlights: [
      "Scope pekerjaan jelas sejak awal.",
      "Timeline produksi terstruktur.",
      "Kualitas output dipantau dengan QA internal.",
      "Handover dan support pasca-launch tersedia.",
    ],
    process: [
      "Discovery dan pemetaan kebutuhan.",
      "Penyusunan solusi, estimasi, dan prioritas kerja.",
      "Produksi bertahap dengan review berkala.",
      "QA, handover, dan optimasi lanjutan.",
    ],
    faqs: [
      {
        question: `Berapa lama proses ${keyword.toLowerCase()}?`,
        answer:
          "Durasi menyesuaikan kompleksitas. Setelah scope final, timeline disepakati di awal agar delivery tetap terukur.",
      },
      {
        question: "Apakah bisa menyesuaikan kebutuhan khusus?",
        answer:
          "Bisa. Kebutuhan bisnis, brand guideline, dan alur operasional akan jadi dasar solusi agar implementasi relevan.",
      },
    ],
    ctaLabel: "Konsultasi Sekarang",
    ctaHref: DEFAULT_CTA,
  };
}

function buildWebsiteCityCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const city = titleCaseFromSlug(page.slug);
  const primaryKeyword = `Jasa Pembuatan Website ${city}`;

  return {
    primaryKeyword,
    secondaryKeywords: [
      `Pembuatan website ${city}`,
      `Website company profile ${city}`,
      `Jasa web profesional ${city}`,
      `Pembuatan landing page ${city}`,
    ],
    description: `${primaryKeyword} untuk bisnis lokal dengan struktur halaman yang rapi, cepat diakses, dan siap dipakai untuk lead generation.`,
    intro: `Kami membantu bisnis di ${city} membangun website yang fokus ke konversi, kecepatan, dan kredibilitas brand agar lebih mudah menangkap peluang dari traffic organik maupun iklan.`,
    highlights: [
      "Arsitektur halaman dibuat sesuai intent pencarian.",
      "Optimasi performa dan struktur SEO on-page sejak awal.",
      "Komponen konten reusable agar update lebih cepat.",
      "CTA dan alur kontak dioptimalkan untuk lead.",
    ],
    process: [
      "Audit kebutuhan bisnis dan kompetitor lokal.",
      "Penyusunan struktur halaman dan copy framework.",
      "Implementasi UI, konten, dan optimasi teknis.",
      "Go-live, monitoring, dan iterasi konversi.",
    ],
    faqs: [
      {
        question: `Apakah layanan ini khusus untuk bisnis di ${city}?`,
        answer:
          "Utamanya untuk kebutuhan pasar lokal, tetapi dapat disesuaikan untuk target nasional dengan pendekatan konten yang berbeda.",
      },
      {
        question: "Apakah website sudah siap SEO dari awal?",
        answer:
          "Ya. Struktur heading, metadata, internal linking, dan kecepatan halaman disiapkan dari tahap build.",
      },
    ],
    ctaLabel: `Konsultasi Website ${city}`,
    ctaHref: DEFAULT_CTA,
  };
}

function buildWebsiteIndexCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Jasa Pembuatan Website",
    secondaryKeywords: [
      "Jasa pembuatan website profesional",
      "Pembuatan website bisnis",
      "Website company profile",
      "Website siap SEO",
      "Jasa web developer Indonesia",
    ],
    description:
      "Jasa pembuatan website untuk bisnis yang membutuhkan tampilan kredibel, performa cepat, dan struktur SEO yang siap dikembangkan.",
    intro:
      "Kami membantu bisnis membangun website yang tidak hanya menarik secara visual, tetapi juga siap mendukung traffic organik, campaign iklan, dan konversi lead.",
    highlights: [
      "Struktur halaman disusun berdasarkan intent pencarian.",
      "Desain dan copy diarahkan untuk meningkatkan konversi.",
      "Optimasi performa, metadata, dan internal linking sejak awal.",
      "Website mudah dikembangkan untuk kebutuhan jangka panjang.",
    ],
    process: [
      "Audit tujuan bisnis, audience, dan positioning layanan.",
      "Penyusunan arsitektur halaman serta keyword mapping.",
      "Eksekusi desain, development, dan QA teknis.",
      "Launch, monitoring performa, dan iterasi konversi.",
    ],
    faqs: [
      {
        question: "Apakah website bisa dikembangkan bertahap?",
        answer:
          "Bisa. Kami menyusun fondasi yang fleksibel agar fitur dan konten baru dapat ditambahkan tanpa mengulang dari awal.",
      },
      {
        question: "Apakah website sudah siap untuk SEO dan iklan?",
        answer:
          "Ya. Struktur teknis, kecepatan, metadata, dan alur CTA disiapkan agar mendukung akuisisi dari organik maupun paid traffic.",
      },
    ],
    ctaLabel: "Mulai Proyek Website",
    ctaHref: DEFAULT_CTA,
  };
}

function buildWebsiteServiceCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const serviceName = titleCaseFromSlug(page.slug);
  const primaryKeyword = `Jasa ${serviceName}`;

  const presets: Record<string, Partial<LegacyRewriteCopy>> = {
    harga: {
      primaryKeyword: "Harga Jasa Pembuatan Website",
      secondaryKeywords: [
        "Biaya pembuatan website",
        "Paket website bisnis",
        "Harga website company profile",
        "Estimasi biaya web profesional",
      ],
      description:
        "Informasi harga jasa pembuatan website yang transparan, dengan paket fleksibel sesuai kebutuhan bisnis dan target pertumbuhan.",
      intro:
        "Halaman ini membantu Anda memahami komponen biaya website, scope pekerjaan, dan opsi paket agar keputusan investasi digital lebih terukur.",
      ctaLabel: "Minta Estimasi Harga",
    },
    "jasa-migrasi-wordpress": {
      primaryKeyword: "Jasa Migrasi WordPress",
      secondaryKeywords: [
        "Migrasi website WordPress",
        "Pindah hosting WordPress aman",
        "Migrasi konten dan database",
        "Optimasi WordPress pasca migrasi",
      ],
      description:
        "Jasa migrasi WordPress aman untuk memindahkan situs, database, dan aset tanpa mengganggu performa dan visibilitas SEO.",
      intro:
        "Kami menangani proses migrasi WordPress end-to-end mulai dari backup, transfer, validasi fungsi, sampai optimasi pasca pindah server/platform.",
      ctaLabel: "Konsultasi Migrasi WordPress",
    },
    "jasa-pembuatan-website-company-profile": {
      primaryKeyword: "Jasa Pembuatan Website Company Profile",
      secondaryKeywords: [
        "Website company profile profesional",
        "Website profil perusahaan",
        "Web branding bisnis",
        "Pembuatan website corporate",
      ],
      description:
        "Jasa pembuatan website company profile untuk memperkuat kredibilitas brand, memperjelas layanan, dan mendukung akuisisi klien.",
      intro:
        "Kami menyusun website company profile dengan struktur konten yang jelas agar calon klien cepat memahami value perusahaan Anda.",
      ctaLabel: "Buat Website Company Profile",
    },
    "jasa-pembuatan-website-dokter-klinik": {
      primaryKeyword: "Jasa Pembuatan Website Dokter Klinik",
      secondaryKeywords: [
        "Website klinik profesional",
        "Website praktik dokter",
        "Website layanan kesehatan",
        "Website klinik siap SEO",
      ],
      description:
        "Jasa pembuatan website dokter dan klinik untuk meningkatkan kredibilitas layanan kesehatan dan memudahkan pasien menemukan informasi penting.",
      intro:
        "Kami membantu klinik dan praktik dokter membangun website informatif, terpercaya, dan mudah diakses untuk mendukung akuisisi pasien.",
      ctaLabel: "Konsultasi Website Klinik",
    },
    "jasa-pembuatan-website-expedisi": {
      primaryKeyword: "Jasa Pembuatan Website Expedisi",
      secondaryKeywords: [
        "Website perusahaan ekspedisi",
        "Website logistik profesional",
        "Website jasa pengiriman",
        "Website tracking layanan",
      ],
      description:
        "Jasa pembuatan website expedisi untuk menampilkan layanan pengiriman, area cakupan, dan keunggulan operasional secara jelas.",
      intro:
        "Website expedisi kami rancang agar pelanggan mudah memahami layanan, biaya, dan proses pengiriman sehingga meningkatkan konversi inquiry.",
      ctaLabel: "Bangun Website Expedisi",
    },
    "jasa-pembuatan-website-komunitas-ngo": {
      primaryKeyword: "Jasa Pembuatan Website Komunitas NGO",
      secondaryKeywords: [
        "Website NGO profesional",
        "Website organisasi sosial",
        "Website komunitas nirlaba",
        "Website kampanye sosial",
      ],
      description:
        "Jasa pembuatan website komunitas dan NGO untuk memperkuat komunikasi program, kredibilitas organisasi, dan dukungan publik.",
      intro:
        "Kami membantu NGO dan komunitas membangun website yang mudah dikelola untuk publikasi program, transparansi kegiatan, dan penguatan engagement.",
      ctaLabel: "Konsultasi Website NGO",
    },
    "jasa-pembuatan-website-konstruksi": {
      primaryKeyword: "Jasa Pembuatan Website Konstruksi",
      secondaryKeywords: [
        "Website perusahaan konstruksi",
        "Website kontraktor profesional",
        "Website portofolio proyek konstruksi",
        "Website tender dan layanan konstruksi",
      ],
      description:
        "Jasa pembuatan website konstruksi untuk menampilkan portofolio proyek, kompetensi teknis, dan kredibilitas perusahaan secara profesional.",
      intro:
        "Website konstruksi kami fokuskan pada penyajian portofolio proyek, layanan inti, dan keunggulan perusahaan agar mendukung peluang tender maupun klien baru.",
      ctaLabel: "Buat Website Konstruksi",
    },
    "jasa-pembuatan-website-sekolah": {
      primaryKeyword: "Jasa Pembuatan Website Sekolah",
      secondaryKeywords: [
        "Website sekolah modern",
        "Website pendidikan profesional",
        "Website informasi akademik",
        "Website profil sekolah",
      ],
      description:
        "Jasa pembuatan website sekolah untuk menyajikan profil institusi, informasi akademik, dan komunikasi orang tua-siswa secara terstruktur.",
      intro:
        "Kami membantu sekolah membangun website yang informatif dan mudah diakses agar komunikasi institusi, publikasi kegiatan, dan branding pendidikan lebih efektif.",
      ctaLabel: "Konsultasi Website Sekolah",
    },
    "jasa-pembuatan-website-toko-online": {
      primaryKeyword: "Jasa Pembuatan Website Toko Online",
      secondaryKeywords: [
        "Website e-commerce custom",
        "Website toko online profesional",
        "Pembuatan website jualan online",
        "Website katalog produk",
      ],
      description:
        "Jasa pembuatan website toko online untuk bisnis yang ingin meningkatkan penjualan dengan pengalaman belanja yang cepat dan terpercaya.",
      intro:
        "Website toko online kami rancang untuk memudahkan pelanggan menemukan produk, memahami keunggulan, dan melakukan transaksi dengan nyaman.",
      ctaLabel: "Bangun Website Toko Online",
    },
    template: {
      primaryKeyword: "Template Website Siap Pakai",
      secondaryKeywords: [
        "Template website bisnis",
        "Desain website profesional",
        "Template landing page",
        "Template company profile",
      ],
      description:
        "Template website siap pakai untuk mempercepat proses go-live bisnis tanpa mengorbankan kualitas struktur dan tampilan.",
      intro:
        "Kami menyediakan opsi template website untuk bisnis yang membutuhkan implementasi cepat dengan fondasi desain dan konten yang tetap profesional.",
      ctaLabel: "Pilih Template Website",
    },
    portfolio: {
      primaryKeyword: "Portfolio Website Kotacom",
      secondaryKeywords: [
        "Portofolio pembuatan website",
        "Contoh website bisnis",
        "Hasil proyek website",
        "Referensi desain website profesional",
      ],
      description:
        "Portfolio pembuatan website Kotacom berisi contoh implementasi untuk berbagai industri, dengan fokus hasil bisnis dan kualitas eksekusi.",
      intro:
        "Halaman portfolio ini menampilkan contoh pendekatan desain, struktur konten, dan strategi implementasi website yang telah kami kerjakan.",
      ctaLabel: "Diskusikan Proyek Website Anda",
    },
  };

  return {
    ...buildGenericCopy(page),
    primaryKeyword,
    secondaryKeywords: [
      `${serviceName} profesional`,
      `${serviceName} untuk bisnis`,
      `${serviceName} terpercaya`,
      `${serviceName} Indonesia`,
    ],
    description: `${primaryKeyword} dengan pendekatan strategis untuk kebutuhan bisnis yang membutuhkan website terstruktur, cepat, dan siap scale.`,
    intro: `${primaryKeyword} kami dirancang agar website tidak hanya terlihat baik, tetapi juga mendukung akuisisi lead dan kredibilitas brand.`,
    ctaLabel: `Konsultasi ${serviceName}`,
    ...presets[page.slug],
    ctaHref: DEFAULT_CTA,
  };
}

function buildPrintingCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const service = page.title;
  const primaryKeyword = page.route === "/percetakan" ? "Jasa Percetakan" : `Jasa ${service}`;

  if (page.route === "/percetakan") {
    return {
      primaryKeyword,
      secondaryKeywords: [
        "Jasa percetakan cepat dan presisi",
        "Percetakan untuk UMKM dan perusahaan",
        "Cetak promosi dan corporate",
        "Percetakan Surabaya dan nasional",
        "Jasa cetak custom sesuai kebutuhan",
      ],
      description:
        "Jasa percetakan untuk kebutuhan promosi, branding, dan materi operasional bisnis dengan alur produksi terukur, kualitas stabil, dan pengiriman nasional.",
      intro:
        "Kami membantu bisnis mengeksekusi kebutuhan cetak dari tahap konsultasi spesifikasi, pengecekan file desain, produksi, quality control, hingga pengiriman. Fokus kami adalah hasil yang rapi, tepat waktu, dan siap dipakai untuk aktivitas pemasaran maupun operasional.",
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
    };
  }

  return {
    primaryKeyword,
    secondaryKeywords: [
      `${service} berkualitas`,
      `${service} cepat`,
      `${service} untuk bisnis`,
      `${service} custom`,
    ],
    description: `${primaryKeyword} untuk kebutuhan promosi dan branding dengan hasil cetak konsisten, material jelas, serta proses produksi terukur.`,
    intro: `${service} kami dirancang untuk membantu bisnis menjaga kualitas materi promosi dan dokumen brand dengan hasil akhir yang presisi serta siap distribusi.`,
    highlights: [
      "Pilihan material dan finishing transparan.",
      "Kontrol kualitas sebelum final produksi.",
      "Format file dipastikan aman untuk cetak.",
      "Dukungan konsultasi desain dan layout.",
    ],
    process: [
      "Validasi kebutuhan, ukuran, dan material.",
      "Pemeriksaan file desain pre-press.",
      "Produksi dan quality check internal.",
      "Finalisasi, packing, dan pengiriman.",
    ],
    faqs: [
      {
        question: "Apakah bisa bantu pengecekan file desain?",
        answer:
          "Bisa. Tim akan mengecek ukuran, bleed, dan kualitas aset agar aman sebelum masuk produksi.",
      },
      {
        question: "Apakah tersedia opsi custom spesifikasi?",
        answer:
          "Tersedia. Spesifikasi material, jumlah, dan finishing dapat disesuaikan dengan kebutuhan kampanye Anda.",
      },
    ],
    ctaLabel: page.route === "/percetakan" ? "Konsultasi Layanan Percetakan" : "Diskusikan Kebutuhan Cetak",
    ctaHref: DEFAULT_CTA,
  };
}

function buildPrintingDetailCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const presets: Record<string, Partial<LegacyRewriteCopy>> = {
    "cetak-buku": {
      primaryKeyword: "Jasa Cetak Buku Profesional",
      secondaryKeywords: [
        "Cetak buku satuan dan massal",
        "Percetakan buku untuk penulis",
        "Cetak buku untuk lembaga dan sekolah",
        "Print on demand buku",
        "Jasa cetak buku cepat dan rapi",
      ],
      description:
        "Jasa cetak buku profesional untuk penulis, komunitas, sekolah, dan perusahaan dengan opsi produksi satuan hingga massal serta pengiriman nasional.",
      intro:
        "Kami menangani cetak buku dari kebutuhan penulis indie sampai lembaga pendidikan. Anda bisa mulai dari jumlah kecil (POD) atau produksi skala besar, dengan pendampingan teknis agar hasil akhir tetap rapi, presisi, dan sesuai tujuan terbit.",
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
          title: "Checklist Sebelum File Naik Produksi",
          description:
            "Pastikan ukuran final, bleed, margin aman, resolusi gambar, dan konsistensi font sudah benar. Untuk isi buku, gunakan PDF siap cetak. Checklist ini sangat krusial untuk menurunkan risiko revisi dan mencegah keterlambatan saat proses produksi.",
        },
      ],
      finalCtaTitle: "Punya Naskah dan Siap Terbit?",
      finalCtaDescription:
        "Kirim detail naskah Anda. Kami bantu hitung estimasi paling efisien sesuai jumlah, spesifikasi, dan target deadline.",
      ctaLabel: "Minta Penawaran Cetak Buku",
      ctaLinks: [
        { label: "Hubungi Kami Sekarang", href: DEFAULT_CTA },
        { label: "Tanya di Sini", href: DEFAULT_CTA },
        { label: "Minta Penawaran Akurat di Sini", href: DEFAULT_CTA },
        { label: "Chat & Cetak Sekarang", href: DEFAULT_CTA },
      ],
    },
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
    "cetak-brosur": {
      primaryKeyword: "Jasa Cetak Brosur",
      secondaryKeywords: [
        "Cetak brosur promosi",
        "Brosur company profile",
        "Desain dan cetak brosur",
        "Percetakan brosur bisnis",
      ],
      description:
        "Jasa cetak brosur profesional untuk promosi produk dan layanan dengan kualitas cetak konsisten serta pilihan material fleksibel.",
      intro:
        "Kami membantu cetak brosur yang informatif dan menarik agar pesan promosi bisnis tersampaikan lebih efektif kepada target audiens.",
      ctaLabel: "Konsultasi Cetak Brosur",
    },
    "cetak-company-profile": {
      primaryKeyword: "Jasa Cetak Company Profile",
      secondaryKeywords: [
        "Cetak profil perusahaan",
        "Buku company profile",
        "Company profile premium",
        "Percetakan corporate profile",
      ],
      description:
        "Jasa cetak company profile untuk memperkuat citra profesional perusahaan melalui materi presentasi brand yang rapi dan berkualitas.",
      intro:
        "Kami menyiapkan cetak company profile dengan struktur material dan finishing yang mendukung kebutuhan presentasi bisnis dan tender.",
      ctaLabel: "Diskusi Company Profile",
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
  };

  if (presets[page.slug]) {
    return {
      ...buildPrintingCopy(page),
      ...presets[page.slug],
      ctaHref: DEFAULT_CTA,
    };
  }

  if (page.sourceFile.includes("percetakan/cetak-kalender/[kota]")) {
    const city = titleCaseFromSlug(page.slug);
    return {
      ...buildPrintingCopy(page),
      primaryKeyword: `Jasa Cetak Kalender ${city}`,
      secondaryKeywords: [
        `Cetak kalender ${city}`,
        `Percetakan kalender ${city}`,
        `Kalender promosi ${city}`,
        `Cetak kalender custom ${city}`,
      ],
      description: `Jasa cetak kalender ${city} untuk kebutuhan promosi brand, corporate gift, dan media pemasaran tahunan dengan kualitas cetak rapi serta timeline produksi terukur.`,
      intro: `Kami membantu bisnis di ${city} memproduksi kalender promosi yang relevan untuk branding tahunan, lengkap dengan opsi material, finishing, dan kuantitas yang fleksibel.`,
      highlights: [
        "Layout kalender disesuaikan untuk branding bisnis.",
        "Pilihan model dinding, meja, dan custom ukuran.",
        "Kontrol warna agar visual brand tetap konsisten.",
        "Estimasi produksi dan pengiriman terukur.",
      ],
      faqs: [
        {
          question: `Apakah bisa cetak kalender custom untuk area ${city}?`,
          answer:
            "Bisa. Kami dapat menyesuaikan desain, ukuran, dan kebutuhan kuantitas untuk distribusi lokal maupun nasional.",
        },
        {
          question: "Apakah bisa sekalian dibantu finalisasi desain?",
          answer:
            "Bisa. Kami bantu pengecekan dan penyesuaian file agar siap produksi dengan hasil cetak optimal.",
        },
      ],
      ctaLabel: `Konsultasi Cetak Kalender ${city}`,
    };
  }

  if (page.slug.includes("kalender")) {
    return {
      ...buildPrintingCopy(page),
      primaryKeyword: `Jasa ${page.title}`,
      secondaryKeywords: [
        "Cetak kalender custom",
        "Cetak kalender promosi",
        "Cetak kalender perusahaan",
        "Desain kalender bisnis",
      ],
      description:
        "Jasa cetak kalender custom untuk kebutuhan promosi dan branding perusahaan dengan hasil cetak rapi serta jadwal produksi terukur.",
      intro:
        "Kami membantu produksi kalender promosi dari tahap penyiapan desain hingga finishing, sehingga materi promosi siap distribusi tepat waktu.",
      ctaLabel: "Konsultasi Cetak Kalender",
    };
  }

  if (page.slug.includes("buku") || page.slug.includes("quran")) {
    return {
      ...buildPrintingCopy(page),
      primaryKeyword: `Jasa ${page.title}`,
      secondaryKeywords: [
        `${page.title} berkualitas`,
        "Cetak buku custom",
        "Finishing buku premium",
        "Produksi buku skala bisnis",
      ],
      description: `Jasa ${page.title.toLowerCase()} dengan standar produksi stabil untuk kebutuhan buku komersial, edukasi, maupun publikasi brand.`,
      intro: `Layanan ${page.title.toLowerCase()} kami fokus pada ketelitian hasil akhir, konsistensi warna, dan ketepatan finishing agar buku siap dipasarkan.`,
      ctaLabel: "Diskusi Proyek Cetak Buku",
    };
  }

  return buildPrintingCopy(page);
}

function buildSoftwareCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const title = page.title;
  const primaryKeyword =
    page.route === "/software" ? "Jasa Pengembangan Software" : `Pengembangan ${title}`;

  return {
    primaryKeyword,
    secondaryKeywords:
      page.route === "/software"
        ? [
            "Software custom untuk bisnis",
            "Pengembangan aplikasi internal",
            "Sistem operasional terintegrasi",
            "Jasa software house Indonesia",
          ]
        : [
            `${title} custom`,
            `${title} untuk operasional`,
            "Software bisnis terintegrasi",
            "Aplikasi internal perusahaan",
          ],
    description: `${primaryKeyword} untuk meningkatkan efisiensi operasional, visibilitas data, dan kecepatan eksekusi tim.`,
    intro: `Kami membangun ${title.toLowerCase()} dengan pendekatan produk: requirement jelas, prioritas fitur terukur, dan implementasi bertahap agar cepat memberi dampak bisnis.`,
    highlights: [
      "Desain fitur berdasarkan alur kerja nyata tim.",
      "Skema data disiapkan agar mudah dikembangkan.",
      "Dashboard dan reporting fokus keputusan bisnis.",
      "Integrasi bertahap tanpa ganggu operasi berjalan.",
    ],
    process: [
      "Discovery proses bisnis dan bottleneck utama.",
      "Prioritas modul inti (MVP) untuk nilai tercepat.",
      "Pengembangan iteratif dengan demo berkala.",
      "Handover, dokumentasi, dan rencana scale-up.",
    ],
    faqs: [
      {
        question: "Apakah bisa integrasi dengan tools yang sudah dipakai?",
        answer:
          "Bisa. Integrasi direncanakan dari awal agar data flow tetap konsisten dan minim pekerjaan manual.",
      },
      {
        question: "Bagaimana pendekatan agar proyek tidak molor?",
        answer:
          "Scope dipecah per fase dengan indikator hasil yang jelas, sehingga prioritas dan delivery lebih terkontrol.",
      },
    ],
    ctaLabel: page.route === "/software" ? "Diskusi Pengembangan Software" : "Konsultasi Kebutuhan Software",
    ctaHref: DEFAULT_CTA,
  };
}

function buildSoftwareDetailCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const presets: Record<string, Partial<LegacyRewriteCopy>> = {
    "implementasi-software": {
      primaryKeyword: "Implementasi Software Bisnis",
      secondaryKeywords: [
        "Implementasi sistem bisnis",
        "Deployment software perusahaan",
        "Go-live aplikasi internal",
        "Pendampingan adopsi software",
      ],
      description:
        "Layanan implementasi software bisnis agar sistem baru dapat diadopsi cepat, stabil, dan minim gangguan operasional.",
      ctaLabel: "Konsultasi Implementasi",
    },
    "instalasi-software": {
      primaryKeyword: "Instalasi Software Perusahaan",
      secondaryKeywords: [
        "Instalasi aplikasi bisnis",
        "Konfigurasi software operasional",
        "Setup sistem perusahaan",
        "Instalasi software aman",
      ],
      description:
        "Jasa instalasi software perusahaan dengan proses konfigurasi terstruktur, validasi teknis, dan dokumentasi handover.",
      ctaLabel: "Jadwalkan Instalasi",
    },
    "pembuatan-software": {
      primaryKeyword: "Jasa Pembuatan Software Custom",
      secondaryKeywords: [
        "Pengembangan software custom",
        "Aplikasi bisnis sesuai workflow",
        "Sistem internal perusahaan",
        "Software operasional terintegrasi",
      ],
      description:
        "Jasa pembuatan software custom untuk bisnis yang membutuhkan sistem sesuai alur kerja internal dan target pertumbuhan.",
      ctaLabel: "Mulai Proyek Software",
    },
  };

  return { ...buildSoftwareCopy(page), ...(presets[page.slug] || {}) };
}

function buildLayananCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Layanan Digital untuk Bisnis",
    secondaryKeywords: [
      "Jasa pembuatan website dan software",
      "Layanan percetakan bisnis",
      "Partner digital untuk UMKM",
      "Solusi operasional dan branding",
    ],
    description:
      "Layanan digital terintegrasi untuk bisnis yang ingin mempercepat akuisisi pelanggan, eksekusi operasional, dan penguatan brand.",
    intro:
      "Kami menggabungkan website, software, dan kebutuhan cetak dalam satu alur kerja yang terukur sehingga tim Anda bisa fokus pada pertumbuhan bisnis.",
    highlights: [
      "Satu partner untuk web, software, dan materi cetak.",
      "Roadmap implementasi disusun berdasarkan prioritas bisnis.",
      "Scope, timeline, dan output dikelola transparan.",
      "Optimasi berkelanjutan setelah implementasi awal.",
    ],
    process: [
      "Audit kebutuhan bisnis dan target pertumbuhan.",
      "Pemetaan layanan prioritas untuk dampak tercepat.",
      "Eksekusi bertahap dengan review hasil berkala.",
      "Evaluasi performa dan iterasi lanjutan.",
    ],
    faqs: [
      {
        question: "Apakah bisa mulai dari satu layanan dulu?",
        answer:
          "Bisa. Implementasi bisa dimulai dari kebutuhan paling mendesak lalu dikembangkan bertahap ke layanan lain.",
      },
      {
        question: "Bagaimana memastikan layanan tetap selaras dengan tujuan bisnis?",
        answer:
          "Setiap fase memiliki KPI dan checkpoint evaluasi agar output tetap relevan dengan target yang disepakati.",
      },
    ],
    ctaLabel: "Diskusikan Kebutuhan Bisnis",
    ctaHref: DEFAULT_CTA,
  };
}

function buildAboutCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Tentang Kotacom",
    secondaryKeywords: [
      "Profil perusahaan digital",
      "Tim pengembangan website dan software",
      "Partner transformasi bisnis",
      "Layanan teknologi dan percetakan",
    ],
    description:
      "Profil Kotacom sebagai partner implementasi website, software, dan percetakan untuk bisnis yang ingin tumbuh lebih terstruktur.",
    intro:
      "Kami membantu bisnis membangun fondasi digital yang lebih rapi melalui eksekusi terukur, kolaborasi transparan, dan fokus pada hasil yang bisa dipertanggungjawabkan.",
    highlights: [
      "Pendekatan berbasis kebutuhan nyata operasional bisnis.",
      "Tim lintas fungsi untuk desain, teknologi, dan produksi.",
      "Standar kerja dengan kontrol kualitas di setiap fase.",
      "Kemitraan jangka panjang, bukan sekadar vendor proyek.",
    ],
    process: [
      "Memahami konteks bisnis, pasar, dan tujuan klien.",
      "Menyusun strategi implementasi yang realistis.",
      "Menjalankan produksi dengan indikator hasil jelas.",
      "Menyediakan evaluasi dan peningkatan berkelanjutan.",
    ],
    faqs: [
      {
        question: "Layanan utama apa yang ditangani Kotacom?",
        answer:
          "Fokus utama kami mencakup pembuatan website, pengembangan software, dan solusi percetakan untuk kebutuhan bisnis.",
      },
      {
        question: "Apakah Kotacom menangani proyek jangka panjang?",
        answer:
          "Ya. Kami mendukung model kolaborasi berkelanjutan untuk memastikan aset digital terus berkembang.",
      },
    ],
    ctaLabel: "Diskusi Dengan Tim",
    ctaHref: DEFAULT_CTA,
  };
}

function buildAboutStatementCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "AI Statement Kotacom",
    secondaryKeywords: [
      "Kebijakan AI perusahaan",
      "Pemanfaatan AI yang bertanggung jawab",
      "Transparansi penggunaan AI",
      "Etika AI dalam layanan digital",
    ],
    description:
      "AI Statement Kotacom menjelaskan prinsip penggunaan AI secara bertanggung jawab, transparan, dan tetap berorientasi kualitas layanan.",
    intro:
      "Kami menggunakan AI untuk meningkatkan efisiensi kerja, namun keputusan strategis, kontrol mutu, dan akuntabilitas tetap berada pada tim profesional kami.",
    highlights: [
      "AI digunakan sebagai akselerator, bukan pengganti tanggung jawab tim.",
      "Output AI melalui review manusia sebelum dipublikasikan.",
      "Privasi data klien tetap dijaga dengan kebijakan internal.",
      "Pemanfaatan AI selalu disesuaikan konteks bisnis klien.",
    ],
    process: [
      "Menentukan area kerja yang relevan untuk dukungan AI.",
      "Menerapkan review manusia pada output kritikal.",
      "Validasi kualitas dan konsistensi brand.",
      "Penyempurnaan praktik AI berdasarkan evaluasi berkala.",
    ],
    faqs: [
      {
        question: "Apakah seluruh pekerjaan dibuat otomatis oleh AI?",
        answer:
          "Tidak. AI membantu efisiensi, sementara perencanaan, validasi, dan keputusan akhir tetap dikelola tim kami.",
      },
      {
        question: "Bagaimana keamanan data saat AI digunakan?",
        answer:
          "Kami menerapkan kebijakan internal untuk menjaga kerahasiaan data dan membatasi penggunaan data sesuai kebutuhan layanan.",
      },
    ],
    ctaLabel: "Diskusikan Standar Kerja",
    ctaHref: DEFAULT_CTA,
  };
}

function buildContactCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Kontak Kotacom",
    secondaryKeywords: [
      "Konsultasi pembuatan website",
      "Konsultasi pengembangan software",
      "Konsultasi layanan percetakan",
      "Hubungi tim digital partner",
    ],
    description:
      "Hubungi tim Kotacom untuk konsultasi proyek website, software, dan percetakan yang disesuaikan dengan target bisnis Anda.",
    intro:
      "Sampaikan kebutuhan Anda, dan kami bantu memetakan solusi, prioritas implementasi, serta estimasi eksekusi agar keputusan bisnis lebih cepat.",
    highlights: [
      "Respon konsultasi fokus pada kebutuhan inti bisnis.",
      "Arah solusi disertai rekomendasi prioritas kerja.",
      "Estimasi timeline dan scope disampaikan jelas.",
      "Komunikasi proyek terstruktur dari awal.",
    ],
    process: [
      "Isi kebutuhan bisnis dan target utama proyek.",
      "Tim melakukan asesmen awal dan klarifikasi kebutuhan.",
      "Rekomendasi solusi dan estimasi disiapkan.",
      "Kickoff eksekusi sesuai prioritas yang disepakati.",
    ],
    faqs: [
      {
        question: "Apakah konsultasi awal berbayar?",
        answer:
          "Konsultasi awal dilakukan untuk memahami kebutuhan dan menentukan pendekatan terbaik sebelum fase implementasi.",
      },
      {
        question: "Berapa cepat tim merespons permintaan?",
        answer:
          "Permintaan akan diproses secepat mungkin pada jam kerja, dilanjutkan dengan langkah asesmen kebutuhan.",
      },
    ],
    ctaLabel: "Hubungi Tim",
    ctaHref: "/contact",
  };
}

function buildPrivacyCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Kebijakan Privasi Kotacom",
    secondaryKeywords: [
      "Perlindungan data pengguna",
      "Kebijakan privasi website",
      "Pengelolaan data pelanggan",
      "Keamanan informasi digital",
    ],
    description:
      "Kebijakan privasi Kotacom yang menjelaskan pengumpulan, penggunaan, dan perlindungan data pengguna secara transparan.",
    intro:
      "Kami berkomitmen menjaga kerahasiaan data pengguna. Halaman ini merangkum prinsip pengelolaan data dan hak pengguna atas informasi pribadi mereka.",
    highlights: [
      "Penggunaan data dibatasi untuk tujuan layanan yang sah.",
      "Prosedur keamanan diterapkan untuk melindungi data.",
      "Kebijakan transparan terkait penyimpanan dan akses data.",
      "Pengguna dapat mengajukan pertanyaan terkait privasi.",
    ],
    process: [
      "Data dikumpulkan sesuai kebutuhan layanan.",
      "Data diproses menggunakan kontrol akses yang relevan.",
      "Data ditinjau dan diperbarui sesuai ketentuan operasional.",
      "Permintaan pengguna terkait data ditangani melalui kanal resmi.",
    ],
    faqs: [
      {
        question: "Bagaimana data pengguna dilindungi?",
        answer:
          "Kami menerapkan praktik keamanan teknis dan operasional untuk mencegah akses tidak sah terhadap data pengguna.",
      },
      {
        question: "Apakah pengguna dapat meminta perubahan data?",
        answer:
          "Pengguna dapat menghubungi tim kami untuk pertanyaan atau permintaan terkait data sesuai kebijakan yang berlaku.",
      },
    ],
    ctaLabel: "Hubungi Tim Privasi",
    ctaHref: "/contact",
  };
}

export function buildLegacyRewriteCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  if (
    page.section === "pembuatan-website" &&
    (page.sourceFile.includes("[kota]") || page.slug === "sidoarjo")
  ) {
    return enrichCopyForSeo(page, buildWebsiteCityCopy(page));
  }

  if (page.section === "pembuatan-website") {
    if (page.slug !== "pembuatan-website") {
      return enrichCopyForSeo(page, buildWebsiteServiceCopy(page));
    }
    return enrichCopyForSeo(page, buildWebsiteIndexCopy());
  }

  if (page.section === "percetakan") {
    if (page.slug !== "percetakan") {
      return enrichCopyForSeo(page, buildPrintingDetailCopy(page));
    }
    return enrichCopyForSeo(page, buildPrintingCopy(page));
  }

  if (page.section === "software" || page.section === "sistem-pos") {
    const softwareCopy =
      page.section === "software" && page.slug !== "software"
        ? buildSoftwareDetailCopy(page)
        : buildSoftwareCopy(page);
    if (page.section === "sistem-pos") {
      return enrichCopyForSeo(page, {
        ...softwareCopy,
        primaryKeyword: "Software Sistem POS",
        secondaryKeywords: [
          "Aplikasi kasir online",
          "Sistem POS retail",
          "Software POS restoran",
          "POS terintegrasi stok",
          "Sistem point of sale",
        ],
        description:
          "Software sistem POS untuk bisnis retail dan F&B yang membutuhkan transaksi cepat, kontrol stok akurat, dan laporan real-time.",
        ctaLabel: "Konsultasi Sistem POS",
      });
    }
    return enrichCopyForSeo(page, softwareCopy);
  }

  if (page.section === "layanan") {
    return enrichCopyForSeo(page, buildLayananCopy());
  }

  if (page.section === "about") {
    if (page.slug === "ai-statement") {
      return enrichCopyForSeo(page, buildAboutStatementCopy());
    }
    return enrichCopyForSeo(page, buildAboutCopy());
  }

  if (page.section === "contact") {
    return enrichCopyForSeo(page, buildContactCopy());
  }

  if (page.section === "privacy") {
    return enrichCopyForSeo(page, buildPrivacyCopy());
  }

  return enrichCopyForSeo(page, buildGenericCopy(page));
}

export function buildPercetakanCetakBukuCityCopy(city: string): LegacyRewriteCopy {
  const base = buildPrintingDetailCopy({
    route: "/percetakan/cetak-buku",
    section: "percetakan",
    slug: "cetak-buku",
    sourceFile: "percetakan/cetak-buku/index.astro",
    title: "Cetak Buku",
    migrationStatus: "draft",
  });

  const cityName = titleCaseFromSlug(city);
  const cityIntentOverrides: Record<string, Partial<LegacyRewriteCopy>> = {
    surabaya: {
      intro:
        "Layanan cetak buku Surabaya kami ditujukan untuk penulis, kampus, komunitas, dan bisnis yang butuh produksi stabil dengan koordinasi cepat. Fokusnya: kualitas cetak rapi, timeline jelas, dan pengiriman aman.",
      ctaLabel: "Konsultasi Cetak Buku Surabaya",
      finalCtaTitle: "Siap Produksi Cetak Buku di Surabaya dengan Timeline Jelas?",
      finalCtaDescription:
        "Kirim detail naskah, jumlah, dan deadline Anda. Tim kami bantu pilih metode produksi paling efisien untuk kebutuhan Surabaya.",
    },
    sidoarjo: {
      intro:
        "Untuk kebutuhan cetak buku di Sidoarjo, kami fokus pada proses praktis: konsultasi spesifikasi, validasi file, produksi terukur, dan support sampai pengiriman selesai.",
      ctaLabel: "Cetak Buku Sidoarjo",
      finalCtaTitle: "Butuh Partner Cetak Buku di Sidoarjo yang Responsif?",
      finalCtaDescription:
        "Diskusikan kebutuhan Anda sekarang agar proses cetak buku di Sidoarjo berjalan cepat, aman, dan sesuai target kualitas.",
    },
    mojokerto: {
      intro:
        "Halaman ini dirancang untuk kebutuhan cetak buku Mojokerto yang menuntut efisiensi biaya tanpa menurunkan mutu. Kami bantu dari penentuan spesifikasi sampai kontrol hasil cetak.",
      ctaLabel: "Konsultasi Cetak Buku Mojokerto",
      finalCtaTitle: "Cetak Buku Mojokerto dengan Skema Produksi Lebih Efisien",
      finalCtaDescription:
        "Kami bantu Anda menentukan metode POD/offset yang paling tepat untuk kebutuhan distribusi dan anggaran di Mojokerto.",
    },
    samarinda: {
      intro:
        "Layanan cetak buku Samarinda kami difokuskan untuk klien yang membutuhkan kualitas konsisten dan komunikasi progres yang jelas dari awal hingga buku siap kirim.",
      ctaLabel: "Konsultasi Cetak Buku Samarinda",
      finalCtaTitle: "Ingin Cetak Buku Samarinda Tanpa Bolak-Balik Revisi?",
      finalCtaDescription:
        "Mulai dari review file yang tepat agar produksi cetak buku di Samarinda lebih aman dan minim hambatan.",
    },
    jeneponto: {
      intro:
        "Untuk pasar Jeneponto, kami menyiapkan layanan cetak buku yang fleksibel untuk kebutuhan edukasi, komunitas, dan publikasi bisnis dengan hasil akhir tetap profesional.",
      ctaLabel: "Cetak Buku Jeneponto",
      finalCtaTitle: "Cetak Buku Jeneponto yang Siap Pakai dan Tepat Waktu",
      finalCtaDescription:
        "Konsultasikan kebutuhan Anda, lalu kami susun timeline produksi dan opsi finishing sesuai tujuan penggunaan buku.",
    },
    mataram: {
      intro:
        "Kebutuhan cetak buku Mataram kami tangani dengan alur terstruktur agar buku Anda siap dipakai untuk distribusi, penjualan, atau kebutuhan institusi tanpa proses yang membingungkan.",
      ctaLabel: "Konsultasi Cetak Buku Mataram",
      finalCtaTitle: "Siap Cetak Buku di Mataram dengan Hasil Lebih Presisi?",
      finalCtaDescription:
        "Kami bantu cek file dan spesifikasi sejak awal agar hasil cetak buku Mataram konsisten dengan standar brand Anda.",
    },
    banjarmasin: {
      intro:
        "Layanan cetak buku Banjarmasin kami disiapkan untuk kebutuhan volume kecil hingga besar dengan fokus pada akurasi file, ketahanan jilid, dan pengiriman aman.",
      ctaLabel: "Cetak Buku Banjarmasin",
      finalCtaTitle: "Perlu Mitra Cetak Buku Banjarmasin yang Bisa Diandalkan?",
      finalCtaDescription:
        "Diskusikan spesifikasi buku Anda, lalu tim kami bantu susun rencana produksi paling efisien untuk area Banjarmasin.",
    },
    "polewali-mandar": {
      intro:
        "Untuk cetak buku Polewali Mandar, kami menekankan proses yang sederhana namun terkontrol agar klien tetap mendapatkan hasil rapi dengan estimasi yang jelas.",
      ctaLabel: "Cetak Buku Polewali Mandar",
      finalCtaTitle: "Cetak Buku Polewali Mandar dengan Proses Lebih Terarah",
      finalCtaDescription:
        "Kirim kebutuhan naskah Anda hari ini dan kami bantu pilih opsi produksi paling tepat untuk target distribusi lokal maupun nasional.",
    },
    kendari: {
      intro:
        "Halaman ini difokuskan untuk kebutuhan cetak buku Kendari yang mengutamakan kualitas visual, durabilitas buku, dan efisiensi biaya produksi.",
      ctaLabel: "Konsultasi Cetak Buku Kendari",
      finalCtaTitle: "Butuh Cetak Buku Kendari dengan Kualitas Konsisten?",
      finalCtaDescription:
        "Kami bantu Anda menentukan material isi, cover, dan jilid yang paling sesuai dengan tujuan penggunaan buku.",
    },
    manado: {
      intro:
        "Layanan cetak buku Manado dirancang untuk membantu penulis dan institusi mendapatkan output cetak yang siap distribusi dengan timeline produksi yang terukur.",
      ctaLabel: "Cetak Buku Manado",
      finalCtaTitle: "Siap Produksi Cetak Buku Manado untuk Kebutuhan Anda?",
      finalCtaDescription:
        "Konsultasikan jumlah, spesifikasi, dan deadline Anda agar proses cetak buku Manado berjalan efektif dari awal.",
    },
    jayapura: {
      intro:
        "Untuk kebutuhan cetak buku Jayapura, kami fokus pada perencanaan spesifikasi yang tepat agar hasil cetak tetap terjaga sekalipun kebutuhan distribusi lintas wilayah.",
      ctaLabel: "Konsultasi Cetak Buku Jayapura",
      finalCtaTitle: "Cetak Buku Jayapura dengan Perencanaan Produksi yang Matang",
      finalCtaDescription:
        "Diskusi awal yang tepat membantu menekan risiko revisi dan mempercepat proses cetak buku Jayapura.",
    },
    medan: {
      intro:
        "Layanan cetak buku Medan kami menargetkan kebutuhan komersial dan institusi dengan kualitas produksi stabil, finishing rapi, dan dukungan konsultasi teknis sejak awal.",
      ctaLabel: "Cetak Buku Medan",
      finalCtaTitle: "Ingin Cetak Buku Medan yang Siap Jual dan Siap Distribusi?",
      finalCtaDescription:
        "Kami bantu hitung skema produksi paling efisien untuk kebutuhan cetak buku Medan Anda.",
    },
    pontianak: {
      intro:
        "Untuk cetak buku Pontianak, kami fokus pada ketelitian file, konsistensi warna, dan pilihan jilid agar hasil akhir lebih representatif untuk kebutuhan profesional.",
      ctaLabel: "Konsultasi Cetak Buku Pontianak",
      finalCtaTitle: "Cetak Buku Pontianak dengan Standar Produksi Profesional",
      finalCtaDescription:
        "Kirim detail proyek Anda, dan kami bantu susun rencana cetak buku Pontianak yang terukur.",
    },
    tomohon: {
      intro:
        "Layanan cetak buku Tomohon kami menekankan proses cepat namun tetap akurat, terutama untuk kebutuhan komunitas, sekolah, dan publikasi lokal.",
      ctaLabel: "Cetak Buku Tomohon",
      finalCtaTitle: "Butuh Cetak Buku Tomohon yang Rapi dan Tepat Deadline?",
      finalCtaDescription:
        "Kami bantu menyiapkan produksi cetak buku Tomohon dengan workflow yang jelas dari file hingga pengiriman.",
    },
    "kepulauan-sangihe": {
      intro:
        "Untuk kebutuhan cetak buku Kepulauan Sangihe, kami menyiapkan alur kerja yang memperhitungkan ketepatan spesifikasi dan kesiapan distribusi sejak tahap awal.",
      ctaLabel: "Cetak Buku Kepulauan Sangihe",
      finalCtaTitle: "Cetak Buku Kepulauan Sangihe dengan Alur Produksi Terukur",
      finalCtaDescription:
        "Diskusikan kebutuhan Anda agar kami dapat menyarankan opsi cetak buku paling efisien untuk lokasi dan target penggunaan.",
    },
    "manokwari-selatan": {
      intro:
        "Layanan cetak buku Manokwari Selatan kami sesuaikan untuk kebutuhan institusi dan komunitas yang memerlukan hasil stabil serta komunikasi proses yang transparan.",
      ctaLabel: "Konsultasi Cetak Buku Manokwari Selatan",
      finalCtaTitle: "Produksi Cetak Buku Manokwari Selatan Lebih Terkontrol",
      finalCtaDescription:
        "Kami bantu menyusun spesifikasi dan timeline agar cetak buku Manokwari Selatan berjalan lancar.",
    },
    sarolangun: {
      intro:
        "Untuk cetak buku Sarolangun, fokus kami adalah menyederhanakan proses keputusan spesifikasi sambil menjaga kualitas akhir agar buku siap dipakai tanpa revisi berulang.",
      ctaLabel: "Cetak Buku Sarolangun",
      finalCtaTitle: "Cetak Buku Sarolangun Tanpa Kebingungan Spesifikasi",
      finalCtaDescription:
        "Konsultasi cepat bersama tim kami untuk menentukan opsi material dan finishing paling sesuai kebutuhan.",
    },
    palu: {
      intro:
        "Layanan cetak buku Palu kami dirancang agar penulis dan institusi mendapatkan proses produksi yang jelas, hasil rapi, dan pengiriman tepat sesuai rencana.",
      ctaLabel: "Konsultasi Cetak Buku Palu",
      finalCtaTitle: "Siap Cetak Buku Palu dengan Workflow Lebih Efektif?",
      finalCtaDescription:
        "Kami bantu dari tahap validasi file hingga final QC agar hasil cetak buku Palu lebih konsisten.",
    },
    "tanjung-pinang": {
      intro:
        "Untuk kebutuhan cetak buku Tanjung Pinang, kami menyiapkan skema produksi fleksibel yang tetap menjaga kualitas cetak dan ketepatan jadwal.",
      ctaLabel: "Cetak Buku Tanjung Pinang",
      finalCtaTitle: "Butuh Cetak Buku Tanjung Pinang dengan Estimasi Jelas?",
      finalCtaDescription:
        "Kirim detail kebutuhan Anda untuk mendapatkan rekomendasi metode cetak paling tepat.",
    },
    pringsewu: {
      intro:
        "Layanan cetak buku Pringsewu kami menekankan kemudahan konsultasi, ketelitian pre-press, dan kualitas finishing agar hasil buku siap dipakai secara profesional.",
      ctaLabel: "Konsultasi Cetak Buku Pringsewu",
      finalCtaTitle: "Cetak Buku Pringsewu dengan Hasil Rapi dan Siap Distribusi",
      finalCtaDescription:
        "Kami bantu merancang spesifikasi cetak buku Pringsewu sesuai target kuantitas dan kualitas Anda.",
    },
  };
  const cityOverride = cityIntentOverrides[city] || {};

  return {
    ...base,
    primaryKeyword: `Jasa Cetak Buku ${cityName}`,
    secondaryKeywords: [
      `Jasa cetak buku ${cityName}`,
      `Cetak buku ${cityName}`,
      `Print on demand ${cityName}`,
      "Percetakan buku profesional",
      "Cetak buku satuan dan massal",
    ],
    description:
      `Jasa cetak buku profesional di ${cityName} untuk penulis, penerbit, sekolah, komunitas, dan perusahaan dengan opsi POD maupun produksi massal.`,
    intro:
      `Kami melayani jasa cetak buku di ${cityName} dengan alur kerja terstruktur: konsultasi spesifikasi, review file, proses produksi, quality control, hingga pengiriman ke seluruh Indonesia.`,
    ctaLabel: `Konsultasi Cetak Buku ${cityName}`,
    ctaLinks: [
      { label: "Hubungi Kami Sekarang", href: DEFAULT_CTA },
      { label: "Tanya di Sini", href: DEFAULT_CTA },
      { label: "Minta Penawaran Akurat di Sini", href: DEFAULT_CTA },
      { label: "Chat & Cetak Sekarang", href: DEFAULT_CTA },
    ],
    finalCtaTitle: `Siap Cetak Buku di ${cityName}?`,
    finalCtaDescription:
      `Kirim detail naskah dan spesifikasi Anda. Tim kami bantu susun opsi produksi paling efisien untuk kebutuhan cetak buku di ${cityName}.`,
    faqs: [
      {
        question: `Apakah bisa konsultasi spesifikasi sebelum cetak buku di ${cityName}?`,
        answer:
          "Bisa. Kami bantu validasi ukuran, jenis kertas, jilid, dan finishing agar keputusan produksi lebih tepat sejak awal.",
      },
      {
        question: `Apakah melayani cetak buku ${cityName} untuk jumlah kecil maupun besar?`,
        answer:
          "Ya. Kami melayani kebutuhan POD untuk jumlah kecil hingga produksi massal sesuai target distribusi Anda.",
      },
      {
        question: "Bagaimana memastikan file aman sebelum masuk produksi?",
        answer:
          "Tim kami melakukan pre-press check pada bleed, margin aman, resolusi gambar, dan format file untuk menekan risiko revisi.",
      },
      {
        question: "Apakah ada pendampingan sampai pengiriman selesai?",
        answer:
          "Ada. Kami memastikan alur produksi, quality control, dan pengiriman dipantau agar hasil tiba sesuai ekspektasi.",
      },
    ],
    ...cityOverride,
  };
}
