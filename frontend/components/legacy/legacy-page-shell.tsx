import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { buildLegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd, buildServiceJsonLd } from "@/lib/seo-jsonld";
import { getStrategicLinks } from "@/lib/legacy-pages/internal-links";
import LegacyHero from "@/components/legacy/legacy-hero";
import LegacyHighlights from "@/components/legacy/legacy-highlights";
import LegacyProcessFaq from "@/components/legacy/legacy-process-faq";
import LegacyRelatedLinks from "@/components/legacy/legacy-related-links";

type LegacyPageShellProps = {
  page: LegacyAstroPage;
  siblings?: LegacyAstroPage[];
};

export default function LegacyPageShell({
  page,
  siblings = [],
}: LegacyPageShellProps) {
  const copy = buildLegacyRewriteCopy(page);
  const sectionHref = page.section ? `/${page.section}` : page.route;
  const sectionLabel = page.section.replace(/-/g, " ");
  const related = siblings
    .filter((item) => item.route !== page.route)
    .slice(0, 12);
  const strategicLinks = getStrategicLinks(page);
  const breadcrumbParts = page.route.split("/").filter(Boolean);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    ...breadcrumbParts.map((segment, index) => ({
      name: segment
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      path: `/${breadcrumbParts.slice(0, index + 1).join("/")}`,
    })),
  ]);
  const showServiceSchema = [
    "pembuatan-website",
    "percetakan",
    "software",
    "sistem-pos",
    "layanan",
  ].includes(page.section);
  const serviceJsonLd = showServiceSchema
    ? buildServiceJsonLd({
        title: copy.primaryKeyword,
        description: copy.description,
        path: page.route,
      })
    : null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {serviceJsonLd ? <JsonLd data={serviceJsonLd} /> : null}

      <LegacyHero
        page={page}
        copy={copy}
        sectionLabel={sectionLabel}
        sectionHref={sectionHref}
      />
      <LegacyHighlights copy={copy} />
      <LegacyProcessFaq copy={copy} />
      <LegacyRelatedLinks
        page={page}
        related={related}
        strategicLinks={strategicLinks}
      />
    </>
  );
}
