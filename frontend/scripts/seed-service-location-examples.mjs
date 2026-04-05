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

const docs = [
  // Service documents
  {
    _id: "service-toko-online",
    _type: "service",
    title: "Jasa Pembuatan Website Toko Online",
    slug: { _type: "slug", current: "toko-online" },
    excerpt:
      "Bangun toko online profesional dengan fitur lengkap untuk jualan online yang efektif.",
    startingPrice: 15000000,
    currency: "IDR",
    duration: "3-4 minggu",
    featured: true,
  },
  {
    _id: "service-company-profile",
    _type: "service",
    title: "Jasa Pembuatan Website Company Profile",
    slug: { _type: "slug", current: "company-profile" },
    excerpt:
      "Website profesional untuk membangun kredibilitas dan branding perusahaan Anda.",
    startingPrice: 8000000,
    currency: "IDR",
    duration: "2-3 minggu",
    featured: true,
  },
  {
    _id: "service-software-apotik",
    _type: "service",
    title: "Software Apotik",
    slug: { _type: "slug", current: "apotik" },
    excerpt:
      "Sistem manajemen apotik lengkap dengan inventory, resep, dan laporan keuangan.",
    startingPrice: 25000000,
    currency: "IDR",
    duration: "4-6 minggu",
    featured: true,
  },
  {
    _id: "service-software-klinik",
    _type: "service",
    title: "Software Klinik",
    slug: { _type: "slug", current: "klinik" },
    excerpt:
      "Sistem informasi klinik untuk pendaftaran, rekam medis, dan billing terintegrasi.",
    startingPrice: 30000000,
    currency: "IDR",
    duration: "5-7 minggu",
    featured: true,
  },
  // Location: Jakarta
  {
    _id: "location-jakarta",
    _type: "location",
    title: "Jakarta",
    slug: { _type: "slug", current: "jakarta" },
    province: "DKI Jakarta",
    region: "DKI Jakarta",
    overview:
      "Jakarta sebagai ibukota dan pusat bisnis Indonesia memiliki kebutuhan tinggi untuk layanan digital dan software enterprise. Ekosistem startup dan korporat yang matang menjadikan Jakarta pasar utama untuk solusi teknologi.",
    highlights: [
      "Pusat bisnis dan korporat terbesar Indonesia",
      "Ekosistem startup dan tech company yang matang",
      "Akses mudah ke talent pool berkualitas",
      "Infrastruktur digital terlengkap",
    ],
  },
  // Location: Bandung
  {
    _id: "location-bandung",
    _type: "location",
    title: "Bandung",
    slug: { _type: "slug", current: "bandung" },
    province: "Jawa Barat",
    region: "Jawa Barat",
    overview:
      "Bandung dikenal sebagai kota kreatif dengan banyak startup dan UMKM yang berkembang. Kebutuhan akan website dan software custom terus meningkat seiring pertumbuhan ekonomi digital.",
    highlights: [
      "Kota kreatif dengan banyak startup",
      "UMKM yang berkembang pesat",
      "Komunitas tech yang aktif",
      "Biaya operasional lebih efisien",
    ],
  },
  // ServiceLocation: /pembuatan-website/toko-online/surabaya
  {
    _id: "service-location-website-toko-online-surabaya",
    _type: "serviceLocation",
    title: "Jasa Pembuatan Website Toko Online Surabaya",
    routePattern: "/pembuatan-website/{service}/{lokasi}",
    service: { _type: "reference", _ref: "service-toko-online" },
    location: { _type: "reference", _ref: "location-surabaya" },
    template: { _type: "reference", _ref: "page-template-pembuatan-website" },
    structured: {
      primaryKeyword: "Jasa Pembuatan Website Toko Online Surabaya",
      secondaryKeywords: [
        "Buat toko online Surabaya",
        "Website e-commerce Surabaya",
        "Jasa web toko online Surabaya",
        "Developer toko online Surabaya",
      ],
      description:
        "Jasa pembuatan website toko online profesional di Surabaya dengan fitur lengkap, payment gateway, dan siap jualan online.",
      intro:
        "Bangun toko online yang tidak hanya cantik tapi juga mudah dikelola dan siap konversi untuk bisnis Anda di Surabaya.",
      highlights: [
        "Unlimited produk dengan manajemen inventory otomatis",
        "Integrasi payment gateway lokal (Midtrans, Xendit, dll)",
        "Dashboard admin yang user-friendly",
        "SEO-optimized untuk ranking Google lebih baik",
        "Mobile-responsive untuk pengalaman belanja optimal",
      ],
      faqs: withKeys([
        {
          question: "Berapa lama proses pembuatan toko online?",
          answer:
            "Untuk toko online standar 3-4 minggu, tergantung kompleksitas fitur dan jumlah produk awal.",
        },
        {
          question: "Apakah bisa integrasi dengan marketplace?",
          answer:
            "Bisa. Kami bisa integrasikan dengan Tokopedia, Shopee, atau marketplace lain sesuai kebutuhan.",
        },
        {
          question: "Apakah ada biaya maintenance?",
          answer:
            "Maintenance gratis 6 bulan pertama. Setelah itu bisa lanjut paket maintenance atau kelola sendiri.",
        },
      ]),
    },
    contentStatus: "draft",
    meta: {
      noindex: true,
    },
  },
  // ServiceLocation: /pembuatan-website/company-profile/jakarta
  {
    _id: "service-location-website-company-profile-jakarta",
    _type: "serviceLocation",
    title: "Jasa Pembuatan Website Company Profile Jakarta",
    routePattern: "/pembuatan-website/{service}/{lokasi}",
    service: { _type: "reference", _ref: "service-company-profile" },
    location: { _type: "reference", _ref: "location-jakarta" },
    template: { _type: "reference", _ref: "page-template-pembuatan-website" },
    structured: {
      primaryKeyword: "Jasa Pembuatan Website Company Profile Jakarta",
      secondaryKeywords: [
        "Buat website perusahaan Jakarta",
        "Web developer Jakarta",
        "Website korporat Jakarta",
        "Jasa web company profile Jakarta",
      ],
      description:
        "Jasa pembuatan website company profile profesional di Jakarta untuk membangun kredibilitas dan branding perusahaan Anda.",
      intro:
        "Website company profile yang tidak hanya informatif tapi juga memperkuat brand identity dan meningkatkan kepercayaan klien di Jakarta.",
    },
    contentStatus: "draft",
    meta: {
      noindex: true,
    },
  },
  // ServiceLocation: /software/apotik/bandung
  {
    _id: "service-location-software-apotik-bandung",
    _type: "serviceLocation",
    title: "Software Apotik Bandung",
    routePattern: "/software/{service}/{lokasi}",
    service: { _type: "reference", _ref: "service-software-apotik" },
    location: { _type: "reference", _ref: "location-bandung" },
    template: { _type: "reference", _ref: "page-template-software" },
    structured: {
      primaryKeyword: "Software Apotik Bandung",
      secondaryKeywords: [
        "Sistem apotik Bandung",
        "Aplikasi apotik Bandung",
        "Software farmasi Bandung",
        "Sistem informasi apotik Bandung",
      ],
      description:
        "Software apotik lengkap di Bandung untuk manajemen inventory obat, resep, penjualan, dan laporan keuangan terintegrasi.",
      intro:
        "Kelola apotik Anda di Bandung dengan sistem yang mudah, cepat, dan sesuai regulasi Kemenkes dengan fitur lengkap dari inventory hingga laporan.",
      highlights: [
        "Manajemen inventory obat dengan alert expired date",
        "Sistem resep dokter terintegrasi",
        "Laporan keuangan dan pajak otomatis",
        "Barcode scanner untuk transaksi cepat",
        "Sesuai regulasi Kemenkes dan BPOM",
      ],
      faqs: withKeys([
        {
          question: "Apakah software bisa diakses dari cabang lain?",
          answer:
            "Bisa. Sistem berbasis cloud sehingga bisa diakses dari mana saja dengan koneksi internet.",
        },
        {
          question: "Apakah ada training untuk staff?",
          answer:
            "Ya, kami sediakan training lengkap untuk admin dan kasir hingga mahir menggunakan sistem.",
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

  console.log(
    `\n📦 Seeding service location examples (${DRY_RUN ? "DRY RUN" : "LIVE"})\n`,
  );
  for (const doc of docs) {
    await upsertDoc(client, doc);
  }

  if (DRY_RUN) {
    console.log("\nDry run only. Re-run with --write to apply.");
  } else {
    console.log("\n✅ Done! Test URLs:");
    console.log("  - /pembuatan-website/toko-online/surabaya");
    console.log("  - /pembuatan-website/company-profile/jakarta");
    console.log("  - /software/apotik/bandung");
  }
}

main().catch((err) => {
  console.error("❌ Failed to seed service location examples:", err);
  process.exit(1);
});
