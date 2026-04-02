import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "link",
  type: "object",
  title: "Link",
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) return true;

      const link = value as {
        isExternal?: boolean;
        href?: string;
        internalLink?: { _ref?: string } | null;
      };

      if (link.isExternal) {
        return link.href
          ? true
          : "External link requires URL (href).";
      }

      return link.internalLink?._ref
        ? true
        : "Internal link requires Internal Link reference.";
    }),
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
      to: [
        { type: "page" },
        { type: "post" },
        { type: "category" },
        { type: "product" },
        { type: "service" },
        { type: "project" },
      ],
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
        }).custom((value, context) => {
          const isExternal = (context.parent as { isExternal?: boolean } | undefined)
            ?.isExternal;
          if (!isExternal) return true;
          return value ? true : "URL is required when Is External is enabled.";
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
      hidden: ({ document }) => document?._type !== "navigation",
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
      hidden: ({ document }) => document?._type !== "navigation",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?._type !== "navigation") return true;
          return value ? true : "Navigation Location is required.";
        }),
    }),
    defineField({
      name: "showInFooter",
      type: "boolean",
      title: "Show in Footer",
      initialValue: true,
      hidden: ({ document }) => document?._type !== "navigation",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "navigation-icon",
      description: "Optional icon shown near the navigation label.",
      hidden: ({ document }) => document?._type !== "navigation",
    }),
    defineField({
      name: "children",
      title: "Sub Menu",
      type: "array",
      of: [defineArrayMember({ type: "navigation-link-child" })],
      description:
        "Optional nested items for dropdown/submenu navigation. Also used as full footer menu links.",
      validation: (Rule) => Rule.max(8),
      hidden: ({ document }) => document?._type !== "navigation",
    }),
  ],
});
