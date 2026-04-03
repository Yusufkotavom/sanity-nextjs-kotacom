import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SocialLinks from "@/components/header/social-links";
import WhatsAppIcon from "@/components/whatsapp-icon";
import WhatsAppLink from "@/components/whatsapp-link";
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
  const whatsApp = settings?.whatsApp;
  const showWhatsAppCta = Boolean(whatsApp?.enabled && whatsApp?.phoneNumber);
  const whatsAppLabel = whatsApp?.ctaText?.trim() || "Chat via WhatsApp";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65 dark:border-white/10 dark:bg-black/85">
      <div className="container">
        <div className="flex h-15 items-center justify-between lg:hidden">
          <Link href="/" aria-label="Home page" className="shrink-0">
            <Logo settings={settings} />
          </Link>
          <div className="flex items-center gap-1.5">
            {showWhatsAppCta ? (
              <WhatsAppLink
                phoneNumber={whatsApp.phoneNumber}
                predefinedText={whatsApp.predefinedText}
                sourceUrl={whatsApp.sourceUrl}
                ariaLabel={whatsAppLabel}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "icon",
                  }),
                  "size-8 rounded-full border-green-500/25 bg-green-500/12 p-0 text-green-700 hover:border-green-500/40 hover:bg-green-500/18 dark:border-green-400/25 dark:bg-green-500/15 dark:text-green-300 dark:hover:border-green-400/40 dark:hover:bg-green-500/22",
                )}
              >
                <WhatsAppIcon className="size-4" />
                <span className="sr-only">{whatsAppLabel}</span>
              </WhatsAppLink>
            ) : null}
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
            {showWhatsAppCta ? (
              <WhatsAppLink
                phoneNumber={whatsApp.phoneNumber}
                predefinedText={whatsApp.predefinedText}
                sourceUrl={whatsApp.sourceUrl}
                ariaLabel={whatsAppLabel}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                  }),
                  "h-8 rounded-full border-green-500/25 bg-green-500/12 px-3.5 text-xs font-medium text-green-700 hover:border-green-500/40 hover:bg-green-500/18 dark:border-green-400/25 dark:bg-green-500/15 dark:text-green-300 dark:hover:border-green-400/40 dark:hover:bg-green-500/22",
                )}
              >
                <WhatsAppIcon className="size-4" />
                {whatsAppLabel}
              </WhatsAppLink>
            ) : null}
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
