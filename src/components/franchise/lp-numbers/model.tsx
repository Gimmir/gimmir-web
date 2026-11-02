"use client";

import { useState } from "react";

import { useFranchise, type Step as StepId } from "@/components/franchise/franchise-context";
import { NETWORK_OPTIONS } from "@/content/offer";
import { formatMoney, formatPercent } from "@/lib/franchise-calc";

import { ChipQuestion, SliderQuestion } from "./controls";
import { NumbersResult } from "./result";
import { PLATFORMS, PillButton, platformName, pounds } from "./shared";
import { Step } from "./step";

/**
 * The three-step model of the visitor's own network, with its running
 * result. State lives in `FranchiseProvider` (the page's urgency bar and
 * offer read the same total); this only draws it.
 */

const options = <T extends string | number>(
  list: ReadonlyArray<T>,
  label: (v: T) => string,
) => list.map((v) => ({ value: v, label: label(v) }));

const PLATFORM_OPTIONS = options(PLATFORMS, (v) => v);
const MEMBER_OPTIONS = options(NETWORK_OPTIONS.members, String);
const BILL_OPTIONS = options(NETWORK_OPTIONS.bill, (v) => `£${v}`);
const FEE_OPTIONS = options(NETWORK_OPTIONS.feeRate, (v) => (v === 0 ? "None" : formatPercent(v)));
const CHURN_OPTIONS = options(NETWORK_OPTIONS.churn, formatPercent);

const small = "m-0 text-sm leading-[1.5] text-muted";

export function NumbersModel() {
  const { model, answer, finish, toggle } = useFranchise();
  const { answers, values, projection, done, open } = model;

  // A slider in use keeps its step open, even though the model has already
  // closed it (a fully answered step closes at once).
  const [held, setHeld] = useState<StepId | 0>(0);
  const hold = (step: StepId) => (holding: boolean) =>
    setHeld((h) => (holding ? step : h === step ? 0 : h));

  const stepProps = (n: StepId) => {
    const isOpen = open === n || held === n;
    return {
      n,
      open: isOpen,
      done: done[n],
      waiting: !isOpen && !done[n] && n > 1 && !done[(n - 1) as StepId],
      onToggle: () => toggle(n),
    };
  };
  const nextLabel = (n: StepId) =>
    done[n] ? "Done" : n < 3 ? "Continue" : "See my projection";

  const churn = formatPercent(values.churn);
  const churnNew = formatPercent(projection.churnNew);
  const name = platformName(answers.platform);
  // what churn drops to, never under 1%: "4% · at least", "3%", "2% · best case"
  const dropOptions = NETWORK_OPTIONS.drop
    .filter((d) => Math.round((values.churn - d) * 1000) >= 10)
    .map((d, i, all) => ({
      value: d as number,
      label: `${formatPercent(values.churn - d)}${i === 0 ? " · at least" : i === all.length - 1 && all.length === 3 ? " · best case" : ""}`,
    }));
  const members = projection.totalMembers.toLocaleString("en-GB");

  return (
    <div className="grid items-start gap-6 rounded-3xl bg-surface p-4 shadow-[inset_0_0_0_1px_var(--color-line),0_30px_70px_-36px_rgba(21,20,14,0.3)] sm:p-[clamp(16px,2.6vw,28px)] lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <Step
          {...stepProps(1)}
          title="Your network today"
          hint="3 quick questions"
          summary={`${answers.platform ?? "Your platform"} · ${values.units} studios · ${pounds(values.costPerUnit)} a month each`}
        >
          <ChipQuestion
            id="np-platform"
            label="What do your studios use today?"
            options={PLATFORM_OPTIONS}
            value={answers.platform}
            onChange={(v) => answer("platform", v)}
          />
          <SliderQuestion
            id="np-units"
            label="How many studios?"
            display={String(values.units)}
            valueText={`${values.units} studios`}
            value={values.units}
            min={NETWORK_OPTIONS.units.min}
            max={NETWORK_OPTIONS.units.max}
            step={1}
            onChange={(v) => answer("units", v)}
            onHold={hold(1)}
          />
          <SliderQuestion
            id="np-cost"
            label="What does each studio pay it a month?"
            display={pounds(values.costPerUnit)}
            valueText={`${pounds(values.costPerUnit)} a month`}
            value={values.costPerUnit}
            min={NETWORK_OPTIONS.costPerUnit.min}
            max={NETWORK_OPTIONS.costPerUnit.max}
            step={NETWORK_OPTIONS.costPerUnit.step}
            onChange={(v) => answer("costPerUnit", v)}
            onHold={hold(1)}
          />
          <div className="flex flex-wrap items-center gap-3.5">
            <PillButton onClick={() => finish(1)}>{nextLabel(1)}</PillButton>
            <span className={small}>Answer all three and step 2 opens.</span>
          </div>
        </Step>

        <Step
          {...stepProps(2)}
          title="Your income as HQ"
          hint="4 quick questions"
          summary={`${values.members} members · ${pounds(values.bill)} a month · ${pounds(values.techFee)} app fee · ${formatPercent(values.feeRate)} on payments`}
        >
          <ChipQuestion
            id="np-members"
            label="Members per studio, on average"
            options={MEMBER_OPTIONS}
            value={answers.members}
            onChange={(v) => answer("members", v)}
          />
          <ChipQuestion
            id="np-bill"
            label="What a member pays a month, on average"
            options={BILL_OPTIONS}
            value={answers.bill}
            onChange={(v) => answer("bill", v)}
          />
          <SliderQuestion
            id="np-tech"
            label="What each studio pays you for the app, a month"
            display={pounds(values.techFee)}
            valueText={`${pounds(values.techFee)} a month`}
            value={values.techFee}
            min={NETWORK_OPTIONS.techFee.min}
            max={NETWORK_OPTIONS.techFee.max}
            step={NETWORK_OPTIONS.techFee.step}
            onChange={(v) => answer("techFee", v)}
            onHold={hold(2)}
            hint={`Your call. Charge less than ${name} and they save. Charge more and you earn more.`}
          />
          <ChipQuestion
            id="np-fee"
            label="Your fee on every payment members make"
            options={FEE_OPTIONS}
            value={answers.feeRate}
            onChange={(v) => answer("feeRate", v)}
          />
          <div className="flex flex-wrap items-center gap-3.5">
            <PillButton onClick={() => finish(2)}>{nextLabel(2)}</PillButton>
            <span className={small}>Answer all four and step 3 opens.</span>
          </div>
        </Step>

        <Step
          {...stepProps(3)}
          title="Less churn, higher retention"
          hint="What less churn is worth"
          summary={`Churn ${churn} to ${churnNew} · ${projection.keptMonth} more members keep paying each month`}
        >
          <p className="m-0 text-[15px] leading-[1.5] text-muted">
            Members leave most in their first 90 days. A proper 30 to 90-day onboarding
            flow keeps more of them: a welcome, first classes booked, coach check-ins at
            day 30 and 60, members at risk flagged, failed payments chased.
          </p>
          <ChipQuestion
            id="np-churn"
            label="Churn today: members your studios lose a month"
            options={CHURN_OPTIONS}
            value={answers.churn}
            onChange={(v) => answer("churn", v)}
          />
          <ChipQuestion
            id="np-drop"
            label="With proper onboarding, churn drops to"
            options={dropOptions}
            value={answers.drop}
            onChange={(v) => answer("drop", v)}
          />
          <dl className="m-0 flex flex-col gap-2 rounded-2xl bg-paper px-4 py-3.5 text-[15px] leading-[1.4]">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Today, of {members} members</dt>
              <dd className="m-0 font-bold">{projection.lostMonth} leave a month</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">With onboarding, at {churnNew}</dt>
              <dd className="m-0 font-bold">{projection.lostMonthNew} leave a month</dd>
            </div>
            <div className="flex justify-between gap-3 border-t border-line pt-2">
              <dt className="font-bold">
                {projection.keptMonth} more keep paying {pounds(values.bill)}
              </dt>
              <dd className="m-0 font-bold">+{formatMoney(projection.extraRevenueMonth)} a month</dd>
            </div>
          </dl>
          <div className="flex flex-wrap items-center gap-3.5">
            <PillButton onClick={() => finish(3)}>{nextLabel(3)}</PillButton>
          </div>
        </Step>
      </div>

      <NumbersResult />
    </div>
  );
}
