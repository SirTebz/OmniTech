"use client";

import React, { useState, useMemo } from "react";
import { DemoShell } from "@/components/demos/DemoShell";
import {
  sampleSalesTransactions,
  SalesTransaction,
} from "@/data/demo/bi-analytics/initialSales";
import {
  BarChart3,
  TrendingUp,
  Download,
  Filter,
  DollarSign,
  ShoppingCart,
  Users,
  Search,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function InsightHubPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleReset = () => {
    setSelectedRegion("All");
    setSelectedCategory("All");
    setSelectedMonth("All");
    setSearchTerm("");
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    return sampleSalesTransactions.filter((tx) => {
      const matchRegion = selectedRegion === "All" || tx.region === selectedRegion;
      const matchCategory = selectedCategory === "All" || tx.category === selectedCategory;
      const matchMonth = selectedMonth === "All" || tx.month === selectedMonth;
      const matchSearch =
        tx.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());

      return matchRegion && matchCategory && matchMonth && matchSearch;
    });
  }, [selectedRegion, selectedCategory, selectedMonth, searchTerm]);

  // Dynamic KPI calculations
  const totalRevenue = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.totalRevenueZAR, 0);
  }, [filteredData]);

  const totalOrders = filteredData.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const avgMargin =
    totalOrders > 0
      ? Math.round(filteredData.reduce((acc, curr) => acc + curr.marginPercent, 0) / totalOrders)
      : 0;

  // Breakdown by Category for Visual Bars
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    filteredData.forEach((tx) => {
      map[tx.category] = (map[tx.category] || 0) + tx.totalRevenueZAR;
    });
    return Object.entries(map).map(([cat, rev]) => ({
      category: cat,
      revenue: rev,
      percentage: totalRevenue > 0 ? Math.round((rev / totalRevenue) * 100) : 0,
    }));
  }, [filteredData, totalRevenue]);

  // Breakdown by Region
  const regionBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    filteredData.forEach((tx) => {
      map[tx.region] = (map[tx.region] || 0) + tx.totalRevenueZAR;
    });
    return Object.entries(map).map(([reg, rev]) => ({
      region: reg,
      revenue: rev,
      percentage: totalRevenue > 0 ? Math.round((rev / totalRevenue) * 100) : 0,
    }));
  }, [filteredData, totalRevenue]);

  // Top Product Insight
  const topProduct = useMemo(() => {
    if (filteredData.length === 0) return "N/A";
    const map: Record<string, number> = {};
    filteredData.forEach((tx) => {
      map[tx.product] = (map[tx.product] || 0) + tx.totalRevenueZAR;
    });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    return sorted[0] ? sorted[0][0] : "N/A";
  }, [filteredData]);

  // Export Filtered Dataset to CSV
  const handleExportCSV = () => {
    if (filteredData.length === 0) return;

    const headers = [
      "Order Number",
      "Date",
      "Month",
      "Customer",
      "Customer Type",
      "Region",
      "Category",
      "Product",
      "Units",
      "Revenue (ZAR)",
      "Margin %",
    ];

    const rows = filteredData.map((tx) => [
      tx.orderNumber,
      tx.date,
      tx.month,
      `"${tx.customerName.replace(/"/g, '""')}"`,
      tx.customerType,
      tx.region,
      `"${tx.category}"`,
      `"${tx.product}"`,
      tx.units,
      tx.totalRevenueZAR,
      `${tx.marginPercent}%`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `InsightHub_Analytics_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DemoShell
      title="InsightHub — Business Intelligence & Sales Analytics"
      badge="Data Analytics & BI"
      category="Data Analytics"
      description="An interactive executive business analytics platform demonstrating dynamic SQL-modeled KPIs, multi-dimensional regional filters, responsive data visualisations, and instant CSV export."
      onReset={handleReset}
    >
      {/* Dynamic KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Filtered Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-500">
            R {totalRevenue.toLocaleString("en-ZA")}
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">South African Rand (ZAR)</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Completed Transactions</span>
            <ShoppingCart className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono">{totalOrders} Orders</div>
          <span className="text-[11px] text-muted-foreground font-mono">100% In-Sample Settlement</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Average Order Value (AOV)</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold font-mono">
            R {avgOrderValue.toLocaleString("en-ZA")}
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">Per Transaction Metric</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Blended Profit Margin</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-500">{avgMargin}%</div>
          <span className="text-[11px] text-muted-foreground font-mono">Software & Retainer Margin</span>
        </div>
      </div>

      {/* Filter Ribbon & CSV Export */}
      <div className="p-4 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search customer, product, order..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            />
          </div>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-background border border-border text-foreground font-mono"
          >
            <option value="All">Region: All (National)</option>
            <option value="Gauteng">Gauteng</option>
            <option value="Western Cape">Western Cape</option>
            <option value="KwaZulu-Natal">KwaZulu-Natal</option>
            <option value="Eastern Cape">Eastern Cape</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-background border border-border text-foreground font-mono"
          >
            <option value="All">Category: All Services</option>
            <option value="Custom Development">Custom Development</option>
            <option value="Managed Support">Managed Support</option>
            <option value="Cloud Infrastructure">Cloud Infrastructure</option>
            <option value="Software Licenses">Software Licenses</option>
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-background border border-border text-foreground font-mono"
          >
            <option value="All">Period: All Months</option>
            <option value="Oct 2026">October 2026</option>
            <option value="Nov 2026">November 2026</option>
          </select>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={filteredData.length === 0}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors disabled:opacity-50 self-start md:self-auto shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Filtered CSV ({filteredData.length})</span>
        </button>
      </div>

      {/* Visual Analytics Grid: Category & Regional Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Contribution */}
        <div className="p-5 rounded-xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <h3 className="text-sm font-bold text-foreground">Revenue by Service Category</h3>
              <p className="text-[11px] text-muted-foreground font-mono">
                Computed dynamically from active filter selection
              </p>
            </div>
            <BarChart3 className="w-4 h-4 text-blue-500" />
          </div>

          <div className="space-y-3 pt-1">
            {categoryBreakdown.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-foreground font-medium">{item.category}</span>
                  <span className="text-muted-foreground">
                    R {item.revenue.toLocaleString("en-ZA")} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-accent overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="p-5 rounded-xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <h3 className="text-sm font-bold text-foreground">Revenue by Geographic Region</h3>
              <p className="text-[11px] text-muted-foreground font-mono">
                Proportion of transaction volume across provinces
              </p>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="space-y-3 pt-1">
            {regionBreakdown.map((item) => (
              <div key={item.region} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-foreground font-medium">{item.region}</span>
                  <span className="text-muted-foreground">
                    R {item.revenue.toLocaleString("en-ZA")} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-accent overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Automated Narrative Insights Card */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-2">
        <div className="flex items-center gap-1.5 font-bold font-mono text-blue-600 dark:text-blue-400">
          <Sparkles className="w-4 h-4" />
          <span>Automated Business Intelligence Narrative</span>
        </div>
        <p className="text-foreground leading-relaxed">
          Based on the current filter selection ({filteredData.length} active transactions), the highest revenue-generating product is{" "}
          <strong>&quot;{topProduct}&quot;</strong>. The average order value sits at{" "}
          <strong>R {avgOrderValue.toLocaleString("en-ZA")}</strong> with an average gross margin of{" "}
          <strong>{avgMargin}%</strong>. Custom Development accounts for the highest single-contract values, while Managed Support delivers predictable monthly recurring cash flow.
        </p>
      </div>

      {/* Detailed Transaction Table */}
      <div className="p-5 rounded-xl bg-card border border-border space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">
            Transactional Record Ledger ({filteredData.length} records)
          </h3>
          <span className="text-[11px] text-muted-foreground font-mono">
            Showing all matching order rows
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Order #</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Region</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-right">Revenue (ZAR)</th>
                <th className="py-2.5 px-3 text-right">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No transactions match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredData.map((tx) => (
                  <tr key={tx.id} className="hover:bg-accent/40 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-foreground">{tx.orderNumber}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{tx.date}</td>
                    <td className="py-2.5 px-3 text-foreground font-sans font-medium">
                      {tx.customerName}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground">{tx.region}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{tx.category}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-500">
                      R {tx.totalRevenueZAR.toLocaleString("en-ZA")}
                    </td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">
                      {tx.marginPercent}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DemoShell>
  );
}
