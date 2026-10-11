"use client";

import { useState } from "react";
import Image from "next/image";
import { Member } from "@/data/demo/nexushub/types";
import { MessageSquare, Award, CheckCircle, ExternalLink } from "lucide-react";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const [copied, setCopied] = useState(false);

  const roleStyles = {
    admin: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30",
    mentor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    member: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    guest: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/30",
  };

  const statusDot = {
    online: "bg-emerald-500",
    idle: "bg-amber-500",
    offline: "bg-zinc-500",
  };

  const handleMention = () => {
    navigator.clipboard.writeText(`@${member.handle}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-4 hover:border-violet-500/40 transition-all shadow-xs flex flex-col justify-between">
      <div className="space-y-3.5">
        {/* Avatar + Role Strip */}
        <div className="flex items-start justify-between gap-3">
          <div className="relative">
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-border">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            {/* Status indicator dot */}
            <span
              className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-card ${
                statusDot[member.status]
              }`}
              title={`Status: ${member.status}`}
            />
          </div>

          <div className="text-right space-y-1">
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                roleStyles[member.role]
              }`}
            >
              {member.role}
            </span>
            <div className="text-[11px] font-mono text-muted-foreground">
              Joined {member.joinedDate}
            </div>
          </div>
        </div>

        {/* Identity & Bio */}
        <div>
          <h3 className="font-bold text-foreground text-sm">{member.name}</h3>
          <p className="text-xs font-mono text-muted-foreground">@{member.handle}</p>
          <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {member.bio}
          </p>
        </div>

        {/* Badges & Reputation */}
        <div className="space-y-2 pt-2 border-t border-border/70">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">Reputation Score</span>
            <span className="font-bold text-foreground flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-violet-500" />
              {member.reputation.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {member.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="pt-3 border-t border-border/70 flex items-center gap-2">
        <button
          type="button"
          onClick={handleMention}
          className="flex-1 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground py-2 text-xs font-mono font-medium transition-colors"
        >
          {copied ? "Mention Copied ✓" : `@${member.handle}`}
        </button>

        <button
          type="button"
          onClick={() => alert(`Direct conversation with ${member.name} initiated.`)}
          className="rounded-xl border border-border hover:bg-secondary p-2 text-muted-foreground hover:text-foreground transition-colors"
          title="Direct Message"
        >
          <MessageSquare className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
