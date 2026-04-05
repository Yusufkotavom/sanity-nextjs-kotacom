import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";
import { bodyQuery } from "./shared/body";
import { metaQuery } from "./shared/meta";

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    excerpt,
    image{
      ${imageQuery}
    },
    body[]{
      ${bodyQuery}
    },
    author->{
      name,
      image {
        ...,
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    },
    categories[]->{
      _id,
      title,
      slug
    },
    _createdAt,
    _updatedAt,
    ${metaQuery},
}`;

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
    image{
      ${imageQuery}
    },
    categories[]->{
      _id,
      title,
      slug
    },
}`;

export const POSTS_BY_CATEGORY_QUERY = groq`*[_type == "post" && defined(slug) && references(*[_type=="category" && slug.current==$slug][0]._id)] | order(_createdAt desc){
    title,
    slug,
    excerpt,
    image{
      ${imageQuery}
    },
    categories[]->{
      _id,
      title,
      slug
    },
}`;

export const POSTS_SLUGS_QUERY = groq`*[_type == "post" && defined(slug)]{slug}`;

export const RELATED_POSTS_QUERY = groq`*[
  _type == "post" 
  && defined(slug) 
  && slug.current != $slug
  && count((categories[]->_id)[@ in $categoryIds]) > 0
] | order(_createdAt desc) [0...4]{
  title,
  slug,
  excerpt,
  image{
    ${imageQuery}
  },
  categories[]->{
    _id,
    title,
    slug
  },
  _createdAt,
}`;
