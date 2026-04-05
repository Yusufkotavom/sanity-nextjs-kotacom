import { defineField, defineType } from "sanity";
import { Package } from "lucide-react";

export default defineType({
  name: "serviceType",
  title: "Service Type",
  type: "document",
  icon: Package,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().error("Title is required"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required().error("Slug is required"),
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      description: "Parent category (e.g., software, percetakan, pembuatan-website)",
      options: {
        list: [
          { title: "Software", value: "software" },
          { title: "Percetakan", value: "percetakan" },
          { title: "Pembuatan Website", value: "pembuatan-website" },
          { title: "Sistem POS", value: "sistem-pos" },
          { title: "Layanan", value: "layanan" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required().error("Category is required"),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      description: "Brief description of this service type",
    }),
    defineField({
      name: "defaultTemplate",
      type: "reference",
      title: "Default Template",
      description: "Default page template for this service type (can be overridden per location)",
      to: [{ type: "pageTemplate" }],
    }),
    defineField({
      name: "structured",
      type: "object",
      title: "Default Content",
      description: "Default content structure (can be overridden per location)",
      fields: [
        defineField({
          name: "primaryKeyword",
          type: "string",
          title: "Primary Keyword",
          description: "Use {lokasi} token for location injection",
        }),
        defineField({
          name: "secondaryKeywords",
          type: "array",
          title: "Secondary Keywords",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "intro",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "highlights",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "faqs",
          type: "array",
          of: [{ type: "templateFaq" }],
        }),
      ],
    }),
    defineField({
      name: "sortOrder",
      type: "number",
      title: "Sort Order",
      description: "Lower numbers appear first",
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      slug: "slug.current",
    },
    prepare({ title, category, slug }) {
      return {
        title: title || "Untitled",
        subtitle: category ? `${category} / ${slug}` : slug,
      };
    },
  },
  orderings: [
    {
      title: "Category, A-Z",
      name: "categoryAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "sortOrder", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
});
