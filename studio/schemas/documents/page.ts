import { defineField, defineType } from "sanity";
import { Files } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import meta from "../blocks/shared/meta";
import pageBlocks from "../blocks/shared/page-blocks";

// Sanity-only architecture (F1): every public URL is ONE `page` document rendered
// from `blocks[]`. `path` is the canonical absolute route (supports nested slugs
// like /percetakan/cetak-buku). `contentStatus` gates public render + sitemap.
// Hybrid fields (topBlockCount / HYBRID_PAGE_SLUGS) and the code+template render
// fallbacks are retired.

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
      name: "path",
      title: "Path (URL)",
      type: "string",
      group: "settings",
      description:
        "Route absolut kanonik. Contoh: /about, /percetakan/cetak-buku. Gunakan '/' untuk homepage. Menentukan URL publik (mendukung slug bersarang).",
      placeholder: "/percetakan/cetak-buku",
      validation: (Rule) =>
        Rule.required().custom((value?: string) => {
          if (!value) return "Path wajib diisi";
          if (!value.startsWith("/")) return "Path harus diawali '/'";
          if (/\s/.test(value)) return "Path tidak boleh mengandung spasi";
          if (value.length > 1 && value.endsWith("/"))
            return "Path tidak boleh diakhiri '/'";
          return true;
        }),
    }),
    defineField({
      name: "slug",
      title: "Slug (legacy)",
      type: "slug",
      group: "settings",
      description:
        "Dipertahankan untuk kompatibilitas migrasi. Sumber URL kini adalah field `path`.",
      options: {
        source: "title",
        maxLength: 96,
      },
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
    pageBlocks,
    defineField({
      name: "contentStatus",
      title: "Content Status",
      type: "string",
      group: "seo",
      description:
        "draft = tidak dirender publik & tidak di-sitemap · ready = dirender tapi noindex (belum di-sitemap) · index = index,follow & masuk sitemap.",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Ready (noindex)", value: "ready" },
          { title: "Index (sitemap)", value: "index" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aggregateRating",
      title: "Aggregate Rating",
      type: "aggregateRating",
      group: "seo",
      description: "Page-level rating override. Falls back to SEO Settings default if empty.",
    }),
    meta,
    orderRankField({ type: "page" }),
  ],
  preview: {
    select: {
      title: "title",
      path: "path",
      slug: "slug.current",
      contentStatus: "contentStatus",
    },
    prepare({ title, path, slug, contentStatus }) {
      const route = path || (slug ? `/${slug}` : "");
      return {
        title: title || route || "Untitled page",
        subtitle: `${route}${contentStatus ? ` · ${contentStatus}` : ""}`,
      };
    },
  },
});
