"use client";

import { Phone } from "@/components/franchise/phone";
import { useFranchise } from "@/components/franchise/franchise-context";
import { cn } from "@/lib/cn";

/**
 * The six illustrated screens of the "Every feature" explorer, drawn in
 * code. Sample data only (Sophie, Coach Dean, Leeds / York / Hull); every
 * screen repaints with the visitor's brand colour, tint, name and initial.
 * Decorative: the stage's heading and steps carry the meaning, so the
 * explorer marks the whole set aria-hidden.
 */

const FADE = "transition-[background-color,box-shadow,color] duration-300";
const LBL = "text-[10px] font-semibold uppercase tracking-[0.06em] text-muted";
const RING = "shadow-[inset_0_0_0_1px_var(--color-line)]";

/* ── shared bits ─────────────────────────────────────────────────── */

/** A browser-style window with the brand's sample address. */
function Win({
  path,
  children,
  className,
}: {
  path: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { brand } = useFranchise();
  return (
    <div
      className={cn(
        "w-full max-w-[440px] overflow-hidden rounded-[16px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line),0_30px_60px_-34px_rgba(21,20,14,0.45)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-paper px-3 py-2">
        <span className="flex gap-1">
          <i className="block size-2 rounded-full bg-line" />
          <i className="block size-2 rounded-full bg-line" />
          <i className="block size-2 rounded-full bg-line" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center text-[10px] text-muted">
          {path.replace("{slug}", brand.slug)}
        </span>
      </div>
      {children}
    </div>
  );
}

function Tick({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 18 18"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <circle cx="9" cy="9" r="9" fill="var(--color-ink)" />
      <path
        d="M5 9.2l2.6 2.6L13 6.6"
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Bar({ pct, className }: { pct: number; className?: string }) {
  const { brand } = useFranchise();
  return (
    <span
      className={cn("block h-1 overflow-hidden rounded-[3px] bg-line", className)}
    >
      <span
        className={cn("block h-full rounded-[3px]", FADE)}
        style={{ width: `${pct}%`, background: brand.color }}
      />
    </span>
  );
}

function BrandPill({ children }: { children: React.ReactNode }) {
  const { brand } = useFranchise();
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full px-2 py-[3px] text-[10px] font-bold text-white",
        FADE,
      )}
      style={{ background: brand.color }}
    >
      {children}
    </span>
  );
}

function Logo({ size = 32 }: { size?: number }) {
  const { brand } = useFranchise();
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[10px] font-extrabold text-white",
        FADE,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.45,
        background: brand.color,
      }}
    >
      {brand.initial}
    </span>
  );
}

/* ── 1 · HQ set-up ───────────────────────────────────────────────── */

const STUDIOS = ["Leeds", "York", "Hull"] as const;
const PLANS = [
  ["Unlimited", "£60", "a month"],
  ["10-class pack", "£95", "once"],
  ["Intro 2 weeks", "£25", "once"],
] as const;

function SetupScreen() {
  const { brand } = useFranchise();
  return (
    <Win path="hq.{slug}.com/set-up">
      <div className="flex flex-col gap-3 p-3.5">
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <div className="min-w-0 flex-1">
            <div className={LBL}>App name</div>
            <div className="truncate text-[13px] font-bold">{brand.name}</div>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={cn("size-4 rounded-full", FADE)}
              style={{ background: brand.color }}
            />
            <span className="font-mono text-[10px] text-muted uppercase">
              {brand.color}
            </span>
          </div>
        </div>

        <div className={cn("rounded-[12px] p-2.5", RING)}>
          <div className={cn(LBL, "mb-1.5")}>Studios</div>
          {STUDIOS.map((s, i) => (
            <div
              key={s}
              className={cn(
                "flex items-center gap-2 py-1.5 text-xs",
                i > 0 && "border-t border-line",
              )}
            >
              <strong className="flex-1">{s}</strong>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted">
                <Tick />
                Stripe connected
              </span>
            </div>
          ))}
        </div>

        <div className={cn("rounded-[12px] p-2.5", RING)}>
          <div className={cn(LBL, "mb-1.5")}>Plans and prices</div>
          {PLANS.map(([name, price, per], i) => (
            <div
              key={name}
              className={cn(
                "flex items-center gap-2 py-1.5 text-xs",
                i > 0 && "border-t border-line",
              )}
            >
              <strong className="flex-1">{name}</strong>
              <span className="text-[10px] text-muted">{per}</span>
              <span
                className={cn("rounded-full px-2 py-0.5 text-[11px] font-extrabold", FADE)}
                style={{ background: brand.tint }}
              >
                {price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Win>
  );
}

/* ── 2 · studio timetable and coach rota ─────────────────────────── */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
/** [day index, row, class, filled %] */
const CLASSES: readonly (readonly [number, number, string, number])[] = [
  [0, 0, "Lift", 85],
  [1, 0, "HIIT", 60],
  [2, 0, "Lift", 100],
  [3, 0, "Core", 45],
  [4, 0, "HIIT", 70],
  [0, 1, "Yoga", 40],
  [2, 1, "Spin", 75],
  [3, 1, "Yoga", 90],
  [1, 2, "Lift", 55],
  [3, 2, "HIIT", 80],
];
const TIMES = ["07:00", "12:15", "18:00"] as const;

function TimetableScreen() {
  const { brand } = useFranchise();
  const cover: [number, number] = [4, 2];
  return (
    <Win path="{slug}.com/leeds/timetable">
      <div className="flex flex-col gap-3 p-3.5">
        <div className="flex items-center justify-between">
          <strong className="text-[13px]">Leeds · this week</strong>
          <span
            className={cn("rounded-full px-2 py-[3px] text-[10px] font-bold", FADE)}
            style={{ background: brand.tint }}
          >
            10 classes
          </span>
        </div>

        <div className="grid grid-cols-[28px_repeat(5,minmax(0,1fr))] gap-1">
          <span />
          {DAYS.map((d) => (
            <span key={d} className="pb-0.5 text-center text-[10px] font-semibold text-muted">
              {d}
            </span>
          ))}
          {TIMES.map((t, r) => (
            <div key={t} className="contents">
              <span className="pt-1.5 text-[9px] text-muted">{t}</span>
              {DAYS.map((d, c) => {
                const cls = CLASSES.find(([dc, rr]) => dc === c && rr === r);
                const needsCover = cover[0] === c && cover[1] === r;
                if (needsCover) {
                  return (
                    <span
                      key={d}
                      className="flex min-h-[38px] items-center justify-center rounded-[8px] border border-dashed border-ink text-center text-[8.5px] leading-tight font-bold"
                    >
                      Cover needed
                    </span>
                  );
                }
                if (!cls) return <span key={d} className="rounded-[8px] bg-paper" />;
                return (
                  <span
                    key={d}
                    className={cn("flex min-h-[38px] flex-col justify-between rounded-[8px] p-1.5", FADE)}
                    style={{ background: brand.tint }}
                  >
                    <span className="text-[10px] font-bold">{cls[2]}</span>
                    <Bar pct={cls[3]} />
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        <div className={cn("rounded-[12px] p-2.5", RING)}>
          <div className={cn(LBL, "mb-1.5")}>Coach rota</div>
          {[
            ["Coach Dean", "D", "Mon, Wed, Thu"],
            ["Coach Amy", "A", "Tue, Thu, Fri"],
          ].map(([name, i, days], n) => (
            <div
              key={name}
              className={cn("flex items-center gap-2 py-1.5 text-xs", n > 0 && "border-t border-line")}
            >
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-line text-[10px] font-bold">
                {i}
              </span>
              <strong className="flex-1">{name}</strong>
              <span className="text-[10px] text-muted">{days}</span>
            </div>
          ))}
        </div>
      </div>
    </Win>
  );
}

/* ── 3 · member sign-up and checkout ─────────────────────────────── */

function PhoneHeader({ title, sub }: { title: string; sub: string }) {
  const { brand } = useFranchise();
  return (
    <div
      className={cn("px-4 pt-11 pb-4 text-white", FADE)}
      style={{ background: brand.color }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-[10px] bg-white text-sm font-extrabold",
            FADE,
          )}
          style={{ color: brand.color }}
        >
          {brand.initial}
        </span>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-extrabold">{title}</div>
          <div className="text-[10px] opacity-85">{sub}</div>
        </div>
      </div>
    </div>
  );
}

function JoinScreen() {
  const { brand } = useFranchise();
  return (
    <Phone size="back" className="max-[360px]:scale-[0.88]">
      <PhoneHeader title={brand.name} sub="Join Leeds" />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className={LBL}>Pick a plan</div>
        {PLANS.map(([name, price, per], i) => (
          <div
            key={name}
            className={cn("flex items-center gap-2.5 rounded-[12px] bg-surface p-2.5", FADE)}
            style={{
              boxShadow:
                i === 0
                  ? `inset 0 0 0 1.5px ${brand.color}`
                  : "inset 0 0 0 1px var(--color-line)",
            }}
          >
            <span
              className="inline-flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px]"
              style={{ borderColor: i === 0 ? brand.color : "var(--color-line-strong)" }}
            >
              {i === 0 ? (
                <span className="size-2 rounded-full" style={{ background: brand.color }} />
              ) : null}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold">{name}</div>
              <div className="text-[10px] text-muted">{per}</div>
            </div>
            <strong className="text-[13px]">{price}</strong>
          </div>
        ))}
        <div className="mt-auto flex flex-col gap-2 pb-1">
          <div className="flex items-center justify-between px-0.5 text-[11px] text-muted">
            <span>Today</span>
            <strong className="text-ink">£60.00</strong>
          </div>
          <div className="flex h-10 items-center justify-center rounded-[12px] bg-ink text-[13px] font-bold text-paper">
            Apple Pay
          </div>
          <div className="flex h-9 items-center justify-center rounded-[12px] bg-surface text-xs font-bold shadow-[inset_0_0_0_1px_var(--color-line-strong)]">
            Pay by card
          </div>
        </div>
      </div>
    </Phone>
  );
}

/* ── 4 · booking and check-in ────────────────────────────────────── */

function BookingScreen() {
  const { brand } = useFranchise();
  return (
    <Phone size="back" className="max-[360px]:scale-[0.88]">
      <div className="flex items-center justify-between bg-surface px-4 pt-11 pb-2.5">
        <strong className="text-[15px]">Your week</strong>
        <span
          className={cn("rounded-full px-2 py-[3px] text-[10px] font-bold", FADE)}
          style={{ background: brand.tint }}
        >
          Leeds
        </span>
      </div>
      <div className="grid grid-cols-5 gap-1 bg-surface px-3 pb-3">
        {[
          ["MON", "26"],
          ["TUE", "27"],
          ["WED", "28"],
          ["THU", "29"],
          ["FRI", "30"],
        ].map(([d, n], i) => (
          <div
            key={d}
            className={cn("rounded-[9px] py-1 text-center", FADE, i === 0 ? "text-white" : "text-ink")}
            style={i === 0 ? { background: brand.color } : undefined}
          >
            <div className="text-[8.5px] opacity-80">{d}</div>
            <div className="text-xs font-extrabold">{n}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 p-3">
        <div
          className={cn("flex items-center gap-2.5 rounded-[12px] bg-surface p-2.5", FADE)}
          style={{ boxShadow: `inset 0 0 0 1.5px ${brand.color}` }}
        >
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-line text-[10px] font-bold">
            D
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold">07:00 Lift</div>
            <Bar pct={85} className="my-1" />
            <div className="text-[10px] text-muted">Coach Dean · 1 spot left</div>
          </div>
          <BrandPill>Booked</BrandPill>
        </div>
        <div className="flex items-center gap-2.5 rounded-[12px] bg-surface p-2.5 shadow-[inset_0_0_0_1px_var(--color-line)]">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-line text-[10px] font-bold">
            A
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold">12:15 Yoga</div>
            <div className="text-[10px] text-muted">Coach Amy · 6 spots</div>
          </div>
          <span className="rounded-full px-2 py-[3px] text-[10px] font-bold shadow-[inset_0_0_0_1px_var(--color-ink)]">
            Book
          </span>
        </div>
      </div>
      <div className="mt-auto rounded-t-[22px] bg-surface px-4 pt-4 pb-5 text-center shadow-[0_-14px_30px_-18px_rgba(21,20,14,0.35)]">
        <span
          className={cn(
            "mx-auto flex size-11 items-center justify-center rounded-full text-white",
            FADE,
          )}
          style={{ background: brand.color }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            <path
              d="M5.5 11.5l3.6 3.6 7.4-7.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="mt-2 text-sm font-extrabold">Checked in</div>
        <div className="mt-0.5 text-[10px] text-muted">
          Welcome back, Sophie. 4 week streak.
        </div>
      </div>
    </Phone>
  );
}

/* ── 5 · onboarding messages and at-risk flags ───────────────────── */

const MESSAGES = [
  ["Day 1", "Welcome", "Hi Sophie, welcome in. Your first class is booked."],
  ["Day 14", "Nudge", "Two classes this week keeps your streak going."],
  ["Day 30", "Coach check-in", "Coach Dean: how is it going? Anything we can change?"],
] as const;

function StayScreen() {
  const { brand } = useFranchise();
  return (
    <Win path="leeds.{slug}.com/members">
      <div className="flex flex-col gap-3 p-3.5">
        <div className={LBL}>Onboarding messages</div>
        <ol className="relative m-0 flex list-none flex-col gap-2.5 p-0">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[13px] w-px bg-line-strong"
          />
          {MESSAGES.map(([day, kind, text]) => (
            <li key={day} className="relative flex items-start gap-2.5">
              <span
                className={cn(
                  "z-10 inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[8.5px] font-extrabold text-white",
                  FADE,
                )}
                style={{ background: brand.color }}
              >
                {day.replace("Day ", "D")}
              </span>
              <div
                className={cn("min-w-0 flex-1 rounded-[10px] px-2.5 py-2", FADE)}
                style={{ background: brand.tint }}
              >
                <div className="text-[10px] font-bold">{kind}</div>
                <div className="mt-0.5 text-[10.5px] leading-snug">{text}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-[12px] bg-ink p-3 text-paper">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-extrabold text-ink">
              At risk
            </span>
            <span className="text-[10px] opacity-70">Flagged this morning</span>
          </div>
          <div className="mt-2 flex items-center gap-2.5">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-paper text-[10px] font-bold text-ink">
              T
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold">Tom, Unlimited</div>
              <div className="text-[10px] opacity-70">No visit in 10 days</div>
            </div>
            <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] font-bold text-ink">
              Message
            </span>
          </div>
        </div>
      </div>
    </Win>
  );
}

/* ── 6 · HQ dashboard ────────────────────────────────────────────── */

const TILES = [
  ["Revenue a month", "£48,200"],
  ["Members", "1,240"],
  ["Kept 90 days", "91%"],
] as const;
const NETWORK = [
  ["Leeds", "520", "£19,800", 94],
  ["York", "410", "£15,600", 90],
  ["Hull", "310", "£12,800", 82],
] as const;

function DashboardScreen() {
  const { brand } = useFranchise();
  return (
    <Win path="hq.{slug}.com/network">
      <div className="flex flex-col gap-3 bg-paper p-3.5">
        <div className="grid grid-cols-3 gap-2">
          {TILES.map(([label, value], i) => (
            <div
              key={label}
              className={cn(
                "rounded-[12px] p-2.5",
                i === 0 ? "bg-lime" : "bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]",
              )}
            >
              <div className={cn("text-[9px] leading-tight", i === 0 ? "text-ink" : "text-muted")}>
                {label}
              </div>
              <div className="mt-1 text-[15px] leading-none font-extrabold tracking-[-0.03em]">
                {value}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[12px] bg-surface px-3 py-1 shadow-[inset_0_0_0_1px_var(--color-line)]">
          <div className="grid grid-cols-[1fr_0.8fr_1fr_1.3fr] gap-2 border-b border-line py-2 text-[10px] font-semibold text-muted">
            <span>Studio</span>
            <span>Members</span>
            <span>Revenue</span>
            <span>Kept 90 days</span>
          </div>
          {NETWORK.map(([name, members, rev, kept], i) => (
            <div
              key={name}
              className={cn(
                "grid grid-cols-[1fr_0.8fr_1fr_1.3fr] items-center gap-2 py-2.5 text-xs",
                i > 0 && "border-t border-line",
              )}
            >
              <strong className="flex items-center gap-1.5">
                <span
                  className={cn("size-2 rounded-full", FADE)}
                  style={{ background: brand.color }}
                />
                {name}
              </strong>
              <span>{members}</span>
              <span>{rev}</span>
              <span className="flex items-center gap-1.5">
                <Bar pct={kept} className="flex-1" />
                <span className="text-[10px]">{kept}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Win>
  );
}

/** Screen for stage `i` (0-based), in the order of FLOW. */
export const FLOW_SCREENS = [
  SetupScreen,
  TimetableScreen,
  JoinScreen,
  BookingScreen,
  StayScreen,
  DashboardScreen,
] as const;
