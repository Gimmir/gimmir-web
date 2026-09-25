import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { HeaderThemeProvider } from "@/components/site/header-theme";

/**
 * Header, footer and skip link around site content. Shared by the (site)
 * layout and the root not-found page, which renders outside that layout.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <HeaderThemeProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </HeaderThemeProvider>
  );
}
