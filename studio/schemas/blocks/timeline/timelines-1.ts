import { defineField, defineType } from "sanity";

export default defineType({
  name: "timelines-1",
  type: "object",
  title: "Timelines 1",
  initialValue: {
    title: "Discovery & Audit",
    tagLine: "Minggu 1",
    body: [
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Analisis kebutuhan bisnis, audit proses eksisting, dan prioritas fitur untuk fase implementasi.",
          },
        ],
      },
    ],
  },
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "tagLine",
      title: "Tag Line",
      description:
        "A short tag line to display under the title, e.g. date, location, job title, etc.",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "block-content",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
