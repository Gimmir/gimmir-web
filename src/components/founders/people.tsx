import Image from "next/image";

import { Container } from "@/components/ui/container";
import { LinkedIn } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { urlFor } from "@/sanity/lib/image";
import type { FOUNDERS_PAGE_QUERY_RESULT } from "@/sanity/types";

export function PeopleSection({
  data,
}: {
  data: NonNullable<FOUNDERS_PAGE_QUERY_RESULT>;
}) {
  const founders = data.founders ?? [];

  return (
    <section
      id="founders"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeader
            index="03"
            title={
              <>
                {data.peopleHeading}
                {data.peopleAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.peopleAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal key={f._key} delay={i * 80} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-8 md:p-9">
                {f.founder?.photo ? (
                  <Image
                    src={urlFor(f.founder.photo).width(160).height(160).fit("crop").url()}
                    alt={f.founder.name ?? ""}
                    width={80}
                    height={80}
                    placeholder={f.founder.photo.lqip ? "blur" : undefined}
                    blurDataURL={f.founder.photo.lqip ?? undefined}
                    className="size-20 rounded-full object-cover object-top"
                  />
                ) : null}
                <div className="mt-6 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-2xl font-bold tracking-tight md:text-[1.7rem]">
                      {f.founder?.name}
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      {f.role}
                    </span>
                  </div>
                  <a
                    href={f.founder?.linkedinUrl ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${f.founder?.name} on LinkedIn`}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    <LinkedIn className="size-[18px]" />
                  </a>
                </div>
                <p className="mt-4 leading-relaxed text-muted">{f.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-muted md:text-xl">
            {data.peopleFootnote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
