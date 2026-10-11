"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { members } from "@/data/demo/nexushub/data";
import { MemberCard } from "@/components/demo/nexushub/member-card";
import { MemberRole } from "@/data/demo/nexushub/types";
import { Users, Search, ShieldCheck, Check, Sparkles } from "lucide-react";

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"reputation" | "recent">("reputation");

  const filteredMembers = members
    .filter((m) => {
      const matchesRole = roleFilter === "all" || m.role === roleFilter;
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.handle.toLowerCase().includes(search.toLowerCase()) ||
        m.bio.toLowerCase().includes(search.toLowerCase());
      return matchesRole && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "reputation") return b.reputation - a.reputation;
      return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
    });

  return (
    <div className="py-8 sm:py-10 bg-background flex-1">
      <Container size="full" className="px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/10 text-violet-600 dark:text-violet-400">
                <Users className="h-4 w-4" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Cohort Member Directory
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover senior mentors, fullstack peers, and active creators across Cohort 04.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded-full bg-violet-500/10 px-3 py-1 font-bold text-violet-600 dark:text-violet-400 border border-violet-500/20">
              Total Cohort: {members.length} Active Members
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card p-4 rounded-2xl border border-border">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, handle, or bio..."
              className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>

          {/* Role Filters */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {(["all", "admin", "mentor", "member", "guest"] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono capitalize transition-all ${
                  roleFilter === role
                    ? "bg-violet-600 text-white font-bold"
                    : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 font-mono text-xs w-full sm:w-auto justify-end">
            <span className="text-muted-foreground text-[11px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "reputation" | "recent")}
              className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-foreground focus:outline-none"
            >
              <option value="reputation">Highest Reputation</option>
              <option value="recent">Recently Joined</option>
            </select>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* Role Permissions Matrix */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-violet-500" />
            <h2 className="text-base font-bold text-foreground">
              Role-Based Access Control (RBAC) Matrix
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            NexusHub partitions workspaces into strict capability boundaries preventing unauthorized privilege escalation.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2.5 pr-4 font-bold uppercase text-[11px]">Capability</th>
                  <th className="py-2.5 px-3 font-bold uppercase text-[11px] text-violet-500">Admin</th>
                  <th className="py-2.5 px-3 font-bold uppercase text-[11px] text-indigo-500">Mentor</th>
                  <th className="py-2.5 px-3 font-bold uppercase text-[11px] text-emerald-500">Member</th>
                  <th className="py-2.5 px-3 font-bold uppercase text-[11px] text-zinc-500">Guest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr>
                  <td className="py-2.5 pr-4 text-foreground font-sans font-medium">Create Channels & Modify Audit Rules</td>
                  <td className="py-2.5 px-3 text-emerald-500">✓ Full</td>
                  <td className="py-2.5 px-3 text-zinc-500">—</td>
                  <td className="py-2.5 px-3 text-zinc-500">—</td>
                  <td className="py-2.5 px-3 text-zinc-500">—</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-foreground font-sans font-medium">Accept Official Solutions in Code Reviews</td>
                  <td className="py-2.5 px-3 text-emerald-500">✓ Full</td>
                  <td className="py-2.5 px-3 text-emerald-500">✓ Full</td>
                  <td className="py-2.5 px-3 text-zinc-500">—</td>
                  <td className="py-2.5 px-3 text-zinc-500">—</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-foreground font-sans font-medium">Execute Unlimited Sandbox Snippets</td>
                  <td className="py-2.5 px-3 text-emerald-500">✓ Uncapped</td>
                  <td className="py-2.5 px-3 text-emerald-500">✓ Uncapped</td>
                  <td className="py-2.5 px-3 text-emerald-500">✓ 50/day</td>
                  <td className="py-2.5 px-3 text-amber-500">10/day</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 text-foreground font-sans font-medium">RSVP & Host Cohort Masterclasses</td>
                  <td className="py-2.5 px-3 text-emerald-500">✓ Host</td>
                  <td className="py-2.5 px-3 text-emerald-500">✓ Host</td>
                  <td className="py-2.5 px-3 text-emerald-500">✓ Attend</td>
                  <td className="py-2.5 px-3 text-emerald-500">✓ Attend</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}
