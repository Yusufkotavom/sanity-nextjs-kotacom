export const linkQuery = `
    _key,
    ...,
    uiIcon{
      provider,
      name,
      svg
    },
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
`;
