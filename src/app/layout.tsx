import type { Metadata } from "next";
import { Archivo, Space_Mono, Newsreader } from "next/font/google";
import { draftMode } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditing } from "next-sanity/visual-editing";

import { Clarity } from "@/components/analytics/clarity";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { CalProvider } from "@/components/cal/cal-provider";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { SanityLive } from "@/sanity/lib/live";
import { SITE_URL, socialMetadata } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-ui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gimmir — Product engineering for sport & fitness",
    template: "%s · Gimmir",
  },
  description:
    "Gimmir builds the apps and platforms behind scaling sport and fitness brands. Start with a free review call with the founders behind UN1T and Jimmy Coach.",
  ...socialMetadata({
    title: "Gimmir — Fitness app & software development company",
    description:
      "Gimmir builds the apps and platforms behind scaling sport and fitness brands.",
    path: "/",
    image: "/opengraph-image",
  }),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${newsreader.variable} ${spaceMono.variable}`}
    >
      <body>
        {children}
        <CalProvider />
        <Analytics />
        <SpeedInsights />
        <Clarity />
        <GoogleAnalytics />
        <SanityLive />
        {isDraftMode && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
