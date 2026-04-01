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
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "None", value: "" },
          { title: "Facebook", value: "facebook" },
          { title: "Instagram", value: "instagram" },
          { title: "X", value: "x" },
          { title: "YouTube", value: "youtube" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "TikTok", value: "tiktok" },
          { title: "GitHub", value: "github" },
          { title: "Website", value: "website" },
        ],
        layout: "dropdown",
      },
      initialValue: "",
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
