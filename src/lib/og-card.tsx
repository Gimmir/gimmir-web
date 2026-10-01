/* eslint-disable @next/next/no-img-element -- next/og renders plain <img> */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import type { HeadlineToken } from "@/components/blocks/inline-headline";
import { LOGO_G_PATH } from "@/components/ui/logomark";
import { APPS, type AppId } from "@/lib/apps";
import { person, type FaceId } from "@/lib/people";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#15140e";
const PAPER = "#f6f4ee";
const LIME = "#c9f23d";
const SURFACE = "#ffffff";

/* Nazar's pick o2 (2026-10-01): an ink card in the site's type (Archivo
   800 at 112% width, Newsreader italic for the voice line), the page's
   headline on the left and a real picture on the right: the founders'
   photos, the product's screens or its app icons. Pages without one
   (privacy, terms) set the headline across the whole card. */

/** The picture on the right of a card. */
export type OgPicture =
  /** Tall photo tiles, the second a step higher. */
  | { people: FaceId[] }
  /** Three phone screens (files in /public), fanned. */
  | { phones: [string, string, string] }
  /** App icons, plus that many padlocked tiles for products under NDA. */
  | { apps: AppId[]; locked?: number }
  /** One app icon over an outlined figure. */
  | { app: AppId; stat: string };

// static instances: next/og can't apply a variable font's width axis
const FONT_FILES = [
  { file: "archivo-800-semi-expanded.ttf", name: "Archivo", weight: 800 },
  { file: "archivo-500.ttf", name: "Archivo", weight: 500 },
  { file: "newsreader-400-italic.ttf", name: "Newsreader", weight: 400 },
] as const;

let fonts: Promise<
  { name: string; data: Buffer; weight: 400 | 500 | 800; style: "normal" | "italic" }[]
> | null = null;

function loadFonts() {
  fonts ??= Promise.all(
    FONT_FILES.map(async ({ file, name, weight }) => ({
      name,
      weight,
      style: name === "Newsreader" ? ("italic" as const) : ("normal" as const),
      data: await readFile(join(process.cwd(), "src/lib/og-fonts", file)),
    })),
  );
  return fonts;
}

/** A /public file as a data URL (cards render at build time, in Node). */
async function publicSrc(path: string) {
  const data = await readFile(join(process.cwd(), "public", path), "base64");
  const type = path.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${data}`;
}

/** Every file a card's headline and picture need, keyed by public path. */
async function loadImages(headline: readonly HeadlineToken[], picture?: OgPicture) {
  const paths = new Set<string>();
  for (const t of headline) {
    if (typeof t === "string") continue;
    if ("faces" in t) t.faces.forEach((id) => paths.add(person(id).photo));
    if ("apps" in t) t.apps.forEach((id) => paths.add(APPS[id].icon));
  }
  if (picture) {
    if ("people" in picture) picture.people.forEach((id) => paths.add(person(id).photo));
    if ("phones" in picture) picture.phones.forEach((p) => paths.add(p));
    if ("apps" in picture) picture.apps.forEach((id) => paths.add(APPS[id].icon));
    if ("app" in picture) paths.add(APPS[picture.app].icon);
  }
  const entries = await Promise.all(
    [...paths].map(async (p) => [p, await publicSrc(p)] as const),
  );
  return new Map(entries);
}

/** Headline size: smaller as the sentence grows, larger without a picture. */
function headlineSize(headline: readonly HeadlineToken[], wide: boolean) {
  const chars = headline.reduce<number>(
    (n, t) =>
      n + (typeof t === "string" ? t.length : "mark" in t ? t.mark.length : 2),
    0,
  );
  if (wide) return chars <= 20 ? 104 : chars <= 40 ? 84 : 66;
  if (chars <= 16) return 76;
  if (chars <= 34) return 64;
  if (chars <= 52) return 56;
  if (chars <= 72) return 50;
  return 44;
}

/** The padlock, in the site's thin line. */
function Padlock({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={INK}
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M35 46V34a15 15 0 0 1 30 0v12" />
      <path d="M30 46h40a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6V52a6 6 0 0 1 6-6Z" />
      <circle cx="50" cy="61" r="4" />
      <path d="M50 65v8" />
    </svg>
  );
}

const TILT = [-6, 5, -2, 6];

/** A rounded app tile: the real icon, or a padlock for a product under NDA. */
function Tile({
  size,
  src,
  tilt,
  overlap,
}: {
  size: number;
  src?: string;
  tilt: number;
  overlap?: number;
}) {
  const style: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: size,
    height: size,
    borderRadius: size * 0.22,
    border: `${Math.max(3, Math.round(size * 0.05))}px solid ${INK}`,
    background: SURFACE,
    transform: `rotate(${tilt}deg)`,
    marginLeft: overlap ? -overlap : 0,
    overflow: "hidden",
  };
  return src ? (
    <img src={src} width={size} height={size} alt="" style={{ ...style, objectFit: "cover" }} />
  ) : (
    <div style={style}>
      <Padlock size={size * 0.6} />
    </div>
  );
}

/** The page's headline, as the site sets it: words, faces, app icons and
 *  one word on the lime marker. Every word is its own flex item so lines
 *  break between words. */
function Headline({
  tokens,
  size,
  images,
}: {
  tokens: readonly HeadlineToken[];
  size: number;
  images: Map<string, string>;
}) {
  const gap = size * 0.24;
  const object = size * 0.86;
  const items: React.ReactNode[] = [];

  tokens.forEach((t, i) => {
    if (typeof t === "string") {
      t.split(/\s+/)
        .filter(Boolean)
        .forEach((w, j) =>
          items.push(
            <span key={`${i}-${j}`} style={{ marginRight: gap }}>
              {w}
            </span>,
          ),
        );
    } else if ("faces" in t) {
      items.push(
        <div key={i} style={{ display: "flex", marginRight: gap }}>
          {t.faces.map((id, k) => (
            <img
              key={id}
              src={images.get(person(id).photo)}
              width={object}
              height={object}
              alt=""
              style={{
                borderRadius: 9999,
                objectFit: "cover",
                border: `${Math.round(size * 0.05)}px solid ${INK}`,
                marginLeft: k ? -size * 0.22 : 0,
              }}
            />
          ))}
        </div>,
      );
    } else if ("apps" in t) {
      const n = t.apps.length + (t.locked ?? 0);
      items.push(
        <div key={i} style={{ display: "flex", marginRight: gap }}>
          {Array.from({ length: n }, (_, k) => (
            <Tile
              key={k}
              size={size * 0.8}
              src={k < t.apps.length ? images.get(APPS[t.apps[k]].icon) : undefined}
              tilt={TILT[k % TILT.length]}
              overlap={k ? size * 0.16 : 0}
            />
          ))}
        </div>,
      );
    } else if ("tile" in t) {
      items.push(
        <div key={i} style={{ display: "flex", marginRight: gap }}>
          <Tile size={size * 0.8} tilt={-6} />
        </div>,
      );
    } else {
      // the marker: a lime swipe under the word, as on the site
      items.push(
        <div key={i} style={{ display: "flex", marginRight: gap }}>
          <div style={{ display: "flex", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: -size * 0.04,
                right: -size * 0.06,
                bottom: size * 0.02,
                height: size * 0.2,
                borderRadius: 9999,
                background: LIME,
                transform: "rotate(-1.5deg)",
              }}
            />
            <span>{t.mark}</span>
          </div>
          {t.after ? <span>{t.after}</span> : null}
        </div>,
      );
    }
  });

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        fontFamily: "Archivo",
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: -size * 0.03,
        color: PAPER,
      }}
    >
      {items}
    </div>
  );
}

function Picture({ picture, images }: { picture: OgPicture; images: Map<string, string> }) {
  const box: React.CSSProperties = {
    display: "flex",
    position: "relative",
    width: 470,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  };

  if ("people" in picture) {
    const solo = picture.people.length === 1;
    return (
      <div style={{ ...box, alignItems: "flex-end", gap: 18 }}>
        {picture.people.map((id, k) => (
          <img
            key={id}
            src={images.get(person(id).photo)}
            width={solo ? 330 : 220}
            height={solo ? 450 : 330}
            alt=""
            style={{
              borderRadius: 28,
              objectFit: "cover",
              objectPosition: "50% 20%",
              marginBottom: k === 1 ? 60 : 0,
            }}
          />
        ))}
      </div>
    );
  }

  if ("phones" in picture) {
    // absolutely placed, the middle one last so it paints on top
    // (next/og has no z-index)
    const [a, b, c] = picture.phones;
    const side = { position: "absolute", top: 150, width: 160, height: 333 } as const;
    return (
      <div style={box}>
        <img src={images.get(a)} alt="" style={{ ...side, left: 30, transform: "rotate(-6deg)" }} />
        <img src={images.get(c)} alt="" style={{ ...side, right: 30, transform: "rotate(6deg)" }} />
        <img
          src={images.get(b)}
          alt=""
          style={{ position: "absolute", top: 90, left: 140, width: 190, height: 395 }}
        />
      </div>
    );
  }

  if ("apps" in picture) {
    const n = picture.apps.length + (picture.locked ?? 0);
    return (
      <div style={{ ...box, flexWrap: "wrap", alignContent: "center", gap: 28, padding: "0 50px" }}>
        {Array.from({ length: n }, (_, k) => (
          <Tile
            key={k}
            size={160}
            src={k < picture.apps.length ? images.get(APPS[picture.apps[k]].icon) : undefined}
            tilt={TILT[k % TILT.length]}
          />
        ))}
      </div>
    );
  }

  // one app over its figure, the figure in outline like the site's stats
  return (
    <div style={{ ...box, flexDirection: "column", gap: 10 }}>
      <Tile size={190} src={images.get(APPS[picture.app].icon)} tilt={-5} />
      <div
        style={{
          display: "flex",
          fontFamily: "Archivo",
          fontWeight: 800,
          fontSize: 210,
          lineHeight: 1,
          letterSpacing: -8,
          color: INK,
          WebkitTextStroke: `4px ${PAPER}`,
        }}
      >
        {picture.stat}
      </div>
    </div>
  );
}

/**
 * The shared social-share card. Each route's opengraph-image feeds it the
 * page's label, headline (the same tokens the page's H1 uses, or a short
 * cut of them), one voice line and, if it has one, a picture.
 */
export async function ogCard({
  label,
  headline,
  voice,
  picture,
}: {
  label: string;
  headline: readonly HeadlineToken[];
  voice: string;
  picture?: OgPicture;
}) {
  const [fontData, images] = await Promise.all([
    loadFonts(),
    loadImages(headline, picture),
  ]);
  const size = headlineSize(headline, !picture);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          padding: picture ? "60px 56px 60px 72px" : "60px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="52" height="52" viewBox="0 0 36 36">
              <rect width="36" height="36" rx="8" fill={LIME} />
              <path d={LOGO_G_PATH} fill="#354500" />
            </svg>
            <div
              style={{
                display: "flex",
                fontFamily: "Archivo",
                fontWeight: 800,
                fontSize: 32,
                letterSpacing: -1,
                color: PAPER,
              }}
            >
              Gimmir
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Archivo",
                fontWeight: 500,
                fontSize: 22,
                color: "rgba(246,244,238,0.55)",
              }}
            >
              {label}
            </div>
            <Headline tokens={headline} size={size} images={images} />
            <div
              style={{
                display: "flex",
                fontFamily: "Newsreader",
                fontStyle: "italic",
                fontSize: 32,
                lineHeight: 1.25,
                color: "rgba(246,244,238,0.75)",
              }}
            >
              {voice}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Archivo",
              fontWeight: 500,
              fontSize: 22,
              color: LIME,
            }}
          >
            gimmir.com
          </div>
        </div>
        {picture ? <Picture picture={picture} images={images} /> : null}
      </div>
    ),
    { ...OG_SIZE, fonts: fontData },
  );
}
