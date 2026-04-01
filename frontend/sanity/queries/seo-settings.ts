import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";

export const SEO_SETTINGS_QUERY = groq`*[_type == "seoSettings"][0]{
  titleSuffix,
  defaultTitle,
  defaultDescription,
  defaultNoIndex,
  twitterHandle,
  defaultImage{
    ${imageQuery}
  }
}`;
