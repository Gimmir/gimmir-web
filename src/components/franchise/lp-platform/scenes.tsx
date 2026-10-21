"use client";

import { Phone } from "@/components/franchise/phone";
import { useFranchise } from "@/components/franchise/franchise-context";

/**
 * The six scenes of the platform story, drawn in code on a 620×660 canvas
 * (the stage scales it to fit). Sample data only (Sophie, Coach Dean,
 * Leeds / York / Hull); every screen repaints with the visitor's brand
 * colour and name. Decorative: the steps' text carries the meaning.
 */

const FADE = "transition-[background-color,box-shadow,color] duration-300";
const CARD =
  "box-border rounded-[24px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line),0_20px_40px_-24px_rgba(21,20,14,0.4)]";
const LBL = "text-[11px] font-semibold uppercase tracking-[0.06em] text-muted";
const GREY = "text-[#6b6b6b]";

const gbp = (v: number) => `£${Math.round(v).toLocaleString("en-GB")}`;

function Avatar({ children }: { children: string }) {
  return (
    <span className="inline-flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[#E9E6DD] text-[11px] font-bold">
      {children}
    </span>
  );
}

function Cap({ pct, color }: { pct: number; color?: string }) {
  const { brand } = useFranchise();
  return (
    <span
      className={`block h-full rounded-[4px] ${FADE}`}
      style={{ width: `${pct}%`, background: color ?? brand.color }}
    />
  );
}

function Live() {
  return (
    <span aria-hidden className="inline-block size-2 shrink-0 rounded-full bg-[#3BB273] motion-safe:animate-pulse" />
  );
}

function BrandPill({ children, size = "sm" }: { children: React.ReactNode; size?: "xs" | "sm" | "md" }) {
  const { brand } = useFranchise();
  const sz = size === "md" ? "px-3.5 py-[7px] text-xs" : "px-[11px] py-1.5 text-[11px]";
  return (
    <span
      className={`whitespace-nowrap rounded-full font-bold text-white ${sz} ${FADE}`}
      style={{ background: brand.color }}
    >
      {children}
    </span>
  );
}

function TinyPill({ children }: { children: React.ReactNode }) {
  const { brand } = useFranchise();
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold text-ink ${FADE}`}
      style={{ background: brand.tint }}
    >
      {children}
    </span>
  );
}

function Tick() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="mt-px shrink-0">
      <circle cx="9" cy="9" r="9" fill="#C9F23D" />
      <path
        d="M5 9.2l2.6 2.6L13 6.6"
        fill="none"
        stroke="#15140E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── 1 · app booking ─────────────────────────────────────────────── */

export function AppScene() {
  const { brand } = useFranchise();
  const row = "flex items-center gap-2.5 rounded-[14px] bg-surface p-2.5";
  const bar = "mt-1.5 h-1 overflow-hidden rounded-[4px] bg-[#EDEBE4]";
  const sub = `mt-1 text-[10px] ${GREY}`;
  return (
    <>
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2">
        <Phone size="stage">
          <div className="flex items-center justify-between bg-white px-3.5 pt-11 pb-2.5">
            <strong className="text-[17px]">Book a class</strong>
            <TinyPill>Leeds</TinyPill>
          </div>
          <div className="grid grid-cols-5 gap-[5px] bg-white px-3 pt-1.5 pb-3">
            <div
              className={`rounded-[10px] py-1.5 text-center text-white ${FADE}`}
              style={{ background: brand.color }}
            >
              <div className="text-[9px] opacity-85">MON</div>
              <div className="text-[13px] font-extrabold">26</div>
            </div>
            {[
              ["TUE", "27"],
              ["WED", "28"],
              ["THU", "29"],
              ["FRI", "30"],
            ].map(([d, n]) => (
              <div key={d} className="py-1.5 text-center">
                <div className={`text-[9px] ${GREY}`}>{d}</div>
                <div className="text-[13px] font-extrabold">{n}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 p-3">
            <div
              className={`${row} ${FADE}`}
              style={{ boxShadow: `inset 0 0 0 1.5px ${brand.color}` }}
            >
              <Avatar>D</Avatar>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold">07:00 Strength</div>
                <div className={bar}>
                  <Cap pct={85} />
                </div>
                <div className={sub}>Coach Dean · 1 spot left</div>
              </div>
              <BrandPill>Booked</BrandPill>
            </div>
            <div className={row}>
              <Avatar>A</Avatar>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold">12:30 Conditioning</div>
                <div className={bar}>
                  <Cap pct={60} />
                </div>
                <div className={sub}>Coach Amy · 6 spots left</div>
              </div>
              <span className="rounded-full bg-paper-2 px-[11px] py-1.5 text-[11px] font-bold">Book</span>
            </div>
            <div className={row}>
              <Avatar>S</Avatar>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold">18:30 Mobility</div>
                <div className={bar}>
                  <Cap pct={100} color="#C9C5B9" />
                </div>
                <div className={sub}>Full · waitlist open</div>
              </div>
              <span className="rounded-full bg-paper-2 px-[11px] py-1.5 text-[11px] font-bold">Join</span>
            </div>
            <div className={`${row} justify-between`}>
              <div>
                <div className={`text-[10px] ${GREY}`}>10-class pack · any studio</div>
                <div className="text-[13px] font-bold">7 classes left</div>
              </div>
              <strong className="text-[13px]">£95</strong>
            </div>
          </div>
        </Phone>
      </div>
      <div className="absolute top-[12%] right-[4%] flex w-[230px] items-start gap-2.5 rounded-[18px] bg-white/[0.97] px-3.5 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]">
        <span
          className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg font-extrabold text-white ${FADE}`}
          style={{ background: brand.color }}
        >
          {brand.initial}
        </span>
        <div className="text-[12.5px] leading-[1.35]">
          <strong>Booked</strong>
          <div>Strength, Mon 07:00. See you there, Sophie.</div>
        </div>
      </div>
      <div className={`${CARD} absolute bottom-[14%] left-[4%] flex items-center gap-2.5 px-3.5 py-3`}>
        <Live />
        <div className="text-[12.5px] leading-[1.35]">
          <strong>Spot opened at 18:30</strong>
          <div className="text-muted">Next on the waitlist booked and told</div>
        </div>
      </div>
    </>
  );
}

/* ── 2 · payments split + tech fees ──────────────────────────────── */

export function PaymentsScene() {
  const { brand, model } = useFranchise();
  const fee = model.values.feeRate;
  const studioShare = `£${(60 * (1 - fee)).toFixed(2)}`;
  const hqShare = `£${(60 * fee).toFixed(2)}`;
  const month = new Date().toLocaleDateString("en-GB", { month: "long" });
  const badge = "rounded-full px-2.5 py-[3px] text-xs font-bold";
  const paid = `${badge} bg-[#E6F4EA] text-[#1F6B3A]`;
  return (
    <>
      <div className="absolute top-[10px] left-[12px]">
        <Phone size="stage" screen="#ffffff">
          <div className="px-4 pt-11 pb-2.5 text-center text-sm font-bold">Checkout</div>
          <div
            className={`mx-3.5 mt-1.5 rounded-[18px] p-4 text-white ${FADE}`}
            style={{ background: brand.color }}
          >
            <div className="text-[11px] font-semibold opacity-85">{brand.name}</div>
            <div className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">Unlimited</div>
            <div className="mt-0.5 text-[11px] opacity-85">Every class, every studio</div>
            <div className="mt-[18px] text-xl font-extrabold">
              £60 <span className="text-[11px] font-semibold opacity-85">a month</span>
            </div>
          </div>
          <div className="flex flex-col gap-[9px] px-4 py-3.5 text-xs">
            <div className="flex justify-between">
              <span className={GREY}>Unlimited membership</span>
              <strong>£60.00</strong>
            </div>
            <div className="flex justify-between border-t border-[#EEEEEE] pt-[9px]">
              <strong>Due today</strong>
              <strong>£60.00</strong>
            </div>
          </div>
          <div className="mx-3.5 mt-auto mb-3.5 flex flex-col gap-2">
            <div className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-black text-base font-semibold text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff" aria-hidden>
                <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.1.1 2.3-.6 3-1.5z" />
              </svg>
              Pay
            </div>
            <div className={`text-center text-[10.5px] ${GREY}`}>Paid to {brand.name} Leeds · Stripe</div>
          </div>
        </Phone>
      </div>
      <div className="absolute top-[100px] right-[14px] flex w-[262px] flex-col gap-2.5">
        <div className={`${CARD} p-4`}>
          <div className={LBL}>Sophie paid £60.00</div>
          <div className="mt-3 flex justify-between gap-3 text-sm">
            <span className="text-muted">To Leeds&apos; own Stripe</span>
            <strong>{studioShare}</strong>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 text-sm">
            <span className="text-muted">To {brand.hq}</span>
            <strong className="rounded-full bg-lime px-2.5 py-[3px]">{hqShare}</strong>
          </div>
        </div>
        <div className={`${CARD} px-4 py-1.5`}>
          <div className={`${LBL} pt-2.5`}>
            <span suppressHydrationWarning>{month}</span> tech fees
          </div>
          <div className="mt-1 flex items-center justify-between border-b border-[#F0EEE7] py-2.5 text-[13px]">
            <span>Leeds</span>
            <span className={paid}>Paid</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#F0EEE7] py-2.5 text-[13px]">
            <span>York</span>
            <span className={paid}>Paid</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-2.5 text-[13px]">
            <span>Hull</span>
            <span className={`${badge} bg-[#FDE9DA] text-[#8A3A12]`}>Overdue · locks in 3 days</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── 3 · 90-day journey, at risk, stay a year ────────────────────── */

export function ChurnScene() {
  const { brand, model } = useFranchise();
  const ret = Math.round(model.projection.stayYear * 100);
  const retNew = Math.round(model.projection.stayYearNew * 100);
  const dot = "relative z-[1] size-6 shrink-0 rounded-full";
  const done = `${dot} inline-flex items-center justify-center text-xs font-extrabold text-white ${FADE}`;
  const item = "relative flex items-start gap-3";
  const t = "text-xs font-bold";
  const s = `text-[10.5px] ${GREY}`;
  const barRow = "grid grid-cols-[74px_minmax(0,1fr)_34px] items-center gap-2 text-xs";
  const track = "block h-2 overflow-hidden rounded-md bg-[#F1EFE8]";
  const steps: Array<[string, string]> = [
    ["Day 1 · Welcome", "How to book, what to bring"],
    ["Week 1 · First 3 classes", "Booked with a nudge"],
    ["Day 30 · Coach check-in", "\"How's it going, Sophie?\""],
  ];
  return (
    <>
      <div className="absolute top-[10px] left-[12px]">
        <Phone size="stage">
          <div
            className={`px-4 pt-[42px] pb-4 text-white ${FADE}`}
            style={{ background: brand.color }}
          >
            <div className="text-[11px] opacity-85">{brand.name}</div>
            <div className="mt-0.5 text-[19px] font-extrabold tracking-[-0.02em]">Your first 90 days</div>
            <div className="mt-0.5 text-[11px] opacity-85">Day 34 · 9 classes</div>
          </div>
          <div className="relative flex flex-col gap-4 px-3.5 py-4">
            <span aria-hidden className="absolute top-7 bottom-7 left-[25px] w-0.5 bg-line" />
            <span
              aria-hidden
              className={`absolute top-7 left-[25px] h-[56%] w-0.5 ${FADE}`}
              style={{ background: brand.color }}
            />
            {steps.map(([a, b]) => (
              <div key={a} className={item}>
                <span className={done} style={{ background: brand.color }}>
                  ✓
                </span>
                <div>
                  <div className={t}>{a}</div>
                  <div className={s}>{b}</div>
                </div>
              </div>
            ))}
            <div className={item}>
              <span
                className={`${dot} box-border bg-white ${FADE}`}
                style={{ boxShadow: `inset 0 0 0 4px ${brand.color}, 0 0 0 4px ${brand.tint}` }}
              />
              <div>
                <div className={t}>Day 60 · Keep it going</div>
                <div className={s}>2 classes this week</div>
              </div>
            </div>
            <div className={item}>
              <span className={`${dot} bg-white shadow-[inset_0_0_0_2px_#D9D4C7]`} />
              <div>
                <div className={t}>Day 90 · Three months in</div>
                <div className={s}>Next goal and a friend pass</div>
              </div>
            </div>
          </div>
        </Phone>
      </div>
      <div className="absolute top-[110px] right-[14px] flex w-[262px] flex-col gap-2.5">
        <div className={`${CARD} flex flex-col gap-1.5 p-3.5`}>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8A3A12]">
            <span className="size-2 rounded-full bg-[#E0803A]" />
            At risk · flagged for HQ
          </div>
          <div className="text-sm">
            <strong>Tom</strong> · no visit in 11 days
          </div>
          <div className="text-xs text-muted">Push sent, task for the Leeds manager</div>
        </div>
        <div className={`${CARD} flex flex-col gap-2.5 p-3.5`}>
          <div className={LBL}>Still with you after a year</div>
          <div className={barRow}>
            <span className="text-muted">Today</span>
            <span className={track}>
              <span className="block h-full rounded-md bg-[#C9C5B9]" style={{ width: `${ret}%` }} />
            </span>
            <strong>{ret}%</strong>
          </div>
          <div className={barRow}>
            <span>With yours</span>
            <span className={track}>
              <span
                className="block h-full rounded-md transition-[width,background-color] duration-300"
                style={{ width: `${retNew}%`, background: brand.color }}
              />
            </span>
            <strong>{retNew}%</strong>
          </div>
          <div className="text-[11px] text-muted">From your answers in step 3</div>
        </div>
      </div>
    </>
  );
}

/* ── 4 · HQ dashboard ────────────────────────────────────────────── */

const STUDIOS: Array<[string, number, number, number]> = [
  ["Leeds", 1.15, 86, 1],
  ["York", 1, 78, 3],
  ["Hull", 0.8, 61, 8],
];

function Spark({ points }: { points: string }) {
  return (
    <svg
      width="100%"
      height="22"
      viewBox="0 0 100 22"
      preserveAspectRatio="none"
      aria-hidden
      className="mt-1.5"
    >
      <polyline
        points={points}
        fill="none"
        stroke="#15140E"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function DashboardScene() {
  const { brand, model } = useFranchise();
  const { units, members, bill } = model.values;
  const netRev = gbp(units * members * bill);
  const active = (units * members).toLocaleString("en-GB");
  const hqMonth = gbp(model.projection.incomeYear / 12);
  const dot = "size-[9px] rounded-full bg-line";
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`${CARD} w-[88%] max-w-[540px] overflow-hidden shadow-[inset_0_0_0_1px_var(--color-line),0_40px_80px_-40px_rgba(21,20,14,0.45)]`}
      >
        <div className="flex items-center gap-2.5 border-b border-line bg-[#FBFAF7] px-3.5 py-2.5">
          <span className="flex gap-[5px]">
            <span className={dot} />
            <span className={dot} />
            <span className={dot} />
          </span>
          <span className="min-w-0 flex-1 truncate text-center text-xs text-muted">hq.{brand.slug}.com</span>
          <span className="rounded-full bg-paper-2 px-2 py-[3px] text-[10px] font-semibold text-muted">
            Sample
          </span>
        </div>
        <div className="flex flex-col gap-3 bg-[#FBFAF7] p-4">
          <div className="grid grid-cols-3 gap-2">
            <div className={`${CARD} p-3`}>
              <div className="text-[11px] text-muted">Network revenue a month</div>
              <div className="mt-1.5 text-xl font-extrabold leading-none tracking-[-0.035em]">{netRev}</div>
              <Spark points="0,18 18,15 34,16 52,11 70,9 86,6 100,3" />
            </div>
            <div className={`${CARD} p-3`}>
              <div className="text-[11px] text-muted">Active members</div>
              <div className="mt-1.5 text-xl font-extrabold leading-none tracking-[-0.035em]">{active}</div>
              <Spark points="0,16 16,15 32,15 50,12 68,10 84,8 100,6" />
            </div>
            <div className="rounded-[20px] bg-lime p-3">
              <div className="text-[11px] text-[#2b3600]">HQ income a month</div>
              <div className="mt-1.5 text-xl font-extrabold leading-none tracking-[-0.035em]">{hqMonth}</div>
              <Spark points="0,19 20,17 36,14 54,12 70,8 86,6 100,2" />
            </div>
          </div>
          <div className={`${CARD} px-3.5 py-0.5`}>
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.5fr)_minmax(0,0.8fr)] gap-2 border-b border-[#F0EEE7] py-2.5 text-[11px] font-semibold text-muted">
              <span>Studio</span>
              <span>Members</span>
              <span>Kept 90 days</span>
              <span>Late</span>
            </div>
            {STUDIOS.map(([name, k, kept, late], i) => (
              <div
                key={name}
                className={`grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,0.9fr)] items-center gap-2 py-3 text-sm ${i < 2 ? "border-b border-[#F0EEE7]" : ""}`}
              >
                <strong>{name}</strong>
                <span>{Math.round(members * k).toLocaleString("en-GB")}</span>
                <span className="flex items-center gap-1.5">
                  <span className="block h-1.5 max-w-[70px] flex-1 overflow-hidden rounded-[4px] bg-[#F1EFE8]">
                    <Cap pct={kept} color={kept < 70 ? "#E0803A" : undefined} />
                  </span>
                  {kept}%
                </span>
                <span className={late >= 5 ? "font-bold text-[#8A3A12]" : "text-ink"}>{late}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className={LBL}>Needs attention</span>
            <span className="rounded-full bg-[#FDE9DA] px-2.5 py-1 font-semibold text-[#8A3A12]">
              Hull · 8 late payers
            </span>
            <span className="rounded-full bg-[#FDE9DA] px-2.5 py-1 font-semibold text-[#8A3A12]">
              Hull · 61% kept
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 5 · training session on studio screens ──────────────────────── */

function ExIcon({ children }: { children: React.ReactNode }) {
  const { brand } = useFranchise();
  return (
    <span
      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-[10px] ${FADE}`}
      style={{ background: brand.tint, color: brand.color }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
    </span>
  );
}

export function TrainingScene() {
  const { brand, model } = useFranchise();
  const ex = "flex items-center gap-2.5 rounded-[14px] p-[9px] shadow-[inset_0_0_0_1px_#EEECE6]";
  return (
    <>
      {/* the studio screen: the same session, big, on the wall */}
      <div className="absolute top-[70px] right-[5%] flex h-[250px] w-[58%] rotate-2 flex-col justify-between overflow-hidden rounded-[24px] bg-ink p-5 text-paper shadow-[0_30px_60px_-36px_rgba(21,20,14,0.5)]">
        <div className="flex items-center justify-between text-xs font-semibold text-paper/70">
          <span>{brand.name} Leeds</span>
          <span className="inline-flex items-center gap-1.5">
            <Live />
            On screen
          </span>
        </div>
        <div>
          <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-paper/70">Strength · week 3</div>
          <div className="mt-1 text-[34px] font-extrabold leading-none tracking-[-0.03em]">Finisher</div>
          <div className="mt-1.5 text-sm text-paper/80">EMOM 10 min</div>
        </div>
        <div className="flex items-end justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold text-white ${FADE}`}
            style={{ background: brand.color }}
          >
            Next: Back squat 4 × 6
          </span>
          <span className="text-[44px] font-extrabold leading-none tracking-[-0.035em] text-lime">45 s</span>
        </div>
      </div>
      <div className={`${CARD} absolute bottom-[60px] left-[6%] flex w-[300px] flex-col gap-2 p-3.5 shadow-[inset_0_0_0_1px_var(--color-line),0_30px_60px_-34px_rgba(21,20,14,0.45)]`}>
        <div className="flex items-center justify-between gap-2">
          <strong className="text-[15px]">Strength · week 3</strong>
          <TinyPill>Day 1 of 5</TinyPill>
        </div>
        <div className={ex}>
          <ExIcon>
            <path d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="9" />
          </ExIcon>
          <div className="flex-1">
            <div className="text-[13px] font-bold">Warm-up</div>
            <div className={`text-[11px] ${GREY}`}>8 min · mobility</div>
          </div>
        </div>
        <div className={ex}>
          <ExIcon>
            <path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12" />
          </ExIcon>
          <div className="flex-1">
            <div className="text-[13px] font-bold">Back squat</div>
            <div className={`text-[11px] ${GREY}`}>4 × 6 · legs</div>
          </div>
        </div>
        <div
          className={`flex items-center gap-2.5 rounded-[14px] bg-surface p-2.5 shadow-[0_14px_24px_-18px_rgba(21,20,14,0.45)] ${FADE}`}
          style={{ boxShadow: `inset 0 0 0 1.5px ${brand.color}, 0 14px 24px -18px rgba(21,20,14,0.45)` }}
        >
          <ExIcon>
            <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
          </ExIcon>
          <div className="flex-1">
            <div className="text-[13px] font-bold">Finisher</div>
            <div className={`text-[11px] ${GREY}`}>EMOM 10 min</div>
          </div>
          <span className="rounded-full bg-[#F1EFE8] px-2 py-[3px] text-[11px] font-bold">45 s</span>
        </div>
      </div>
      <div className={`${CARD} absolute right-[7%] bottom-[90px] flex items-center gap-2.5 px-3.5 py-3`}>
        <Live />
        <div className="text-[12.5px] leading-[1.35]">
          <strong>Live on {model.values.units} studio screens</strong>
          <div className="text-muted">and in every coach&apos;s app</div>
        </div>
      </div>
    </>
  );
}

/* ── 6 · optional AI agents ──────────────────────────────────────── */

export function AiScene() {
  const { brand } = useFranchise();
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex w-[88%] max-w-[520px] flex-col gap-3">
        <div
          className={`flex items-center gap-2.5 rounded-[18px] bg-white py-2 pr-2 pl-2.5 ${FADE}`}
          style={{ boxShadow: `inset 0 0 0 1.5px ${brand.color}, 0 16px 30px -22px rgba(21,20,14,0.4)` }}
        >
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#F6F1EA] px-2.5 py-1.5 text-xs font-bold">
            <span
              className={`size-2 rounded-full ${FADE}`}
              style={{ background: brand.color }}
            />
            Optional AI agents
          </span>
          <span className="min-w-0 flex-1 text-sm">
            Find Leeds members about to leave and draft a note from their coach
          </span>
          <span
            className={`inline-flex size-9 shrink-0 items-center justify-center rounded-xl ${FADE}`}
            style={{ background: brand.color }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className={`${CARD} flex flex-col gap-[9px] p-3.5`}>
            <div className={LBL}>Leeds · at risk</div>
            {[
              ["Tom B.", "11 days without a visit"],
              ["Amira K.", "Card failed twice"],
              ["Jon P.", "2 of 8 classes this month"],
            ].map(([n, w]) => (
              <div key={n} className="text-[13px]">
                <strong>{n}</strong>
                <div className="text-xs text-muted">{w}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2.5 rounded-[20px] bg-white p-3.5 shadow-[inset_0_0_0_1px_var(--color-line)]">
            <div className={LBL}>What just happened</div>
            {[
              "Found 5 members at risk",
              "Drafted 5 notes in Coach Dean's words",
              "Queued for 18:00, waiting for your OK",
            ].map((t) => (
              <div key={t} className="flex gap-2.5 text-[13px] leading-[1.4]">
                <Tick />
                <span>{t}</span>
              </div>
            ))}
            <div className="flex gap-1.5">
              <BrandPill>Send all 5</BrandPill>
              <span className="inline-flex h-7 items-center rounded-full bg-paper-2 px-3.5 text-xs font-medium text-[#3a382f]">
                Review
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SCENES = [AppScene, PaymentsScene, ChurnScene, DashboardScene, TrainingScene, AiScene];
