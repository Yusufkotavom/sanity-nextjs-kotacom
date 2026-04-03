import { DEFAULT_CTA } from "./constants";
import type { LegacyRewriteCopy } from "./types";

export const WEBSITE_PRIORITY_OVERRIDES: Record<string, Partial<LegacyRewriteCopy>> = {
  "pembuatan-website": {
    primaryKeyword: "Jasa Pembuatan Website Surabaya untuk Lead dan Penjualan",
    secondaryKeywords: [
      "Jasa pembuatan website Surabaya",
      "Website bisnis responsif untuk UMKM dan perusahaan",
      "Landing page SEO dan konversi",
      "Website company profile dan toko online",
      "Web developer Surabaya untuk bisnis",
    ],
    description:
      "Jasa pembuatan website Surabaya untuk bisnis yang membutuhkan tampilan kredibel, performa cepat, struktur SEO kuat, dan CTA yang siap menghasilkan lead.",
    intro:
      "Halaman ini kami tulis ulang setelah dibandingkan dengan live site untuk menangkap intent komersial yang lebih jelas: bisnis di Surabaya dan sekitarnya butuh website yang bukan hanya menarik, tetapi juga membantu penjualan, inquiry, dan follow-up tim sales. Fokusnya pada struktur halaman, pesan nilai, CTA, dan fondasi SEO yang siap dikembangkan.",
    ctaLabel: "Minta Strategi Website",
    ctaLinks: [
      { label: "Lihat Harga Pembuatan Website", href: "/pembuatan-website/harga" },
      { label: "Website Company Profile", href: "/pembuatan-website/jasa-pembuatan-website-company-profile" },
      { label: "Website Toko Online", href: "/pembuatan-website/jasa-pembuatan-website-toko-online" },
      { label: "Lihat Portfolio Website", href: "/pembuatan-website/portfolio" },
      { label: "Konsultasi Website", href: DEFAULT_CTA },
    ],
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
    primaryKeyword: "Jasa Pembuatan Website Company Profile Surabaya",
    secondaryKeywords: [
      "Website company profile Surabaya",
      "Website profil perusahaan profesional",
      "Website company profile dengan dashboard admin",
      "Website perusahaan dengan client portal",
      "Website company profile dan sistem manajemen",
    ],
    description:
      "Jasa pembuatan website company profile Surabaya untuk perusahaan yang ingin tampil lebih kredibel, mudah dihubungi, dan siap dikembangkan ke CRM, dashboard admin, atau client portal.",
    intro:
      "Halaman ini ditulis untuk user yang membutuhkan kredibilitas bisnis di mata calon klien, investor, atau partner. Setelah dibandingkan dengan live site, copy kami diperluas agar tidak hanya menonjolkan trust signal dan positioning, tetapi juga membuka intent enterprise seperti dashboard admin, client portal, dan integrasi sistem manajemen perusahaan.",
    ctaLabel: "Rancang Website Company Profile",
    ctaLinks: [
      { label: "Konsultasi Website Company Profile", href: DEFAULT_CTA },
      { label: "Lihat Portfolio Website", href: "/pembuatan-website/portfolio" },
      { label: "Bandingkan dengan Website Sekolah", href: "/pembuatan-website/jasa-pembuatan-website-sekolah" },
      { label: "Diskusikan Integrasi Dashboard", href: DEFAULT_CTA },
    ],
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
      {
        question: "Apakah website company profile bisa dikembangkan ke dashboard admin atau client portal?",
        answer:
          "Bisa. Fondasi website dapat disiapkan agar mudah diperluas ke area login, dashboard internal, formulir lead, atau portal klien sesuai kebutuhan operasional perusahaan.",
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
};
