# OmniTech — Production Web Development Agency

> **THINK IT. BUILD IT.**  
> Turning ideas into digital solutions.

OmniTech is a modern, high-performance web development and custom software engineering studio website built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui principles.

---

## ⚡ Tech Stack

- **Framework**: Next.js 15+ (App Router, Server Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Monochrome Design System)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form + Zod
- **Theme**: `next-themes` (Light & Dark mode persistence)
- **Deployment**: Optimized for Vercel Edge / Node runtime

---

## 🚀 Key Features

1. **Monochrome Aesthetic**: Black, white, and subtle gray visual identity inspired by modern tech studios.
2. **Interactive Hero Visual**: Abstract IDE composition with animated line elements and live metric cards.
3. **Comprehensive Case Studies**: Dedicated dynamic project showcase (`/work/[slug]`) with metrics, challenge/solution breakdowns, and tech specifications.
4. **Services & Capabilities**: Detailed breakdown of Websites, Web Applications, Custom Software, Maintenance, UI/UX, and Consulting.
5. **Interactive 5-Step Process**: Discover → Design → Build → Test → Launch & Improve.
6. **Provider-Agnostic Contact Form**: Validated with Zod, protected with honeypot spam traps, and equipped with graceful local fallback logging or Resend integration.
7. **Accessibility & SEO**: Semantic HTML5 markup, WCAG 2.2 AA contrast compliance, OpenGraph metadata, JSON-LD ready, sitemap, and robots.txt.
8. **Dark / Light Mode**: Smooth theme toggling without flicker.

---

## 🛠️ Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/omnitech-digital/omnitech-web.git
cd omnitech-web
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description | Default / Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical website domain | `https://omnitech.dev` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Display contact email | `hello@omnitech.dev` |
| `NEXT_PUBLIC_CONTACT_PHONE` | Display phone number | `+27 (0) 10 500 8492` |
| `RESEND_API_KEY` | *(Optional)* Resend API Key for sending emails | `re_...` |
| `CONTACT_RECEIVER_EMAIL` | Destination mailbox for inquiries | `hello@omnitech.dev` |

> **Note**: If `RESEND_API_KEY` is not provided, the contact API will process inquiries gracefully in development mode and log them to the console without throwing errors.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```text
src/
├── app/
│   ├── api/contact/route.ts   # Server-side contact validation & email handler
│   ├── about/page.tsx         # Philosophy, commitments, and team approach
│   ├── contact/page.tsx       # Contact form & direct studio details
│   ├── services/page.tsx      # Comprehensive capability breakdown
│   ├── work/
│   │   ├── page.tsx           # Case study catalog
│   │   └── [slug]/page.tsx    # Dynamic detailed project view
│   ├── globals.css            # Tailwind theme tokens & utilities
│   ├── layout.tsx             # Root layout with ThemeProvider, Nav, Footer
│   ├── not-found.tsx          # Minimalist 404 handler
│   ├── page.tsx               # Homepage
│   ├── robots.ts              # Search engine robots configuration
│   └── sitemap.ts             # Dynamic XML sitemap
├── components/
│   ├── forms/                 # React Hook Form + Zod form components
│   ├── layout/                # Navbar, Footer, MobileMenu
│   ├── sections/              # Hero, TrustStrip, Services, Process, Work, Tech, CTA
│   ├── ui/                    # Button, Container, Reveal, ThemeToggle, SectionHeading
│   └── theme-provider.tsx     # Next-themes client provider
├── data/                      # Centralized data files (Content decoupled from UI)
│   ├── navigation.ts
│   ├── process.ts
│   ├── projects.ts
│   ├── services.ts
│   ├── site.ts
│   └── technologies.ts
└── lib/
    ├── utils.ts               # Tailwind class merging utility
    └── validations/           # Zod schema definitions
```

---

## 🧪 Testing & Verification

- **Linting**: `npm run lint`
- **TypeScript Checking**: `npx tsc --noEmit`
- **Production Build**: `npm run build`

---

## 📄 License

Proprietary © OmniTech Digital Solutions. All rights reserved.
