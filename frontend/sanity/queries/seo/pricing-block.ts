import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const pricingBlockQuery = groq`
  _type == "pricing-block" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    description,
    category,
  }
`;
