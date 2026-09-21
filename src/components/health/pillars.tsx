import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const PILLARS = [
  {
    title: "Privacy-first from day one",
    body: "GDPR-aligned, privacy by design, and an EU-based team. Data handling is scoped before we write code.",
  },
  {
    title: "Wearable & health data",
    body: "Apple HealthKit and Android Health Connect integrations, shipped in production.",
  },
  {
    title: "Retention mechanics",
    body: "Streaks, community, messaging and content that bring people back.",
  },
  {
    title: "Subscriptions",
    body: "Stripe, trials, courses and paywalls that convert.",
  },
  {
    title: "AI features, done responsibly",
    body: "With consent, explainability and privacy built in, not bolted on.",
  },
];

export function Pillars() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="03"
            title="The parts that make or break a wellness app."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 70} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-7">
                <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
