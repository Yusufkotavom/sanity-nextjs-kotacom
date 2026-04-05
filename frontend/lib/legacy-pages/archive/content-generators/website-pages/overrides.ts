import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";

export const WEBSITE_PAGE_OVERRIDES: Record<string, Partial<LegacyRewriteCopy>> = {
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
      "Bisnis di Surabaya dan sekitarnya membutuhkan website yang bukan hanya menarik, tetapi juga membantu penjualan, inquiry, dan follow-up tim sales. Karena itu kami menekankan struktur halaman yang jelas, pesan nilai yang kuat, CTA yang tegas, dan fondasi SEO yang siap dikembangkan.",
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
      "Ceritakan target lead Anda. Kami bantu menyiapkan struktur halaman, prioritas konten, dan langkah implementasi yang paling relevan untuk bisnis Anda.",
    faqs: [
      {
        question: "Apa bedanya website biasa dengan website yang fokus konversi?",
        answer:
          "Website yang fokus konversi menyusun alur informasi, bukti sosial, dan CTA dengan lebih jelas agar kunjungan lebih mudah berubah menjadi inquiry atau lead.",
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
      "Halaman harga ini menekankan hal yang paling dicari calon klien: kepastian budget, gambaran scope, dan pilihan paket yang masuk akal untuk tahap bisnis Anda saat ini.",
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
  "jasa-pembuatan-website-company-profile": {
    primaryKeyword: "Jasa Pembuatan Website Company Profile Surabaya",
    secondaryKeywords: [
      "Website company profile Surabaya",
      "Website profil perusahaan profesional",
      "Website perusahaan profesional",
      "Website company profile untuk lead",
      "Website profil perusahaan terpercaya",
    ],
    description:
      "Jasa pembuatan website company profile Surabaya untuk perusahaan yang ingin tampil lebih kredibel, mudah dihubungi, dan lebih meyakinkan di mata calon klien.",
    intro:
      "Website company profile yang baik membantu perusahaan tampil lebih profesional di mata calon klien, partner, maupun investor. Fokus halaman ini adalah kredibilitas, kejelasan layanan, dan jalur kontak yang memudahkan inquiry masuk.",
    ctaLabel: "Rancang Website Company Profile",
    ctaLinks: [
      { label: "Konsultasi Website Company Profile", href: DEFAULT_CTA },
      { label: "Lihat Portfolio Website", href: "/pembuatan-website/portfolio" },
      { label: "Bandingkan dengan Website Sekolah", href: "/pembuatan-website/jasa-pembuatan-website-sekolah" },
      { label: "Diskusikan Kebutuhan Website", href: DEFAULT_CTA },
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
        question: "Apakah website company profile bisa dikembangkan lagi di masa depan?",
        answer:
          "Bisa. Fondasi website dapat disiapkan agar lebih mudah menambah halaman, formulir, area privat, atau kebutuhan lanjutan lain saat bisnis berkembang.",
      },
    ],
  },
  "jasa-pembuatan-website-toko-online": {
    intro:
      "Halaman toko online ini menekankan kebutuhan paling penting untuk bisnis jualan online: produk mudah ditemukan, manfaat cepat dipahami, dan proses pembelian terasa ringkas.",
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
          "Kami mengoptimalkan pesan utama, trust element, dan CTA pembelian agar pengunjung bergerak dari melihat produk ke aksi checkout.",
      },
    ],
  },
  "jasa-migrasi-wordpress": {
    intro:
      "Migrasi WordPress yang baik harus aman, minim downtime, dan menjaga performa SEO tetap stabil. Karena itu kami menekankan mitigasi risiko, checklist validasi, dan langkah pemulihan jika dibutuhkan.",
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
  "jasa-pembuatan-website-dokter-klinik": {
    intro:
      "Website dokter dan klinik perlu membantu pasien menemukan layanan, jadwal, dan kanal konsultasi secepat mungkin. Karena itu halaman ini menekankan trust, kejelasan informasi, dan komunikasi yang lebih efisien.",
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
          "Bisa. Kami siapkan kerangka konten edukasi yang tetap ramah pembaca dan relevan dengan pencarian pasien.",
      },
    ],
  },
  "jasa-pembuatan-website-sekolah": {
    intro:
      "Website sekolah perlu menyajikan informasi yang cepat diakses orang tua dan calon siswa. Karena itu halaman ini difokuskan pada kejelasan program, agenda akademik, serta kanal komunikasi resmi.",
    ctaLabel: "Rancang Website Sekolah",
    finalCtaTitle: "Website Sekolah Informatif dan Mudah Dikelola",
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
  "jasa-pembuatan-website-expedisi": {
    intro:
      "Calon klien jasa ekspedisi biasanya ingin cepat melihat cakupan layanan, SLA pengiriman, dan cara request pickup. Karena itu halaman ini diarahkan agar inquiry B2B masuk lebih cepat dan dengan data yang lebih siap ditindaklanjuti.",
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
      "Untuk NGO dan komunitas, pengunjung biasanya ingin memahami dampak program dan tahu bagaimana ikut berkontribusi. Karena itu halaman ini menekankan kredibilitas program, transparansi aktivitas, dan CTA donasi atau kolaborasi yang jelas.",
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
        question: "Apakah tim pengelola bisa update konten program secara mandiri?",
        answer:
          "Bisa. Struktur halaman dapat dibuat agar tim non-teknis tetap mudah mengelola update kegiatan, berita, dan agenda komunitas.",
      },
    ],
  },
  "jasa-pembuatan-website-konstruksi": {
    intro:
      "Halaman konstruksi ini diarahkan untuk kebutuhan tender dan proyek B2B: pengunjung perlu melihat kapabilitas teknis, portofolio pekerjaan, serta cara menghubungi tim untuk diskusi scope proyek.",
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
      "Template ini cocok untuk bisnis yang butuh go-live cepat tanpa mengorbankan fondasi SEO dan konversi. Basisnya siap dipersonalisasi agar tetap selaras dengan brand dan target bisnis Anda.",
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
};
