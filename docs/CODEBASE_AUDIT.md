# OmniTech Codebase & Live Website Audit (Milestone 0)

**Date**: November 2026  
**Repository**: `https://github.com/SirTebz/OmniTech`  
**Live Website**: `https://omni-tech-three.vercel.app/`  
**Auditor**: Senior Full-Stack Engineer & Next.js Architect

---

## 1. Executive Summary & Brand Positioning Shift

OmniTech previously launched as a modern web development & custom software agency. While its code quality, Next.js 15 App Router architecture, TypeScript hygiene, and UI foundations are strong, its identity and positioning were disproportionately narrow:
- **Previous focus**: Web design, web applications, and corporate site development.
- **Overhaul positioning**: OmniTech — *Think It. Build It. Support It. Understand It.* Comprehensive technology services and professional project portfolio covering:
  1. **Software & Application Development** (C#, .NET, TypeScript, Next.js, APIs, SQL Server).
  2. **IT Support & Helpdesk** (Windows, M365, Hardware/Software diagnostics, Networking, Troubleshooting).
  3. **Application Support & Systems Support** (L1/L2 incident management, root-cause analysis, SQL queries, system monitoring).
  4. **Data Analytics & Business Intelligence** (SQL, Excel, KPIs, BI dashboards, trend analysis, reporting).
  5. **Website Development & Management** (Modern websites, Core Web Vitals, CMS, maintenance).
  6. **UI/UX Design & Technical Consulting** (Ergonomics, accessible design systems, architectural reviews).

---

## 2. Technical Stack Audit

| Dimension | Specification in Repo | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js 15.2.1 (running 15.5.27 build engine) | Healthy | App Router, Server Components + selective Client Components |
| **Runtime / Library** | React 19.0.0, React DOM 19.0.0 | Healthy | Modern Concurrent React |
| **Language** | TypeScript 5.8.2 | Strict Mode Passing | Zero type errors (`npx tsc --noEmit` passes clean) |
| **Styling** | Tailwind CSS 3.4.17 + PostCSS | Configured | Uses custom color system, Radix UI colors, font variables |
| **Animations** | Framer Motion 12.4.7 | Healthy | Motion wrappers and scroll reveals |
| **Form Handling & Validation** | React Hook Form 7.54.2 + Zod 3.24.2 | Configured | Contact form schema present in `src/lib/validations/contact.ts` |
| **Theme System** | next-themes 0.4.4 | Operational | Supports system/dark/light themes |
| **Icons** | Lucide React 1.16.0 | Operational | Crisp SVG iconography |

---

## 3. Baseline Quality & Verification Results

### A. TypeScript Type Check (`npx tsc --noEmit`)
- **Status**: **PASS (0 errors)**. Strict mode is fully honored across all existing components and demo pages.

### B. Linting (`npm run lint`)
- **Finding**: Next.js 15 flagged `next lint` deprecation warning prompting ESLint configuration file migration. An updated `.eslintrc.json` / eslint setup is recommended to standardize automated testing.

### C. Next.js Production Build (`npm run build`)
- **Finding on Local Windows Path**: When executed in a directory containing an apostrophe (`26'`), Next.js metadata loader (`robots.ts` / `sitemap.ts`) throws a webpack parser error due to unescaped single quote handling in the webpack string:
  `throw new Error('Default export is missing in "D:\\Dev_Show\\Web App\\26'\\OmniTech\\src\\app\\robots.ts"')`
- **Verification via Virtual Drive (`subst`)**: When mapped without the apostrophe in path, Next.js compiled all 30 pages and route handlers successfully in 54s.
- **Production / Vercel Impact**: On Vercel, the build runs in standard Linux container paths (`/vercel/path0`), so this local Windows path anomaly does not affect Vercel deployments.

---

## 4. Contact Information Audit

### Outdated / Placeholder Details Identified:
- **Phone**: `+27 (0) 10 500 8492` (placeholder in `src/data/site.ts`)
- **Email**: `hello@omnitech.dev` (placeholder in `src/data/site.ts` & `src/app/api/contact/route.ts`)
- **Socials**: Generic `omnitech-digital` URLs.

### Non-Negotiable Official Details to Apply:
- **Official Phone Number**: `+27722389325` (`tel:+27722389325`)
- **Official Email Address**: `sirtebz.z@gmail.com` (`mailto:sirtebz.z@gmail.com`)
- **GitHub**: `https://github.com/SirTebz/OmniTech`
- **Live Vercel URL**: `https://omni-tech-three.vercel.app/`

---

## 5. Existing Catalog vs Overhaul Requirements

### Existing Projects:
1. `airline-reservation-system` (AeroReserve Aviation Platform) — Web Application Demo.
2. `personal-finance-tracker` (ApexWealth Financial Intelligence) — FinTech Platform Demo.
3. `community-dashboard` (NexusHub Community Engine) — SaaS System Demo.
4. `quiktab-invoicing-platform` (QuikTab Invoicing Platform) — Production SaaS Project.

### Required Demonstration & Portfolio Additions:
1. **OmniDesk — IT Service Desk Demo** (`/demos/it-service-desk` or `/demo/it-service-desk`):
   - Category: IT Support & Helpdesk.
   - Interactive ticketing, SLA timers, technician assignment, priority triage, search/filter, and full browser persistence/reset.
2. **AppWatch — Application Support & Incident Management Demo** (`/demo/appwatch`):
   - Category: Application Support & Systems Support.
   - Application health monitoring, L1/L2 incident lifecycle, error rate/latency simulations, RCA investigation logs.
3. **InsightHub — Business Intelligence Analytics Demo** (`/demo/insighthub`):
   - Category: Data Analytics & Business Intelligence.
   - Dynamic sales/revenue KPIs, region/category/date filtering, chart recalculation, CSV dataset export.
4. **ITOps Insights — IT Service Performance Dashboard** (`/demo/itops-insights`):
   - Category: IT Support Analytics / Operational Reporting.
   - Resolution performance, SLA compliance metrics, technician workload distribution, ticket backlog analytics.
5. **FinTrack — Personal Finance Analytics Demo** (`/demo/fintrack` or expanding ApexWealth with ZAR):
   - Category: Data Analytics / Personal Finance.
   - South African Rand (ZAR) currency formatting, interactive budgets, cash flow trends, transaction creation/categorization.

---

## 6. Architecture & UI/UX Action Plan

1. **Centralize Site & Contact Data**: Update `src/data/site.ts` with official phone, email, and brand tagline: *"Think It. Build It. Support It. Understand It."*
2. **Restructure Information Architecture**:
   - Navigation: Home, About, Services (with deep dives), Work (with categories: Software Dev, Data Analytics, App Support, IT Support, Web Dev), Process, Contact.
   - Dedicated service details for all 6 disciplines.
3. **Homepage Transformation**:
   - Multi-discipline hero with visual previews (code, analytics chart, IT ticket, app health indicator).
   - Equal visual weight for Software Development, IT Support, Application Support, Data Analytics, Web Development, and UI/UX Consulting.
   - Cross-discipline project spotlights.
4. **Interactive Demos Platform**:
   - Standalone interactive demos requiring no login or paid API keys.
   - LocalStorage persistence with guaranteed deterministic reset button.
   - Responsive, dark/light mode compatible data visualisations and tables.
