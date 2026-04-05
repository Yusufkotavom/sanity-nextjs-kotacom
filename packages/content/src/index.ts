import { z } from "zod";

export const templateOutputSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  sections: z
    .array(
      z.object({
        heading: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .min(1),
  seoTitle: z.string().min(3),
  seoDescription: z.string().min(10),
  categoryNames: z.array(z.string()).optional().default([]),
});

export type TemplateOutput = z.infer<typeof templateOutputSchema>;

export function validateTemplateOutput(input: unknown) {
  return templateOutputSchema.safeParse(input);
}
