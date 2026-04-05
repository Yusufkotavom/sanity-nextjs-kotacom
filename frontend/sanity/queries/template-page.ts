import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";
import { imageQuery } from "./shared/image";
import { blocksQuery } from "./shared/blocks";
import { metaQuery } from "./shared/meta";

const templateRewriteQuery = `
  structured{
    primaryKeyword,
    secondaryKeywords,
    description,
    intro,
    highlights[0..4],
    eeatPoints[0..3]{ title, description },
    process[0..3],
    faqs[0..3]{ question, answer },
    ctaLabel,
    ctaLink{
      ${linkQuery}
    },
    ctaLinks[0..2]{
      _key,
      label,
      link{
        ${linkQuery}
      }
    },
    serviceTypes[0..5]{
      title,
      description,
      image{
        ${imageQuery}
      },
      link{
        ${linkQuery}
      }
    },
    pricingPlans[0..2]{
      name,
      price,
      description,
      items[0..9],
      recommended
    },
    features[0..5]{
      title,
      description,
      icon
    },
    proofItems[0..5]{
      title,
      description,
      image{
        ${imageQuery}
      },
      link{
        ${linkQuery}
      }
    },
    testimonials[0..2]{
      name,
      role,
      quote
    },
    longGuide[0..4]{
      title,
      description
    },
    finalCtaTitle,
    finalCtaDescription
  }
`;

const metaDefaultsQuery = `
  metaDefaults{
    title,
    description,
    canonicalUrl,
    focusKeyword,
    secondaryKeywords,
    noindex,
    image{
      ${imageQuery}
    }
  }
`;

export const TEMPLATE_PAGE_BY_ROUTE_QUERY = groq`
  *[_type in ["pageLocation", "serviceLocation"] && route == $route][0]{
    _id,
    _type,
    title,
    route,
    routePattern,
    slug,
    heroEyebrow,
    heroImage{
      ${imageQuery}
    },
    topBlockCount,
    contentStatus,
    ${metaQuery},
    ${blocksQuery},
    ${templateRewriteQuery},
    template->{
      _id,
      title,
      slug,
      variant,
      isHybrid,
      shellId,
      topBlockCountDefault,
      heroEyebrow,
      heroImage{
        ${imageQuery}
      },
      ${blocksQuery},
      ${templateRewriteQuery},
      ${metaDefaultsQuery}
    },
    service->{
      title,
      slug
    },
    serviceType->{
      title,
      slug,
      category,
      description
    },
    location->{
      title,
      slug,
      overview,
      highlights
    }
  }
`;

export const TEMPLATE_PAGE_BY_PATTERN_QUERY = groq`
  *[
    _type in ["pageLocation", "serviceLocation"]
    && routePattern == $pattern
    && (
      $service == null ||
      service->slug.current == $service ||
      serviceType->slug.current == $service
    )
    && (
      $city == null ||
      location->slug.current == $city
    )
  ][0]{
    _id,
    _type,
    title,
    route,
    routePattern,
    slug,
    heroEyebrow,
    heroImage{
      ${imageQuery}
    },
    topBlockCount,
    contentStatus,
    ${metaQuery},
    ${blocksQuery},
    ${templateRewriteQuery},
    template->{
      _id,
      title,
      slug,
      variant,
      isHybrid,
      shellId,
      topBlockCountDefault,
      heroEyebrow,
      heroImage{
        ${imageQuery}
      },
      ${blocksQuery},
      ${templateRewriteQuery},
      ${metaDefaultsQuery}
    },
    service->{
      title,
      slug
    },
    serviceType->{
      title,
      slug,
      category,
      description
    },
    location->{
      title,
      slug,
      overview,
      highlights
    }
  }
`;

export const TEMPLATE_PAGE_ROUTES_QUERY = groq`
  *[_type in ["pageLocation", "serviceLocation"] && defined(route)]{
    route
  }
`;
