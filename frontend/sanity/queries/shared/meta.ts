import { imageQuery } from "./image";

export const metaQuery = `
  meta{
    title,
    description,
    canonicalUrl,
    focusKeyword,
    secondaryKeywords,
    noindex,
    image{
      ${imageQuery}
    }
  }
`;
