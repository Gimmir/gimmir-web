"use client";

import dynamic from "next/dynamic";

/**
 * The draft-mode exit link, loaded only when it renders (draft mode). Its
 * hook comes from next-sanity/hooks, which pulls in all of
 * @sanity/visual-editing (overlays, @sanity/ui, styled-components): ~600 KB
 * of JS that a static import put on every page for every visitor.
 */
export const DisableDraftModeLazy = dynamic(
  () => import("./disable-draft-mode").then((m) => m.DisableDraftMode),
  { ssr: false },
);
