import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import HeaderMenu from "@/components/header/header-menu";
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
          <MobileNav navigation={navigation} settings={settings} />
        </div>

        <div className="hidden h-16 items-center gap-4 lg:flex">
          <Link href="/" aria-label="Home page" className="shrink-0">
            <Logo settings={settings} />
          </Link>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <DesktopNav navigation={navigation} />
          </div>
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}
