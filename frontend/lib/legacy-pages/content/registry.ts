import type { LegacyAstroPage } from "../astro-static";
import { buildGenericCopy, enrichCopyForSeo } from "./core";
import {
  buildAboutCopy,
  buildAboutStatementCopy,
  buildContactCopy,
  buildLayananCopy,
  buildPrivacyCopy,
} from "./misc";
import { buildPrintingCopy, buildPrintingDetailCopy } from "./printing";
import { buildPercetakanCetakBrosurPageCopy } from "./printing-pages/cetak-brosur";
import { buildPercetakanCetakBukuPageCopy } from "./printing-pages/cetak-buku";
import { buildPercetakanCetakCompanyProfilePageCopy } from "./printing-pages/cetak-company-profile";
import { buildPercetakanIndexPageCopy } from "./printing-pages/percetakan-index";
import { buildSoftwareCopy, buildSoftwareDetailCopy } from "./software";
import type { LegacyRewriteCopy } from "./types";
import {
  buildWebsiteCityCopy,
  buildWebsiteIndexCopy,
  buildWebsiteServiceCopy,
} from "./website";

export type LegacyPageSource =
  | "page"
  | "section-template"
  | "parametric-template"
  | "generic";

type LegacyPageBuilder = (page: LegacyAstroPage) => LegacyRewriteCopy;

export type LegacyPageResolution = {
  source: LegacyPageSource;
  builder: LegacyPageBuilder;
};

function resolveWebsite(page: LegacyAstroPage): LegacyPageResolution {
  if (page.sourceFile.includes("[kota]") || page.slug === "sidoarjo") {
    return { source: "parametric-template", builder: buildWebsiteCityCopy };
  }

  if (page.slug !== "pembuatan-website") {
    return { source: "page", builder: buildWebsiteServiceCopy };
  }

  return { source: "section-template", builder: buildWebsiteIndexCopy };
}

function resolvePrinting(page: LegacyAstroPage): LegacyPageResolution {
  if (page.route === "/percetakan") {
    return { source: "page", builder: buildPercetakanIndexPageCopy };
  }

  if (page.route === "/percetakan/cetak-buku") {
    return { source: "page", builder: buildPercetakanCetakBukuPageCopy };
  }

  if (page.route === "/percetakan/cetak-brosur") {
    return { source: "page", builder: buildPercetakanCetakBrosurPageCopy };
  }

  if (page.route === "/percetakan/cetak-company-profile") {
    return { source: "page", builder: buildPercetakanCetakCompanyProfilePageCopy };
  }

  if (page.slug !== "percetakan") {
    return {
      source: page.sourceFile.includes("[kota]") ? "parametric-template" : "page",
      builder: buildPrintingDetailCopy,
    };
  }

  return { source: "section-template", builder: buildPrintingCopy };
}

function resolveSoftware(page: LegacyAstroPage): LegacyPageResolution {
  if (page.section === "sistem-pos") {
    return {
      source: "page",
      builder: (currentPage) => {
        const softwareCopy = buildSoftwareCopy(currentPage);
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
      },
    };
  }

  if (page.slug !== "software") {
    return { source: "page", builder: buildSoftwareDetailCopy };
  }

  return { source: "section-template", builder: buildSoftwareCopy };
}

export function resolveLegacyPageContent(page: LegacyAstroPage): LegacyPageResolution {
  if (page.section === "pembuatan-website") return resolveWebsite(page);
  if (page.section === "percetakan") return resolvePrinting(page);
  if (page.section === "software" || page.section === "sistem-pos") return resolveSoftware(page);
  if (page.section === "layanan") {
    return { source: "section-template", builder: buildLayananCopy };
  }
  if (page.section === "about") {
    return {
      source: page.slug === "ai-statement" ? "page" : "section-template",
      builder: page.slug === "ai-statement" ? buildAboutStatementCopy : buildAboutCopy,
    };
  }
  if (page.section === "contact") {
    return { source: "section-template", builder: buildContactCopy };
  }
  if (page.section === "privacy") {
    return { source: "section-template", builder: buildPrivacyCopy };
  }

  return { source: "generic", builder: buildGenericCopy };
}

export function buildLegacyRewriteCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const resolved = resolveLegacyPageContent(page);
  return enrichCopyForSeo(page, resolved.builder(page));
}
