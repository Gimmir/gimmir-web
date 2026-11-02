import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { calLeadConfig, leadEventProps, readLeadSource } from "./lead-source";

describe("lead source from the link", () => {
  it("reads ?landing=true&source=linkedin", () => {
    const lead = readLeadSource("?landing=true&source=linkedin");
    assert.equal(lead.source, "linkedin");
    assert.equal(lead.landing, true);
    assert.deepEqual(leadEventProps(lead), {
      lead_source: "linkedin",
      landing: "true",
    });
  });

  it("falls back to utm_source and keeps the other utm tags", () => {
    const lead = readLeadSource(
      "?utm_source=Google&utm_medium=cpc&utm_campaign=nov-launch",
    );
    assert.equal(lead.source, "google");
    assert.equal(lead.landing, false);
    assert.deepEqual(calLeadConfig(lead), {
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "nov-launch",
    });
  });

  it("passes the source to Cal as utm_source, marking the landing version", () => {
    const lead = readLeadSource("?landing=true&source=linkedin");
    assert.deepEqual(calLeadConfig(lead), {
      utm_source: "linkedin",
      utm_content: "landing",
    });
  });

  it("drops values that aren't plain tokens, and adds nothing without tags", () => {
    const lead = readLeadSource("?source=%3Cscript%3E&utm_campaign=a%20b");
    assert.equal(lead.source, null);
    assert.equal(lead.campaign, null);
    assert.deepEqual(leadEventProps(readLeadSource("")), {});
    assert.deepEqual(calLeadConfig(readLeadSource("?landing=false")), {});
  });
});
