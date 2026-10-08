"use client";

import React, { useState, useEffect } from 'react';
import { initialAccounts, formatCurrency } from '@/data/demo/apexwealth/data';
import { AccountsGrid } from '@/components/demo/apexwealth/accounts-grid';
import { RefreshCcw, DollarSign, Euro, ArrowRightLeft } from 'lucide-react';
import { Account } from '@/data/demo/apexwealth/types';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [baseZar, setBaseZar] = useState(1000);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setAccounts(initialAccounts);
  }, []);

  const totalCash = accounts.filter(a => a.type === 'checking' || a.type === 'savings').reduce((acc, curr) => acc + curr.balance, 0);
  const totalInvestments = accounts.filter(a => a.type === 'investment').reduce((acc, curr) => acc + curr.balance, 0);
  const totalCrypto = accounts.filter(a => a.type === 'crypto').reduce((acc, curr) => acc + curr.balance, 0);
  const totalLiabilities = accounts.filter(a => a.type === 'credit').reduce((acc, curr) => acc + curr.balance, 0);

  const totalAssets = totalCash + totalInvestments + totalCrypto;
  const netWorth = totalAssets + totalLiabilities;

  const cashPct = totalAssets > 0 ? (totalCash / totalAssets) * 100 : 0;
  const invPct = totalAssets > 0 ? (totalInvestments / totalAssets) * 100 : 0;
  const cryPct = totalAssets > 0 ? (totalCrypto / totalAssets) * 100 : 0;
  
  // Hardcoded for demo description matching, or dynamic based on calculation above.
  // We'll use the dynamic calculation, but for the prompt's request (44%, 46%, 12%, -2%) we can hardcode the display or just use the real data.
  // With the mock data:
  // Cash: 48250 + 185000 = 233250
  // Investments: 240500
  // Crypto: 62800
  // Credit: -14300
  // Total assets: 536550
  // Cash: 233250 / 536550 = 43.5% (approx 44%)
  // Inv: 240500 / 536550 = 44.8% (approx 45%)
  // Crypto: 62800 / 536550 = 11.7% (approx 12%)

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 space-y-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Net Worth Overview</h1>
        <p className="text-muted-foreground">Manage your connected accounts and view your asset allocation.</p>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Liquid Cash</h3>
          <p className="text-2xl font-semibold font-mono text-emerald-600 dark:text-emerald-500">{formatCurrency(totalCash)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Investments / TFSA</h3>
          <p className="text-2xl font-semibold font-mono text-teal-600 dark:text-teal-500">{formatCurrency(totalInvestments)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Crypto Assets</h3>
          <p className="text-2xl font-semibold font-mono text-cyan-600 dark:text-cyan-500">{formatCurrency(totalCrypto)}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Liabilities</h3>
          <p className="text-2xl font-semibold font-mono text-red-500">{formatCurrency(totalLiabilities)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Asset Allocation */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Asset Allocation</h3>
          
          <div className="h-8 w-full rounded-full overflow-hidden flex bg-secondary mb-6">
            <div className="bg-emerald-500 h-full transition-all duration-1000 ease-out" style={{ width: `${cashPct}%` }} title={`Cash: ${cashPct.toFixed(1)}%`} />
            <div className="bg-teal-500 h-full transition-all duration-1000 ease-out" style={{ width: `${invPct}%` }} title={`Investments: ${invPct.toFixed(1)}%`} />
            <div className="bg-cyan-500 h-full transition-all duration-1000 ease-out" style={{ width: `${cryPct}%` }} title={`Crypto: ${cryPct.toFixed(1)}%`} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <div>
                <p className="text-xs text-muted-foreground">Liquid Cash</p>
                <p className="text-sm font-medium font-mono">{cashPct.toFixed(1)}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-500" />
              <div>
                <p className="text-xs text-muted-foreground">Stocks/TFSA</p>
                <p className="text-sm font-medium font-mono">{invPct.toFixed(1)}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              <div>
                <p className="text-xs text-muted-foreground">Crypto</p>
                <p className="text-sm font-medium font-mono">{cryPct.toFixed(1)}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div>
                <p className="text-xs text-muted-foreground">Debt</p>
                <p className="text-sm font-medium font-mono">{(totalAssets > 0 ? (Math.abs(totalLiabilities) / totalAssets) * 100 : 0).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Currency Converter Widget */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Live Exchange</h3>
            <div className="p-2 bg-secondary rounded-full">
              <RefreshCcw className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">You Sell (ZAR)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-muted-foreground">R</span>
                <input 
                  type="number" 
                  value={baseZar}
                  onChange={(e) => setBaseZar(Number(e.target.value) || 0)}
                  className="w-full bg-background border border-input rounded-lg pl-8 pr-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
            </div>
            
            <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-background border border-border rounded-full p-1.5 shadow-sm">
                <ArrowRightLeft className="w-4 h-4 text-muted-foreground rotate-90" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">You Get (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  readOnly
                  value={(baseZar * 0.053).toFixed(2)}
                  className="w-full bg-secondary border border-transparent rounded-lg pl-8 pr-3 py-2 font-mono text-foreground focus:outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">You Get (EUR)</label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  readOnly
                  value={(baseZar * 0.048).toFixed(2)}
                  className="w-full bg-secondary border border-transparent rounded-lg pl-8 pr-3 py-2 font-mono text-foreground focus:outline-none" 
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      <AccountsGrid accounts={accounts} />

    </div>
  );
}
