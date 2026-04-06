import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";
import { linkQuery } from "../shared/link";

// @sanity-typegen-ignore
export const statsHeroBlockQuery = groq`
  _type == "stats-hero-block" => {
    _type,
    _key,
    padding,
    colorVariant,
    eyebrow,
    title,
    description,
    image{
      ${imageQuery}
    },
    links[]{
      ${linkQuery}
    },
  }
`;
