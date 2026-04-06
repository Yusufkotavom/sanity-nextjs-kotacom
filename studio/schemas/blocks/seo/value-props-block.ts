import { defineType, defineField, defineArrayMember } from "sanity";
import { Award } from "lucide-react";

export default defineType({
  name: "value-props-block",
  title: "Value Propositions Block",
  type: "object",
  icon: Award,
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
      name: "title",
      type: "string",
      initialValue: "Mengapa Memilih Kami",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      initialValue: "Kami menawarkan solusi terbaik dengan komitmen penuh terhadap kualitas dan kepuasan klien",
    }),
    defineField({
      name: "valueProps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "valueProp",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              title: "Icon (Emoji)",
              description: "Emoji icon untuk value prop ini",
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
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              icon: "icon",
            },
            prepare({ title, icon }) {
              return {
                title: title || "Value Prop",
                subtitle: icon || "",
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Value Props",
        subtitle: title,
      };
    },
  },
});
