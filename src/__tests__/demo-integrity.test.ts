import { describe, it, expect } from "vitest";
import { initialHelpdeskTickets } from "@/data/demo/helpdesk/initialTickets";
import { sampleApplications, initialIncidentRecords } from "@/data/demo/application-support/initialAppData";
import { sampleSalesTransactions } from "@/data/demo/bi-analytics/initialSales";
import { sampleITSupportMetrics } from "@/data/demo/it-analytics/initialITMetrics";
import { initialFinanceTransactions, initialBudgetLimits } from "@/data/demo/fintrack/initialFinanceData";

describe("OmniTech Interactive Demonstrations Data Integrity", () => {
  it("IT Service Desk should contain diverse tickets across categories and priorities", () => {
    expect(initialHelpdeskTickets.length).toBeGreaterThanOrEqual(10);
    const criticals = initialHelpdeskTickets.filter((t) => t.priority === "Critical");
    expect(criticals.length).toBeGreaterThanOrEqual(1);

    const categories = new Set(initialHelpdeskTickets.map((t) => t.category));
    expect(categories.has("Network")).toBe(true);
    expect(categories.has("Hardware")).toBe(true);
    expect(categories.has("Email / Microsoft 365")).toBe(true);
  });

  it("AppWatch should provide application fleet with realistic latency and error metrics", () => {
    expect(sampleApplications.length).toBeGreaterThanOrEqual(8);
    const degraded = sampleApplications.filter((a) => a.status === "Degraded" || a.status === "Outage");
    expect(degraded.length).toBeGreaterThanOrEqual(1);

    expect(initialIncidentRecords.length).toBeGreaterThanOrEqual(5);
    const rcaCategories = new Set(initialIncidentRecords.map((i) => i.rootCauseCategory));
    expect(rcaCategories.has("Database / SQL")).toBe(true);
  });

  it("InsightHub should calculate valid revenue sums and regional distributions", () => {
    expect(sampleSalesTransactions.length).toBeGreaterThanOrEqual(20);
    const totalRev = sampleSalesTransactions.reduce((acc, t) => acc + t.totalRevenueZAR, 0);
    expect(totalRev).toBeGreaterThan(500000);

    const regions = new Set(sampleSalesTransactions.map((t) => t.region));
    expect(regions.has("Gauteng")).toBe(true);
    expect(regions.has("Western Cape")).toBe(true);
    expect(regions.has("KwaZulu-Natal")).toBe(true);
  });

  it("ITOps Insights should accurately compute SLA compliance percentage", () => {
    expect(sampleITSupportMetrics.length).toBeGreaterThanOrEqual(15);
    const total = sampleITSupportMetrics.length;
    const met = sampleITSupportMetrics.filter((m) => m.slaMet).length;
    const rate = Math.round((met / total) * 100);
    expect(rate).toBeGreaterThanOrEqual(80);
    expect(rate).toBeLessThanOrEqual(100);
  });

  it("FinTrack should provide realistic ZAR balances, savings rates, and budget limits", () => {
    expect(initialFinanceTransactions.length).toBeGreaterThanOrEqual(12);
    const income = initialFinanceTransactions
      .filter((t) => t.type === "Income")
      .reduce((a, b) => a + b.amountZAR, 0);
    const expense = initialFinanceTransactions
      .filter((t) => t.type === "Expense")
      .reduce((a, b) => a + b.amountZAR, 0);

    expect(income).toBeGreaterThan(expense);
    const net = income - expense;
    const rate = Math.round((net / income) * 100);
    expect(rate).toBeGreaterThan(15);

    expect(initialBudgetLimits.length).toBeGreaterThanOrEqual(5);
  });
});
