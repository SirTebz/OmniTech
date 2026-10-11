"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquareCode,
  Sparkles,
  Calendar,
  Users,
  ShieldAlert,
  Code2,
  Menu,
  X,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { MemberRole } from "@/data/demo/nexushub/types";

const NAV_LINKS = [
  {
    name: "Discussions",
    href: "/demo/community-dashboard",
    icon: MessageSquareCode,
    exact: true,
  },
  {
    name: "Code Playground",
    href: "/demo/community-dashboard/playground",
    icon: Code2,
  },
  {
    name: "Event Calendar",
    href: "/demo/community-dashboard/events",
    icon: Calendar,
  },
  {
    name: "Member Directory",
    href: "/demo/community-dashboard/members",
    icon: Users,
  },
  {
    name: "Audit & Security",
    href: "/demo/community-dashboard/audit",
    icon: ShieldAlert,
  },
];

const ROLES: { role: MemberRole; label: string; badgeClass: string }[] = [
  { role: "admin", label: "Admin (Sipho)", badgeClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30" },
  { role: "mentor", label: "Mentor (Elena)", badgeClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30" },
  { role: "member", label: "Member (Amara)", badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
];

export function DemoNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const currentRole = ROLES[selectedRoleIndex];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-colors">
      <Container size="full" className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/demo/community-dashboard"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-500/25">
                <MessageSquareCode className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold tracking-tight text-foreground text-base">
                    NexusHub
                  </span>
                  <span className="rounded-full bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-mono font-bold text-violet-600 dark:text-violet-400 border border-violet-500/20">
                    SaaS
                  </span>
                </div>
                <p className="text-[11px] font-mono text-muted-foreground hidden sm:block">
                  Community Engine
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = link.exact
                ? pathname === link.href
                : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 font-semibold"
                      : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Telemetry pill, Role switcher & OmniTech Link */}
          <div className="flex items-center gap-2.5">
            {/* Active Members badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-foreground font-semibold">48 Active</span>
            </div>

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-mono transition-colors ${currentRole.badgeClass}`}
              >
                <span>{currentRole.label}</span>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 rounded-xl border border-border bg-card p-1.5 shadow-xl z-50 animate-in fade-in-50 zoom-in-95">
                  <div className="px-2 py-1 text-[10px] font-mono uppercase text-muted-foreground">
                    Switch Mock Persona
                  </div>
                  {ROLES.map((r, i) => (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => {
                        setSelectedRoleIndex(i);
                        setRoleDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs transition-colors ${
                        selectedRoleIndex === i
                          ? "bg-secondary text-foreground font-semibold"
                          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                      }`}
                    >
                      <span>{r.label}</span>
                      {selectedRoleIndex === i && <Sparkles className="h-3 w-3 text-violet-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Back to OmniTech Link */}
            <Link
              href="/work/community-dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background px-3 py-1.5 text-xs font-mono text-muted-foreground hover:bg-secondary hover:text-foreground transition-all shadow-2xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = link.exact
                ? pathname === link.href
                : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 font-semibold"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </header>
  );
}
