import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logomark } from "@/components/ui/logomark";
import type {
  NAVIGATION_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
} from "@/sanity/types";

export function Footer({
  nav,
  settings,
}: {
  nav: NAVIGATION_QUERY_RESULT;
  settings: SETTINGS_QUERY_RESULT;
}) {
  const year = new Date().getFullYear();
  const links = nav?.footerLinks ?? [];
  const email = settings?.contactEmail;

  return (
    <footer className="border-t border-line">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
          {/* brand + CTA */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight"
            >
              <Logomark className="size-7 text-ink" />
              {settings?.siteName ?? "Gimmir"}
            </Link>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
              {nav?.footerTagline}
            </p>
            <Button cal arrow className="mt-8">
              {nav?.footerCtaLabel ?? "Book a founder review call"}
            </Button>
          </div>

          {/* nav + contact */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:justify-items-end">
            <nav aria-label="Footer">
              <p className="font-mono text-xs uppercase tracking-widest text-faint">
                Explore
              </p>
              <ul className="mt-5 space-y-3.5">
                {links.map((p) => (
                  <li key={p._key}>
                    <Link
                      href={p.href ?? "#"}
                      className="text-[15px] font-medium text-muted transition-colors hover:text-ink"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:text-right">
              <p className="font-mono text-xs uppercase tracking-widest text-faint">
                Contact
              </p>
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="mt-5 block text-[15px] font-semibold transition-colors hover:text-muted"
                >
                  {email}
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* bottom bar */}
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {settings?.siteName ?? "Gimmir"}</p>
          <p className="font-mono text-xs uppercase tracking-wider">
            {nav?.footerNote}
          </p>
        </Container>
      </div>
    </footer>
  );
}
