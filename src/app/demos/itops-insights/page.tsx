"use client";

import React, { useState, useMemo } from "react";
import { DemoShell } from "@/components/demos/DemoShell";
import {
  sampleITSupportMetrics,
  ITTicketMetric,
} from "@/data/demo/it-analytics/initialITMetrics";
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  UserCheck,
  Search,
  Download,
  BarChart2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function ITOpsInsightsPage() {
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleReset = () => {
    setSelectedTech("All");
    setSelectedPriority("All");
    setSelectedCategory("All");
    setSearchTerm("");
  };

  const filteredMetrics = useMemo(() => {
    return sampleITSupportMetrics.filter((m) => {
      const matchTech = selectedTech === "All" || m.technician === selectedTech;
      const matchPriority = selectedPriority === "All" || m.priority === selectedPriority;
      const matchCategory = selectedCategory === "All" || m.category === selectedCategory;
      const matchSearch =
        m.ticketCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.technician.toLowerCase().includes(searchTerm.toLowerCase());

      return matchTech && matchPriority && matchCategory && matchSearch;
    });
  }, [selectedTech, selectedPriority, selectedCategory, searchTerm]);

  // SLA calculations
  const totalTickets = filteredMetrics.length;
  const slaMetCount = filteredMetrics.filter((m) => m.slaMet).length;
  const slaComplianceRate = totalTickets > 0 ? Math.round((slaMetCount / totalTickets) * 100) : 100;

  const avgFirstResponse =
    totalTickets > 0
      ? Math.round(filteredMetrics.reduce((acc, curr) => acc + curr.firstResponseMinutes, 0) / totalTickets)
      : 0;

  const avgResolutionTime =
    totalTickets > 0
      ? (filteredMetrics.reduce((acc, curr) => acc + curr.resolutionTimeHours, 0) / totalTickets).toFixed(1)
      : "0";

  const reopenedTickets = filteredMetrics.filter((m) => m.reopened).length;

  // Breakdown by Technician
  const techBreakdown = useMemo(() => {
    const map: Record<string, { count: number; slaMet: number; totalHours: number }> = {};
    filteredMetrics.forEach((m) => {
      if (!map[m.technician]) {
        map[m.technician] = { count: 0, slaMet: 0, totalHours: 0 };
      }
      map[m.technician].count += 1;
      if (m.slaMet) map[m.technician].slaMet += 1;
      map[m.technician].totalHours += m.resolutionTimeHours;
    });

    return Object.entries(map).map(([tech, data]) => ({
      technician: tech,
      tickets: data.count,
      slaRate: Math.round((data.slaMet / data.count) * 100),
      avgHours: (data.totalHours / data.count).toFixed(1),
    }));
  }, [filteredMetrics]);

  // Breakdown by Category
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    filteredMetrics.forEach((m) => {
      map[m.category] = (map[m.category] || 0) + 1;
    });
    return Object.entries(map).map(([cat, count]) => ({
      category: cat,
      count,
      percentage: totalTickets > 0 ? Math.round((count / totalTickets) * 100) : 0,
    }));
  }, [filteredMetrics, totalTickets]);

  // Export CSV
  const handleExportCSV = () => {
    if (filteredMetrics.length === 0) return;

    const headers = [
      "Ticket Code",
      "Log Date",
      "Category",
      "Priority",
      "Technician",
      "First Response (mins)",
      "Resolution Time (hours)",
      "SLA Target (hours)",
      "SLA Met",
      "Reopened",
      "Satisfaction Score",
    ];

    const rows = filteredMetrics.map((m) => [
      m.ticketCode,
      m.logDate,
      `"${m.category}"`,
      m.priority,
      `"${m.technician}"`,
      m.firstResponseMinutes,
      m.resolutionTimeHours,
      m.slaTargetHours,
      m.slaMet ? "YES" : "NO",
      m.reopened ? "YES" : "NO",
      m.satisfactionScore,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ITOps_Insights_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DemoShell
      title="ITOps Insights — IT Service Performance Analytics"
      badge="IT Support & Analytics"
      category="IT Support / Data Analytics"
      description="An operational IT service desk analytics dashboard calculating resolution velocities, SLA compliance percentages, technician workload distributions, and incident category frequencies."
      onReset={handleReset}
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">SLA Compliance Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-500">{slaComplianceRate}%</div>
          <span className="text-[11px] text-muted-foreground font-mono">
            {slaMetCount} of {totalTickets} Tickets met SLA
          </span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Avg First Response</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono">{avgFirstResponse} min</div>
          <span className="text-[11px] text-muted-foreground font-mono">Initial Engineer Contact</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Avg Resolution Velocity</span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold font-mono">{avgResolutionTime} hrs</div>
          <span className="text-[11px] text-muted-foreground font-mono">From Log to Closure</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Ticket Reopen Rate</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-500">
            {reopenedTickets} ({totalTickets > 0 ? Math.round((reopenedTickets / totalTickets) * 100) : 0}%)
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">Recurring / Bounced Issues</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search ticket code, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            />
          </div>

          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-background border border-border text-foreground font-mono"
          >
            <option value="All">Technician: All Team</option>
            <option value="Tebogo Z.">Tebogo Z.</option>
            <option value="Sipho M.">Sipho M.</option>
            <option value="Lerato K.">Lerato K.</option>
            <option value="Dylan P.">Dylan P.</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-background border border-border text-foreground font-mono"
          >
            <option value="All">Priority: All</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-background border border-border text-foreground font-mono"
          >
            <option value="All">Category: All</option>
            <option value="Network">Network</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="M365 / Email">M365 / Email</option>
            <option value="User Access">User Access</option>
            <option value="Printer">Printer</option>
          </select>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={filteredMetrics.length === 0}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors disabled:opacity-50 self-start md:self-auto shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Metrics CSV ({filteredMetrics.length})</span>
        </button>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Frequency by Category */}
        <div className="p-5 rounded-xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <h3 className="text-sm font-bold text-foreground">Incident Volume by Subsystem</h3>
              <p className="text-[11px] text-muted-foreground font-mono">
                Identifies recurring failure points in IT infrastructure
              </p>
            </div>
            <BarChart2 className="w-4 h-4 text-blue-500" />
          </div>

          <div className="space-y-3 pt-1">
            {categoryBreakdown.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-foreground font-medium">{item.category}</span>
                  <span className="text-muted-foreground">
                    {item.count} tickets ({item.percentage}%)
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

        {/* Technician Workload & SLA Matrix */}
        <div className="p-5 rounded-xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <h3 className="text-sm font-bold text-foreground">Technician Resolution Matrix</h3>
              <p className="text-[11px] text-muted-foreground font-mono">
                Workload allocation, average turnaround, and SLA compliance
              </p>
            </div>
            <UserCheck className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-[10px] uppercase">
                  <th className="py-2 px-2">Technician</th>
                  <th className="py-2 px-2 text-center">Tickets</th>
                  <th className="py-2 px-2 text-center">Avg Time</th>
                  <th className="py-2 px-2 text-right">SLA Met %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {techBreakdown.map((tb) => (
                  <tr key={tb.technician} className="hover:bg-accent/40 transition-colors">
                    <td className="py-2 px-2 font-semibold text-foreground font-sans">
                      {tb.technician}
                    </td>
                    <td className="py-2 px-2 text-center text-muted-foreground">{tb.tickets}</td>
                    <td className="py-2 px-2 text-center text-muted-foreground">{tb.avgHours} hrs</td>
                    <td className="py-2 px-2 text-right font-bold text-emerald-500">
                      {tb.slaRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Operational Insights Card */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-2">
        <div className="flex items-center gap-1.5 font-bold font-mono text-blue-600 dark:text-blue-400">
          <Sparkles className="w-4 h-4" />
          <span>Operational ITIL Takeaways</span>
        </div>
        <p className="text-foreground leading-relaxed">
          Overall service desk SLA compliance is healthy at <strong>{slaComplianceRate}%</strong>.
          Network incidents demand the fastest initial triage (averaging under 10 minutes), while printer hardware issues present the longest backlog latency. Tebogo Z. maintains a 100% SLA compliance rate across critical tickets, confirming optimal allocation for high-severity escalations.
        </p>
      </div>
    </DemoShell>
  );
}
