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
  serviceTypes?: Array<{ title: string; description: string; href?: string }>;
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
    return buildWebsiteCityCopy(page);
  }

  if (page.section === "pembuatan-website") {
    if (page.slug !== "pembuatan-website") {
      return buildWebsiteServiceCopy(page);
    }
    return buildWebsiteIndexCopy();
  }

  if (page.section === "percetakan") {
    if (page.slug !== "percetakan") {
      return buildPrintingDetailCopy(page);
    }
    return buildPrintingCopy(page);
  }

  if (page.section === "software" || page.section === "sistem-pos") {
    const softwareCopy =
      page.section === "software" && page.slug !== "software"
        ? buildSoftwareDetailCopy(page)
        : buildSoftwareCopy(page);
    if (page.section === "sistem-pos") {
      return {
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
      };
    }
    return softwareCopy;
  }

  if (page.section === "layanan") {
    return buildLayananCopy();
  }

  if (page.section === "about") {
    if (page.slug === "ai-statement") {
      return buildAboutStatementCopy();
    }
    return buildAboutCopy();
  }

  if (page.section === "contact") {
    return buildContactCopy();
  }

  if (page.section === "privacy") {
    return buildPrivacyCopy();
  }

  return buildGenericCopy(page);
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
  };
}
