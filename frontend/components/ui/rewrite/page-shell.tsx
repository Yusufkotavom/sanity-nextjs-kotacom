import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { buildLegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import JsonLd from "@/components/seo/json-ld";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo-jsonld";
import { getStrategicLinks } from "@/lib/legacy-pages/internal-links";
import RewriteHero from "@/components/ui/rewrite/hero";
import RewriteLandingSections from "@/components/ui/rewrite/landing-sections";
import RewriteHighlights from "@/components/ui/rewrite/highlights";
import RewriteProcessFaq from "@/components/ui/rewrite/process-faq";
import RewriteRelatedLinks from "@/components/ui/rewrite/related-links";
import MicroBadges from "@/components/micro-badges";
import { kotacomSplitIllustrations } from "@/lib/illustrations/kotacom-split";

type RewritePageShellProps = {
  page: LegacyAstroPage;
  siblings?: LegacyAstroPage[];
};

export default function RewritePageShell({
  page,
  siblings = [],
}: RewritePageShellProps) {
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
  const faqJsonLd = copy.faqs.length > 0 ? buildFaqJsonLd(copy.faqs) : null;
  const heroImageBySection = (() => {
    if (page.route === "/contact" || page.section === "contact") {
      return {
        src: kotacomSplitIllustrations.contact.support,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "about") {
      return {
        src: kotacomSplitIllustrations.about.team,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "pembuatan-website") {
      return {
        src: kotacomSplitIllustrations.services.website.tokoOnline,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "software") {
      return {
        src: kotacomSplitIllustrations.services.it.softwareCustom,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "layanan") {
      return {
        src: kotacomSplitIllustrations.ui.processWorkflow,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "sistem-pos") {
      return {
        src: kotacomSplitIllustrations.services.it.itSupport,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    return undefined;
  })();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {serviceJsonLd ? <JsonLd data={serviceJsonLd} /> : null}
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}

      <RewriteHero
        page={page}
        copy={copy}
        sectionLabel={sectionLabel}
        sectionHref={sectionHref}
        heroImage={heroImageBySection}
      />
      <RewriteLandingSections page={page} copy={copy} />
      <MicroBadges />
      <RewriteHighlights copy={copy} />
      <RewriteProcessFaq copy={copy} />
      <RewriteRelatedLinks
        page={page}
        related={related}
        strategicLinks={strategicLinks}
      />
    </>
  );
}
