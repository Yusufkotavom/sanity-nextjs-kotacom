import { renderLegacyRichHtml } from "@/lib/legacy-content/render";

type RichContentProps = {
  title?: string;
  excerpt?: string;
  contentFormat?: "markdown" | "html";
  contentRaw?: string;
};

export default function RichContent({
  title,
  excerpt,
  contentFormat,
  contentRaw,
}: RichContentProps) {
  const html = renderLegacyRichHtml(contentRaw || "", contentFormat);

  return (
    <section className="container py-10 md:py-14">
      <article className="mx-auto max-w-4xl">
        {title ? (
          <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
        ) : null}
        {excerpt ? <p className="mb-6 text-foreground/70">{excerpt}</p> : null}
        <div
          className="legacy-prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </section>
  );
}
