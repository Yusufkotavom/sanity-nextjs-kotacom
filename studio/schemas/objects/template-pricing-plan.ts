import { defineField, defineType } from "sanity";

export default defineType({
  name: "templatePricingPlan",
  title: "Template Pricing Plan",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "recommended",
      title: "Recommended",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
