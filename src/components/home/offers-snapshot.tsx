import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { BOOKINGS, type BookingId } from "@/lib/booking";
import { hostNames } from "@/lib/founders";
import {
  FOUNDER_LADDER,
  OFFERS,
  OPERATOR_LADDER,
  formatPrice,
  type OfferId,
} from "@/lib/offers";

const PATHS: Array<{
  title: string;
  booking: BookingId;
  ladder: OfferId[];
  href: string;
  linkLabel: string;
}> = [
  {
    title: "Fitness operators",
    booking: "costCheck",
    ladder: OPERATOR_LADDER,
    href: "/operators",
    linkLabel: "The operator path",
  },
  {
    title: "Product & health founders",
    booking: "founderReview",
    ladder: FOUNDER_LADDER,
    href: "/the-review",
    linkLabel: "The founder path",
  },
];

/** Both ladders at a glance; names and prices come from lib/offers. */
export function OffersSnapshot({
  heading,
  intro,
}: {
  heading?: string | null;
  intro?: string | null;
}) {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="05"
            title={heading ?? "Ways to start."}
            intro={intro}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PATHS.map((path, i) => (
            <Reveal key={path.title} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 md:p-9">
                <p className="font-mono text-xs uppercase tracking-widest text-faint">
                  With {hostNames(BOOKINGS[path.booking].hosts)}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">
                  {path.title}
                </h3>
                <ol className="mt-6 flex flex-1 flex-col">
                  {path.ladder.map((id, step) => {
                    const o = OFFERS[id];
                    return (
                      <li
                        key={id}
                        className="flex items-baseline justify-between gap-4 border-t border-line py-3.5 first:border-t-0"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-xs text-faint">
                            {String(step + 1).padStart(2, "0")}
                          </span>
                          <span className="font-semibold">{o.name}</span>
                        </span>
                        <span className="shrink-0 text-right text-sm text-muted">
                          {formatPrice(o)}
                          {o.guarantee ? " · money-back" : ""}
                        </span>
                      </li>
                    );
                  })}
                </ol>
                <Link
                  href={path.href}
                  className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
                >
                  {path.linkLabel}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10">
            <Button href="/pricing" variant="outline" arrow>
              See pricing
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
