import Image from "next/image";

import { Container } from "@/components/ui/container";
import { LinkedIn } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { FOUNDER_LINKEDIN, FOUNDER_PHOTOS } from "@/lib/founders";

const FOUNDERS = [
  {
    photo: FOUNDER_PHOTOS.nazar,
    linkedin: FOUNDER_LINKEDIN.nazar,
    name: "Nazar Moroz",
    role: "Founder — product & business",
    bio: "Product and business. Has built and shipped fitness products end to end, as an owner.",
  },
  {
    photo: FOUNDER_PHOTOS.oleh,
    linkedin: FOUNDER_LINKEDIN.oleh,
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
                <Image
                  src={f.photo}
                  alt={f.name}
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover object-top"
                />
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-2xl font-bold tracking-tight">
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
