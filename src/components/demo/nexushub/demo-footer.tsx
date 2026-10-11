"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Wifi, Radio, ArrowUpRight, ShieldCheck } from "lucide-react";

export function DemoFooter() {
  return (
    <footer className="border-t border-border/80 bg-background/50 backdrop-blur-sm py-4 text-xs text-muted-foreground transition-colors">
      <Container size="full" className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Left: Engine identity & Live latency badge */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/70 px-2.5 py-0.5 font-mono text-[11px] text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Wifi className="h-3 w-3 text-emerald-500" />
              <span>WebSocket: 38ms Edge Connected</span>
            </div>

            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
              <Radio className="h-3 w-3 text-violet-500 animate-pulse" />
              <span>Region: af-south-1 (Cape Town)</span>
            </div>
          </div>

          {/* Right: Attribution & Case study links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[12px]">
            <span className="inline-flex items-center gap-1">
              Crafted by{" "}
              <Link
                href="/work"
                className="font-medium text-foreground hover:text-violet-500 underline underline-offset-4 decoration-border transition-colors"
              >
                OmniTech Digital
              </Link>
            </span>

            <span className="text-border">•</span>

            <Link
              href="/work/community-dashboard"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-violet-500" />
              <span>Read Architectural Case Study</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
