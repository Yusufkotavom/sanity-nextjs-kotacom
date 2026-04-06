import { stegaClean } from "next-sanity";
import type { PAGE_QUERY_RESULT } from "@/sanity.types";
import SectionContainer from "@/components/ui/section-container";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type FeaturesPackageBlock = Extract<Block, { _type: "features-package-block" }>;

export default function FeaturesPackageBlock({
  padding,
  colorVariant,
  title,
  subtitle,
  description,
  features,
}: FeaturesPackageBlock) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="mx-auto max-w-7xl">
        {title && (
          <div className="mb-4 text-center text-3xl font-bold md:text-4xl">
            {title}
          </div>
        )}
        {subtitle && (
          <div className="mb-3 text-center text-xl font-semibold md:text-2xl">
            {subtitle}
          </div>
        )}
        {description && (
          <p className="mx-auto mb-12 max-w-3xl text-center text-muted-foreground">
            {description}
          </p>
        )}

        {features && features.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature._key}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                {feature.icon && (
                  <div className="mb-3 text-3xl">{feature.icon}</div>
                )}
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {feature.description}
                </p>
                {feature.badge && (
                  <div className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {feature.badge}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
