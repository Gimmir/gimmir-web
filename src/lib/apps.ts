/** Products that can sit inside a sentence, or on a share card, as their
 *  real app icons. */
export const APPS = {
  un1t: { name: "UN1T", icon: "/design/un1t-logo.png" },
  jimmy: { name: "Jimmy Coach", icon: "/design/jimmy-coach-logo.png" },
} as const;

export type AppId = keyof typeof APPS;
