import Link from "next/link";

import { BookTrigger } from "@/components/blocks/book-trigger";
import { FaceStack } from "@/components/blocks/face-stack";
import { CookieSettingsLink } from "@/components/consent/cookie-settings-link";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { Logomark } from "@/components/ui/logomark";
import { BOOK_DOORS, CONTACT_EMAIL, FOOTER } from "@/content/site";
import { FOUNDERS } from "@/lib/founders";

/**
 * The manifesto once more, the two calls with the faces you'll meet, and
 * the plain facts: who we are legally, how to reach us.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const muted = "text-[15px] text-paper/60 transition-colors hover:text-paper";

  return (
    <footer data-tone="ink" className="border-t border-line-dark bg-ink text-paper">
      <Container className="pb-10 pt-20 md:pt-28">
        {/* one sentence per line, so the pair never breaks mid-thought */}
        <p className="display text-[length:var(--text-title)] leading-[1.02]">
          <span className="block">{FOOTER.line[0]}</span>
          <span className="block text-paper/45">{FOOTER.line[1]}</span>
        </p>

        <div className="mt-14 grid gap-3 md:mt-20 lg:grid-cols-2">
          {BOOK_DOORS.map((d) => (
            <BookTrigger
              key={d.id}
              booking={d.booking}
              placement="footer"
              className="group grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-4 rounded-[24px] border border-line-dark p-5 text-left transition-[background-color,border-color] duration-200 hover:border-paper/30 hover:bg-ink-soft sm:grid-cols-[auto_1fr_auto] md:p-6"
            >
              <FaceStack
                ids={d.faces}
                size={52}
                ring="ink"
                className="col-start-1 row-start-1"
              />
              {/* phones: faces and arrow share the top row, words get the full width */}
              <span className="col-span-2 row-start-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                <span className="block text-lg font-semibold">{d.title}</span>
                <span className="block text-paper/60">{d.detail}</span>
              </span>
              <span className="col-start-2 row-start-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-200 group-hover:translate-x-0.5 sm:col-start-3">
                <ArrowRight className="size-[18px]" />
              </span>
            </BookTrigger>
          ))}
        </div>

        <div className="mt-20 grid gap-12 border-t border-line-dark pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight"
            >
              <Logomark className="size-7" />
              Gimmir
            </Link>
            <p className="mt-5 max-w-[30ch] text-paper/60">
              Nazar and Oleh build SaaS that founders own. Fitness is where we
              go deepest.
            </p>
          </div>

          {FOOTER.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/40">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={muted}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/40">
              Talk to us
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[15px] font-semibold text-paper transition-colors hover:text-paper/70"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              {Object.values(FOUNDERS).map((f) => (
                <li key={f.id}>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={muted}
                  >
                    {f.first} on LinkedIn
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line-dark pt-6 text-sm text-paper/45 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <span>
              © {year} {FOOTER.company}
            </span>
            {FOOTER.legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-paper">
                {l.label}
              </Link>
            ))}
            <CookieSettingsLink className="transition-colors hover:text-paper" />
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
            Built in the open by Nazar &amp; Oleh
          </p>
        </div>
      </Container>
    </footer>
  );
}
