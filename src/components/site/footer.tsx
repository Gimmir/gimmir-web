import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logomark } from "@/components/ui/logomark";

const PAGES = [
  { label: "Work", href: "/work" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Founders", href: "/founders" },
  { label: "The Review", href: "/the-review" },
];

export function Footer() {
  const year = new Date().getFullYear();

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
              Gimmir
            </Link>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
              We build the apps and platforms behind sport and fitness brands
              that are scaling.
            </p>
            <Button cal arrow className="mt-8">
              Book a founder review call
            </Button>
          </div>

          {/* nav + contact */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:justify-items-end">
            <nav aria-label="Footer">
              <p className="font-mono text-xs uppercase tracking-widest text-faint">
                Explore
              </p>
              <ul className="mt-5 space-y-3.5">
                {PAGES.map((p) => (
                  <li key={p.label}>
                    <Link
                      href={p.href}
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
              <a
                href="mailto:hello@gimmir.com"
                className="mt-5 block text-[15px] font-semibold transition-colors hover:text-muted"
              >
                hello@gimmir.com
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* bottom bar */}
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Gimmir</p>
          <p className="font-mono text-xs uppercase tracking-wider">
            Product engineering for sport &amp; fitness
          </p>
        </Container>
      </div>
    </footer>
  );
}
