import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const CARDS = [
  {
    title: "A licence per location",
    body: "Every new site raises the bill, whether or not it's profitable yet.",
  },
  {
    title: "A margin on every transaction",
    body: "Often the biggest line, and the one nobody adds up. It grows with your revenue, not your usage.",
  },
  {
    title: "A roadmap you can't touch",
    body: "Your member experience changes when the vendor decides, for all their customers at once.",
  },
];

export function RentingCost() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader index="01" title="What renting really costs at your size." />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 70} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-7">
                <h3 className="text-xl font-bold tracking-tight">{c.title}</h3>
                <p className="leading-relaxed text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-muted">
            Most founders have never seen the twelve-month total. Add up the
            last twelve invoices and the processing statements — that is the
            number we start from.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
