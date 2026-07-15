import Image from "next/image";

import { Container } from "@/components/ui/container";
import { LinkedIn } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { urlFor } from "@/sanity/lib/image";
import type { HOME_QUERY_RESULT } from "@/sanity/types";

export function FoundersSection({
  data,
}: {
  data: NonNullable<HOME_QUERY_RESULT>;
}) {
  return (
    <section id="founders" className="scroll-mt-24 bg-ink text-paper">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionHeader
            index="04"
            onDark
            title={
              <>
                {data.foundersHeading}
                {data.foundersAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic text-lime">
                      {data.foundersAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
            intro={data.foundersIntro}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {(data.founders ?? []).map((f, i) => (
            <Reveal key={f._key} delay={i * 80} className="h-full">
              <article className="flex h-full flex-col rounded-[22px] border border-paper/15 p-7 sm:p-8">
                <div className="relative mb-7 aspect-[4/3] overflow-hidden rounded-2xl bg-[#211f17]">
                  {f.founder?.photo ? (
                    <Image
                      src={urlFor(f.founder.photo).width(800).height(600).fit("crop").url()}
                      alt={f.founder.name ?? ""}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  ) : null}
                </div>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-2xl font-extrabold tracking-tight sm:text-[30px]">
                      {f.founder?.name}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-lime">
                      {f.role}
                    </span>
                  </div>
                  <a
                    href={f.founder?.linkedinUrl ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${f.founder?.name} on LinkedIn`}
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
            {data.foundersFootnote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
