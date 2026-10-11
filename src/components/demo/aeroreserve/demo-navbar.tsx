"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DemoNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Flights", href: "/demo/airline-reservation-system/flights" },
    { name: "Book", href: "/demo/airline-reservation-system/book" },
    { name: "My Trips", href: "/demo/airline-reservation-system/trips" },
    { name: "Admin Dashboard", href: "/demo/airline-reservation-system/admin" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/demo/airline-reservation-system" className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-sky-500" />
              <span className="font-bold text-xl text-sky-500 hidden sm:block">AeroReserve</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-sky-500 ${
                  pathname.startsWith(link.href) ? "text-sky-500" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="bg-sky-500/10 text-sky-500 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono border border-sky-500/20">
              Demo
            </span>
            <Button variant="outline" size="sm" href="/work/airline-reservation-system">
              &larr; Back to OmniTech
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <span className="bg-sky-500/10 text-sky-500 text-xs font-bold px-2 py-0.5 rounded-full uppercase font-mono">
              Demo
            </span>
            <button
              type="button"
              className="text-foreground hover:text-sky-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname.startsWith(link.href)
                    ? "bg-sky-500/10 text-sky-500"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 px-3">
              <Button variant="outline" size="sm" href="/work/airline-reservation-system" className="w-full justify-center">
                &larr; Back to OmniTech
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
