import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const CHIPS = [
  "React Native (Expo)",
  "TypeScript",
  "Supabase",
  "Next.js",
  "Stripe",
  "Apple HealthKit",
  "Android Health Connect",
];

/** The stack behind the platforms: proven, and hireable for. */
export function StackSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="04" title="What we build with." />
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-8 max-w-[68ch] text-lg leading-relaxed text-muted">
            React Native (Expo), TypeScript, Supabase, Next.js, Stripe. Proven,
            maintainable, and a stack your future team can hire for.
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
      </Container>
    </section>
  );
}
