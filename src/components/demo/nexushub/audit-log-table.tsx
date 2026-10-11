"use client";

import { useState } from "react";
import { UserAvatar } from "./user-avatar";
import { AuditLogEntry, AuditLogStatus } from "@/data/demo/nexushub/types";
import { ShieldCheck, ShieldAlert, CheckCircle2, Search, Filter } from "lucide-react";

interface AuditLogTableProps {
  logs: AuditLogEntry[];
}

export function AuditLogTable({ logs }: AuditLogTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLogs = logs.filter((log) => {
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.name.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase()) ||
      log.ipGeo.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusBadge = (status: AuditLogStatus) => {
    switch (status) {
      case "success":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </span>
        );
      case "flagged":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Flagged
          </span>
        );
      case "blocked":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <ShieldAlert className="h-3 w-3" />
            Blocked
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit records or actors..."
            className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(["all", "success", "blocked"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono capitalize transition-all ${
                statusFilter === status
                  ? "bg-violet-600 text-white font-bold"
                  : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {status === "all" ? "All Logs" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-2.5 px-3 uppercase text-[10px] font-bold">Status</th>
              <th className="py-2.5 px-3 uppercase text-[10px] font-bold">Actor</th>
              <th className="py-2.5 px-3 uppercase text-[10px] font-bold">Action Details</th>
              <th className="py-2.5 px-3 uppercase text-[10px] font-bold">Target Resource</th>
              <th className="py-2.5 px-3 uppercase text-[10px] font-bold">Timestamp</th>
              <th className="py-2.5 px-3 uppercase text-[10px] font-bold">Client IP / Origin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-secondary/40 transition-colors">
                <td className="py-3 px-3 whitespace-nowrap">{statusBadge(log.status)}</td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2 font-sans font-medium text-foreground">
                    <UserAvatar name={log.actor.name} size="xs" />
                    <span>{log.actor.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-foreground font-sans max-w-xs truncate">
                  {log.action}
                </td>
                <td className="py-3 px-3 text-muted-foreground font-mono text-[11px] whitespace-nowrap">
                  {log.target}
                </td>
                <td className="py-3 px-3 text-muted-foreground text-[11px] whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="py-3 px-3 text-muted-foreground text-[11px] whitespace-nowrap">
                  {log.ipGeo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
