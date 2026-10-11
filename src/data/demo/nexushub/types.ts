export type MemberRole = "admin" | "mentor" | "member" | "guest";
export type MemberStatus = "online" | "idle" | "offline";

export interface Member {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: MemberRole;
  bio: string;
  status: MemberStatus;
  joinedDate: string;
  reputation: number;
  badges: string[];
}

export type ChannelType = "general" | "code-review" | "announcements" | "resources" | "showcase";

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: ChannelType;
  isPrivate: boolean;
  icon: string;
  memberCount: number;
  unreadCount?: number;
}

export type CodeLanguage = "typescript" | "python" | "sql" | "json";

export interface CodeSnippet {
  language: CodeLanguage;
  code: string;
  output?: string;
  fileName?: string;
}

export interface DiscussionReply {
  id: string;
  postId: string;
  author: Member;
  content: string;
  createdAt: string;
  likes: number;
  snippet?: CodeSnippet;
  isAcceptedAnswer?: boolean;
}

export interface DiscussionPost {
  id: string;
  channelId: string;
  author: Member;
  title: string;
  content: string;
  snippet?: CodeSnippet;
  createdAt: string;
  likes: number;
  repliesCount: number;
  tags: string[];
  isPinned?: boolean;
  replies?: DiscussionReply[];
}

export type EventType = "workshop" | "ama" | "project-review" | "hackathon";

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  speaker: Member;
  date: string;
  time: string;
  duration: string;
  type: EventType;
  locationUrl: string;
  rsvpCount: number;
  userRsvpd?: boolean;
}

export type AuditLogStatus = "success" | "flagged" | "blocked";

export interface AuditLogEntry {
  id: string;
  actor: Member;
  action: string;
  target: string;
  timestamp: string;
  status: AuditLogStatus;
  ipGeo: string;
}
