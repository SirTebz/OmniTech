"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { UploadCloud, FileText, CheckCircle2, Shield, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ParsedRow {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  confidence: number;
  status: "new" | "duplicate";
}

export default function ImportPage() {
  const [format, setFormat] = useState("Standard CSV");
  const [isImporting, setIsImporting] = useState(false);
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [imported, setImported] = useState(false);

  const formatZAR = (val: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  const loadSample = () => {
    setIsImporting(true);
    setTimeout(() => {
      setRows([
        { id: "1", date: "2026-10-01", description: "WOOLWORTHS SANDTON", amount: -1250.0, category: "Groceries", confidence: 99, status: "new" },
        { id: "2", date: "2026-10-02", description: "UBER TRIP", amount: -145.0, category: "Transport", confidence: 95, status: "new" },
        { id: "3", date: "2026-10-03", description: "NETFLIX ZA", amount: -199.0, category: "Entertainment", confidence: 98, status: "new" },
        { id: "4", date: "2026-10-03", description: "CITY OF JOHANNESBURG", amount: -2450.0, category: "Utilities", confidence: 92, status: "duplicate" },
        { id: "5", date: "2026-10-05", description: "ACME CORP SALARY", amount: 45000.0, category: "Income", confidence: 99, status: "new" },
      ]);
      setIsImporting(false);
    }, 1500);
  };

  const commitImport = () => {
    setImported(true);
    setTimeout(() => {
      setRows([]);
      setImported(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="border-b border-border bg-card">
        <Container>
          <div className="pt-8 pb-6">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Statement Import</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Securely import your bank statements. AI will auto-categorize and detect duplicates.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-8 flex flex-col gap-8">
        {/* Security Banner */}
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3 text-emerald-600 dark:text-emerald-400">
          <Shield className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-sm">Zero-Knowledge Processing</h4>
            <p className="text-xs mt-1 opacity-90">
              All parsing and categorization happens locally in your browser memory. Your statement data never leaves your device and is not sent to any external server.
            </p>
          </div>
        </div>

        {/* Upload Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Statement Format</label>
              <select 
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-card border border-border rounded-lg p-2.5 text-sm outline-none focus:border-emerald-500"
              >
                <option>Standard CSV</option>
                <option>Investec CSV</option>
                <option>FNB CSV</option>
                <option>Capitec CSV</option>
                <option>OFX Format</option>
              </select>
            </div>

            <div className="mt-2 p-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-4 text-center bg-card hover:bg-secondary/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Drag & drop your file here</p>
                <p className="text-xs text-muted-foreground mt-1">or click to browse from device</p>
              </div>
            </div>

            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-xs text-muted-foreground uppercase font-medium">OR</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <Button onClick={loadSample} disabled={isImporting} className="w-full bg-secondary text-foreground hover:bg-secondary/80">
              {isImporting ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FileText className="w-4 h-4 mr-2" />
              )}
              Load Sample Statement
            </Button>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <h3 className="text-lg font-semibold text-foreground">Live Preview Table</h3>
              {rows.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  <span className="text-emerald-500 font-medium">{rows.filter(r => r.status === "new").length} New</span> • 
                  <span className="text-amber-500 font-medium ml-2">{rows.filter(r => r.status === "duplicate").length} Duplicates</span>
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden min-h-[300px] flex flex-col">
              {rows.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                  <FileText className="w-12 h-12 mb-4 opacity-20" />
                  <p>No data loaded.</p>
                  <p className="text-sm mt-1">Upload a file or load the sample statement to preview.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-secondary/50 text-muted-foreground text-xs uppercase font-medium">
                      <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                        <th className="px-4 py-3">Auto-Category</th>
                        <th className="px-4 py-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {rows.map((row) => (
                        <tr key={row.id} className={row.status === "duplicate" ? "opacity-50" : ""}>
                          <td className="px-4 py-3 font-mono whitespace-nowrap">{row.date}</td>
                          <td className="px-4 py-3 truncate max-w-[200px]">{row.description}</td>
                          <td className={`px-4 py-3 text-right font-mono whitespace-nowrap ${row.amount > 0 ? 'text-emerald-500' : 'text-foreground'}`}>
                            {row.amount > 0 ? "+" : ""}{formatZAR(row.amount)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary text-xs">
                              {row.category}
                              <span className="text-emerald-500 opacity-80" title={`${row.confidence}% AI confidence`}>
                                ({row.confidence}%)
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {row.status === "new" ? (
                              <span className="inline-flex items-center text-emerald-500">
                                <CheckCircle2 className="w-4 h-4" />
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-amber-500 group relative">
                                <AlertCircle className="w-4 h-4" />
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-[10px] bg-foreground text-background rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                                  Duplicate detected
                                </span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {rows.length > 0 && (
              <div className="flex justify-end mt-2">
                <Button 
                  onClick={commitImport} 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[150px]"
                >
                  {imported ? (
                    <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2" /> Imported!</span>
                  ) : (
                    `Import ${rows.filter(r => r.status === "new").length} Records`
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
