import type { LegacyAstroPage } from "../astro-static";
import { DEFAULT_CTA } from "./constants";
import { buildGenericCopy } from "./core";
import type { LegacyRewriteCopy } from "./types";
import { titleCaseFromSlug } from "./utils";
import { buildWebsiteCompanyProfilePageCopy } from "./website-pages/company-profile";
import { buildWebsiteDokterKlinikPageCopy } from "./website-pages/dokter-klinik";
import { buildWebsiteExpedisiPageCopy } from "./website-pages/expedisi";
import { buildWebsiteHargaPageCopy } from "./website-pages/harga";
import { buildWebsiteKonstruksiPageCopy } from "./website-pages/konstruksi";
import { buildWebsiteKomunitasNgoPageCopy } from "./website-pages/komunitas-ngo";
import { buildWebsiteMigrasiWordpressPageCopy } from "./website-pages/migrasi-wordpress";
import { buildWebsiteSekolahPageCopy } from "./website-pages/sekolah";
import { buildWebsiteTemplatePageCopy } from "./website-pages/template";
import { buildWebsiteIndexPageCopy } from "./website-pages/website-index";
import { buildWebsiteTokoOnlinePageCopy } from "./website-pages/toko-online";

export function buildWebsiteCityCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const city = titleCaseFromSlug(page.slug);
  const primaryKeyword = `Jasa Pembuatan Website ${city}`;

  return {
    primaryKeyword,
    secondaryKeywords: [
      `Pembuatan website ${city}`,
      `Website company profile ${city}`,
      `Jasa web profesional ${city}`,
      `Pembuatan landing page ${city}`,
      `Website SEO friendly ${city}`,
      `Website toko online ${city}`,
    ],
    description: `${primaryKeyword} untuk bisnis lokal yang membutuhkan website modern, SEO friendly, cepat diakses, dan siap dipakai untuk lead generation, company profile, maupun toko online.`,
    intro: `Kami membantu bisnis di ${city} membangun website yang fokus ke konversi, kecepatan, dan kredibilitas brand agar lebih mudah menangkap peluang dari traffic organik maupun iklan. Coverage ini juga kami perluas untuk intent yang sering muncul di live site seperti company profile, toko online, dan landing page bisnis lokal.`,
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
      {
        question: `Apakah bisa dibuat website company profile, toko online, atau landing page untuk bisnis di ${city}?`,
        answer:
          "Bisa. Struktur dan CTA kami sesuaikan dengan model bisnis Anda, apakah fokusnya company profile, penjualan produk, akuisisi lead, atau kombinasi beberapa tujuan sekaligus.",
      },
    ],
    ctaLinks: [
      { label: `Konsultasi Website ${city}`, href: DEFAULT_CTA },
      { label: "Lihat Harga Website", href: "/pembuatan-website/harga" },
      { label: "Website Company Profile", href: "/pembuatan-website/jasa-pembuatan-website-company-profile" },
      { label: "Website Toko Online", href: "/pembuatan-website/jasa-pembuatan-website-toko-online" },
    ],
    ctaLabel: `Konsultasi Website ${city}`,
    ctaHref: DEFAULT_CTA,
  };
}

export function buildWebsiteIndexCopy(): LegacyRewriteCopy {
  return buildWebsiteIndexPageCopy();
}

export function buildWebsiteServiceCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  if (page.slug === "harga") {
    return buildWebsiteHargaPageCopy();
  }

  if (page.slug === "jasa-pembuatan-website-company-profile") {
    return buildWebsiteCompanyProfilePageCopy();
  }

  if (page.slug === "jasa-migrasi-wordpress") {
    return buildWebsiteMigrasiWordpressPageCopy();
  }

  if (page.slug === "jasa-pembuatan-website-dokter-klinik") {
    return buildWebsiteDokterKlinikPageCopy();
  }

  if (page.slug === "jasa-pembuatan-website-expedisi") {
    return buildWebsiteExpedisiPageCopy();
  }

  if (page.slug === "jasa-pembuatan-website-komunitas-ngo") {
    return buildWebsiteKomunitasNgoPageCopy();
  }

  if (page.slug === "jasa-pembuatan-website-konstruksi") {
    return buildWebsiteKonstruksiPageCopy();
  }

  if (page.slug === "jasa-pembuatan-website-sekolah") {
    return buildWebsiteSekolahPageCopy();
  }

  if (page.slug === "jasa-pembuatan-website-toko-online") {
    return buildWebsiteTokoOnlinePageCopy();
  }

  if (page.slug === "template") {
    return buildWebsiteTemplatePageCopy();
  }

  const serviceName = titleCaseFromSlug(page.slug);
  const primaryKeyword = `Jasa ${serviceName}`;

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
    ctaHref: DEFAULT_CTA,
  };
}
