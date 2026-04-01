import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";

export default defineType({
  name: "hero-2",
  title: "Hero 2",
  type: "object",
  icon: LayoutTemplate,
  initialValue: {
    tagLine: "Partner Teknologi Bisnis",
    title: "Website, Software, dan IT Support dalam satu tim",
    body: [
      {
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Pendekatan one-stop untuk operasional dan pemasaran digital: mulai dari development hingga support harian.",
          },
        ],
      },
    ],
    links: [
      {
        _type: "link",
        isExternal: true,
        title: "Lihat Portofolio",
        href: "/portfolio",
        buttonVariant: "default",
      },
      {
        _type: "link",
        isExternal: true,
        title: "Hubungi Tim",
        href: "/contact-us",
        buttonVariant: "link",
      },
    ],
  },
  fields: [
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
      name: "links",
      type: "array",
      of: [{ type: "link" }],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero 2",
        subtitle: title,
      };
    },
  },
});
