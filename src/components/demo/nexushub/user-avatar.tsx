import React from "react";

interface UserAvatarProps {
  name: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  role?: string;
}

// Deterministic vibrant color palettes for random-looking consistent avatars
const AVATAR_PALETTES = [
  { bg: "from-violet-600 to-indigo-600", text: "text-white" },
  { bg: "from-emerald-500 to-teal-700", text: "text-white" },
  { bg: "from-blue-600 to-cyan-600", text: "text-white" },
  { bg: "from-purple-600 to-pink-600", text: "text-white" },
  { bg: "from-amber-500 to-orange-600", text: "text-white" },
  { bg: "from-rose-500 to-red-600", text: "text-white" },
  { bg: "from-teal-500 to-emerald-700", text: "text-white" },
  { bg: "from-indigo-600 to-violet-800", text: "text-white" },
];

function getInitials(name: string): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function UserAvatar({
  name,
  className = "",
  size = "md",
}: UserAvatarProps) {
  const hash = hashString(name);
  const palette = AVATAR_PALETTES[hash % AVATAR_PALETTES.length];
  const initials = getInitials(name);

  // Geometric pattern seed based on hash
  const patternSeed = (hash % 4) + 1;

  const sizeClasses = {
    xs: "h-5 w-5 text-[9px]",
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-xs",
    lg: "h-10 w-10 text-sm",
    xl: "h-14 w-14 text-base font-bold",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-tr ${palette.bg} ${palette.text} font-mono font-bold select-none shadow-xs shrink-0 overflow-hidden border border-white/10 ${sizeClasses[size]} ${className}`}
      title={name}
      aria-label={name}
    >
      {/* Subtle abstract geometric overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {patternSeed === 1 && (
          <circle cx="20" cy="20" r="35" fill="white" />
        )}
        {patternSeed === 2 && (
          <polygon points="0,0 100,0 50,100" fill="white" />
        )}
        {patternSeed === 3 && (
          <rect x="30" y="30" width="80" height="80" transform="rotate(45 70 70)" fill="white" />
        )}
        {patternSeed === 4 && (
          <circle cx="80" cy="80" r="40" fill="white" />
        )}
      </svg>
      <span className="relative z-10 tracking-tight">{initials}</span>
    </div>
  );
}
