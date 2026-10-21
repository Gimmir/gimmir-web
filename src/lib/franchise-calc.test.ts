import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  calcCostToday,
  calcRetention,
  calcTechFee,
  formatMoney,
  formatMonths,
  formatPercent,
  growPlan,
  networkTotal,
  paybackMonths,
  projectNetwork,
  STRIPE_RATE,
  unitsBucket,
} from "./franchise-calc";

// The worked examples in Oleh's "Franchise HQ system: features and landing
// calculators" (20 Oct 2026) are the fixtures.
const founding = growPlan(true);
const glofox = {
  costPerUnit: 250,
  paymentFeeRate: STRIPE_RATE,
  cardVolumePerUnit: 18_000,
  otherTech: 0,
  plan: founding,
};
const months = (m: number | null) => (m === null ? null : Math.round(m));

describe("calculator 1: what the network pays today", () => {
  it("Glofox, 7 × £250, Stripe rate: £21,000 out, £7,080 system, £13,920 kept, 10 months", () => {
    const r = calcCostToday({ units: 7, ...glofox });
    assert.equal(r.costTodayYear, 21_000);
    assert.equal(r.systemYear, 7_080);
    assert.equal(r.keptYear, 13_920);
    assert.equal(months(r.paybackMonths), 10);
  });

  it("the platform takes 2.5% on payments: £36,120 out, £29,040 kept, 5 months", () => {
    const r = calcCostToday({ units: 7, ...glofox, paymentFeeRate: 0.025 });
    assert.equal(Math.round(r.costTodayYear), 36_120);
    assert.equal(Math.round(r.keptYear), 29_040);
    assert.equal(months(r.paybackMonths), 5);
  });

  it("15 × £250: £45,000 out, £10,620 system, £34,380 kept, 4 months", () => {
    const r = calcCostToday({ units: 15, ...glofox });
    assert.equal(r.costTodayYear, 45_000);
    assert.equal(r.systemYear, 10_620);
    assert.equal(r.keptYear, 34_380);
    assert.equal(months(r.paybackMonths), 4);
  });

  it("a payment fee below Stripe's rate adds nothing", () => {
    const r = calcCostToday({ units: 7, ...glofox, paymentFeeRate: 0.01 });
    assert.equal(r.extraFeesYear, 0);
  });

  it("the plan is standard Grow once founding slots close", () => {
    const r = calcCostToday({ units: 7, ...glofox, plan: growPlan(false) });
    assert.equal(r.systemYear, 12 * 790);
  });
});

describe("calculator 1, step 7: the tech fee HQ sets", () => {
  const systemYear = 7_080;
  const split = (techFee: number) =>
    calcTechFee({ units: 7, techFee, costPerUnit: 250, systemYear });

  it("£250, same as today: HQ £13,920, franchisees £0, 10 months", () => {
    const r = split(250);
    assert.equal(r.hqIncomeYear, 13_920);
    assert.equal(r.franchiseesSaveYear, 0);
    assert.equal(months(r.paybackMonths), 10);
  });

  it("£200: HQ £9,720, franchisees save £4,200, 15 months", () => {
    const r = split(200);
    assert.equal(r.hqIncomeYear, 9_720);
    assert.equal(r.franchiseesSaveYear, 4_200);
    assert.equal(months(r.paybackMonths), 15);
  });

  it("£150: HQ £5,520, franchisees save £8,400, 26 months", () => {
    const r = split(150);
    assert.equal(r.hqIncomeYear, 5_520);
    assert.equal(r.franchiseesSaveYear, 8_400);
    assert.equal(months(r.paybackMonths), 26);
  });

  it("£0: HQ −£7,080, franchisees save £21,000, no payback from the tech fee", () => {
    const r = split(0);
    assert.equal(r.hqIncomeYear, -7_080);
    assert.equal(r.franchiseesSaveYear, 21_000);
    assert.equal(r.paybackMonths, null);
  });
});

describe("calculator 2: what keeping members longer adds", () => {
  const base = {
    units: 7,
    members: 300,
    bill: 60,
    feeOn: true,
    feeRate: 0.02,
    royalty: 0.07,
    retention: 0.6,
  };

  it("2% fee: £30,240 a year to HQ at every button", () => {
    for (const uplift of [0.03, 0.05, 0.1, 0.15]) {
      assert.equal(
        Math.round(calcRetention({ ...base, uplift }).feeIncomeYear),
        30_240,
      );
    }
  });

  it("the retention buttons: members kept, extra revenue, extra HQ income", () => {
    const rows: Array<[number, number, number, number]> = [
      [0.03, 63, 22_680, 2_041],
      [0.05, 105, 37_800, 3_402],
      [0.1, 210, 75_600, 6_804],
      [0.15, 315, 113_400, 10_206],
    ];
    for (const [uplift, kept, revenue, gain] of rows) {
      const r = calcRetention({ ...base, uplift });
      assert.equal(Math.round(r.membersKept), kept);
      assert.equal(Math.round(r.extraRevenueYear), revenue);
      assert.equal(Math.floor(r.hqGainYear), gain);
    }
  });

  it("defaults with the £250 tech fee: about £47,600 a year, back in about 3 months", () => {
    const r = calcRetention({ ...base, uplift: 0.05 });
    const total = r.feeIncomeYear + r.hqGainYear + 13_920;
    assert.equal(Math.round(total / 100) * 100, 47_600);
    assert.equal(Math.round(12_000 / (total / 12)), 3);
  });

  it("switching the fee off drops it from both lines", () => {
    const r = calcRetention({ ...base, uplift: 0.05, feeOn: false });
    assert.equal(r.feeIncomeYear, 0);
    assert.equal(Math.round(r.hqGainYear), Math.round(37_800 * 0.07));
  });

  it("retention can't pass 100%", () => {
    const r = calcRetention({ ...base, retention: 0.9, uplift: 0.15 });
    assert.equal(Math.round(r.upliftApplied * 100), 10);
  });
});

describe("formatting", () => {
  it("money to the nearest £10, with a real minus sign", () => {
    assert.equal(formatMoney(13_920), "£13,920");
    assert.equal(formatMoney(2_041.2), "£2,040");
    assert.equal(formatMoney(-7_080), "−£7,080");
  });

  it("whole months, never 0", () => {
    assert.equal(formatMonths(10.34), "10");
    assert.equal(formatMonths(0.4), "1");
  });

  it("percentages and the GA4 units bucket", () => {
    assert.equal(formatPercent(0.015), "1.5%");
    assert.equal(formatPercent(0.02), "2%");
    assert.equal(unitsBucket(2), "<3");
    assert.equal(unitsBucket(3), "3-6");
    assert.equal(unitsBucket(7), "7-15");
    assert.equal(unitsBucket(40), "30+");
  });
});

describe("the network model (Oleh's landing artboard)", () => {
  // the artboard's own defaults: 10 studios on Glofox at £250, tech fee
  // starting at £250, 300 members, £60, 1%, churn 5% cut by 20%
  const base = {
    units: 10,
    costPerUnit: 250,
    techFee: 250,
    members: 300,
    bill: 60,
    feeRate: 0.01,
    churn: 0.05,
    cut: 0.2,
  };

  it("what leaves the network and what comes to HQ", () => {
    const p = projectNetwork(base);
    assert.equal(p.leavesYear, 30_000);
    assert.equal(p.techFeeYear, 30_000);
    assert.equal(Math.round(p.paymentFeeYear), 21_600);
    assert.equal(Math.round(p.incomeYear), 51_600);
  });

  it("churn 5% cut by 20% is 4%; 54% then 61% still there after a year", () => {
    const p = projectNetwork(base);
    assert.equal(p.churnNew, 0.04);
    assert.equal(Math.round(p.stayYear * 100), 54);
    assert.equal(Math.round(p.stayYearNew * 100), 61);
  });

  it("360 members kept a year, £129,600 more revenue, £1,296 more to HQ", () => {
    const p = projectNetwork(base);
    assert.equal(p.membersKeptYear, 360);
    assert.equal(p.extraRevenueYear, 129_600);
    assert.equal(Math.round(p.retentionGainYear), 1_296);
  });

  it("the total adds the retention gain only once step 3 is in; payback ~3 months", () => {
    const p = projectNetwork(base);
    assert.equal(Math.round(networkTotal(p, false)), 51_600);
    const total = networkTotal(p, true);
    assert.equal(Math.round(total), 52_896);
    assert.equal(Math.round(paybackMonths(total)!), 3);
  });

  it("3 studios with no change for franchisees", () => {
    const p = projectNetwork({ ...base, units: 3 });
    assert.equal(p.leavesYear, 9_000);
    assert.equal(Math.round(p.incomeYear), 9_000 + 6_480);
  });
});
