"use client";

import { useState } from "react";
import { CodeSnippet } from "@/data/demo/nexushub/types";
import { Copy, Check, Terminal, Play, Loader2 } from "lucide-react";

interface CodeBlockProps {
  snippet: CodeSnippet;
  allowExecution?: boolean;
}

export function CodeBlock({ snippet, allowExecution = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(snippet.output || null);
  const [showOutput, setShowOutput] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setShowOutput(true);
    setTimeout(() => {
      setIsRunning(false);
      setOutput(snippet.output || "Execution completed with status 0 (Success).");
    }, 450);
  };

  const lines = snippet.code.split("\n");

  return (
    <div className="rounded-xl border border-border/80 bg-[#0e1017] dark:bg-[#090b10] overflow-hidden my-3 shadow-lg font-mono text-xs">
      {/* Editor Tab Bar */}
      <div className="flex items-center justify-between border-b border-border/40 bg-[#161922] dark:bg-[#10131b] px-3.5 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-semibold text-slate-300">
            {snippet.fileName || "snippet." + (snippet.language === "typescript" ? "ts" : snippet.language)}
          </span>
          <span className="rounded bg-violet-500/20 px-1.5 py-0.5 text-[9px] uppercase font-bold text-violet-300 border border-violet-500/30">
            {snippet.language}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {allowExecution && (
            <button
              type="button"
              onClick={handleRun}
              disabled={isRunning}
              className="inline-flex items-center gap-1 rounded bg-violet-600 hover:bg-violet-500 text-white px-2 py-1 text-[11px] font-sans font-medium transition-colors disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 fill-current" />
                  <span>Run</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-1 text-[11px] font-sans transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Lines with line numbers */}
      <div className="p-3.5 overflow-x-auto text-[#e2e8f0] leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="w-8 select-none text-right pr-4 text-slate-600 font-mono text-[11px] align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-[11.5px]">{line || " "}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Output Drawer */}
      {showOutput && (
        <div className="border-t border-border/40 bg-[#090b10] p-3 text-[11px] font-mono">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-400">
              <Terminal className="h-3 w-3" />
              Console Output
            </span>
            <span className="text-[10px] text-slate-500">Node v22.1 / Py 3.12 Edge Sandbox</span>
          </div>
          <div className="rounded bg-black/60 p-2 text-emerald-400 whitespace-pre-wrap border border-slate-800">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
