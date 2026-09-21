import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";

/** The four routes into the site; fitness operators (most visitors) first. */
const ROUTES = [
  {
    href: "/operators",
    title: "I run a fitness business (8+ locations)",
    body: "You’re renting a booking platform and the fees keep climbing. We move you onto your own app.",
    dark: true,
  },
  {
    href: "/the-review",
    title: "I’m building a fitness product",
    body: "You’ve raised money and need a V1 that won’t need rebuilding. Get a CTO-level review.",
  },
  {
    href: "/health",
    title: "I’m building a health & wellness app",
    body: "Sleep, nutrition, women’s health, longevity, metabolic, mental wellbeing. Prevention, not regulated clinical.",
  },
  {
    href: "/what-we-build",
    title: "Something else",
    body: "Not fitness or wellness? Tell us what you’re building.",
  },
];

/** "Where do you fit?": routes each visitor to the page written for them. */
export function RouteSelector() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="01" title="Where do you fit?" />
        </Reveal>

        <nav
          aria-label="Choose your path"
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          {ROUTES.map((r, i) => (
            <Reveal key={r.href} delay={(i % 2) * 70} className="h-full">
              <Link
                href={r.href}
                className={cn(
                  "group flex h-full flex-col justify-between gap-6 rounded-2xl border p-6 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[.98] sm:p-8",
                  r.dark
                    ? "border-ink bg-ink text-paper hover:bg-ink/90"
                    : "border-line bg-surface text-ink hover:border-ink",
                )}
              >
                <span className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                  {r.title}
                </span>
                <span
                  className={cn(
                    "flex items-end justify-between gap-4 leading-relaxed",
                    r.dark ? "text-paper/65" : "text-muted",
                  )}
                >
                  {r.body}
                  <ArrowRight
                    className={cn(
                      "size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5",
                      r.dark ? "text-lime" : "text-ink",
                    )}
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </nav>
      </Container>
    </section>
  );
}
