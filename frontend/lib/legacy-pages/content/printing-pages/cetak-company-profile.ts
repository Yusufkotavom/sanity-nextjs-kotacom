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
      "Butuh company profile yang rapi untuk presentasi ke klien, tender, atau kebutuhan bisnis lain? Kami bisa bantu mencetak company profile Anda dengan bahan berkualitas, finishing rapi, dan desain yang selaras dengan identitas brand. Cukup kirim desain atau konsep Anda, lalu kami bantu mengarahkan proses cetaknya.",
    ctaLabel: "Konsultasi Cetak Company Profile",
    ctaHref: DEFAULT_CTA,
  };
}
