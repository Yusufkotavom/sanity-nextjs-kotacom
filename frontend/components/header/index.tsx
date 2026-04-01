import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import SocialLinks from "@/components/header/social-links";
import { ModeToggle } from "@/components/menu-toggle";
import { fetchSanitySettings, fetchSanityNavigation } from "@/sanity/lib/fetch";

export default async function Header() {
  const settings = (await fetchSanitySettings()) as any;
  const navigation = await fetchSanityNavigation();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between lg:hidden">
          <Link href="/" aria-label="Home page" className="shrink-0">
            <Logo settings={settings} />
          </Link>
          <div className="flex items-center justify-end gap-1">
            <ModeToggle />
            <MobileNav navigation={navigation} settings={settings} />
          </div>
        </div>

        <div className="hidden grid-cols-[auto_1fr_auto] items-start gap-2 py-3 lg:grid">
          <div className="flex h-10 items-center justify-start">
            <Link href="/" aria-label="Home page" className="shrink-0">
              <Logo settings={settings} />
            </Link>
          </div>
          <div className="flex justify-center px-4">
            <DesktopNav navigation={navigation} />
          </div>
          <div className="flex max-w-[340px] flex-wrap items-center justify-end gap-1">
            <ModeToggle />
            <SocialLinks
              links={settings?.socialLinks}
              className="flex-[1_1_220px] justify-end"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
