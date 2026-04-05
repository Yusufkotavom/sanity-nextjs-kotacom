import type { LegacyAstroPage } from "../../astro-static";
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
import { buildImplementasiSoftwarePageCopy } from "./software-pages/implementasi-software";
import { buildInstalasiSoftwarePageCopy } from "./software-pages/instalasi-software";
import { buildPembuatanSoftwarePageCopy } from "./software-pages/pembuatan-software";
import { buildSistemPosPageCopy } from "./software-pages/sistem-pos";
import { buildSoftwareIndexPageCopy } from "./software-pages/software-index";
import { buildSoftwareCopy, buildSoftwareDetailCopy } from "./software";
import type { LegacyRewriteCopy } from "./types";
import { buildWebsiteCompanyProfilePageCopy } from "./website-pages/company-profile";
import { buildWebsiteDokterKlinikPageCopy } from "./website-pages/dokter-klinik";
import { buildWebsiteExpedisiPageCopy } from "./website-pages/expedisi";
import { buildWebsiteHargaPageCopy } from "./website-pages/harga";
import { buildWebsiteIndexPageCopy } from "./website-pages/website-index";
import { buildWebsiteKonstruksiPageCopy } from "./website-pages/konstruksi";
import { buildWebsiteKomunitasNgoPageCopy } from "./website-pages/komunitas-ngo";
import { buildWebsiteMigrasiWordpressPageCopy } from "./website-pages/migrasi-wordpress";
import { buildWebsiteSekolahPageCopy } from "./website-pages/sekolah";
import { buildWebsiteTemplatePageCopy } from "./website-pages/template";
import { buildWebsiteTokoOnlinePageCopy } from "./website-pages/toko-online";
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
  if (page.route === "/pembuatan-website") {
    return { source: "page", builder: () => buildWebsiteIndexPageCopy() };
  }

  if (page.route === "/pembuatan-website/harga") {
    return { source: "page", builder: () => buildWebsiteHargaPageCopy() };
  }

  if (page.route === "/pembuatan-website/jasa-pembuatan-website-company-profile") {
    return { source: "page", builder: () => buildWebsiteCompanyProfilePageCopy() };
  }

  if (page.route === "/pembuatan-website/jasa-migrasi-wordpress") {
    return { source: "page", builder: () => buildWebsiteMigrasiWordpressPageCopy() };
  }

  if (page.route === "/pembuatan-website/jasa-pembuatan-website-dokter-klinik") {
    return { source: "page", builder: () => buildWebsiteDokterKlinikPageCopy() };
  }

  if (page.route === "/pembuatan-website/jasa-pembuatan-website-expedisi") {
    return { source: "page", builder: () => buildWebsiteExpedisiPageCopy() };
  }

  if (page.route === "/pembuatan-website/jasa-pembuatan-website-komunitas-ngo") {
    return { source: "page", builder: () => buildWebsiteKomunitasNgoPageCopy() };
  }

  if (page.route === "/pembuatan-website/jasa-pembuatan-website-konstruksi") {
    return { source: "page", builder: () => buildWebsiteKonstruksiPageCopy() };
  }

  if (page.route === "/pembuatan-website/jasa-pembuatan-website-sekolah") {
    return { source: "page", builder: () => buildWebsiteSekolahPageCopy() };
  }

  if (page.route === "/pembuatan-website/jasa-pembuatan-website-toko-online") {
    return { source: "page", builder: () => buildWebsiteTokoOnlinePageCopy() };
  }

  if (page.route === "/pembuatan-website/template") {
    return { source: "page", builder: () => buildWebsiteTemplatePageCopy() };
  }

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
    return { source: "page", builder: () => buildSistemPosPageCopy() };
  }

  if (page.route === "/software") {
    return { source: "page", builder: () => buildSoftwareIndexPageCopy() };
  }

  if (page.route === "/software/pembuatan-software") {
    return { source: "page", builder: () => buildPembuatanSoftwarePageCopy() };
  }

  if (page.route === "/software/implementasi-software") {
    return { source: "page", builder: () => buildImplementasiSoftwarePageCopy() };
  }

  if (page.route === "/software/instalasi-software") {
    return { source: "page", builder: () => buildInstalasiSoftwarePageCopy() };
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
