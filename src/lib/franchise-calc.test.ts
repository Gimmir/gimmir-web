import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  afterSupportYear,
  formatMoney,
  formatMonths,
  formatPercent,
  networkTotal,
  paybackMonths,
  projectNetwork,
  unitsBucket,
} from "./franchise-calc";

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

describe("the network model (Oleh's landing artboard, churn of 22 Oct)", () => {
  // the artboard's own defaults: 10 studios on Glofox at £250, tech fee
  // starting at £250, 300 members, £100, 1%, churn 5% down 1 point
  const base = {
    units: 10,
    costPerUnit: 250,
    techFee: 250,
    members: 300,
    bill: 100,
    feeRate: 0.01,
    churn: 0.05,
    drop: 0.01,
  };

  it("what leaves the network and what comes to HQ", () => {
    const p = projectNetwork(base);
    assert.equal(p.leavesYear, 30_000);
    assert.equal(p.techFeeYear, 30_000);
    assert.equal(Math.round(p.paymentFeeYear), 36_000);
    assert.equal(Math.round(p.incomeYear), 66_000);
  });

  it("churn 5% down 1 point is 4%; 54% then 61% still there after a year", () => {
    const p = projectNetwork(base);
    assert.equal(p.churnNew, 0.04);
    assert.equal(Math.round(p.stayYear * 100), 54);
    assert.equal(Math.round(p.stayYearNew * 100), 61);
  });

  it("150 then 120 leave a month: 30 kept, £3,000 a month, £36,000 a year, £360 to HQ", () => {
    const p = projectNetwork(base);
    assert.equal(p.totalMembers, 3_000);
    assert.equal(p.lostMonth, 150);
    assert.equal(p.lostMonthNew, 120);
    assert.equal(p.keptMonth, 30);
    assert.equal(p.extraRevenueMonth, 3_000);
    assert.equal(p.extraRevenueYear, 36_000);
    assert.equal(Math.round(p.retentionGainYear), 360);
  });

  it("churn never goes under 1%", () => {
    const p = projectNetwork({ ...base, churn: 0.03, drop: 0.03 });
    assert.equal(p.churnNew, 0.01);
  });

  it("the total adds the retention gain once step 3 is in; payback is after Support", () => {
    const p = projectNetwork(base);
    assert.equal(Math.round(networkTotal(p, false)), 66_000);
    const total = networkTotal(p, true);
    assert.equal(Math.round(total), 66_360);
    // £66,360 − 12 × £980 = £54,600 a year; £12,000 back in about 3 months
    assert.equal(Math.round(afterSupportYear(total)), 54_600);
    assert.equal(paybackMonths(total), 3);
  });

  it("3 studios with no change for franchisees pay back in 18 months", () => {
    const p = projectNetwork({ ...base, units: 3 });
    assert.equal(p.leavesYear, 9_000);
    assert.equal(Math.round(p.incomeYear), 19_800);
    assert.equal(paybackMonths(p.incomeYear), 18);
  });

  it("no payback when Support costs more than the income", () => {
    const p = projectNetwork({ ...base, units: 3, techFee: 0, feeRate: 0 });
    assert.equal(paybackMonths(p.incomeYear), null);
  });
});
