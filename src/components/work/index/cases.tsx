import Image from "next/image";
import Link from "next/link";

import { OutlineStat } from "@/components/blocks/outline-stat";
import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/icons";
import { ProductLinks } from "@/components/work/parts";
import { home } from "@/content/home";
import { jimmy } from "@/content/jimmy";
import { cn } from "@/lib/cn";

/* /work ②, the two public cases as full-width, full-height screens (doc
   09 "full-bleed cases"): UN1T on ink, Jimmy Coach on paper. UN1T shows
   its drawn "12" until Rob clears product screens; Jimmy shows its own
   app, which is ours to show. */

// Jimmy Coach store screens (our own product)
const JIMMY_SCREENS = [
  {
    src: "/screens-all/frame-5.jpg",
    alt: "Jimmy Coach: a personal program with weekly progress and upcoming workouts",
  },
  {
    src: "/screens-all/frame-1.jpg",
    alt: "Jimmy Coach: the member home screen with today’s workout, steps and weight progress",
  },
  {
    src: "/screens-all/frame-4.jpg",
    alt: "Jimmy Coach: direct chats between a client and their coach",
  },
];

function Tile({
  id,
  dark,
  logo,
  name,
  index,
  title,
  meta,
  link,
  links,
  children,
}: {
  id: string;
  dark: boolean;
  logo: string;
  name: string;
  index: string;
  title: readonly string[];
  meta: readonly string[];
  link: { label: string; href: string };
  /** The live product, when there is one to visit. */
  links?: React.ComponentProps<typeof ProductLinks>["links"];
  children: React.ReactNode;
}) {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
  // each line's words keep rising in one run across the lines
  const starts = title.map((_, n) =>
    title.slice(0, n).reduce((sum, t) => sum + wordCount(t), 0),
  );
  const after = title.reduce((n, t) => n + wordCount(t), 0) * 40 + 400;

  return (
    <Stage
      as="section"
      id={id}
      data-tone={dark ? "ink" : "paper"}
      className={cn(
        "relative scroll-mt-20 overflow-hidden",
        dark ? "bg-ink text-paper" : "border-t border-line",
      )}
    >
      <Container className="grid gap-14 py-20 md:py-28 lg:min-h-[92svh] lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <p className="fade flex items-center gap-3 text-[15px] font-medium">
            <Image
              src={logo}
              alt=""
              width={36}
              height={36}
              className={cn(
                "size-9 rounded-[10px] object-cover",
                dark && "ring-1 ring-paper/15",
              )}
            />
            <span className="font-semibold">{name}</span>
            <span className={dark ? "text-paper/50" : "text-faint"}>
              {index}
            </span>
          </p>
          <h2 className="display mt-8 text-[length:var(--text-title)] leading-[1.02]">
            {title.map((line, n) => (
              <span key={n} className="block">
                <RiseText text={line} start={starts[n]} />
              </span>
            ))}
          </h2>
          <ul className="fade mt-8 flex flex-wrap gap-2" style={d(after)}>
            {meta.map((m) => (
              <li
                key={m}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[14px]",
                  dark
                    ? "border-line-dark text-paper/75"
                    : "border-line bg-surface/70 text-ink/80",
                )}
              >
                {m}
              </li>
            ))}
          </ul>
          <Link
            href={link.href}
            className={cn(
              "fade group mt-10 inline-flex items-center gap-3 text-lg font-semibold",
            )}
            style={d(after + 120)}
          >
            <span
              className={cn(
                "border-b pb-1 transition-colors",
                dark
                  ? "border-paper/40 group-hover:border-lime group-hover:text-lime"
                  : "link-mark border-ink/30 group-hover:border-transparent",
              )}
            >
              {link.label}
            </span>
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          {links && (
            <ProductLinks
              links={links}
              className="fade mt-6"
              style={d(after + 200)}
            />
          )}
        </div>
        <div className="lg:col-span-6">{children}</div>
      </Container>
    </Stage>
  );
}

export function WorkCases() {
  const u = home.un1t;
  const j = home.jimmy;

  return (
    <>
      <Tile
        id="un1t"
        dark
        logo="/design/un1t-logo.png"
        name="UN1T"
        index="Case 01"
        title={[u.title]}
        meta={u.meta}
        link={u.link}
      >
        <OutlineStat
          value={u.stat.value}
          label={u.stat.label}
          delay={300}
          className="mx-auto max-w-[600px] lg:mr-0"
        />
      </Tile>

      <Tile
        id="jimmy-coach"
        dark={false}
        logo="/design/jimmy-coach-logo.png"
        name={j.name}
        index="Case 02"
        title={j.title}
        meta={j.meta}
        link={j.link}
        links={jimmy.links}
      >
        <figure
          className="fade"
          style={{ "--d": "300ms" } as React.CSSProperties}
        >
          <div className="relative mx-auto flex max-w-[640px] items-center justify-center">
            {JIMMY_SCREENS.map((s, n) => (
              <div
                key={s.src}
                className={cn(
                  "relative aspect-[1242/2688] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(21,20,14,0.45)] ring-1 ring-ink/10 md:rounded-[28px]",
                  n === 1 ? "z-10 w-[38%]" : "w-[31%] opacity-95",
                  n === 0 && "-mr-[6%] -rotate-[5deg] translate-y-[6%]",
                  n === 2 && "-ml-[6%] rotate-[5deg] translate-y-[6%]",
                )}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 260px, 38vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <figcaption className="mt-10 flex items-center justify-center gap-2.5 text-[15px] text-muted md:mt-14">
            <span className="size-2 rounded-full bg-lime ring-1 ring-ink/30" />
            {j.stat.value} {j.stat.label}
          </figcaption>
        </figure>
      </Tile>
    </>
  );
}
