import { Button } from "@/components/ui/button";
import Link from "next/link";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type Hero2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "hero-2" }
> & {
  pageTitle?: string | null;
};

export default function Hero2({
  tagLine,
  title,
  body,
  links,
  pageTitle,
}: Hero2Props) {
  const resolvedTitle = title?.trim() || pageTitle?.trim() || undefined;

  return (
    <div className="container dark:bg-background py-20 lg:pt-40 text-center">
      {tagLine && (
        <h1 className="leading-[0] font-sans animate-fade-up [animation-delay:100ms] opacity-0">
          <span className="text-ui-label">{tagLine}</span>
        </h1>
      )}
      {resolvedTitle && (
        <h2 className="text-display-xl mt-6 animate-fade-up [animation-delay:200ms] opacity-0">
          {resolvedTitle}
        </h2>
      )}
      {body && (
        <div className="text-ui-body mt-6 max-w-2xl mx-auto animate-fade-up [animation-delay:300ms] opacity-0">
          <PortableTextRenderer value={body} />
        </div>
      )}
      {links && links.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-up [animation-delay:400ms] opacity-0">
          {links.map((link) => (
            <Button key={link.title} variant={link?.buttonVariant} asChild>
              <Link
                href={link.href || "#"}
                target={link.target ? "_blank" : undefined}
                rel={link.target ? "noopener" : undefined}
              >
                {link.title}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
