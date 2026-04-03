import Link from "next/link";
import SectionContainer from "@/components/ui/section-container";
import PortableTextRenderer from "@/components/portable-text-renderer";
import GlobalWhatsAppButton from "@/components/global-whatsapp-button";
import { Button } from "@/components/ui/button";
import SanityIcon from "@/components/icons/sanity-icon";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import { cn } from "@/lib/utils";

type WhatsAppCtaProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "whatsapp-cta" }
>;

export default async function WhatsAppCta({
  padding,
  colorVariant,
  sectionWidth = "default",
  stackAlign = "left",
  tagLine,
  uiIcon,
  title,
  body,
  secondaryLink,
}: WhatsAppCtaProps) {
  const isNarrow = sectionWidth === "narrow";

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div
        className={cn(
          stackAlign === "center" ? "mx-auto max-w-[48rem] text-center" : undefined,
          isNarrow ? "mx-auto max-w-[48rem]" : undefined,
        )}
      >
        <div className={cn(colorVariant === "primary" ? "text-background" : undefined)}>
          {tagLine || uiIcon ? (
            <div className="mb-4 inline-flex items-center gap-2">
              <SanityIcon icon={uiIcon} className="size-4" />
              {tagLine ? <span className="text-base font-semibold">{tagLine}</span> : null}
            </div>
          ) : null}
          <h2 className="mb-4">{title}</h2>
          {body ? <PortableTextRenderer value={body} /> : null}
        </div>
        <div
          className={cn(
            "mt-10 flex flex-wrap gap-4",
            stackAlign === "center" ? "justify-center" : undefined,
          )}
        >
          <GlobalWhatsAppButton fallbackLabel="Chat via WhatsApp" />
          {secondaryLink?.title && secondaryLink.href ? (
            <Button variant={secondaryLink.buttonVariant || "outline"} asChild>
              <Link
                href={secondaryLink.href}
                target={secondaryLink.target ? "_blank" : undefined}
                rel={secondaryLink.target ? "noopener noreferrer" : undefined}
              >
                <SanityIcon
                  icon={secondaryLink.uiIcon || secondaryLink.icon}
                  className="size-4"
                />
                {secondaryLink.title}
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </SectionContainer>
  );
}
