import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { OFFERS, formatPrice, type OfferId } from "@/lib/offers";

/** What acting on The Review costs; names and prices come from offers. */
const STEPS: Array<{ id: OfferId; body: string }> = [
  { id: "fixSprint", body: "We fix the highest-risk issues ourselves." },
  {
    id: "build",
    body: "We build the real thing, in your name, fixed milestone by milestone.",
  },
  {
    id: "care",
    body: "Ongoing build and maintenance once you're live.",
  },
];

export function AfterReviewSection() {
  return (
    <section
      id="after"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="06"
            title="Then, if you want, we build."
            intro="The Review stands on its own, and the plan works with any team. If you want us to act on it, here's what that costs."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ id, body }, i) => {
            const o = OFFERS[id];
            return (
              <Reveal key={id} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col gap-3.5 rounded-2xl border border-line bg-surface p-7 md:p-8">
                  <span className="inline-flex w-fit items-center rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                    {formatPrice(o)} · {o.duration.toLowerCase()}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight">{o.name}</h3>
                  <p className="leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
