import { stegaClean } from "next-sanity";
import type { PAGE_QUERY_RESULT } from "@/sanity.types";
import SectionContainer from "@/components/ui/section-container";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type ProblemSolutionBlock = Extract<Block, { _type: "problem-solution-block" }>;

export default function ProblemSolutionBlock({
  padding,
  colorVariant,
  title,
  problems,
  solutionTitle,
  solution,
}: ProblemSolutionBlock) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="mx-auto max-w-4xl">
        {title && (
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            {title}
          </h2>
        )}

        {problems && problems.length > 0 && (
          <ul className="mb-8 space-y-3">
            {problems.map((problem, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4"
              >
                <span className="mt-0.5 text-destructive">✗</span>
                <span className="text-sm">{problem}</span>
              </li>
            ))}
          </ul>
        )}

        {solution && (
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
            {solutionTitle && (
              <h3 className="mb-3 text-lg font-bold text-primary">
                {solutionTitle}
              </h3>
            )}
            <p className="text-sm leading-relaxed">{solution}</p>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
