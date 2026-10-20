import type { Metadata } from "next";
import { Archivo, Space_Mono, Newsreader } from "next/font/google";
import { draftMode } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditing } from "next-sanity/visual-editing";

import { CalProvider } from "@/components/cal/cal-provider";
import { CtaTracker } from "@/components/analytics/cta-tracker";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { DisableDraftModeLazy } from "@/components/disable-draft-mode-lazy";
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

// Only Archivo is preloaded: on a slow phone the five preloads shared the
// line and Archivo landed after first paint, reflowing every headline (the
// fallback can't set the wide stretch). The serif is only ever italic.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-ui",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gimmir: your franchise's own app, booking and payments",
    template: "%s · Gimmir",
  },
  description:
    "Franchisees pay a platform every month. With your own app that money comes to HQ, plus a fee on every payment. Built for UN1T, a 10-studio franchise.",
  ...socialMetadata({
    title: "Gimmir: your franchise's own app, booking and payments",
    description:
      "Franchisees pay a platform every month. With your own app that money comes to HQ, plus a fee on every payment. Built for UN1T, a 10-studio franchise.",
    path: "/",
    image: "/opengraph-image",
  }),
  // Search Console ownership (Nazar's property, 2026-09-30)
  verification: {
    google: "lSElBP7s1KuJxk0w9ZIeRnYoWn_9VlorG0Og7ojrWVc",
  },
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
      // Next 16 no longer drops the CSS smooth scroll during navigation on
      // its own: without this, a new page glides up from the old scroll
      // position, firing every section's entrance on the way
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${newsreader.variable} ${spaceMono.variable}`}
    >
      <body>
        {children}
        <CalProvider />
        <CtaTracker />
        <Analytics />
        <SpeedInsights />
        <CookieConsent />
        <SanityLive />
        {isDraftMode && (
          <>
            <DisableDraftModeLazy />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
