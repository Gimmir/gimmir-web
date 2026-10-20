import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  calcHqIncome,
  formatMoney,
  formatMonths,
  roundMoney,
  roundMonths,
} from "./franchise-calc";

const base = { techFee: 150, members: 300, avgPayment: 60, feeRate: 0.01 };

describe("calcHqIncome", () => {
  // The worked example and the 4 unit-test cases from Oleh's offer plan.
  it("7 units: £1,050 + £1,260 − £590 = £1,720 a month, back in about 7 months", () => {
    const r = calcHqIncome({ units: 7, ...base });
    assert.equal(r.techFeeIncome, 1050);
    assert.equal(r.paymentFeeIncome, 1260);
    assert.equal(r.plan, 590);
    assert.equal(r.monthly, 1720);
    assert.equal(r.yearly, 20640);
    assert.equal(roundMonths(r.paybackMonths!), 7);
    assert.equal(r.techFeeYear, 12600);
  });

  it("10 units: £2,710 a month", () => {
    assert.equal(calcHqIncome({ units: 10, ...base }).monthly, 2710);
  });

  it("15 units: £4,065 a month, the plan above its minimum", () => {
    const r = calcHqIncome({ units: 15, ...base });
    assert.equal(r.plan, 885);
    assert.equal(r.monthly, 4065);
  });

  it("25 units: £6,775 a month", () => {
    assert.equal(calcHqIncome({ units: 25, ...base }).monthly, 6775);
  });

  // The calculator's default since the offer widened to 3+ units.
  it("3 units: £400 a month, back in 30 months", () => {
    const r = calcHqIncome({ units: 3, ...base });
    assert.equal(r.monthly, 400);
    assert.equal(roundMonths(r.paybackMonths!), 30);
  });

  it("no payback when income is zero or less", () => {
    const r = calcHqIncome({ units: 1, ...base, techFee: 0, avgPayment: 0 });
    assert.ok(r.monthly <= 0);
    assert.equal(r.paybackMonths, null);
  });

  it("per-unit delta: platform fee minus tech fee, signed", () => {
    assert.equal(calcHqIncome({ units: 7, ...base, platformFee: 250 }).perUnitDelta, 100);
    assert.equal(calcHqIncome({ units: 7, ...base, platformFee: 100 }).perUnitDelta, -50);
    assert.equal(calcHqIncome({ units: 7, ...base }).perUnitDelta, null);
  });
});

describe("rounding and formatting", () => {
  it("money to the nearest £10, halves away from zero", () => {
    assert.equal(roundMoney(4065), 4070);
    assert.equal(roundMoney(6775), 6780);
    assert.equal(roundMoney(1720), 1720);
    assert.equal(roundMoney(-405), -410);
  });

  it("months to the nearest half", () => {
    assert.equal(roundMonths(12000 / 1720), 7);
    assert.equal(roundMonths(12000 / 1060), 11.5);
  });

  it("formats pounds and months for the page", () => {
    assert.equal(formatMoney(1720), "£1,720");
    assert.equal(formatMoney(20640), "£20,640");
    assert.equal(formatMoney(-400), "−£400");
    assert.equal(formatMonths(11.32), "11.5");
    assert.equal(formatMonths(6.98), "7");
  });
});
