import { groq } from "next-sanity";
import { metaQuery } from "./shared/meta";
import { imageQuery } from "./shared/image";
import { blocksQuery } from "./shared/blocks";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    topBlockCount,
    thumbnail{
      ${imageQuery}
    },
    ${blocksQuery},
    ${metaQuery},
  }
`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug)]{slug}`;
