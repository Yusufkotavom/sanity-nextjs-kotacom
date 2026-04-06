import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const valuePropsBlockQuery = groq`
  _type == "value-props-block" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    description,
    valueProps[]{
      _key,
      icon,
      title,
      description,
    },
  }
`;
