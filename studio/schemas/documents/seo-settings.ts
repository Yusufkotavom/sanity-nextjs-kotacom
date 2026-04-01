import { defineField, defineType } from "sanity";
import { SearchCheck } from "lucide-react";

export default defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  icon: SearchCheck,
  fields: [
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
      initialValue: "Schema UI",
      description:
        "Fallback default meta title. If empty in rendering logic, brand name from Settings is used.",
      validation: (Rule) => Rule.required().error("Default title is required"),
    }),
    defineField({
      name: "defaultDescription",
      title: "Default Meta Description",
      type: "text",
      rows: 3,
      initialValue:
        "Modern website powered by Next.js and Sanity with scalable content management.",
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
      name: "noIndexBlogCategories",
      title: "No Index Blog Category Pages",
      type: "boolean",
      initialValue: false,
      description:
        "When enabled, all pages under /blog/category/[slug] are marked noindex and excluded from sitemap.",
    }),
    defineField({
      name: "noIndexProductCategories",
      title: "No Index Product Category Pages",
      type: "boolean",
      initialValue: false,
      description:
        "When enabled, all category listings under /products/[slug] are marked noindex and excluded from sitemap.",
    }),
    defineField({
      name: "noIndexServiceCategories",
      title: "No Index Service Category Pages",
      type: "boolean",
      initialValue: false,
      description:
        "When enabled, all category listings under /services/[slug] are marked noindex and excluded from sitemap.",
    }),
    defineField({
      name: "robotsDisallowPaths",
      title: "Robots Disallow Paths",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Optional list of path prefixes blocked in robots.txt, e.g. /internal or /preview.",
      validation: (Rule) =>
        Rule.custom((paths: string[] | undefined) => {
          if (!paths?.length) return true;
          const invalid = paths.find((path) => !path || !path.startsWith("/"));
          return invalid ? "Each disallow path must start with '/'" : true;
        }),
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
      title: "defaultTitle",
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
