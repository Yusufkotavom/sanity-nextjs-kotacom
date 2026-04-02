import LegacyPageShell from "@/components/legacy/legacy-page-shell";
import {
  getLegacyRoute,
  getLegacyRoutesByPrefix,
} from "@/lib/legacy-pages/astro-static";
import { generateLegacyPageMetadata } from "@/lib/legacy-pages/metadata";
import { notFound } from "next/navigation";

const PREFIX = "/percetakan/cetak-kalender/";

export function generateStaticParams() {
  return getLegacyRoutesByPrefix(PREFIX).map((item) => ({
    kota: item.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ kota: string }>;
}) {
  const params = await props.params;
  return generateLegacyPageMetadata(getLegacyRoute(`${PREFIX}${params.kota}`));
}

export default async function PercetakanKalenderKotaPage(props: {
  params: Promise<{ kota: string }>;
}) {
  const params = await props.params;
  const page = getLegacyRoute(`${PREFIX}${params.kota}`);
  if (!page) notFound();

  return (
    <LegacyPageShell
      page={page}
      siblings={getLegacyRoutesByPrefix(PREFIX).slice(0, 25)}
    />
  );
}
