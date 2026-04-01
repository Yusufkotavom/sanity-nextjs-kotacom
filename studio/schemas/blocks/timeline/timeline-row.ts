import { defineType, defineField } from "sanity";
import { ArrowDownNarrowWide } from "lucide-react";

export default defineType({
  name: "timeline-row",
  type: "object",
  title: "Timeline Row",
  description: "Row of Timeline Sections",
  icon: ArrowDownNarrowWide,
  initialValue: {
    colorVariant: "background",
    timelines: [
      {
        _type: "timelines-1",
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
                text: "Sesi kickoff, pemetaan kebutuhan, dan validasi target bisnis.",
              },
            ],
          },
        ],
      },
      {
        _type: "timelines-1",
        title: "Implementation",
        tagLine: "Minggu 2-4",
        body: [
          {
            _type: "block",
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                marks: [],
                text: "Pengerjaan fitur prioritas, review berkala, dan QA bertahap.",
              },
            ],
          },
        ],
      },
      {
        _type: "timelines-1",
        title: "Launch & Support",
        tagLine: "Minggu 5+",
        body: [
          {
            _type: "block",
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                marks: [],
                text: "Go-live, monitoring performa, dan dukungan operasional pasca rilis.",
              },
            ],
          },
        ],
      },
    ],
  },
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "timelines",
      type: "array",
      of: [{ type: "timelines-1" }],
      options: {
        insertMenu: {
          views: [
            {
              name: "grid",
              previewImageUrl: (block) => `/sanity/preview/${block}.jpg`,
            },
            { name: "list" },
          ],
        },
      },
    }),
  ],
  preview: {
    select: {
      subtitle: "timelines.0.title",
    },
    prepare({ subtitle }) {
      return {
        title: "Timelines Row",
        subtitle,
      };
    },
  },
});
