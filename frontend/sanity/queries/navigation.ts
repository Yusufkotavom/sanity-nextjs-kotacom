import { groq } from "next-sanity";
import { linkQuery } from "./shared/link";

export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"]{
    _type,
    _key,
    links[]{
      ${linkQuery},
      children[]{
        _key,
        group,
        description,
        badge,
        icon,
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
          "/" + @.internalLink->slug.current
        )
      }
    }
  }
`;
