# Retrofit Creations — Project Instructions

> Custom fabrication, 3D printing, laser engraving, CNC — San Diego, CA
> Repo: https://github.com/vrostbyte/retrofit-creations

## IMPORTANT: Read Before Every Task

**YOU MUST read `RETROFIT_CREATIONS_PRD.md` at the project root before starting any task.** This is the single source of truth for all business context, brand rules, page specs, data models, and integration details. Do not guess — consult the PRD.

**YOU MUST also read any relevant `.md` guidance files** (README.md, docs/*.md, SQUARE_SETUP_GUIDE.md) before making decisions. If a guidance doc exists for the topic, read it first.

**Use Context7 for documentation lookups.** When implementing Next.js patterns, Tailwind config, React hooks, Supabase client usage, or any library API, use Context7 to fetch current documentation BEFORE writing code. This prevents stale/deprecated API usage.

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS (dark theme)
- **DB/Auth/Storage:** Supabase
- **Payments:** Square Web Payments SDK + Square Node.js SDK
- **Email:** Resend
- **Deploy:** Vercel (from GitHub)

## Brand Rules (Non-Negotiable)

- **Theme: Light Body, Dark Nav** — content areas are white/light, ONLY the header and footer use black backgrounds
- Page background: White `#FFFFFF`, card surfaces: `#F8F8F8`, borders: `#E8E8E8`
- Header/Footer: Black `#000000` background with white text
- Primary text: Black `#000000` on light backgrounds, White `#FFFFFF` on header/footer
- Accent: Blue `#0062FF` for buttons, links, active states, hover effects
- When lighter/darker blue is needed, adjust ONLY the alpha of `#0062FF` — never change the hue
- Fonts: Oswald (headings), Inter (body) — both from Google Fonts
- Aesthetic: premium, rugged, readable — like a custom garage meets modern e-commerce
- Logo files: `public/images/RC-Engraving-Logo.png` and `RC-Engraving-Logo-transparent.png`
- **WHY light theme:** Target audience is older demographic browsing on phones at outdoor car shows. Readability > aesthetics.

## Code Standards

- TypeScript strict — no `any` types
- Use named exports
- Tailwind utility classes only — no custom CSS files
- Components go in `src/components/` organized by domain (ui/, layout/, products/, etc.)
- API routes in `src/app/api/`
- Supabase helpers in `src/lib/supabase/`
- Square helpers in `src/lib/square/`
- Resend helpers in `src/lib/resend/`
- All components must be responsive (mobile-first)
- Include ARIA labels and semantic HTML
- NEVER commit `.env` files — use `.env.example` as template

## Commands

- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npx supabase db push` — Push migrations to Supabase

## Architecture

```
src/
  app/           → Next.js App Router (pages, layouts, api routes)
  components/    → Reusable components by domain
    ui/          → Primitives: Button, Card, Input, Modal, Badge
    layout/      → Header, Footer, Nav, MobileMenu
    products/    → ProductCard, ProductGrid, CategoryFilter
    services/    → ServiceCard
    community/   → ProjectCard, SubmissionForm
    forms/       → QuoteForm, ContactForm, ReviewForm
    checkout/    → CartDrawer, SquarePayment
    account/     → ProfileCard, OrderHistory
  lib/           → Utilities and SDK wrappers
  hooks/         → Custom React hooks
  types/         → TypeScript type definitions
```

## Key Decisions

- Shopping cart state: React Context + localStorage (no Supabase cart table)
- Square integration: `react-square-web-payments-sdk` for frontend payment form, Square Node.js SDK for server-side processing via Next.js Server Actions
- Auth: Supabase Auth with email/password (Google OAuth later)
- Admin role: `profiles.role = 'admin'` column, checked in middleware
- Images: Supabase Storage with public URLs for products, authenticated for user uploads

## Git Workflow

- Commit with clear messages: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- Push to `main` — Vercel auto-deploys
- Never force push to main

## Context for AI

- The developer (Josh) is a coding beginner — write clear, instructional code with comments
- The site owner (Hailie) manages the site solo — admin UX must be simple and intuitive
- When in doubt about a business decision, check the PRD or ask
- Square is new to the team — add detailed comments explaining every Square integration step
