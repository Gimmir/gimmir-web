"use client";

import { createContext, useContext, useMemo, useRef, useState } from "react";

import { NETWORK_DEFAULTS } from "@/content/offer";
import { trackEvent } from "@/lib/analytics";
import {
  networkTotal,
  paybackMonths,
  projectNetwork,
  unitsBucket,
  type NetworkProjection,
} from "@/lib/franchise-calc";

/**
 * The state /franchise shares across sections (Oleh's landing artboard):
 * the visitor's brand name and colour, which repaint every app screen on
 * the page, and the three-step model, whose total shows in the urgency bar
 * and the offer. One provider around the page; every island reads it.
 */

export const BRAND_SWATCHES = [
  { name: "Ink", hex: "#15140E" },
  { name: "Violet", hex: "#7B4CE0" },
  { name: "Red", hex: "#C62828" },
  { name: "Green", hex: "#14805E" },
  { name: "Blue", hex: "#2563EB" },
  { name: "Orange", hex: "#C2410C" },
] as const;

const DEFAULT_BRAND = "Your brand";
const DEFAULT_COLOR = BRAND_SWATCHES[0].hex;

export type Step = 1 | 2 | 3;

export type Answers = {
  platform: string | null;
  units: number;
  costPerUnit: number;
  /** Null until moved: then it follows the cost per unit (no change for franchisees). */
  techFee: number | null;
  members: number | null;
  bill: number | null;
  feeRate: number | null;
  churn: number | null;
  cut: number | null;
};

type Brand = {
  /** What they typed, or "Your brand". */
  name: string;
  /** "Acme HQ", or "your HQ" before they type. */
  hq: string;
  initial: string;
  /** "acme", for the sample dashboard's address. */
  slug: string;
  color: string;
  /** The colour mixed 86% towards white, for soft fills. */
  tint: string;
};

type Model = {
  answers: Answers;
  /** Answers with the artboard's defaults filled in where they're empty. */
  values: Required<{ [K in keyof Answers]: NonNullable<Answers[K]> }>;
  projection: NetworkProjection;
  done: Record<Step, boolean>;
  open: Step | 0;
  total: number;
  payback: number | null;
};

type FranchiseState = {
  brand: Brand;
  setBrandName: (name: string) => void;
  setBrandColor: (hex: string) => void;
  model: Model;
  answer: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  /** Marks a step answered (filling its defaults) and opens the next. */
  finish: (step: Step) => void;
  toggle: (step: Step) => void;
};

const Ctx = createContext<FranchiseState | null>(null);

const STEP_KEYS: Record<Step, Array<keyof Answers>> = {
  1: ["platform", "units", "costPerUnit"],
  2: ["members", "bill", "techFee", "feeRate"],
  3: ["churn", "cut"],
};

function mix(hex: string, amount: number): string {
  const ch = (i: number) => parseInt(hex.slice(i, i + 2), 16);
  const m = (x: number) => Math.round(x + (255 - x) * amount);
  return `rgb(${m(ch(1))}, ${m(ch(3))}, ${m(ch(5))})`;
}

function nextOpen(done: Record<Step, boolean>, from: Step): Step | 0 {
  const order: Step[] = [1, 2, 3];
  for (const s of order) if (s > from && !done[s]) return s;
  for (const s of order) if (s < from && !done[s]) return s;
  return 0;
}

export function FranchiseProvider({ children }: { children: React.ReactNode }) {
  const [brandName, setBrandName] = useState("");
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [answers, setAnswers] = useState<Answers>({
    platform: null,
    units: NETWORK_DEFAULTS.units,
    costPerUnit: NETWORK_DEFAULTS.costPerUnit,
    techFee: null,
    members: null,
    bill: null,
    feeRate: null,
    churn: null,
    cut: null,
  });
  // moving a slider counts as answering it; untouched sliders don't
  const [touched, setTouched] = useState<Set<keyof Answers>>(new Set());
  const [done, setDone] = useState<Record<Step, boolean>>({ 1: false, 2: false, 3: false });
  const [open, setOpen] = useState<Step | 0>(1);
  const tracked = useRef({ start: false, result: false });

  const brand = useMemo<Brand>(() => {
    const name = brandName.trim() || DEFAULT_BRAND;
    const typed = name !== DEFAULT_BRAND;
    const hex = /^#[0-9a-fA-F]{6}$/.test(color) ? color : DEFAULT_COLOR;
    return {
      name,
      hq: typed ? `${name} HQ` : "your HQ",
      initial: name.charAt(0).toUpperCase(),
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, "") || "yourbrand",
      color: hex,
      tint: mix(hex, 0.86),
    };
  }, [brandName, color]);

  const model = useMemo<Model>(() => {
    const v = {
      platform: answers.platform ?? "Glofox",
      units: answers.units,
      costPerUnit: answers.costPerUnit,
      techFee: answers.techFee ?? answers.costPerUnit,
      members: answers.members ?? NETWORK_DEFAULTS.members,
      bill: answers.bill ?? NETWORK_DEFAULTS.bill,
      feeRate: answers.feeRate ?? NETWORK_DEFAULTS.feeRate,
      churn: answers.churn ?? NETWORK_DEFAULTS.churn,
      cut: answers.cut ?? NETWORK_DEFAULTS.cut,
    };
    const projection = projectNetwork(v);
    const total = networkTotal(projection, done[3]);
    return { answers, values: v, projection, done, open, total, payback: paybackMonths(total) };
  }, [answers, done, open]);

  const value = useMemo<FranchiseState>(() => {
    const isAnswered = (a: Answers, t: Set<keyof Answers>, k: keyof Answers) =>
      k === "units" || k === "costPerUnit" || k === "techFee" ? t.has(k) : a[k] !== null;

    const answer: FranchiseState["answer"] = (key, val) => {
      const nextAnswers = { ...answers, [key]: val };
      const nextTouched = new Set(touched).add(key);
      setAnswers(nextAnswers);
      setTouched(nextTouched);

      if (!tracked.current.start) {
        tracked.current.start = true;
        trackEvent("calc_start", { page: window.location.pathname });
      }
      if (!tracked.current.result && nextTouched.size >= 3) {
        tracked.current.result = true;
        trackEvent("calc_result", { units: unitsBucket(nextAnswers.units) });
      }

      // a step that's now fully answered closes and opens the next
      if (open && !done[open] && STEP_KEYS[open].every((k) => isAnswered(nextAnswers, nextTouched, k))) {
        const nextDone = { ...done, [open]: true };
        setDone(nextDone);
        setOpen(nextOpen(nextDone, open));
      }
    };

    const finish: FranchiseState["finish"] = (step) => {
      const nextDone = { ...done, [step]: true };
      setTouched((t) => {
        const n = new Set(t);
        STEP_KEYS[step].forEach((k) => n.add(k));
        return n;
      });
      setDone(nextDone);
      setOpen(nextOpen(nextDone, step));
    };

    return {
      brand,
      setBrandName,
      setBrandColor: setColor,
      model,
      answer,
      finish,
      toggle: (step) => setOpen((o) => (o === step ? 0 : step)),
    };
  }, [answers, brand, done, model, open, touched]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFranchise(): FranchiseState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useFranchise needs <FranchiseProvider>");
  return v;
}
