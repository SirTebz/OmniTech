"use client";

import React, { useState, useEffect, useMemo } from "react";
import { DemoShell } from "@/components/demos/DemoShell";
import {
  initialFinanceTransactions,
  initialBudgetLimits,
  FinanceTransaction,
  FinanceCategory,
  TransactionType,
} from "@/data/demo/fintrack/initialFinanceData";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart,
  PlusCircle,
  Download,
  Search,
  Trash2,
  DollarSign,
  AlertCircle,
  X,
} from "lucide-react";

const STORAGE_KEY = "omnitech_demo_fintrack_v1";

export default function FinTrackPage() {
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(initialFinanceTransactions);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("Expense");
  const [category, setCategory] = useState<FinanceCategory>("Groceries & Food");
  const [paymentMethod, setPaymentMethod] = useState<FinanceTransaction["paymentMethod"]>("Debit Card");

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTransactions(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveTransactions = (updated: FinanceTransaction[]) => {
    setTransactions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    saveTransactions(initialFinanceTransactions);
    setCategoryFilter("All");
    setTypeFilter("All");
    setSearchTerm("");
  };

  // Add transaction
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!desc.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newTx: FinanceTransaction = {
      id: `ft-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      description: desc.trim(),
      category: category,
      type: type,
      amountZAR: parsedAmount,
      paymentMethod: paymentMethod,
    };

    const updated = [newTx, ...transactions];
    saveTransactions(updated);
    setIsModalOpen(false);

    // Reset fields
    setDesc("");
    setAmount("");
  };

  const handleDeleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    saveTransactions(updated);
  };

  // Filtered dataset
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchCat = categoryFilter === "All" || t.category === categoryFilter;
      const matchType = typeFilter === "All" || t.type === typeFilter;
      const matchSearch =
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCat && matchType && matchSearch;
    });
  }, [transactions, categoryFilter, typeFilter, searchTerm]);

  // Calculations
  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === "Income")
      .reduce((acc, curr) => acc + curr.amountZAR, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((t) => t.type === "Expense")
      .reduce((acc, curr) => acc + curr.amountZAR, 0);
  }, [transactions]);

  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

  // Category Expense breakdown
  const categoryExpenses = useMemo(() => {
    const map: Record<string, number> = {};
    transactions
      .filter((t) => t.type === "Expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amountZAR;
      });

    return initialBudgetLimits.map((b) => {
      const spent = map[b.category] || 0;
      const pct = Math.round((spent / b.budgetLimitZAR) * 100);
      return {
        category: b.category,
        spentZAR: spent,
        budgetZAR: b.budgetLimitZAR,
        percentage: pct,
        isOver: spent > b.budgetLimitZAR,
      };
    });
  }, [transactions]);

  // Export CSV
  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) return;

    const headers = ["Date", "Description", "Category", "Type", "Amount (ZAR)", "Payment Method"];
    const rows = filteredTransactions.map((t) => [
      t.date,
      `"${t.description.replace(/"/g, '""')}"`,
      `"${t.category}"`,
      t.type,
      t.amountZAR,
      t.paymentMethod,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `FinTrack_Statement_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DemoShell
      title="FinTrack — Personal Finance & Cash Flow Analytics"
      badge="Financial Analytics"
      category="Data Analytics"
      description="An interactive personal finance analytics application formatted in South African Rand (ZAR) featuring dynamic budget utilization tracking, expense breakdowns, and browser persistence."
      onReset={handleReset}
    >
      {/* Financial Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Total Inflows</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-500">
            R {totalIncome.toLocaleString("en-ZA")}
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">Monthly Consultancies & SaaS</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Total Outflows</span>
            <TrendingDown className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-500">
            R {totalExpense.toLocaleString("en-ZA")}
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">Living & Operational Expenses</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Net Monthly Savings</span>
            <Wallet className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-500">
            R {netSavings.toLocaleString("en-ZA")}
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">Retained Liquidity</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-mono font-medium">Savings Rate</span>
            <PieChart className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-500">{savingsRate}%</div>
          <span className="text-[11px] text-muted-foreground font-mono">Target benchmark &gt; 25%</span>
        </div>
      </div>

      {/* Budget Utilisation Visualiser */}
      <div className="p-5 rounded-xl bg-card border border-border space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div>
            <h3 className="text-sm font-bold text-foreground">Monthly Category Budget Utilisation</h3>
            <p className="text-[11px] text-muted-foreground font-mono">
              Live consumption against allocated monthly South African Rand spending caps
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Transaction</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {categoryExpenses.map((cat) => (
            <div key={cat.category} className="p-3.5 rounded-xl bg-background border border-border text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground truncate max-w-[170px]">{cat.category}</span>
                <span className={`text-[10px] font-mono font-bold ${cat.isOver ? "text-rose-500" : "text-muted-foreground"}`}>
                  {cat.percentage}%
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-accent overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    cat.isOver ? "bg-rose-500" : cat.percentage > 80 ? "bg-amber-500" : "bg-blue-600"
                  }`}
                  style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>R {cat.spentZAR.toLocaleString("en-ZA")} spent</span>
                <span>Cap: R {cat.budgetZAR.toLocaleString("en-ZA")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions Ledger */}
      <div className="p-5 rounded-xl bg-card border border-border space-y-4">
        {/* Table Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search ledger entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-background border border-border text-foreground font-mono"
            >
              <option value="All">All Categories</option>
              <option value="Salary / Consulting">Salary / Consulting</option>
              <option value="Housing & Rent">Housing & Rent</option>
              <option value="Groceries & Food">Groceries & Food</option>
              <option value="Utilities & Internet">Utilities & Internet</option>
              <option value="Transport & Fuel">Transport & Fuel</option>
              <option value="Software & Subscriptions">Software & Subscriptions</option>
              <option value="Investments & Savings">Investments & Savings</option>
              <option value="Health & Medical">Health & Medical</option>
              <option value="Entertainment & Leisure">Entertainment & Leisure</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-background border border-border text-foreground font-mono"
            >
              <option value="All">All Types</option>
              <option value="Income">Income (+)</option>
              <option value="Expense">Expense (-)</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            disabled={filteredTransactions.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors disabled:opacity-50 self-start md:self-auto shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Statement CSV</span>
          </button>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Payment Method</th>
                <th className="py-2.5 px-3 text-right">Amount (ZAR)</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No transactions recorded matching the active filters.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-accent/40 transition-colors">
                    <td className="py-2.5 px-3 text-muted-foreground">{tx.date}</td>
                    <td className="py-2.5 px-3 font-sans font-medium text-foreground">{tx.description}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{tx.category}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{tx.paymentMethod}</td>
                    <td
                      className={`py-2.5 px-3 text-right font-bold ${
                        tx.type === "Income" ? "text-emerald-500" : "text-foreground"
                      }`}
                    >
                      {tx.type === "Income" ? "+" : "-"} R {tx.amountZAR.toLocaleString("en-ZA")}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => handleDeleteTransaction(tx.id)}
                        className="p-1 rounded text-muted-foreground hover:text-rose-500 transition-colors"
                        title="Delete transaction"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Record New Financial Transaction</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium mb-1 text-foreground">Transaction Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Checkers Hyper Grocery supplies"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1 text-foreground">Amount in ZAR (R)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 850.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-foreground">Transaction Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as TransactionType)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground"
                  >
                    <option value="Expense">Expense (-)</option>
                    <option value="Income">Income (+)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1 text-foreground">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FinanceCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground"
                  >
                    <option value="Salary / Consulting">Salary / Consulting</option>
                    <option value="Housing & Rent">Housing & Rent</option>
                    <option value="Groceries & Food">Groceries & Food</option>
                    <option value="Utilities & Internet">Utilities & Internet</option>
                    <option value="Transport & Fuel">Transport & Fuel</option>
                    <option value="Software & Subscriptions">Software & Subscriptions</option>
                    <option value="Investments & Savings">Investments & Savings</option>
                    <option value="Health & Medical">Health & Medical</option>
                    <option value="Entertainment & Leisure">Entertainment & Leisure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-foreground">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground"
                  >
                    <option value="Debit Card">Debit Card</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="EFT / Bank">EFT / Bank</option>
                    <option value="Direct Debit">Direct Debit</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DemoShell>
  );
}
