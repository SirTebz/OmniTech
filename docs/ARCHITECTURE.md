# OmniTech Architecture & Engineering Specification

## 1. System Positioning & Core Identity
OmniTech (*"Think It. Build It. Support It. Understand It."*) is structured to bridge the gap between software development, production systems support, IT helpdesk operations, and actionable business intelligence.

## 2. Directory Architecture
```
src/
├── app/
│   ├── about/                   # Professional background & technical competency matrix
│   ├── api/contact/route.ts     # Zod validated contact handler with honeypot & Resend support
│   ├── contact/                 # Direct inquiries & support communication
│   ├── demos/
│   │   ├── appwatch/            # Application Support & Observability demo
│   │   ├── fintrack/            # Personal Finance & ZAR Cash Flow Analytics demo
│   │   ├── insighthub/          # Executive Business Intelligence & Sales Analytics demo
│   │   ├── it-service-desk/     # IT Service Desk & Ticket Management demo
│   │   └── itops-insights/      # IT Support Operational Performance Analytics demo
│   ├── process/                 # 5-step delivery and support methodology
│   ├── services/
│   │   ├── [slug]/              # Deep dives for each of the 6 core services
│   │   └── page.tsx             # Overview of all 6 technology disciplines
│   ├── work/
│   │   ├── [slug]/              # Dynamic case studies and project details
│   │   ├── page.tsx             # Portfolio hub with category filters and search
│   │   └── projects-client.tsx  # Client-side filtering across disciplines
│   ├── globals.css              # Tailwind styling, Radix CSS variables, dark/light tokens
│   ├── layout.tsx               # Root layout, Navbar, Footer, ThemeProvider
│   ├── not-found.tsx            # Custom 404 handler
│   ├── page.tsx                 # Redesigned multi-discipline homepage
│   ├── robots.ts                # Dynamic robots.txt
│   └── sitemap.ts               # Dynamic XML sitemap
├── components/
│   ├── demos/DemoShell.tsx      # Reusable interactive demo container with persistent reset
│   ├── forms/contact-form.tsx   # React Hook Form + Zod enquiry system
│   ├── layout/                  # Navbar, Footer, ThemeToggle
│   ├── sections/                # Reusable modular sections
│   └── ui/                      # Reusable buttons, cards, containers, social icons
├── data/
│   ├── demo/                    # Deterministic sample datasets for all 5 demos
│   ├── navigation.ts            # Central navigation items
│   ├── process.ts               # 5-phase methodology
│   ├── projects.ts              # Portfolio database with demo & live links
│   ├── services.ts              # 6 primary services with full capabilities & deliverables
│   ├── site.ts                  # Centralized contact details (+27722389325, sirtebz.z@gmail.com)
│   └── technologies.ts          # Technical competencies grouped by discipline
├── lib/
│   ├── utils.ts                 # Class merger utility (clsx + tailwind-merge)
│   └── validations/contact.ts   # Zod schema for contact and support inquiries
└── __tests__/                   # Automated Vitest suites for data integrity & validation
```

## 3. Contact Details Configuration
All contact references resolve through `src/data/site.ts`:
- **Phone**: `+27722389325` (Display: `+27 72 238 9325`, Link: `tel:+27722389325`)
- **Email**: `sirtebz.z@gmail.com` (Link: `mailto:sirtebz.z@gmail.com`)
- **Live Vercel Production**: `https://omni-tech-three.vercel.app`
