import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { generateRootMetadata } from "@/sanity/lib/metadata";
import { fetchSanityThemeSettings, fetchSanitySeoSettings } from "@/sanity/lib/fetch";

const THEME_PRESETS: Record<
  string,
  {
    lightPrimary: string;
    lightPrimaryForeground: string;
    lightAccent: string;
    lightRing: string;
    darkPrimary: string;
    darkPrimaryForeground: string;
    darkAccent: string;
    darkRing: string;
  }
> = {
  neutral: {
    lightPrimary: "#171717",
    lightPrimaryForeground: "#FAFAFA",
    lightAccent: "#F5F5F5",
    lightRing: "#0070F3",
    darkPrimary: "#FAFAFA",
    darkPrimaryForeground: "#111111",
    darkAccent: "#222222",
    darkRing: "#3291FF",
  },
  ocean: {
    lightPrimary: "#0070F3",
    lightPrimaryForeground: "#FAFAFA",
    lightAccent: "#EBF4FF",
    lightRing: "#0070F3",
    darkPrimary: "#3291FF",
    darkPrimaryForeground: "#0A0A0A",
    darkAccent: "#1A2233",
    darkRing: "#60A5FA",
  },
  sunset: {
    lightPrimary: "#E5484D",
    lightPrimaryForeground: "#FAFAFA",
    lightAccent: "#FFF3E0",
    lightRing: "#F59E0B",
    darkPrimary: "#FB7185",
    darkPrimaryForeground: "#111111",
    darkAccent: "#2B1A16",
    darkRing: "#FBBF24",
  },
  "brand-tricolor-a": {
    lightPrimary: "#0070F3",
    lightPrimaryForeground: "#FAFAFA",
    lightAccent: "#FFE08A",
    lightRing: "#F59E0B",
    darkPrimary: "#3291FF",
    darkPrimaryForeground: "#0A0A0A",
    darkAccent: "#3A1A1D",
    darkRing: "#FBBF24",
  },
  "brand-tricolor-b": {
    lightPrimary: "#E5484D",
    lightPrimaryForeground: "#FAFAFA",
    lightAccent: "#EAF2FF",
    lightRing: "#F59E0B",
    darkPrimary: "#FB7185",
    darkPrimaryForeground: "#111111",
    darkAccent: "#112033",
    darkRing: "#FBBF24",
  },
  "brand-tricolor-c": {
    lightPrimary: "#F59E0B",
    lightPrimaryForeground: "#171717",
    lightAccent: "#EAF2FF",
    lightRing: "#E5484D",
    darkPrimary: "#FBBF24",
    darkPrimaryForeground: "#111111",
    darkAccent: "#132033",
    darkRing: "#FB7185",
  },
};

function toHexColor(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim();
  return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(normalized)
    ? normalized
    : undefined;
}

export async function generateMetadata(): Promise<Metadata> {
  return generateRootMetadata();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeSettings, seoSettings] = await Promise.all([
    fetchSanityThemeSettings(),
    fetchSanitySeoSettings(),
  ]);
  const colors = themeSettings?.themeColors;
  const themeVars: Record<string, string> = {};
  const preset = THEME_PRESETS[colors?.themePreset || "neutral"];

  if (preset) {
    themeVars["--studio-light-primary"] = preset.lightPrimary;
    themeVars["--studio-light-primary-foreground"] = preset.lightPrimaryForeground;
    themeVars["--studio-light-accent"] = preset.lightAccent;
    themeVars["--studio-light-ring"] = preset.lightRing;
    themeVars["--studio-dark-primary"] = preset.darkPrimary;
    themeVars["--studio-dark-primary-foreground"] = preset.darkPrimaryForeground;
    themeVars["--studio-dark-accent"] = preset.darkAccent;
    themeVars["--studio-dark-ring"] = preset.darkRing;
  }

  const lightPrimary = toHexColor(colors?.lightPrimary);
  if (lightPrimary) themeVars["--studio-light-primary"] = lightPrimary;

  const lightPrimaryForeground = toHexColor(colors?.lightPrimaryForeground);
  if (lightPrimaryForeground) {
    themeVars["--studio-light-primary-foreground"] = lightPrimaryForeground;
  }

  const lightAccent = toHexColor(colors?.lightAccent);
  if (lightAccent) themeVars["--studio-light-accent"] = lightAccent;

  const lightRing = toHexColor(colors?.lightRing);
  if (lightRing) themeVars["--studio-light-ring"] = lightRing;

  const darkPrimary = toHexColor(colors?.darkPrimary);
  if (darkPrimary) themeVars["--studio-dark-primary"] = darkPrimary;

  const darkPrimaryForeground = toHexColor(colors?.darkPrimaryForeground);
  if (darkPrimaryForeground) {
    themeVars["--studio-dark-primary-foreground"] = darkPrimaryForeground;
  }

  const darkAccent = toHexColor(colors?.darkAccent);
  if (darkAccent) themeVars["--studio-dark-accent"] = darkAccent;

  const darkRing = toHexColor(colors?.darkRing);
  if (darkRing) themeVars["--studio-dark-ring"] = darkRing;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      style={themeVars}
    >
      <link rel="icon" href="/fav.png" />
      <body
        className={cn("min-h-screen bg-background font-sans antialiased overscroll-none")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position="top-center" richColors />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kotacom",
              "url": "https://www.kotacom.id",
              "logo": "https://www.kotacom.id/assets/images/kotacom-logo-Cxnk7d9Z_1nOG2e.svg",
              "description": "Solusi IT & Digital Terpadu untuk Bisnis Anda",
              "foundingDate": "2008",
              "sameAs": [
                "https://www.instagram.com/kotacom.id",
                "https://www.facebook.com/kotacom"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+6285799520350",
                "contactType": "customer service",
                "areaServed": "ID",
                "availableLanguage": ["Indonesian", "English"]
              }
            }),
          }}
        />
        {/* WebSite Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Kotacom",
              "url": "https://www.kotacom.id",
              "description": "Solusi IT, Website, Software & Percetakan Profesional Surabaya",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.kotacom.id/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "ProfessionalService"],
              "name": "Kotacom IT Service & Percetakan",
              "url": "https://www.kotacom.id",
              "logo": "https://www.kotacom.id/assets/images/kotacom-logo-Cxnk7d9Z_1nOG2e.svg",
              "image": "https://www.kotacom.id/assets/images/kotacom-logo-Cxnk7d9Z_1nOG2e.svg",
              "description": "Solusi IT & Digital Terpadu untuk Bisnis Anda. IT Service & Percetakan - Pengadaan, Service, Penjualan, Website Development, Software Development, Percetakan, Social Media Management.",
              "telephone": "+6285799520350",
              "priceRange": "$$",
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Graha Indraprasta G7/15",
                  "addressLocality": "Tulangan",
                  "addressRegion": "Sidoarjo",
                  "postalCode": "61273",
                  "addressCountry": "ID"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Jl. Tenggilis Mulya 76",
                  "addressLocality": "Surabaya",
                  "addressRegion": "Jawa Timur",
                  "postalCode": "60292",
                  "addressCountry": "ID"
                }
              ],
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Surabaya"
                },
                {
                  "@type": "City",
                  "name": "Sidoarjo"
                },
                {
                  "@type": "Country",
                  "name": "Indonesia"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+6285799520350",
                "contactType": "customer service",
                "areaServed": "ID",
                "availableLanguage": ["Indonesian", "English"]
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "17:00"
                }
              ],
              "sameAs": [
                "https://www.instagram.com/kotacom.id",
                "https://www.facebook.com/kotacom"
              ],
              ...((seoSettings as any)?.defaultAggregateRating?.ratingValue ? {
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": String((seoSettings as any).defaultAggregateRating.ratingValue),
                  "reviewCount": String((seoSettings as any).defaultAggregateRating.reviewCount || 1),
                  "bestRating": String((seoSettings as any).defaultAggregateRating.bestRating || 5)
                }
              } : {}),
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Layanan Utama Kotacom",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Jasa Service Komputer & Jaringan"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Jasa Pembuatan Website & Software Development"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Jasa Percetakan Buku & Digital Printing"
                    }
                  }
                ]
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
