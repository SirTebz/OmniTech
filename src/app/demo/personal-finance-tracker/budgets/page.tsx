"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { BudgetPlanner } from "@/components/demo/apexwealth/budget-planner";
import { ForecastSimulator } from "@/components/demo/apexwealth/forecast-simulator";

export default function BudgetsPage() {
  const [activeTab, setActiveTab] = useState<"budgets" | "forecast">("budgets");

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="border-b border-border bg-card">
        <Container>
          <div className="pt-8 pb-4 flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Budgets & Forecasts</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Control your monthly spending and simulate your long-term wealth growth.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab("budgets")}
                className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "budgets" ? "border-emerald-500 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly Budgets
              </button>
              <button 
                onClick={() => setActiveTab("forecast")}
                className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "forecast" ? "border-emerald-500 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Wealth Simulator
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        {activeTab === "budgets" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BudgetPlanner />
            <div className="mt-8 p-6 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
              <h3 className="text-lg font-semibold text-foreground mb-2">Automated Savings Rules</h3>
              <p className="text-sm text-muted-foreground mb-4">Set up smart rules to automatically invest surplus cash at the end of the month.</p>
              <div className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border w-max">
                <input type="checkbox" className="w-5 h-5 accent-emerald-500" defaultChecked />
                <span className="text-sm">Sweep remaining grocery budget to <strong>Investment Account</strong> on 1st of month.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "forecast" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ForecastSimulator />
          </div>
        )}
      </Container>
    </div>
  );
}
