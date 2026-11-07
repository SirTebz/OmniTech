"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ShieldAlert, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";

interface DemoShellProps {
  title: string;
  badge: string;
  category: string;
  description: string;
  onReset: () => void;
  resetLabel?: string;
  children: React.ReactNode;
}

export function DemoShell({
  title,
  badge,
  category,
  description,
  onReset,
  resetLabel = "Reset Demo Data",
  children,
}: DemoShellProps) {
  const handleConfirmReset = () => {
    if (window.confirm("Are you sure you want to reset this interactive demo to its initial state? All local modifications will be restored to default.")) {
      onReset();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20">
      {/* Interactive Demo Notice Banner */}
      <div className="bg-blue-600/10 border-b border-blue-500/20 py-2.5 px-4 text-xs font-mono text-blue-700 dark:text-blue-300">
        <Container size="default" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>
              <strong>Interactive Demo</strong> — Zero registration required. Running client-side with realistic simulated data.
            </span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground text-[11px]">
            <span>Local changes persist in your browser</span>
          </div>
        </Container>
      </div>

      <Container size="default" className="py-6 sm:py-8 space-y-8">
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Link href="/work" className="hover:text-foreground inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Projects</span>
              </Link>
              <span>/</span>
              <span className="text-foreground">{category}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
                {title}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {badge}
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              {description}
            </p>
          </div>

          {/* Reset Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleConfirmReset}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-card border border-border hover:bg-accent text-foreground transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              title="Restore original seed dataset"
            >
              <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{resetLabel}</span>
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
            >
              <span>Request Solution</span>
            </Link>
          </div>
        </div>

        {/* Demo Content */}
        {children}
      </Container>
    </div>
  );
}
