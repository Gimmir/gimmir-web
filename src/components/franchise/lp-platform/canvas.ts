/**
 * The canvas each illustration is drawn on, in px (see illustrations.tsx).
 * Plain constants, so the server markup in platform.tsx can read them.
 */
export const CANVAS = {
  app: { w: 600, h: 640 },
  pay: { w: 510, h: 560 },
  stay: { w: 510, h: 560 },
  hq: { w: 580, h: 450 },
  train: { w: 560, h: 420 },
  ask: { w: 520, h: 330 },
} as const;
