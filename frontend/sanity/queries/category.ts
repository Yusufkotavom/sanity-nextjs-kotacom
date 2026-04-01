import { groq } from "next-sanity";
import { metaQuery } from "./shared/meta";

export const CATEGORIES_QUERY = groq`*[_type == "category" && defined(slug)] | order(title asc){
  _id,
  title,
  slug,
  description,
  "postCount": count(*[_type == "post" && references(^._id)])
}`;

export const BLOG_CATEGORIES_QUERY = groq`*[_type == "category" && defined(slug) && count(*[_type == "post" && references(^._id)]) > 0] | order(title asc){
  _id,
  title,
  slug,
  description,
  "postCount": count(*[_type == "post" && references(^._id)])
}`;

export const PRODUCT_CATEGORIES_QUERY = groq`*[_type == "category" && defined(slug) && count(*[_type == "product" && references(^._id)]) > 0] | order(title asc){
  _id,
  title,
  slug,
  description,
  "productCount": count(*[_type == "product" && references(^._id)])
}`;

export const SERVICE_CATEGORIES_QUERY = groq`*[_type == "category" && defined(slug) && count(*[_type == "service" && references(^._id)]) > 0] | order(title asc){
  _id,
  title,
  slug,
  description,
  "serviceCount": count(*[_type == "service" && references(^._id)])
}`;

export const CATEGORY_QUERY = groq`*[_type == "category" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  ${metaQuery},
  "postCount": count(*[_type == "post" && references(^._id)])
}`;

export const CATEGORIES_SLUGS_QUERY = groq`*[_type == "category" && defined(slug)]{slug}`;
