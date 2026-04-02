import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";
import { bodyQuery } from "./shared/body";
import { metaQuery } from "./shared/meta";
import { linkQuery } from "./shared/link";

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
  title,
  slug,
  excerpt,
  body[]{
    ${bodyQuery}
  },
  image{
    ${imageQuery}
  },
  clientName,
  industry,
  completionYear,
  projectUrl,
  featured,
  cta{
    ${linkQuery}
  },
  _createdAt,
  _updatedAt,
  ${metaQuery},
}`;

export const PROJECTS_QUERY = groq`*[_type == "project" && defined(slug)] | order(featured desc, _createdAt desc){
  title,
  slug,
  excerpt,
  image{
    ${imageQuery}
  },
  clientName,
  industry,
  completionYear,
  projectUrl,
  featured
}`;

export const PROJECTS_SLUGS_QUERY = groq`*[_type == "project" && defined(slug)]{slug}`;
