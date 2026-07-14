import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const SERVICES = [
  {
    n: "01",
    title: "Member & booking platforms",
    desc: "Subscriptions, payments, scheduling, and the back office that runs every location.",
  },
  {
    n: "02",
    title: "Sport & fitness apps",
    desc: "iOS and Android products your members open every day. Fast, and built to last.",
  },
  {
    n: "03",
    title: "Community & social features",
    desc: "Chat, groups, and the engagement layer that keeps athletes coming back.",
  },
  {
    n: "04",
    title: "AI inside your product",
    desc: "Personalized coaching, smart recommendations, and assistants built into real workflows, not bolted on.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="03"
            titleMax="max-w-[32ch]"
            title="One team for the whole product, not just the easy parts."
          />
        </Reveal>

        <div className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={(i % 2) * 70}>
              <div className="flex h-full flex-col gap-3.5 border-b border-line py-8 md:py-9">
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex items-center justify-center rounded-md bg-lime px-2.5 py-1 text-xs font-extrabold text-ink">
                    {s.n}
                  </span>
                  <h3 className="text-[22px] font-bold tracking-tight md:text-2xl">
                    {s.title}
                  </h3>
                </div>
                <p className="max-w-[46ch] text-[17px] leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-muted">
            Delivered as a{" "}
            <strong className="font-semibold text-ink">
              dedicated team that becomes part of yours
            </strong>
            , or as a{" "}
            <strong className="font-semibold text-ink">fixed-scope build</strong>{" "}
            with a clear timeline and price.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
