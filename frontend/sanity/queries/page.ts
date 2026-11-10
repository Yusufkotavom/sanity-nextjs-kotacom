import { groq } from "next-sanity";
import { metaQuery } from "./shared/meta";
import { imageQuery } from "./shared/image";
import { blocksQuery } from "./shared/blocks";

// Sanity-only architecture (F2): a public page is addressed by `path`
// (canonical absolute route, e.g. "/percetakan/cetak-buku"). `slug` is kept as a
// legacy match so pre-migration docs (that only have `slug`) keep resolving until
// migrated. `contentStatus` gates public render + sitemap.
export const PAGE_QUERY = groq`
  *[_type == "page" && (
    (defined($path) && path == $path)
    || (defined($slug) && slug.current == $slug)
    || (defined($path) && $path == "/" && slug.current == "index")
  )] | order(select(path == $path => 0, 1) asc, _updatedAt desc)[0]{
    title,
    "path": coalesce(path, "/" + slug.current),
    contentStatus,
    thumbnail{
      ${imageQuery}
    },
    ${blocksQuery},
    ${metaQuery},
  }
`;

export const PAGES_QUERY = groq`*[_type == "page" && (defined(path) || defined(slug))] | order(title asc){
  title,
  "path": coalesce(path, "/" + slug.current),
  contentStatus,
}`;

// For generateStaticParams (catch-all): canonical path of every page allowed to
// be publicly rendered. Draft pages are excluded.
export const PAGES_SLUGS_QUERY = groq`*[
  _type == "page"
  && (defined(path) || defined(slug))
  && contentStatus != "draft"
]{
  "path": coalesce(path, "/" + slug.current),
  contentStatus,
}`;
