"use client";

import { useState } from "react";
import { Channel } from "@/data/demo/nexushub/types";
import {
  MessageSquare,
  Code2,
  Bell,
  Atom,
  Cpu,
  Sparkles,
  Hash,
  Lock,
  PlusCircle,
  Search,
  Activity,
} from "lucide-react";

interface ChannelSidebarProps {
  channels: Channel[];
  selectedChannelId: string;
  onSelectChannel: (id: string) => void;
  onOpenCreatePost: () => void;
}

export function ChannelSidebar({
  channels,
  selectedChannelId,
  onSelectChannel,
  onOpenCreatePost,
}: ChannelSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredChannels = channels.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const officialChannels = filteredChannels.filter(
    (c) => c.type === "general" || c.type === "announcements"
  );
  const topicChannels = filteredChannels.filter(
    (c) => c.type !== "general" && c.type !== "announcements"
  );

  const getChannelIcon = (name: string) => {
    switch (name) {
      case "general":
        return <MessageSquare className="h-4 w-4" />;
      case "code-review":
        return <Code2 className="h-4 w-4" />;
      case "announcements":
        return <Bell className="h-4 w-4" />;
      case "react-nextjs":
        return <Atom className="h-4 w-4" />;
      case "ai-engineering":
        return <Cpu className="h-4 w-4" />;
      case "showcase":
        return <Sparkles className="h-4 w-4" />;
      default:
        return <Hash className="h-4 w-4" />;
    }
  };

  return (
    <aside className="w-full space-y-6">
      {/* Primary Action Button */}
      <button
        type="button"
        onClick={onOpenCreatePost}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white py-2.5 px-4 text-xs font-bold shadow-md shadow-violet-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <PlusCircle className="h-4 w-4" />
        <span>Start New Discussion</span>
      </button>

      {/* Channel Search */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter channels..."
          className="w-full rounded-xl border border-border bg-card pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-violet-500"
        />
      </div>

      {/* Channels Groups */}
      <div className="space-y-5">
        {/* Official Category */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[10px] font-mono uppercase font-bold tracking-wider text-muted-foreground">
            Official Cohort
          </div>
          {officialChannels.map((channel) => (
            <button
              key={channel.id}
              type="button"
              onClick={() => onSelectChannel(channel.id)}
              className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${
                selectedChannelId === channel.id
                  ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="opacity-70">{getChannelIcon(channel.name)}</span>
                <span className="truncate">#{channel.name}</span>
                {channel.isPrivate && <Lock className="h-3 w-3 opacity-60" />}
              </div>

              {channel.unreadCount && channel.unreadCount > 0 && (
                <span className="rounded-full bg-violet-600 px-1.5 py-0.2 text-[10px] font-mono text-white">
                  {channel.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Technical Topics Category */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[10px] font-mono uppercase font-bold tracking-wider text-muted-foreground">
            Technical Rooms
          </div>
          {topicChannels.map((channel) => (
            <button
              key={channel.id}
              type="button"
              onClick={() => onSelectChannel(channel.id)}
              className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${
                selectedChannelId === channel.id
                  ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="opacity-70">{getChannelIcon(channel.name)}</span>
                <span className="truncate">#{channel.name}</span>
                {channel.isPrivate && <Lock className="h-3 w-3 opacity-60" />}
              </div>

              {channel.unreadCount && channel.unreadCount > 0 && (
                <span className="rounded-full bg-violet-600 px-1.5 py-0.2 text-[10px] font-mono text-white">
                  {channel.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Community Telemetry Widget */}
      <div className="rounded-xl border border-border/80 bg-card/60 p-3.5 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold">
            Cohort 04 Pulse
          </span>
          <Activity className="h-3.5 w-3.5 text-emerald-500" />
        </div>
        <div className="grid grid-cols-2 gap-2 text-center font-mono">
          <div className="rounded-lg bg-secondary/50 p-2">
            <span className="block text-sm font-bold text-foreground">124</span>
            <span className="text-[10px] text-muted-foreground">Members</span>
          </div>
          <div className="rounded-lg bg-secondary/50 p-2">
            <span className="block text-sm font-bold text-emerald-500">&lt;50ms</span>
            <span className="text-[10px] text-muted-foreground">Broadcast</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
