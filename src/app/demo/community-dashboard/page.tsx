"use client";

import { useState } from "react";
import Link from "next/link";
import { UserAvatar } from "@/components/demo/nexushub/user-avatar";
import { Container } from "@/components/ui/container";
import {
  channels,
  initialPosts,
  communityEvents,
  members,
} from "@/data/demo/nexushub/data";
import { DiscussionPost } from "@/data/demo/nexushub/types";
import { ChannelSidebar } from "@/components/demo/nexushub/channel-sidebar";
import { DiscussionCard } from "@/components/demo/nexushub/discussion-card";
import { CreatePostModal } from "@/components/demo/nexushub/create-post-modal";
import {
  Hash,
  Users,
  Search,
  Sparkles,
  Calendar,
  ArrowRight,
  TrendingUp,
  Radio,
  PlusCircle,
} from "lucide-react";

export default function CommunityDashboardPage() {
  const [selectedChannelId, setSelectedChannelId] = useState("general");
  const [posts, setPosts] = useState<DiscussionPost[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const activeChannel =
    channels.find((c) => c.id === selectedChannelId) || channels[0];

  const handlePostCreated = (newPost: DiscussionPost) => {
    setPosts([newPost, ...posts]);
    setSelectedChannelId(newPost.channelId);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesChannel =
      selectedChannelId === "all" || post.channelId === selectedChannelId;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesChannel && matchesSearch;
  });

  const mentorsOnline = members.filter(
    (m) => (m.role === "admin" || m.role === "mentor") && m.status === "online"
  );

  return (
    <div className="py-6 sm:py-8 bg-background flex-1">
      <Container size="full" className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column (3 cols): Channels Sidebar */}
          <div className="lg:col-span-3">
            <ChannelSidebar
              channels={channels}
              selectedChannelId={selectedChannelId}
              onSelectChannel={setSelectedChannelId}
              onOpenCreatePost={() => setIsCreateModalOpen(true)}
            />
          </div>

          {/* Center Column (6 cols): Active Feed */}
          <div className="lg:col-span-6 space-y-5">
            {/* Channel Banner */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 font-mono font-bold">
                    <Hash className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-foreground leading-tight">
                      #{activeChannel.name}
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      {activeChannel.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/80 px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {activeChannel.memberCount} Members
                  </span>
                </div>
              </div>

              {/* Feed Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search in #${activeChannel.name} discussions, code snippets or tags...`}
                  className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Quick Composer Prompt Trigger */}
            <div
              onClick={() => setIsCreateModalOpen(true)}
              className="rounded-xl border border-dashed border-border bg-card/60 p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <UserAvatar name={members[0].name} size="md" />
                <span className="text-xs text-muted-foreground font-medium">
                  Have an architecture question or snippet to review in #{activeChannel.name}?
                </span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-mono font-semibold text-foreground">
                <PlusCircle className="h-3.5 w-3.5 text-violet-500" />
                Post
              </span>
            </div>

            {/* Feed List */}
            {filteredPosts.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-3">
                <Sparkles className="h-8 w-8 text-muted-foreground mx-auto" />
                <h3 className="text-sm font-bold text-foreground">No discussions found</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Be the first to ask a question, start a code review, or share a breakthrough in #{activeChannel.name}.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 text-white px-4 py-2 text-xs font-semibold hover:bg-violet-500 transition-colors"
                >
                  Start Discussion
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <DiscussionCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Right Column (3 cols): Community Widgets */}
          <div className="lg:col-span-3 space-y-5">
            {/* Upcoming Live Event Spotlight */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 font-bold uppercase text-foreground">
                  <Calendar className="h-3.5 w-3.5 text-violet-500" />
                  Upcoming Event
                </span>
                <Link
                  href="/demo/community-dashboard/events"
                  className="text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-0.5 text-[11px]"
                >
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="rounded-xl border border-border/80 bg-secondary/40 p-3 space-y-2">
                <span className="inline-block rounded-md bg-violet-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-violet-600 dark:text-violet-400 uppercase">
                  {communityEvents[0].type}
                </span>
                <h4 className="text-xs font-bold text-foreground leading-snug">
                  {communityEvents[0].title}
                </h4>
                <div className="text-[11px] font-mono text-muted-foreground">
                  {communityEvents[0].date} • {communityEvents[0].time}
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-border/60">
                  <UserAvatar name={communityEvents[0].speaker.name} size="xs" />
                  <span className="text-[11px] text-foreground font-medium">
                    {communityEvents[0].speaker.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Mentors Online */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold uppercase text-foreground">
                  Mentors Online
                </span>
                <span className="text-emerald-500 font-semibold text-[11px]">
                  ● Live Now
                </span>
              </div>

              <div className="space-y-2">
                {mentorsOnline.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="flex items-center justify-between rounded-xl p-2 hover:bg-secondary/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <UserAvatar name={mentor.name} size="md" />
                      <div>
                        <div className="text-xs font-bold text-foreground">
                          {mentor.name}
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground">
                          @{mentor.handle}
                        </div>
                      </div>
                    </div>

                    <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[9px] font-mono font-bold uppercase text-violet-600 dark:text-violet-400 border border-violet-500/20">
                      {mentor.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Tags */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-violet-500" />
                Trending Topics
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "nextjs",
                  "react19",
                  "redis",
                  "postgres",
                  "ai-agents",
                  "websockets",
                  "performance",
                  "tailwind",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="rounded-lg border border-border bg-secondary/50 hover:bg-secondary px-2.5 py-1 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        channels={channels}
        currentChannelId={selectedChannelId}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}
