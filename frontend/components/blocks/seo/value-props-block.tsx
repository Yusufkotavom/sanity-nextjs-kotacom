import { stegaClean } from "next-sanity";
import type { PAGE_QUERY_RESULT } from "@/sanity.types";
import SectionContainer from "@/components/ui/section-container";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type ValuePropsBlock = Extract<Block, { _type: "value-props-block" }>;

export default function ValuePropsBlock({
  padding,
  colorVariant,
  title,
  description,
  valueProps,
}: ValuePropsBlock) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="mx-auto max-w-7xl">
        {title && (
          <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl">
            {title}
          </h2>
        )}
        {description && (
          <p className="mx-auto mb-12 max-w-3xl text-center text-muted-foreground">
            {description}
          </p>
        )}

        {valueProps && valueProps.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop) => (
              <div
                key={prop._key}
                className="rounded-lg border bg-card p-6 text-center shadow-sm"
              >
                {prop.icon && (
                  <div className="mb-3 text-4xl">{prop.icon}</div>
                )}
                <h3 className="mb-2 text-lg font-semibold">{prop.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
