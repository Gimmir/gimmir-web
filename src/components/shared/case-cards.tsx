import Image from "next/image";
import Link from "next/link";

import { CountUp } from "@/components/ui/count-up";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { CASES, type CaseStudy } from "@/lib/cases";

export function CaseCard({
  data,
  priority,
}: {
  data: CaseStudy;
  priority?: boolean;
}) {
  const dark = data.dark;
  return (
    <Reveal className="h-full">
      <Link
        href={`/work/${data.slug}`}
        aria-label={`${data.name} case study`}
        className={cn(
          "group flex h-full flex-col rounded-[22px] p-7 transition-shadow duration-300 ease-out sm:p-9",
          dark
            ? "bg-ink text-paper hover:shadow-[0_28px_60px_-30px_rgba(21,20,14,0.6)]"
            : "border border-line bg-surface hover:shadow-[0_28px_60px_-34px_rgba(21,20,14,0.35)]",
        )}
      >
        <div className="mb-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <span className="flex items-center gap-3.5">
            <Image
              src={data.logo}
              alt={`${data.name} logo`}
              width={48}
              height={48}
              priority={priority}
              className={cn(
                "size-12 rounded-xl object-cover",
                dark && "border border-paper/15",
              )}
            />
            <span className="text-[26px] font-extrabold tracking-tight sm:text-[28px]">
              {data.name}
            </span>
          </span>
          <span
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider",
              dark ? "border-lime/40 text-lime" : "border-ink text-ink",
            )}
          >
            {data.tag}
          </span>
        </div>

        <p
          className={cn(
            "mb-8 flex-1 text-lg leading-relaxed",
            dark ? "text-[#c9c6bc]" : "text-muted",
          )}
        >
          {data.summary}
        </p>

        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-6 sm:gap-x-10">
          <div className="flex flex-wrap gap-x-6 gap-y-6 sm:gap-x-10">
            {data.stats.map((s, i) => (
              <div key={i} className="min-w-0">
                <div
                  className={cn(
                    "text-[clamp(2.4rem,4.4vw,3.4rem)] font-extrabold leading-none tracking-tight",
                    s.lime && "text-lime",
                  )}
                >
                  {typeof s.value === "number" ? (
                    <CountUp value={s.value} suffix={s.suffix} />
                  ) : (
                    s.text
                  )}
                </div>
                <div
                  className={cn(
                    "mt-2 max-w-[15ch] text-pretty text-sm sm:max-w-[18ch]",
                    dark ? "text-[#8b887e]" : "text-faint",
                  )}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
              dark
                ? "bg-paper/10 text-paper group-hover:bg-lime group-hover:text-ink"
                : "bg-paper-2 text-ink group-hover:bg-ink group-hover:text-paper",
            )}
            aria-hidden
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function CaseGrid({ priority }: { priority?: boolean }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {CASES.map((c, i) => (
        <CaseCard key={c.slug} data={c} priority={priority && i === 0} />
      ))}
    </div>
  );
}
