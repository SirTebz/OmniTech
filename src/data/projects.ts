export type ProjectCategory =
  | "All Projects"
  | "Software Development"
  | "Data Analytics"
  | "Application Support"
  | "IT Support & Helpdesk"
  | "Web Development";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "Software Development" | "Data Analytics" | "Application Support" | "IT Support & Helpdesk" | "Web Development";
  categoryBadge: string;
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  technologies: string[];
  liveUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
  client?: string;
  projectType: "Interactive Demo" | "Production Application" | "Demonstration Project";
  results: { metric: string; label: string }[];
  accentColor?: string;
}

export const projectsData: ProjectItem[] = [
  // 1. IT Support & Helpdesk Demo
  {
    id: "it-service-desk",
    slug: "it-service-desk",
    title: "OmniDesk — IT Service Desk & Ticket Management",
    category: "IT Support & Helpdesk",
    categoryBadge: "IT Support & Helpdesk",
    shortDescription:
      "Full-featured IT service desk application simulating ticket lifecycles, SLA timers, technician assignment, and troubleshooting workflows.",
    description:
      "OmniDesk demonstrates structured IT helpdesk operations. Visitors can interactively triage simulated support issues (Wi-Fi dropouts, Outlook sync errors, printer offline problems, account lockouts), assign technicians, update priorities, record diagnostic resolution notes, and inspect resolution metrics.",
    problem:
      "Businesses without a structured ticketing workflow suffer from lost emails, unassigned issues, breached resolution times, and lack of accountability across technical support operations.",
    solution:
      "Engineered an interactive IT helpdesk environment in Next.js featuring real-time ticket state management, SLA timers, priority categorization, full-text search, technician assignment, and local persistence with a deterministic reset button.",
    keyFeatures: [
      "Dynamic Helpdesk Dashboard with Open, In-Progress, High-Priority, and SLA Metrics",
      "Interactive Ticket Creation & Triage (Hardware, Software, Network, M365, Access, Printers)",
      "Technician Assignment & Priority Reclassification (Low, Medium, High, Critical)",
      "Diagnostic Activity Timeline & Step-by-Step Resolution Documentation",
      "Multi-Filter Navigation (Status, Priority, Technician, Category) & Full-Text Search",
      "Deterministic Sample Data Generator with Instant Reset Capability",
    ],
    technologies: [
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide React",
      "LocalStorage Persistence",
      "Zod",
    ],
    demoUrl: "/demos/it-service-desk",
    liveUrl: "/demos/it-service-desk",
    githubUrl: "https://github.com/SirTebz/OmniTech",
    featured: true,
    year: "2026",
    client: "Simulated IT Operations",
    projectType: "Interactive Demo",
    results: [
      { metric: "< 15min", label: "Simulated First Response SLA target" },
      { metric: "100%", label: "Interactive browser demonstration without login" },
      { metric: "Zero Latency", label: "Client-side instantaneous ticket updates" },
    ],
  },

  // 2. Application Support & Incident Management Demo
  {
    id: "appwatch",
    slug: "appwatch",
    title: "AppWatch — Application Support & Incident Management",
    category: "Application Support",
    categoryBadge: "Application Support",
    shortDescription:
      "Simulated production application observability environment with live incident investigation, SQL data checks, and health telemetry.",
    description:
      "AppWatch represents an enterprise application support monitoring station. It tracks 12 simulated internal business systems (HR Portal, Payment Gateway, ERP, Inventory Service), monitors error spikes and latency, logs L1/L2 incident tickets, and demonstrates root-cause investigation workflows.",
    problem:
      "When business-critical applications fail, support teams frequently waste hours figuring out whether the fault lies in the database, API timeout, authentication token, or application code.",
    solution:
      "Built a unified application support control plane simulating live system health metrics, incident triage, SQL query troubleshooting logs, and structured post-mortem root-cause documentation.",
    keyFeatures: [
      "Application Health Fleet Monitor (Operational, Degraded, Critical Outage states)",
      "Incident Lifecycle Management (New, Investigating, Identified, Monitoring, Resolved)",
      "Simulated Diagnostic Tooling: Database connection test, API latency probe, log analyzer",
      "Real-world Troubleshooting Scenarios (SQL lockup, token expiration, memory spike, 504 timeout)",
      "Root Cause Analysis (RCA) Logger with Prevention Action Plans",
      "Simulated Real-Time Incident Feed & Health Metrics Graphs",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Application Observability Design",
      "State Management",
      "Incident Response Workflows",
    ],
    demoUrl: "/demos/appwatch",
    liveUrl: "/demos/appwatch",
    githubUrl: "https://github.com/SirTebz/OmniTech",
    featured: true,
    year: "2026",
    client: "Simulated Production Systems",
    projectType: "Interactive Demo",
    results: [
      { metric: "99.95%", label: "Target Fleet Availability" },
      { metric: "12 Systems", label: "Monitored Application Fleet" },
      { metric: "L1 & L2", label: "Full Incident Triage Simulation" },
    ],
  },

  // 3. Business Intelligence Analytics Demo
  {
    id: "insighthub",
    slug: "insighthub",
    title: "InsightHub — Business Intelligence & Sales Analytics",
    category: "Data Analytics",
    categoryBadge: "Data Analytics & BI",
    shortDescription:
      "Executive business intelligence platform with dynamic multi-metric KPIs, time-series charts, dimensional filters, and CSV dataset export.",
    description:
      "InsightHub showcases practical business analytics engineering. Built with a realistic dataset of 150+ transactions across South African regions (Gauteng, Western Cape, KwaZulu-Natal), it dynamically computes gross revenue, margin percentages, regional volume, and best-performing product categories as filters are adjusted.",
    problem:
      "Business owners and executives frequently struggle to extract clear direction from raw transactional tables trapped across multiple POS or billing systems.",
    solution:
      "Engineered an interactive executive dashboard with live multi-filter recalculations, time-series trend visualisations, automated high-level insights, and CSV data export.",
    keyFeatures: [
      "Dynamic Revenue, Orders, Average Order Value (AOV), and Growth KPI Cards",
      "Synchronised Multi-Dimensional Filtering (Region, Product Category, Time Horizon)",
      "Interactive Trend Visualisations & Category Breakdown Charts",
      "Automated Narrative Insights Engine (identifies top performer, margin risks, and peak periods)",
      "Searchable, Sortable Transaction Table with Pagination",
      "Instant One-Click Filtered CSV Dataset Export",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Analytical Data Modeling",
      "Data Visualization",
      "CSV Stream Generation",
    ],
    demoUrl: "/demos/insighthub",
    liveUrl: "/demos/insighthub",
    githubUrl: "https://github.com/SirTebz/OmniTech",
    featured: true,
    year: "2026",
    client: "Simulated Enterprise Dataset",
    projectType: "Interactive Demo",
    results: [
      { metric: "150+ Records", label: "Dynamic In-Memory Dataset" },
      { metric: "0ms Delay", label: "Instantaneous Filter Recalculation" },
      { metric: "1-Click", label: "Direct CSV Data Export" },
    ],
  },

  // 4. IT Support Analytics Demo
  {
    id: "itops-insights",
    slug: "itops-insights",
    title: "ITOps Insights — IT Service Desk Operational Analytics",
    category: "Data Analytics",
    categoryBadge: "IT Support Analytics",
    shortDescription:
      "Operational analytics dashboard evaluating IT helpdesk performance, SLA compliance rates, technician workload, and resolution velocities.",
    description:
      "ITOps Insights proves how data analytics elevates IT operations. By analysing historical ticket logs, the dashboard measures first-contact resolution rates, SLA compliance percentages, common failure categories, and individual technician workload distributions.",
    problem:
      "IT managers often lack visibility into service desk bottlenecks, leading to overburdened technicians, repeated hardware failures, and unnoticed SLA breaches.",
    solution:
      "Developed a dedicated IT operations analytics engine that transforms raw ticket logs into actionable service metrics, identifying problem equipment and workload imbalances.",
    keyFeatures: [
      "SLA Compliance Gauges & Breach Prevention Indicators",
      "Technician Workload & Resolution Velocity Comparison Matrix",
      "Incident Category Frequency Analysis (Hardware vs Network vs Access)",
      "Backlog Aging & Resolution Time Distribution Curves",
      "Search, Multi-Filter (Technician, Priority, Category) & Filtered CSV Export",
      "Actionable Recommendations Engine based on operational outliers",
    ],
    technologies: [
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "ITIL Operational Metrics",
      "Statistical Aggregations",
    ],
    demoUrl: "/demos/itops-insights",
    liveUrl: "/demos/itops-insights",
    githubUrl: "https://github.com/SirTebz/OmniTech",
    featured: true,
    year: "2026",
    client: "Simulated IT Operations",
    projectType: "Interactive Demo",
    results: [
      { metric: "94.2%", label: "Target Helpdesk SLA Compliance" },
      { metric: "120+ Logs", label: "Analyzed Service Desk Records" },
      { metric: "Actionable", label: "Automated Workload Insights" },
    ],
  },

  // 5. Personal Finance Analytics Demo
  {
    id: "fintrack",
    slug: "fintrack",
    title: "FinTrack — Personal Finance Analytics & Cash Flow Intelligence",
    category: "Data Analytics",
    categoryBadge: "Financial Analytics",
    shortDescription:
      "Interactive South African Rand (ZAR) personal finance suite with budget utilisation tracking, spending breakdown, and cash flow forecasting.",
    description:
      "FinTrack is an interactive financial management demonstration built around South African Rand (ZAR). It provides real-time income and expense tracking, category budget utilisation bars, transaction management (add/edit/delete), and cash flow visualisations.",
    problem:
      "Individuals and freelancers struggle to maintain a unified, clear understanding of their monthly savings rate, discretionary spending habits, and budget burn rate.",
    solution:
      "Built a responsive, privacy-preserving personal finance analytics tool with dynamic ZAR formatting, interactive category breakdowns, monthly cash flow curves, and full local persistence.",
    keyFeatures: [
      "South African Rand (ZAR) Native Currency Formatting & Real-Time Balances",
      "Dynamic Income, Expense, Net Savings & Savings Rate KPI Cards",
      "Category Budget Utilisation Progress Bars with Over-Budget Alerts",
      "Add, Filter, and Manage Sample Financial Transactions with LocalStorage Sync",
      "Interactive Monthly Cashflow Trends & Expense Distribution Charts",
      "Instant One-Click Deterministic Data Reset & CSV Statement Export",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "LocalStorage Data Engine",
      "Financial Analytics Algorithms",
    ],
    demoUrl: "/demos/fintrack",
    liveUrl: "/demos/fintrack",
    githubUrl: "https://github.com/SirTebz/OmniTech",
    featured: true,
    year: "2026",
    client: "Personal Project / Showcase",
    projectType: "Interactive Demo",
    results: [
      { metric: "ZAR (R)", label: "Native South African Rand formatting" },
      { metric: "100%", label: "Client-side private ledger simulation" },
      { metric: "Dynamic", label: "Live budget threshold calculation" },
    ],
  },

  // 6. Airline Reservation System (Web Application / Software Dev)
  {
    id: "airline-reservation-system",
    slug: "airline-reservation-system",
    title: "AeroReserve Aviation Platform",
    category: "Software Development",
    categoryBadge: "Web Application",
    shortDescription:
      "Full-stack flight discovery, interactive seat allocation, and real-time reservation system with multi-currency booking flows.",
    description:
      "A high-availability airline ticketing and flight management portal designed to streamline booking flows, interactive seat matrix selection, dynamic pricing adjustments, and passenger itineraries.",
    problem:
      "A regional charter airline struggled with aggregators charging excessive commission fees and an outdated booking portal that suffered from latency issues and mobile booking abandonment.",
    solution:
      "Engineered an ultra-responsive Next.js web application coupled with an event-driven booking service. Integrated real-time seat lock mechanisms with optimistic UI updates and instant itinerary generation.",
    keyFeatures: [
      "Dynamic Interactive Cabin Seat Selector (SVG based layout)",
      "Instant Flight Search & Fare Matrix with multi-city routing",
      "Multi-Currency Payment Gateway Simulator with Instant Confirmation",
      "Automated e-Ticket & Itinerary Generator with QR check-in codes",
      "Admin Fleet & Schedule Management Dashboard",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "State Architecture"],
    demoUrl: "/demo/airline-reservation-system",
    liveUrl: "/demo/airline-reservation-system",
    githubUrl: "https://github.com/SirTebz/OmniTech",
    featured: false,
    year: "2025",
    client: "AeroReserve Charters (Showcase)",
    projectType: "Demonstration Project",
    results: [
      { metric: "68%", label: "Increase in direct mobile bookings" },
      { metric: "< 450ms", label: "Average flight search query response" },
      { metric: "99.98%", label: "Uptime across peak seasonal traffic" },
    ],
  },

  // 7. Community Dashboard (Software Dev / SaaS System)
  {
    id: "community-dashboard",
    slug: "community-dashboard",
    title: "NexusHub Community Engine",
    category: "Software Development",
    categoryBadge: "SaaS Platform",
    shortDescription:
      "Multi-tenant collaboration workspace with role-gated discussions, events calendar, syntax-highlighted code sharing, and audit logging.",
    description:
      "A scalable community platform engineered for creator ecosystems and private professional cohorts, featuring role-gated content, event calendars, markdown authoring, and granular audit logs.",
    problem:
      "A developer academy needed a branded, distraction-free environment to host cohort conversations, resource repositories, and project reviews without the noisy fragmentation of chat apps.",
    solution:
      "Designed and delivered a modern web app with threaded discussions, rich code block rendering, member directories, and customizable access tiers.",
    keyFeatures: [
      "Threaded Discussions with Syntax-Highlighted Code Playgrounds",
      "Role-Based Permission Matrix (Admin, Mentor, Member, Guest)",
      "Interactive Event Calendar with Calendar (.ics) Sync",
      "Granular Activity Auditing & Anti-Spam Moderation Filters",
      "Dark / Light UI Theme with Instant Hotkey Navigation",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Design Systems"],
    demoUrl: "/demo/community-dashboard",
    liveUrl: "/demo/community-dashboard",
    githubUrl: "https://github.com/SirTebz/OmniTech",
    featured: false,
    year: "2025",
    client: "Nexus Cohorts",
    projectType: "Demonstration Project",
    results: [
      { metric: "4.2x", label: "Higher weekly active member participation" },
      { metric: "99/100", label: "Lighthouse accessibility & best practice score" },
      { metric: "< 50ms", label: "Simulated broadcast latency" },
    ],
  },

  // 8. QuikTab Invoicing Platform (Software Development / Production SaaS)
  {
    id: "quiktab-invoicing-platform",
    slug: "quiktab-invoicing-platform",
    title: "QuikTab Invoicing Platform",
    category: "Software Development",
    categoryBadge: "Production Application",
    shortDescription:
      "Lightweight, zero-dependency invoicing application with vector PDF generation, client payment portals, and PayFast integration.",
    description:
      "QuikTab is a lightweight, zero-dependency invoicing application engineered for freelancers, contractors, entrepreneurs, and small businesses to create professional invoices, send secure public links, accept online payments via PayFast, and track deliveries effortlessly.",
    problem:
      "Freelancers and small businesses frequently struggle with bloated, costly accounting software with sluggish interfaces, complicated setup, lack of localized South African payment gateways, and fragmented payment tracking.",
    solution:
      "Engineered an ultra-fast, zero-npm-dependency platform using Node.js built-in core modules, native SQLite, and responsive vanilla JavaScript. Features a live document-style invoice recalculator, custom vector PDF engine, recurring billing automations, and direct PayFast ITN webhook verification.",
    keyFeatures: [
      "Document-Style Live Invoice Editor with Tax, Discounts & Due-Date Presets",
      "Client Public Payment Portal (/invoice/<token>) with PayFast (Card / Instant EFT)",
      "Built-in Vector PDF Generator with Custom Branding & Multi-Page Pagination",
      "Recurring Invoices & Automated Retainer Billing Schedules (Weekly, Monthly, Yearly)",
      "Payment Verification & ITN Webhook Engine with Idempotency Protection",
      "Delivery & Activity Tracking (Not Sent, Sent, Failed, First/Last Viewed)",
      "Customer Directory with Inline Quick-Creation inside Invoice Editor",
      "Business Branding with Logo Upload Preview & 3 Styles",
    ],
    technologies: [
      "Node.js (Built-in Core)",
      "Vanilla JavaScript (SPA)",
      "HTML5 & CSS3",
      "SQLite (node:sqlite)",
      "PayFast API & ITN",
      "Zero-Dependency Architecture",
      "Vector PDF Engine",
    ],
    liveUrl: "https://quiktab.onrender.com/",
    githubUrl: "https://github.com/SirTebz/OmniTech",
    featured: true,
    year: "2025",
    client: "QuikTab / SaaS Platform",
    projectType: "Production Application",
    results: [
      { metric: "100%", label: "Zero-dependency lightweight architecture" },
      { metric: "< 200ms", label: "Invoice render and PDF generation latency" },
      { metric: "Instant", label: "PayFast payment reconciliation via ITN" },
    ],
  },

  // 9. OmniTech Platform (Web Development)
  {
    id: "omnitech-platform",
    slug: "omnitech-platform",
    title: "OmniTech Technology Platform",
    category: "Web Development",
    categoryBadge: "Web Architecture",
    shortDescription:
      "Professional personal technology services portal and interactive project showcase engineered with Next.js 15 and Tailwind CSS.",
    description:
      "The official OmniTech website and interactive demonstration platform. Engineered with modern Next.js App Router, strict TypeScript, responsive layouts, accessible UI design, dynamic sitemaps, structured schema markup, and five fully interactive client-side project demonstrations.",
    problem:
      "Traditional technical portfolios are either purely static resumes or focus exclusively on web design, failing to demonstrate hands-on capabilities across IT support, application troubleshooting, and business intelligence.",
    solution:
      "Architected a comprehensive multi-discipline technology showcase integrating live interactive applications directly into the website without requiring visitor account creation.",
    keyFeatures: [
      "Multi-Discipline Showcase: Software, IT Support, App Support, Data Analytics",
      "Five Integrated Client-Side Demonstrations with Zero Login Friction",
      "Strict TypeScript Architecture & WCAG 2.2 AA Accessibility Compliance",
      "Structured SEO Metadata, Dynamic XML Sitemap & Robots Integration",
      "Integrated Contact Routing with Honeypot Anti-Spam Security",
      "Light / Dark Theme Adaptability with Instant Persistence",
    ],
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zod",
      "Lucide React",
    ],
    liveUrl: "https://omni-tech-three.vercel.app/",
    githubUrl: "https://github.com/SirTebz/OmniTech",
    featured: true,
    year: "2026",
    client: "OmniTech",
    projectType: "Production Application",
    results: [
      { metric: "100%", label: "Responsive mobile-to-desktop score" },
      { metric: "5 Demos", label: "Interactive zero-login live applications" },
      { metric: "Sub-Second", label: "Page transition & load speeds" },
    ],
  },
];
