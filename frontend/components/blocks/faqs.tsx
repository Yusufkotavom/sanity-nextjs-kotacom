import SectionContainer from "@/components/ui/section-container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type FAQProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "faqs" }
>;

export default function FAQs({ padding, colorVariant, faqs }: FAQProps) {
  const validFaqs = (faqs || []).filter(
    (faq): faq is NonNullable<typeof faq> => Boolean(faq?._id || faq?.title),
  );

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      {validFaqs.length > 0 && (
        <Accordion className="space-y-4" type="multiple">
          {validFaqs.map((faq, index) => (
            <AccordionItem
              key={faq._id || faq.title || `faq-${index}`}
              value={`item-${faq._id || faq.title || index}`}
            >
              <AccordionTrigger>{faq.title}</AccordionTrigger>
              <AccordionContent>
                <PortableTextRenderer value={faq.body || []} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </SectionContainer>
  );
}
