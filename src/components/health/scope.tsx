import { Container } from "@/components/ui/container";
import { Check, X } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const WE_BUILD = [
  "Sleep",
  "Nutrition",
  "Women's health",
  "Longevity",
  "Metabolic health",
  "Mental wellbeing",
  "Habit & behavior change",
];

const WE_DONT_BUILD = [
  "Diagnosis or treatment",
  "Regulated clinical workflows",
  "Medical devices or software as a medical device",
  "Anything HIPAA-covered",
];

export function Scope() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="01"
            title="Prevention and wellbeing, not the clinic."
            intro="We build wellness and prevention apps: habit and behavior change, tracking, coaching, community and subscriptions. We do not build regulated clinical software, HIPAA-covered systems or medical devices. Knowing exactly where that line is, and building right up to it safely, is part of the expertise."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-stretch">
          {/* we build */}
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-9">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1.5 bg-lime"
              />
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <Check className="size-4" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  We build
                </span>
              </div>

              <ul className="mt-7 flex flex-col gap-5">
                {WE_BUILD.map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-lg leading-relaxed text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* we don't build */}
          <Reveal delay={70} className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper-2 p-7 md:p-9">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1.5 bg-ink/12"
              />
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/45">
                  <X className="size-3.5" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-faint">
                  We don&apos;t build
                </span>
              </div>

              <ul className="mt-7 flex flex-col gap-5">
                {WE_DONT_BUILD.map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/45">
                      <X className="size-3.5" />
                    </span>
                    <span className="text-lg leading-relaxed text-muted">
                      {item}
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
