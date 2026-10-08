"use client";

import React, { useState, useEffect } from 'react';
import { initialTransactions, initialAccounts, formatCurrency } from '@/data/demo/apexwealth/data';
import { TransactionsTable } from '@/components/demo/apexwealth/transactions-table';
import { Transaction, Account } from '@/data/demo/apexwealth/types';
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    // Simulated fetch
    setTransactions(initialTransactions);
    setAccounts(initialAccounts);
  }, []);

  // For the demo, let's calculate the stats based on all transactions
  // In a real app, these might update based on the current filter view of the table.
  const totalInflows = transactions.filter(t => t.type === 'inflow').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOutflows = transactions.filter(t => t.type === 'outflow').reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
  const netCash = totalInflows - totalOutflows;

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Transactions Ledger</h1>
          <p className="text-muted-foreground">View, search, and manage all your financial activities.</p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-card border border-border rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-500">
              <ArrowDownRight className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Inflows</p>
              <p className="text-lg font-semibold font-mono text-emerald-600 dark:text-emerald-500">{formatCurrency(totalInflows)}</p>
            </div>
          </div>
          
          <div className="flex-1 md:flex-none bg-card border border-border rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="p-2 bg-foreground/5 rounded-full text-foreground">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Outflows</p>
              <p className="text-lg font-semibold font-mono">{formatCurrency(totalOutflows)}</p>
            </div>
          </div>

          <div className="flex-1 md:flex-none bg-card border border-border rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="p-2 bg-teal-500/10 rounded-full text-teal-600 dark:text-teal-500">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Net CashFlow</p>
              <p className={`text-lg font-semibold font-mono ${netCash >= 0 ? 'text-emerald-600 dark:text-emerald-500' : 'text-foreground'}`}>
                {netCash >= 0 ? '+' : '-'}{formatCurrency(Math.abs(netCash))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <TransactionsTable initialTransactions={transactions} accounts={accounts} />

    </div>
  );
}
