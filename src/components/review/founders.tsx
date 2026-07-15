import Image from "next/image";

import { Container } from "@/components/ui/container";
import { LinkedIn } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { urlFor } from "@/sanity/lib/image";
import type { REVIEW_QUERY_RESULT } from "@/sanity/types";

export function FoundersSection({
  data,
}: {
  data: NonNullable<REVIEW_QUERY_RESULT>;
}) {
  const founders = data.founders ?? [];

  return (
    <section className="bg-ink text-paper">
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
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal key={f._key} delay={i * 70} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-paper/15 p-7 md:p-8">
                {f.founder?.photo ? (
                  <Image
                    src={urlFor(f.founder.photo)
                      .width(112)
                      .height(112)
                      .fit("crop")
                      .url()}
                    alt={f.founder.name ?? ""}
                    width={56}
                    height={56}
                    className="size-14 rounded-full object-cover object-top"
                  />
                ) : null}
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-2xl font-bold tracking-tight">
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
                <p className="mt-3 leading-relaxed text-[#c9c6bc]">{f.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-[60ch] text-lg leading-relaxed text-[#8b887e]">
            {data.foundersFootnote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
