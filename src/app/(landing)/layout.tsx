import { LandingFooter } from "@/components/site/landing-footer";

/**
 * Landing pages for links from ads and posts (/franchise?landing=true is
 * rewritten here, see next.config.ts): the page alone, no site header,
 * and a footer with nothing that leads back into the site.
 */
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>
      <main id="main">{children}</main>
      <LandingFooter />
    </>
  );
}
