import type { Metadata } from "next";
import { Archivo, Space_Mono, Newsreader } from "next/font/google";
import { draftMode } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditing } from "next-sanity/visual-editing";

import { CalProvider } from "@/components/cal/cal-provider";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { SanityLive } from "@/sanity/lib/live";
import { SITE_URL, socialMetadata } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  // width axis: the manifesto type sets wide (font-stretch) at display sizes
  axes: ["wdth"],
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
    default: "Gimmir: Fitness & wellness platforms you own",
    template: "%s · Gimmir",
  },
  description:
    "Founder-led product engineering for fitness and wellness: member apps, coaching platforms and back offices, in your name from day one. Talk to Nazar & Oleh.",
  ...socialMetadata({
    title: "Gimmir: Fitness & wellness app development company",
    description:
      "Founder-led product engineering for fitness and wellness: member apps, coaching platforms and back offices you own.",
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
        <CookieConsent />
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
