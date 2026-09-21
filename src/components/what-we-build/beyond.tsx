import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const CHIPS = [
  "SaaS platforms",
  "Sports clubs & communities",
  "Entertainment & media apps",
  "Wearables & connected devices",
];

/** The honest edge: adjacent domains we'll take on, without overclaiming. */
export function BeyondSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="03"
            titleMax="max-w-[30ch]"
            title="Beyond: same engineering, other domains."
          />
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-8 max-w-[68ch] text-lg leading-relaxed text-muted">
            The core of what we do (native apps, real-time data, subscriptions,
            payments, connected devices) travels well beyond fitness. We take on
            select projects in SaaS, sports clubs, entertainment and wearables
            or connected devices. We don’t have public case studies in every one
            of these yet, so we won’t pretend we do. If you’re building
            something adjacent, tell us and we’ll be honest about fit.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap gap-3">
            {CHIPS.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line px-4 py-2 text-sm text-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <Button href="/contact" variant="outline" arrow className="mt-10">
            Tell us what you’re building
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
