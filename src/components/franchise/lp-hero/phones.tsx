"use client";

import { useEffect, useRef, useState } from "react";

import { useFranchise } from "@/components/franchise/franchise-context";
import { Phone } from "@/components/franchise/phone";

import styles from "./lp-hero.module.css";

/**
 * The hero's picture of "your money": the member app in the visitor's
 * brand, and a live stream of sample payments. Each payment lands, its fee
 * flies to HQ and HQ's total for the day ticks up. Drawn in code with
 * sample people (Sophie, Leeds, Coach Dean); decorative, so hidden from
 * assistive tech.
 *
 * The stage is laid out at a fixed 580×720 and scaled to fit its column,
 * so the composition stays the same on a phone. On a mouse, its layers
 * drift with the pointer at different depths. Reduced motion: one still
 * frame, no stream, no drift.
 */

const W = 580;
const H = 720;
const TICK = 2800;
/** How long a fee takes to fly from the payment to HQ (matches .fly). */
const FLIGHT = 680;

// sample payments across the network; the first is the one on the phones
const PAYMENTS = [
  { who: "Sophie", amount: 60, studio: "Leeds", what: "Unlimited" },
  { who: "Tom", amount: 45, studio: "York", what: "8 classes" },
  { who: "Amira", amount: 60, studio: "Hull", what: "Unlimited" },
  { who: "Jon", amount: 95, studio: "Leeds", what: "10-class pack" },
  { who: "Grace", amount: 60, studio: "York", what: "Unlimited" },
] as const;
// what members across the network have paid today before the first one shown
const PAID_BEFORE = 3_660;
const COUNT_BEFORE = 61;

const FADE = "transition-[background-color,color,box-shadow] duration-300";
const gbp = (v: number) =>
  `£${v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Fits the fixed stage to its column. */
function useFit() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setScale(Math.min(1, e.contentRect.width / W)),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, scale };
}

/** The payment stream: runs only while the stage is on screen and the tab is visible. */
function useStream(stage: React.RefObject<HTMLDivElement | null>) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let visible = false;
    let timer: number | undefined;
    const run = () => {
      window.clearInterval(timer);
      timer = undefined;
      if (visible && document.visibilityState === "visible") {
        timer = window.setInterval(() => setTick((t) => t + 1), TICK);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      run();
    });
    // the first payment flies only after the entrance has played
    const start = window.setTimeout(() => io.observe(el), 1600);
    document.addEventListener("visibilitychange", run);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
      io.disconnect();
      document.removeEventListener("visibilitychange", run);
    };
  }, [stage]);
  return tick;
}

/**
 * Depth on a mouse: each `[data-depth]` layer eases towards the pointer,
 * the nearer ones further. Transforms are written straight to the layers
 * (no inherited CSS variables), one rAF loop while moving.
 */
function useDrift(stage: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = stage.current;
    const area = el?.closest("section");
    if (!el || !area) return;
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const layers = [...el.querySelectorAll<HTMLElement>("[data-depth]")].map(
      (node) => ({
        node,
        depth: Number(node.dataset.depth),
      }),
    );
    const target = { x: 0, y: 0 };
    const now = { x: 0, y: 0 };
    let frame = 0;

    const step = () => {
      now.x += (target.x - now.x) * 0.08;
      now.y += (target.y - now.y) * 0.08;
      for (const { node, depth } of layers) {
        node.style.transform = `translate3d(${(now.x * depth * 12).toFixed(2)}px, ${(now.y * depth * 9).toFixed(2)}px, 0)`;
      }
      const settled =
        Math.abs(target.x - now.x) < 0.001 &&
        Math.abs(target.y - now.y) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(step);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = Math.max(
        -1,
        Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)),
      );
      target.y = Math.max(
        -1,
        Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)),
      );
      kick();
    };
    const leave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
    };
  }, [stage]);
}

/** The tick whose fee has reached HQ: the stream's tick, once the fee has flown. */
function useLanded(tick: number) {
  const [landed, setLanded] = useState(tick);
  useEffect(() => {
    const t = window.setTimeout(() => setLanded(tick), FLIGHT);
    return () => window.clearTimeout(t);
  }, [tick]);
  return landed;
}

export function HeroPhones() {
  const { brand, model } = useFranchise();
  const c = brand.color;
  const paint = { background: c, color: "#fff" } as const;
  const fee = model.values.feeRate;

  const { ref: fit, scale } = useFit();
  const stage = useRef<HTMLDivElement>(null);
  const tick = useStream(stage);
  useDrift(stage);

  const landed = useLanded(tick);

  const pay = PAYMENTS[tick % PAYMENTS.length];
  // HQ's day so far: everything before, plus every payment whose fee has
  // landed (the total moves when the flying fee arrives, not when it leaves)
  let paid = PAID_BEFORE;
  for (let i = 0; i <= landed; i++)
    paid += PAYMENTS[i % PAYMENTS.length].amount;
  const hqToday = paid * fee;
  const share = pay.amount * fee;

  return (
    <div
      ref={fit}
      aria-hidden
      className="relative w-full"
      style={{ height: H * scale }}
    >
      <div
        ref={stage}
        className="absolute top-0 left-1/2 origin-top"
        style={{
          width: W,
          height: H,
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        {/* the light behind the phones, in the visitor's colour */}
        <div
          className={`${styles.glowIn} pointer-events-none absolute inset-0`}
          style={d(100)}
        >
          <div
            className="absolute top-[60px] left-[90px] size-[520px] rounded-full opacity-[0.16] blur-[70px] transition-[background-color] duration-500"
            style={{ background: c }}
          />
          <div className="absolute top-[420px] left-0 size-[300px] rounded-full bg-lime opacity-30 blur-[70px]" />
          <svg
            viewBox="0 0 640 640"
            className="absolute top-[16px] left-[76px] size-[640px] text-line-strong"
            fill="none"
          >
            <circle
              cx="320"
              cy="320"
              r="236"
              stroke="currentColor"
              strokeOpacity="0.55"
            />
            <circle
              className={styles.orbit}
              cx="320"
              cy="320"
              r="304"
              stroke="currentColor"
              strokeOpacity="0.7"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* back phone: checkout */}
        <div
          data-depth="0.45"
          className="absolute top-[118px] left-[6px] z-[1]"
        >
          <div className={styles.riseBack} style={d(240)}>
            <Phone size="back" screen="#fff" className="-rotate-[7deg]">
              <div className="px-4 pt-11 pb-2.5 text-center text-sm font-bold">
                Checkout
              </div>
              <div
                className={`mx-3.5 mt-1.5 rounded-[18px] p-4 ${FADE}`}
                style={paint}
              >
                <div className="text-[11px] font-semibold opacity-85">
                  {brand.name}
                </div>
                <div className="mt-1 text-[22px] font-extrabold tracking-[-0.02em]">
                  Unlimited
                </div>
                <div className="mt-0.5 text-[11px] opacity-85">
                  Every class, every studio
                </div>
                <div className="mt-[18px] text-xl font-extrabold">
                  £60{" "}
                  <span className="text-[11px] font-semibold opacity-85">
                    a month
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[9px] px-4 py-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6b6b6b]">Unlimited membership</span>
                  <strong>£60.00</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b6b6b]">Home studio</span>
                  <strong>Leeds</strong>
                </div>
                <div className="flex justify-between border-t border-[#eee] pt-[9px]">
                  <strong>Due today</strong>
                  <strong>£60.00</strong>
                </div>
              </div>
              <div className="mx-3.5 mt-auto mb-3.5 flex flex-col gap-2">
                <div className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-black text-base font-semibold text-white">
                  <svg viewBox="0 0 24 24" className="size-[15px]" fill="#fff">
                    <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.1.1 2.3-.6 3-1.5z" />
                  </svg>
                  Pay
                </div>
                <div className="text-center text-[10.5px] text-[#6b6b6b]">
                  Paid to {brand.name} Leeds · secured by Stripe
                </div>
              </div>
            </Phone>
          </div>
        </div>

        {/* front phone: home */}
        <div data-depth="1" className="absolute top-[40px] left-[252px] z-[2]">
          <div className={styles.rise} style={d(120)}>
            <Phone size="front">
              <div
                className={`px-[18px] pt-[46px] pb-[54px] ${FADE}`}
                style={paint}
              >
                <div className="flex items-center justify-between">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className={`inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-extrabold ${FADE}`}
                      style={{ color: c }}
                    >
                      {brand.initial}
                    </span>
                    <strong className="truncate text-[15px] tracking-[-0.01em]">
                      {brand.name}
                    </strong>
                  </div>
                  <span className="inline-flex size-[30px] items-center justify-center rounded-full bg-white/25 text-xs font-bold">
                    S
                  </span>
                </div>
                <div className="mt-4 text-xs opacity-85">
                  Good morning, Sophie
                </div>
                <div className="mt-0.5 text-[22px] font-extrabold tracking-[-0.02em]">
                  3 classes this week
                </div>
              </div>
              <div className="relative mx-3 -mt-10 rounded-[20px] bg-white p-3.5 shadow-[0_14px_28px_-18px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between gap-2.5">
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.08em] text-[#6b6b6b]">
                      NEXT CLASS
                    </div>
                    <div className="mt-0.5 text-[30px] leading-[1.1] font-extrabold tracking-[-0.03em]">
                      07:00
                    </div>
                    <div className="text-xs font-bold">Strength · Leeds</div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#6b6b6b]">
                      <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-[#E9E6DD] text-[9px] font-bold text-ink">
                        D
                      </span>
                      with Coach Dean
                    </div>
                  </div>
                  <svg viewBox="0 0 64 64" className="size-16 shrink-0">
                    <circle
                      cx="32"
                      cy="32"
                      r="22"
                      fill="none"
                      stroke="#EDEBE4"
                      strokeWidth="7"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="22"
                      fill="none"
                      stroke={c}
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray="103.7 138.2"
                      transform="rotate(-90 32 32)"
                      style={{ transition: "stroke 300ms" }}
                    />
                    <text
                      x="32"
                      y="36.5"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="800"
                      fill="#15140E"
                    >
                      3/4
                    </text>
                  </svg>
                </div>
                <div
                  className={`mt-3 flex h-[38px] items-center justify-center rounded-xl text-[13px] font-bold ${FADE}`}
                  style={paint}
                >
                  Check in
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-3">
                <div className="flex items-baseline justify-between">
                  <strong className="text-[13px]">Book a class</strong>
                  <span className="text-[11px] text-[#6b6b6b]">Leeds</span>
                </div>
                <div className="grid grid-cols-5 gap-[5px]">
                  {[
                    ["MON", "26"],
                    ["TUE", "27"],
                    ["WED", "28"],
                    ["THU", "29"],
                    ["FRI", "30"],
                  ].map(([day, n], i) => (
                    <div
                      key={day}
                      className={`rounded-[10px] py-1.5 text-center ${FADE} ${i === 0 ? "" : "bg-white"}`}
                      style={i === 0 ? paint : undefined}
                    >
                      <div
                        className={`text-[9px] ${i === 0 ? "opacity-85" : "text-[#6b6b6b]"}`}
                      >
                        {day}
                      </div>
                      <div className="text-[13px] font-extrabold">{n}</div>
                    </div>
                  ))}
                </div>
                {[
                  {
                    time: "12:30",
                    name: "Conditioning",
                    note: "Coach Amy · 6 spots left",
                    fill: "60%",
                    cta: "Book",
                  },
                  {
                    time: "18:30",
                    name: "Mobility",
                    note: "Full · 3 on the waitlist",
                    fill: "100%",
                    cta: "Join",
                  },
                ].map((row) => (
                  <div
                    key={row.time}
                    className="flex items-center gap-2.5 rounded-[14px] bg-white p-2.5"
                  >
                    <div className="w-[38px] text-xs font-extrabold">
                      {row.time}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold">{row.name}</div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded bg-[#EDEBE4]">
                        <span
                          className={`block h-full rounded ${FADE}`}
                          style={{
                            width: row.fill,
                            background: row.cta === "Book" ? c : "#C9C5B9",
                          }}
                        />
                      </div>
                      <div className="mt-1 text-[10px] text-[#6b6b6b]">
                        {row.note}
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-[11px] py-1.5 text-[11px] font-bold whitespace-nowrap ${FADE} ${row.cta === "Join" ? "bg-paper-2" : ""}`}
                      style={row.cta === "Book" ? paint : undefined}
                    >
                      {row.cta}
                    </span>
                  </div>
                ))}
              </div>
            </Phone>
          </div>
        </div>

        {/* the brand's push, dropping in over the top of the phone */}
        <div
          data-depth="1.6"
          className="absolute top-0 left-[318px] z-[4] w-[262px]"
        >
          <div className={styles.drop} style={d(760)}>
            <div
              className={`${styles.float} flex items-start gap-2.5 rounded-[18px] bg-white/[0.97] px-3.5 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] backdrop-blur`}
            >
              <span
                className={`inline-flex size-9 shrink-0 items-center justify-center rounded-[9px] font-extrabold ${FADE}`}
                style={paint}
              >
                {brand.initial}
              </span>
              <div className="min-w-0 text-[13px] leading-[1.35]">
                <div className="flex justify-between gap-2.5">
                  <strong className="truncate">{brand.name}</strong>
                  <span className="text-[#6b6b6b]">now</span>
                </div>
                Your 07:00 class is tomorrow. 2 spots left.
              </div>
            </div>
          </div>
        </div>

        {/* the coach's check-in, going out by itself */}
        <div data-depth="1.3" className="absolute top-[34px] left-0 z-[4]">
          <div className={styles.enter} style={d(920)}>
            <div
              className={`${styles.float2} flex items-center gap-2.5 rounded-3xl bg-surface px-3.5 py-3 shadow-[inset_0_0_0_1px_var(--color-line),0_20px_40px_-22px_rgba(21,20,14,0.45)]`}
            >
              <span className={styles.live} />
              <div className="text-[13px] leading-[1.35]">
                <strong>Day 30 check-in sent</strong>
                <div className="text-muted">Coach Dean to Sophie</div>
              </div>
            </div>
          </div>
        </div>

        {/* the stream: a payment lands, its fee flies to HQ */}
        <div
          data-depth="1.8"
          className="absolute top-[620px] left-[18px] z-[5] w-[344px]"
        >
          <div className={styles.enter} style={d(1080)}>
            <div className="relative flex items-center gap-3 rounded-3xl bg-surface px-3.5 py-3 shadow-[inset_0_0_0_1px_var(--color-line),0_24px_44px_-22px_rgba(21,20,14,0.5)]">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-lime text-lg font-extrabold">
                £
              </span>
              <div
                key={tick}
                className={`${styles.swap} min-w-0 flex-1 text-[13px] leading-[1.35]`}
              >
                <strong>Payment received</strong>
                <div className="truncate text-muted">
                  {pay.who} · {gbp(pay.amount)} · {pay.studio}
                </div>
              </div>
              <span className="relative rounded-full bg-ink px-2.5 py-[5px] text-xs font-bold whitespace-nowrap text-lime tabular-nums">
                +{gbp(share)} to HQ
                {tick > 0 && share > 0 ? (
                  <span
                    key={tick}
                    className={`${styles.fly} absolute inset-0 flex items-center justify-center rounded-full bg-lime text-ink`}
                  >
                    +{gbp(share)}
                  </span>
                ) : null}
              </span>
            </div>
          </div>
        </div>

        {/* HQ's day so far */}
        <div
          data-depth="1.25"
          className="absolute top-[588px] left-[384px] z-[4] w-[196px]"
        >
          <div className={styles.enter} style={d(1220)}>
            <div className="rounded-3xl bg-ink px-4 pt-3.5 pb-4 text-paper shadow-[0_28px_50px_-24px_rgba(21,20,14,0.7)]">
              <div className="flex items-center justify-between text-[11px] font-semibold text-paper/60">
                <span className="truncate">To {brand.hq}, today</span>
                <span className={styles.live} />
              </div>
              <div
                key={landed}
                className={`${landed > 0 ? styles.bump : ""} mt-1 text-[28px] leading-none font-extrabold tracking-[-0.03em] text-lime tabular-nums`}
              >
                {gbp(hqToday)}
              </div>
              <div className="mt-1.5 text-[11px] text-paper/60 tabular-nums">
                from {COUNT_BEFORE + landed + 1} payments
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
