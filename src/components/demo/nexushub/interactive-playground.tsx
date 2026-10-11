"use client";

import { useState } from "react";
import { Play, RotateCcw, Copy, Check, Terminal, Share2, Sparkles, Loader2, Code2 } from "lucide-react";
import { CodeLanguage } from "@/data/demo/nexushub/types";

interface Template {
  id: string;
  name: string;
  language: CodeLanguage;
  fileName: string;
  code: string;
  expectedOutput: string;
}

const TEMPLATES: Template[] = [
  {
    id: "ts-ws",
    name: "TypeScript — WebSocket Reconnection Engine",
    language: "typescript",
    fileName: "socket-reconnect.ts",
    code: `// WebSocket client with exponential backoff & heartbeat keepalive
export class ResilientSocket {
  private ws: WebSocket | null = null;
  private attempt = 0;
  private maxRetries = 5;

  constructor(private url: string) {
    this.connect();
  }

  private connect() {
    console.log(\`[WS] Connecting to \${this.url} (attempt \${this.attempt + 1})...\`);
    // Simulated connection attempt
    setTimeout(() => {
      console.log("[WS] Handshake established with NexusHub edge gateway.");
      console.log("[WS] Subscribed to channels: ['#code-review', '#general']");
      console.log("[WS] Heartbeat pulse ping interval set to 15,000ms.");
    }, 120);
  }

  public send(event: string, payload: unknown) {
    console.log(\`[WS -> Outbound] \${event}:\`, JSON.stringify(payload));
  }
}

const client = new ResilientSocket("wss://gateway.nexushub.dev/v1/cohort");
client.send("code_sync", { file: "app.tsx", cursor: { line: 42, col: 12 } });`,
    expectedOutput: `[WS] Connecting to wss://gateway.nexushub.dev/v1/cohort (attempt 1)...
[WS -> Outbound] code_sync: {"file":"app.tsx","cursor":{"line":42,"col":12}}
[WS] Handshake established with NexusHub edge gateway.
[WS] Subscribed to channels: ['#code-review', '#general']
[WS] Heartbeat pulse ping interval set to 15,000ms.
✓ Connection healthy | Round-trip latency: 38ms`,
  },
  {
    id: "py-limiter",
    name: "Python — Token-Bucket Rate Limiter with Redis",
    language: "python",
    fileName: "rate_limiter.py",
    code: `# Token-bucket algorithm for API throttling
import time
from typing import Tuple

class TokenBucket:
    def __init__(self, capacity: int, refill_rate_per_sec: float):
        self.capacity = capacity
        self.refill_rate = refill_rate_per_sec
        self.tokens = float(capacity)
        self.last_refill = time.time()

    def consume(self, amount: int = 1) -> Tuple[bool, float]:
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(float(self.capacity), self.tokens + elapsed * self.refill_rate)
        self.last_refill = now

        if self.tokens >= amount:
            self.tokens -= amount
            return True, self.tokens
        return False, self.tokens

limiter = TokenBucket(capacity=50, refill_rate_per_sec=10.0)
allowed, remaining = limiter.consume(5)
print(f"Request accepted: {allowed} | Remaining tokens in bucket: {remaining:.1f}")`,
    expectedOutput: `Request accepted: True | Remaining tokens in bucket: 45.0
✓ Evaluation complete in 0.04ms | Zero lock contention detected`,
  },
  {
    id: "sql-retention",
    name: "SQL — Cohort Activity & Retention Matrix Query",
    language: "sql",
    fileName: "cohort_retention.sql",
    code: `-- Windowed aggregation for weekly active member retention
WITH weekly_cohorts AS (
    SELECT 
        id AS member_id,
        DATE_TRUNC('week', joined_date) AS cohort_week
    FROM community_members
),
activity_logs AS (
    SELECT 
        actor_id,
        DATE_TRUNC('week', created_at) AS active_week
    FROM discussion_posts
)
SELECT 
    c.cohort_week,
    COUNT(DISTINCT c.member_id) AS total_cohort_members,
    COUNT(DISTINCT a.actor_id) AS active_in_week,
    ROUND(
        COUNT(DISTINCT a.actor_id)::numeric / COUNT(DISTINCT c.member_id) * 100, 
        2
    ) AS retention_pct
FROM weekly_cohorts c
LEFT JOIN activity_logs a 
    ON c.member_id = a.actor_id 
    AND a.active_week >= c.cohort_week
GROUP BY c.cohort_week
ORDER BY c.cohort_week DESC
LIMIT 4;`,
    expectedOutput: `cohort_week          | total_members | active_members | retention_pct
---------------------+---------------+----------------+--------------
2024-06-03 00:00:00  | 38            | 34             | 89.47%
2024-05-27 00:00:00  | 42            | 36             | 85.71%
2024-05-20 00:00:00  | 30            | 28             | 93.33%
(4 rows returned in 12ms via PostgreSQL pgvector engine)`,
  },
];

export function InteractivePlayground() {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [currentCode, setCurrentCode] = useState(TEMPLATES[0].code);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeTemplate = TEMPLATES[selectedTemplateIndex];

  const handleSelectTemplate = (idx: number) => {
    setSelectedTemplateIndex(idx);
    setCurrentCode(TEMPLATES[idx].code);
    setOutput(null);
  };

  const handleReset = () => {
    setCurrentCode(activeTemplate.code);
    setOutput(null);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setOutput(activeTemplate.expectedOutput);
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentCode.split("\n");

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl space-y-0">
      {/* Top Header Bar: Language Templates */}
      <div className="flex flex-wrap items-center justify-between border-b border-border/80 bg-[#161922] dark:bg-[#10131b] px-4 py-3 gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {TEMPLATES.map((tmpl, idx) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => handleSelectTemplate(idx)}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all ${
                selectedTemplateIndex === idx
                  ? "bg-violet-600 text-white font-bold shadow-xs"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {tmpl.name}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 text-xs font-mono transition-colors"
            title="Reset code"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 text-xs font-mono transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Run Code (Ctrl+Enter)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor & Console Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Editor Area (7 cols) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-border/80 bg-[#0e1017] dark:bg-[#080a0f] p-4 font-mono text-xs text-[#e2e8f0] flex flex-col justify-between">
          <div className="flex-1 flex gap-3">
            {/* Line numbers */}
            <div className="select-none text-right pr-2 text-slate-600 font-mono text-xs leading-relaxed space-y-0.5">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Editable Textarea */}
            <textarea
              value={currentCode}
              onChange={(e) => setCurrentCode(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  e.preventDefault();
                  handleRun();
                }
              }}
              spellCheck={false}
              className="w-full h-full bg-transparent resize-none focus:outline-none font-mono text-xs text-[#e2e8f0] leading-relaxed overflow-x-auto whitespace-pre"
            />
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>File: {activeTemplate.fileName}</span>
            <span>UTF-8 • {activeTemplate.language.toUpperCase()}</span>
          </div>
        </div>

        {/* Output Console (5 cols) */}
        <div className="lg:col-span-5 bg-[#090b10] dark:bg-[#050608] p-4 flex flex-col justify-between font-mono text-xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-300">
                <Terminal className="h-4 w-4 text-emerald-400" />
                Interactive Stdout
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                Sandbox Ready
              </span>
            </div>

            {output ? (
              <div className="rounded-xl border border-slate-800 bg-black/70 p-3.5 text-emerald-400 whitespace-pre-wrap leading-relaxed shadow-inner">
                {output}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-slate-500 space-y-2">
                <Code2 className="h-6 w-6 mx-auto text-slate-600" />
                <p>Click &quot;Run Code&quot; or press Ctrl+Enter to execute this snippet against the isolated Node 22 / Python sandbox.</p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Memory: 24MB / 128MB</span>
            <span>V8 Engine • Edge MicroVM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
