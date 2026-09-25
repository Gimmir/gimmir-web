import Image from "next/image";

export type BuildArtKind =
  "network" | "jimmy" | "devices" | "marketplace" | "omni" | "community";

const PAPER = "var(--color-paper)";
const LIME = "var(--color-lime)";

/** Ten locations around one head office, a little uneven like a real map. */
const NODES = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2 + 0.3;
  const wobble = i % 2 ? 0.9 : 1.04;
  return [180 + 122 * wobble * Math.cos(a), 130 + 84 * wobble * Math.sin(a)];
});

/**
 * What each row of ⑥ reveals on hover, drawn in the site's thin hand (ink
 * line, one lime accent) on a paper card. NDA work never gets screenshots
 * and UN1T's screens wait for its OK, so those are drawings; Jimmy Coach's
 * screen is already public.
 */
export function BuildArt({ kind }: { kind: BuildArtKind }) {
  if (kind === "jimmy") {
    return (
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(201,242,61,0.35) 0%, rgba(201,242,61,0) 70%)",
        }}
      >
        <div className="absolute left-1/2 top-7 w-[150px] -translate-x-1/2 rounded-[26px] bg-ink p-[5px] shadow-[0_30px_50px_-24px_rgba(21,20,14,0.6)]">
          <Image
            src="/design/jimmy-screen-home.jpg"
            alt=""
            width={700}
            height={1563}
            sizes="150px"
            className="block w-full rounded-[21px]"
          />
        </div>
      </div>
    );
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 360 260"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full text-ink"
    >
      {kind === "network" && (
        <>
          <ellipse
            cx="180"
            cy="130"
            rx="156"
            ry="108"
            strokeDasharray="2 7"
            opacity={0.45}
          />
          {NODES.map(([x, y], i) => (
            <path key={`l${i}`} d={`M180 130L${x} ${y}`} />
          ))}
          {NODES.map(([x, y], i) => (
            <g key={`n${i}`}>
              <circle cx={x} cy={y} r="10" fill={PAPER} />
              <circle cx={x} cy={y} r="2.6" fill="currentColor" stroke="none" />
            </g>
          ))}
          <circle cx="180" cy="130" r="24" fill={LIME} />
          <circle cx="180" cy="130" r="6" fill="currentColor" stroke="none" />
        </>
      )}

      {kind === "devices" && (
        <>
          <rect x="80" y="36" width="40" height="46" rx="7" />
          <rect x="80" y="166" width="40" height="48" rx="7" />
          <rect x="64" y="78" width="72" height="92" rx="20" fill={PAPER} />
          <path d="M74 126h13l6-17 9 34 7-24 5 7h10" />
          <circle cx="130" cy="126" r="5" fill={LIME} />
          <path d="M150 112c16-14 40-14 56 0" strokeDasharray="3 6" />
          <path d="M160 128c10-8 26-8 36 0" strokeDasharray="3 6" />
          <rect x="222" y="38" width="86" height="180" rx="18" fill={PAPER} />
          <path d="M252 51h26" />
          <rect x="235" y="70" width="60" height="46" rx="9" fill={LIME} />
          <path d="M238 134h54M238 150h38M238 166h46" />
        </>
      )}

      {kind === "marketplace" && (
        <>
          <path d="M84 76c34 0 42 36 66 42M84 130h66M84 184c34 0 42-36 66-42" />
          <path d="M210 118c24-6 32-42 66-42M210 130h66M210 142c24 6 32 42 66 42" />
          <circle cx="116" cy="92" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="244" cy="168" r="3.5" fill="currentColor" stroke="none" />
          {[76, 130, 184].map((y) => (
            <g key={`s${y}`}>
              <circle cx="62" cy={y - 8} r="8" fill={PAPER} />
              <path d={`M50 ${y + 14}a12 12 0 0 1 24 0`} />
              <circle cx="298" cy={y - 8} r="8" fill={PAPER} />
              <path d={`M286 ${y + 14}a12 12 0 0 1 24 0`} />
            </g>
          ))}
          <rect x="150" y="100" width="60" height="60" rx="16" fill={LIME} />
          <path d="M166 122h28m-6-6 6 6-6 6M194 138h-28m6-6-6 6 6 6" />
        </>
      )}

      {kind === "omni" && (
        <>
          <rect x="34" y="34" width="212" height="138" rx="12" fill={PAPER} />
          <path d="M126 172v22M104 194h44" />
          <rect x="50" y="52" width="66" height="102" rx="7" fill={LIME} />
          <path d="M134 62h92M134 80h66M134 98h80" />
          <path d="M134 150l20-18 18 10 24-26 26 12" />
          <rect x="196" y="94" width="96" height="130" rx="12" fill={PAPER} />
          <path d="M210 114h68M210 130h44" />
          <rect x="210" y="146" width="68" height="60" rx="7" />
          <rect x="274" y="128" width="54" height="106" rx="11" fill={PAPER} />
          <path d="M292 139h18M284 158h34M284 172h22" />
          <rect x="284" y="186" width="34" height="30" rx="5" />
        </>
      )}

      {kind === "community" && (
        <>
          <path
            d="M60 44h108a16 16 0 0 1 16 16v44a16 16 0 0 1-16 16H98l-22 18v-18H60a16 16 0 0 1-16-16V60a16 16 0 0 1 16-16Z"
            fill={PAPER}
          />
          <path d="M64 72h86M64 90h58" />
          <path
            d="M192 92h108a16 16 0 0 1 16 16v44a16 16 0 0 1-16 16h-16v18l-22-18h-70a16 16 0 0 1-16-16v-44a16 16 0 0 1 16-16Z"
            fill={PAPER}
          />
          <path
            d="M246 120c-6-8-21-4-19 6 2 9 19 19 19 19s17-10 19-19c2-10-13-14-19-6Z"
            fill={LIME}
          />
          {[
            [70, 214],
            [96, 222],
            [122, 214],
            [226, 224],
            [252, 216],
          ].map(([x, y]) => (
            <circle key={`a${x}`} cx={x} cy={y} r="13" fill={PAPER} />
          ))}
        </>
      )}
    </svg>
  );
}
