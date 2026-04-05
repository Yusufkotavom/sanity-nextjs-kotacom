import { defineField, defineType } from "sanity";

export default defineType({
  name: "templateFeature",
  title: "Template Feature",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Icon Key",
      type: "string",
      description:
        "Gunakan key icon untuk fitur (contoh: speed, security, conversion, design, support, ecommerce, boxes).",
    }),
  ],
});
