import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const companyInfoQuery = groq`
  _type == "company-info" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    description,
  }
`;
