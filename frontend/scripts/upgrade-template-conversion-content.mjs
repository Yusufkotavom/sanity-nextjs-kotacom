import crypto from "crypto";
import {
  createSanityReadClient,
  createSanityWriteClient,
  loadSanityEnv,
} from "./lib/sanity-page-guards.mjs";

const WRITE_MODE = process.argv.includes("--write");

function key(prefix = "key") {
  return `${prefix}-${crypto.randomUUID()}`;
}

function externalLink(href, title) {
  return {
    _type: "link",
    _key: key("link"),
    href,
    title,
    isExternal: true,
  };
}

function contentVariant({
  slot,
  text,
  lane,
  routeKinds,
  requiresLocation = false,
  requiresService = false,
  strength = "safe",
}) {
  return {
    _type: "templateContentVariant",
    _key: key("variant"),
    slot,
    text,
    lane,
    intent: routeKinds?.includes("service") || routeKinds?.includes("service-city")
      ? "decision"
      : "commercial",
    strength,
    requiresLocation,
    requiresService,
    routeKinds,
    disallowedContexts: [
      ...(requiresLocation ? ["no-location"] : []),
      ...(requiresService ? ["no-service"] : []),
    ],
  };
}

function ctaLink(label, href) {
  return {
    _type: "templateCtaLink",
    _key: key("cta"),
    label,
    link: externalLink(href, label),
  };
}

function faq(question, answer) {
  return { _type: "templateFaq", _key: key("faq"), question, answer };
}

function eeat(title, description) {
  return { _type: "templateEeatPoint", _key: key("eeat"), title, description };
}

function serviceType(title, description, href) {
  return {
    _type: "templateServiceType",
    _key: key("service"),
    title,
    description,
    link: externalLink(href, title),
  };
}

function pricingPlan(name, price, description, items, recommended = false) {
  return {
    _type: "templatePricingPlan",
    _key: key("price"),
    name,
    price,
    description,
    items,
    recommended,
  };
}

function feature(title, description, icon) {
  return {
    _type: "templateFeature",
    _key: key("feature"),
    title,
    description,
    icon,
  };
}

function proof(title, description) {
  return {
    _type: "templateProofItem",
    _key: key("proof"),
    title,
    description,
  };
}

function testimonial(name, role, quote) {
  return {
    _type: "templateTestimonial",
    _key: key("testi"),
    name,
    role,
    quote,
  };
}

function guide(title, description) {
  return {
    _type: "templateLongGuide",
    _key: key("guide"),
    title,
    description,
  };
}

const commonPolicy = {
  pricingSource: "page-first",
  proofSource: "page-first",
  testimonialSource: "page-first",
  maxQuickLinks: 2,
};

const templatePatches = {
  "page-template-pembuatan-website": {
    heroEyebrow: "Website untuk lead, kredibilitas, dan funnel penjualan",
    lane: "website",
    trustMode: "aggressive",
    sourcePolicy: commonPolicy,
    structured: {
      primaryKeyword:
        "Jasa Pembuatan Website untuk Bisnis yang Ingin Tampil Lebih Meyakinkan",
      secondaryKeywords: [
        "jasa pembuatan website bisnis",
        "website company profile profesional",
        "website untuk lead generation",
        "website toko online custom",
      ],
      description:
        "Kami membantu bisnis membangun website yang jelas nilainya, cepat dipahami calon pelanggan, dan siap dipakai untuk meningkatkan kredibilitas maupun lead.",
      intro:
        "Website yang efektif bukan sekadar tampil rapi. Ia harus menjelaskan siapa Anda, apa yang Anda tawarkan, dan langkah berikutnya yang harus diambil calon pelanggan dalam hitungan detik.",
      highlights: [
        "Struktur pesan dibuat agar pengunjung cepat paham layanan, bukti kerja, dan langkah kontak berikutnya.",
        "Desain responsif, loading ringan, dan pondasi SEO dasar disiapkan sejak awal agar website tidak berhenti di tampilan saja.",
        "Scope pengerjaan dibahas di depan supaya timeline, revisi, dan prioritas fitur tidak melebar di tengah proyek.",
        "Website tetap mudah dikelola setelah launch, termasuk untuk update konten, portfolio, dan informasi layanan.",
      ],
      eeatPoints: [
        eeat(
          "Pengerjaan diarahkan ke kebutuhan bisnis, bukan template generik",
          "Discovery awal dipakai untuk memetakan tujuan website: apakah fokusnya kredibilitas, lead, katalog, atau transaksi."
        ),
        eeat(
          "Pendekatan build mempertimbangkan konten, performa, dan alur konversi",
          "Setiap proyek tidak hanya dinilai dari visual, tetapi juga dari kemudahan membaca, kecepatan akses, dan kejelasan CTA."
        ),
        eeat(
          "Scope dan ekspektasi kerja dibuat jelas sejak awal",
          "Klien mendapat gambaran tahap pengerjaan, revisi, dan prioritas deliverable agar proyek tidak bergerak tanpa arah."
        ),
        eeat(
          "Support pasca-launch menjaga website tetap bisa dipakai",
          "Setelah launch, penyesuaian minor dan klarifikasi penggunaan tetap didampingi supaya website benar-benar siap digunakan."
        ),
      ],
      process: [
        "Discovery singkat untuk memetakan target website, audiens, dan halaman yang paling penting lebih dulu.",
        "Penyusunan struktur halaman dan arahan visual agar pesan utama dan CTA langsung terbaca.",
        "Development, input konten awal, dan quality check untuk tampilan mobile, kecepatan, dan fungsi form.",
        "Launch, handover, dan masa pendampingan awal supaya tim Anda bisa lanjut memakai website dengan lebih percaya diri.",
      ],
      faqs: [
        faq(
          "Website seperti apa yang cocok untuk bisnis saya?",
          "Tergantung tujuan utamanya. Jika fokus Anda kredibilitas, company profile biasanya cukup. Jika fokusnya akuisisi lead, struktur halaman dan CTA perlu dibuat lebih tajam. Jika fokusnya transaksi, alurnya harus mendukung katalog, checkout, dan follow-up."
        ),
        faq(
          "Berapa lama proyek website biasanya berjalan?",
          "Timeline bergantung pada jumlah halaman, kesiapan konten, dan tingkat revisi. Yang paling memengaruhi lama proyek biasanya bukan coding, tetapi keputusan scope dan kelengkapan materi di awal."
        ),
        faq(
          "Apakah website lama bisa diredesign tanpa mulai dari nol?",
          "Bisa. Kami biasanya audit dulu struktur konten, halaman yang masih layak dipakai, serta bagian yang justru perlu disederhanakan agar redesign tidak hanya mengganti tampilan."
        ),
        faq(
          "Apakah domain, hosting, dan pengelolaan konten nanti tetap bisa dipegang tim saya?",
          "Bisa. Kami mengutamakan struktur yang tetap mudah dikelola setelah launch agar update rutin seperti teks, portfolio, dan informasi layanan tidak selalu bergantung pada developer."
        ),
      ],
      ctaLabel: "Diskusikan Website Anda",
      ctaLink: externalLink(
        "https://wa.me/6285799520350?text=Halo%2C%20saya%20ingin%20diskusi%20tentang%20pembuatan%20website%20untuk%20bisnis%20saya.",
        "Diskusikan Website Anda"
      ),
      ctaLinks: [
        ctaLink("Lihat Contoh Proyek", "https://www.kotacom.id/projects"),
        ctaLink(
          "Bandingkan Paket Website",
          "https://www.kotacom.id/pembuatan-website#paket"
        ),
      ],
      serviceTypes: [
        serviceType(
          "Website Company Profile",
          "Untuk bisnis yang perlu tampil lebih kredibel, menjelaskan layanan dengan rapi, dan memudahkan calon klien melakukan kontak awal.",
          "https://www.kotacom.id/pembuatan-website/jasa-pembuatan-website-company-profile"
        ),
        serviceType(
          "Website Toko Online",
          "Untuk bisnis yang ingin mengarahkan transaksi dari katalog, promosi, dan traffic iklan ke alur pembelian yang lebih terkontrol.",
          "https://www.kotacom.id/pembuatan-website/jasa-pembuatan-website-toko-online"
        ),
        serviceType(
          "Website Custom Landing & Funnel",
          "Untuk campaign, microsite, atau kebutuhan halaman yang fokus pada satu penawaran dengan CTA yang lebih kuat.",
          "https://www.kotacom.id/pembuatan-website/template"
        ),
      ],
      pricingPlans: [
        pricingPlan(
          "Starter",
          "Mulai 1,5jt",
          "Untuk bisnis yang butuh website profesional sederhana dengan struktur halaman inti dan CTA yang jelas.",
          [
            "Halaman inti untuk profil, layanan, dan kontak",
            "Desain responsif dan fondasi SEO dasar",
            "Cocok untuk validasi awal kehadiran digital",
          ]
        ),
        pricingPlan(
          "Growth",
          "Mulai 3,5jt",
          "Untuk bisnis yang ingin website lebih siap dipakai untuk lead generation dan presentasi penawaran.",
          [
            "Struktur halaman lebih lengkap dan fokus konversi",
            "Ruang untuk portfolio, FAQ, dan konten pendukung",
            "Prioritas pada kejelasan pesan dan alur kontak",
          ],
          true
        ),
        pricingPlan(
          "Custom",
          "Custom",
          "Untuk kebutuhan integrasi, area member, katalog kompleks, atau alur bisnis yang tidak cocok dengan paket standar.",
          [
            "Scope ditentukan dari proses dan prioritas bisnis",
            "Bisa mencakup integrasi form, dashboard, atau workflow khusus",
            "Cocok untuk kebutuhan yang perlu roadmap bertahap",
          ]
        ),
      ],
      features: [
        feature("Pesan utama cepat terbaca", "Headline, subheadline, dan CTA disusun agar pengunjung paham nilai layanan dalam beberapa detik pertama.", "conversion"),
        feature("Struktur konten lebih meyakinkan", "Halaman dibangun untuk memindahkan pengunjung dari rasa ragu ke rasa percaya lewat portfolio, FAQ, dan bukti kerja.", "design"),
        feature("Siap dipakai di perangkat mobile", "Tampilan dan alur kontak diprioritaskan untuk pengalaman mobile karena sebagian besar trafik datang dari sana.", "speed"),
        feature("Mudah dikembangkan bertahap", "Website bisa dimulai dari scope inti lalu diperluas saat kebutuhan bisnis bertambah.", "support"),
      ],
      proofItems: [
        proof("Website company profile untuk B2B", "Cocok untuk bisnis jasa atau manufaktur yang perlu terlihat rapi, serius, dan lebih mudah dipercaya calon klien."),
        proof("Website katalog dan toko online", "Dipakai saat bisnis butuh menampilkan produk lebih terstruktur dan mengarahkan transaksi ke alur yang lebih terkendali."),
        proof("Landing page campaign", "Relevan untuk penawaran spesifik yang butuh headline, bukti, dan CTA yang lebih fokus daripada halaman company profile biasa."),
      ],
      testimonials: [
        testimonial("Nadia", "Owner bisnis jasa", "Yang paling terasa bukan cuma tampilannya, tapi struktur websitenya jadi jauh lebih mudah dipahami calon klien saat pertama kali masuk."),
        testimonial("Rizky", "Marketing manager", "Diskusi scope di awal membantu sekali. Kami jadi tahu halaman apa yang perlu diprioritaskan dan tidak buang waktu di fitur yang belum penting."),
        testimonial("Salsa", "Founder brand retail", "Website yang dibuat lebih rapi untuk presentasi produk dan jauh lebih enak dipakai saat kami arahkan traffic dari iklan."),
      ],
      longGuide: [
        guide("Kapan bisnis cukup dengan company profile", "Jika tujuan utamanya membangun kredibilitas dan memudahkan calon klien menghubungi Anda, company profile yang jelas sering kali sudah memberi dampak besar."),
        guide("Kapan perlu landing page khusus", "Jika penawaran Anda spesifik atau traffic datang dari iklan, landing page terpisah membantu menjaga fokus pesan dan CTA tetap tunggal."),
        guide("Cara menyiapkan brief website yang lebih cepat diproses", "Siapkan target bisnis, daftar layanan utama, contoh referensi, dan materi awal agar discovery tidak habis hanya untuk menebak kebutuhan dasar proyek."),
      ],
      finalCtaTitle: "Mulai dari website yang langsung menjelaskan nilai bisnis Anda",
      finalCtaDescription:
        "Jika calon pelanggan masih bingung setelah membuka website Anda, masalahnya biasanya bukan pada traffic dulu, tetapi pada struktur pesan dan prioritas halaman. Itu yang kami bantu rapikan.",
      contentVariants: [
        contentVariant({
          slot: "heroEyebrow",
          text: "Website untuk bisnis di {lokasi}",
          lane: "website",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
        }),
        contentVariant({
          slot: "primaryKeyword",
          text: "Jasa Pembuatan Website untuk Bisnis di {lokasi}",
          lane: "website",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
          strength: "aggressive",
        }),
        contentVariant({
          slot: "intro",
          text: "Kami membantu bisnis di {lokasi} membangun website yang lebih mudah dipercaya, lebih enak dijelajahi, dan lebih siap dipakai untuk lead maupun presentasi penawaran.",
          lane: "website",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
        }),
        contentVariant({
          slot: "heroEyebrow",
          text: "{layanan} untuk bisnis yang butuh kredibilitas dan CTA yang jelas",
          lane: "website",
          routeKinds: ["service", "service-city"],
          requiresService: true,
        }),
        contentVariant({
          slot: "primaryKeyword",
          text: "Jasa Pembuatan {layanan} yang Lebih Siap Dipakai untuk Penjualan",
          lane: "website",
          routeKinds: ["service"],
          requiresService: true,
          strength: "aggressive",
        }),
        contentVariant({
          slot: "primaryKeyword",
          text: "Jasa Pembuatan {layanan} di {lokasi}",
          lane: "website",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
          strength: "aggressive",
        }),
        contentVariant({
          slot: "description",
          text: "Kami membantu merancang {layanan} yang lebih mudah dipahami calon pelanggan, lebih rapi saat dipresentasikan, dan lebih siap mengarahkan inquiry.",
          lane: "website",
          routeKinds: ["service", "service-city"],
          requiresService: true,
        }),
        contentVariant({
          slot: "intro",
          text: "{layanan} yang efektif harus menjawab tiga hal lebih cepat: bisnis Anda menawarkan apa, siapa targetnya, dan tindakan apa yang ingin Anda dorong setelah pengunjung masuk.",
          lane: "website",
          routeKinds: ["service"],
          requiresService: true,
        }),
        contentVariant({
          slot: "intro",
          text: "Untuk bisnis di {lokasi}, {layanan} yang efektif harus langsung menjelaskan nilai layanan, menunjukkan bukti yang relevan, dan memudahkan calon klien masuk ke tahap diskusi.",
          lane: "website",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
        }),
        contentVariant({
          slot: "ctaLabel",
          text: "Diskusikan {layanan}",
          lane: "website",
          routeKinds: ["service", "service-city"],
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaTitle",
          text: "Butuh website yang lebih siap dipakai untuk bisnis di {lokasi}?",
          lane: "website",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
        }),
        contentVariant({
          slot: "finalCtaTitle",
          text: "Siapkan {layanan} yang lebih mudah dipercaya sejak kunjungan pertama",
          lane: "website",
          routeKinds: ["service"],
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaTitle",
          text: "Butuh {layanan} yang lebih siap dipakai di {lokasi}?",
          lane: "website",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaDescription",
          text: "Diskusikan kebutuhan website Anda di {lokasi}. Kami bantu petakan scope awal, prioritas halaman, dan langkah implementasi yang paling realistis.",
          lane: "website",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
        }),
        contentVariant({
          slot: "finalCtaDescription",
          text: "Kami bantu memetakan scope {layanan}, prioritas halaman, dan kebutuhan konten supaya proyek tidak berhenti di desain yang rapi tetapi lemah saat dipakai jualan.",
          lane: "website",
          routeKinds: ["service"],
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaDescription",
          text: "Diskusikan kebutuhan {layanan} di {lokasi}. Kami bantu tentukan scope awal, CTA utama, dan struktur halaman yang paling realistis untuk target bisnis Anda.",
          lane: "website",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
        }),
      ],
    },
  },
  "page-template-percetakan": {
    heroEyebrow: "Percetakan untuk kebutuhan promosi, spesifikasi, dan deadline yang jelas",
    lane: "printing",
    trustMode: "aggressive",
    sourcePolicy: commonPolicy,
    structured: {
      primaryKeyword: "Jasa Percetakan untuk Material Promosi dan Operasional Bisnis",
      secondaryKeywords: [
        "jasa percetakan bisnis",
        "cetak buku dan company profile",
        "percetakan brosur dan banner",
        "cetak material promosi",
      ],
      description:
        "Kami membantu bisnis menyiapkan material cetak dengan spesifikasi yang lebih jelas, hasil yang lebih rapi, dan timeline produksi yang lebih mudah dikontrol.",
      intro:
        "Di percetakan, masalah paling mahal biasanya bukan harga per lembar, tetapi file yang salah, spesifikasi yang kabur, atau hasil yang datang terlambat. Karena itu kami menekankan kejelasan kebutuhan sebelum produksi berjalan.",
      highlights: [
        "Spesifikasi dibahas lebih awal agar ukuran, material, finishing, dan jumlah tidak berubah di tengah produksi.",
        "Pre-press checking membantu menurunkan risiko file bermasalah sebelum masuk ke tahap cetak.",
        "Pilihan material dan finishing diarahkan ke fungsi akhirnya, bukan sekadar terlihat menarik di layar.",
        "Timeline produksi dan pengiriman dibicarakan di depan agar kebutuhan campaign atau distribusi tidak meleset.",
      ],
      eeatPoints: [
        eeat("Fokus utama ada di kecocokan spesifikasi", "Kami memetakan jenis material cetak berdasarkan tujuan pemakaian: promosi, presentasi, distribusi, atau operasional rutin."),
        eeat("Pre-press dan QC lebih penting daripada janji cepat semata", "File, ukuran, potong, dan finishing perlu dicek lebih dulu agar hasil akhirnya tidak merusak materi promosi atau identitas brand."),
        eeat("Skala produksi bisa disesuaikan", "Mulai dari kebutuhan satuan untuk proof hingga volume lebih besar untuk distribusi massal, pendekatannya tetap berangkat dari kebutuhan aktual."),
        eeat("Komunikasi deadline dibuat lebih eksplisit", "Kami menekankan estimasi waktu dan urutan kerja agar klien tidak menunggu tanpa kejelasan status produksi."),
      ],
      process: [
        "Kebutuhan cetak dipetakan dari tujuan pakai, ukuran, jumlah, material, dan tenggat.",
        "File dicek lebih dulu agar masalah seperti resolusi, bleed, atau area potong tidak lolos ke proses produksi.",
        "Produksi berjalan setelah spesifikasi inti disepakati, dengan QC di titik yang paling berisiko.",
        "Packing dan pengiriman disesuaikan jenis produk agar hasil cetak tetap aman sampai diterima.",
      ],
      faqs: [
        faq("Bagaimana menentukan jenis material yang tepat?", "Material terbaik selalu bergantung pada fungsi akhirnya. Brosur promosi, company profile, buku, dan banner membutuhkan pertimbangan yang berbeda pada ketebalan, finishing, dan daya tahannya."),
        faq("Apakah bisa bantu cek file sebelum cetak?", "Ya. Pemeriksaan file adalah bagian penting dari proses agar hasil cetak tidak gagal karena hal yang sebenarnya bisa dicegah lebih awal."),
        faq("Apa yang paling memengaruhi lead time produksi?", "Biasanya kombinasi jumlah, antrean produksi, finishing, dan apakah file final sudah aman diproses. Semakin jelas spesifikasinya di awal, semakin mudah timeline diprediksi."),
        faq("Apa yang paling memengaruhi harga cetak?", "Biasanya jumlah, ukuran, material, finishing, dan tingkat urgensi deadline. Karena itu kami lebih suka membahas basis spesifikasi dulu sebelum memberi estimasi."),
      ],
      ctaLabel: "Konsultasikan Kebutuhan Cetak",
      ctaLink: externalLink(
        "https://wa.me/6285799520350?text=Halo%2C%20saya%20ingin%20diskusi%20kebutuhan%20percetakan%20untuk%20bisnis%20saya.",
        "Konsultasikan Kebutuhan Cetak"
      ),
      ctaLinks: [
        ctaLink("Lihat Kebutuhan Cetak Buku", "https://www.kotacom.id/percetakan/cetak-buku"),
        ctaLink("Bandingkan Estimasi Paket", "https://www.kotacom.id/percetakan#paket"),
      ],
      serviceTypes: [
        serviceType("Cetak Buku & Company Profile", "Untuk materi yang perlu terlihat lebih rapi saat dipresentasikan, dibagikan, atau dijadikan dokumen pendukung penjualan.", "https://www.kotacom.id/percetakan/cetak-buku"),
        serviceType("Cetak Brosur, Flyer, Banner", "Untuk kebutuhan promosi yang menuntut kejelasan visual, kuantitas, dan kecepatan distribusi.", "https://www.kotacom.id/percetakan/cetak-brosur"),
        serviceType("Cetak Material Operasional", "Untuk kebutuhan identitas, form, kemasan, label, dan materi cetak yang dipakai rutin oleh bisnis.", "https://www.kotacom.id/percetakan"),
      ],
      pricingPlans: [
        pricingPlan("Starter", "Mulai 500rb", "Untuk kebutuhan cetak dasar dengan jumlah terbatas dan spesifikasi yang relatif sederhana.", ["Cocok untuk batch kecil atau kebutuhan awal", "Aman untuk proof dan evaluasi spesifikasi", "Material dan finishing mengikuti kebutuhan dasar"]),
        pricingPlan("Growth", "Mulai 1,5jt", "Untuk campaign atau kebutuhan bisnis yang mulai rutin dan butuh output lebih konsisten.", ["Lebih cocok untuk distribusi atau promosi berulang", "Pilihan material dan finishing lebih luas", "QC lebih relevan untuk menjaga konsistensi output"], true),
        pricingPlan("Custom", "Custom", "Untuk jumlah besar, finishing khusus, atau kebutuhan dengan standar distribusi dan tenggat yang lebih ketat.", ["Estimasi mengikuti volume, material, dan deadline", "Cocok untuk kebutuhan korporat atau event", "Bisa disesuaikan dengan basis spesifikasi yang lebih detail"]),
      ],
      features: [
        feature("Spesifikasi lebih mudah diputuskan", "Kebutuhan cetak dibahas dari fungsi akhirnya sehingga keputusan material dan finishing tidak terasa menebak.", "design"),
        feature("Risiko file bermasalah ditekan di awal", "Pengecekan file membantu mengurangi revisi yang biasanya baru terasa saat hasil cetak sudah jadi.", "security"),
        feature("Timeline lebih terkendali", "Milestone produksi dan pengiriman dibicarakan sejak awal agar kebutuhan distribusi tidak bergeser tanpa sinyal.", "speed"),
        feature("Cocok untuk kebutuhan promosi maupun operasional", "Pendekatan kami tidak hanya untuk materi kampanye, tetapi juga untuk dokumen dan material yang dipakai bisnis setiap hari.", "boxes"),
      ],
      proofItems: [
        proof("Cetak company profile untuk presentasi bisnis", "Dipakai ketika bisnis perlu membawa materi fisik yang lebih meyakinkan saat pitching, tender, atau pertemuan klien."),
        proof("Cetak brosur dan banner untuk campaign", "Relevan untuk promosi yang membutuhkan distribusi cepat, visual yang jelas, dan basis spesifikasi yang sudah matang."),
        proof("Cetak buku, katalog, dan materi distribusi", "Cocok untuk kebutuhan yang menuntut hasil rapi, mudah dibagikan, dan tetap aman saat dikirim ke berbagai lokasi."),
      ],
      testimonials: [
        testimonial("Dimas", "Marketing B2B", "Yang membantu justru cara tim menjelaskan spesifikasi dan pilihan materialnya. Jadi keputusan kami tidak terasa asal cetak saja."),
        testimonial("Aulia", "Owner brand retail", "Kami butuh materi promosi yang rapi dan tidak molor. Flow produksi yang jelas membuat tim internal lebih tenang saat campaign jalan."),
        testimonial("Fajar", "Koordinator operasional", "Pengecekan file sebelum produksi menghemat banyak revisi. Itu terasa sekali di pekerjaan yang deadline-nya mepet."),
      ],
      longGuide: [
        guide("Cara menentukan material cetak dari fungsi akhirnya", "Mulailah dari konteks penggunaan: apakah akan dibagikan cepat, disimpan lama, dipresentasikan, atau dipasang di area luar ruangan."),
        guide("Kapan perlu proof sebelum produksi", "Semakin tinggi dampak kesalahan warna, trimming, atau finishing, semakin penting proof atau validasi spesifikasi sebelum produksi penuh berjalan."),
        guide("Mengapa basis harga cetak selalu kembali ke spesifikasi", "Harga tidak berdiri sendiri. Ia selalu mengikuti kombinasi ukuran, jumlah, material, finishing, dan kebutuhan waktu pengerjaan."),
      ],
      finalCtaTitle: "Pastikan material cetak Anda diputuskan dari spesifikasi yang benar",
      finalCtaDescription: "Jika Anda sudah tahu tujuan, jumlah, dan tenggatnya, kami bantu pecah ke spesifikasi yang lebih aman diproduksi dan lebih masuk akal untuk anggaran.",
      contentVariants: [
        contentVariant({
          slot: "heroEyebrow",
          text: "Percetakan untuk bisnis di {lokasi}",
          lane: "printing",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
        }),
        contentVariant({
          slot: "primaryKeyword",
          text: "Jasa Percetakan untuk Bisnis di {lokasi}",
          lane: "printing",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
          strength: "aggressive",
        }),
        contentVariant({
          slot: "intro",
          text: "Kami membantu bisnis di {lokasi} menyiapkan material cetak dengan spesifikasi yang lebih jelas, hasil yang lebih rapi, dan proses produksi yang lebih terkendali.",
          lane: "printing",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
        }),
        contentVariant({
          slot: "heroEyebrow",
          text: "{layanan} dengan spesifikasi, QC, dan timeline yang lebih jelas",
          lane: "printing",
          routeKinds: ["service", "service-city"],
          requiresService: true,
        }),
        contentVariant({
          slot: "primaryKeyword",
          text: "Jasa {layanan} dengan Hasil yang Lebih Siap Dipakai",
          lane: "printing",
          routeKinds: ["service"],
          requiresService: true,
          strength: "aggressive",
        }),
        contentVariant({
          slot: "primaryKeyword",
          text: "Jasa {layanan} di {lokasi}",
          lane: "printing",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
          strength: "aggressive",
        }),
        contentVariant({
          slot: "description",
          text: "Kami membantu menyiapkan {layanan} dengan spesifikasi yang lebih aman diproduksi, hasil yang lebih rapi, dan keputusan material yang tidak terasa menebak.",
          lane: "printing",
          routeKinds: ["service", "service-city"],
          requiresService: true,
        }),
        contentVariant({
          slot: "intro",
          text: "Pada {layanan}, risiko terbesarnya biasanya datang dari file yang kurang siap, spesifikasi yang kabur, atau deadline yang diputuskan tanpa basis produksi yang jelas.",
          lane: "printing",
          routeKinds: ["service"],
          requiresService: true,
        }),
        contentVariant({
          slot: "intro",
          text: "Untuk kebutuhan {layanan} di {lokasi}, kami membantu memecah spesifikasi, pilihan material, dan timeline agar output akhirnya lebih aman dipakai untuk promosi maupun distribusi.",
          lane: "printing",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
        }),
        contentVariant({
          slot: "ctaLabel",
          text: "Konsultasikan {layanan}",
          lane: "printing",
          routeKinds: ["service", "service-city"],
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaTitle",
          text: "Butuh hasil cetak yang lebih siap dipakai di {lokasi}?",
          lane: "printing",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
        }),
        contentVariant({
          slot: "finalCtaTitle",
          text: "Pastikan {layanan} Anda diputuskan dari spesifikasi yang benar",
          lane: "printing",
          routeKinds: ["service"],
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaTitle",
          text: "Butuh {layanan} yang lebih siap diproduksi di {lokasi}?",
          lane: "printing",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaDescription",
          text: "Diskusikan kebutuhan {layanan} Anda bersama kami. Kami bantu pecah ke jumlah, material, finishing, dan timeline yang lebih realistis untuk produksi.",
          lane: "printing",
          routeKinds: ["service"],
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaDescription",
          text: "Jika Anda butuh {layanan} di {lokasi}, kami bantu pastikan spesifikasi, proofing, dan timeline produksi sudah masuk akal sebelum cetak berjalan.",
          lane: "printing",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
        }),
      ],
    },
  },
  "page-template-software": {
    heroEyebrow: "Software untuk merapikan proses kerja dan keputusan operasional",
    lane: "software",
    trustMode: "aggressive",
    sourcePolicy: commonPolicy,
    structured: {
      primaryKeyword: "Software Custom yang Mengikuti Proses Bisnis Anda",
      secondaryKeywords: [
        "software custom bisnis",
        "pengembangan aplikasi operasional",
        "sistem informasi custom",
        "software house untuk workflow bisnis",
      ],
      description:
        "Kami membantu bisnis membangun software yang mengikuti alur kerja nyata di lapangan, bukan memaksa tim Anda menyesuaikan diri dengan sistem yang kaku.",
      intro:
        "Masalah terbesar pada software custom biasanya bukan kurang fitur, tetapi scope yang kabur. Karena itu kami memulai dari proses kerja, bottleneck operasional, dan prioritas bisnis yang paling mendesak.",
      highlights: [
        "Discovery diarahkan ke alur kerja nyata agar fitur yang dibangun benar-benar relevan dengan bottleneck tim.",
        "Paket dibuat bertahap supaya Anda bisa membedakan kapan cukup dengan MVP, kapan perlu sistem penuh, dan kapan perlu roadmap enterprise.",
        "UI, role, dan proses approval dibangun untuk mengurangi kebingungan operasional, bukan hanya mempercantik dashboard.",
        "Implementasi software dipikirkan bersama training, handover, dan kesiapan tim yang akan memakainya sehari-hari.",
      ],
      eeatPoints: [
        eeat("Proyek dimulai dari proses bisnis, bukan daftar fitur mentah", "Kami memetakan alur kerja, titik error, dan hambatan utama lebih dulu agar software yang dibangun tidak menjadi beban operasional baru."),
        eeat("Pembangunan bisa dibagi bertahap", "Tidak semua kebutuhan harus dibangun sekaligus. Tahapan seperti MVP, validasi proses, dan scale-up membantu keputusan investasi tetap rasional."),
        eeat("Peran user dan flow approval diperjelas", "Banyak masalah software muncul karena hak akses, alur data, dan tanggung jawab antar tim tidak didefinisikan sejak awal."),
        eeat("Handover dan kesiapan tim ikut diperhitungkan", "Software yang bagus tetap gagal jika tim sulit mengadopsinya. Karena itu pelatihan, dokumentasi, dan fase stabilisasi tidak kami abaikan."),
      ],
      process: [
        "Discovery untuk memahami bottleneck operasional, alur approval, dan output yang benar-benar dibutuhkan tim.",
        "Pemetaan scope prioritas agar jelas fitur inti, data yang masuk, user role, dan tahap implementasinya.",
        "Development bertahap dengan quality check pada logika proses, hak akses, dan kejelasan penggunaan.",
        "Testing, handover, dan pendampingan awal supaya software benar-benar siap dipakai di aktivitas harian.",
      ],
      faqs: [
        faq("Kapan bisnis sebaiknya memilih software custom?", "Saat workflow Anda sudah cukup spesifik sehingga software jadi terasa memaksa tim berputar mengikuti tool, bukan sebaliknya."),
        faq("Apakah semua fitur harus dibangun sekaligus?", "Tidak. Banyak proyek lebih sehat dimulai dari MVP atau modul inti agar keputusan berikutnya didasarkan pada pemakaian nyata, bukan asumsi."),
        faq("Apakah software baru bisa diintegrasikan dengan proses atau tools yang sudah ada?", "Bisa, tetapi kebutuhan integrasi perlu dipetakan sejak awal karena dampaknya langsung ke struktur data, hak akses, dan prioritas pengerjaan."),
        faq("Bagaimana memastikan software nanti benar-benar dipakai tim?", "Selain build, fase implementasi perlu mempertimbangkan training, dokumentasi, dan penyesuaian kecil setelah tim mulai menggunakan sistem secara nyata."),
      ],
      ctaLabel: "Diskusikan Scope Software",
      ctaLink: externalLink(
        "https://wa.me/6285799520350?text=Halo%2C%20saya%20ingin%20diskusi%20tentang%20software%20custom%20untuk%20operasional%20bisnis%20saya.",
        "Diskusikan Scope Software"
      ),
      ctaLinks: [
        ctaLink("Lihat Use Case Proyek", "https://www.kotacom.id/projects"),
        ctaLink("Bandingkan Paket Software", "https://www.kotacom.id/software#paket"),
      ],
      serviceTypes: [
        serviceType("MVP dan Prototype Operasional", "Untuk memvalidasi alur inti lebih cepat sebelum membangun sistem yang lebih luas.", "https://www.kotacom.id/software/pembuatan-software"),
        serviceType("Sistem Internal dan Dashboard", "Untuk bisnis yang ingin merapikan approval, reporting, stok, layanan, atau proses tim lintas divisi.", "https://www.kotacom.id/software/implementasi-software"),
        serviceType("Integrasi dan Pengembangan Bertahap", "Untuk kebutuhan yang sudah punya sistem awal tetapi perlu sambungan data, modul baru, atau perbaikan workflow.", "https://www.kotacom.id/software/instalasi-software"),
      ],
      pricingPlans: [
        pricingPlan("MVP", "Mulai 15jt", "Untuk validasi alur kerja inti sebelum masuk ke pengembangan sistem yang lebih luas.", ["Fokus pada proses yang paling kritis lebih dulu", "Cocok untuk menguji asumsi dan kebutuhan user", "Ruang iterasi masih dibuat lebih pendek"]),
        pricingPlan("Full System", "Mulai 50jt", "Untuk bisnis yang sudah jelas kebutuhan proses, role, dan outputnya sehingga sistem bisa dibangun lebih lengkap.", ["Mencakup flow operasional yang lebih menyeluruh", "Lebih cocok untuk tim yang sudah siap implementasi", "Membutuhkan discovery dan pengujian yang lebih dalam"], true),
        pricingPlan("Enterprise", "Custom", "Untuk kebutuhan multi-role, multi-cabang, integrasi kompleks, atau roadmap implementasi bertahap skala besar.", ["Pendekatan lebih strategis dan bertahap", "Scope bergantung pada proses, data, dan integrasi", "Umumnya memerlukan fase discovery yang lebih formal"]),
      ],
      features: [
        feature("Scope lebih mudah diprioritaskan", "Pengerjaan dimulai dari masalah yang paling sering menghambat operasional, bukan dari daftar fitur yang terlalu panjang.", "conversion"),
        feature("User role dan flow approval lebih jelas", "Hak akses, status proses, dan tanggung jawab antar tim dibahas sejak awal agar sistem tidak membingungkan saat dipakai.", "security"),
        feature("Cocok untuk build bertahap", "Jika belum siap langsung membangun sistem besar, proyek bisa dipecah menjadi fase yang lebih rasional.", "support"),
        feature("Lebih relevan untuk operasi harian", "Desain sistem diarahkan ke kegiatan yang benar-benar dilakukan tim setiap hari, bukan sekadar dashboard yang ramai fitur.", "boxes"),
      ],
      proofItems: [
        proof("Dashboard operasional internal", "Dipakai untuk merapikan approval, rekap data, dan visibilitas proses yang sebelumnya tersebar di chat atau spreadsheet."),
        proof("Sistem layanan dan pencatatan proses", "Cocok saat bisnis butuh histori kerja yang lebih mudah ditelusuri dan lebih aman dibanding proses manual."),
        proof("Aplikasi workflow khusus", "Relevan untuk proses yang tidak tertangani baik oleh tool generik karena butuh aturan, role, atau tahapan yang lebih spesifik."),
      ],
      testimonials: [
        testimonial("Andre", "Kepala operasional", "Yang paling membantu adalah cara tim memecah kebutuhan besar menjadi prioritas yang lebih realistis. Jadi proyeknya tidak langsung melebar ke mana-mana."),
        testimonial("Nisa", "Owner bisnis distribusi", "Sebelum mulai build, bottleneck kami dipetakan dulu. Itu membuat sistem yang jadi terasa lebih nyambung dengan aktivitas tim sehari-hari."),
        testimonial("Rama", "Project lead internal", "Diskusi role user dan alur approval di awal mengurangi banyak kebingungan yang biasanya baru terasa setelah sistem selesai dibangun."),
      ],
      longGuide: [
        guide("Kapan cukup mulai dari MVP", "Jika proses inti belum benar-benar tervalidasi atau tim masih perlu melihat perilaku user lebih dulu, MVP sering menjadi langkah paling efisien."),
        guide("Cara memetakan bottleneck sebelum build software", "Jangan mulai dari fitur. Mulailah dari aktivitas yang sering terlambat, sering salah, atau paling sering menimbulkan pekerjaan ulang."),
        guide("Mengapa dokumentasi dan handover tidak boleh ditunda", "Saat sistem mulai dipakai tim, dokumentasi proses dan sesi onboarding membantu software lebih cepat menghasilkan dampak operasional nyata."),
      ],
      finalCtaTitle: "Bangun software dari proses yang paling ingin Anda rapikan lebih dulu",
      finalCtaDescription: "Kami bantu pecah kebutuhan Anda menjadi scope yang lebih jelas, lebih realistis secara implementasi, dan lebih mudah dipahami tim yang nanti akan memakainya.",
      contentVariants: [
        contentVariant({
          slot: "heroEyebrow",
          text: "Software untuk operasional bisnis di {lokasi}",
          lane: "software",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
        }),
        contentVariant({
          slot: "primaryKeyword",
          text: "Software Custom untuk Operasional Bisnis di {lokasi}",
          lane: "software",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
          strength: "aggressive",
        }),
        contentVariant({
          slot: "intro",
          text: "Kami membantu bisnis di {lokasi} membangun software yang mengikuti alur kerja nyata, lebih mudah diadopsi tim, dan lebih relevan untuk keputusan operasional harian.",
          lane: "software",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
        }),
        contentVariant({
          slot: "heroEyebrow",
          text: "{layanan} untuk proses yang ingin dirapikan lebih dulu",
          lane: "software",
          routeKinds: ["service", "service-city"],
          requiresService: true,
        }),
        contentVariant({
          slot: "primaryKeyword",
          text: "Pembuatan {layanan} yang Mengikuti Workflow Bisnis",
          lane: "software",
          routeKinds: ["service"],
          requiresService: true,
          strength: "aggressive",
        }),
        contentVariant({
          slot: "primaryKeyword",
          text: "Pembuatan {layanan} di {lokasi}",
          lane: "software",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
          strength: "aggressive",
        }),
        contentVariant({
          slot: "description",
          text: "Kami membantu membangun {layanan} yang lebih relevan untuk alur kerja harian, lebih mudah dipahami user, dan lebih realistis saat diimplementasikan bertahap.",
          lane: "software",
          routeKinds: ["service", "service-city"],
          requiresService: true,
        }),
        contentVariant({
          slot: "intro",
          text: "{layanan} yang sehat dimulai dari bottleneck yang jelas, role user yang rapi, dan keputusan scope yang tidak dipaksakan terlalu luas sejak awal.",
          lane: "software",
          routeKinds: ["service"],
          requiresService: true,
        }),
        contentVariant({
          slot: "intro",
          text: "Jika Anda butuh {layanan} di {lokasi}, kami membantu memetakan alur kerja, prioritas modul, dan tahap implementasi agar tim lebih siap mengadopsinya.",
          lane: "software",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
        }),
        contentVariant({
          slot: "ctaLabel",
          text: "Diskusikan {layanan}",
          lane: "software",
          routeKinds: ["service", "service-city"],
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaTitle",
          text: "Butuh software yang lebih nyambung dengan proses bisnis di {lokasi}?",
          lane: "software",
          routeKinds: ["city", "service-city"],
          requiresLocation: true,
        }),
        contentVariant({
          slot: "finalCtaTitle",
          text: "Mulai {layanan} dari bottleneck yang paling mahal lebih dulu",
          lane: "software",
          routeKinds: ["service"],
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaTitle",
          text: "Butuh {layanan} yang lebih nyambung dengan proses bisnis di {lokasi}?",
          lane: "software",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaDescription",
          text: "Kami bantu pecah kebutuhan {layanan} menjadi scope yang lebih jelas, fase implementasi yang lebih realistis, dan alur adopsi yang lebih masuk akal untuk tim Anda.",
          lane: "software",
          routeKinds: ["service"],
          requiresService: true,
        }),
        contentVariant({
          slot: "finalCtaDescription",
          text: "Diskusikan kebutuhan {layanan} di {lokasi}. Kami bantu tentukan modul inti, integrasi penting, dan langkah implementasi yang paling realistis untuk operasional Anda.",
          lane: "software",
          routeKinds: ["service-city"],
          requiresLocation: true,
          requiresService: true,
        }),
      ],
    },
  },
  "page-template-generic-company": {
    heroEyebrow: "Layanan bisnis dengan proses yang lebih jelas dan hasil yang lebih mudah dipahami",
    lane: "generic",
    trustMode: "safe",
    sourcePolicy: {
      pricingSource: "page-first",
      proofSource: "page-first",
      testimonialSource: "page-first",
      maxQuickLinks: 1,
    },
    structured: {
      primaryKeyword: "Layanan Bisnis yang Fokus pada Hasil dan Kejelasan Proses",
      secondaryKeywords: [
        "layanan bisnis profesional",
        "partner implementasi bisnis",
        "layanan dengan proses terstruktur",
      ],
      description:
        "Template ini dipakai sebagai fallback untuk layanan bisnis yang tetap butuh alur pesan yang rapi, bukti yang relevan, dan CTA yang jelas tanpa terlalu mengunci ke satu lane.",
      intro:
        "Jika sebuah layanan belum punya shell khusus, halaman tetap harus bisa menjelaskan nilai, ruang lingkup kerja, dan langkah berikutnya dengan cepat. Itu fungsi template generic ini.",
      highlights: [
        "Fokus pada kejelasan pesan di atas variasi visual yang berlebihan.",
        "Cocok untuk layanan yang belum membutuhkan narasi sangat spesifik seperti website, software, atau percetakan.",
        "Dibangun agar editor tetap bisa menambahkan proof, FAQ, dan CTA tanpa merusak alur baca.",
        "Dapat dipakai sebagai fallback internal sambil menunggu lane khusus dibuat.",
      ],
      eeatPoints: [
        eeat("Template fallback tetap menjaga struktur keputusan", "Pengunjung tetap diarahkan dari pemahaman masalah ke bukti, FAQ, lalu CTA dengan pola yang konsisten."),
        eeat("Konten bisa dipertajam bertahap", "Template ini sengaja netral agar aman dipakai sambil menunggu asset, proof, dan positioning yang lebih spesifik."),
      ],
      process: [
        "Masalah dan hasil yang diinginkan dijelaskan lebih dulu.",
        "Cakupan layanan dan nilai utamanya dipetakan secara ringkas.",
        "Bukti, FAQ, dan CTA dipakai untuk menurunkan keraguan.",
        "Halaman bisa ditingkatkan lagi saat lane khusus sudah siap.",
      ],
      faqs: [
        faq("Kapan template generic sebaiknya dipakai?", "Saat sebuah layanan belum punya shell khusus tetapi tetap perlu halaman yang rapi dan tidak terasa seperti placeholder kosong."),
        faq("Apa yang harus segera ditambahkan saat memakai template ini?", "Proof yang relevan, paket yang masuk akal, dan FAQ yang benar-benar menjawab keberatan pembeli untuk layanan tersebut."),
      ],
      ctaLabel: "Diskusikan Kebutuhan Anda",
      ctaLink: externalLink(
        "https://wa.me/6285799520350?text=Halo%2C%20saya%20ingin%20diskusi%20tentang%20kebutuhan%20layanan%20untuk%20bisnis%20saya.",
        "Diskusikan Kebutuhan Anda"
      ),
      ctaLinks: [ctaLink("Lihat Contoh Proyek", "https://www.kotacom.id/projects")],
      serviceTypes: [
        serviceType("Layanan inti", "Dipakai untuk menjelaskan ruang lingkup utama tanpa langsung mengunci ke subkategori yang terlalu spesifik.", "https://www.kotacom.id/services"),
      ],
      pricingPlans: [
        pricingPlan("Starter", "Mulai 3jt", "Titik mulai untuk kebutuhan yang masih sederhana dan perlu scope yang lebih ringkas.", ["Cocok untuk validasi awal kebutuhan", "Scope biasanya lebih terbatas", "Masih aman untuk diskusi dan penyesuaian"]),
        pricingPlan("Growth", "Mulai 8jt", "Untuk kebutuhan yang mulai menuntut proses kerja, deliverable, dan support yang lebih lengkap.", ["Cakupan lebih luas dari starter", "Butuh koordinasi dan artefak yang lebih jelas", "Biasanya lebih cocok untuk tim yang sudah siap eksekusi"], true),
        pricingPlan("Custom", "Custom", "Untuk kebutuhan yang belum cocok dimasukkan ke paket standar dan perlu diskusi lebih mendalam.", ["Harga mengikuti scope dan kompleksitas", "Cocok untuk kebutuhan lintas fungsi", "Biasanya memerlukan discovery lebih dalam"]),
      ],
      features: [
        feature("Pesan tetap fokus", "Meski generik, template ini tetap dibangun untuk menghindari halaman yang terasa terlalu bercabang.", "conversion"),
        feature("Bisa diperkaya bertahap", "Proof, FAQ, dan paket dapat diperbarui tanpa membongkar seluruh struktur halaman.", "support"),
      ],
      proofItems: [
        proof("Bukti kerja yang relevan", "Gunakan contoh proyek yang paling dekat dengan masalah, buyer intent, dan hasil yang dicari calon klien di halaman ini."),
      ],
      testimonials: [
        testimonial("Hendra", "Manager operasional", "Yang kami butuhkan bukan halaman yang ramai, tetapi halaman yang cepat menjelaskan scope, bukti kerja, dan langkah kontak berikutnya."),
      ],
      finalCtaTitle: "Gunakan template generic hanya sampai lane khusus siap",
      finalCtaDescription: "Template ini aman dipakai untuk menjaga struktur tetap rapi. Tetapi saat buyer intent, proof, dan positioning sudah jelas, pindah ke shell khusus akan memberi hasil konversi yang lebih kuat.",
    },
  },
};

async function main() {
  await loadSanityEnv();
  const readClient = await createSanityReadClient();
  const writeClient = WRITE_MODE ? await createSanityWriteClient() : null;

  const currentTemplates = await readClient.fetch(
    `*[_type == "pageTemplate"]{_id,title,variant,lane,trustMode,sourcePolicy}`
  );

  console.log(`Found ${currentTemplates.length} templates.`);

  for (const template of currentTemplates) {
    const patch = templatePatches[template._id];
    if (!patch) {
      console.log(`- Skipping ${template._id} (no patch definition)`);
      continue;
    }

    console.log(`- Preparing ${template._id}`);
    if (!WRITE_MODE) continue;

    await writeClient
      .patch(template._id)
      .set({
        heroEyebrow: patch.heroEyebrow,
        lane: patch.lane,
        trustMode: patch.trustMode,
        sourcePolicy: patch.sourcePolicy,
        structured: patch.structured,
      })
      .commit();
  }

  if (!WRITE_MODE) {
    console.log("Dry run only. Re-run with --write to patch Sanity.");
    return;
  }

  const updated = await readClient.fetch(
    `*[_type == "pageTemplate"]{_id,title,variant,lane,trustMode,sourcePolicy,structured{primaryKeyword,ctaLabel,ctaLinks[]{label},pricingPlans[]{name,price},proofItems[]{title},testimonials[]{name},contentVariants[]{slot,routeKinds,requiresLocation,requiresService}}}`
  );

  console.log(JSON.stringify(updated, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
