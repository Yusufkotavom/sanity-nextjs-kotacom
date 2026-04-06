import { groq } from "next-sanity";
import { linkQuery } from "../shared/link";

// @sanity-typegen-ignore
export const serviceTypesBlockQuery = groq`
  _type == "service-types-block" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    description,
    services[]{
      _key,
      title,
      description,
      features[],
      price,
      timeline,
      badge,
      link{
        ${linkQuery}
      },
    },
  }
`;
