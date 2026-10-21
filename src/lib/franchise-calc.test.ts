import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
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
