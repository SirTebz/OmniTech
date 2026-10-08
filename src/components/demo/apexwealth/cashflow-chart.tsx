"use client";

import React, { useState, useMemo } from 'react';
import { MonthlyCashflow } from '@/data/demo/apexwealth/types';
import { formatCurrency } from '@/data/demo/apexwealth/data';

interface CashflowChartProps {
  data: MonthlyCashflow[];
  height?: number;
}

export default function CashflowChart({ data, height = 350 }: CashflowChartProps) {
  const [filter, setFilter] = useState<'6 Months' | '12 Months' | 'All'>('12 Months');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const filteredData = useMemo(() => {
    if (filter === '6 Months') return data.slice(-6);
    if (filter === '12 Months') return data.slice(-12);
    return data;
  }, [data, filter]);

  const maxVal = Math.max(
    ...filteredData.map(d => Math.max(d.income, d.expenses, d.netWorth / 10)) 
  ) * 1.1; // scale net worth down for visual or just use separate axis. Let's just use it on the same graph but scaled or just maxVal of all. Actually net worth is usually much higher. Let's scale networth by 1/5 for drawing, but show real in tooltip.
  
  const trueMaxY = Math.max(...filteredData.map(d => Math.max(d.income, d.expenses, d.netWorth)));
  const yAxisMax = trueMaxY * 1.1;

  const width = 800; // SVG internal coordinate width
  const paddingX = 60;
  const paddingY = 40;
  
  const points = filteredData.map((d, i) => {
    const x = paddingX + (i / (filteredData.length - 1 || 1)) * (width - paddingX * 2);
    const incomeY = height - paddingY - (d.income / yAxisMax) * (height - paddingY * 2);
    const expenseY = height - paddingY - (d.expenses / yAxisMax) * (height - paddingY * 2);
    const netWorthY = height - paddingY - (d.netWorth / yAxisMax) * (height - paddingY * 2);
    return { x, incomeY, expenseY, netWorthY, data: d };
  });

  const createAreaPath = (pts: typeof points, key: 'incomeY' | 'expenseY') => {
    if (pts.length === 0) return '';
    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p[key]}`).join(' ');
    return `${d} L ${pts[pts.length - 1].x},${height - paddingY} L ${pts[0].x},${height - paddingY} Z`;
  };

  const createLinePath = (pts: typeof points, key: 'incomeY' | 'expenseY' | 'netWorthY') => {
    if (pts.length === 0) return '';
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p[key]}`).join(' ');
  };

  return (
    <div className="w-full flex flex-col space-y-4 bg-card rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Cashflow & Net Worth</h3>
          <p className="text-sm text-muted-foreground">Income, expenses, and wealth accumulation</p>
        </div>
        <div className="flex space-x-2 bg-secondary rounded-full p-1">
          {(['6 Months', '12 Months', 'All'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative w-full" style={{ height }}>
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width * width;
            // find closest point
            let closest = 0;
            let minDist = Infinity;
            points.forEach((p, i) => {
              const dist = Math.abs(p.x - x);
              if (dist < minDist) {
                minDist = dist;
                closest = i;
              }
            });
            setHoverIndex(closest);
          }}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(tick => {
            const y = paddingY + (height - paddingY * 2) * tick;
            const val = yAxisMax * (1 - tick);
            return (
              <g key={tick}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="currentColor" className="text-border" strokeDasharray="4 4" />
                <text x={paddingX - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-muted-foreground font-mono">
                  {val >= 1000 ? `${(val/1000).toFixed(0)}k` : val.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Areas */}
          <path d={createAreaPath(points, 'incomeY')} fill="url(#incomeGradient)" />
          <path d={createAreaPath(points, 'expenseY')} fill="url(#expenseGradient)" />
          
          {/* Lines */}
          <path d={createLinePath(points, 'incomeY')} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" className="drop-shadow-sm" />
          <path d={createLinePath(points, 'expenseY')} fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" className="drop-shadow-sm" />
          <path d={createLinePath(points, 'netWorthY')} fill="none" stroke="#06b6d4" strokeWidth="3" className="drop-shadow-sm" />

          {/* Points & Labels */}
          {points.map((p, i) => (
            <g key={i}>
              <text x={p.x} y={height - paddingY + 20} textAnchor="middle" className="text-[10px] fill-muted-foreground">
                {p.data.month}
              </text>
              {hoverIndex === i && (
                <line x1={p.x} y1={paddingY} x2={p.x} y2={height - paddingY} stroke="currentColor" className="text-muted-foreground" strokeDasharray="4 4" />
              )}
              {hoverIndex === i && (
                <>
                  <circle cx={p.x} cy={p.incomeY} r="4" fill="hsl(var(--primary))" className="drop-shadow-md" />
                  <circle cx={p.x} cy={p.expenseY} r="4" fill="hsl(var(--destructive))" className="drop-shadow-md" />
                  <circle cx={p.x} cy={p.netWorthY} r="4" fill="#06b6d4" className="drop-shadow-md" />
                </>
              )}
            </g>
          ))}
        </svg>

        {hoverIndex !== null && points[hoverIndex] && (
          <div 
            className="absolute top-0 pointer-events-none bg-popover border border-border shadow-xl rounded-lg p-3 text-sm z-10 transition-all"
            style={{ 
              left: `max(10px, min(calc(100% - 200px), ${(points[hoverIndex].x / width) * 100}% - 100px))`,
              top: 10
            }}
          >
            <div className="font-bold mb-2 border-b border-border pb-1">{points[hoverIndex].data.month}</div>
            <div className="flex justify-between space-x-4 mb-1">
              <span className="text-primary font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Income</span>
              <span className="font-mono">{formatCurrency(points[hoverIndex].data.income)}</span>
            </div>
            <div className="flex justify-between space-x-4 mb-1">
              <span className="text-destructive font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-destructive mr-2"></span>Expenses</span>
              <span className="font-mono">{formatCurrency(points[hoverIndex].data.expenses)}</span>
            </div>
            <div className="flex justify-between space-x-4 mb-1">
              <span className="text-muted-foreground font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-muted-foreground mr-2"></span>Savings</span>
              <span className="font-mono">{formatCurrency(points[hoverIndex].data.savings)}</span>
            </div>
            <div className="flex justify-between space-x-4 mt-2 pt-2 border-t border-border">
              <span className="text-[#06b6d4] font-medium flex items-center"><span className="w-2 h-2 rounded-full bg-[#06b6d4] mr-2"></span>Net Worth</span>
              <span className="font-mono">{formatCurrency(points[hoverIndex].data.netWorth)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
