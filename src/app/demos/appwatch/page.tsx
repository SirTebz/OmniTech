"use client";

import React, { useState, useEffect } from "react";
import { DemoShell } from "@/components/demos/DemoShell";
import {
  sampleApplications,
  initialIncidentRecords,
  MonitoredApplication,
  IncidentRecord,
  IncidentSeverity,
  IncidentStatus,
  AppHealthStatus,
} from "@/data/demo/application-support/initialAppData";
import {
  Activity,
  Server,
  AlertOctagon,
  CheckCircle,
  Database,
  Cpu,
  RefreshCw,
  Search,
  Plus,
  Terminal,
  Clock,
  ShieldAlert,
  ArrowRight,
  Layers,
  X,
} from "lucide-react";

const STORAGE_KEY = "omnitech_demo_appwatch_v1";

export default function AppWatchPage() {
  const [apps, setApps] = useState<MonitoredApplication[]>(sampleApplications);
  const [incidents, setIncidents] = useState<IncidentRecord[]>(initialIncidentRecords);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>("inc-01");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [severityFilter, setSeverityFilter] = useState<string>("All");
  const [appSearch, setAppSearch] = useState("");

  // Create Incident Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAppId, setModalAppId] = useState("app-pay");
  const [modalTitle, setModalTitle] = useState("");
  const [modalSummary, setModalSummary] = useState("");
  const [modalSeverity, setModalSeverity] = useState<IncidentSeverity>("High");
  const [modalCategory, setModalCategory] = useState<IncidentRecord["rootCauseCategory"]>("Database / SQL");

  // Simulated Probe State
  const [isProbing, setIsProbing] = useState(false);
  const [probeResult, setProbeResult] = useState<string | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.apps && parsed.incidents) {
          setApps(parsed.apps);
          setIncidents(parsed.incidents);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const saveState = (newApps: MonitoredApplication[], newIncidents: IncidentRecord[]) => {
    setApps(newApps);
    setIncidents(newIncidents);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ apps: newApps, incidents: newIncidents }));
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    saveState(sampleApplications, initialIncidentRecords);
    setSelectedIncidentId(initialIncidentRecords[0].id);
    setProbeResult(null);
  };

  // Filtered Incidents
  const filteredIncidents = incidents.filter((inc) => {
    const matchesStatus = statusFilter === "All" || inc.status === statusFilter;
    const matchesSeverity = severityFilter === "All" || inc.severity === severityFilter;
    return matchesStatus && matchesSeverity;
  });

  const selectedIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  // Actions
  const handleIncidentStatus = (newStatus: IncidentStatus) => {
    const updatedIncidents = incidents.map((i) =>
      i.id === selectedIncident.id
        ? {
            ...i,
            status: newStatus,
            resolvedAt: newStatus === "Resolved" || newStatus === "Closed" ? new Date().toISOString() : i.resolvedAt,
          }
        : i
    );
    saveState(apps, updatedIncidents);
  };

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim() || !modalSummary.trim()) return;

    const targetApp = apps.find((a) => a.id === modalAppId) || apps[0];
    const newInc: IncidentRecord = {
      id: `inc-${Date.now()}`,
      incidentCode: `APP-INC-${Math.floor(800 + Math.random() * 200)}`,
      applicationId: targetApp.id,
      applicationName: targetApp.name,
      title: modalTitle.trim(),
      summary: modalSummary.trim(),
      severity: modalSeverity,
      status: "Investigating",
      assignedEngineer: "Tebogo Z. (Application Support Lead)",
      reportedAt: new Date().toISOString(),
      rootCauseCategory: modalCategory,
      rootCauseNotes: "Automated telemetry alert escalated to application support on-call rotation.",
      resolutionSteps: "Investigating server logs and SQL execution plan for query bottlenecks.",
    };

    // Mark application degraded/outage
    const updatedApps = apps.map((a) =>
      a.id === targetApp.id
        ? {
            ...a,
            status: (modalSeverity === "Critical" ? "Outage" : "Degraded") as AppHealthStatus,
            activeIncidentsCount: a.activeIncidentsCount + 1,
            lastHealthCheck: "Just now",
          }
        : a
    );

    const updatedIncidents = [newInc, ...incidents];
    saveState(updatedApps, updatedIncidents);
    setSelectedIncidentId(newInc.id);
    setIsModalOpen(false);

    // Reset inputs
    setModalTitle("");
    setModalSummary("");
  };

  const runDiagnosticProbe = () => {
    setIsProbing(true);
    setProbeResult(null);
    setTimeout(() => {
      setIsProbing(false);
      setProbeResult(
        `Diagnostic Probe Complete (200 OK)\n- Database Connection Pool: Active (42/50 connections)\n- Latency to DB instance: 4.2ms\n- Deadlock counter: 0 active\n- PayFast Webhook Queue: Drained (0 unacknowledged packets)`
      );
    }, 1200);
  };

  // Metrics
  const operationalCount = apps.filter((a) => a.status === "Operational").length;
  const degradedCount = apps.filter((a) => a.status === "Degraded" || a.status === "Outage").length;
  const activeIncidents = incidents.filter((i) => i.status !== "Resolved" && i.status !== "Closed").length;

  return (
    <DemoShell
      title="AppWatch — Application Support & Observability"
      badge="Application Support"
      category="Application Support"
      description="Simulated production application support control room demonstrating live health telemetry, L1/L2 incident management, root-cause analysis (RCA), and SQL diagnostics."
      onReset={handleReset}
    >
      {/* Fleet Overview KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Monitored Fleet</span>
            <Server className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono">{apps.length} Apps</div>
          <span className="text-[11px] text-muted-foreground font-mono">100% Production Environment</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Operational</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-500">{operationalCount} Systems</div>
          <span className="text-[11px] text-muted-foreground font-mono">99.9% Target Uptime</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Degraded / Alerts</span>
            <AlertOctagon className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-500">{degradedCount} Affected</div>
          <span className="text-[11px] text-muted-foreground font-mono">Latency / Error alerts</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Active Incidents</span>
            <Activity className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-500">{activeIncidents} Open</div>
          <span className="text-[11px] text-muted-foreground font-mono">L1/L2 Incident Triage</span>
        </div>
      </div>

      {/* Application Inventory Fleet Grid */}
      <div className="p-5 rounded-xl bg-card border border-border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-foreground">Production Application Inventory</h3>
            <p className="text-xs text-muted-foreground font-mono">
              Live heartbeat telemetry and latency profiling across critical business services
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate Incident</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {apps.map((app) => (
            <div
              key={app.id}
              className={`p-3.5 rounded-xl border text-xs space-y-2 transition-all ${
                app.status === "Degraded"
                  ? "bg-amber-500/5 border-amber-500/30"
                  : app.status === "Outage"
                  ? "bg-rose-500/5 border-rose-500/30"
                  : "bg-background border-border"
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-semibold text-foreground line-clamp-1">{app.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                    app.status === "Operational"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : app.status === "Degraded"
                      ? "bg-amber-500/10 text-amber-500"
                      : "bg-rose-500/10 text-rose-500"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-muted-foreground pt-1 border-t border-border/60">
                <div>
                  <span className="text-[10px] block">Latency:</span>
                  <span className="text-foreground font-medium">{app.avgLatencyMs}ms</span>
                </div>
                <div>
                  <span className="text-[10px] block">Uptime:</span>
                  <span className="text-foreground font-medium">{app.uptimePercentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident Management Control Plane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Incident List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3.5 rounded-xl bg-card border border-border flex items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-foreground">Incident Queue</span>
            <div className="flex gap-2 text-xs font-mono">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2 py-1 rounded bg-background border border-border text-foreground"
              >
                <option value="All">All Statuses</option>
                <option value="Investigating">Investigating</option>
                <option value="Identified">Identified</option>
                <option value="Resolved">Resolved</option>
              </select>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-2 py-1 rounded bg-background border border-border text-foreground"
              >
                <option value="All">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredIncidents.map((inc) => {
              const isSelected = inc.id === selectedIncident?.id;
              return (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncidentId(inc.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? "bg-accent/70 border-blue-500 shadow-sm"
                      : "bg-card border-border hover:border-neutral-400 dark:hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-foreground">{inc.incidentCode}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        inc.severity === "Critical"
                          ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                          : inc.severity === "High"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1 mb-1">
                    {inc.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span className="truncate max-w-[180px]">{inc.applicationName}</span>
                    <span className="font-semibold text-foreground">{inc.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Incident Investigation Dossier */}
        {selectedIncident && (
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 sm:p-6 rounded-xl bg-card border border-border space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-blue-500">
                      {selectedIncident.incidentCode}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      Target: {selectedIncident.applicationName}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{selectedIncident.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">Status:</span>
                  <select
                    value={selectedIncident.status}
                    onChange={(e) => handleIncidentStatus(e.target.value as IncidentStatus)}
                    className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-background border border-border"
                  >
                    <option value="New">New</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Identified">Identified</option>
                    <option value="Monitoring">Monitoring</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Problem summary */}
              <div className="p-4 rounded-lg bg-background border border-border text-xs space-y-2">
                <span className="text-muted-foreground font-mono block">Incident Telemetry Summary:</span>
                <p className="text-foreground leading-relaxed">{selectedIncident.summary}</p>
                <div className="text-[11px] text-muted-foreground font-mono pt-1 border-t border-border flex justify-between">
                  <span>Assigned Lead: {selectedIncident.assignedEngineer}</span>
                  <span>Reported: {new Date(selectedIncident.reportedAt).toLocaleTimeString()}</span>
                </div>
              </div>

              {/* RCA & Diagnostics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background border border-border space-y-1.5 text-xs">
                  <span className="font-mono text-muted-foreground block text-[11px] uppercase tracking-wider">
                    Root-Cause Classification
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-semibold">
                    <Database className="w-3.5 h-3.5" />
                    <span>{selectedIncident.rootCauseCategory}</span>
                  </div>
                  <p className="text-foreground text-[11px] pt-1">
                    {selectedIncident.rootCauseNotes || "Awaiting complete diagnostic stack trace."}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-background border border-border space-y-1.5 text-xs">
                  <span className="font-mono text-muted-foreground block text-[11px] uppercase tracking-wider">
                    Remediation / Resolution Steps
                  </span>
                  <p className="text-foreground text-[11px] leading-relaxed">
                    {selectedIncident.resolutionSteps || "Remediation patch pending engineer verification."}
                  </p>
                </div>
              </div>

              {/* Simulated Diagnostic Probe Tool */}
              <div className="p-4 rounded-lg bg-neutral-950 text-neutral-200 border border-neutral-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <Terminal className="w-4 h-4" />
                    <span>Simulated Support Diagnostic Probe</span>
                  </span>
                  <button
                    onClick={runDiagnosticProbe}
                    disabled={isProbing}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isProbing ? "animate-spin" : ""}`} />
                    <span>{isProbing ? "Probing System..." : "Execute Probe"}</span>
                  </button>
                </div>

                <div className="p-2.5 rounded bg-black/60 border border-neutral-800 text-[11px] leading-relaxed whitespace-pre-wrap text-emerald-400">
                  {probeResult ||
                    `Ready to test application database connection pool, API health endpoints, and deadlock telemetry for ${selectedIncident.applicationName}. Click 'Execute Probe' to run.`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Incident Simulation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-card border border-border p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Simulate Application Incident</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium mb-1 text-foreground">Impacted Business Application</label>
                <select
                  value={modalAppId}
                  onChange={(e) => setModalAppId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground"
                >
                  {apps.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1 text-foreground">Incident Title / Alert Signature</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Memory spike causing OOM restarts on reporting worker"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1 text-foreground">Severity Level</label>
                  <select
                    value={modalSeverity}
                    onChange={(e) => setModalSeverity(e.target.value as IncidentSeverity)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground"
                  >
                    <option value="Critical">Critical (Outage / Revenue Loss)</option>
                    <option value="High">High (Major Feature Degraded)</option>
                    <option value="Medium">Medium (Intermittent Error)</option>
                    <option value="Low">Low (Cosmetic / Minor Bug)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-foreground">Root-Cause Subsystem</label>
                  <select
                    value={modalCategory}
                    onChange={(e) => setModalCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground"
                  >
                    <option value="Database / SQL">Database / SQL</option>
                    <option value="API / Third-Party">API / Third-Party</option>
                    <option value="Authentication / Token">Authentication / Token</option>
                    <option value="Infrastructure / Memory">Infrastructure / Memory</option>
                    <option value="Configuration">Configuration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-foreground">Incident Diagnostic Summary</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe error code, stack trace signature, and affected user count..."
                  value={modalSummary}
                  onChange={(e) => setModalSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Trigger Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DemoShell>
  );
}
