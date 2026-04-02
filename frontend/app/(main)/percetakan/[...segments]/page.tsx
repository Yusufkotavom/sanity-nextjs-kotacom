import RewritePageShell from "@/components/ui/rewrite/page-shell";
import {
  getLegacyRoutesByPrefix,
  getLegacySectionChildren,
  getLegacySectionDescendants,
  getLegacySectionRouteBySegments,
} from "@/lib/legacy-pages/astro-static";
import { generateLegacyPageMetadata } from "@/lib/legacy-pages/metadata";
import { notFound } from "next/navigation";

const SECTION = "percetakan";
const CALENDAR_PREFIX = "/percetakan/cetak-kalender/";

type RouteParams = {
  segments: string[];
};

export function generateStaticParams() {
  return getLegacySectionDescendants(SECTION).map((item) => ({
    segments: item.route.replace("/percetakan/", "").split("/"),
  }));
}

export async function generateMetadata(props: { params: Promise<RouteParams> }) {
  const params = await props.params;
  return generateLegacyPageMetadata(
    getLegacySectionRouteBySegments(SECTION, params.segments),
  );
}

function resolveSiblings(pageRoute: string) {
  if (pageRoute.startsWith(CALENDAR_PREFIX)) {
    return getLegacyRoutesByPrefix(CALENDAR_PREFIX).slice(0, 25);
  }

  return getLegacySectionChildren(SECTION);
}

export default async function PercetakanCatchAllPage(props: {
  params: Promise<RouteParams>;
}) {
  const params = await props.params;
  const page = getLegacySectionRouteBySegments(SECTION, params.segments);
  if (!page) notFound();

  return <RewritePageShell page={page} siblings={resolveSiblings(page.route)} />;
}
