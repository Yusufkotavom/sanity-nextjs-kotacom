import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const benefitsBlockQuery = groq`
  _type == "benefits-block" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    subtitle,
    description,
    benefits[]{
      _key,
      icon,
      title,
      description,
      badge,
      badgeIcon,
    },
  }
`;
