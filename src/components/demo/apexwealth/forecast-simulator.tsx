"use client";

import React, { useState, useMemo } from "react";

export function ForecastSimulator() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(15);
  const [inflationRate, setInflationRate] = useState(5);

  const formatZAR = (val: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const projection = useMemo(() => {
    let balance = 0;
    let totalContributions = 0;
    const data = [];
    const monthlyRate = annualReturn / 100 / 12;
    const inflationAdjustedRate = (annualReturn - inflationRate) / 100 / 12;
    const effectiveRate = inflationRate > 0 ? inflationAdjustedRate : monthlyRate;

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = (balance + monthlyContribution) * (1 + effectiveRate);
        totalContributions += monthlyContribution;
      }
      data.push({
        year,
        balance,
        contributions: totalContributions,
        interest: balance - totalContributions,
      });
    }
    return data;
  }, [monthlyContribution, annualReturn, years, inflationRate]);

  const finalYear = projection[projection.length - 1];
  const maxBalance = finalYear ? finalYear.balance : 0;

  return (
    <div className="flex flex-col gap-6 w-full font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sliders */}
        <div className="flex flex-col gap-2 p-4 bg-card rounded-xl border border-border">
          <label className="text-sm text-muted-foreground flex justify-between">
            <span>Monthly Contribution</span>
            <span className="font-mono text-emerald-500 font-semibold">{formatZAR(monthlyContribution)}</span>
          </label>
          <input
            type="range"
            min="500"
            max="50000"
            step="500"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="accent-emerald-500 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2 p-4 bg-card rounded-xl border border-border">
          <label className="text-sm text-muted-foreground flex justify-between">
            <span>Expected ROI</span>
            <span className="font-mono text-emerald-500 font-semibold">{annualReturn}%</span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(Number(e.target.value))}
            className="accent-emerald-500 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2 p-4 bg-card rounded-xl border border-border">
          <label className="text-sm text-muted-foreground flex justify-between">
            <span>Time Horizon</span>
            <span className="font-mono text-emerald-500 font-semibold">{years} Years</span>
          </label>
          <input
            type="range"
            min="1"
            max="40"
            step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="accent-emerald-500 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2 p-4 bg-card rounded-xl border border-border">
          <label className="text-sm text-muted-foreground flex justify-between">
            <span>Inflation Adjustment</span>
            <span className="font-mono text-emerald-500 font-semibold">{inflationRate}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value))}
            className="accent-emerald-500 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="p-6 bg-card rounded-xl border border-border flex flex-col gap-2">
            <h3 className="text-lg text-foreground font-semibold">Projected Net Worth</h3>
            <p className="text-3xl font-mono text-emerald-500 font-bold">
              {formatZAR(finalYear?.balance || 0)}
            </p>
            <p className="text-sm text-muted-foreground">in {years} years</p>
            
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Contributions</span>
                <span className="font-mono text-foreground">{formatZAR(finalYear?.contributions || 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Compound Interest</span>
                <span className="font-mono text-emerald-500">{formatZAR(finalYear?.interest || 0)}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <p className="text-sm font-medium">Financial Insight</p>
            <p className="text-xs mt-1">
              By saving {formatZAR(monthlyContribution)} monthly with a {annualReturn}% return, your money grows 
              exponentially. Interest makes up {Math.round(((finalYear?.interest || 0) / (finalYear?.balance || 1)) * 100)}% of your final net worth.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 p-6 bg-card rounded-xl border border-border">
          <h3 className="text-lg text-foreground font-semibold mb-4">Growth Trajectory</h3>
          <div className="w-full h-[300px] relative">
            <svg viewBox="0 0 1000 300" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <line
                  key={ratio}
                  x1="0"
                  y1={300 - ratio * 300}
                  x2="1000"
                  y2={300 - ratio * 300}
                  stroke="currentColor"
                  className="text-border"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}
              
              {/* Area path for balance */}
              <path
                d={`M0,300 ${projection
                  .map(
                    (p, i) =>
                      `L${(i / (years - 1 || 1)) * 1000},${300 - (p.balance / (maxBalance || 1)) * 280}`
                  )
                  .join(" ")} L1000,300 Z`}
                fill="currentColor"
                className="text-emerald-500/20"
              />
              
              {/* Line path for balance */}
              <path
                d={`${projection
                  .map(
                    (p, i) =>
                      `${i === 0 ? 'M' : 'L'}${(i / (years - 1 || 1)) * 1000},${
                        300 - (p.balance / (maxBalance || 1)) * 280
                      }`
                  )
                  .join(" ")}`}
                fill="none"
                stroke="currentColor"
                className="text-emerald-500"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Line path for contributions */}
              <path
                d={`${projection
                  .map(
                    (p, i) =>
                      `${i === 0 ? 'M' : 'L'}${(i / (years - 1 || 1)) * 1000},${
                        300 - (p.contributions / (maxBalance || 1)) * 280
                      }`
                  )
                  .join(" ")}`}
                fill="none"
                stroke="currentColor"
                className="text-teal-600/50"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
            </svg>
            <div className="absolute top-0 right-0 flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-muted-foreground">Total Balance</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 border-2 border-teal-600/50 border-dashed rounded-full"></div>
                <span className="text-muted-foreground">Contributions</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Year 1</span>
            <span>Year {Math.floor(years / 2)}</span>
            <span>Year {years}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
