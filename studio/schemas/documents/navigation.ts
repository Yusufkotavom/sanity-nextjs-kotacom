import { defineArrayMember, defineField, defineType } from "sanity";
import { Menu } from "lucide-react";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: Menu,
  initialValue: {
    links: [],
    headerCta: {
      title: "Start Building",
      isExternal: false,
      target: false,
      buttonVariant: "default",
    },
  },
  fields: [
    defineField({
      name: "links",
      title: "Links",
      description:
        "Navigation links for header and footer. Use Navigation Location to split Primary vs Utility/CTA links.",
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
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: "headerCta",
      title: "Header CTA Button",
      description:
        "Primary call-to-action shown at the right side of desktop header.",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});
