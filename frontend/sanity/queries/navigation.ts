import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";

export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"] | order(_updatedAt desc)[0...1]{
    _type,
    _key,
    headerCta{
      ${linkQuery}
    },
    "links": coalesce(links, [])[]{
      ${linkQuery},
      "children": coalesce(children, [])[]{
        _key,
        group,
        description,
        badge,
        icon,
        uiIcon{
          provider,
          name,
          svg
        },
        title,
        target,
        "href": select(
          isExternal => href,
          defined(href) && !defined(internalLink) => href,
          @.internalLink->slug.current == "index" => "/",
          @.internalLink->_type == "post" => "/blog/" + @.internalLink->slug.current,
          @.internalLink->_type == "category" => "/blog/category/" + @.internalLink->slug.current,
          @.internalLink->_type == "product" => "/products/" + @.internalLink->slug.current,
          @.internalLink->_type == "service" => "/services/" + @.internalLink->slug.current,
          @.internalLink->_type == "project" => "/projects/" + @.internalLink->slug.current,
          "/" + @.internalLink->slug.current
        )
      }
    }
  }
`;
