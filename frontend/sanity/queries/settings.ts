import { groq } from "next-sanity";

export const SETTINGS_QUERY = groq`*[_type == "settings"][0]{
  _type,
  "siteName": coalesce(brandName, siteName, "Schema UI"),
  brandName,
  logo{
    dark{
      ...,
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      }
    },
    light{
      ...,
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      }
    },
    width,
    height,
  },
  copyright,
  socialLinks[]{
    _key,
    platform,
    url,
    target
  },
  whatsApp{
    enabled,
    phoneNumber,
    predefinedText,
    ctaText,
    enableAnimation,
    sourceUrl
  }
}`;
