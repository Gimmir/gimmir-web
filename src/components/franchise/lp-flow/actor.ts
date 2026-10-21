import type { FeatureTone, FlowActor } from "@/content/franchise-page/flow";

/** The actor's fill and text colour (pill, strip node, step badge, legend). */
export const ACTOR_FILL: Record<FlowActor, string> = {
  HQ: "bg-ink text-lime",
  Studio: "bg-line text-ink",
  Member: "bg-lime text-ink",
  Auto: "bg-surface text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink)]",
};

/** Same, with the paper ring that cuts the strip's line behind a node. */
export const ACTOR_NODE: Record<FlowActor, string> = {
  HQ: "bg-ink text-lime shadow-[0_0_0_6px_var(--color-paper)]",
  Studio: "bg-line text-ink shadow-[0_0_0_6px_var(--color-paper)]",
  Member: "bg-lime text-ink shadow-[0_0_0_6px_var(--color-paper)]",
  Auto: "bg-surface text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink),0_0_0_6px_var(--color-paper)]",
};

/** The legend's little square for each actor. */
export const ACTOR_SWATCH: Record<FlowActor, string> = {
  HQ: "bg-ink",
  Studio: "bg-line",
  Member: "bg-lime shadow-[0_0_0_1px_var(--color-ink)]",
  Auto: "bg-surface shadow-[inset_0_0_0_1.5px_var(--color-ink)]",
};

/** A feature group's dot. */
export const TONE_DOT: Record<FeatureTone, string> = {
  lime: "bg-lime shadow-[0_0_0_1px_var(--color-ink)]",
  ink: "bg-ink",
  stone: "bg-stone",
};
