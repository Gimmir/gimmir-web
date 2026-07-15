import { Header } from "@/components/site/header";
import { HeaderThemeProvider } from "@/components/site/header-theme";
import { Footer } from "@/components/site/footer";
import { sanityFetch } from "@/sanity/lib/live";
import { NAVIGATION_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ data: nav }, { data: settings }] = await Promise.all([
    sanityFetch({ query: NAVIGATION_QUERY }),
    sanityFetch({ query: SETTINGS_QUERY }),
  ]);

  return (
    <HeaderThemeProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>
      <Header nav={nav} />
      <main id="main">{children}</main>
      <Footer nav={nav} settings={settings} />
    </HeaderThemeProvider>
  );
}
