export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "Web Application" | "Enterprise Web" | "FinTech Platform" | "SaaS System";
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
  client?: string;
  results: { metric: string; label: string }[];
  accentColor?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "airline-reservation-system",
    slug: "airline-reservation-system",
    title: "AeroReserve Aviation Platform",
    category: "Web Application",
    shortDescription:
      "Full-stack flight discovery, seat allocation, and real-time reservation system with multi-currency checkout.",
    description:
      "A high-availability airline ticketing and flight management portal designed to streamline booking flows, seat matrix selection, dynamic pricing adjustments, and automated passenger itineraries.",
    problem:
      "A regional charter airline struggled with third-party aggregators charging excessive commission fees and an outdated legacy booking portal that suffered from frequent latency issues and mobile booking abandonment.",
    solution:
      "Engineered an ultra-responsive Next.js web application coupled with an event-driven booking service. Integrated real-time seat lock mechanisms with optimistic UI updates and instant PDF boarding pass generation.",
    keyFeatures: [
      "Dynamic Interactive Cabin Seat Selector (SVG & Canvas based)",
      "Instant Flight Search & Fare Matrix with multi-city routing",
      "Secure Multi-Currency Payment Gateway with 3D Secure verification",
      "Automated e-Ticket & Itinerary PDF Generator with QR check-in codes",
      "Admin Fleet & Schedule Management Dashboard",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "Stripe API"],
    liveUrl: "/demo/airline-reservation-system",
    githubUrl: "https://github.com/omnitech-digital/aero-reserve-platform",
    featured: true,
    year: "2025",
    client: "AeroReserve Charters",
    results: [
      { metric: "68%", label: "Increase in direct mobile bookings" },
      { metric: "< 450ms", label: "Average flight search query response" },
      { metric: "99.98%", label: "Uptime across peak seasonal traffic" },
    ],
  },
  {
    id: "personal-finance-tracker",
    slug: "personal-finance-tracker",
    title: "ApexWealth Financial Intelligence",
    category: "FinTech Platform",
    shortDescription:
      "Intelligent cash flow analytics, multi-account ledger, and predictive expense forecasting engine.",
    description:
      "A privacy-focused financial management suite providing deep visual analytics, customizable budget thresholds, automated recurring transaction detection, and encrypted data syncing across devices.",
    problem:
      "Modern professionals and freelancers often maintain multiple accounts across traditional banks, investment portals, and crypto wallets, making consolidated net worth and tax forecasting fragmented and manual.",
    solution:
      "Built a secure, client-side encrypted analytics platform using React, Next.js, and interactive charting libraries. Developed automated transaction categorization heuristics and proactive budget alerts.",
    keyFeatures: [
      "Dynamic Cashflow & Expense Breakdown Visualizations",
      "Multi-Account Balance Aggregation & Currency Conversion",
      "Predictive Monthly Expense & Savings Forecasting",
      "Zero-Knowledge Client-Side Encryption for Sensitive Records",
      "CSV & OFX Financial Statement Importer with Duplicate Detection",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Recharts", "PostgreSQL", "Zod"],
    liveUrl: "/demo/personal-finance-tracker",
    githubUrl: "https://github.com/omnitech-digital/apex-wealth-analytics",
    featured: true,
    year: "2025",
    client: "Internal Product / Showcase",
    results: [
      { metric: "100%", label: "Client-side private data sovereignty" },
      { metric: "12,000+", label: "Transactions indexed with zero lag" },
      { metric: "0.2s", label: "Real-time chart filter recalculation" },
    ],
  },
  {
    id: "community-dashboard",
    slug: "community-dashboard",
    title: "NexusHub Community Engine",
    category: "SaaS System",
    shortDescription:
      "Multi-tenant collaboration workspace with threaded discussions, live events, and moderation tooling.",
    description:
      "A scalable community platform engineered for creator ecosystems and private professional cohorts, featuring role-gated content, event calendars, markdown authoring, and granular audit logs.",
    problem:
      "A developer academy needed a branded, distraction-free environment to host cohort conversations, resource repositories, and project reviews without the chaotic noise and fragmentation of Discord or Slack.",
    solution:
      "Designed and delivered a modern web app with real-time websocket discussions, rich code block rendering, member directories, and customizable access tiers.",
    keyFeatures: [
      "Threaded Discussions with Syntax-Highlighted Code Playgrounds",
      "Role-Based Permission Matrix (Admin, Mentor, Member, Guest)",
      "Interactive Event Calendar with Calendar (.ics) Sync",
      "Granular Activity Auditing & Anti-Spam Moderation Filters",
      "Dark / Light UI Theme with Instant Hotkey Navigation",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "Redis", "PostgreSQL"],
    liveUrl: "https://nexushub-demo.omnitech.dev",
    githubUrl: "https://github.com/omnitech-digital/nexus-hub-community",
    featured: true,
    year: "2024",
    client: "Nexus Cohorts",
    results: [
      { metric: "4.2x", label: "Higher weekly active member participation" },
      { metric: "99/100", label: "Lighthouse accessibility & best practice score" },
      { metric: "< 50ms", label: "Websocket message broadcast latency" },
    ],
  },
  {
    id: "logistrack-supply-portal",
    slug: "logistrack-supply-portal",
    title: "LogisTrack Fleet & Freight Portal",
    category: "Enterprise Web",
    shortDescription:
      "Real-time GPS telematics dashboard, delivery dispatch dispatcher, and automated consignment tracker.",
    description:
      "An enterprise freight coordination platform enabling logistics operators to monitor fleet coordinates, calculate optimal route waypoints, and provide clients with live tracking links.",
    problem:
      "A mid-sized cross-border haulage firm relied on phone calls and WhatsApp groups for vehicle updates, resulting in delays, lost manifests, and frustrated consignees.",
    solution:
      "Constructed a high-throughput dispatch web application with GPS mapping integration, digital signature capture upon delivery, and automated SMS/Email status updates.",
    keyFeatures: [
      "Live Vehicle Geo-Tracking with Interactive Map Bounds",
      "Automated Waybill & Proof of Delivery (POD) Archival",
      "Driver Shift Scheduling & Route Efficiency Calculations",
      "Client Self-Service Public Tracking Links",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Mapbox GL", "ASP.NET Core API", "PostgreSQL"],
    liveUrl: "https://logistrack-demo.omnitech.dev",
    githubUrl: "https://github.com/omnitech-digital/logistrack-freight-portal",
    featured: false,
    year: "2024",
    client: "TransVanguard Logistics",
    results: [
      { metric: "85%", label: "Reduction in customer tracking phone calls" },
      { metric: "14%", label: "Fuel route optimization efficiency" },
    ],
  },
];
