import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SocialLinks from "@/components/header/social-links";
import { fetchSanitySettings, fetchSanityNavigation } from "@/sanity/lib/fetch";

export default async function Header() {
  const settings = (await fetchSanitySettings()) as any;
  const navigation = (await fetchSanityNavigation()) as any;
  const navDoc = navigation?.[0] || {};
  const navItems = (navDoc.links || []).filter((item: any) => item?.title);
  const utilityItems = navItems.filter((item: any) => item.navLocation === "utility");
  const fallbackCta =
    utilityItems.find(
      (item: any) =>
        item.buttonVariant &&
        item.buttonVariant !== "ghost" &&
        item.buttonVariant !== "link",
    ) || null;
  const headerCta = navDoc.headerCta || fallbackCta;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-14 items-center justify-between lg:hidden">
          <Link href="/" aria-label="Home page" className="shrink-0">
            <Logo settings={settings} />
          </Link>
          <div className="flex items-center gap-1.5">
            {headerCta?.title && (
              <Link
                href={headerCta.href || "#"}
                target={headerCta.target ? "_blank" : undefined}
                rel={headerCta.target ? "noopener noreferrer" : undefined}
                className={cn(
                  buttonVariants({
                    variant: headerCta.buttonVariant || "default",
                    size: "sm",
                  }),
                  "h-8 px-3 text-xs",
                )}
              >
                {headerCta.title}
              </Link>
            )}
            <ModeToggle />
            <MobileNav navigation={navigation} settings={settings} />
          </div>
        </div>

        <div className="hidden h-14 items-center gap-4 lg:flex">
          <Link href="/" aria-label="Home page" className="shrink-0">
            <Logo settings={settings} />
          </Link>
          <DesktopNav navigation={navigation} />
          <div className="ml-auto flex items-center gap-1.5">
            <SocialLinks
              links={(settings as any)?.socialLinks}
              iconOnly
              size="sm"
              className="mr-1 hidden xl:flex"
            />
            <ModeToggle />
            {headerCta?.title && (
              <Link
                href={headerCta.href || "#"}
                target={headerCta.target ? "_blank" : undefined}
                rel={headerCta.target ? "noopener noreferrer" : undefined}
                className={buttonVariants({
                  variant: headerCta.buttonVariant || "default",
                  size: "sm",
                })}
              >
                {headerCta.title}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
