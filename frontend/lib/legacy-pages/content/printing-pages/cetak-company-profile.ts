import { DEFAULT_CTA } from "../constants";
import { buildGenericCopy } from "../core";
import type { LegacyRewriteCopy } from "../types";
import type { LegacyAstroPage } from "../../astro-static";

export function buildPercetakanCetakCompanyProfilePageCopy(
  page: LegacyAstroPage,
): LegacyRewriteCopy {
  return {
    ...buildGenericCopy(page),
    primaryKeyword: "Jasa Cetak Company Profile Surabaya",
    secondaryKeywords: [
      "Cetak company profile murah",
      "Percetakan profil perusahaan",
      "Company profile cetak berkualitas",
      "Jasa cetak company profile cepat",
      "Percetakan company profile online",
      "Cetak company profile Surabaya"
    ],
    description:
      "Layanan cetak company profile Surabaya untuk memperlihatkan keprofesionalan bisnis Anda melalui bahan promosi yang rapi, informatif, dan sesuai identitas brand perusahaan.",
    intro:
      "Butuh company profile yang bagus untuk presentasi ke klien, tender, atau keperluan bisnis? Kami bisa bantu cetak company profile Anda dengan bahan berkualitas, finishing rapi, dan desain yang selaras dengan brand perusahaan Anda. Cukup kirim desain atau konsep Anda, kami yang akanuruskan proses cetaknya.",
    ctaLabel: "Konsultasi Cetak Company Profile",
    ctaHref: DEFAULT_CTA,
  };
}
