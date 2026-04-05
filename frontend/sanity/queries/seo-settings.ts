import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";

export const SEO_SETTINGS_QUERY = groq`*[_type == "seoSettings"][0]{
  titleSuffix,
  defaultTitle,
  defaultDescription,
  defaultNoIndex,
  noIndexBlogCategories,
  noIndexProductCategories,
  noIndexServiceCategories,
  robotsDisallowPaths,
  twitterHandle,
  defaultImage{
    ${imageQuery}
  },
  defaultAggregateRating{
    ratingValue,
    reviewCount,
    bestRating,
    ratingSource,
    sourceUrl,
  },
}`;
