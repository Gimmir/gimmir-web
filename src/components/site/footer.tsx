import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logomark } from "@/components/ui/logomark";
import { CookieSettingsLink } from "@/components/consent/cookie-settings-link";
import { FooterCta } from "@/components/site/footer-cta";
import { FOUNDERS } from "@/lib/founders";
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
  const columns = nav?.footerColumns ?? [];
  const email = settings?.contactEmail;
  const linkClass =
    "text-[15px] font-medium text-muted transition-colors hover:text-ink";

  return (
    <footer className="border-t border-line">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.9fr] lg:gap-16">
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
            <FooterCta label={nav?.footerCtaLabel ?? "Book a call"} />
          </div>

          {/* link columns (Sanity) + legal & contact (code) */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
          >
            {columns.map((col) => (
              <div key={col._key}>
                <p className="font-mono text-xs uppercase tracking-widest text-faint">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-3.5">
                  {(col.links ?? []).map((l) => (
                    <li key={l._key}>
                      <Link href={l.href ?? "#"} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-faint">
                Legal &amp; contact
              </p>
              <ul className="mt-5 space-y-3.5">
                {email && (
                  <li>
                    <a
                      href={`mailto:${email}`}
                      className="text-[15px] font-semibold transition-colors hover:text-muted"
                    >
                      {email}
                    </a>
                  </li>
                )}
                {Object.values(FOUNDERS).map((f) => (
                  <li key={f.id}>
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      LinkedIn · {f.first}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href="/privacy" className={linkClass}>
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className={linkClass}>
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </Container>

      {/* bottom bar */}
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {year} Gimmir LLC · Delaware, USA · Team in the EU</span>
            <CookieSettingsLink />
          </p>
          <p className="font-mono text-xs uppercase tracking-wider">
            {nav?.footerNote}
          </p>
        </Container>
      </div>
    </footer>
  );
}
