import { LucideIcon } from "lucide-react";

export interface SkillCategory {
  title: string;
  discipline: "Software Development" | "IT Support" | "Application Support" | "Data Analytics" | "UI/UX & Web";
  description: string;
  items: {
    name: string;
    level: "Core" | "Proficient" | "Working Knowledge";
    description: string;
  }[];
}

export const technicalCapabilities: SkillCategory[] = [
  {
    title: "Software & Application Engineering",
    discipline: "Software Development",
    description: "Building resilient web applications, business platforms, APIs, and database-driven digital solutions.",
    items: [
      { name: "C# & .NET", level: "Core", description: "Backend development, typed OOP, and enterprise business services" },
      { name: "ASP.NET Core / MVC", level: "Core", description: "RESTful web APIs, controllers, dependency injection, and middleware" },
      { name: "TypeScript & JavaScript", level: "Core", description: "Type-safe full-stack application development and async patterns" },
      { name: "Next.js & React", level: "Core", description: "App Router, Server Components, client state, and responsive UIs" },
      { name: "SQL Server & T-SQL", level: "Core", description: "Relational database design, normalisation, queries, and indexing" },
      { name: "Entity Framework Core", level: "Core", description: "Code-first migrations, LINQ queries, and relational data access" },
      { name: "PostgreSQL & SQLite", level: "Proficient", description: "Lightweight and robust relational data storage" },
      { name: "REST APIs & Integration", level: "Core", description: "Secure JSON endpoints, HTTP clients, and third-party webhook handling" },
    ],
  },
  {
    title: "IT Support & Technical Helpdesk",
    discipline: "IT Support",
    description: "Methodical technical troubleshooting, hardware/software diagnostics, networking, and service desk operations.",
    items: [
      { name: "Windows 10 / 11 Diagnostics", level: "Core", description: "OS troubleshooting, boot issues, registry basics, performance tuning" },
      { name: "Hardware & Peripheral Support", level: "Core", description: "Desktop/laptop diagnostics, RAM/SSD upgrades, printers, docking stations" },
      { name: "Microsoft 365 Administration", level: "Proficient", description: "Outlook setup, OneDrive sync, user account provisioning, Exchange triage" },
      { name: "Networking Fundamentals", level: "Core", description: "TCP/IP, subnetting, DNS resolution, DHCP assignment, and LAN troubleshooting" },
      { name: "Active Directory Concepts", level: "Working Knowledge", description: "User accounts, group policies, domain join, and permission structures" },
      { name: "IT Service Desk & Ticketing", level: "Core", description: "Incident logging, severity triage, SLA tracking, and resolution documentation" },
      { name: "Remote Troubleshooting", level: "Core", description: "Secure remote desktop assistance, diagnostic command lines (ipconfig, ping, tracert)" },
    ],
  },
  {
    title: "Application Support & Systems Support",
    discipline: "Application Support",
    description: "Investigating software errors, database records, API dropouts, and maintaining system availability.",
    items: [
      { name: "L1 / L2 Incident Management", level: "Core", description: "Structured incident investigation, issue reproduction, and escalation" },
      { name: "Root-Cause Analysis (RCA)", level: "Core", description: "Isolating underlying failure triggers and documenting permanent remedies" },
      { name: "SQL Troubleshooting & Fixes", level: "Core", description: "Querying production-like databases to find corrupt or missing transaction data" },
      { name: "Application Log Analysis", level: "Core", description: "Reading web server, API, and console logs to track stack traces and HTTP 5xx spikes" },
      { name: "User Permissions & Roles", level: "Core", description: "Managing tenant access controls, role gates, and authentication troubleshooting" },
      { name: "Simulated System Monitoring", level: "Proficient", description: "Tracking latency percentiles, error rates, uptime percentages, and status checks" },
    ],
  },
  {
    title: "Data Analytics & Business Intelligence",
    discipline: "Data Analytics",
    description: "Cleaning, aggregating, and transforming raw transactional data into intuitive executive dashboards.",
    items: [
      { name: "SQL Data Modeling & Views", level: "Core", description: "Complex joins, aggregations, window functions, and analytics query design" },
      { name: "Microsoft Excel (Advanced)", level: "Core", description: "Pivot tables, VLOOKUP/XLOOKUP, formulas, data cleaning, and reporting" },
      { name: "Power BI Concepts", level: "Proficient", description: "Dashboard design, relationships, KPI visualizations, and measures" },
      { name: "Data Cleaning & Preparation", level: "Core", description: "Deduplication, formatting validation, missing data imputation, and outlier detection" },
      { name: "KPI Tracking & Metric Design", level: "Core", description: "Defining actionable business, sales, and service desk performance indicators" },
      { name: "Interactive Web Visualisation", level: "Core", description: "Dynamic charts, multi-dimension filtering, time-series, and CSV data export" },
    ],
  },
  {
    title: "UI/UX Design & Web Engineering",
    discipline: "UI/UX & Web",
    description: "Creating ergonomic, accessible, and fast web experiences that elevate credibility and user satisfaction.",
    items: [
      { name: "Responsive Layout Architecture", level: "Core", description: "Fluid grid systems tested across mobile, tablet, and wide desktop viewports" },
      { name: "Tailwind CSS & Design Tokens", level: "Core", description: "Design systems, consistent spacing, and dark/light color palettes" },
      { name: "Accessibility (WCAG 2.2 AA)", level: "Core", description: "Semantic markup, keyboard navigation, contrast ratios, and ARIA labels" },
      { name: "Core Web Vitals & Technical SEO", level: "Core", description: "Optimising LCP, CLS, FID, structured JSON-LD data, and metadata" },
      { name: "Wireframing & UI Prototyping", level: "Proficient", description: "Translating ambiguous requirements into intuitive screen layouts" },
    ],
  },
];
