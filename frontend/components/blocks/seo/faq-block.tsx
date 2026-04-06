import { stegaClean } from "next-sanity";
import SectionContainer from "@/components/ui/section-container";
import { fetchSeoSettings } from "@/sanity/lib/fetch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ColorVariant, SectionPadding } from "@/sanity.types";

type FaqBlock = {
  _type: "faq-block";
  _key: string;
  padding?: string;
  colorVariant?: string;
  title?: string;
  description?: string;
  category: "website" | "software" | "printing";
};

export default async function FaqBlock({
  padding,
  colorVariant,
  title,
  description,
  category,
}: FaqBlock) {
  const color = stegaClean(colorVariant) as ColorVariant | null;
  const pad = padding as unknown as SectionPadding | null;
  const seoSettings = await fetchSeoSettings();
  const faqs = seoSettings?.faq?.[category] || [];

  if (!faqs || faqs.length === 0) return null;

  return (
    <SectionContainer color={color} padding={pad}>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title || "Pertanyaan yang Sering Diajukan"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {description || "Temukan jawaban untuk pertanyaan umum seputar layanan kami"}
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq: any, index: number) => (
            <AccordionItem key={faq._key || index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Masih ada pertanyaan? Hubungi kami untuk konsultasi gratis
          </p>
          <a
            href="https://wa.me/6285799520350?text=Halo, saya ingin konsultasi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </SectionContainer>
  );
}
