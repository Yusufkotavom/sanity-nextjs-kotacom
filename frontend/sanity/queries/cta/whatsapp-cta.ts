import { groq } from "next-sanity";
import { bodyQuery } from "../shared/body";
import { linkQuery } from "../shared/link";

// @sanity-typegen-ignore
export const whatsappCtaQuery = groq`
  _type == "whatsapp-cta" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    tagLine,
    title,
    body[]{
      ${bodyQuery}
    },
    secondaryLink{
      ${linkQuery}
    },
  }
`;
