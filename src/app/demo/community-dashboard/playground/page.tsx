"use client";

import { Container } from "@/components/ui/container";
import { InteractivePlayground } from "@/components/demo/nexushub/interactive-playground";
import { Terminal, Cpu, Zap, Shield, Sparkles } from "lucide-react";

export default function PlaygroundPage() {
  return (
    <div className="py-8 sm:py-10 bg-background flex-1">
      <Container size="full" className="px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/10 text-violet-600 dark:text-violet-400">
                <Terminal className="h-4 w-4" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Cohort Code Playground
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Isolated web sandbox for collaborative algorithm reviews, Redis scripts, and distributed systems logic.
            </p>
          </div>

          {/* Sandbox Specs */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-muted-foreground">
              <Cpu className="h-3.5 w-3.5 text-violet-500" />
              <span>Node 22 & Python 3.12</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>Cold Start: &lt;15ms</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>128MB MicroVM Sandbox</span>
            </div>
          </div>
        </div>

        {/* Playground Component */}
        <InteractivePlayground />

        {/* Community Snippets Showcase Grid */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-500" />
            <h2 className="text-base font-bold text-foreground">
              Curated Cohort 04 Snippets & Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card p-4 space-y-2 hover:border-violet-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-foreground">pgvector RAG Chunking</span>
                <span className="text-violet-500 font-bold">SQL / TS</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Recursive token splitter with semantic overlap calculation for document indexing.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 space-y-2 hover:border-violet-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-foreground">Distributed Mutex via Redis</span>
                <span className="text-emerald-500 font-bold">Python</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Redlock algorithm pattern with TTL heartbeat renewal to avoid split-brain locks.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 space-y-2 hover:border-violet-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-foreground">Optimistic Queue UI</span>
                <span className="text-indigo-500 font-bold">React 19</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Priority job dequeuing with instant optimistic canvas rendering & reconciliation.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
