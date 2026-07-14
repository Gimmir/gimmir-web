import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const DELIVERABLES = [
  {
    title: "Scale assessment",
    desc: "What in your product holds up, and what will break as you grow, in plain language.",
  },
  {
    title: "Risk map",
    desc: "The specific issues that will cost you, ranked by how much damage they do and how soon.",
  },
  {
    title: "Priority build plan",
    desc: "What to build and fix, in what order, with rough effort for each.",
  },
  {
    title: "Cost of doing nothing",
    desc: "What each gap is likely to cost in money, members, or a stalled round.",
  },
  {
    title: "Recommended path",
    desc: "Exactly how we would execute it, if you choose to build with us.",
  },
];

export function DeliverablesSection() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="03"
            titleMax="max-w-[34ch]"
            title={
              <>
                You walk away with a{" "}
                <span className="font-serif font-normal italic">roadmap</span>,
                whether or not you build with us.
              </>
            }
            intro="A clear document plus a live walkthrough session."
          />
        </Reveal>

        <Reveal>
          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface">
            {DELIVERABLES.map((d, i) => (
              <div
                key={d.title}
                className="group grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1.5 border-t border-line px-6 py-5 transition-colors duration-200 first:border-t-0 hover:bg-paper-2/60 md:grid-cols-[auto_minmax(0,0.8fr)_minmax(0,1.5fr)] md:gap-x-8 md:px-8 md:py-6"
              >
                <span className="inline-flex items-center justify-center rounded-md bg-lime px-2.5 py-1 text-xs font-extrabold tabular-nums text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold tracking-tight md:text-xl">
                  {d.title}
                </h3>
                <p className="col-span-2 text-[15px] leading-relaxed text-muted md:col-span-1 md:text-base">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-muted">
            This is the same thinking that helped UN1T move off a third-party
            platform onto their own, and save{" "}
            <strong className="font-semibold text-ink">
              tens of thousands of dollars a month
            </strong>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
