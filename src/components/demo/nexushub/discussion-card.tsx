"use client";

import { useState } from "react";
import Image from "next/image";
import { DiscussionPost, DiscussionReply } from "@/data/demo/nexushub/types";
import { formatRelativeTime, members } from "@/data/demo/nexushub/data";
import { CodeBlock } from "./code-block";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Pin,
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react";

interface DiscussionCardProps {
  post: DiscussionPost;
}

export function DiscussionCard({ post }: DiscussionCardProps) {
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<DiscussionReply[]>(post.replies || []);
  const [replyText, setReplyText] = useState("");

  const handleLike = () => {
    if (hasLiked) {
      setLikes((l) => l - 1);
      setHasLiked(false);
    } else {
      setLikes((l) => l + 1);
      setHasLiked(true);
    }
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply: DiscussionReply = {
      id: `rep-${Date.now()}`,
      postId: post.id,
      author: members[0], // current active user (Sipho)
      content: replyText,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setReplies([...replies, newReply]);
    setReplyText("");
    setShowReplies(true);
  };

  const roleStyles = {
    admin: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    mentor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    member: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    guest: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
  };

  return (
    <article className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs transition-all hover:border-border/80 space-y-4">
      {/* Header: Author + Meta */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border/80">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-foreground text-sm leading-none">
                {post.author.name}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                @{post.author.handle}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                  roleStyles[post.author.role]
                }`}
              >
                {post.author.role}
              </span>
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
              {formatRelativeTime(post.createdAt)}
            </p>
          </div>
        </div>

        {post.isPinned && (
          <div className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-violet-600 dark:text-violet-400 border border-violet-500/20">
            <Pin className="h-3 w-3 fill-current rotate-45" />
            <span>Pinned</span>
          </div>
        )}
      </div>

      {/* Title & Body */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>

      {/* Code Snippet if present */}
      {post.snippet && <CodeBlock snippet={post.snippet} />}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary/70 hover:bg-secondary px-2 py-0.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between border-t border-border/70 pt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleLike}
            className={`inline-flex items-center gap-1.5 font-mono text-xs transition-colors ${
              hasLiked
                ? "text-rose-500 font-bold"
                : "hover:text-foreground"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${hasLiked ? "fill-rose-500 text-rose-500" : ""}`}
            />
            <span>{likes}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowReplies(!showReplies)}
            className="inline-flex items-center gap-1.5 font-mono text-xs hover:text-foreground transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{replies.length} replies</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded-md hover:bg-secondary transition-colors ${
              isBookmarked ? "text-violet-500" : "hover:text-foreground"
            }`}
            title="Bookmark"
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-violet-500" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="p-1.5 rounded-md hover:bg-secondary hover:text-foreground transition-colors"
            title="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Replies Thread */}
      {showReplies && (
        <div className="space-y-3 pt-3 border-t border-border/70 animate-in fade-in-50 duration-200">
          <div className="space-y-3">
            {replies.map((reply) => (
              <div
                key={reply.id}
                className={`rounded-xl border p-3.5 space-y-2 text-xs ${
                  reply.isAcceptedAnswer
                    ? "border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10"
                    : "border-border/60 bg-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full">
                      <Image
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </div>
                    <span className="font-bold text-foreground">{reply.author.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      @{reply.author.handle}
                    </span>
                  </div>

                  {reply.isAcceptedAnswer && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      Accepted Answer
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed pl-8">
                  {reply.content}
                </p>

                {reply.snippet && (
                  <div className="pl-8">
                    <CodeBlock snippet={reply.snippet} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Inline Reply Form */}
          <form onSubmit={handleAddReply} className="flex gap-2 pt-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply or code suggestion..."
              className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="inline-flex items-center gap-1 rounded-xl bg-violet-600 hover:bg-violet-500 text-white px-3.5 py-2 text-xs font-semibold transition-colors disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Reply</span>
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
