"use strict";exports.id=990,exports.ids=[990],exports.modules={2688:(a,b,c)=>{c.d(b,{BM:()=>e,IE:()=>f,Xi:()=>g,fw:()=>i,ol:()=>d,tv:()=>h});let d=[{id:"mem-1",name:"Sipho Ndlovu",handle:"siphondlovu",avatar:"siphondlovu",role:"admin",bio:"Founder & Lead Architect at NexusHub. Ex-Fintech staff engineer focused on distributed systems and high-throughput real-time engines.",status:"online",joinedDate:"2024-01-10",reputation:3420,badges:["Founder","Staff Architect","Cohort Lead"]},{id:"mem-2",name:"Elena Rostova",handle:"erostova",avatar:"erostova",role:"mentor",bio:"Principal Frontend Engineer & React 19 Core contributor. Passionate about RSC architecture, accessibility, and micro-interactions.",status:"online",joinedDate:"2024-02-15",reputation:2890,badges:["Core Mentor","React Whisperer","Top Reviewer"]},{id:"mem-3",name:"Liam Chen",handle:"liam_chen",avatar:"liam_chen",role:"mentor",bio:"AI Systems Engineer. Building autonomous agent swarms, evaluation pipelines, and local LLM fine-tuning harnesses.",status:"idle",joinedDate:"2024-03-01",reputation:2150,badges:["AI Specialist","Mentor of Month"]},{id:"mem-4",name:"Amara Okafor",handle:"amara_codes",avatar:"amara_codes",role:"member",bio:"Fullstack Developer specializing in Next.js, Postgres & pgvector. Building an automated talent-matching SaaS.",status:"online",joinedDate:"2024-04-12",reputation:1420,badges:["Top Contributor","Code Reviewer"]},{id:"mem-5",name:"Kaelen Botha",handle:"kbotha_dev",avatar:"kbotha_dev",role:"member",bio:"Backend enthusiast working with Go, Redis streams, and high-performance WebSockets. Passionate about sub-millisecond tail latency.",status:"online",joinedDate:"2024-04-20",reputation:1180,badges:["Performance Hawk"]},{id:"mem-6",name:"Priya Patel",handle:"priya_p",avatar:"priya_p",role:"member",bio:"Product designer transitioned to frontend engineer. Obsessed with Tailwind CSS design systems and Framer Motion layout animations.",status:"idle",joinedDate:"2024-05-02",reputation:940,badges:["UI Perfectionist"]},{id:"mem-7",name:"Tariq Mansoor",handle:"tariq_m",avatar:"tariq_m",role:"member",bio:"Cloud & DevOps engineer specializing in Kubernetes, Terraform, and automated CI/CD canary releases.",status:"offline",joinedDate:"2024-05-18",reputation:820,badges:["Infra Ninja"]},{id:"mem-8",name:"Zoe Van Zyl",handle:"zoe_vz",avatar:"zoe_vz",role:"guest",bio:"Junior developer exploring Next.js App Router and fullstack TypeScript architectures.",status:"online",joinedDate:"2024-06-01",reputation:310,badges:["Cohort Explorer"]}],e=[{id:"general",name:"general",description:"General cohort discussions, wins, daily standups & community announcements.",type:"general",isPrivate:!1,icon:"MessageSquare",memberCount:124,unreadCount:3},{id:"code-review",name:"code-review",description:"Submit pull requests, query optimizations, and architecture diagrams for mentor feedback.",type:"code-review",isPrivate:!1,icon:"Code2",memberCount:98,unreadCount:5},{id:"announcements",name:"announcements",description:"Official cohort curriculum updates, guest speaker schedules, and graduation milestones.",type:"announcements",isPrivate:!1,icon:"Bell",memberCount:124},{id:"react-nextjs",name:"react-nextjs",description:"Deep dive into React 19, Server Actions, PPR, RSC caching, and Tailwind architecture.",type:"resources",isPrivate:!1,icon:"Atom",memberCount:86,unreadCount:2},{id:"ai-engineering",name:"ai-engineering",description:"LLM agents, vector embeddings, chunking strategies, and production RAG evaluation.",type:"resources",isPrivate:!1,icon:"Cpu",memberCount:74},{id:"showcase",name:"showcase",description:"Ship in public! Post your deployed project demos, user metrics, and MVP launch links.",type:"showcase",isPrivate:!1,icon:"Sparkles",memberCount:112}],f=[{id:"post-1",channelId:"code-review",author:d[3],title:"Optimizing PostgreSQL connection pooling with Prisma Accelerate & PgBouncer in serverless edge",content:"Hey cohort! We were hitting connection pool exhaustion on high-concurrency spikes during our checkout flow. Here is the connection manager with exponential backoff and circuit breaker logic we implemented. Reviewing for race conditions before deploying to production.",snippet:{language:"typescript",fileName:"lib/db-pool.ts",code:`import { PrismaClient } from "@prisma/client";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

export const db = globalThis.prismaGlobal ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  datasourceUrl: process.env.DATABASE_URL_ACCELERATE,
});

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}

// Resilient transaction executor with retry backoff
export async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (err: any) {
      if (err.code === "P2028" || err.message?.includes("connection pool")) {
        attempt++;
        const backoffMs = Math.pow(2, attempt) * 100;
        await new Promise((res) => setTimeout(res, backoffMs));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Pool exhausted after retries");
}`,output:"Pool status: 12 active, 0 queued, latency: 14ms (Healthy)"},createdAt:"2024-06-11T14:30:00Z",likes:24,repliesCount:3,tags:["typescript","postgres","prisma","performance"],isPinned:!0,replies:[{id:"rep-1",postId:"post-1",author:d[0],content:"Great implementation Amara! One recommendation: add Jitter to your exponential backoff formula (`backoffMs + Math.random() * 50`). This prevents the 'thundering herd' problem when thousands of lambdas wake simultaneously.",createdAt:"2024-06-11T14:45:00Z",likes:18,isAcceptedAnswer:!0},{id:"rep-2",postId:"post-1",author:d[4],content:"Tested this on our load test harness with 1,500 req/sec — dropped 504 gateway timeouts down to zero.",createdAt:"2024-06-11T15:10:00Z",likes:9}]},{id:"post-2",channelId:"react-nextjs",author:d[1],title:"Mastering React 19 Server Actions & Optimistic UI Updates: Architecture Guide",content:"Many developers ask how to manage rollback states when server actions encounter database validation rejections. Here is the canonical pattern using useOptimistic combined with React 19 useActionState.",snippet:{language:"typescript",fileName:"components/optimistic-counter.tsx",code:`"use client";

import { useOptimistic, useTransition } from "react";
import { likeDiscussionAction } from "@/app/actions/discussions";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export function OptimisticLike({ postId, initialLikes }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    initialLikes,
    (current, update: number) => current + update
  );

  const handleLike = () => {
    startTransition(async () => {
      setOptimisticLikes(1);
      await likeDiscussionAction(postId);
    });
  };

  return (
    <button onClick={handleLike} disabled={isPending} className="flex items-center gap-1.5">
      <span>❤️ {optimisticLikes}</span>
    </button>
  );
}`,output:"Renders in 0ms with instant optimistic client update"},createdAt:"2024-06-10T11:20:00Z",likes:42,repliesCount:4,tags:["react19","nextjs","optimistic-ui","ux"],isPinned:!0},{id:"post-3",channelId:"ai-engineering",author:d[2],title:"Implementing Semantic Token-Bucket Rate Limiting with Redis & Lua script",content:"When serving open-source LLM inferences, simple IP limits aren't enough. We need atomic rate limiting that accounts for token volume per minute. Here is the production Redis Lua script we use.",snippet:{language:"python",fileName:"services/rate_limiter.py",code:`import redis
import time

redis_client = redis.Redis(host="localhost", port=6379, db=0)

LUA_TOKEN_BUCKET = """
local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local cost = tonumber(ARGV[3])
local now = tonumber(ARGV[4])

local data = redis.call("HMGET", key, "tokens", "last_updated")
local tokens = tonumber(data[1])
local last_updated = tonumber(data[2])

if not tokens then
    tokens = capacity
    last_updated = now
else
    local elapsed = now - last_updated
    tokens = math.min(capacity, tokens + elapsed * refill_rate)
end

if tokens >= cost then
    tokens = tokens - cost
    redis.call("HMSET", key, "tokens", tokens, "last_updated", now)
    redis.call("EXPIRE", key, 3600)
    return {1, tokens}
else
    return {0, tokens}
end
"""

def check_tokens(user_id: str, tokens_needed: int) -> bool:
    res = redis_client.eval(LUA_TOKEN_BUCKET, 1, f"rate:{user_id}", 100000, 1000, tokens_needed, time.time())
    return bool(res[0])`,output:"Execution time: 0.8ms per token evaluation"},createdAt:"2024-06-09T09:15:00Z",likes:31,repliesCount:2,tags:["python","redis","ratelimit","ai-systems"]},{id:"post-4",channelId:"showcase",author:d[5],title:"Shipped v1 of DesignTokens Studio! Generated Tailwind configs from Figma styles",content:"Super thrilled to share my cohort demo project! It extracts Figma variables via the REST API and automatically compiles CSS variables, Tailwind v3/v4 color ramps, and TypeScript typography tokens.",createdAt:"2024-06-08T16:40:00Z",likes:38,repliesCount:5,tags:["showcase","design-systems","tailwind","figma"]},{id:"post-5",channelId:"general",author:d[0],title:"Welcome to Cohort 04! Key milestones, mentorship pairings & code review guidelines",content:"Welcome everyone to NexusHub Cohort 04! Over the next 12 weeks, we will build 4 production-grade fullstack web applications. Pair programming rotations begin this Wednesday. Check the Event Calendar for masterclass dates.",createdAt:"2024-06-07T08:00:00Z",likes:56,repliesCount:12,tags:["announcement","cohort04","welcome"],isPinned:!0}],g=[{id:"evt-1",title:"Live PR Teardown: Real-Time WebSockets & Distributed Redis in Next.js",description:"Deep dive into bi-directional client state syncing, heartbeats, automatic reconnection backoff, and Redis Pub/Sub horizontal scaling.",speaker:d[0],date:"2025-03-20",time:"18:00 SAST",duration:"90 mins",type:"workshop",locationUrl:"https://meet.nexushub.dev/room/pr-teardown",rsvpCount:68,userRsvpd:!0},{id:"evt-2",title:"AMA with Elena Rostova: Next.js 15 App Router Architecture & Edge Performance",description:"Ask anything about React Server Components, server actions security boundaries, sub-second TTFB, and zero-bundle size strategies.",speaker:d[1],date:"2025-03-24",time:"17:30 SAST",duration:"60 mins",type:"ama",locationUrl:"https://meet.nexushub.dev/room/ama-elena",rsvpCount:54,userRsvpd:!1},{id:"evt-3",title:"Weekend Hackathon: Building Autonomous AI Agents with Tool Calling",description:"48-hour sprint to build multi-agent workflows, browser automation bots, and self-correcting coding assistants.",speaker:d[2],date:"2025-03-29",time:"09:00 SAST",duration:"48 hours",type:"hackathon",locationUrl:"https://meet.nexushub.dev/room/ai-hackathon",rsvpCount:89,userRsvpd:!0},{id:"evt-4",title:"Cohort 04 Midterm Project Showcase & Investor Pitch Day",description:"10 selected member teams present their working MVPs to visiting CTOs, venture angels, and senior engineering mentors.",speaker:d[0],date:"2025-04-05",time:"16:00 SAST",duration:"120 mins",type:"project-review",locationUrl:"https://meet.nexushub.dev/room/showcase-day",rsvpCount:112,userRsvpd:!1}],h=[{id:"log-1",actor:d[0],action:"Promoted member Elena Rostova to Core Mentor",target:"Member: mem-2",timestamp:"10 minutes ago",status:"success",ipGeo:"Johannesburg, ZA (102.132.8.4)"},{id:"log-2",actor:d[3],action:"Automated spam heuristic flagged suspicious hyperlink frequency",target:"Post: Draft #849",timestamp:"32 minutes ago",status:"blocked",ipGeo:"Lagos, NG (105.112.44.12)"},{id:"log-3",actor:d[1],action:"Accepted answer mark on discussion thread #post-1",target:"Reply: rep-1",timestamp:"1 hour ago",status:"success",ipGeo:"Berlin, DE (188.194.22.8)"},{id:"log-4",actor:d[0],action:"Created new restricted channel #ai-engineering",target:"Channel: ai-engineering",timestamp:"3 hours ago",status:"success",ipGeo:"Johannesburg, ZA (102.132.8.4)"},{id:"log-5",actor:d[7],action:"Guest attempted restricted Sandbox shell execution without 2FA",target:"Sandbox Container: sand-92",timestamp:"5 hours ago",status:"blocked",ipGeo:"Cape Town, ZA (197.229.3.82)"},{id:"log-6",actor:d[2],action:"Scheduled community masterclass on AI Autonomous Agents",target:"Event: evt-3",timestamp:"Yesterday",status:"success",ipGeo:"Singapore, SG (118.200.41.9)"}];function i(a){try{let b=new Date(a),c=new Date().getTime()-b.getTime(),d=Math.floor(c/6e4),e=Math.floor(d/60),f=Math.floor(e/24);if(d<60)return`${Math.max(1,d)}m ago`;if(e<24)return`${e}h ago`;if(f<7)return`${f}d ago`;return b.toLocaleDateString("en-ZA",{month:"short",day:"numeric"})}catch{return a}}},74291:(a,b,c)=>{c.d(b,{H:()=>f});var d=c(21124);c(38301);let e=[{bg:"from-violet-600 to-indigo-600",text:"text-white"},{bg:"from-emerald-500 to-teal-700",text:"text-white"},{bg:"from-blue-600 to-cyan-600",text:"text-white"},{bg:"from-purple-600 to-pink-600",text:"text-white"},{bg:"from-amber-500 to-orange-600",text:"text-white"},{bg:"from-rose-500 to-red-600",text:"text-white"},{bg:"from-teal-500 to-emerald-700",text:"text-white"},{bg:"from-indigo-600 to-violet-800",text:"text-white"}];function f({name:a,className:b="",size:c="md"}){let f=function(a){let b=0;for(let c=0;c<a.length;c++)b=(b<<5)-b+a.charCodeAt(c)|0;return Math.abs(b)}(a),g=e[f%e.length],h=function(a){if(!a)return"U";let b=a.trim().split(/\s+/);return 1===b.length?b[0].slice(0,2).toUpperCase():(b[0][0]+b[b.length-1][0]).toUpperCase()}(a),i=f%4+1;return(0,d.jsxs)("div",{className:`relative inline-flex items-center justify-center rounded-full bg-gradient-to-tr ${g.bg} ${g.text} font-mono font-bold select-none shadow-xs shrink-0 overflow-hidden border border-white/10 ${{xs:"h-5 w-5 text-[9px]",sm:"h-6 w-6 text-[10px]",md:"h-8 w-8 text-xs",lg:"h-10 w-10 text-sm",xl:"h-14 w-14 text-base font-bold"}[c]} ${b}`,title:a,"aria-label":a,children:[(0,d.jsxs)("svg",{className:"absolute inset-0 h-full w-full opacity-20 pointer-events-none",viewBox:"0 0 100 100",preserveAspectRatio:"none",children:[1===i&&(0,d.jsx)("circle",{cx:"20",cy:"20",r:"35",fill:"white"}),2===i&&(0,d.jsx)("polygon",{points:"0,0 100,0 50,100",fill:"white"}),3===i&&(0,d.jsx)("rect",{x:"30",y:"30",width:"80",height:"80",transform:"rotate(45 70 70)",fill:"white"}),4===i&&(0,d.jsx)("circle",{cx:"80",cy:"80",r:"40",fill:"white"})]}),(0,d.jsx)("span",{className:"relative z-10 tracking-tight",children:h})]})}}};