import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteMigrasiWordpressPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
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
    ctaHref: DEFAULT_CTA,
  };
}
