import Image from "next/image";

import { Container } from "@/components/ui/container";
import { LinkedIn } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { FOUNDER_LINKEDIN, FOUNDER_PHOTOS } from "@/lib/founders";

const FOUNDERS = [
  {
    name: "Nazar Moroz",
    role: "Founder",
    photo: FOUNDER_PHOTOS.nazar,
    linkedin: FOUNDER_LINKEDIN.nazar,
    bio: "Leads product and business. Has built and shipped fitness products end to end, as an owner carrying the same risk you do.",
  },
  {
    name: "Oleh Palazhii",
    role: "CTO",
    photo: FOUNDER_PHOTOS.oleh,
    linkedin: FOUNDER_LINKEDIN.oleh,
    bio: "Led the architecture of both the UN1T platform and Jimmy Coach. The person who designs how your product holds up as it scales.",
  },
];

export function FoundersSection() {
  return (
    <section id="founders" className="scroll-mt-24 bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionHeader
            index="04"
            onDark
            title={
              <>
                You work with the people{" "}
                <span className="font-serif font-normal italic text-lime">
                  who built it.
                </span>
              </>
            }
            intro="Most agencies put a senior on the sales call and juniors on your project. With Gimmir, the founders are in the room from the first call to delivery."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 80} className="h-full">
              <article className="flex h-full flex-col rounded-[22px] border border-paper/15 p-7 sm:p-8">
                <div className="relative mb-7 aspect-[4/3] overflow-hidden rounded-2xl bg-[#211f17]">
                  <Image
                    src={f.photo}
                    alt={f.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-2xl font-extrabold tracking-tight sm:text-[30px]">
                      {f.name}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-lime">
                      {f.role}
                    </span>
                  </div>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${f.name} on LinkedIn`}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-colors hover:border-lime hover:text-lime"
                  >
                    <LinkedIn className="size-[18px]" />
                  </a>
                </div>
                <p className="leading-relaxed text-[#c9c6bc]">{f.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-[#8b887e]">
            Two founders who have already built what you are trying to build —
            plus the team behind them.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
