"use client";

import React from 'react';
import { Shield, Plus, Upload, LineChart as LineChartIcon, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { initialAccounts, initialTransactions, initialBudgets, cashflowHistory, calculateNetWorth, calculateMonthlyTotals, formatCurrency } from '@/data/demo/apexwealth/data';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import CashflowChart from '@/components/demo/apexwealth/cashflow-chart';
import ExpenseDonutChart from '@/components/demo/apexwealth/expense-donut-chart';
import NetWorthCards from '@/components/demo/apexwealth/net-worth-card';

export default function PersonalFinanceTracker() {
  const netWorth = calculateNetWorth(initialAccounts);
  const { income, expenses, savingsRate } = calculateMonthlyTotals(initialTransactions);

  const recentTransactions = initialTransactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 pt-8">
      <Container>
        {/* Header / Hero */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">ApexWealth Intelligence</h1>
              <div className="flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-500 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
                <Shield className="w-3.5 h-3.5" />
                <span>Encrypted Session</span>
              </div>
            </div>
            <p className="text-muted-foreground">Client-Side Financial Analytics & Net Worth Intelligence</p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" className="hidden md:flex">
              <Upload className="w-4 h-4 mr-2" /> Import CSV
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Add Transaction
            </Button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="mb-8">
          <NetWorthCards 
            netWorth={netWorth}
            inflow={income}
            outflow={expenses}
            savingsRate={savingsRate}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <CashflowChart data={cashflowHistory} height={320} />

            {/* Recent Transactions Widget */}
            <div className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                <a href="#" className="text-sm text-primary hover:underline font-medium">View All</a>
              </div>
              <div className="space-y-3">
                {recentTransactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'inflow' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-secondary text-muted-foreground'}`}>
                        {t.type === 'inflow' ? <ArrowUpFromLine className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{t.description}</div>
                        <div className="text-xs text-muted-foreground">{t.merchant} • {t.date}</div>
                      </div>
                    </div>
                    <div className={`font-mono font-medium ${t.type === 'inflow' ? 'text-emerald-500' : 'text-foreground'}`}>
                      {t.type === 'inflow' ? '+' : ''}{formatCurrency(t.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <ExpenseDonutChart transactions={initialTransactions} />

            {/* Category Budget Health */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="text-lg font-semibold mb-4">Budget Health</h3>
              <div className="space-y-4">
                {initialBudgets.slice(0, 4).map(b => {
                  const percent = (b.spent / b.limit) * 100;
                  const isWarning = percent > 85;
                  return (
                    <div key={b.id}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium">{b.category}</span>
                        <span className="text-muted-foreground font-mono">{formatCurrency(b.spent)} / {formatCurrency(b.limit)}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${isWarning ? 'bg-amber-500' : 'bg-primary'}`} 
                          style={{ width: `${Math.min(percent, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Financial Health Scorecard */}
            <div className="bg-card rounded-xl border border-border p-5 bg-gradient-to-br from-card to-emerald-500/5">
              <h3 className="text-lg font-semibold mb-2">Financial Health</h3>
              <div className="flex items-end space-x-2 mb-4">
                <span className="text-4xl font-bold font-mono text-emerald-500">88</span>
                <span className="text-muted-foreground mb-1">/100 (Excellent)</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-muted-foreground"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Liquidity</span>
                  <span className="font-medium">Optimal</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-muted-foreground"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Savings Velocity</span>
                  <span className="font-medium">High</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-muted-foreground"><AlertCircle className="w-4 h-4 mr-2 text-amber-500" /> Diversification</span>
                  <span className="font-medium">Moderate</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="secondary">
                <LineChartIcon className="w-4 h-4 mr-2" /> Run Forecast
              </Button>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}

// Inline fallback for the icon we used
function ArrowUpFromLine(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 9-6-6-6 6" />
      <path d="M12 3v14" />
      <path d="M5 21h14" />
    </svg>
  )
}
