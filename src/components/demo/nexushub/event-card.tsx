"use client";

import { useState } from "react";
import Image from "next/image";
import { CommunityEvent } from "@/data/demo/nexushub/types";
import { Calendar, Clock, Video, Download, Check, Users, Sparkles } from "lucide-react";

interface EventCardProps {
  event: CommunityEvent;
}

export function EventCard({ event }: EventCardProps) {
  const [rsvpd, setRsvpd] = useState(event.userRsvpd ?? false);
  const [count, setCount] = useState(event.rsvpCount);
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  const handleToggleRsvp = () => {
    if (rsvpd) {
      setCount((c) => c - 1);
      setRsvpd(false);
    } else {
      setCount((c) => c + 1);
      setRsvpd(true);
    }
  };

  const handleDownloadIcs = () => {
    // Generate valid RFC 5545 iCalendar data
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NexusHub//Community Events//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.locationUrl}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedIcs(true);
    setTimeout(() => setDownloadedIcs(false), 2500);
  };

  const typeBadges = {
    workshop: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    ama: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    hackathon: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    "project-review": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-4 shadow-xs hover:border-violet-500/40 transition-all flex flex-col justify-between">
      <div className="space-y-3.5">
        {/* Top Badges & Type */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase border ${
              typeBadges[event.type]
            }`}
          >
            {event.type}
          </span>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-violet-500" />
              {event.duration}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
            {event.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {event.description}
          </p>
        </div>

        {/* Schedule & Location */}
        <div className="rounded-xl border border-border/80 bg-secondary/40 p-3 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-violet-500" />
              Date:
            </span>
            <span className="font-bold text-foreground">{event.date}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-violet-500" />
              Time:
            </span>
            <span className="font-bold text-foreground">{event.time}</span>
          </div>
        </div>

        {/* Speaker Profile */}
        <div className="flex items-center gap-3 pt-1">
          <div className="relative h-9 w-9 rounded-full overflow-hidden border border-border">
            <Image
              src={event.speaker.avatar}
              alt={event.speaker.name}
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">
              {event.speaker.name}
            </div>
            <div className="text-[10px] font-mono text-muted-foreground capitalize">
              {event.speaker.role} • @{event.speaker.handle}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
          <Users className="h-3.5 w-3.5 text-emerald-500" />
          <span className="font-bold text-foreground">{count}</span> Attending
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadIcs}
            className="rounded-xl border border-border hover:bg-secondary p-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            title="Download .ICS Calendar"
          >
            {downloadedIcs ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleToggleRsvp}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-xs ${
              rsvpd
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-500/20"
            }`}
          >
            {rsvpd ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Going ✓</span>
              </>
            ) : (
              <span>RSVP Seat</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
