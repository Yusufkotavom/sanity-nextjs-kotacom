const GONE_PATHS = [
  "/411081-2",
  "/411062-2",
  "/kakie-stavki-na-sport-dostupny-na-mostbet-prognozy-ekspertov",
  "/best-online-casinos-nz-2025-trusted-quick-payouts-huge-bonuses",
  "/410008-2",
  "/understanding-betting-limits-and-rules-on-1xbet-apk",
  "/najlepsze-legalne-kasyna-on-line-w-polsce-na-prawdziwe-pieniadze",
  "/20-business-blogs-that-will-blow-your-mind",
  "/test-keyword-professional-services",
  "/casibom-guncel-giris-baglantilarinda-sik-yapilan-hatalar",
  "/mobile-gaming-with-lucky-hills-in-australia",
  "/vulkan-vegas-gaming-lizenzen-legitimitat-und-vertrauensfaktoren",
  "/bukmekerskie-kontory-i-nalog-na-vyigryshi-chto-nuzhno-znat",
  "/pricing-2",
  "/want-to-grow-your-business-you-need-a-growth-strategy",
  "/digital-product",
  "/409107-2",
  "/mobile-gaming-with-lucky-hills-in-australia-3",
  "/__trashed-2",
  "/onlayn-kazinolar",
  "/vavada",
  "/1xbet-online-best-sports-to-bet-on-for-beginners",
  "/5-stages-of-team-development-what-you-need-to-know",
  "/best-online-casinos-australia-top-aussie-betting-sites-2025",
  "/sweet-paz-demo-play-totally-free-experience-the-particular-fun",
  "/the-dog-house-multihold",
  "/writing-a-business-case-what-it-is-and-how-to-write",
  "/top-review-list-elementor",
] as const;

const GONE_PATH_SET = new Set<string>(GONE_PATHS);

export function isGonePath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return GONE_PATH_SET.has(normalized);
}

export function getGonePaths() {
  return [...GONE_PATHS];
}
