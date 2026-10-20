import { Stage } from "@/components/motion/stage";
import { RiseText, wordCount } from "@/components/motion/words";
import { Container } from "@/components/ui/container";
import { franchise } from "@/content/franchise";

/**
 * /franchise ②, where the money goes: the same member payment drawn twice,
 * today and with your app. Drawn in the site's ink, paper and surface, and
 * in currentColor wherever it sits on the section, so it reads in a paper
 * or an ink section alike. Two drawings, one for a wide screen and one
 * stacked for a phone, so the labels stay readable at 375px.
 */

type Kind = "plain" | "ghost" | "hq";

const NODE: Record<Kind, { fill: string; stroke: string; text: string }> = {
  plain: {
    fill: "var(--color-surface)",
    stroke: "var(--color-ink)",
    text: "var(--color-ink)",
  },
  // HQ with nothing coming in: dashed and quiet
  ghost: { fill: "none", stroke: "currentColor", text: "currentColor" },
  hq: {
    fill: "var(--color-ink)",
    stroke: "currentColor",
    text: "var(--color-paper)",
  },
};

function Node({
  x,
  y,
  w,
  h = 56,
  kind = "plain",
  children,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  kind?: Kind;
  children: React.ReactNode;
}) {
  const s = NODE[kind];
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={h / 2}
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth={kind === "ghost" ? 1.5 : 2}
        strokeDasharray={kind === "ghost" ? "5 6" : undefined}
        opacity={kind === "ghost" ? 0.6 : 1}
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={s.text}
        opacity={kind === "ghost" ? 0.7 : 1}
        className="text-[16px] font-bold"
      >
        {children}
      </text>
    </g>
  );
}

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Label({
  x,
  y,
  anchor = "middle",
  children,
}: {
  x: number;
  y: number;
  anchor?: "start" | "middle";
  children: React.ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill="currentColor"
      className="text-[14px] font-semibold"
    >
      {children}
    </text>
  );
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path
          d="M1 1.5 8.5 5 1 8.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
    </defs>
  );
}

// one marker per drawing: a marker inside a display:none svg won't draw
const WIDE_HEAD = "url(#flow-head-wide)";
const STACKED_HEAD = "url(#flow-head-stacked)";

function RowTitle({ y, children }: { y: number; children: React.ReactNode }) {
  return (
    <text
      x={0}
      y={y}
      fill="currentColor"
      opacity={0.6}
      className="text-[15px] font-bold"
    >
      {children}
    </text>
  );
}

/** From a wide screen up: each row runs left to right. */
function Wide() {
  return (
    <svg
      viewBox="0 0 880 360"
      role="img"
      aria-label={flowAlt}
      className="hidden h-auto w-full md:block"
    >
      <Defs id="flow-head-wide" />
      <RowTitle y={20}>Today</RowTitle>
      <Node x={0} y={40} w={170}>
        Member
      </Node>
      <path d="M174 68H296" {...STROKE} markerEnd={WIDE_HEAD} />
      <Label x={235} y={58}>
        pays
      </Label>
      <Node x={300} y={40} w={170}>
        Studio
      </Node>
      <path d="M474 68H606" {...STROKE} markerEnd={WIDE_HEAD} />
      <Label x={540} y={58}>
        pays every month
      </Label>
      <Node x={610} y={40} w={270}>
        Mindbody / Glofox
      </Node>
      <Node x={610} y={120} w={270} h={44} kind="ghost">
        HQ: nothing
      </Node>

      <RowTitle y={236}>With your app</RowTitle>
      <Node x={0} y={280} w={170}>
        Member
      </Node>
      <path d="M174 308H296" {...STROKE} markerEnd={WIDE_HEAD} />
      <Label x={235} y={332}>
        pays in your app
      </Label>
      <Node x={300} y={280} w={170}>
        Studio
      </Node>
      <path d="M474 308H606" {...STROKE} markerEnd={WIDE_HEAD} />
      <Label x={540} y={298}>
        tech fee
      </Label>
      <Node x={610} y={280} w={270} kind="hq">
        HQ
      </Node>
      {/* the fee on every payment leaves the member's payment and goes
          over the studio to HQ */}
      <path d="M235 302C235 244 745 244 745 274" {...STROKE} markerEnd={WIDE_HEAD} />
      <Label x={490} y={248}>
        a fee on every payment, automatically
      </Label>
    </svg>
  );
}

/** On a phone: each row runs top to bottom. */
function Stacked() {
  return (
    <svg
      viewBox="0 0 340 676"
      role="img"
      aria-label={flowAlt}
      className="h-auto w-full md:hidden"
    >
      <Defs id="flow-head-stacked" />
      <RowTitle y={20}>Today</RowTitle>
      <Node x={0} y={34} w={170}>
        Member
      </Node>
      <path d="M85 94V126" {...STROKE} markerEnd={STACKED_HEAD} />
      <Label x={100} y={115} anchor="start">
        pays
      </Label>
      <Node x={0} y={130} w={170}>
        Studio
      </Node>
      <path d="M85 190V222" {...STROKE} markerEnd={STACKED_HEAD} />
      <Label x={100} y={211} anchor="start">
        pays every month
      </Label>
      <Node x={0} y={226} w={170}>
        Mindbody / Glofox
      </Node>
      <Node x={0} y={302} w={170} h={44} kind="ghost">
        HQ: nothing
      </Node>

      <RowTitle y={404}>With your app</RowTitle>
      <Node x={0} y={418} w={170}>
        Member
      </Node>
      <path d="M85 478V510" {...STROKE} markerEnd={STACKED_HEAD} />
      <Label x={100} y={499} anchor="start">
        pays in your app
      </Label>
      <Node x={0} y={514} w={170}>
        Studio
      </Node>
      <path d="M85 574V606" {...STROKE} markerEnd={STACKED_HEAD} />
      <Label x={100} y={595} anchor="start">
        tech fee
      </Label>
      <Node x={0} y={610} w={170} kind="hq">
        HQ
      </Node>
      {/* the fee on every payment, down the side and over to HQ */}
      <path d="M174 446H226V638H174" {...STROKE} markerEnd={STACKED_HEAD} />
      <Label x={238} y={522} anchor="start">
        a fee on
      </Label>
      <Label x={238} y={542} anchor="start">
        every payment,
      </Label>
      <Label x={238} y={562} anchor="start">
        automatically
      </Label>
    </svg>
  );
}

const flowAlt =
  "Today, a member pays the studio and the studio pays Mindbody or Glofox every month; HQ gets nothing. With your app, a member pays the studio in your app, the studio pays HQ a tech fee, and HQ takes a fee on every payment, automatically.";

export function FranchiseMoneyFlow() {
  const { title, note } = franchise.flow;
  const after = wordCount(title) * 40 + 300;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <Stage as="section" data-tone="paper" className="relative">
      <Container className="py-20 md:py-28">
        <h2 className="display text-[length:var(--text-title)] leading-[1.02]">
          <RiseText text={title} />
        </h2>
        <figure className="fade mt-12 md:mt-16" style={d(after)}>
          <div className="max-w-[360px] md:max-w-none">
            <Stacked />
            <Wide />
          </div>
          <figcaption className="mt-4 text-sm text-faint">
            Illustration
          </figcaption>
        </figure>
        <p
          className="fade mt-8 max-w-[52ch] text-lg leading-relaxed md:mt-10 md:text-xl"
          style={d(after + 120)}
        >
          {note}
        </p>
      </Container>
    </Stage>
  );
}
