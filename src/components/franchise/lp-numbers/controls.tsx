"use client";

import { cn } from "@/lib/cn";

/**
 * The model's controls, drawn as the artboard has them: a question with its
 * answer chips, or a slider with its value beside the label. Nothing here
 * animates when a value changes; only presses move.
 */

/** A question and its options, one chosen (a radio group). */
export function ChipQuestion<T extends string | number>({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: ReadonlyArray<{ value: T; label: string }>;
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span id={`${id}-label`} className="text-base font-semibold">
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        className="flex flex-wrap gap-2"
      >
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
                "min-h-11 cursor-pointer rounded-full px-[18px] text-[15px] font-semibold transition-[background-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:transition-none",
                on
                  ? "bg-ink text-paper"
                  : "bg-surface text-ink ring-1 ring-line-strong ring-inset hover:ring-ink/50",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * A slider with its value beside the label. `onHold(true)` while it is being
 * used (pointer down, or keys on a focused slider): the model closes a step
 * the moment it is fully answered, and a step must not close under a thumb.
 */
export function SliderQuestion({
  id,
  label,
  display,
  valueText,
  value,
  min,
  max,
  step,
  onChange,
  onHold,
  hint,
}: {
  id: string;
  label: string;
  display: string;
  valueText: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  onHold: (holding: boolean) => void;
  hint?: React.ReactNode;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-base font-semibold">
          {label}
        </label>
        <strong aria-hidden className="text-[22px] tabular-nums">
          {display}
        </strong>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={valueText}
        aria-describedby={hint ? `${id}-hint` : undefined}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerDown={() => {
          onHold(true);
          // released anywhere, not just over the slider
          const end = () => {
            onHold(false);
            window.removeEventListener("pointerup", end);
            window.removeEventListener("pointercancel", end);
          };
          window.addEventListener("pointerup", end);
          window.addEventListener("pointercancel", end);
        }}
        onKeyDown={() => onHold(true)}
        onBlur={() => onHold(false)}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
        className="calc-range m-0 w-full"
      />
      {hint ? (
        <span id={`${id}-hint`} className="text-sm leading-[1.5] text-muted">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
