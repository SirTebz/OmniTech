"use client";

import { useState } from "react";
import { Channel, CodeLanguage, DiscussionPost } from "@/data/demo/nexushub/types";
import { members } from "@/data/demo/nexushub/data";
import { X, Code2, Send, Sparkles } from "lucide-react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: Channel[];
  currentChannelId: string;
  onPostCreated: (post: DiscussionPost) => void;
}

export function CreatePostModal({
  isOpen,
  onClose,
  channels,
  currentChannelId,
  onPostCreated,
}: CreatePostModalProps) {
  const [channelId, setChannelId] = useState(currentChannelId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hasSnippet, setHasSnippet] = useState(false);
  const [snippetLanguage, setSnippetLanguage] = useState<CodeLanguage>("typescript");
  const [snippetCode, setSnippetCode] = useState("");
  const [snippetFilename, setSnippetFilename] = useState("");
  const [tagInput, setTagInput] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagInput
      .split(",")
      .map((t) => t.trim().toLowerCase().replace(/^#/, ""))
      .filter(Boolean);

    const newPost: DiscussionPost = {
      id: `post-${Date.now()}`,
      channelId,
      author: members[0], // active persona (Sipho)
      title,
      content,
      createdAt: new Date().toISOString(),
      likes: 1,
      repliesCount: 0,
      tags: tags.length > 0 ? tags : ["general"],
      snippet:
        hasSnippet && snippetCode.trim()
          ? {
              language: snippetLanguage,
              code: snippetCode,
              fileName: snippetFilename || "snippet." + (snippetLanguage === "typescript" ? "ts" : snippetLanguage),
              output: "Simulated output: 0 errors detected.",
            }
          : undefined,
    };

    onPostCreated(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in-50">
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/10 text-violet-600 dark:text-violet-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-foreground">
              Create New Discussion Thread
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Channel Picker */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-muted-foreground mb-1.5 font-bold">
              Target Channel
            </label>
            <select
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              {channels.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  #{ch.name} — {ch.description}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-muted-foreground mb-1.5 font-bold">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Optimizing WebSocket heartbeats with Redis Pub/Sub..."
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>

          {/* Markdown Content */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-muted-foreground mb-1.5 font-bold">
              Discussion Description & Context
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your architecture bottleneck, question, or showcase..."
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-y"
            />
          </div>

          {/* Snippet Accordion Toggle */}
          <div className="rounded-xl border border-border bg-secondary/30 p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-foreground">
                <Code2 className="h-4 w-4 text-violet-500" />
                Attach Code Snippet
              </span>
              <button
                type="button"
                onClick={() => setHasSnippet(!hasSnippet)}
                className={`rounded-full px-3 py-1 text-[11px] font-mono font-bold transition-colors ${
                  hasSnippet
                    ? "bg-violet-600 text-white"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {hasSnippet ? "Snippet Included ✓" : "+ Add Code"}
              </button>
            </div>

            {hasSnippet && (
              <div className="space-y-3 pt-2 border-t border-border/60">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">
                      Language
                    </label>
                    <select
                      value={snippetLanguage}
                      onChange={(e) => setSnippetLanguage(e.target.value as CodeLanguage)}
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
                    >
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="sql">SQL</option>
                      <option value="json">JSON</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">
                      File Name (optional)
                    </label>
                    <input
                      type="text"
                      value={snippetFilename}
                      onChange={(e) => setSnippetFilename(e.target.value)}
                      placeholder="e.g. server.ts"
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">
                    Code Content
                  </label>
                  <textarea
                    rows={4}
                    value={snippetCode}
                    onChange={(e) => setSnippetCode(e.target.value)}
                    placeholder="// Paste code snippet here..."
                    className="w-full rounded-lg border border-border bg-[#0e1017] p-2.5 font-mono text-[11px] text-[#e2e8f0] focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-muted-foreground mb-1.5 font-bold">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="e.g. nextjs, postgres, websockets"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 text-xs font-bold transition-all shadow-md shadow-violet-500/20"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Publish Discussion</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
