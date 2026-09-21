import { Fragment } from "react";

import { ArrowRight } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const STEPS = [
  {
    tag: "Free · 20 min",
    title: "Platform cost check",
    body: "We look at your last invoice together and give you a rough annual figure on the call.",
  },
  {
    tag: "£2,500 fixed · 5 working days",
    title: "Platform Fee Teardown",
    body: "Your real three-year cost of renting, a rent-vs-own model with payback in months, a migration risk map, and a plain go / no-go. If we can't find at least £2,500 a year in savings, you pay nothing.",
  },
  {
    tag: "Fixed price, by milestone",
    title: "Migration blueprint & build",
    body: "Architecture, a member-data and payments migration plan, and a fixed quote. Built by the team the founders lead. Code, repos and accounts in your name from the first commit.",
  },
];

function StepArrow() {
  return (
    <div className="flex items-center justify-center py-1 md:py-0">
      <span className="flex size-9 items-center justify-center rounded-full bg-lime text-ink shadow-[0_4px_12px_-6px_rgba(21,20,14,0.4)]">
        <ArrowRight className="size-4 rotate-90 md:rotate-0" />
      </span>
    </div>
  );
}

export function OfferLadder() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="04" title="Start with the numbers, not a build." />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-3">
          {STEPS.map((s, i) => (
            <Fragment key={s.title}>
              <Reveal delay={i * 90} className="h-full">
                <div className="flex h-full flex-col gap-3.5 rounded-2xl border border-line bg-surface p-7 md:p-8">
                  <span className="inline-flex w-fit items-center rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                    {s.tag}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
              {i < STEPS.length - 1 ? <StepArrow /> : null}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
