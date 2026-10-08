"use client";

import React from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowDownToLine, ArrowUpFromLine, Target } from 'lucide-react';
import { formatCurrency } from '@/data/demo/apexwealth/data';

interface NetWorthCardsProps {
  netWorth: number;
  inflow: number;
  outflow: number;
  savingsRate: number;
}

export default function NetWorthCards({ netWorth, inflow, outflow, savingsRate }: NetWorthCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* Total Net Worth */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="text-muted-foreground text-sm font-medium">Total Net Worth</div>
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-foreground font-mono mb-2">
          {formatCurrency(netWorth)}
        </div>
        <div className="flex items-center text-xs font-medium text-emerald-500">
          <TrendingUp className="w-3 h-3 mr-1" />
          <span>+8.4% this month</span>
        </div>
      </div>

      {/* Monthly Cash Inflow */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="text-muted-foreground text-sm font-medium">Monthly Cash Inflow</div>
          <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-500">
            <ArrowDownToLine className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-foreground font-mono mb-2">
          {formatCurrency(inflow)}
        </div>
        <div className="flex items-center text-xs font-medium text-emerald-500">
          <TrendingUp className="w-3 h-3 mr-1" />
          <span>+3.2% vs avg</span>
        </div>
      </div>

      {/* Monthly Outflow */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-destructive/5 rounded-full blur-xl group-hover:bg-destructive/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="text-muted-foreground text-sm font-medium">Monthly Outflow</div>
          <div className="bg-destructive/10 p-2 rounded-lg text-destructive">
            <ArrowUpFromLine className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-foreground font-mono mb-2">
          {formatCurrency(outflow)}
        </div>
        <div className="flex items-center text-xs font-medium text-amber-500">
          <TrendingDown className="w-3 h-3 mr-1" />
          <span>62.4% burn rate</span>
        </div>
      </div>

      {/* Net Savings Rate */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-colors"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="text-muted-foreground text-sm font-medium">Net Savings Rate</div>
          <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-500">
            <Target className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-foreground font-mono mb-2">
          {savingsRate.toFixed(1)}%
        </div>
        <div className="flex items-center text-xs font-medium text-cyan-500">
          <div className="w-full bg-secondary rounded-full h-1.5 mr-2">
            <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${Math.min(savingsRate, 100)}%` }}></div>
          </div>
          <span className="whitespace-nowrap">Target: 30%</span>
        </div>
      </div>
    </div>
  );
}
