import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { LayoutTemplate } from "lucide-react";
import pageBlocks from "../blocks/shared/page-blocks";

const TEMPLATE_VARIANTS = [
  { title: "Service Hero", value: "service-hero" },
  { title: "Local Proof", value: "local-proof" },
  { title: "Pricing Focus", value: "pricing-focus" },
  { title: "Generic Company", value: "generic-company" },
];

export default defineType({
  name: "pageTemplate",
  title: "Page Template",
  type: "document",
  icon: LayoutTemplate,
  groups: [
    { name: "content", title: "Content" },
    { name: "hero", title: "Hero" },
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      group: "settings",
      options: {
        list: TEMPLATE_VARIANTS,
        layout: "dropdown",
      },
      initialValue: "service-hero",
    }),
    defineField({
      name: "isHybrid",
      title: "Hybrid Template",
      type: "boolean",
      group: "settings",
      description: "Jika aktif, blocks dapat dirender di atas dan bawah shell.",
      initialValue: false,
    }),
    defineField({
      name: "shellId",
      title: "Shell ID",
      type: "string",
      group: "settings",
      description:
        "ID shell code-owned (mis. percetakan, pembuatan-website, software).",
    }),
    defineField({
      name: "topBlockCountDefault",
      title: "Top Block Count Default",
      type: "number",
      group: "settings",
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "structured",
      title: "Structured Copy",
      type: "templateRewriteCopy",
      group: "content",
    }),
    pageBlocks,
    defineField({
      name: "metaDefaults",
      title: "Meta Defaults",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Title",
        }),
        defineField({
          name: "description",
          type: "text",
          title: "Description",
          rows: 3,
        }),
        defineField({
          name: "canonicalUrl",
          type: "url",
          title: "Canonical URL Override",
        }),
        defineField({
          name: "focusKeyword",
          type: "string",
          title: "Focus Keyword",
        }),
        defineField({
          name: "secondaryKeywords",
          type: "array",
          title: "Secondary Keywords",
          of: [{ type: "string" }],
          options: { sortable: true },
        }),
        defineField({
          name: "noindex",
          title: "No Index",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "image",
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative Text",
            }),
          ],
        }),
      ],
    }),
    orderRankField({ type: "pageTemplate" }),
  ],
  preview: {
    select: {
      title: "title",
      variant: "variant",
      isHybrid: "isHybrid",
    },
    prepare({ title, variant, isHybrid }) {
      return {
        title: title || "Page Template",
        subtitle: `${variant || "template"}${isHybrid ? " · hybrid" : ""}`,
      };
    },
  },
});
