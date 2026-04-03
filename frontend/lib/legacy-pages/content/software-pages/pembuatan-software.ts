import { DEFAULT_CTA } from "../constants";
import { buildSoftwareIndexPageCopy } from "./software-index";
import type { LegacyRewriteCopy } from "../types";

export function buildPembuatanSoftwarePageCopy(): LegacyRewriteCopy {
  return {
    ...buildSoftwareIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Software Custom Surabaya",
    secondaryKeywords: [
      "Pengembangan software custom",
      "Aplikasi bisnis sesuai workflow",
      "Sistem internal perusahaan",
      "Software operasional terintegrasi",
      "Custom software development Surabaya",
      "Aplikasi web dan mobile bisnis",
    ],
    description:
      "Jasa pembuatan software custom Surabaya untuk bisnis yang membutuhkan aplikasi web, mobile, dan sistem enterprise sesuai alur kerja internal dan target pertumbuhan.",
    ctaLabel: "Mulai Proyek Software",
    ctaHref: DEFAULT_CTA,
  };
}
