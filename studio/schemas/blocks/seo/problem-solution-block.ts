import { defineType, defineField } from "sanity";
import { AlertCircle } from "lucide-react";

export default defineType({
  name: "problem-solution-block",
  title: "Problem Solution Block",
  type: "object",
  icon: AlertCircle,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "title",
      type: "string",
      initialValue: "Apakah Bisnis Anda Mengalami Masalah Ini?",
    }),
    defineField({
      name: "problems",
      type: "array",
      of: [{ type: "string" }],
      description: "List masalah yang dihadapi bisnis",
    }),
    defineField({
      name: "solutionTitle",
      type: "string",
      title: "Solution Title",
      initialValue: "💡 Solusi:",
    }),
    defineField({
      name: "solution",
      type: "text",
      rows: 3,
      initialValue: "Website profesional yang responsif dan SEO-friendly dapat meningkatkan omset bisnis Anda hingga 200% dalam 6 bulan!",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Problem Solution",
        subtitle: title,
      };
    },
  },
});
