import { defineField, defineType } from "sanity";
import { TextQuote } from "lucide-react";

export default defineType({
  name: "split-content",
  type: "object",
  icon: TextQuote,
  title: "Split Content",
  description: "Column with tag line, title and content body.",
  initialValue: {
    sticky: false,
    colorVariant: "background",
    tagLine: "Mengapa Kami Ada",
    title: "One-stop partner untuk kebutuhan teknis bisnis modern",
    body: [
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Kami membantu bisnis tetap fokus ke growth dengan menangani website, software, IT support, dan kebutuhan digital secara terintegrasi.",
          },
        ],
      },
    ],
    link: {
      _type: "link",
      isExternal: true,
      title: "Diskusikan Kebutuhan",
      href: "/contact-us",
      buttonVariant: "default",
    },
  },
  fields: [
    defineField({
      name: "sticky",
      type: "boolean",
      description: "Sticky column on desktop",
      initialValue: false,
    }),
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
      name: "tagLine",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
    defineField({
      name: "link",
      type: "link",
      description:
        "Link to a page or external URL. Leave empty to hide the link.",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "No Title",
      };
    },
  },
});
