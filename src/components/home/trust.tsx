import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { HOME_QUERY_RESULT } from "@/sanity/types";

const svgProps = {
  viewBox: "0 0 220 120",
  className: "h-full w-full",
  preserveAspectRatio: "xMidYMid meet",
  "aria-hidden": true,
} as const;

/* 1 — the same senior founder travels call → build → deliver,
   lighting up each stage as it is reached (present end to end). */
const CallGlyph = (
  <path
    d="M -8 -6 h16 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 h-9 l-4 4 v-4 h-3 a2 2 0 0 1 -2 -2 v-6 a2 2 0 0 1 2 -2 z"
    className="stroke-ink"
    strokeWidth="1.8"
    fill="none"
    strokeLinejoin="round"
  />
);
const CodeGlyph = (
  <>
    <path
      d="M -3 -5 L -8 0 L -3 5"
      className="stroke-ink"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 3 -5 L 8 0 L 3 5"
      className="stroke-ink"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>
);
const CheckGlyph = (
  <path
    d="M -6 0 L -1.5 5 L 7 -6"
    className="stroke-ink"
    strokeWidth="2.2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

function IlluEngagement() {
  const stations = [
    { x: 44, s: "s1", glyph: CallGlyph },
    { x: 110, s: "s2", glyph: CodeGlyph },
    { x: 176, s: "s3", glyph: CheckGlyph },
  ];
  return (
    <svg {...svgProps}>
      <line
        x1="44"
        y1="70"
        x2="176"
        y2="70"
        className="stroke-ink/15"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="44"
        y1="70"
        x2="176"
        y2="70"
        className="ti1-progress stroke-lime"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {stations.map((st) => (
        <g key={st.x} transform={`translate(${st.x},70)`}>
          <rect
            x="-15"
            y="-15"
            width="30"
            height="30"
            rx="9"
            className={`ti1-st ${st.s} stroke-ink/25`}
            strokeWidth="2"
          />
          {st.glyph}
        </g>
      ))}
      <g transform="translate(44,34)">
        <g className="ti1-node">
          <circle r="13" className="fill-lime stroke-ink" strokeWidth="2" />
          <circle cx="0" cy="-3.2" r="3.6" className="fill-ink" />
          <path
            d="M -6 6 a 6 6 0 0 1 12 0"
            className="stroke-ink"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}

/* 2 — a lime ownership seal stamps onto the document. */
function IlluOwnership() {
  return (
    <svg {...svgProps}>
      <g className="ti2-doc">
        <rect
          x="66"
          y="26"
          width="80"
          height="68"
          rx="9"
          className="fill-paper stroke-ink"
          strokeWidth="2"
        />
        {[46, 58, 70].map((y, i) => (
          <line
            key={y}
            x1="80"
            y1={y}
            x2={i === 2 ? 116 : 132}
            y2={y}
            className="stroke-ink/20"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </g>
      <g transform="translate(146,88)">
        <g className="ti2-seal">
          <circle r="17" className="fill-lime" />
          <path
            d="M -6 0 L -1.5 5.5 L 7.5 -5.5"
            className="ti2-check stroke-ink"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}

/* 3 — a full cross-functional team spins up around the senior lead. */
function Person({ r, lead }: { r: number; lead?: boolean }) {
  const head = r * 0.3;
  const sh = r * 0.42;
  return (
    <>
      <circle
        r={r}
        className={lead ? "fill-lime stroke-ink" : "fill-surface stroke-ink/35"}
        strokeWidth="2"
      />
      <circle
        cx="0"
        cy={-r * 0.26}
        r={head}
        className={lead ? "fill-ink" : "fill-none stroke-ink/55"}
        strokeWidth={lead ? undefined : 1.8}
      />
      <path
        d={`M ${-sh} ${sh} a ${sh} ${sh * 1.15} 0 0 1 ${sh * 2} 0`}
        className={lead ? "stroke-ink" : "stroke-ink/55"}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

function IlluTeam() {
  const cx = 110;
  const cy = 60;
  // clockwise from the top, so the network fans out around the lead
  const team = [
    { x: 110, y: 15, d: "d1" },
    { x: 158, y: 45, d: "d2" },
    { x: 140, y: 99, d: "d3" },
    { x: 80, y: 99, d: "d4" },
    { x: 62, y: 45, d: "d5" },
  ];
  return (
    <svg {...svgProps}>
      {team.map((t) => (
        <line
          key={`l-${t.d}`}
          x1={cx}
          y1={cy}
          x2={t.x}
          y2={t.y}
          className={`ti3-link ${t.d} stroke-lime`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
      {team.map((t) => (
        <g key={`m-${t.d}`} transform={`translate(${t.x},${t.y})`}>
          <g className={`ti3-member ${t.d}`}>
            <Person r={12} />
          </g>
        </g>
      ))}
      <g transform={`translate(${cx},${cy})`}>
        <Person r={15} lead />
      </g>
    </svg>
  );
}

/* 4 — a lime shield braces as a risky decision is pushed back. */
function IlluPushback() {
  return (
    <svg {...svgProps}>
      <path
        d="M104 34 L126 43 V64 C126 79 116 88 104 92 C92 88 82 79 82 64 V43 Z"
        className="ti4-shield fill-lime stroke-ink"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <g transform="translate(150,63)">
        <g className="ti4-arrow">
          <line
            x1="48"
            y1="0"
            x2="8"
            y2="0"
            className="stroke-ink"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M16 -8 L6 0 L16 8"
            className="stroke-ink"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}

const TRUST_ILLUSTRATIONS = [
  <IlluEngagement key="engagement" />,
  <IlluOwnership key="ownership" />,
  <IlluTeam key="team" />,
  <IlluPushback key="pushback" />,
];

export function TrustSection({
  data,
}: {
  data: NonNullable<HOME_QUERY_RESULT>;
}) {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeader
            index="05"
            title={
              <>
                {data.trustHeading}
                {data.trustAccent ? (
                  <>
                    {" "}
                    <span className="font-serif font-normal italic">
                      {data.trustAccent}
                    </span>
                  </>
                ) : null}
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {(data.trustCards ?? []).map((t, i) => (
            <Reveal key={t._key} delay={(i % 2) * 70} className="h-full">
              <div className="t-card group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-300 ease-out hover:shadow-[0_20px_44px_-26px_rgba(21,20,14,0.3)]">
                <div className="t-illu relative h-40 border-b border-line bg-paper-2">
                  <span className="absolute left-4 top-4 z-10 rounded-md bg-ink px-2 py-1 font-mono text-[11px] font-semibold leading-none text-paper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {TRUST_ILLUSTRATIONS[i % TRUST_ILLUSTRATIONS.length]}
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-7 md:p-8">
                  <h3 className="text-xl font-bold tracking-tight">{t.title}</h3>
                  <p className="leading-relaxed text-muted">{t.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
