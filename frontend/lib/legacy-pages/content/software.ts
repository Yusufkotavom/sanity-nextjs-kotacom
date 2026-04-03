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
      `${title} untuk operasional`,
      "Software bisnis terintegrasi",
      "Aplikasi internal perusahaan",
    ],
    description: `${primaryKeyword} untuk bisnis yang membutuhkan software custom, implementasi sistem, dan instalasi yang lebih terukur demi efisiensi operasional, visibilitas data, dan eksekusi tim yang lebih cepat.`,
    intro: `Kami membangun ${title.toLowerCase()} dengan pendekatan produk: requirement jelas, prioritas fitur terukur, dan implementasi bertahap agar cepat memberi dampak bisnis. Dibanding live site, rewrite ini kami perluas agar intent pencarian software custom, implementasi enterprise, dan instalasi operasional tertangkap lebih jelas dalam satu cluster SEO.`,
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
