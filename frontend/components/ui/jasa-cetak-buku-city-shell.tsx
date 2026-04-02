import JsonLd from "@/components/seo/json-ld";
import RewriteHero from "@/components/ui/rewrite/hero";
import RewriteHighlights from "@/components/ui/rewrite/highlights";
import RewriteLandingSections from "@/components/ui/rewrite/landing-sections";
import RewriteProcessFaq from "@/components/ui/rewrite/process-faq";
import RewriteRelatedLinks from "@/components/ui/rewrite/related-links";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { getLegacySectionChildren } from "@/lib/legacy-pages/astro-static";
import { getStrategicLinks } from "@/lib/legacy-pages/internal-links";
import { buildPercetakanCetakBukuCityCopy } from "@/lib/legacy-pages/rewrite-content";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/lib/seo-jsonld";
import type { JasaCetakBukuCityItem } from "@/lib/local-content/jasa-cetak-buku-kota";
import { kotacomSplitIllustrations } from "@/lib/illustrations/kotacom-split";

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
    primaryKeyword: cityCopy.primaryKeyword || item.title || `Jasa Cetak Buku ${item.city}`,
    description: cityCopy.description || item.excerpt,
    intro: cityCopy.intro || item.excerpt,
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

      <RewriteHero
        page={page}
        copy={copy}
        sectionLabel={toSectionLabel(page.section)}
        sectionHref="/percetakan"
        heroImage={{
          src: kotacomSplitIllustrations.hero.cetakBukuV2,
          alt: `${copy.primaryKeyword} - KOTACOM`,
        }}
      />
      <RewriteLandingSections page={page} copy={copy} />
      <RewriteHighlights copy={copy} />
      <RewriteProcessFaq copy={copy} />
      <RewriteRelatedLinks
        page={page}
        related={getLegacySectionChildren("percetakan")}
        strategicLinks={getStrategicLinks(page)}
      />
    </>
  );
}
