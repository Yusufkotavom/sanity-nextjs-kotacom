import { defineField, defineType } from "sanity";
import { SearchCheck } from "lucide-react";

export default defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  icon: SearchCheck,
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Site name is required"),
    }),
    defineField({
      name: "titleSuffix",
      title: "Title Suffix",
      type: "string",
      description: "Suffix used in title template. Example: Schema UI",
      initialValue: "Schema UI",
    }),
    defineField({
      name: "defaultTitle",
      title: "Default Meta Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Default title is required"),
    }),
    defineField({
      name: "defaultDescription",
      title: "Default Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().error("Default description is required"),
    }),
    defineField({
      name: "defaultNoIndex",
      title: "Default No Index",
      type: "boolean",
      initialValue: false,
      description: "Applied when a page does not define its own noindex setting.",
    }),
    defineField({
      name: "twitterHandle",
      title: "Twitter/X Handle",
      type: "string",
      description: "Example: @schemaui",
    }),
    defineField({
      name: "defaultImage",
      title: "Default Open Graph Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "siteName",
      media: "defaultImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "SEO Settings",
        subtitle: "Global SEO fallback configuration",
        media,
      };
    },
  },
});
