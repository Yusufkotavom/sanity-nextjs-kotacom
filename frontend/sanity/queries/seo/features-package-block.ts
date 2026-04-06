import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const featuresPackageBlockQuery = groq`
  _type == "features-package-block" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    subtitle,
    description,
    features[]{
      _key,
      icon,
      title,
      description,
      badge,
    },
  }
`;
