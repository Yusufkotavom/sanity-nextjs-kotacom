import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const faqBlockQuery = groq`
  _type == "faq-block" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    description,
    category,
  }
`;
