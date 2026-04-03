import { DEFAULT_CTA } from "../constants";
import { buildSoftwareIndexPageCopy } from "./software-index";
import type { LegacyRewriteCopy } from "../types";

export function buildImplementasiSoftwarePageCopy(): LegacyRewriteCopy {
  return {
    ...buildSoftwareIndexPageCopy(),
    primaryKeyword: "Jasa Implementasi Software Surabaya",
    secondaryKeywords: [
      "Implementasi sistem bisnis",
      "Deployment software perusahaan",
      "Go-live aplikasi internal",
      "Pendampingan adopsi software",
      "System integration Surabaya",
      "Deployment enterprise software",
    ],
    description:
      "Jasa implementasi software Surabaya untuk system integration, deployment, dan adopsi software bisnis agar go-live lebih stabil dan minim gangguan operasional.",
    ctaLabel: "Konsultasi Implementasi",
    ctaHref: DEFAULT_CTA,
  };
}
