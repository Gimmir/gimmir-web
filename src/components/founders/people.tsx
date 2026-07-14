import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const FOUNDERS = [
  {
    initials: "NM",
    name: "Nazar Moroz",
    role: "Founder",
    bio: "Leads product and business. Has built and shipped fitness products end to end, as an owner carrying the same risk a founder carries. On a Gimmir engagement, Nazar is the one who pressure-tests your product thinking and your plan.",
  },
  {
    initials: "OP",
    name: "Oleh Palazhii",
    role: "CTO",
    bio: "Led the architecture of both the UN1T platform and Jimmy Coach. The person who can tell, in days, whether a product will hold up in years. On a Gimmir engagement, Oleh owns the technical judgment: how it is built, and whether it will scale.",
  },
];

export function PeopleSection() {
  return (
    <section
      id="founders"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader index="03" title="You work with us, directly." />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 80} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-8 md:p-9">
                <span
                  className="flex size-20 items-center justify-center rounded-full bg-lime text-2xl font-extrabold tracking-tight text-ink"
                  aria-hidden
                >
                  {f.initials}
                </span>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-2xl font-bold tracking-tight md:text-[1.7rem]">
                    {f.name}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {f.role}
                  </span>
                </div>
                <p className="mt-4 leading-relaxed text-muted">{f.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-muted md:text-xl">
            Two founders who have already built what you are trying to build. On
            every engagement,{" "}
            <strong className="font-semibold text-ink">
              one or both of us is in the room.
            </strong>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
