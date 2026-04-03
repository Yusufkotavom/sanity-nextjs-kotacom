import { Dot, Sparkles } from "lucide-react";

export default function InlinePhraseStrip({
  phrases,
}: {
  phrases: string[];
}) {
  if (phrases.length === 0) return null;

  return (
    <div className="container section-divider py-10 md:py-12">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          {phrases.map((phrase, index) => (
            <span key={phrase} className="inline">
              <span>{phrase}</span>
              {index < phrases.length - 1 ? (
                <span className="mx-2 inline-flex translate-y-[-0.08em] items-center text-foreground/45">
                  {index % 2 === 0 ? (
                    <Sparkles className="size-5 md:size-6" />
                  ) : (
                    <Dot className="size-7 md:size-8" />
                  )}
                </span>
              ) : null}
              {" "}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
}
