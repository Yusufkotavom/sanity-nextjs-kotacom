import { defineType, defineField, defineArrayMember } from "sanity";
import { Layers } from "lucide-react";

export default defineType({
  name: "service-types-block",
  title: "Service Types Block",
  type: "object",
  icon: Layers,
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
      initialValue: "Layanan Website Development Terlengkap",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      initialValue: "Kami menyediakan solusi website lengkap untuk semua kebutuhan bisnis Anda",
    }),
    defineField({
      name: "services",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "serviceType",
          fields: [
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
            defineField({
              name: "features",
              type: "array",
              of: [{ type: "string" }],
              description: "List fitur yang disediakan",
            }),
            defineField({
              name: "price",
              type: "string",
              title: "Starting Price",
              description: "Contoh: Mulai Rp 500.000",
            }),
            defineField({
              name: "timeline",
              type: "string",
              description: "Contoh: Timeline: 1-2 minggu",
            }),
            defineField({
              name: "badge",
              type: "string",
              title: "Badge",
              description: "Optional badge (contoh: POPULER)",
            }),
            defineField({
              name: "link",
              type: "link",
            }),
          ],
          preview: {
            select: {
              title: "title",
              price: "price",
            },
            prepare({ title, price }) {
              return {
                title: title || "Service Type",
                subtitle: price || "",
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
        title: "Service Types",
        subtitle: title,
      };
    },
  },
});
