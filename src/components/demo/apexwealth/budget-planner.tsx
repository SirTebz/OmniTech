"use client";

import React, { useState } from "react";
import { initialBudgets } from "@/data/demo/apexwealth/data";
import { Wallet, Home, ShoppingCart, Utensils, Car, Zap, HeartPulse, Laptop, Edit2, Check } from "lucide-react";
import type { Budget } from "@/data/demo/apexwealth/types";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
  Laptop: <Laptop className="w-5 h-5" />,
  Wallet: <Wallet className="w-5 h-5" />,
};

export function BudgetPlanner() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLimit, setEditLimit] = useState<number>(0);

  const formatZAR = (val: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const totalLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const overallPercentage = (totalSpent / totalLimit) * 100;

  const handleEdit = (b: Budget) => {
    setEditingId(b.id);
    setEditLimit(b.limit);
  };

  const handleSave = (id: string) => {
    setBudgets(budgets.map((b) => (b.id === id ? { ...b, limit: editLimit } : b)));
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-6 w-full font-sans">
      <div className="p-6 bg-card rounded-xl border border-border flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-foreground">Monthly Overall Budget</h2>
          <p className="text-sm text-muted-foreground">
            You have spent <span className="font-mono font-medium text-foreground">{overallPercentage.toFixed(1)}%</span> of your {formatZAR(totalLimit)} limit.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex items-center gap-4">
          <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                overallPercentage > 100 ? "bg-red-500" : overallPercentage > 85 ? "bg-amber-500" : "bg-emerald-500"
              }`}
              style={{ width: `${Math.min(overallPercentage, 100)}%` }}
            />
          </div>
          <span className="font-mono text-sm font-semibold">{formatZAR(totalSpent)} / {formatZAR(totalLimit)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((budget) => {
          const percent = (budget.spent / budget.limit) * 100;
          const isOver = percent > 100;
          const isNear = percent > 85 && percent <= 100;
          const statusText = isOver ? `Over Budget by ${formatZAR(budget.spent - budget.limit)}` : isNear ? "Near Limit" : "On Track";
          
          return (
            <div key={budget.id} className="p-5 bg-card rounded-xl border border-border flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isOver ? 'bg-red-500/10 text-red-500' : isNear ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {iconMap[budget.icon] || iconMap.Wallet}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{budget.category}</h3>
                    <p className={`text-xs ${isOver ? 'text-red-500 font-medium' : isNear ? 'text-amber-500' : 'text-emerald-500'}`}>
                      {statusText}
                    </p>
                  </div>
                </div>
                
                {editingId === budget.id ? (
                  <button onClick={() => handleSave(budget.id)} className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded">
                    <Check className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => handleEdit(budget)} className="p-1 text-muted-foreground hover:text-foreground rounded">
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-lg font-semibold">{formatZAR(budget.spent)}</span>
                  {editingId === budget.id ? (
                    <div className="flex items-center gap-1 border-b border-emerald-500">
                      <span className="text-sm font-mono text-muted-foreground">R</span>
                      <input 
                        type="number"
                        value={editLimit}
                        onChange={(e) => setEditLimit(Number(e.target.value))}
                        className="w-20 bg-transparent text-sm font-mono outline-none text-right"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <span className="font-mono text-sm text-muted-foreground">/ {formatZAR(budget.limit)}</span>
                  )}
                </div>
                
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isOver ? "bg-red-500 animate-pulse" : isNear ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
