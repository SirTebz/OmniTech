"use client";

import React, { useMemo, useState } from 'react';
import { Transaction } from '@/data/demo/apexwealth/types';
import { formatCurrency } from '@/data/demo/apexwealth/data';

interface ExpenseDonutChartProps {
  transactions: Transaction[];
}

export default function ExpenseDonutChart({ transactions }: ExpenseDonutChartProps) {
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);

  const { data, totalExpense } = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'outflow');
    const total = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const categoryMap = new Map<string, number>();
    expenses.forEach(t => {
      const amt = Math.abs(t.amount);
      categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + amt);
    });

    const categoryColors: Record<string, string> = {
      Housing: "#3b82f6",
      Groceries: "#10b981",
      Dining: "#f59e0b",
      Transport: "#8b5cf6",
      "Tech & Software": "#06b6d4",
      Utilities: "#ef4444",
      Entertainment: "#ec4899",
      Healthcare: "#14b8a6",
      Investments: "#f97316"
    };

    const sortedData = Array.from(categoryMap.entries())
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: (amount / total) * 100,
        color: categoryColors[name] || "#64748b"
      }))
      .sort((a, b) => b.amount - a.amount);

    return { data: sortedData, totalExpense: total };
  }, [transactions]);

  const cx = 150;
  const cy = 150;
  const radius = 100;
  const strokeWidth = 30;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  const activeSegment = hoverCategory ? data.find(d => d.name === hoverCategory) : null;

  return (
    <div className="w-full bg-card rounded-xl p-4 border border-border flex flex-col items-center">
      <div className="w-full text-left mb-4">
        <h3 className="text-lg font-semibold text-foreground">Expense Breakdown</h3>
        <p className="text-sm text-muted-foreground">Where your money goes</p>
      </div>

      <div className="relative w-[300px] h-[300px]">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {data.map((item) => {
            const dashArray = (item.percentage / 100) * circumference;
            const dashOffset = -currentOffset;
            currentOffset += dashArray;
            const isHovered = hoverCategory === item.name;
            const transform = isHovered ? `scale(1.05)` : `scale(1)`;

            return (
              <circle
                key={item.name}
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${dashArray} ${circumference}`}
                strokeDashoffset={dashOffset}
                className="transition-all duration-300 ease-in-out cursor-pointer origin-center"
                style={{ transformOrigin: `${cx}px ${cy}px`, transform }}
                onMouseEnter={() => setHoverCategory(item.name)}
                onMouseLeave={() => setHoverCategory(null)}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {activeSegment ? (
            <>
              <span className="text-sm text-muted-foreground font-medium">{activeSegment.name}</span>
              <span className="text-xl font-bold text-foreground font-mono mt-1">
                {formatCurrency(activeSegment.amount)}
              </span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full mt-1" style={{ backgroundColor: `${activeSegment.color}20`, color: activeSegment.color }}>
                {activeSegment.percentage.toFixed(1)}%
              </span>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground font-medium">Total Expenses</span>
              <span className="text-xl font-bold text-foreground font-mono mt-1">
                {formatCurrency(totalExpense)}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="w-full mt-6 grid grid-cols-2 gap-y-3 gap-x-4">
        {data.map(item => (
          <div 
            key={item.name} 
            className="flex items-center text-sm cursor-pointer hover:bg-secondary/50 p-1.5 rounded transition-colors"
            onMouseEnter={() => setHoverCategory(item.name)}
            onMouseLeave={() => setHoverCategory(null)}
          >
            <div className="w-3 h-3 rounded-full mr-2 shrink-0" style={{ backgroundColor: item.color }}></div>
            <div className="flex-1 truncate text-foreground">{item.name}</div>
            <div className="font-mono text-muted-foreground text-xs ml-2">
              {item.percentage.toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
