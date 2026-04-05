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
    highlights,
    eeatPoints[]{ title, description },
    process,
    faqs[]{ question, answer },
    ctaLabel,
    ctaLink{
      ${linkQuery}
    },
    ctaLinks[]{
      _key,
      label,
      link{
        ${linkQuery}
      }
    },
    serviceTypes[]{
      title,
      description,
      image{
        ${imageQuery}
      },
      link{
        ${linkQuery}
      }
    },
    pricingPlans[]{
      name,
      price,
      description,
      items,
      recommended
    },
    features[]{
      title,
      description,
      icon
    },
    proofItems[]{
      title,
      description,
      image{
        ${imageQuery}
      },
      link{
        ${linkQuery}
      }
    },
    testimonials[]{
      name,
      role,
      quote
    },
    longGuide[]{
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
    && location->slug.current == $city
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
