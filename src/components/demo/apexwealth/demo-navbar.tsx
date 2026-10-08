"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, TrendingUp, Menu, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Overview", href: "/demo/personal-finance-tracker" },
  { name: "Accounts", href: "/demo/personal-finance-tracker/accounts" },
  { name: "Transactions", href: "/demo/personal-finance-tracker/transactions" },
  { name: "Budgets & Forecast", href: "/demo/personal-finance-tracker/budgets" },
  { name: "Statement Importer", href: "/demo/personal-finance-tracker/import" },
];

export function DemoNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500">
            <ShieldCheck className="absolute w-5 h-5 opacity-50" />
            <TrendingUp className="w-4 h-4 z-10" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-none tracking-tight text-foreground">ApexWealth</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Financial Intelligence</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-emerald-500 hover:bg-emerald-500/10",
                pathname === link.href ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center px-2 py-1 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
            <ShieldCheck className="w-3 h-3 mr-1" />
            AES-256 E2E
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground">DEMO</span>
          <Link href="/work/personal-finance-tracker" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to OmniTech
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400" : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-border flex flex-col space-y-4">
               <div className="flex items-center px-2 py-1 w-fit rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
                <ShieldCheck className="w-3 h-3 mr-1" />
                AES-256 E2E
              </div>
              <Link href="/work/personal-finance-tracker" className="flex items-center text-sm font-medium text-muted-foreground">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to OmniTech
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
