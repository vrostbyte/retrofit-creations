# RETROFIT CREATIONS — Product Requirements Document (PRD)

> **Version:** 1.2.1
> **Last Updated:** 2026-05-16
> **Status:** ACTIVE — This is the single source of truth for the Retrofit Creations website project.
> **Authors:** Project Lead + Hailie (Business Owner)

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Business Context](#2-business-context)
3. [Brand Identity](#3-brand-identity)
4. [Technical Architecture](#4-technical-architecture)
5. [Site Map & Page Specifications](#5-site-map--page-specifications)
6. [Feature Requirements](#6-feature-requirements)
7. [Integration Specifications](#7-integration-specifications)
8. [User Roles & Flows](#8-user-roles--flows)
9. [Data Models](#9-data-models)
10. [Development Phases](#10-development-phases)
11. [Local Development Setup](#11-local-development-setup)
12. [CLI Prompt Strategy](#12-cli-prompt-strategy)
13. [Open Items & TBDs](#13-open-items--tbds)
14. [Changelog](#14-changelog)

---

## 1. PROJECT OVERVIEW

### 1.1 What We're Building

A full-featured e-commerce and custom fabrication website for **Retrofit Creations LLC** — a small custom fabrication brand specializing in 3D-printed automotive parts, laser engraving, CNC carving, and personalized products. The site must support both direct product sales (store) and custom quote requests, while building a customer community around car culture and custom fabrication.

### 1.2 Core Objectives

- **Sell products directly** — e-commerce store with categories, search, filtering, and checkout via Square
- **Accept custom work orders** — detailed quote request forms with image uploads and project descriptions
- **Build community** — showcase completed projects, customer builds, event appearances, and community submissions
- **Establish brand legitimacy** — premium, professional presentation that positions Retrofit Creations as a serious custom fabrication brand
- **Enable solo management** — Hailie must be able to manage products, orders, quotes, and content independently after launch

### 1.3 Success Criteria

- Site loads fast (< 3s on mobile, < 2s on desktop)
- Hailie can add/edit products and manage orders without developer help
- Customers can complete a purchase or submit a quote request in under 3 minutes
- Site is fully responsive across desktop, tablet, and mobile
- SEO-friendly for local and national search queries related to custom car parts, laser engraving, and 3D printing

---

## 2. BUSINESS CONTEXT

### 2.1 Business Identity

| Field | Value |
|-------|-------|
| **Legal Name** | Retrofit Creations LLC |
| **Brand Name** | Retrofit Creations |
| **Domains** | `retrofitcreations.com` (primary), `retrofitcreationsllc.com` (redirect to primary) |
| **Location** | San Diego, CA |
| **Social Media** | TBD — Accounts need to be created (Instagram, Facebook, TikTok recommended) |
| **Shipping** | Global — ships worldwide |
| **Site Manager** | Hailie (solo operator) |
| **GitHub Repo** | `https://github.com/vrostbyte/retrofit-creations` |
| **GitHub Noreply Email** | `189171963+vrostbyte@users.noreply.github.com` |

### 2.2 What the Business Does

**Primary Services:**

- **3D Printing / Fabrication** — Custom-designed and printed parts for classic and custom cars of all models and years. Includes brackets, trim pieces, knobs, emblems, clips, mounts, and fully bespoke components
- **Laser Engraving** — Custom engraving on virtually any material that fits under the machine. Personalization, branding, serial numbers, artwork, text
- **CNC Carving** — Precision carving for wood, plastics, soft metals, and composite materials
- **Product Prototyping** — Rapid prototyping services for inventors, hobbyists, and small businesses
- **Custom Automotive Trim/Accessories** — Replacement and custom trim, interior/exterior accessories for vehicles
- **Bulk/Custom Orders** — Volume production runs for events, businesses, and resellers
- **Design Consultation** — Working with customers to develop their ideas into manufacturable designs

**Product Categories (Store):**

- Custom Zyn tins
- Laser engraved keychains
- Custom automotive parts
- Event/vendor items
- Personalized gifts
- 3D printed parts

### 2.3 Target Audience

- Classic and custom car enthusiasts (all makes, all years)
- Car clubs and automotive communities
- People seeking unique personalized gifts
- Small businesses needing custom branded items
- Event vendors and craft market shoppers
- Hobbyists, makers, and DIY enthusiasts
- Anyone needing one-off or small-batch custom parts

---

## 3. BRAND IDENTITY

### 3.1 Brand Personality

**Premium. Rugged. Precise. Community-driven.**

The brand sits at the intersection of a custom garage, a CNC machine shop, and a modern e-commerce brand. It should feel like you're dealing with skilled craftspeople who also happen to run a polished, professional operation.

### 3.2 Color Palette

**Theme: Light Body, Dark Navigation** — Content areas are light/white for outdoor readability. Header and footer stay dark black to preserve brand identity.

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Page Background** | White | `#FFFFFF` | Main content backgrounds, product pages, forms |
| **Surface / Card Background** | Light Gray | `#F8F8F8` | Cards, product tiles, input backgrounds |
| **Nav & Footer Background** | Black | `#000000` | Sticky header, footer — brand identity anchors |
| **Primary Text** | Black | `#000000` | Body text, headings on light backgrounds |
| **Secondary Text** | Dark Gray | `#555555` | Descriptions, metadata, subtitles |
| **Nav/Footer Text** | White | `#FFFFFF` | Text on dark header/footer |
| **Accent / CTA** | Electric Blue | `#0062FF` | Buttons, links, highlights, active states |
| **Accent Light** | Blue (reduced alpha) | `#0062FF` at lower opacity | Hover states, card borders, secondary highlights |
| **Borders** | Light Gray | `#E8E8E8` | Card borders, dividers, input borders |

> **RULE:** When a lighter or darker blue is needed for accents, hover states, or subtle effects, always start from `#0062FF` and adjust ONLY the alpha/opacity channel. Never use a different blue hue.
>
> **THEME RULE:** The ONLY elements with black backgrounds are the sticky header and footer. All content sections, pages, cards, and forms use white or light gray backgrounds with dark text. This maximizes readability for the target audience (older demographic, outdoor/mobile use at car shows).

### 3.3 Typography

- **Headings:** **Oswald** (Bold/SemiBold) — Strong, condensed, industrial feel. Perfect for the rugged automotive aesthetic. Google Fonts: `Oswald:wght@400;500;600;700`
- **Body:** **Inter** (Regular/Medium) — Clean, highly readable, modern. Google Fonts: `Inter:wght@300;400;500;600;700`
- **Style:** All-caps for section headers and CTAs where appropriate. Clean spacing. No script/decorative fonts.
- **Fallback stacks:** Oswald → sans-serif; Inter → system-ui, sans-serif

> **NOTE:** Font choices are provisional. If Hailie wants to explore alternatives later, browse Google Fonts for free options. The fonts above are both free via Google Fonts.

### 3.4 Design Language

- **Light body, dark nav** — White/light content areas with black header and footer framing the page
- Clean card-based layouts on light gray (#F8F8F8) backgrounds with subtle borders (#E8E8E8)
- Blue accent for CTAs, links, active nav states, and hover effects
- Hover effects: subtle blue border glow on cards (blue at low opacity), smooth transitions
- High-contrast text: black on white for maximum outdoor/mobile readability
- Industrial/mechanical visual motifs where appropriate (textures, grid patterns as subtle accents — NOT dark backgrounds)
- High-quality product imagery on light neutral backgrounds
- Professional animations/transitions — smooth but fast, nothing slow or distracting
- Sticky navigation header (black background, white text, blue logo accent)
- Logo placement in header (left-aligned, on dark background where it pops)
- Footer (black background) with social links, policies, contact info, and quick navigation in white/gray text

### 3.5 Imagery Direction

**Logo Files (on disk) — USAGE RULES:**
- `public/images/RC-Engraving-Logo.png` — Logo with its own background. **USE ON DARK BACKGROUNDS** (header nav, footer, mobile menu). The logo artwork is dark, so it needs the built-in background to be visible against black.
- `public/images/RC-Engraving-Logo-transparent.png` — Transparent background, dark logo artwork. **USE ON LIGHT BACKGROUNDS** (hero section, about page, content areas). The dark logo shows clearly on white/light surfaces.

> **CRITICAL RULE:** NEVER use the transparent logo on a dark background — the dark logo artwork becomes invisible. NEVER use the non-transparent logo on a light background unless the built-in background complements the design.

> **NOTE:** Current logos reference "RC Engraving." If Hailie has or creates a broader "Retrofit Creations" logo in the future, add it to `public/images/` and update references. For now, use what we have.

**Photography direction:**
- Product photography: well-lit items on dark/neutral backgrounds
- Action shots: 3D printers running, laser engravers in action, CNC machines cutting
- Community: customer cars, builds, event booth photos
- Avoid: stock photos that look generic, overly corporate imagery, anything that doesn't feel authentic

### 3.6 Tagline

> **"Built Different. Made to Stand Out."**

---

## 4. TECHNICAL ARCHITECTURE

### 4.1 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React (Next.js) | SSR/SSG, routing, component architecture |
| **Styling** | Tailwind CSS | Utility-first CSS, responsive design, dark theme |
| **Hosting/Deploy** | Vercel | CI/CD from GitHub, edge network, serverless functions |
| **Source Control** | GitHub | Repository, version control, collaboration |
| **Database** | Supabase (PostgreSQL) | Products, orders, users, quotes, community posts |
| **Authentication** | Supabase Auth | User signup/login, session management, OAuth providers |
| **File Storage** | Supabase Storage | Product images, customer uploads, community photos |
| **Payments** | Square (Web Payments SDK) | Checkout, payment processing, order management |
| **Email** | Resend | Transactional emails, order confirmations, quote notifications |
| **Domain** | Vercel Domains | DNS management, SSL, domain routing |

### 4.2 Architecture Diagram (Conceptual)

```
┌─────────────────────────────────────────────────────┐
│                   CUSTOMER BROWSER                   │
│              (React / Next.js Frontend)              │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                  VERCEL (Hosting)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │  Static      │  │  API Routes  │  │  Serverless │  │
│  │  Pages (SSG) │  │  /api/*      │  │  Functions  │  │
│  └─────────────┘  └──────┬───────┘  └─────┬──────┘  │
└──────────────────────────┼────────────────┼─────────┘
                           │                │
              ┌────────────┼────────────────┼──────────┐
              │            │                │          │
              ▼            ▼                ▼          ▼
      ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐
      │ Supabase │  │  Square  │  │  Resend  │  │ GitHub │
      │ DB/Auth/ │  │ Payments │  │  Email   │  │  Repo  │
      │ Storage  │  │  API     │  │  API     │  │        │
      └──────────┘  └──────────┘  └──────────┘  └────────┘
```

### 4.3 Repository Structure (Target)

```
retrofit-creations/
├── public/                     # Static assets (logo, favicon, og-images)
│   ├── images/
│   │   ├── RC-Engraving-Logo.png
│   │   └── RC-Engraving-Logo-transparent.png
│   └── fonts/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (nav, footer, providers)
│   │   ├── page.tsx            # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx        # Product listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Product detail
│   │   ├── services/
│   │   │   └── page.tsx        # Services listing
│   │   ├── community/
│   │   │   └── page.tsx        # Community showcase
│   │   ├── about/
│   │   │   └── page.tsx        # About Us
│   │   ├── testimonials/
│   │   │   └── page.tsx        # Testimonials
│   │   ├── contact/
│   │   │   └── page.tsx        # Contact / Custom Quote
│   │   ├── account/
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── orders/
│   │   │   ├── quotes/
│   │   │   ├── wishlist/
│   │   │   └── profile/
│   │   ├── admin/              # Hailie's management panel
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── quotes/
│   │   │   └── content/
│   │   └── api/                # API routes
│   │       ├── checkout/
│   │       ├── quotes/
│   │       ├── email/
│   │       └── webhooks/
│   ├── components/
│   │   ├── ui/                 # Reusable primitives (Button, Card, Input, Modal)
│   │   ├── layout/             # Header, Footer, Navigation, MobileMenu
│   │   ├── products/           # ProductCard, ProductGrid, CategoryFilter
│   │   ├── services/           # ServiceCard, ServiceGrid
│   │   ├── community/          # ProjectCard, SubmissionForm
│   │   ├── forms/              # QuoteForm, ContactForm, ReviewForm
│   │   ├── checkout/           # CartDrawer, SquarePayment
│   │   └── account/            # ProfileCard, OrderHistory, QuoteStatus
│   ├── lib/
│   │   ├── supabase/           # Supabase client, helpers, types
│   │   ├── square/             # Square SDK setup, payment helpers
│   │   ├── resend/             # Email templates, send helpers
│   │   └── utils/              # General utilities, formatters, validators
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript type definitions
│   └── styles/
│       └── globals.css         # Tailwind base, custom properties, global styles
├── supabase/
│   ├── migrations/             # Database migrations
│   └── seed.sql                # Sample data for development
├── .env.local                  # Environment variables (NEVER commit)
├── .env.example                # Template for env vars
├── .gitignore                  # Git ignore rules (node_modules, .env, .next, etc.)
├── README.md                   # Project overview for GitHub
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── RETROFIT_CREATIONS_PRD.md   # THIS DOCUMENT — always keep at project root
```

> **GitHub Repo:** `https://github.com/vrostbyte/retrofit-creations`
> **Local Dev Path:** `~/Projects/Hailie/` (Arch Linux workstation)

### 4.4 Environment Variables Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Square
SQUARE_ACCESS_TOKEN=
SQUARE_APPLICATION_ID=
SQUARE_LOCATION_ID=
NEXT_PUBLIC_SQUARE_APPLICATION_ID=
SQUARE_ENVIRONMENT=sandbox  # Change to 'production' for launch

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@retrofitcreations.com

# App
NEXT_PUBLIC_SITE_URL=https://retrofitcreations.com
```

---

## 5. SITE MAP & PAGE SPECIFICATIONS

### 5.1 Navigation Structure

**Primary Navigation (Sticky Header):**

```
[Logo]   Home  |  Products  |  Services  |  Community  |  About  |  Testimonials  |  Contact    [Cart] [Account]
```

**Footer:**

```
Quick Links          Services              Connect              Legal
─────────────        ─────────────         ─────────────        ─────────────
Home                 Laser Engraving       Instagram            Privacy Policy
Products             3D Printing           Facebook             Terms of Service
Services             CNC Carving           TikTok               Shipping Policy
Community            Prototyping           YouTube              Return Policy
About Us             Custom Auto           Email Us
Contact              Bulk Orders

                    © 2026 Retrofit Creations LLC. All rights reserved.
```

---

### 5.2 PAGE: Homepage (`/`)

**Purpose:** First impression. Establish brand credibility. Drive visitors to shop, request custom work, or join the community.

**Hero Section:**
- Full-width **light background** (white or very light gray) with subtle darker grid pattern overlay for industrial texture
- Retrofit Creations logo (prominently displayed — use `RC-Engraving-Logo-transparent.png` since hero background is light)
- Headline: **"Built Different. Made to Stand Out."** in black text
- Subheadline: Brief brand positioning (1-2 sentences about custom fabrication + precision) in dark gray text
- Three CTA buttons — **all three must use the SAME style** (blue `#0062FF` background, white text). Differentiate with a small white icon at the start of each button label if desired, but color/shape/size must be identical across all three:
  - `Shop Products` → `/products`
  - `Request Custom Work` → `/contact`
  - `Join the Community` → `/community`

**Section: Featured Product Categories**
- Grid of category cards with images/icons
- Categories: Custom Automotive Parts, 3D Printed Parts, Laser Engraved Items, Personalized Gifts, Event/Vendor Items, Custom Zyn Tins
- Each card links to filtered product listing

**Section: Services Overview**
- Horizontal scrollable or grid layout
- Highlight cards for: Laser Engraving, 3D Printing, CNC Carving, Custom Auto Parts
- Each links to Services page

**Section: Community Showcase**
- 3-4 featured project photos/builds
- "See More" link to Community page
- Social proof — real customer work

**Section: Testimonials Preview**
- 2-3 customer testimonials in card format
- Star ratings, customer names, project type tags
- "Read More Reviews" link to Testimonials page

**Section: About Preview**
- Brief brand story (2-3 sentences)
- "Learn More" link to About page

**Section: Contact / Custom Quote CTA**
- Bold call-to-action banner
- "Have a Custom Project in Mind?"
- Button: `Get a Free Quote` → `/contact`

---

### 5.3 PAGE: Products (`/products`)

**Purpose:** Browse and purchase ready-made products. E-commerce storefront experience.

**Features:**
- **Category filter sidebar/bar** — filter by: Custom Zyn Tins, Laser Engraved Keychains, Custom Automotive Parts, Event/Vendor Items, Personalized Gifts, 3D Printed Parts
- **Search bar** — full-text search across product names and descriptions
- **Sort options** — Price (low/high), Newest, Popular, Name (A-Z)
- **Product grid** — responsive card layout

**Product Card Contains:**
- Product image (with hover zoom or secondary image)
- Product name
- Price (or "From $XX" for customizable items)
- Category tag
- Star rating (if reviews exist)
- Quick-action buttons: `View Details`, `Add to Cart`

**Product Detail Page (`/products/[slug]`):**
- Image gallery (multiple photos, zoom capability)
- Product name, price, description
- Customization options (if applicable — color, size, text input, material)
- Quantity selector
- `Add to Cart` button
- `Customize This` button (for items that can be personalized → opens customization flow or redirects to quote)
- Related products section
- Customer reviews for this product

---

### 5.4 PAGE: Services (`/services`)

**Purpose:** Showcase all services offered. Drive quote requests.

**Layout:** Service cards in a grid or stacked layout.

**Service Cards (one for each):**

1. **Laser Engraving** — Custom text, logos, artwork on wood, metal, leather, acrylic, and more
2. **3D Printing** — FDM and resin printing for functional parts, prototypes, and custom designs
3. **CNC Carving** — Precision carving in wood, plastics, soft metals, and composites
4. **Product Prototyping** — Rapid prototyping for inventors, startups, and hobbyists
5. **Custom Automotive Trim/Accessories** — Replacement and bespoke trim pieces for any vehicle
6. **Bulk/Custom Orders** — Volume runs for businesses, events, and resellers
7. **Design Consultation** — Collaborative design-to-manufacture workflow

**Each Card Contains:**
- Service icon or image
- Service name
- Short description (2-3 sentences)
- Estimated turnaround time (placeholder initially, Hailie fills in real data)
- `Request a Quote` button → `/contact` (pre-selects service type)

---

### 5.5 PAGE: Community (`/community`)

**Purpose:** Build engagement and social proof. Show off completed work. Foster car culture community.

**Sections:**

- **Customer Showcase** — Gallery of completed customer projects with descriptions
- **Recent Projects** — Latest work from Retrofit Creations
- **Event Booth Appearances** — Photos and info from car shows, markets, events
- **Car Community Projects** — Highlights from car clubs and community builds
- **Featured Builds** — Spotlight posts on exceptional projects

**Submission Form:**
- Allow customers to submit their photos and project stories
- Fields: Name, Email, Photos (upload), Project Description, Permission to feature
- Submissions go to Hailie for approval before publishing

---

### 5.6 PAGE: User Accounts (`/account`)

**Purpose:** Customer self-service portal.

**Unauthenticated:**
- `/account/login` — Email/password login + OAuth options (Google)
- `/account/signup` — Registration form

**Authenticated Dashboard (`/account`):**
- **Profile** — Name, email, shipping address, profile photo
- **Order History** — List of past orders with status, tracking, details
- **Custom Quote Requests** — Status tracking for submitted quotes (Pending → In Review → Quoted → Accepted → In Production → Completed)
- **Wishlist/Favorites** — Saved products
- **Community Profile** — Public profile for community features
- **Upload Reference Photos** — For custom work discussions

---

### 5.7 PAGE: About Us (`/about`)

**Purpose:** Tell the Retrofit Creations story. Build trust and connection.

**Content Themes:**
- Origin story — how and why Hailie started Retrofit Creations
- Mission — creativity, precision, craftsmanship, community
- What makes RC different — custom laser engraving, small-batch fabrication, automotive passion, made-to-order products
- Community involvement — car shows, local events, clubs
- The workshop — photos of equipment, workspace, process shots
- Values — quality, craftsmanship, customer service, attention to detail

**Design:** Full-width hero with workshop photo. Text sections interspersed with images. Personal, authentic tone.

---

### 5.8 PAGE: Testimonials (`/testimonials`)

**Purpose:** Social proof. Build trust with potential customers.

**Features:**
- Customer testimonial cards in a masonry or grid layout
- Each card: customer quote, star rating (1-5), customer name, customer photo (or avatar), project type tag (e.g., "Automotive Part", "Custom Engraving", "Event Order")
- Filter by project type
- CTA at bottom: "Had a Great Experience? Leave a Review!" → opens review submission form

**Review Submission Form:**
- Name, Email, Star Rating, Written Review, Photo Upload (optional), Project Type (dropdown)
- Submissions go to Hailie for approval before publishing

---

### 5.9 PAGE: Contact / Custom Quote (`/contact`)

**Purpose:** Primary conversion page for custom work. Also general contact.

**Quote Request Form Fields:**
- Name (required)
- Email (required)
- Phone (optional)
- Product/Service Type (dropdown — maps to service categories)
- Quantity (number input)
- Budget Range (dropdown — e.g., Under $50, $50-100, $100-250, $250-500, $500+, Not Sure)
- Deadline / Needed By Date (date picker)
- Upload Reference Images (multi-file upload, stored in Supabase Storage)
- Project Description (textarea — detailed description of what they want)
- Preferred Contact Method (radio — Email, Phone, Text)
- Submit button

**On Submission:**
1. Data saved to Supabase `quotes` table
2. Confirmation email sent to customer via Resend
3. Notification email sent to Hailie via Resend
4. Customer sees success message with expected response time

**Also Include:**
- General contact info (email, phone if applicable, location)
- Business hours (or "Custom hours — we'll get back to you within 24-48 hours")
- Map embed (if physical location is shared)
- Social media links

---

### 5.10 PAGE: Admin Panel (`/admin`) — Hailie Only

**Purpose:** Backend management for Hailie to run the business without developer help.

**Protected:** Requires authentication + admin role check.

**Sections:**

- **Dashboard** — Overview stats: recent orders, pending quotes, revenue summary, new customers
- **Product Management** — CRUD for products (add, edit, delete, toggle visibility). Image upload. Category assignment. Pricing. Inventory notes.
- **Order Management** — View orders, update status (Received → Processing → Shipped → Delivered), add tracking numbers, view payment status from Square
- **Quote Management** — View incoming quotes, update status, respond to customers, convert quotes to orders
- **Content Management** — Approve/manage community submissions, testimonials, featured projects
- **Settings** — Business info, email templates, notification preferences

---

## 6. FEATURE REQUIREMENTS

### 6.1 E-Commerce (Store)

| Feature | Priority | Phase |
|---------|----------|-------|
| Product listing with grid/cards | Must Have | 1 |
| Category filtering | Must Have | 1 |
| Search (product name/description) | Must Have | 1 |
| Product detail page | Must Have | 1 |
| Shopping cart (drawer/sidebar) | Must Have | 2 |
| Square checkout integration | Must Have | 2 |
| Product image gallery | Must Have | 1 |
| Product customization options | Nice to Have | 3 |
| Wishlist/Favorites | Nice to Have | 3 |
| Product reviews/ratings | Nice to Have | 3 |
| Inventory tracking | Nice to Have | 3 |
| Discount codes / Promo codes | Nice to Have | 4 |

### 6.2 Custom Quotes

| Feature | Priority | Phase |
|---------|----------|-------|
| Quote request form | Must Have | 1 |
| Image upload (reference photos) | Must Have | 2 |
| Email notifications (customer + Hailie) | Must Have | 2 |
| Quote status tracking (customer dashboard) | Must Have | 3 |
| Quote-to-order conversion (admin) | Nice to Have | 3 |

### 6.3 User Accounts

| Feature | Priority | Phase |
|---------|----------|-------|
| Email/password registration | Must Have | 2 |
| Login / Logout | Must Have | 2 |
| Profile management | Must Have | 2 |
| Order history | Must Have | 2 |
| Quote request history | Must Have | 3 |
| Wishlist | Nice to Have | 3 |
| Community profile | Nice to Have | 4 |
| OAuth (Google) | Nice to Have | 3 |

### 6.4 Community

| Feature | Priority | Phase |
|---------|----------|-------|
| Project showcase gallery | Must Have | 1 |
| Photo submission form | Must Have | 2 |
| Admin approval workflow | Must Have | 2 |
| Event calendar/listings | Nice to Have | 4 |
| User-submitted builds | Nice to Have | 4 |

### 6.5 Admin Panel

| Feature | Priority | Phase |
|---------|----------|-------|
| Product CRUD | Must Have | 2 |
| Order management | Must Have | 2 |
| Quote management | Must Have | 2 |
| Dashboard stats | Nice to Have | 3 |
| Content moderation | Nice to Have | 3 |
| Email template management | Nice to Have | 4 |

---

## 7. INTEGRATION SPECIFICATIONS

### 7.1 Square — Payment Processing

**What it does:** Handles all payment processing for the e-commerce store.

**Integration approach:**
- Use the **Square Web Payments SDK** for the frontend payment form (card input, Apple Pay, Google Pay)
- Use the **Square Payments API** (server-side, via Next.js API routes) to process charges
- Use the **Square Orders API** to create and track orders
- Webhook from Square → our API route to confirm payment status

**Flow:**
1. Customer adds items to cart
2. Customer clicks "Checkout"
3. Frontend loads Square Web Payments SDK (tokenizes card info — card numbers never touch our server)
4. Frontend sends payment token + order details to our `/api/checkout` API route
5. API route calls Square Payments API to charge the card
6. On success: create order in Supabase, send confirmation email via Resend, return success to frontend
7. On failure: return error, customer can retry

**Square Environment:**
- Development: Square Sandbox (free test transactions)
- Production: Live Square account (real charges)

**Required Square Setup:**
- Square Developer account
- Application created in Square Dashboard
- Sandbox credentials for development
- Production credentials for launch

### 7.2 Supabase — Database, Auth, Storage

**Database Tables (see Section 9 for full schema):**
- `profiles` — User profile data (extends Supabase Auth)
- `products` — Product catalog
- `product_images` — Product photo URLs
- `product_categories` — Category definitions
- `orders` — Customer orders
- `order_items` — Individual items in an order
- `quotes` — Custom quote requests
- `testimonials` — Customer reviews
- `community_posts` — Community showcase submissions
- `cart_items` — Shopping cart (optional — can also be client-side)

**Auth:**
- Email/password signup and login
- Password reset flow
- Optional OAuth (Google)
- Role-based access: `customer` (default) and `admin` (Hailie)
- Row Level Security (RLS) policies on all tables

**Storage Buckets:**
- `product-images` — Product photos (public read, admin write)
- `quote-uploads` — Customer reference images for quotes (authenticated read/write)
- `community-photos` — Community submission photos (public read after approval, authenticated write)
- `avatars` — User profile photos (authenticated read/write)

### 7.3 Resend — Email Automation

**Transactional Emails:**

| Trigger | Recipient | Email Content |
|---------|-----------|---------------|
| New order placed | Customer | Order confirmation, items, total, estimated shipping |
| New order placed | Hailie (admin) | New order alert with details |
| Order status updated | Customer | Status change notification (shipped, delivered) |
| Quote submitted | Customer | Quote received confirmation, expected response time |
| Quote submitted | Hailie (admin) | New quote alert with all details |
| Quote status updated | Customer | Quote update (e.g., price provided, questions) |
| Account created | Customer | Welcome email |
| Password reset | Customer | Reset link |
| Community post approved | Customer | "Your submission is now live!" |

**Email Template Style:**
- Dark theme matching the website brand
- Retrofit Creations logo in header
- Black background, white text, blue accent buttons
- Clean, mobile-responsive layout

### 7.4 Vercel — Hosting & Deployment

**Setup:**
- Connect GitHub repo to Vercel project
- Auto-deploy on push to `main` branch
- Preview deployments on pull requests
- Domain configuration: `retrofitcreations.com` as primary
- Redirect `retrofitcreationsllc.com` → `retrofitcreations.com`
- Environment variables configured in Vercel dashboard

**Serverless Functions:**
- API routes in `/src/app/api/` automatically deploy as serverless functions
- Used for: payment processing, email sending, webhook handlers, admin operations

---

## 8. USER ROLES & FLOWS

### 8.1 Roles

| Role | Who | Permissions |
|------|-----|-------------|
| **Visitor** | Anyone (not logged in) | Browse products, view services, view community, read testimonials, submit quote request, view about/contact |
| **Customer** | Registered user | Everything Visitor can do + purchase products, track orders, manage wishlist, track quotes, submit community posts, submit reviews |
| **Admin** | Hailie | Everything Customer can do + manage products (CRUD), manage orders, manage quotes, approve community posts, approve testimonials, view dashboard stats |

### 8.2 Key User Flows

**Flow: Browse → Purchase**
```
Homepage → Products → Filter/Search → Product Detail → Add to Cart → Cart Drawer → Checkout → Square Payment → Order Confirmation (page + email)
```

**Flow: Custom Quote Request**
```
Homepage (or Services) → Contact/Quote Page → Fill Form → Upload Reference Images → Submit → Confirmation (page + email) → Hailie Reviews → Quote Provided → Customer Accepts → Payment → Production
```

**Flow: Community Submission**
```
Community Page → "Share Your Project" → Upload Photos + Description → Submit → Hailie Reviews/Approves → Post Goes Live → Customer Notified
```

**Flow: Hailie's Daily Management**
```
Login → Admin Dashboard → Check New Orders → Update Order Status → Check New Quotes → Respond to Quotes → Review Community Submissions → Add/Edit Products
```

---

## 9. DATA MODELS

### 9.1 Database Schema (Supabase / PostgreSQL)

```sql
-- ============================================
-- PROFILES (extends Supabase Auth users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  shipping_address JSONB,  -- {street, city, state, zip, country}
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCT CATEGORIES
-- ============================================
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCTS
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,       -- For product cards
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),  -- "Was $XX" pricing
  category_id UUID REFERENCES product_categories(id),
  is_customizable BOOLEAN DEFAULT FALSE,
  customization_options JSONB,  -- {fields: [{name, type, options, required}]}
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  inventory_note TEXT,           -- Hailie's internal notes
  metadata JSONB,                -- Flexible extra data
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCT IMAGES
-- ============================================
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDERS
-- ============================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  order_number TEXT UNIQUE NOT NULL,       -- Human-readable (e.g., RC-2026-0001)
  status TEXT DEFAULT 'received'
    CHECK (status IN ('received', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  square_payment_id TEXT,                  -- Square payment reference
  square_order_id TEXT,                    -- Square order reference
  tracking_number TEXT,
  tracking_carrier TEXT,
  notes TEXT,                              -- Hailie's internal notes
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDER ITEMS
-- ============================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,              -- Snapshot at time of order
  product_price DECIMAL(10,2) NOT NULL,    -- Snapshot at time of order
  quantity INTEGER NOT NULL DEFAULT 1,
  customization_data JSONB,                -- Customer's customization choices
  line_total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- QUOTES (Custom Work Requests)
-- ============================================
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),    -- NULL if submitted by visitor
  quote_number TEXT UNIQUE NOT NULL,        -- Human-readable (e.g., RCQ-2026-0001)
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_review', 'quoted', 'accepted', 'in_production', 'completed', 'declined', 'cancelled')),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  service_type TEXT NOT NULL,              -- Maps to service categories
  quantity INTEGER,
  budget_range TEXT,
  deadline DATE,
  description TEXT NOT NULL,
  preferred_contact TEXT DEFAULT 'email'
    CHECK (preferred_contact IN ('email', 'phone', 'text')),
  reference_images TEXT[],                 -- Array of Supabase Storage URLs
  admin_notes TEXT,                        -- Hailie's internal notes
  quoted_price DECIMAL(10,2),              -- Price Hailie quotes back
  quoted_turnaround TEXT,                  -- Estimated turnaround
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_photo_url TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  project_type TEXT,                       -- Tag: "Automotive Part", "Engraving", etc.
  is_approved BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COMMUNITY POSTS
-- ============================================
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  photos TEXT[] NOT NULL,                  -- Array of Supabase Storage URLs
  post_type TEXT DEFAULT 'showcase'
    CHECK (post_type IN ('showcase', 'event', 'build', 'featured')),
  is_approved BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  submitted_by_name TEXT NOT NULL,
  submitted_by_email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- WISHLIST
-- ============================================
CREATE TABLE wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

### 9.2 Row Level Security (RLS) Summary

| Table | Visitor | Customer | Admin |
|-------|---------|----------|-------|
| `profiles` | — | Own row only | All |
| `products` | Read (active only) | Read (active only) | Full CRUD |
| `product_images` | Read | Read | Full CRUD |
| `product_categories` | Read | Read | Full CRUD |
| `orders` | — | Own orders only | All |
| `order_items` | — | Own order items | All |
| `quotes` | Insert | Own + Insert | All |
| `testimonials` | Read (approved) | Read (approved) + Insert | All |
| `community_posts` | Read (approved) | Read (approved) + Insert | All |
| `wishlist_items` | — | Own items | All |

---

## 10. DEVELOPMENT PHASES

### Phase 1: Foundation + Static Frontend (Weeks 1-2)

**Goal:** Get the site looking great with all pages built as static/hardcoded content.

- [ ] **Bootstrap project in `~/Projects/Hailie/`** — see Section 11.3 for full sequence (preserve existing logo files!)
- [ ] Initialize Next.js project with TypeScript + Tailwind CSS
- [ ] Configure Tailwind with brand colors, fonts, dark theme
- [ ] Build reusable UI components (Button, Card, Input, Modal, Badge)
- [ ] Build layout components (Header with sticky nav, Footer, MobileMenu)
- [ ] Build Homepage with all sections (hardcoded content)
- [ ] Build Products page with grid layout and category filter (hardcoded products)
- [ ] Build Product Detail page template
- [ ] Build Services page with service cards
- [ ] Build Community page with gallery layout
- [ ] Build About Us page
- [ ] Build Testimonials page
- [ ] Build Contact / Custom Quote page with form (frontend validation only)
- [ ] Build Account pages (Login, Signup, Dashboard — UI only)
- [ ] Deploy to Vercel from GitHub
- [ ] Configure domains in Vercel

### Phase 2: Backend + Core Integrations (Weeks 3-4)

**Goal:** Connect the database, authentication, and payment processing.

- [ ] Set up Supabase project
- [ ] Create database tables and migrations
- [ ] Configure Supabase Auth (email/password)
- [ ] Implement RLS policies
- [ ] Set up Supabase Storage buckets
- [ ] Connect frontend to Supabase (products load from DB)
- [ ] Implement user registration and login
- [ ] Build admin panel (product CRUD)
- [ ] Set up Square Developer account and sandbox
- [ ] Implement Square Web Payments SDK on frontend
- [ ] Build `/api/checkout` API route for payment processing
- [ ] Implement shopping cart (add, remove, update quantity)
- [ ] Set up Resend and build email templates
- [ ] Wire up quote submission form → Supabase + Resend notifications
- [ ] Wire up order confirmation emails

### Phase 3: Polish + Advanced Features (Weeks 5-6)

**Goal:** Complete the user experience. Add account features, admin tools, community.

- [ ] User dashboard — order history, quote tracking
- [ ] Admin dashboard — order management, quote management
- [ ] Community submission form → Supabase + admin approval
- [ ] Testimonial submission form → Supabase + admin approval
- [ ] Image upload flows (quotes, community, products)
- [ ] Search functionality (products)
- [ ] Wishlist/favorites
- [ ] OAuth login (Google)
- [ ] SEO optimization (meta tags, OG images, structured data)
- [ ] Performance optimization (image lazy loading, code splitting)
- [ ] Accessibility audit
- [ ] Mobile responsiveness QA

### Phase 4: Launch + Post-Launch (Week 7+)

**Goal:** Go live and iterate.

- [ ] Switch Square from sandbox to production
- [ ] Final QA across browsers and devices
- [ ] Load test data / seed products
- [ ] Hailie training session — how to manage products, orders, quotes
- [ ] DNS cutover — go live on `retrofitcreations.com`
- [ ] Monitor for issues
- [ ] Iterate based on customer feedback
- [ ] Future: discount codes, advanced inventory, email marketing campaigns

---

## 11. LOCAL DEVELOPMENT SETUP

### 11.1 Developer Environment

| Detail | Value |
|--------|-------|
| **Developer** | Josh |
| **OS** | Arch Linux (ArchBookAir) |
| **Local Project Path** | `~/Projects/Hailie/` |
| **CLI Tools** | Claude Code, Gemini CLI |
| **GitHub Repo** | `https://github.com/vrostbyte/retrofit-creations` |
| **GitHub Noreply** | `189171963+vrostbyte@users.noreply.github.com` |

### 11.2 Initial Repo State

The repo at `https://github.com/vrostbyte/retrofit-creations` is currently **empty** — no README, no `.gitignore`, no code. The local project folder at `~/Projects/Hailie/` already has logo assets in place:

```
~/Projects/Hailie/
└── public/
    └── images/
        ├── RC-Engraving-Logo.png
        └── RC-Engraving-Logo-transparent.png
```

### 11.3 Bootstrap Sequence (First CLI Prompt)

The very first task for Claude Code must initialize the project **in the existing local folder** (not create a new one) since logo files are already there. The bootstrap sequence should:

1. Initialize the Next.js project in `~/Projects/Hailie/` (using `--use-npm` or preferred package manager)
2. Confirm `public/images/` logos are preserved (do NOT overwrite the `public/` folder)
3. Install core dependencies: `tailwindcss`, `@supabase/supabase-js`, `typescript`
4. Create `.gitignore` with standard Next.js ignores (see below)
5. Create `.env.example` with all required env var placeholders
6. Create a `README.md`
7. Copy `RETROFIT_CREATIONS_PRD.md` to the project root
8. Configure Tailwind with brand colors, fonts, dark mode
9. Initialize git, commit, and push to the GitHub remote

### 11.4 Required .gitignore

```gitignore
# Dependencies
node_modules/
.pnp/
.pnp.js

# Next.js
.next/
out/

# Build
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Vercel
.vercel

# Supabase
supabase/.temp/

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

### 11.5 README.md Template

```markdown
# Retrofit Creations

> Built Different. Made to Stand Out.

Custom fabrication, 3D printing, laser engraving, and CNC services — based in San Diego, CA.

## Tech Stack

- **Framework:** Next.js (React + TypeScript)
- **Styling:** Tailwind CSS
- **Database/Auth/Storage:** Supabase
- **Payments:** Square
- **Email:** Resend
- **Hosting:** Vercel

## Getting Started

1. Clone the repo: `git clone https://github.com/vrostbyte/retrofit-creations.git`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your keys
4. Run dev server: `npm run dev`
5. Open `http://localhost:3000`

## Project Documentation

See `RETROFIT_CREATIONS_PRD.md` for the full Product Requirements Document.

## License

Proprietary — Retrofit Creations LLC
```

---

## 12. CLI PROMPT STRATEGY

### 12.1 How to Use This Document with CLI Tools

This PRD is designed to be fed directly to **Claude Code** and **Gemini CLI** as context for every major task. The prompt architecture follows this pattern:

```
[CONTEXT] → Reference this PRD or relevant sections
[TASK] → Specific, scoped instruction
[CONSTRAINTS] → Technical boundaries, brand rules, quality requirements
[OUTPUT] → Expected deliverable format
```

### 12.2 Prompt Rules for CLI Tools

1. **Always reference this PRD** — Begin prompts with: "Refer to the Retrofit Creations PRD at the project root for brand guidelines, tech stack, and project structure."
2. **One task per prompt** — Don't combine "build the header AND the homepage AND connect Supabase." Break it down.
3. **Specify the file path** — Tell the CLI exactly where the output should go (e.g., "Create `src/components/layout/Header.tsx`").
4. **Include brand constraints** — Remind the CLI about colors (`#000000`, `#FFFFFF`, `#0062FF`), dark theme, Tailwind, and the industrial/premium aesthetic.
5. **Specify component dependencies** — If a component needs other components that already exist, say so.
6. **Request TypeScript** — All components should be TypeScript (`.tsx` / `.ts`).
7. **Request accessibility** — Remind CLI tools to include ARIA labels, semantic HTML, keyboard navigation.

### 12.3 Example Prompt Templates

**Template: Build a Component**
```
Context: I'm building the Retrofit Creations website. Refer to RETROFIT_CREATIONS_PRD.md for brand guidelines and project structure.

Task: Create the [ComponentName] component at [file path].

Requirements:
- [Specific requirements from the PRD]
- Use Tailwind CSS with our brand colors: black (#000000), white (#FFFFFF), blue (#0062FF)
- Dark theme — black backgrounds, white text, blue accents
- Fully responsive (mobile-first)
- TypeScript with proper type definitions
- Include ARIA labels and semantic HTML
- [Any specific interactions or states]

Dependencies: This component uses [list any existing components it imports].

Reference: See PRD Section [X.X] for full specifications.
```

**Template: Build an API Route**
```
Context: I'm building the Retrofit Creations website. Refer to RETROFIT_CREATIONS_PRD.md for tech stack and integration specs.

Task: Create the API route at [file path].

Requirements:
- [What the route does]
- Connects to [Supabase/Square/Resend] — see PRD Section 7 for integration details
- Input validation with [specific fields]
- Error handling with appropriate HTTP status codes
- TypeScript
- Environment variables: [list which env vars it needs]

Data model: See PRD Section 9 for the database schema.
```

**Template: Wire Up Integration**
```
Context: I'm building the Retrofit Creations website. Refer to RETROFIT_CREATIONS_PRD.md Section 7.[X] for [Square/Supabase/Resend] integration specifications.

Task: [Specific integration task — e.g., "Set up the Square Web Payments SDK checkout flow"].

Current state: [What already exists — e.g., "The cart component is built, checkout page has a placeholder payment form"].

Requirements:
- [Step-by-step of what needs to happen]
- Follow the flow described in PRD Section 7.[X]
- Use sandbox/development credentials
- Handle success and error states
- [Any specific UX requirements]
```

---

## 13. OPEN ITEMS & TBDs

| Item | Status | Notes |
|------|--------|-------|
| Business location (city/state) | ✅ Resolved | San Diego, CA |
| Social media accounts | ⏳ Need to create | Recommend: Instagram, Facebook, TikTok. Hailie to set up. |
| Logo file (SVG/PNG) | ✅ On disk | `public/images/RC-Engraving-Logo.png` + transparent variant. Note: branded as "RC Engraving" — may want a broader "Retrofit Creations" logo later. SVG version would be ideal for scalability. |
| Heading font selection | ✅ Resolved | Oswald (Google Fonts) — can revisit later |
| Body font selection | ✅ Resolved | Inter (Google Fonts) — can revisit later |
| Product photography | ⏳ Hailie to provide | Will use placeholders until real photos are ready |
| Shipping rates/policy | ⏳ Hailie has it somewhere | She'll provide when she finds it |
| Return/refund policy | ⏳ Hailie has it somewhere | She'll provide when she finds it |
| Tax collection setup | ⏳ To define | Square handles tax calculation, but need to configure |
| Real service turnaround times | ⏳ Hailie to provide | Placeholders in Phase 1, real data before launch |
| Square account setup | ⏳ To do | Need Developer account + application created |
| Supabase project creation | ⏳ To do | Need project URL + keys |
| Resend account setup | ⏳ To do | Need API key + verified domain |
| Privacy Policy content | ⏳ To write | Legal requirement for e-commerce |
| Terms of Service content | ⏳ To write | Legal requirement for e-commerce |
| Broader "Retrofit Creations" logo | ⏳ Optional | Current logo says "RC Engraving" — may want full brand logo |

---

## 14. CHANGELOG

| Date | Version | Changes |
|------|---------|---------|
| 2026-05-16 | 1.0.0 | Initial PRD created. All sections drafted. |
| 2026-05-16 | 1.1.0 | Added: San Diego CA location, GitHub repo URL, noreply email, local dev setup (Section 11), .gitignore template, README template, bootstrap sequence. Resolved: fonts (Oswald + Inter), logo files on disk. Updated open items. |
| 2026-05-16 | 1.2.0 | **THEME CHANGE:** Switched from full dark theme to "Light Body, Dark Nav" — white/light content areas with black header and footer. Reason: target audience (older demographic) + outdoor mobile use at car shows requires high readability. Updated Section 3.2 color palette, Section 3.4 design language. |
| 2026-05-16 | 1.2.1 | **FIXES:** Hero must be light (not dark). Logo usage rules added — non-transparent for dark bg, transparent for light bg. Hero CTA buttons must all be identical style. Footer column headers must be white/light text. Added mandatory accessibility/contrast review rule to CLAUDE.md. |

---

> **REMINDER:** This document is the single source of truth. When making decisions about the project, consult this PRD first. When feeding prompts to CLI tools, reference the relevant sections. Update this document as decisions are made and TBDs are resolved. Increment the version number with each significant update.
