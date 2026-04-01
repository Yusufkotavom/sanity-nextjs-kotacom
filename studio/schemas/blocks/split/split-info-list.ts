import { defineField, defineType } from "sanity";
import { Info } from "lucide-react";
import { toPlainText } from "@portabletext/react";

export default defineType({
  name: "split-info-list",
  type: "object",
  icon: Info,
  title: "Split Info List",
  description:
    "Column with list of cards. Each card has a title, content body, image and tags",
  initialValue: {
    list: [
      {
        _type: "split-info",
        title: "IT Support",
        body: [
          {
            _type: "block",
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                marks: [],
                text: "Maintenance, monitoring, dan troubleshooting untuk menjaga sistem tetap andal.",
              },
            ],
          },
        ],
        tags: ["Support", "Maintenance", "Monitoring"],
      },
      {
        _type: "split-info",
        title: "Software Development",
        body: [
          {
            _type: "block",
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                marks: [],
                text: "Aplikasi custom berbasis kebutuhan proses bisnis dan target produktivitas tim.",
              },
            ],
          },
        ],
        tags: ["Custom App", "Automation", "Dashboard"],
      },
      {
        _type: "split-info",
        title: "Printing Services",
        body: [
          {
            _type: "block",
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                marks: [],
                text: "Kebutuhan cetak promosi dan administrasi dengan output tajam dan konsisten.",
              },
            ],
          },
        ],
        tags: ["Brosur", "Kalender", "Seminar Kit"],
      },
    ],
  },
  fields: [
    defineField({
      name: "list",
      type: "array",
      of: [{ type: "split-info" }],
    }),
  ],
  preview: {
    select: {
      title: "list.0.title",
      subtitle: "list.0.body",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "No Title",
        subtitle: toPlainText(subtitle) || "No Subtitle",
      };
    },
  },
});
