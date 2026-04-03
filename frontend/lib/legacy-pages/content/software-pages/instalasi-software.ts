import { DEFAULT_CTA } from "../constants";
import { buildSoftwareIndexPageCopy } from "./software-index";
import type { LegacyRewriteCopy } from "../types";

export function buildInstalasiSoftwarePageCopy(): LegacyRewriteCopy {
  return {
    ...buildSoftwareIndexPageCopy(),
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
    ctaHref: DEFAULT_CTA,
  };
}
