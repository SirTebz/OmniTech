export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  badge: string;
  problemsAddressed: string[];
  features: string[];
  deliverables: string[];
  technologies: string[];
  lifecycle?: string[];
  exampleProjects?: { title: string; slug: string; description: string }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "software-development",
    slug: "software-development",
    title: "Software & Application Development",
    category: "Engineering",
    badge: "Full-Stack & Backend",
    shortDescription:
      "Custom web applications, business software, internal management tools, and database-driven digital solutions.",
    fullDescription:
      "We build resilient, scalable software systems tailored to solve concrete operational challenges. From modern web applications with rich interactive experiences to mission-critical backend APIs, relational database architectures, and secure role-based portals, every line of code is structured for maintainability, speed, and real-world utility.",
    iconName: "Code2",
    problemsAddressed: [
      "Rigid off-the-shelf software that doesn't fit existing operational workflows",
      "Spreadsheet-based operations causing data corruption, sync conflicts, and human error",
      "Manual data entry bottlenecks between disparate business tools and spreadsheets",
      "Sluggish legacy systems that fail to scale or support mobile and distributed teams",
    ],
    features: [
      "Full-stack Web Applications & Single-Page Interfaces",
      "Relational Database Design, Normalisation & Optimisation",
      "RESTful API Development & Third-Party Integrations",
      "Role-Based Access Control (RBAC) & Secure Authentication",
      "Automated Business Workflows & Background Processing",
      "Clean Architecture with Scalable Component Hierarchies",
    ],
    deliverables: [
      "Custom Web Applications & Portals",
      "Internal Business Management Systems",
      "CRUD Engines & Resource Management Tools",
      "API Integrations & Secure Backend Services",
      "Production-Ready Minimum Viable Products (MVPs)",
    ],
    technologies: [
      "C#",
      "ASP.NET Core",
      ".NET",
      "TypeScript",
      "Next.js",
      "React",
      "SQL Server",
      "Entity Framework Core",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    lifecycle: [
      "Requirements Discovery & Scope Definition",
      "Architecture Planning & Data Modeling",
      "UI/UX Ergonomics & Wireframing",
      "Iterative Development & Unit Testing",
      "Integration & End-to-End Validation",
      "Deployment, Documentation & Ongoing Support",
    ],
    exampleProjects: [
      {
        title: "AeroReserve Aviation Platform",
        slug: "airline-reservation-system",
        description: "Full-stack flight discovery, seat allocation, and real-time booking engine.",
      },
      {
        title: "QuikTab Invoicing Platform",
        slug: "quiktab-invoicing-platform",
        description: "Zero-dependency invoicing application with vector PDF generation and PayFast checkout.",
      },
      {
        title: "NexusHub Community Engine",
        slug: "community-dashboard",
        description: "Multi-tenant collaboration workspace with role-gated forums and audit logs.",
      },
    ],
  },
  {
    id: "it-support",
    slug: "it-support",
    title: "IT Support & Helpdesk",
    category: "Infrastructure & Support",
    badge: "Hardware, OS & Network",
    shortDescription:
      "Practical troubleshooting, desktop & hardware support, Microsoft 365, network diagnostics, and rapid ticket resolution.",
    fullDescription:
      "Reliable technology support is essential for uninterrupted business operations. We provide structured IT helpdesk and technical troubleshooting for operating systems, hardware peripherals, network connectivity, user provisioning, and cloud workplace tools. Every incident is methodically logged, categorised, diagnosed, and resolved with clear documentation.",
    iconName: "Headphones",
    problemsAddressed: [
      "Persistent desktop performance freezes, boot crashes, and blue screen errors",
      "Unreliable Wi-Fi, DNS lookup failures, DHCP IP conflicts, and printer drops",
      "Microsoft 365 synchronisation issues, Outlook mail freezes, and OneDrive failures",
      "Lack of structured ticket logging, causing unresolved issues to slip through cracks",
    ],
    features: [
      "Windows Operating System Diagnostics & Performance Tuning",
      "Desktop, Laptop & Peripheral Hardware Troubleshooting",
      "Network Connectivity Diagnostics (TCP/IP, DNS, DHCP, LAN switches)",
      "Microsoft 365 Administration, Exchange Online & Outlook Support",
      "User Account Provisioning & Password Security Best Practices",
      "Systematic Helpdesk Ticket Logging, SLA Tracking & Resolution Notes",
    ],
    deliverables: [
      "Structured Ticket Management & SLA Tracking",
      "Hardware Diagnostics & Remediation Plans",
      "Local Network Troubleshooting & Topology Documentation",
      "Microsoft 365 & Email Client Setup & Recovery",
      "Clear End-User IT Documentation & Step-by-Step Guides",
    ],
    technologies: [
      "Windows 10/11",
      "Microsoft 365 / Office",
      "Active Directory Concepts",
      "TCP/IP & LAN Troubleshooting",
      "DNS / DHCP Diagnostics",
      "Printer & Peripheral Drivers",
      "Remote Desktop Protocols",
      "Service Desk Ticketing",
    ],
    lifecycle: [
      "Issue Ingestion & Structured Ticket Logging",
      "Triage, Categorisation & SLA Priority Assignment",
      "Technical Investigation & Root Symptom Isolation",
      "Targeted Remediation & User Verification",
      "Ticket Closure with Comprehensive Knowledge-Base Notes",
    ],
    exampleProjects: [
      {
        title: "OmniDesk — IT Service Desk Demo",
        slug: "it-service-desk",
        description: "Interactive IT helpdesk system featuring ticket lifecycle, SLA timers, and technician triage.",
      },
      {
        title: "ITOps Insights — IT Service Performance Dashboard",
        slug: "itops-insights",
        description: "Operational reporting dashboard tracking resolution velocity, SLA compliance, and backlog trends.",
      },
    ],
  },
  {
    id: "application-support",
    slug: "application-support",
    title: "Application Support & Systems Support",
    category: "Systems & Operations",
    badge: "L1/L2 Incident Management",
    shortDescription:
      "Incident management, application error investigation, SQL troubleshooting, root-cause analysis, and system monitoring.",
    fullDescription:
      "Bridging the critical gap between software development and everyday business operations, our application support capability focuses on keeping production systems healthy, available, and error-free. We investigate software errors, inspect SQL transaction logs, analyse API failure spikes, diagnose permissions anomalies, and implement lasting fixes rather than temporary workarounds.",
    iconName: "Activity",
    problemsAddressed: [
      "Intermittent application errors and silent background job failures affecting business hours",
      "Data anomalies and corrupt records requiring SQL query investigation and data reconciliation",
      "API timeouts, third-party webhook dropouts, and slow database queries during peak traffic",
      "Difficulty reproducing bug reports between end users and engineering teams",
    ],
    features: [
      "L1 & L2 Incident Triage, Investigation & Escalation Management",
      "Root-Cause Analysis (RCA) with Documented Preventative Measures",
      "SQL Data Query Profiling, Corrupt Record Investigation & Patching",
      "Application Log Inspection & HTTP 4xx/5xx Error Spike Diagnostics",
      "User Access, Roles, Permissions & Tenant Configuration Management",
      "Simulated System Health Monitoring, Error Rate & Uptime Tracking",
    ],
    deliverables: [
      "Incident Post-Mortem & Root Cause Analysis Reports",
      "SQL Data Correction Scripts & Validation Queries",
      "System Health & Uptime Monitoring Dashboards",
      "Defect Reproductions & Regression Test Scenarios",
      "Standard Operating Procedures (SOPs) & Runbooks",
    ],
    technologies: [
      "SQL Query Profiling",
      "Application Log Analysis",
      "Incident Management",
      "REST API Debugging",
      "Postman / HTTP Tooling",
      "Browser DevTools",
      "System Health Telemetry",
      "Regression Testing",
    ],
    lifecycle: [
      "Anomaly Detection or User Incident Escalation",
      "Log Triage, Error Code Isolation & Environment Health Check",
      "SQL & Data Integrity Investigation",
      "Patch Application, Workaround or Bug Escalation",
      "Post-Incident Root Cause Documentation & Monitoring Alert Tuning",
    ],
    exampleProjects: [
      {
        title: "AppWatch — Application Support & Incident Management Demo",
        slug: "appwatch",
        description: "Simulated application observability dashboard with live incident workflows and diagnostic logs.",
      },
    ],
  },
  {
    id: "data-analytics",
    slug: "data-analytics",
    title: "Data Analytics & Business Intelligence",
    category: "Analytics & Insights",
    badge: "KPIs, SQL & Reporting",
    shortDescription:
      "Transforming raw operational data into actionable insights with interactive BI dashboards, SQL analysis, and KPI tracking.",
    fullDescription:
      "Modern businesses generate vast amounts of operational data, yet decisions are frequently made on guesswork. We clean, model, and transform raw transaction records into crystal-clear executive dashboards, trend analyses, and automated reporting systems that empower stakeholders to monitor performance, identify bottlenecks, and make data-driven decisions.",
    iconName: "BarChart3",
    problemsAddressed: [
      "Data trapped in disconnected spreadsheets, preventing unified business visibility",
      "Hours wasted manually compiling weekly or monthly status and sales reports",
      "Lack of clear visibility into customer lifetime value, margins, and churn rates",
      "Unmonitored service desk operations leading to unnoticed SLA breaches and customer dissatisfaction",
    ],
    features: [
      "Automated Data Cleaning, Normalisation & ETL Transformation",
      "SQL Database Aggregations, Window Functions & Analytical Views",
      "Interactive Multi-Metric Business Intelligence Dashboards",
      "Dynamic Filtering by Date Ranges, Regions, Categories & Products",
      "Executive KPI Cards, Sales Forecasting & Trend Indicators",
      "One-Click Filtered CSV / Excel Dataset Exports",
    ],
    deliverables: [
      "Interactive Web-Based Business Intelligence Dashboards",
      "SQL Data Extraction Queries & Summary Views",
      "Automated Weekly/Monthly KPI Reporting Sheets",
      "Operational Performance & Service Desk Metrics Models",
      "Personal & Small Business Financial Analytics Portals",
    ],
    technologies: [
      "SQL (PostgreSQL, SQL Server)",
      "Microsoft Excel (Advanced Modeling)",
      "Power BI Concepts",
      "Interactive Charting (SVG, Canvas, Recharts)",
      "Data Cleaning & Transformation",
      "Statistical Summaries & KPIs",
    ],
    lifecycle: [
      "Source Data Identification & Data Integrity Assessment",
      "Data Cleaning, Missing Value Remediation & Structuring",
      "KPI & Metrics Definition Aligned to Business Objectives",
      "Dashboard Layout Design & Interactive Chart Construction",
      "Automated Export Verification & Stakeholder Training",
    ],
    exampleProjects: [
      {
        title: "InsightHub — Business Intelligence Demo",
        slug: "insighthub",
        description: "Executive sales and revenue intelligence dashboard with dynamic filters and CSV export.",
      },
      {
        title: "ITOps Insights — IT Service Performance Dashboard",
        slug: "itops-insights",
        description: "Service desk operational analytics tracking resolution times, SLA compliance, and technician workload.",
      },
      {
        title: "FinTrack — Personal Finance Analytics Demo",
        slug: "fintrack",
        description: "ZAR-based personal cash flow intelligence, dynamic budget tracking, and savings analytics.",
      },
    ],
  },
  {
    id: "website-development",
    slug: "website-development",
    title: "Website Development & Management",
    category: "Web Engineering",
    badge: "High Performance & SEO",
    shortDescription:
      "Modern, ultra-fast responsive websites engineered for pristine brand presentation, search visibility, and conversion.",
    fullDescription:
      "A high-performing website is the central hub of your digital identity. We build ultra-responsive websites with pristine semantic HTML, instantaneous page loads, fluid mobile layouts, and comprehensive search engine optimisation (SEO). Beyond initial launch, we provide ongoing maintenance, security patching, and technical improvements.",
    iconName: "Globe",
    problemsAddressed: [
      "Outdated, sluggish websites that load slowly on mobile networks and deter clients",
      "Poor search engine rankings due to lack of technical SEO and semantic markup",
      "Broken layouts across modern smartphones, tablets, and high-resolution monitors",
      "Abandoned websites suffering from security vulnerabilities and outdated frameworks",
    ],
    features: [
      "Next.js App Router Architecture with Blazing Fast Server Rendering",
      "Core Web Vitals & Performance Optimisation (Sub-second page loads)",
      "Technical SEO, Metadata, Dynamic Sitemaps & OpenGraph Social Cards",
      "WCAG 2.2 AA Accessibility Compliance & Keyboard Navigation",
      "Proactive Framework Updates, Vulnerability Patching & Uptime Checks",
      "Integrated Contact Forms with Honeypot Anti-Spam Protection",
    ],
    deliverables: [
      "Professional Technology & Corporate Portfolios",
      "High-Converting Service & Landing Pages",
      "Technical Documentation & Marketing Portals",
      "Structured Monthly Maintenance & Optimization Plans",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Zod",
    ],
    lifecycle: [
      "Information Architecture & Strategic Goal Definition",
      "Responsive Wireframing & Modern UI Styling",
      "Component Development & Semantic Implementation",
      "SEO, Accessibility & Performance Benchmarking",
      "Production Deployment & Post-Launch Health Monitoring",
    ],
    exampleProjects: [
      {
        title: "OmniTech Technology Platform",
        slug: "omnitech-platform",
        description: "This comprehensive technology services portfolio and interactive demonstration platform.",
      },
    ],
  },
  {
    id: "ui-ux-consulting",
    slug: "ui-ux-consulting",
    title: "UI/UX Design & Technical Consulting",
    category: "Design & Strategy",
    badge: "Design Systems & Architecture",
    shortDescription:
      "Clean, functional interface design, design token architectures, usability reviews, and pragmatic technical advice.",
    fullDescription:
      "Great software pairs robust engineering with thoughtful human ergonomics. We design clean, distraction-free interfaces that minimize cognitive load, respect accessibility guidelines, and feel natural to navigate. Additionally, we provide objective technical consulting to help businesses evaluate technology stacks, plan software roadmaps, and avoid expensive architectural mistakes.",
    iconName: "Layout",
    problemsAddressed: [
      "Cluttered, confusing user interfaces that lead to user abandonment and support tickets",
      "Inconsistent UI elements, typography, and color schemes across different screens",
      "Accessibility shortcomings that exclude users relying on assistive technology",
      "Uncertainty when selecting software stacks, databases, or cloud hosting solutions",
    ],
    features: [
      "Ergonomic Information Architecture & Visual Hierarchy",
      "Reusable Component Design Systems & Consistent Token Variables",
      "Responsive Layouts Tested Across Mobile, Tablet & Desktop Viewports",
      "WCAG 2.2 AA Color Contrast & Keyboard Accessibility Reviews",
      "Pragmatic Software Architecture Audits & Tech Debt Identification",
      "Clear Technical Feasibility Roadmaps & Implementation Blueprints",
    ],
    deliverables: [
      "Design Systems & Token Specifications",
      "Interactive UI Prototypes & Wireframes",
      "Usability & Accessibility Audit Reports",
      "Technical Architecture Recommendations & Roadmaps",
    ],
    technologies: [
      "Figma",
      "Design Tokens",
      "Tailwind CSS",
      "Radix UI Principles",
      "WCAG 2.2 Standards",
      "System Architecture",
    ],
    lifecycle: [
      "User Journey Discovery & Pain Point Mapping",
      "Low-Fidelity Wireframes & Ergonomic Validation",
      "High-Fidelity Component System Implementation",
      "Accessibility & Usability Testing",
      "Engineering Handoff & Implementation Guidance",
    ],
    exampleProjects: [
      {
        title: "NexusHub Community Engine",
        slug: "community-dashboard",
        description: "Dark/light interface design system with distraction-free layout and accessibility compliance.",
      },
    ],
  },
];
