import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "SEO Ops Dashboard",
  description: "Operational dashboard for SEO indexing, migration, and AI writer settings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
