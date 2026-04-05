import { defineField, defineType } from "sanity";

export default defineType({
  name: "templateTestimonial",
  title: "Template Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
    }),
  ],
});
