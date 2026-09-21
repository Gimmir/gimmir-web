import { Container } from "@/components/ui/container";
import { Check } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { OFFERS, formatPrice } from "@/lib/offers";

const STEPS = [
  "Member data mapped and tested before anything moves.",
  "A cutover plan that doesn't interrupt billing.",
  "Sites move in waves, not all at once.",
  "A fixed build price, milestone by milestone.",
];

export function SwitchPlan() {
  const blueprint = OFFERS.blueprint;

  return (
    <section
      id="switch"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="04"
            titleMax="max-w-[30ch]"
            title="Switching is the part you're worried about. It's the part we plan first."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted md:text-xl">
              We start with a fixed-scope{" "}
              <strong className="font-semibold text-ink">
                {blueprint.name}
              </strong>{" "}
              ({formatPrice(blueprint)}, {blueprint.duration}, credited to your
              build). You get a migration plan, a data model and a fixed build
              quote before you commit to the build. No surprises, no &ldquo;it
              depends&rdquo;.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-paper-2 p-6 md:p-8">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-[5px] bg-lime"
              />
              <ul className="flex flex-col gap-4">
                {STEPS.map((s) => (
                  <li key={s} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-lg leading-relaxed text-ink">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
