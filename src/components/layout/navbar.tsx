"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Terminal } from "lucide-react";
import { siteConfig } from "@/data/site";
import { navItems } from "@/data/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/80 py-3 shadow-sm"
          : "bg-transparent py-4 sm:py-5"
      )}
    >
      <Container size="default">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-foreground font-bold tracking-tight text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono text-sm font-bold tracking-tighter shadow-sm transition-transform group-hover:scale-105">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-sans font-extrabold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/70 bg-card/60 backdrop-blur-sm px-4 py-1.5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors relative",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-accent rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button href="/contact" size="sm" className="font-semibold shadow-sm bg-blue-600 hover:bg-blue-500 text-white border-0">
              <span>Let&apos;s Work Together</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Mobile Actions & Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground rounded-md border border-border bg-card/60 backdrop-blur-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <Container size="default" className="py-6 space-y-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive
                          ? "bg-accent text-foreground font-semibold"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      <div>
                        <span className="block">{item.label}</span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground font-normal">
                            {item.description}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-40" />
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-2 border-t border-border flex flex-col gap-3">
                <Button href="/contact" size="md" className="w-full justify-center bg-blue-600 hover:bg-blue-500 text-white">
                  Let&apos;s Work Together
                </Button>
                <div className="flex flex-col gap-1 text-xs text-muted-foreground px-2 pt-2">
                  <span>Email: <a href={`mailto:${siteConfig.email}`} className="text-foreground hover:underline">{siteConfig.email}</a></span>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
