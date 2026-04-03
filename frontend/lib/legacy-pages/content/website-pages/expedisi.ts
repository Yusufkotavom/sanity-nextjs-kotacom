import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteExpedisiPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Website Expedisi",
    secondaryKeywords: [
      "Website perusahaan ekspedisi",
      "Website logistik profesional",
      "Website jasa pengiriman",
      "Website tracking layanan",
    ],
    description:
      "Jasa pembuatan website expedisi untuk menampilkan layanan pengiriman, area cakupan, dan keunggulan operasional secara jelas.",
    intro:
      "Website expedisi kami rancang agar pelanggan mudah memahami layanan, biaya, dan proses pengiriman sehingga meningkatkan konversi inquiry.",
    ctaLabel: "Bangun Website Expedisi",
    ctaHref: DEFAULT_CTA,
  };
}
