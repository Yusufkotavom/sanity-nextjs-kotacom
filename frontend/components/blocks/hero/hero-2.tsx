import { Button } from "@/components/ui/button";
import Link from "next/link";
import PortableTextRenderer from "@/components/portable-text-renderer";
import SanityIcon from "@/components/icons/sanity-icon";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import {
  SectionIntro,
  SectionPanel,
  SectionShell,
} from "@/components/ui/section-shell";

type Hero2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "hero-2" }
> & {
  pageTitle?: string | null;
};

export default function Hero2({
  tagLine,
  uiIcon,
  title,
  body,
  links,
  pageTitle,
}: Hero2Props) {
  const resolvedTitle = title?.trim() || pageTitle?.trim() || undefined;

  return (
    <SectionShell className="pt-16 lg:pt-24">
      <SectionPanel
        tone="sky"
        className="mx-auto max-w-5xl rounded-[1.9rem] px-5 py-10 text-center md:px-10 md:py-14 !bg-none !bg-white/40 dark:!bg-white/5 backdrop-blur-md"
      >
        {tagLine || uiIcon ? (
          <div className="mb-3 inline-flex items-center justify-center gap-2 text-ui-label text-foreground/55">
            <SanityIcon icon={uiIcon} className="size-4" />
            {tagLine ? <span>{tagLine}</span> : null}
          </div>
        ) : null}
        <SectionIntro
          title={resolvedTitle || ""}
          align="center"
          className="mb-0 max-w-3xl"
        />
        {body ? (
          <div className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            <PortableTextRenderer value={body} />
          </div>
        ) : null}
        {links && links.length > 0 ? (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <Button key={link.title} variant={link?.buttonVariant} asChild>
                <Link
                  href={link.href || "#"}
                  target={link.target ? "_blank" : undefined}
                  rel={link.target ? "noopener" : undefined}
                >
                  <SanityIcon icon={link.uiIcon || link.icon} className="size-4" />
                  {link.title}
                </Link>
              </Button>
            ))}
          </div>
        ) : null}
      </SectionPanel>
    </SectionShell>
  );
}
