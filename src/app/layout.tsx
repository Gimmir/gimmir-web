import type { Metadata } from "next";
import { Archivo, Space_Mono, Newsreader } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { DisableDraftMode } from "@/components/disable-draft-mode";
import { SanityLive } from "@/sanity/lib/live";
import { SITE_URL } from "@/lib/seo";
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
    "Gimmir builds the apps and platforms behind sport and fitness brands that are scaling. Start with a free review call with the founders who built UN1T's franchise platform and co-founded Jimmy Coach.",
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
