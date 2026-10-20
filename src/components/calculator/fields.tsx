"use client";

import { cn } from "@/lib/cn";

/**
 * The calculators' controls, in the site's paper/ink language: numbered
 * steps on hairlines like a ledger, 52px boxes, chips that press.
 * Nothing animates when a value changes (it changes tens of times a
 * minute); only presses and the accordions move, transform/opacity only.
 */

const box =
  "h-[52px] w-full rounded-[14px] border border-line bg-surface px-4 text-base text-ink tabular-nums outline-none transition-[border-color] duration-150 focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink placeholder:text-faint";

/** One numbered question: "01  How many studios…", its control and a hint. */
export function Step({
  n,
  id,
  label,
  hint,
  children,
  as = "label",
}: {
  n: number;
  id: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  children: React.ReactNode;
  /** "legend" when the control is a group of buttons. */
  as?: "label" | "legend";
}) {
  const num = (
    <span
      aria-hidden
      className="font-mono text-[13px] leading-6 tracking-[0.04em] text-faint"
    >
      {String(n).padStart(2, "0")}
    </span>
  );
  const text = <span className="text-base font-semibold leading-6">{label}</span>;

  const head =
    as === "label" ? (
      <label htmlFor={id} className="flex gap-4">
        {num}
        {text}
      </label>
    ) : (
      <legend className="flex gap-4">
        {num}
        {text}
      </legend>
    );

  const body = (
    <div className="mt-3 pl-[34px]">
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm leading-snug text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );

  return as === "legend" ? (
    <fieldset className="border-t border-line py-6 first:border-t-0 first:pt-0">
      {head}
      {body}
    </fieldset>
  ) : (
    <div className="border-t border-line py-6 first:border-t-0 first:pt-0">
      {head}
      {body}
    </div>
  );
}

/** A number box: digits only, with £ in front or % behind. */
export function NumberBox({
  id,
  value,
  onChange,
  unit = "£",
  decimals = false,
  placeholder,
  describedBy,
  className,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  unit?: "£" | "%" | null;
  decimals?: boolean;
  placeholder?: string;
  describedBy?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative max-w-[240px]", className)}>
      {unit === "£" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted"
        >
          £
        </span>
      ) : null}
      <input
        id={id}
        type="text"
        inputMode={decimals ? "decimal" : "numeric"}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        aria-describedby={describedBy}
        onChange={(e) =>
          onChange(e.target.value.replace(decimals ? /[^\d.]/g : /\D/g, ""))
        }
        className={cn(box, unit === "£" && "pl-8", unit === "%" && "pr-9")}
      />
      {unit === "%" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted"
        >
          %
        </span>
      ) : null}
    </div>
  );
}

/** A native range input with a thumb-sized handle and a filled track. */
export function Range({
  id,
  value,
  min,
  max,
  step,
  onChange,
  valueText,
  label,
}: {
  id?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  valueText: string;
  label?: string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      aria-label={label}
      aria-valuetext={valueText}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ "--fill": `${fill}%` } as React.CSSProperties}
      className="calc-range w-full"
    />
  );
}

/** A row of pressable options; one is chosen (a radio group). */
export function Chips<T extends string | number>({
  name,
  options,
  value,
  onChange,
  size = "md",
  tone = "paper",
}: {
  name: string;
  options: ReadonlyArray<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
  size?: "md" | "sm";
  tone?: "paper" | "ink";
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-full border font-semibold transition-[background-color,border-color,color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97]",
              size === "md" ? "h-11 px-4 text-[15px]" : "h-9 px-3.5 text-sm",
              tone === "paper"
                ? on
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-surface text-ink hover:border-ink/40"
                : on
                  ? "border-paper bg-paper text-ink"
                  : "border-paper/25 text-paper hover:border-paper/60",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** An on/off switch. */
export function Switch({
  id,
  on,
  onChange,
  label,
}: {
  id: string;
  on: boolean;
  onChange: (on: boolean) => void;
  label: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="group inline-flex h-11 items-center gap-3 rounded-full pr-2 text-[15px] font-semibold"
    >
      <span
        aria-hidden
        className={cn(
          "relative h-7 w-12 rounded-full transition-colors duration-200",
          on ? "bg-ink" : "bg-line",
        )}
      >
        <span
          className={cn(
            "absolute top-1 left-1 size-5 rounded-full bg-paper shadow-[0_1px_2px_rgba(21,20,14,0.3)] transition-transform duration-200 ease-[var(--ease-out)] group-active:scale-90",
            on && "translate-x-5",
          )}
        />
      </span>
      {label}
    </button>
  );
}

/** A disclosure: a bar that is never empty, and a body that opens under it. */
export function Disclosure({
  id,
  open,
  onToggle,
  bar,
  children,
  className,
}: {
  id: string;
  open: boolean;
  onToggle: () => void;
  bar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="group w-full text-left"
      >
        {bar}
      </button>
      <div
        id={id}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden" inert={!open}>
          {children}
        </div>
      </div>
    </div>
  );
}
