import { defineField, defineType } from "sanity";

export default defineType({
  name: "templateRewriteCopy",
  title: "Template Rewrite Copy",
  type: "object",
  fields: [
    defineField({
      name: "primaryKeyword",
      title: "Primary Keyword / Headline",
      type: "string",
    }),
    defineField({
      name: "secondaryKeywords",
      title: "Secondary Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { sortable: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "eeatPoints",
      title: "E-E-A-T Points",
      type: "array",
      of: [{ type: "templateEeatPoint" }],
    }),
    defineField({
      name: "process",
      title: "Process Steps",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "templateFaq" }],
    }),
    defineField({
      name: "ctaLabel",
      title: "Primary CTA Label",
      type: "string",
    }),
    defineField({
      name: "ctaLink",
      title: "Primary CTA Link",
      type: "link",
    }),
    defineField({
      name: "ctaLinks",
      title: "Quick CTA Links",
      type: "array",
      of: [{ type: "templateCtaLink" }],
    }),
    defineField({
      name: "serviceTypes",
      title: "Service Types",
      type: "array",
      of: [{ type: "templateServiceType" }],
    }),
    defineField({
      name: "pricingPlans",
      title: "Pricing Plans",
      type: "array",
      of: [{ type: "templatePricingPlan" }],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "templateFeature" }],
    }),
    defineField({
      name: "proofItems",
      title: "Proof Items",
      type: "array",
      of: [{ type: "templateProofItem" }],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "templateTestimonial" }],
    }),
    defineField({
      name: "longGuide",
      title: "Long Guide",
      type: "array",
      of: [{ type: "templateLongGuide" }],
    }),
    defineField({
      name: "finalCtaTitle",
      title: "Final CTA Title",
      type: "string",
    }),
    defineField({
      name: "finalCtaDescription",
      title: "Final CTA Description",
      type: "text",
      rows: 3,
    }),
  ],
});
