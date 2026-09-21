import Link from "next/link";

import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const CARDS = [
  {
    title: "Member & class-booking apps",
    body: "iOS and Android apps your members open every day: bookings, memberships and payments.",
  },
  {
    title: "Back office & multi-location",
    body: "Classes, memberships, staff and reporting across every site, on one data model.",
  },
  {
    title: "Payments, fees & payouts",
    body: "Subscriptions, card payments and payouts built around how you actually operate.",
  },
  {
    title: "Coaching platforms",
    body: "Workout builders, progress tracking, community and messaging for coaches and their clients.",
  },
];

/** The fitness core: what most of our build work actually is. */
export function CoreSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="01" title="Core: fitness platforms." />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 70} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-7">
                <h3 className="text-xl font-bold tracking-tight">{c.title}</h3>
                <p className="leading-relaxed text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/operators"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
            >
              For fitness operators
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/work"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
            >
              See the work
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
