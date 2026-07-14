"use client";

import { useVisualEditingEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
  const environment = useVisualEditingEnvironment();

  if (
    environment === "presentation-iframe" ||
    environment === "presentation-window"
  ) {
    return null;
  }

  return (
    <a
      href="/api/draft-mode/disable"
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        zIndex: 60,
        background: "#c9f23d",
        color: "#15140e",
        fontFamily: "'Archivo', sans-serif",
        fontSize: 14,
        fontWeight: 600,
        padding: "8px 16px",
        borderRadius: 999,
        textDecoration: "none",
        boxShadow: "0 6px 24px rgba(0,0,0,.18)",
      }}
    >
      Disable draft mode
    </a>
  );
}
