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
  const navItems = (navDoc.links || []).filter(
    (item: any) => item?.title && item?.showInHeader !== false,
  );
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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65 dark:border-white/10 dark:bg-black/85">
      <div className="container">
        <div className="flex h-15 items-center justify-between lg:hidden">
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
                    variant: headerCta.buttonVariant || "outline",
                    size: "sm",
                  }),
                  "h-8 rounded-full px-3 text-xs font-medium dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:hover:bg-white/[0.08]",
                )}
              >
                {headerCta.title}
              </Link>
            )}
            <ModeToggle />
            <MobileNav navigation={navigation} settings={settings} />
          </div>
        </div>

        <div className="hidden h-15 items-center gap-5 lg:flex">
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
                className={cn(
                  buttonVariants({
                    variant: headerCta.buttonVariant || "default",
                    size: "sm",
                  }),
                  "h-8 rounded-full px-3.5 text-xs font-medium dark:border-white/15 dark:bg-white dark:text-black dark:hover:bg-white/90",
                )}
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
