"use client";

import Link from "next/link";
import { ShieldCheck, Activity, Lock } from "lucide-react";

export function DemoFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-muted-foreground text-sm">
            <Lock className="w-4 h-4" />
            <span>Client-side simulation. No financial data is sent to the server.</span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Zero Server Telemetry</span>
            </div>
            <div className="flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Privacy Sandbox Active</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ApexWealth Demo. A concept by <Link href="/" className="hover:text-emerald-500 transition-colors underline underline-offset-4">OmniTech</Link>.</p>
          <p className="mt-2 md:mt-0">All data shown is simulated mock data.</p>
        </div>
      </div>
    </footer>
  );
}
