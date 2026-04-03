import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteHargaPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Harga Jasa Pembuatan Website",
    secondaryKeywords: [
      "Biaya pembuatan website",
      "Paket website bisnis",
      "Harga website company profile",
      "Estimasi biaya web profesional",
    ],
    description:
      "Informasi harga jasa pembuatan website yang transparan, dengan paket fleksibel sesuai kebutuhan bisnis dan target pertumbuhan.",
    intro:
      "Halaman ini membantu Anda memahami komponen biaya website, scope pekerjaan, dan opsi paket agar keputusan investasi digital lebih terukur.",
    ctaLabel: "Minta Estimasi Harga",
    ctaHref: DEFAULT_CTA,
  };
}
