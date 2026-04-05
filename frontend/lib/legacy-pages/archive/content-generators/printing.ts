import type { LegacyAstroPage } from "../../astro-static";
import { DEFAULT_CTA } from "./constants";
import { buildGenericCopy } from "./core";
import { CETAK_BUKU_CITY_INTENT_OVERRIDES } from "./printing-pages/cetak-buku-city-overrides";
import { buildPercetakanCetakBrosurPageCopy } from "./printing-pages/cetak-brosur";
import { buildPercetakanCetakBukuPageCopy } from "./printing-pages/cetak-buku";
import { buildPercetakanCetakCompanyProfilePageCopy } from "./printing-pages/cetak-company-profile";
import {
  PRINTING_DETAIL_PRESETS,
} from "./printing-pages/detail-presets";
import { buildPercetakanIndexPageCopy } from "./printing-pages/percetakan-index";
import type { LegacyRewriteCopy } from "./types";
import { titleCaseFromSlug } from "./utils";

import { PERCETAKAN_CITY_INTENT_OVERRIDES } from "./printing-pages/city-overrides";

export function buildPrintingCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const service = page.title;
  const primaryKeyword =
    page.route === "/percetakan" ? "Jasa Percetakan Surabaya" : `Jasa ${service}`;

  const cityKey = page.slug?.toLowerCase() || "";
  const cityOverride = PERCETAKAN_CITY_INTENT_OVERRIDES[cityKey] || {};

  if (page.route === "/percetakan") {
    return buildPercetakanIndexPageCopy();
  }

  return {
    primaryKeyword,
    secondaryKeywords: [
      `${service} berkualitas`,
      `${service} cepat`,
      `${service} untuk bisnis`,
      `${service} custom`,
      `${service} Surabaya`,
    ],
    description: `${primaryKeyword} untuk kebutuhan promosi dan branding dengan hasil cetak konsisten, material jelas, serta proses produksi terukur.`,
    intro: `${service} kami siapkan untuk membantu bisnis menjaga kualitas materi promosi, dokumen brand, dan kebutuhan distribusi dengan hasil akhir yang lebih rapi, lebih presisi, dan lebih siap dipakai.`,
    highlights: [
      "Pilihan material dan finishing dijelaskan sejak awal.",
      "Kontrol kualitas dilakukan sebelum hasil akhir dikirim.",
      "File dicek lebih dulu agar aman masuk produksi.",
      "Konsultasi spesifikasi membantu keputusan cetak lebih tepat.",
    ],
    process: [
      "Validasi kebutuhan, ukuran, jumlah, dan material yang paling sesuai.",
      "Pemeriksaan file desain pada tahap pre-press sebelum produksi dimulai.",
      "Produksi dijalankan lalu hasilnya dicek sebelum pengiriman.",
      "Finalisasi, packing, dan pengiriman mengikuti target timeline yang disepakati.",
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
      {
        question: "Apakah bisa konsultasi dulu sebelum menentukan metode cetak?",
        answer:
          "Bisa. Konsultasi awal membantu menentukan material, finishing, jumlah produksi, dan target penggunaan agar hasil cetak lebih tepat sasaran.",
      },
    ],
    testimonials: [
      {
        name: "Amanda S.",
        role: "Pemilik UMKM",
        quote: "Barang selalu diproses cepat, kualitas sesuai dengan proof cetak yang disepakati dari awal. Sangat mempermudah bisnis kami."
      },
      {
        name: "Reza F.",
        role: "Procurement Perusahaan",
        quote: "Proses ordernya jelas dan tim percetakan kooperatif saat kami butuh invoice dan timeline yang ketat. Hasilnya pun stabil di tiap batch."
      }
    ],
    ctaLabel:
      page.route === "/percetakan"
        ? "Konsultasi Layanan Percetakan"
        : "Diskusikan Kebutuhan Cetak",
    ctaHref: DEFAULT_CTA,
    ...cityOverride,
  };
}

export function buildPrintingDetailCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const staticPreset = (() => {
    if (page.slug === "cetak-buku") return buildPercetakanCetakBukuPageCopy();
    if (page.slug === "cetak-brosur") return buildPercetakanCetakBrosurPageCopy(page);
    if (page.slug === "cetak-company-profile") {
      return buildPercetakanCetakCompanyProfilePageCopy(page);
    }
    return PRINTING_DETAIL_PRESETS[page.slug];
  })();

  if (staticPreset) {
    return {
      ...buildPrintingCopy(page),
      ...staticPreset,
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
      ctaHref: DEFAULT_CTA,
    };
  }

  return buildPrintingCopy(page);
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
  const cityOverride = CETAK_BUKU_CITY_INTENT_OVERRIDES[city] || {};

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
