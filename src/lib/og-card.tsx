import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { LOGO_G_PATH } from "@/components/ui/logomark";
import { FOUNDERS, type FounderId } from "@/lib/founders";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#15140e";
const PAPER = "#f6f4ee";
const LIME = "#c9f23d";

/** Scale the headline down as the longest line grows. */
function headlineSize(line1: string, line2: string) {
  const longest = Math.max(line1.length, line2.length);
  if (longest <= 22) return 76;
  if (longest <= 32) return 62;
  if (longest <= 44) return 50;
  return 42;
}

/** Founder headshot as a data URL (cards render at build time, in Node). */
async function faceSrc(face: FounderId) {
  const { photo } = FOUNDERS[face];
  const data = await readFile(join(process.cwd(), "public", photo), "base64");
  const type = photo.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${data}`;
}

/**
 * The shared social-share card: brand tile + wordmark (plus optional founder
 * faces), a two-line headline (white line, lime line), and a footer row.
 * Each route's opengraph-image file feeds it that page's text.
 */
export async function ogCard({
  line1,
  line2,
  footer = "Built by founders who have shipped real fitness platforms",
  faces = [],
}: {
  line1: string;
  line2: string;
  footer?: string;
  /** Founders pictured top right; faces earn trust on shared links. */
  faces?: FounderId[];
}) {
  const fontSize = headlineSize(line1, line2);
  const faceSrcs = await Promise.all(faces.map(faceSrc));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -140,
            top: -180,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(201,242,61,0.22)",
            filter: "blur(110px)",
          }}
        />

        {/* logo tile + wordmark, founder faces */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <svg width="96" height="96" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="8" fill={LIME} />
              <path d={LOGO_G_PATH} fill="#354500" />
            </svg>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 800, color: PAPER, letterSpacing: -2 }}>
              Gimmir
            </div>
          </div>
          {faceSrcs.length > 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ display: "flex" }}>
                {faceSrcs.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img>
                  <img
                    key={faces[i]}
                    src={src}
                    width={112}
                    height={112}
                    alt=""
                    style={{
                      borderRadius: 9999,
                      border: `4px solid ${LIME}`,
                      marginLeft: i === 0 ? 0 : -28,
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: PAPER }}>
                {faces.map((f) => FOUNDERS[f].first).join(" & ")}
              </div>
            </div>
          ) : null}
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize,
              fontWeight: 800,
              color: PAPER,
              letterSpacing: -2.5,
              lineHeight: 1.05,
            }}
          >
            {line1}
          </div>
          <div
            style={{
              display: "flex",
              fontSize,
              fontWeight: 800,
              color: LIME,
              letterSpacing: -2.5,
              lineHeight: 1.05,
            }}
          >
            {line2}
          </div>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(246,244,238,0.2)",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "rgba(246,244,238,0.75)" }}>
            {footer}
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: LIME }}>
            gimmir.com
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
