import { defineField, defineType } from "sanity";
import { Files } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import meta from "../blocks/shared/meta";

const HYBRID_PAGE_SLUGS = new Set([
  "home-pepar",
  "index",
  "layanan",
  "pembuatan-website",
  "percetakan",
  "software",
]);

export default defineType({
  name: "page",
  type: "document",
  title: "Page",
  icon: Files,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      group: "content",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "blocks",
      type: "array",
      group: "content",
      of: [
        { type: "hero-1" },
        { type: "hero-2" },
        { type: "section-header" },
        { type: "split-row" },
        { type: "grid-row" },
        { type: "carousel-1" },
        { type: "carousel-2" },
        { type: "timeline-row" },
        { type: "cta-1" },
        { type: "whatsapp-cta" },
        { type: "logo-cloud-1" },
        { type: "faqs" },
        { type: "form-newsletter" },
        { type: "all-posts" },
        { type: "legacy-rich-content" },
      ],
      options: {
        insertMenu: {
          groups: [
            {
              name: "hero",
              title: "Hero",
              of: ["hero-1", "hero-2"],
            },
            {
              name: "logo-cloud",
              title: "Logo Cloud",
              of: ["logo-cloud-1"],
            },
            {
              name: "section-header",
              title: "Section Header",
              of: ["section-header"],
            },
            {
              name: "grid",
              title: "Grid",
              of: ["grid-row"],
            },
            {
              name: "split",
              title: "Split",
              of: ["split-row"],
            },
            {
              name: "carousel",
              title: "Carousel",
              of: ["carousel-1", "carousel-2"],
            },
            {
              name: "timeline",
              title: "Timeline",
              of: ["timeline-row"],
            },
            {
              name: "cta",
              title: "CTA",
              of: ["cta-1", "whatsapp-cta"],
            },
            {
              name: "faqs",
              title: "FAQs",
              of: ["faqs"],
            },
            {
              name: "forms",
              title: "Forms",
              of: ["form-newsletter"],
            },
            {
              name: "all-posts",
              title: "All Posts",
              of: ["all-posts"],
            },
            {
              name: "legacy",
              title: "Legacy",
              of: ["legacy-rich-content"],
            },
          ],
          views: [
            {
              name: "grid",
              previewImageUrl: (block) => `/static/images/preview/${block}.jpg`,
            },
            { name: "list" },
          ],
        },
      },
    }),
    defineField({
      name: "topBlockCount",
      title: "Top Block Count",
      description:
        "Untuk page hybrid, tentukan berapa block pertama yang dirender sebelum section code-owned di tengah halaman.",
      type: "number",
      group: "settings",
      initialValue: 3,
      validation: (Rule) => Rule.integer().min(0),
    }),
    meta,
    orderRankField({ type: "page" }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      topBlockCount: "topBlockCount",
    },
    prepare({ title, slug, topBlockCount }) {
      const isHybrid = typeof slug === "string" && HYBRID_PAGE_SLUGS.has(slug);
      const splitCount =
        typeof topBlockCount === "number" && Number.isFinite(topBlockCount)
          ? Math.max(0, topBlockCount)
          : 0;

      return {
        title: title || slug || "Untitled page",
        subtitle: isHybrid ? `Hybrid · Top ${splitCount}` : slug || "Page",
      };
    },
  },
});
