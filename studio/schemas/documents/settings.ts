import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

const GEIST_COLOR_OPTIONS = [
  { title: "Default (Follow Code)", value: "" },
  { title: "Gray 10 (#171717)", value: "#171717" },
  { title: "Gray 9 (#404040)", value: "#404040" },
  { title: "Gray 8 (#525252)", value: "#525252" },
  { title: "Gray 3 (#EBEBEB)", value: "#EBEBEB" },
  { title: "Gray 2 (#F5F5F5)", value: "#F5F5F5" },
  { title: "Gray 1 (#FAFAFA)", value: "#FAFAFA" },
  { title: "Blue 6 (#0070F3)", value: "#0070F3" },
  { title: "Blue 5 (#3291FF)", value: "#3291FF" },
  { title: "Green 6 (#00A86B)", value: "#00A86B" },
  { title: "Teal 6 (#14B8A6)", value: "#14B8A6" },
  { title: "Amber 6 (#F59E0B)", value: "#F59E0B" },
  { title: "Purple 6 (#8B5CF6)", value: "#8B5CF6" },
  { title: "Red 6 (#E5484D)", value: "#E5484D" },
  { title: "Rose 6 (#FB7185)", value: "#FB7185" },
];

const GEIST_FOREGROUND_OPTIONS = [
  { title: "Default (Follow Code)", value: "" },
  { title: "Gray 1 (#FAFAFA)", value: "#FAFAFA" },
  { title: "Gray 2 (#F5F5F5)", value: "#F5F5F5" },
  { title: "Gray 3 (#EBEBEB)", value: "#EBEBEB" },
  { title: "Gray 9 (#404040)", value: "#404040" },
  { title: "Gray 10 (#171717)", value: "#171717" },
  { title: "Dark Background (#0A0A0A)", value: "#0A0A0A" },
  { title: "Dark Background (#111111)", value: "#111111" },
];

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: Settings,
  fields: [
    defineField({
      name: "logo",
      type: "object",
      fields: [
        defineField({
          name: "dark",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "light",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "width",
          type: "number",
          title: "Width",
          description:
            "The width of the logo. Default is dimensions of the image.",
        }),
        defineField({
          name: "height",
          type: "number",
          title: "Height",
          description:
            "The height of the logo. Default is dimensions of the image.",
        }),
      ],
    }),
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      description:
        "Primary brand/site name used across UI and as SEO fallback when global SEO site name is empty.",
      initialValue: "Schema UI",
      validation: (Rule) => Rule.required().error("Site name is required"),
    }),
    defineField({
      name: "copyright",
      type: "block-content",
      description: "The copyright text to display in the footer",
    }),
    defineField({
      name: "themeColors",
      title: "Theme Colors",
      type: "object",
      description:
        "Update main website colors from Studio without editing code. Use HEX values like #0070F3.",
      fields: [
        defineField({
          name: "themePreset",
          title: "Theme Preset",
          type: "string",
          description:
            "Preset applies an automatic palette on frontend. Individual color fields below can override it.",
          initialValue: "neutral",
          options: {
            list: [
              { title: "Neutral (Geist Default)", value: "neutral" },
              { title: "Ocean (Blue Focus)", value: "ocean" },
              { title: "Sunset (Warm Accent)", value: "sunset" },
              { title: "Brand Tricolor A (Blue Primary, Red Accent, Yellow Ring)", value: "brand-tricolor-a" },
              { title: "Brand Tricolor B (Red Primary, Blue Accent, Yellow Ring)", value: "brand-tricolor-b" },
              { title: "Brand Tricolor C (Yellow Primary, Blue Accent, Red Ring)", value: "brand-tricolor-c" },
            ],
            layout: "dropdown",
          },
        }),
        defineField({
          name: "lightPrimary",
          title: "Light: Primary",
          type: "string",
          description: "Main brand/action color in light mode.",
          initialValue: "",
          options: { list: GEIST_COLOR_OPTIONS, layout: "dropdown" },
        }),
        defineField({
          name: "lightPrimaryForeground",
          title: "Light: Primary Foreground",
          type: "string",
          description: "Text/icon color on top of Light Primary.",
          initialValue: "",
          options: { list: GEIST_FOREGROUND_OPTIONS, layout: "dropdown" },
        }),
        defineField({
          name: "lightAccent",
          title: "Light: Accent",
          type: "string",
          description: "Subtle accent/surface tint in light mode.",
          initialValue: "",
          options: { list: GEIST_COLOR_OPTIONS, layout: "dropdown" },
        }),
        defineField({
          name: "lightRing",
          title: "Light: Ring",
          type: "string",
          description: "Focus ring color in light mode.",
          initialValue: "",
          options: { list: GEIST_COLOR_OPTIONS, layout: "dropdown" },
        }),
        defineField({
          name: "darkPrimary",
          title: "Dark: Primary",
          type: "string",
          description: "Main brand/action color in dark mode.",
          initialValue: "",
          options: { list: GEIST_COLOR_OPTIONS, layout: "dropdown" },
        }),
        defineField({
          name: "darkPrimaryForeground",
          title: "Dark: Primary Foreground",
          type: "string",
          description: "Text/icon color on top of Dark Primary.",
          initialValue: "",
          options: { list: GEIST_FOREGROUND_OPTIONS, layout: "dropdown" },
        }),
        defineField({
          name: "darkAccent",
          title: "Dark: Accent",
          type: "string",
          description: "Subtle accent/surface tint in dark mode.",
          initialValue: "",
          options: { list: GEIST_COLOR_OPTIONS, layout: "dropdown" },
        }),
        defineField({
          name: "darkRing",
          title: "Dark: Ring",
          type: "string",
          description: "Focus ring color in dark mode.",
          initialValue: "",
          options: { list: GEIST_COLOR_OPTIONS, layout: "dropdown" },
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      description: "Links shown in the navigation bar.",
      type: "array",
      of: [
        defineField({
          name: "item",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "X (Twitter)", value: "x" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Facebook", value: "facebook" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "GitHub", value: "github" },
                  { title: "Website", value: "website" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ["http", "https"],
                }),
            }),
            defineField({
              name: "target",
              title: "Open in new tab",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "whatsApp",
      title: "Floating WhatsApp",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enable floating button",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "phoneNumber",
          title: "Phone number (international format)",
          type: "string",
          description: "Example: 6281234567890 (numbers only, no + or spaces)",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const enabled = (context.parent as { enabled?: boolean } | undefined)
                ?.enabled;
              if (!enabled) return true;
              if (!value) return "Phone number is required when enabled";
              return /^\d{8,15}$/.test(value)
                ? true
                : "Use 8-15 digits in international format";
            }),
        }),
        defineField({
          name: "predefinedText",
          title: "Predefined message text",
          type: "text",
          rows: 3,
          initialValue: "Hi, I want to ask about your services.",
        }),
        defineField({
          name: "ctaText",
          title: "CTA text",
          type: "string",
          description: "Text shown next to the WhatsApp icon.",
          initialValue: "Chat via WhatsApp",
        }),
        defineField({
          name: "enableAnimation",
          title: "Enable attention animation",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "sourceUrl",
          title: "Source URL",
          type: "url",
          description: "Optional URL appended as context in the WhatsApp message.",
          validation: (Rule) =>
            Rule.uri({
              scheme: ["http", "https"],
            }),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "brandName",
      legacyTitle: "siteName",
      media: "logo",
    },
    prepare({ title, legacyTitle, media }) {
      return {
        title: title || legacyTitle || "Site Settings",
        media,
      };
    },
  },
});
