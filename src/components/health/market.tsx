import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const STATS = [
  { value: "USD 11.3B", label: "wellness apps market, 2024" },
  { value: "USD 26.2B", label: "projected by 2030" },
  { value: "~14.9%", label: "a year, 2025 to 2030" },
];

export function Market() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="02"
            title="A growing market that rewards products built properly."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="h-full">
              <div className="flex h-full flex-col gap-2 rounded-2xl border border-line bg-surface p-7 md:p-8">
                <div className="text-[clamp(2.2rem,4vw,3rem)] font-extrabold leading-none tracking-tight text-ink">
                  {s.value}
                </div>
                <div className="mt-1 max-w-[20ch] text-pretty text-sm text-faint">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-muted">
            The growth comes from preventive health and daily monitoring. It
            doesn&apos;t make users stay, though: people switch apps quickly and
            think twice before sharing health data. Keeping them is an
            engineering and product problem, and it&apos;s exactly what
            we&apos;re good at.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 text-sm text-faint">
            Source:{" "}
            <a
              href="https://www.grandviewresearch.com/industry-analysis/wellness-apps-market-report"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 transition-colors hover:text-ink"
            >
              Grand View Research, Wellness Apps Market Report (2025)
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
