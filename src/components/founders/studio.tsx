import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Pencil, Plus } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { urlFor } from "@/sanity/lib/image";
import type { FOUNDERS_PAGE_QUERY_RESULT } from "@/sanity/types";

function TeamAvatar() {
  return (
    <span className="flex size-10 items-center justify-center rounded-full border border-line bg-paper-2 ring-2 ring-surface">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-5">
        <circle
          cx="12"
          cy="9"
          r="3.2"
          className="stroke-ink/35"
          strokeWidth="1.6"
        />
        <path
          d="M5.5 19a6.5 6.5 0 0 1 13 0"
          className="stroke-ink/35"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}

export function StudioSection({
  data,
}: {
  data: NonNullable<FOUNDERS_PAGE_QUERY_RESULT>;
}) {
  const founders = data.founders ?? [];

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16">
          <Reveal>
            <SectionHeader
              index="04"
              titleMax="max-w-[18ch]"
              title={
                <>
                  {data.studioHeading}
                  {data.studioAccent ? (
                    <>
                      {" "}
                      <span className="font-serif font-normal italic">
                        {data.studioAccent}
                      </span>
                    </>
                  ) : null}
                </>
              }
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-muted md:text-xl">
                {data.studioBody}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-8">
                {/* the team */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
                  <div className="flex -space-x-3">
                    {founders.map((f) =>
                      f.founder?.photo ? (
                        <Image
                          key={f._key}
                          src={urlFor(f.founder.photo).width(80).height(80).fit("crop").url()}
                          alt={f.founder.name ?? ""}
                          width={40}
                          height={40}
                          placeholder={f.founder.photo.lqip ? "blur" : undefined}
                          blurDataURL={f.founder.photo.lqip ?? undefined}
                          className="size-10 rounded-full object-cover object-top ring-2 ring-surface"
                        />
                      ) : null,
                    )}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <TeamAvatar key={i} />
                    ))}
                    <span className="flex size-10 items-center justify-center rounded-full border border-dashed border-ink/30 text-ink/40 ring-2 ring-surface">
                      <Plus className="size-4" />
                    </span>
                  </div>
                  <p className="text-sm leading-snug text-muted">
                    {data.studioTeamCaption}
                  </p>
                </div>

                {/* team size — the founders confirm the number */}
                <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:gap-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                    <Pencil className="size-[18px]" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-ink/70">
                        Team size
                      </span>
                      <span className="rounded-full border border-ink/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">
                        Confirm
                      </span>
                    </div>
                    <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-muted">
                      {data.studioTeamSizeBody}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
