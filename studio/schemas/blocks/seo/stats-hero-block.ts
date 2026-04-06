import { defineType, defineField } from "sanity";
import { TrendingUp } from "lucide-react";

export default defineType({
  name: "stats-hero-block",
  title: "Stats Hero Block",
  type: "object",
  icon: TrendingUp,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow Text",
      description: "Text kecil di atas title (contoh: 200+ Website Sukses Dibuat)",
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "link" }],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: "title",
      eyebrow: "eyebrow",
    },
    prepare({ title, eyebrow }) {
      return {
        title: "Stats Hero",
        subtitle: eyebrow || title,
      };
    },
  },
});
