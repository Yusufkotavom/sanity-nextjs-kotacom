import { createSanityWriteClient, loadSanityEnv } from "./lib/sanity-page-guards.mjs";

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");
const DRY_RUN = !shouldWrite;

const makeKey = () =>
  `key_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;

const withKeys = (items) =>
  (items || []).map((item) => ({
    _key: item._key || makeKey(),
    ...item,
  }));

const baseTemplate = {
  _type: "pageTemplate",
  variant: "service-hero",
  isHybrid: true,
  topBlockCountDefault: 1,
  structured: {
    primaryKeyword: "Solusi Layanan Profesional {lokasi}",
    secondaryKeywords: [
      "Konsultasi cepat {lokasi}",
      "Tim berpengalaman {lokasi}",
      "Hasil terukur {lokasi}",
      "Layanan terpercaya {lokasi}",
    ],
    description:
      "Dapatkan pendampingan end-to-end untuk kebutuhan digital dan percetakan bisnis Anda di {lokasi} dengan proses yang jelas dan output yang konsisten.",
    intro:
      "Kami bantu menyiapkan strategi, produksi, dan eksekusi layanan di {lokasi} dengan timeline yang transparan serta komunikasi yang responsif.",
    highlights: [
      "Brief cepat ditransformasikan ke scope jelas dalam 1-2 hari kerja.",
      "Tim fokus pada kualitas output dan detail eksekusi sesuai standar industri.",
      "Timeline produksi dijaga lewat milestone terukur dengan update berkala.",
      "Kontrol kualitas ketat sebelum hasil dikirim ke klien.",
      "Support pasca-implementasi untuk memastikan hasil optimal.",
    ],
    eeatPoints: withKeys([
      {
        title: "Pengalaman Tim Produksi",
        description:
          "Berpengalaman menangani 200+ proyek B2B dan institusi di {lokasi} dengan standar QC yang terukur sejak 2015.",
      },
      {
        title: "Keahlian Teknis Terbukti",
        description:
          "Tim memahami spesifikasi material, desain, dan workflow operasional lintas industri dengan sertifikasi profesional.",
      },
      {
        title: "Otoritas & Portofolio Nyata",
        description:
          "Didukung portofolio pekerjaan nyata dan testimoni klien yang dapat diverifikasi dari berbagai sektor bisnis.",
      },
      {
        title: "Kepercayaan & Transparansi Penuh",
        description:
          "Estimasi waktu, biaya, dan proses disampaikan jelas sejak awal dengan kontrak tertulis dan garansi hasil.",
      },
    ]),
    process: [
      "Konsultasi awal dan mapping kebutuhan detail (gratis)",
      "Riset, desain, dan validasi spesifikasi bersama klien",
      "Produksi dan quality control bertahap dengan update progres",
      "Final delivery + support pasca implementasi hingga 30 hari",
    ],
    faqs: withKeys([
      {
        question: "Apakah bisa konsultasi sebelum proses dimulai?",
        answer:
          "Bisa. Kami lakukan discovery singkat agar scope dan estimasi lebih akurat. Konsultasi awal gratis tanpa komitmen.",
      },
      {
        question: "Bagaimana memastikan hasil sesuai target?",
        answer:
          "Setiap milestone dilengkapi quality check dan update progres agar tetap on-track. Anda bisa request revisi di setiap tahap.",
      },
      {
        question: "Berapa lama waktu pengerjaan rata-rata?",
        answer:
          "Tergantung scope, umumnya 2-4 minggu untuk proyek standar. Timeline detail akan disampaikan saat konsultasi awal.",
      },
      {
        question: "Apakah ada garansi hasil?",
        answer:
          "Ya, kami berikan garansi hasil sesuai spesifikasi yang disepakati dan support 30 hari pasca delivery.",
      },
    ]),
    ctaLabel: "Konsultasi Gratis Sekarang",
    ctaLink: { isExternal: true, href: "https://www.kotacom.id/contact" },
    ctaLinks: withKeys([
      {
        label: "Diskusi Proyek via WhatsApp",
        link: { isExternal: true, href: "https://wa.me/6281234567890" },
      },
      {
        label: "Lihat Portfolio Lengkap",
        link: { isExternal: true, href: "https://www.kotacom.id/projects" },
      },
      {
        label: "Cek Semua Layanan",
        link: { isExternal: true, href: "https://www.kotacom.id/services" },
      },
    ]),
    serviceTypes: withKeys([
      {
        title: "Strategi & Konsultasi",
        description:
          "Pendampingan awal untuk menentukan kebutuhan, scope, dan prioritas utama dengan analisis mendalam.",
        link: { isExternal: true, href: "https://www.kotacom.id/services/konsultasi" },
      },
      {
        title: "Produksi & Implementasi",
        description:
          "Eksekusi teknis dan produksi sesuai timeline dengan kontrol kualitas ketat di setiap tahap.",
        link: { isExternal: true, href: "https://www.kotacom.id/services/produksi" },
      },
      {
        title: "Optimasi & Support",
        description:
          "Perbaikan berkelanjutan dan dukungan pasca implementasi untuk hasil maksimal jangka panjang.",
        link: { isExternal: true, href: "https://www.kotacom.id/services/support" },
      },
    ]),
    pricingPlans: withKeys([
      {
        name: "Starter",
        price: "Mulai 3jt",
        description: "Cocok untuk kebutuhan dasar dan validasi awal proyek kecil.",
        items: [
          "Scope ringan (1-2 deliverable)",
          "Timeline singkat 1-2 minggu",
          "Support dasar via email",
          "1x revisi minor",
        ],
      },
      {
        name: "Growth",
        price: "Mulai 8jt",
        description: "Untuk kebutuhan produksi yang lebih lengkap dan kompleks.",
        items: [
          "Scope menengah (3-5 deliverable)",
          "QA tambahan di setiap milestone",
          "Support prioritas via WhatsApp",
          "3x revisi mayor",
          "Dokumentasi lengkap",
        ],
        recommended: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Solusi skala besar dengan dukungan penuh dan SLA khusus.",
        items: [
          "Scope unlimited sesuai kebutuhan",
          "Dedicated project manager",
          "Support 24/7 prioritas tinggi",
          "Unlimited revisi",
          "Training & dokumentasi lengkap",
          "Garansi extended 90 hari",
        ],
      },
    ]),
    features: withKeys([
      {
        title: "Proses Terstruktur & Transparan",
        description:
          "Setiap tahap kerja terdokumentasi untuk hasil yang rapi dengan timeline yang jelas.",
        icon: "speed",
      },
      {
        title: "Quality Control Ketat",
        description:
          "Audit hasil sebelum delivery agar konsisten dengan brief dan standar industri.",
        icon: "security",
      },
      {
        title: "Tim Berpengalaman",
        description:
          "Didukung profesional dengan track record terbukti di berbagai industri.",
        icon: "support",
      },
      {
        title: "Teknologi Modern",
        description:
          "Menggunakan tools dan teknologi terkini untuk hasil optimal dan efisien.",
        icon: "boxes",
      },
    ]),
    proofItems: withKeys([
      {
        title: "Kampanye Brand Lokal",
        description:
          "Produksi materi promosi lengkap untuk brand retail dengan timeline cepat 2 minggu.",
        link: { isExternal: true, href: "https://www.kotacom.id/projects/kampanye-brand" },
      },
      {
        title: "Implementasi Sistem Operasional",
        description:
          "Pendampingan end-to-end untuk digital workflow perusahaan manufaktur.",
        link: { isExternal: true, href: "https://www.kotacom.id/projects/sistem-operasional" },
      },
      {
        title: "Website E-Commerce Lengkap",
        description:
          "Pengembangan platform penjualan online dengan integrasi payment gateway.",
        link: { isExternal: true, href: "https://www.kotacom.id/projects/ecommerce" },
      },
    ]),
    testimonials: withKeys([
      {
        name: "Rina Susanti",
        role: "Marketing Lead - PT Maju Bersama",
        quote:
          "Tim Kotacom sangat responsif dan detail. Proses jelas, hasil rapi, dan delivery tepat waktu. Sangat recommended!",
      },
      {
        name: "Budi Hartono",
        role: "Owner - Toko Elektronik Jaya",
        quote:
          "Kualitas kerja profesional dengan harga yang masuk akal. Support pasca-implementasi juga sangat membantu.",
      },
      {
        name: "Siti Aminah",
        role: "Direktur Operasional - Yayasan Pendidikan",
        quote:
          "Pengalaman kerja sama yang menyenangkan. Tim sangat memahami kebutuhan kami dan memberikan solusi terbaik.",
      },
    ]),
    longGuide: withKeys([
      {
        title: "Panduan Memilih Partner Produksi yang Tepat",
        description:
          "Checklist lengkap untuk memastikan layanan sesuai kebutuhan bisnis: cek portofolio, testimoni, proses kerja, dan garansi hasil.",
      },
      {
        title: "Tips Memaksimalkan ROI dari Investasi Digital",
        description:
          "Strategi praktis untuk mendapatkan hasil optimal dari setiap rupiah yang diinvestasikan dalam proyek digital dan percetakan.",
      },
      {
        title: "Cara Menyiapkan Brief yang Efektif",
        description:
          "Panduan menyusun brief proyek yang jelas agar proses produksi lebih cepat dan hasil sesuai ekspektasi.",
      },
    ]),
    finalCtaTitle: "Siap Memulai Proyek Anda?",
    finalCtaDescription:
      "Sampaikan kebutuhan Anda sekarang, kami bantu menyiapkan strategi dan produksi terbaik dengan konsultasi gratis tanpa komitmen.",
  },
};

const docs = [
  {
    _id: "page-template-percetakan",
    ...baseTemplate,
    title: "Template Percetakan",
    slug: { _type: "slug", current: "template-percetakan" },
    variant: "pricing-focus",
    shellId: "percetakan",
    structured: {
      ...baseTemplate.structured,
      primaryKeyword: "Jasa Percetakan Profesional {lokasi}",
      secondaryKeywords: [
        "Cetak buku {lokasi}",
        "Cetak brosur {lokasi}",
        "Percetakan murah {lokasi}",
        "Cetak undangan {lokasi}",
      ],
      description:
        "Layanan percetakan lengkap di {lokasi} untuk kebutuhan promosi, operasional, dan branding dengan hasil konsisten dan harga kompetitif.",
      intro:
        "Kami menyediakan solusi percetakan profesional di {lokasi} dengan teknologi modern, material berkualitas, dan proses cepat untuk berbagai kebutuhan bisnis Anda.",
      serviceTypes: withKeys([
        {
          title: "Cetak Buku & Majalah",
          description:
            "Produksi buku, majalah, katalog dengan berbagai ukuran dan finishing premium.",
          link: { isExternal: true, href: "https://www.kotacom.id/percetakan/buku" },
        },
        {
          title: "Cetak Promosi",
          description:
            "Brosur, flyer, poster, banner untuk kampanye marketing yang efektif.",
          link: { isExternal: true, href: "https://www.kotacom.id/percetakan/promosi" },
        },
        {
          title: "Cetak Kemasan & Label",
          description:
            "Packaging produk, label, sticker dengan material food-grade tersedia.",
          link: { isExternal: true, href: "https://www.kotacom.id/percetakan/kemasan" },
        },
      ]),
      pricingPlans: withKeys([
        {
          name: "Print On Demand",
          price: "Mulai 50rb/unit",
          description: "Cetak satuan atau jumlah kecil tanpa minimum order.",
          items: [
            "Tanpa minimum order",
            "Proses cepat 2-3 hari",
            "Cocok untuk testing",
            "Free konsultasi desain",
          ],
        },
        {
          name: "Bulk Printing",
          price: "Mulai 2jt/1000 unit",
          description: "Cetak massal dengan harga lebih ekonomis per unit.",
          items: [
            "Minimum 500 unit",
            "Harga lebih murah per unit",
            "Quality control ketat",
            "Free sample sebelum produksi",
            "Garansi hasil",
          ],
          recommended: true,
        },
        {
          name: "Corporate Package",
          price: "Custom",
          description: "Paket khusus untuk kebutuhan korporat berkelanjutan.",
          items: [
            "Volume unlimited",
            "Dedicated account manager",
            "Priority production",
            "Storage & distribusi",
            "Invoice bulanan",
            "SLA khusus",
          ],
        },
      ]),
    },
  },
  {
    _id: "page-template-pembuatan-website",
    ...baseTemplate,
    title: "Template Pembuatan Website",
    slug: { _type: "slug", current: "template-pembuatan-website" },
    variant: "service-hero",
    shellId: "pembuatan-website",
    structured: {
      ...baseTemplate.structured,
      primaryKeyword: "Jasa Pembuatan Website Profesional {lokasi}",
      secondaryKeywords: [
        "Buat website {lokasi}",
        "Web developer {lokasi}",
        "Website murah {lokasi}",
        "Jasa web design {lokasi}",
      ],
      description:
        "Jasa pembuatan website profesional di {lokasi} dengan desain modern, SEO-friendly, dan siap konversi untuk bisnis Anda.",
      intro:
        "Kami bangun website yang tidak hanya cantik, tapi juga cepat, aman, dan mudah dikelola untuk mendukung pertumbuhan bisnis Anda di {lokasi}.",
      serviceTypes: withKeys([
        {
          title: "Company Profile",
          description:
            "Website profesional untuk membangun kredibilitas dan branding perusahaan.",
          link: { isExternal: true, href: "https://www.kotacom.id/pembuatan-website/company-profile" },
        },
        {
          title: "E-Commerce / Toko Online",
          description:
            "Platform penjualan online lengkap dengan payment gateway dan manajemen produk.",
          link: { isExternal: true, href: "https://www.kotacom.id/pembuatan-website/ecommerce" },
        },
        {
          title: "Landing Page",
          description:
            "Halaman khusus untuk kampanye marketing dengan fokus konversi tinggi.",
          link: { isExternal: true, href: "https://www.kotacom.id/pembuatan-website/landing-page" },
        },
      ]),
      pricingPlans: withKeys([
        {
          name: "Basic Website",
          price: "Mulai 3jt",
          description: "Website sederhana untuk kebutuhan online presence dasar.",
          items: [
            "5-7 halaman",
            "Responsive design",
            "SEO basic setup",
            "Contact form",
            "Free domain 1 tahun",
            "Free hosting 1 tahun",
          ],
        },
        {
          name: "Business Website",
          price: "Mulai 8jt",
          description: "Website lengkap dengan fitur bisnis dan CMS.",
          items: [
            "10-15 halaman",
            "Custom design",
            "CMS untuk update konten",
            "SEO optimization",
            "Blog system",
            "Analytics integration",
            "Free maintenance 3 bulan",
          ],
          recommended: true,
        },
        {
          name: "E-Commerce",
          price: "Mulai 15jt",
          description: "Toko online lengkap siap jualan.",
          items: [
            "Unlimited produk",
            "Payment gateway",
            "Inventory management",
            "Order tracking",
            "Customer dashboard",
            "Marketing tools",
            "Free maintenance 6 bulan",
          ],
        },
      ]),
    },
  },
  {
    _id: "page-template-software",
    ...baseTemplate,
    title: "Template Software",
    slug: { _type: "slug", current: "template-software" },
    variant: "local-proof",
    shellId: "software",
    structured: {
      ...baseTemplate.structured,
      primaryKeyword: "Software Custom Sesuai Proses Bisnis {lokasi}",
      secondaryKeywords: [
        "Software developer {lokasi}",
        "Aplikasi custom {lokasi}",
        "Sistem informasi {lokasi}",
        "Software house {lokasi}",
      ],
      description:
        "Pengembangan software custom di {lokasi} yang disesuaikan dengan alur kerja dan target bisnis Anda untuk efisiensi maksimal.",
      intro:
        "Kami bangun sistem yang benar-benar sesuai dengan kebutuhan operasional Anda di {lokasi}, bukan memaksa bisnis Anda menyesuaikan dengan software jadi.",
      serviceTypes: withKeys([
        {
          title: "Sistem Manajemen Internal",
          description:
            "ERP, HRM, inventory, atau sistem operasional khusus untuk efisiensi bisnis.",
          link: { isExternal: true, href: "https://www.kotacom.id/software/manajemen" },
        },
        {
          title: "Aplikasi Mobile",
          description:
            "Aplikasi iOS dan Android untuk customer engagement atau operasional lapangan.",
          link: { isExternal: true, href: "https://www.kotacom.id/software/mobile" },
        },
        {
          title: "Integrasi & API",
          description:
            "Koneksi antar sistem untuk otomasi dan sinkronisasi data real-time.",
          link: { isExternal: true, href: "https://www.kotacom.id/software/integrasi" },
        },
      ]),
      pricingPlans: withKeys([
        {
          name: "MVP / Prototype",
          price: "Mulai 15jt",
          description: "Versi awal untuk validasi konsep dan testing.",
          items: [
            "Core features only",
            "Basic UI/UX",
            "Web-based",
            "1 user role",
            "Testing & deployment",
            "Source code",
          ],
        },
        {
          name: "Full System",
          price: "Mulai 50jt",
          description: "Sistem lengkap siap produksi dengan fitur komprehensif.",
          items: [
            "Full features sesuai scope",
            "Custom UI/UX design",
            "Multi-platform",
            "Multiple user roles",
            "Admin dashboard",
            "API documentation",
            "Training & handover",
            "3 bulan support",
          ],
          recommended: true,
        },
        {
          name: "Enterprise Solution",
          price: "Custom",
          description: "Solusi skala besar dengan infrastruktur dan SLA khusus.",
          items: [
            "Unlimited features",
            "High availability setup",
            "Load balancing",
            "Security audit",
            "Dedicated DevOps",
            "24/7 monitoring",
            "SLA 99.9% uptime",
            "1 tahun support",
          ],
        },
      ]),
    },
  },
  {
    _id: "page-template-generic-company",
    ...baseTemplate,
    title: "Template Generic Company",
    slug: { _type: "slug", current: "template-generic-company" },
    variant: "generic-company",
    shellId: "layanan",
    structured: {
      ...baseTemplate.structured,
      primaryKeyword: "Layanan Bisnis Profesional {lokasi}",
      secondaryKeywords: [
        "Jasa profesional {lokasi}",
        "Konsultan bisnis {lokasi}",
        "Solusi bisnis {lokasi}",
        "Partner bisnis {lokasi}",
      ],
      description:
        "Solusi bisnis profesional di {lokasi} untuk mendukung pertumbuhan dan efisiensi operasional perusahaan Anda.",
      intro:
        "Kami menyediakan berbagai layanan bisnis profesional di {lokasi} dengan pendekatan yang disesuaikan dengan kebutuhan dan skala bisnis Anda.",
    },
  },
  {
    _id: "location-surabaya",
    _type: "location",
    title: "Surabaya",
    slug: { _type: "slug", current: "surabaya" },
    province: "Jawa Timur",
    region: "Jawa Timur",
    overview:
      "Surabaya sebagai pusat bisnis Jawa Timur memiliki kebutuhan tinggi untuk layanan digital dan percetakan skala menengah hingga besar, terutama untuk B2B dan institusi. Dengan ekosistem bisnis yang dinamis, Surabaya menjadi hub strategis untuk pengembangan usaha di Indonesia Timur.",
    highlights: [
      "Target audiens B2B aktif dengan daya beli tinggi",
      "Kebutuhan promosi dan branding yang konsisten",
      "Distribusi nasional lebih cepat dari lokasi strategis",
      "Ekosistem startup dan UMKM yang berkembang pesat",
    ],
  },
  {
    _id: "page-location-percetakan",
    _type: "pageLocation",
    title: "Percetakan Profesional",
    route: "/percetakan",
    slug: { _type: "slug", current: "percetakan" },
    template: { _type: "reference", _ref: "page-template-percetakan" },
    structured: {
      primaryKeyword: "Percetakan Profesional untuk Bisnis",
      description:
        "Percetakan lengkap untuk kebutuhan promosi, operasional, dan branding dengan hasil konsisten dan harga kompetitif.",
      ctaLabel: "Minta Penawaran Percetakan",
      ctaLink: { isExternal: true, href: "https://www.kotacom.id/contact" },
      ctaLinks: withKeys([
        {
          label: "Cek Produk Percetakan",
          link: { isExternal: true, href: "https://www.kotacom.id/products" },
        },
        {
          label: "Chat WhatsApp",
          link: { isExternal: true, href: "https://wa.me/6281234567890" },
        },
      ]),
    },
    contentStatus: "draft",
    meta: {
      noindex: true,
    },
  },
  {
    _id: "page-location-pembuatan-website",
    _type: "pageLocation",
    title: "Pembuatan Website Profesional",
    route: "/pembuatan-website",
    slug: { _type: "slug", current: "pembuatan-website" },
    template: { _type: "reference", _ref: "page-template-pembuatan-website" },
    structured: {
      primaryKeyword: "Jasa Pembuatan Website Profesional",
      description:
        "Bangun website cepat, modern, dan siap konversi untuk bisnis Anda dengan teknologi terkini.",
      ctaLabel: "Konsultasi Website Gratis",
      ctaLink: { isExternal: true, href: "https://www.kotacom.id/contact" },
      ctaLinks: withKeys([
        {
          label: "Lihat Portfolio Website",
          link: { isExternal: true, href: "https://www.kotacom.id/projects" },
        },
        {
          label: "Chat WhatsApp",
          link: { isExternal: true, href: "https://wa.me/6281234567890" },
        },
      ]),
    },
    contentStatus: "draft",
    meta: {
      noindex: true,
    },
  },
  {
    _id: "page-location-software",
    _type: "pageLocation",
    title: "Software Custom untuk Operasional",
    route: "/software",
    slug: { _type: "slug", current: "software" },
    template: { _type: "reference", _ref: "page-template-software" },
    structured: {
      primaryKeyword: "Software Custom Sesuai Proses Bisnis",
      description:
        "Sistem yang disesuaikan dengan alur kerja dan target bisnis Anda untuk efisiensi maksimal.",
      ctaLabel: "Diskusi Kebutuhan Software",
      ctaLink: { isExternal: true, href: "https://www.kotacom.id/contact" },
      ctaLinks: withKeys([
        {
          label: "Lihat Case Study",
          link: { isExternal: true, href: "https://www.kotacom.id/projects/software" },
        },
        {
          label: "Chat WhatsApp",
          link: { isExternal: true, href: "https://wa.me/6281234567890" },
        },
      ]),
    },
    contentStatus: "draft",
    meta: {
      noindex: true,
    },
  },
  {
    _id: "service-location-jasa-cetak-buku-surabaya",
    _type: "serviceLocation",
    title: "Jasa Cetak Buku Surabaya",
    route: "/jasa-cetak-buku-surabaya",
    slug: { _type: "slug", current: "jasa-cetak-buku-surabaya" },
    location: { _type: "reference", _ref: "location-surabaya" },
    template: { _type: "reference", _ref: "page-template-percetakan" },
    structured: {
      primaryKeyword: "Jasa Cetak Buku Surabaya",
      secondaryKeywords: [
        "Cetak buku murah Surabaya",
        "Percetakan buku Surabaya",
        "Print on demand Surabaya",
        "Cetak novel Surabaya",
      ],
      description:
        "Layanan cetak buku Surabaya untuk penulis, penerbit, dan komunitas dengan opsi POD maupun produksi massal. Kualitas premium, harga kompetitif.",
      intro:
        "Wujudkan karya tulis Anda menjadi buku fisik berkualitas dengan layanan cetak buku profesional di Surabaya. Dari satuan hingga ribuan eksemplar.",
      ctaLabel: "Konsultasi Cetak Buku Gratis",
      ctaLink: { isExternal: true, href: "https://www.kotacom.id/contact" },
      ctaLinks: withKeys([
        {
          label: "Chat WhatsApp Sekarang",
          link: { isExternal: true, href: "https://wa.me/6281234567890" },
        },
        {
          label: "Lihat Contoh Hasil Cetak",
          link: { isExternal: true, href: "https://www.kotacom.id/portfolio/cetak-buku" },
        },
      ]),
      faqs: withKeys([
        {
          question: "Apakah bisa konsultasi spesifikasi cetak dulu?",
          answer:
            "Bisa. Kami bantu cek ukuran, kertas, dan finishing agar hasil lebih optimal. Konsultasi gratis tanpa komitmen.",
        },
        {
          question: "Berapa minimum order untuk cetak buku?",
          answer:
            "Kami terima mulai dari 1 eksemplar (POD) hingga ribuan eksemplar untuk produksi massal.",
        },
        {
          question: "Berapa lama proses cetak buku?",
          answer:
            "POD 3-5 hari kerja, produksi massal 7-14 hari tergantung jumlah dan spesifikasi.",
        },
      ]),
    },
    contentStatus: "draft",
    meta: {
      noindex: true,
    },
  },
];

const upsertDoc = async (client, doc) => {
  if (DRY_RUN) {
    console.log(`DRY RUN: would upsert ${doc._type} (${doc._id})`);
    return;
  }
  await client.createOrReplace(doc);
  console.log(`✅ Upserted ${doc._type} (${doc._id})`);
};

async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  console.log(`\n📦 Seeding template samples (${DRY_RUN ? "DRY RUN" : "LIVE"})\n`);
  for (const doc of docs) {
    await upsertDoc(client, doc);
  }

  if (DRY_RUN) {
    console.log("\nDry run only. Re-run with --write to apply.");
  }
}

main().catch((err) => {
  console.error("❌ Failed to seed template samples:", err);
  process.exit(1);
});
