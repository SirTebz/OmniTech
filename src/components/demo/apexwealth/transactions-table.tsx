"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ArrowUpDown, ChevronLeft, ChevronRight, Plus, Eye, Tag as TagIcon } from 'lucide-react';
import { Transaction, Account } from '@/data/demo/apexwealth/types';
import { formatCurrency, getCategoryIcon } from '@/data/demo/apexwealth/data';
import { AddTransactionModal } from './add-transaction-modal';

interface TransactionsTableProps {
  initialTransactions?: Transaction[];
  accounts?: Account[];
}

export function TransactionsTable({ initialTransactions = [], accounts = [] }: TransactionsTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [accountFilter, setAccountFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [sortField, setSortField] = useState<keyof Transaction>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 10;

  const handleAddTransaction = (newTxn: Omit<Transaction, 'id'>) => {
    const txn: Transaction = {
      ...newTxn,
      id: `txn_${Date.now()}`
    };
    setTransactions(prev => [txn, ...prev]);
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...transactions];

    // Search
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(t => 
        t.merchant.toLowerCase().includes(s) || 
        t.description.toLowerCase().includes(s) ||
        t.tags.some(tag => tag.toLowerCase().includes(s))
      );
    }

    // Category
    if (categoryFilter !== "All") {
      result = result.filter(t => t.category === categoryFilter);
    }

    // Account
    if (accountFilter !== "All") {
      result = result.filter(t => t.accountId === accountFilter);
    }

    // Date Filter (simple implementation for demo)
    if (dateFilter === "This Month") {
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      result = result.filter(t => t.date.startsWith(currentMonth));
    } else if (dateFilter === "Last Month") {
      const now = new Date();
      let lastMonthYear = now.getFullYear();
      let lastMonth = now.getMonth();
      if (lastMonth === 0) {
        lastMonth = 12;
        lastMonthYear--;
      }
      const lastMonthStr = `${lastMonthYear}-${String(lastMonth).padStart(2, '0')}`;
      result = result.filter(t => t.date.startsWith(lastMonthStr));
    }

    // Sort
    result.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (sortField === 'amount') {
        aVal = Math.abs(aVal);
        bVal = Math.abs(bVal);
      }

      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [transactions, search, categoryFilter, accountFilter, dateFilter, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const paginated = filteredAndSorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Description", "Merchant", "Category", "Amount", "Type", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredAndSorted.map(t => [
        t.date,
        `"${t.description}"`,
        `"${t.merchant}"`,
        t.category,
        t.amount,
        t.type,
        t.status
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'apexwealth_ledger.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getAccountName = (id: string) => accounts.find(a => a.id === id)?.name || id;

  const categories = ["All", "Income", "Housing", "Groceries", "Dining", "Investments", "Utilities", "Transport", "Entertainment", "Healthcare", "Tech & Software"];

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search merchant, description, or tag..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-input rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add <span className="hidden sm:inline">Transaction</span></span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-background border border-input rounded-md px-2 py-1.5">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-sm focus:outline-none text-foreground"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <div className="flex items-center gap-2 bg-background border border-input rounded-md px-2 py-1.5">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <select 
              value={accountFilter} 
              onChange={(e) => setAccountFilter(e.target.value)}
              className="bg-transparent text-sm focus:outline-none text-foreground"
            >
              <option value="All">All Accounts</option>
              {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-background border border-input rounded-md px-2 py-1.5">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <select 
              value={dateFilter} 
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent text-sm focus:outline-none text-foreground"
            >
              <option value="All">All Time</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-secondary/50 text-muted-foreground border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium cursor-pointer hover:text-foreground" onClick={() => toggleSort('date')}>
                <div className="flex items-center gap-1">Date <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-4 py-3 font-medium cursor-pointer hover:text-foreground" onClick={() => toggleSort('description')}>
                <div className="flex items-center gap-1">Description <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-4 py-3 font-medium cursor-pointer hover:text-foreground" onClick={() => toggleSort('category')}>
                <div className="flex items-center gap-1">Category <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-4 py-3 font-medium cursor-pointer hover:text-foreground" onClick={() => toggleSort('accountId')}>
                <div className="flex items-center gap-1">Account <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-4 py-3 font-medium text-right cursor-pointer hover:text-foreground" onClick={() => toggleSort('amount')}>
                <div className="flex items-center justify-end gap-1">Amount <ArrowUpDown className="w-3 h-3" /></div>
              </th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.length > 0 ? paginated.map(txn => (
              <tr key={txn.id} className="hover:bg-muted/50 transition-colors group">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{txn.date}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{txn.merchant}</div>
                  <div className="text-xs text-muted-foreground">{txn.description}</div>
                  {txn.tags.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {txn.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground flex items-center gap-0.5">
                          <TagIcon className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary text-xs font-medium text-foreground">
                    {txn.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium text-muted-foreground">{getAccountName(txn.accountId)}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className={`font-mono font-medium ${txn.type === 'inflow' ? 'text-emerald-500' : 'text-foreground'}`}>
                    {txn.type === 'inflow' ? '+' : ''}{formatCurrency(txn.amount)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  {txn.status === 'pending' ? (
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Pending"></span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-500 uppercase tracking-wider">
                      Cleared
                    </span>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  No transactions found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border flex items-center justify-between bg-muted/20">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredAndSorted.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium text-foreground">{Math.min(currentPage * itemsPerPage, filteredAndSorted.length)}</span> of <span className="font-medium text-foreground">{filteredAndSorted.length}</span> entries
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md border border-input bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1.5 rounded-md border border-input bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
        accounts={accounts}
      />
    </div>
  );
}
