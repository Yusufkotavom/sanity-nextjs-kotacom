import type { LegacyAstroPage } from "../astro-static";
import { DEFAULT_CTA } from "./constants";
import { buildImplementasiSoftwarePageCopy } from "./software-pages/implementasi-software";
import { buildInstalasiSoftwarePageCopy } from "./software-pages/instalasi-software";
import { buildPembuatanSoftwarePageCopy } from "./software-pages/pembuatan-software";
import { buildSoftwareIndexPageCopy } from "./software-pages/software-index";
import type { LegacyRewriteCopy } from "./types";

export function buildSoftwareCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  if (page.route === "/software") {
    return buildSoftwareIndexPageCopy();
  }

  const title = page.title;
  const primaryKeyword = `Pengembangan ${title}`;

  return {
    ...buildSoftwareIndexPageCopy(),
    primaryKeyword,
    secondaryKeywords: [
      `${title} custom`,
      `${title} untuk bisnis`,
      "Software bisnis terintegrasi",
      "Aplikasi custom untuk perusahaan",
    ],
    description: `${primaryKeyword} untuk bisnis yang membutuhkan software custom, implementasi sistem, dan instalasi yang lebih terukur demi efisiensi operasional, visibilitas data, dan eksekusi tim yang lebih cepat.`,
    intro: `Kami membangun ${title.toLowerCase()} dengan pendekatan produk: kebutuhan dipetakan dengan jelas, fitur diprioritaskan bertahap, dan implementasi diarahkan agar cepat memberi dampak bisnis. Fokusnya adalah software yang benar-benar membantu pekerjaan harian, bukan sekadar menambah sistem baru.`,
    ctaLabel: "Konsultasi Kebutuhan Software",
    ctaHref: DEFAULT_CTA,
  };
}

export function buildSoftwareDetailCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  if (page.slug === "pembuatan-software") {
    return buildPembuatanSoftwarePageCopy();
  }

  if (page.slug === "implementasi-software") {
    return buildImplementasiSoftwarePageCopy();
  }

  if (page.slug === "instalasi-software") {
    return buildInstalasiSoftwarePageCopy();
  }

  return buildSoftwareCopy(page);
}
