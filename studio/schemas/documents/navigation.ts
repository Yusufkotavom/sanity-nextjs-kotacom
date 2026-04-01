import { defineArrayMember, defineField, defineType } from "sanity";
import { Menu } from "lucide-react";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: Menu,
  initialValue: {
    links: [],
  },
  fields: [
    defineField({
      name: "links",
      title: "Links",
      description:
        "Primary header links. New links default to a Vercel-like text style.",
      type: "array",
      of: [
        defineArrayMember({
          type: "link",
          initialValue: {
            isExternal: false,
            target: false,
            buttonVariant: "ghost",
          },
        }),
      ],
      validation: (Rule) => Rule.max(8),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});
