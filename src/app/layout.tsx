import type { Metadata, Viewport } from "next";
import { Gloock, Schibsted_Grotesk } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const description =
  "mhx is a studio for builders. We build software with companies, start our own ventures, and run a fellowship for the people doing the same.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "mhx. forged in a new era.",
    template: "%s | mhx.",
  },
  description,
  openGraph: {
    title: "mhx. forged in a new era.",
    description,
    url: SITE_URL,
    siteName: "mhx.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "mhx. forged in a new era.",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#04060b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${gloock.variable} ${schibsted.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-sodium focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
