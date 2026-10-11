"use client";

import { Container } from "@/components/ui/container";
import { auditLogs } from "@/data/demo/nexushub/data";
import { AuditLogTable } from "@/components/demo/nexushub/audit-log-table";
import { ShieldAlert, ShieldCheck, Activity, Lock, Sliders, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function AuditPage() {
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [antiSpamEnabled, setAntiSpamEnabled] = useState(true);
  const [astSanitizerEnabled, setAstSanitizerEnabled] = useState(true);

  return (
    <div className="py-8 sm:py-10 bg-background flex-1">
      <Container size="full" className="px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/10 text-violet-600 dark:text-violet-400">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Activity Auditing & Anti-Spam Security
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Comprehensive role event logs, sandbox execution audits, and automated heuristic moderation filters.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Security Status: 100% Operational
            </span>
          </div>
        </div>

        {/* Security Metric Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Total Audit Events</span>
              <Activity className="h-4 w-4 text-violet-500" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-foreground">34,892</div>
            <div className="text-[11px] text-emerald-500 font-mono">Immutable append-only ledger</div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Security Flags Blocked</span>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-foreground">142</div>
            <div className="text-[11px] text-muted-foreground font-mono">Zero false positives</div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Websocket Broadcast Latency</span>
              <Activity className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-emerald-500">38ms</div>
            <div className="text-[11px] text-muted-foreground font-mono">Edge fan-out via Redis pub/sub</div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Role Privilege Integrity</span>
              <Lock className="h-4 w-4 text-violet-500" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-foreground">100%</div>
            <div className="text-[11px] text-violet-500 font-mono">Granular RBAC boundaries</div>
          </div>
        </div>

        {/* Anti-Spam Moderation Rules Simulator */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-violet-500" />
              <h2 className="text-base font-bold text-foreground">
                Automated Security & Moderation Filters
              </h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Real-time Rule Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="rounded-xl border border-border/80 bg-secondary/40 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Token Bucket Rate Limiting</span>
                <input
                  type="checkbox"
                  checked={rateLimitEnabled}
                  onChange={(e) => setRateLimitEnabled(e.target.checked)}
                  className="rounded text-violet-600 focus:ring-violet-500 h-4 w-4"
                />
              </div>
              <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">
                Limits post and message creation frequency to 60 requests/minute per authenticated session.
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-secondary/40 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Suspicious Link Scanner</span>
                <input
                  type="checkbox"
                  checked={antiSpamEnabled}
                  onChange={(e) => setAntiSpamEnabled(e.target.checked)}
                  className="rounded text-violet-600 focus:ring-violet-500 h-4 w-4"
                />
              </div>
              <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">
                Flags unverified external domains and URL-shorteners posted by accounts under 7 days old.
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-secondary/40 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">AST Sandbox Sanitizer</span>
                <input
                  type="checkbox"
                  checked={astSanitizerEnabled}
                  onChange={(e) => setAstSanitizerEnabled(e.target.checked)}
                  className="rounded text-violet-600 focus:ring-violet-500 h-4 w-4"
                />
              </div>
              <p className="text-[11px] font-sans text-muted-foreground leading-relaxed">
                Prevents prototype pollution and malicious sys-calls prior to passing code to the runner.
              </p>
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <AuditLogTable logs={auditLogs} />
      </Container>
    </div>
  );
}
