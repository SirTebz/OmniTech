"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { communityEvents } from "@/data/demo/nexushub/data";
import { EventCard } from "@/components/demo/nexushub/event-card";
import { Calendar, PlusCircle, Check, Radio } from "lucide-react";

export default function EventsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredEvents = communityEvents.filter((evt) => {
    if (filter === "all") return true;
    return evt.type === filter;
  });

  return (
    <div className="py-8 sm:py-10 bg-background flex-1">
      <Container size="full" className="px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/10 text-violet-600 dark:text-violet-400">
                <Calendar className="h-4 w-4" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Live Cohort Events & Masterclasses
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Architecture teardowns, live coding AMAs, and weekend project demos with senior engineering mentors.
            </p>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1">
              <Radio className="h-3 w-3 text-emerald-500 animate-pulse" />
              <span className="text-foreground font-semibold">WebRTC Edge Stage Active</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-card p-4 rounded-2xl border border-border">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", label: "All Events" },
              { id: "workshop", label: "Workshops & Teardowns" },
              { id: "ama", label: "AMAs & Office Hours" },
              { id: "hackathon", label: "Hackathons" },
              { id: "project-review", label: "Project Reviews" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                  filter === tab.id
                    ? "bg-violet-600 text-white font-bold"
                    : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-muted-foreground">
            Showing {filteredEvents.length} events
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Container>
    </div>
  );
}
