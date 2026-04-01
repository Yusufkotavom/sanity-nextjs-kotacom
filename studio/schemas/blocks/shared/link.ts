import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    defineField({
      name: "isExternal",
      type: "boolean",
      title: "Is External",
      initialValue: false,
    }),
    defineField({
      name: "internalLink",
      type: "reference",
      title: "Internal Link",
      to: [{ type: "page" }, { type: "post" }, { type: "product" }, { type: "service" }],
      hidden: ({ parent }) => parent?.isExternal,
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "href",
      type: "url",
      hidden: ({ parent }) => !parent?.isExternal,
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "target",
      type: "boolean",
      title: "Open in new tab",
      initialValue: false,
      hidden: ({ parent }) => !parent?.isExternal,
    }),
    defineField({
      name: "buttonVariant",
      type: "button-variant",
      title: "Button Variant",
      description:
        "Recommended: Primary links use Ghost/Link. Utility links can use Link/Outline/Default for CTA.",
    }),
    defineField({
      name: "navLocation",
      type: "string",
      title: "Navigation Location",
      options: {
        list: [
          { title: "Primary (center)", value: "primary" },
          { title: "Utility / CTA (right)", value: "utility" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "showInFooter",
      type: "boolean",
      title: "Show in Footer",
      initialValue: true,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "navigation-icon",
      description: "Optional icon shown near the navigation label.",
    }),
    defineField({
      name: "children",
      title: "Sub Menu",
      type: "array",
      of: [defineArrayMember({ type: "navigation-link-child" })],
      description:
        "Optional nested items for dropdown/submenu navigation. Also used as full footer menu links.",
      validation: (Rule) => Rule.max(8),
    }),
  ],
});
