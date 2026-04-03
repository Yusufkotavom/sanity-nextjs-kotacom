import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";

import { PAGE_QUERY_RESULT } from "@/sanity.types";

type SectionHeaderProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "section-header" }
> & {
  pageTitle?: string | null;
};

export default function SectionHeader({
  padding,
  colorVariant,
  sectionWidth = "default",
  stackAlign = "left",
  tagLine,
  title,
  description,
  pageTitle,
}: SectionHeaderProps) {
  const isNarrow = sectionWidth === "narrow";
  const resolvedTitle = title?.trim() || pageTitle?.trim() || undefined;

  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div
        className={cn(
          stackAlign === "center"
            ? "max-w-[48rem] text-center mx-auto"
            : undefined,
          isNarrow ? "max-w-[48rem] mx-auto" : undefined,
        )}
      >
        <div
          className={cn(
            colorVariant === "primary" ? "text-background" : undefined,
          )}
        >
          {tagLine && (
            <h1 className="leading-[0] mb-4">
              <span className="text-ui-label">{tagLine}</span>
            </h1>
          )}
          {resolvedTitle ? <h2 className="text-display-lg mb-4">{resolvedTitle}</h2> : null}
        </div>
        <p className="text-ui-body">{description}</p>
      </div>
    </SectionContainer>
  );
}
