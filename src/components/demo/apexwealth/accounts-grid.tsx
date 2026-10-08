"use client";

import React, { useState } from 'react';
import { ShieldCheck, Plus, Banknote, Landmark, Bitcoin, CreditCard, Wallet, ArrowRightLeft } from 'lucide-react';
import { Account } from '@/data/demo/apexwealth/types';
import { formatCurrency } from '@/data/demo/apexwealth/data';

export function AccountsGrid({ accounts }: { accounts: Account[] }) {
  const [currency, setCurrency] = useState<"ZAR" | "USD" | "EUR">("ZAR");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const exchangeRates = {
    ZAR: 1,
    USD: 0.053,
    EUR: 0.048,
  };

  const getConvertedBalance = (balance: number) => {
    return balance * exchangeRates[currency];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "checking": return <Wallet className="w-5 h-5" />;
      case "savings": return <Banknote className="w-5 h-5" />;
      case "investment": return <Landmark className="w-5 h-5" />;
      case "crypto": return <Bitcoin className="w-5 h-5" />;
      case "credit": return <CreditCard className="w-5 h-5" />;
      default: return <Wallet className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Your Accounts</h2>
        <div className="flex items-center gap-3">
          <div className="flex bg-secondary rounded-lg p-1">
            {(["ZAR", "USD", "EUR"] as const).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${currency === cur ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {cur}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div key={account.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-inner"
                  style={{ backgroundColor: account.color }}
                >
                  {getTypeIcon(account.type)}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{account.institution}</h3>
                  <p className="text-sm text-muted-foreground">{account.name}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                {account.accountNumber}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-1">Balance</p>
              <p className="text-2xl font-semibold font-mono text-foreground">
                {formatCurrency(getConvertedBalance(account.balance), currency)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
              {account.isEncrypted ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-500 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  Encrypted on Device
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">Standard Security</div>
              )}
              
              <div className="flex gap-2">
                <button className="text-xs bg-secondary hover:bg-secondary/80 text-foreground px-3 py-1.5 rounded-md font-medium transition-colors">
                  Transfer
                </button>
                <button className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 dark:text-emerald-400 px-3 py-1.5 rounded-md font-medium transition-colors">
                  Ledger
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-1">Add New Account</h3>
              <p className="text-sm text-muted-foreground mb-6">Connect a new financial institution securely.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Institution Name</label>
                  <input type="text" className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. FNB, Standard Bank" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Account Type</label>
                  <select className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Checking</option>
                    <option>Savings</option>
                    <option>Investment</option>
                    <option>Crypto</option>
                    <option>Credit</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setIsAddOpen(false)}
                  className="flex-1 bg-secondary text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsAddOpen(false)}
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Connect Securely
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
