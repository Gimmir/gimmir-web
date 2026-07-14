import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const FOUNDERS = [
  {
    initials: "NM",
    name: "Nazar Moroz",
    role: "Founder — product & business",
    bio: "Product and business. Has built and shipped fitness products end to end, as an owner.",
  },
  {
    initials: "OP",
    name: "Oleh Palazhii",
    role: "CTO — architecture",
    bio: "Led the architecture of both the UN1T platform and Jimmy Coach. The person who can tell in days whether your product will hold up in years.",
  },
];

export function FoundersSection() {
  return (
    <section className="bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionHeader
            index="04"
            onDark
            title={
              <>
                The people who built it,{" "}
                <span className="font-serif font-normal italic text-lime">
                  not a sales team.
                </span>
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 70} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-paper/15 p-7 md:p-8">
                <span
                  className="flex size-14 items-center justify-center rounded-full bg-lime font-extrabold text-ink"
                  aria-hidden
                >
                  {f.initials}
                </span>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {f.name}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-lime">
                    {f.role}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-[#c9c6bc]">{f.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-[60ch] text-lg leading-relaxed text-[#8b887e]">
            You are not paying for a report a junior wrote. You are paying for
            the judgment of{" "}
            <strong className="font-semibold text-paper">
              two founders who have already built what you are building.
            </strong>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
