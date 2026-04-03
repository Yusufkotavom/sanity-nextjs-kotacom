import JsonLd from "@/components/seo/json-ld";
import LegacyHero from "./legacy-hero";
import LegacyHighlights from "./legacy-highlights";
import LegacyLandingSections from "./legacy-landing-sections";
import LegacyProcessFaq from "./legacy-process-faq";
import LegacyRelatedLinks from "./legacy-related-links";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { getLegacySectionChildren } from "@/lib/legacy-pages/astro-static";
import { getStrategicLinks } from "@/lib/legacy-pages/internal-links";
import { buildPercetakanCetakBukuCityCopy } from "@/lib/legacy-pages/rewrite-content";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/lib/seo-jsonld";
import type { JasaCetakBukuCityItem } from "@/lib/local-content/jasa-cetak-buku-kota";

function toSectionLabel(section: string) {
  return section.replace(/-/g, " ");
}

export default function JasaCetakBukuCityShell({
  item,
}: {
  item: JasaCetakBukuCityItem;
}) {
  const page: LegacyAstroPage = {
    route: `/${item.slug}`,
    section: "percetakan",
    slug: item.slug,
    sourceFile: "content/astro-local/jasa-cetak-buku-kota/template.mdx",
    title: item.title || `Jasa cetak buku ${item.city}`,
    migrationStatus: "draft",
  };

  const cityCopy = buildPercetakanCetakBukuCityCopy(item.citySlug);
  const copy = {
    ...cityCopy,
    primaryKeyword: item.title || `Jasa Cetak Buku ${item.city}`,
    description: item.excerpt || cityCopy.description,
    intro: item.excerpt || cityCopy.intro,
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Jasa Cetak Buku", path: page.route },
  ]);
  const serviceJsonLd = buildServiceJsonLd({
    title: copy.primaryKeyword,
    description: copy.description,
    path: page.route,
  });
  const faqJsonLd = copy.faqs.length > 0 ? buildFaqJsonLd(copy.faqs) : null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={serviceJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}

      <LegacyHero
        page={page}
        copy={copy}
        sectionLabel={toSectionLabel(page.section)}
        sectionHref="/percetakan"
      />
      <LegacyLandingSections page={page} copy={copy} />
      <LegacyHighlights copy={copy} />
      <LegacyProcessFaq copy={copy} />
      <LegacyRelatedLinks
        page={page}
        related={getLegacySectionChildren("percetakan")}
        strategicLinks={getStrategicLinks(page)}
      />
    </>
  );
}
