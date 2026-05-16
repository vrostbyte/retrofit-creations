# BOOTSTRAP SUPER PROMPT — Paste Into Claude Code

> **INSTRUCTIONS FOR JOSH:**
> 1. Open your terminal
> 2. `cd ~/Projects/Hailie`
> 3. Run `claude` to start Claude Code
> 4. Paste everything below the line into Claude Code
> 5. Let it run — review what it produces before approving commits

---
PASTE BELOW THIS LINE
---

## Context

I'm bootstrapping a new website project for Retrofit Creations, a custom fabrication business in San Diego, CA. The project folder already exists at the current directory with logo files in `public/images/`. There is a GitHub repo at https://github.com/vrostbyte/retrofit-creations that is currently empty (no README, no .gitignore, nothing).

**IMPORTANT — Before doing ANYTHING, read these files in the current directory:**
- `RETROFIT_CREATIONS_PRD.md` — The complete Product Requirements Document. This is the single source of truth for everything: business context, brand rules, page specifications, data models, integrations, and project structure. Read the ENTIRE document.
- `CLAUDE.md` — Project instructions for you. Read this and follow it for every task going forward.
- `SQUARE_SETUP_GUIDE.md` — Reference for how Square payment integration works.

**RULE: For every task in this project, now and in the future, you MUST read all `.md` guidance files at the project root before starting work. If you're unsure about brand colors, page specs, data models, or how an integration works — check the PRD first, then ask.**

## Task: Full Project Bootstrap + Phase 1 Static Frontend

Initialize this project and build the complete Phase 1 static frontend in one go. Here's the step-by-step:

### Part 1: Project Initialization

1. **Verify existing files are preserved** — List `public/images/` and confirm the logo files are there (`RC-Engraving-Logo.png` and `RC-Engraving-Logo-transparent.png`). Do NOT delete or overwrite them.

2. **Initialize Next.js** — Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` in the CURRENT directory. If it prompts about existing files, choose to continue without overwriting. Use npm as the package manager.

3. **Install dependencies:**
   ```
   npm install @supabase/supabase-js react-square-web-payments-sdk square resend
   npm install -D @types/node
   ```

4. **Create `.gitignore`** — Use the template from PRD Section 11.4.

5. **Create `.env.example`** — Use the env vars from PRD Section 4.4.

6. **Create `.env.local`** — Copy from `.env.example` with placeholder values. Add a comment at the top: `# Fill in real values — see SQUARE_SETUP_GUIDE.md and PRD Section 4.4`

7. **Configure Tailwind** (`tailwind.config.ts`):
   - Dark mode: `class`
   - Extend colors with brand palette:
     - `brand-black: '#000000'`
     - `brand-white: '#FFFFFF'`
     - `brand-blue: '#0062FF'`
     - Generate blue alpha variants: `brand-blue/10`, `brand-blue/20`, etc. using Tailwind's built-in opacity modifier
   - Add Google Fonts: Oswald (headings) and Inter (body) via `next/font/google`
   - Configure font families in Tailwind extend

8. **Set up global styles** (`src/styles/globals.css` or `src/app/globals.css`):
   - Set `html` and `body` to black background, white text
   - Set CSS custom properties for brand colors
   - Import Google Fonts via next/font (NOT via CSS @import — use Next.js font optimization)
   - Smooth scrolling
   - Custom scrollbar styling (dark theme)

9. **Verify logos survived** — Check that `public/images/` still has both logo files.

### Part 2: Reusable UI Components

Build these foundational components first. Every component must use TypeScript, Tailwind, be responsive, and follow the brand rules in `CLAUDE.md`.

**`src/components/ui/Button.tsx`**
- Variants: `primary` (blue bg, white text), `secondary` (transparent, blue border), `ghost` (transparent, hover reveals blue)
- Sizes: `sm`, `md`, `lg`
- Props: `variant`, `size`, `href` (renders as Link if provided), `children`, `className`, `disabled`, standard button props
- Hover: subtle glow effect using blue at reduced opacity
- Add instructional comments explaining the component pattern

**`src/components/ui/Card.tsx`**
- Dark card with subtle border (`brand-blue` at ~10-15% opacity)
- Hover: border brightens, subtle glow
- Props: `children`, `className`, `href` (clickable card)

**`src/components/ui/Badge.tsx`**
- Small tag/label for categories, statuses
- Variants: `default` (blue), `outline`, `success`, `warning`

**`src/components/ui/Input.tsx`**
- Dark input field, white text, blue focus ring
- Variants for: text, email, textarea, select, file upload
- Labels and error state support

**`src/components/ui/SectionHeading.tsx`**
- Reusable section title with optional subtitle
- Oswald font, uppercase, blue accent line or decoration

**`src/components/ui/StarRating.tsx`**
- Displays 1-5 stars filled/unfilled
- Props: `rating` (number), `size`

### Part 3: Layout Components

**`src/components/layout/Header.tsx`**
- Sticky header, black background with subtle bottom border
- Left: Logo (use `RC-Engraving-Logo-transparent.png` via next/image)
- Center: Navigation links — Home, Products, Services, Community, About, Testimonials, Contact
- Right: Cart icon (with item count badge) + Account icon
- Mobile: Hamburger menu that opens a slide-out drawer
- Active link state: blue underline or color
- See PRD Section 5.1 for exact nav structure

**`src/components/layout/Footer.tsx`**
- Four-column layout matching PRD Section 5.1 footer structure
- Columns: Quick Links, Services, Connect (social links as TBD placeholders), Legal
- Bottom bar: copyright line with current year
- All links functional (internal) or placeholder `#` for TBD items

**`src/components/layout/MobileMenu.tsx`**
- Slide-out drawer from the right
- Dark overlay behind it
- All nav links, close button
- Animate in/out smoothly

**`src/app/layout.tsx`**
- Root layout wrapping all pages
- Includes Header and Footer
- Font setup via next/font/google (Oswald + Inter)
- Metadata: title "Retrofit Creations — Built Different. Made to Stand Out.", description, OG tags
- Dark theme body class

### Part 4: All Pages (Static/Hardcoded Content)

Build every page per the PRD specs in Section 5. Use hardcoded placeholder data — we'll connect the database in Phase 2. Every page must look polished, professional, and match the brand aesthetic.

**Homepage (`src/app/page.tsx`)** — PRD Section 5.2
- Hero: Dark industrial background (use CSS gradient/pattern — no stock images), logo display, headline "Built Different. Made to Stand Out.", subheadline, three CTA buttons
- Featured Categories: 6 cards in a grid
- Services Overview: Horizontal cards or grid
- Community Showcase: 3-4 placeholder project cards
- Testimonials Preview: 2-3 testimonial cards with star ratings
- About Preview: Short text + "Learn More" link
- CTA Banner: "Have a Custom Project in Mind?" with blue button

**Products (`src/app/products/page.tsx`)** — PRD Section 5.3
- Category filter bar at top (6 categories from PRD)
- Search bar
- Sort dropdown (Price low/high, Newest, Popular, Name A-Z)
- Product grid: 8-12 hardcoded product cards with placeholder images/data
- Each card: image placeholder (dark gray with icon), product name, price, category badge, "View Details" and "Add to Cart" buttons

**Product Detail (`src/app/products/[slug]/page.tsx`)** — PRD Section 5.3
- Image gallery placeholder (main image + thumbnails)
- Product name, price, description
- Quantity selector
- "Add to Cart" button (not functional yet)
- "Customize This" button for customizable items
- Related products section (3-4 cards)

**Services (`src/app/services/page.tsx`)** — PRD Section 5.4
- 7 service cards matching the PRD list
- Each: icon/image area, service name, description, "Est. turnaround: TBD" placeholder, "Request a Quote" button linking to /contact

**Community (`src/app/community/page.tsx`)** — PRD Section 5.5
- Sections: Customer Showcase, Recent Projects, Event Appearances, Featured Builds
- Masonry or grid gallery layout with placeholder project cards
- "Share Your Project" CTA button

**About (`src/app/about/page.tsx`)** — PRD Section 5.7
- Hero with full-width dark background
- Story sections with placeholder text about Retrofit Creations' origin, mission, values
- Emphasize: laser engraving, small-batch fabrication, automotive passion, community
- Workshop/equipment placeholder images

**Testimonials (`src/app/testimonials/page.tsx`)** — PRD Section 5.8
- Grid of testimonial cards (6-8 hardcoded)
- Each: quote text, star rating, customer name, photo placeholder (avatar circle), project type badge
- Filter by project type at top
- CTA at bottom: "Leave a Review" button

**Contact / Custom Quote (`src/app/contact/page.tsx`)** — PRD Section 5.9
- Full quote request form (all fields from PRD: name, email, phone, service type dropdown, quantity, budget range dropdown, deadline date picker, file upload area, description textarea, preferred contact method radio)
- Form validates on frontend only (no submission yet — that's Phase 2)
- Business info sidebar: San Diego CA, email placeholder, business hours, social links (TBD)

**Account Pages (UI shells only):**
- `src/app/account/login/page.tsx` — Login form (email, password, "Create Account" link, Google OAuth button placeholder)
- `src/app/account/signup/page.tsx` — Registration form (name, email, password, confirm password)
- `src/app/account/page.tsx` — Dashboard shell with sidebar nav (Profile, Orders, Quotes, Wishlist, Community) and placeholder content areas

### Part 5: Git + Deploy

1. **Initialize git:**
   ```
   git init
   git remote add origin https://github.com/vrostbyte/retrofit-creations.git
   ```

2. **Create initial commit:**
   ```
   git add .
   git commit -m "feat: Phase 1 complete — static frontend with all pages and components"
   ```

3. **Push to GitHub:**
   ```
   git branch -M main
   git push -u origin main
   ```

## Quality Checklist

Before you consider this task complete, verify:

- [ ] All pages render without errors at `localhost:3000`
- [ ] Navigation works between all pages
- [ ] Mobile responsive — test at 375px, 768px, and 1440px widths
- [ ] Dark theme is consistent — no white flashes, no mismatched backgrounds
- [ ] Brand colors are correct: `#000000`, `#FFFFFF`, `#0062FF`
- [ ] Oswald font on all headings, Inter on all body text
- [ ] Logo displays correctly in the header
- [ ] Footer has all four columns
- [ ] Contact form has all fields from PRD Section 5.9
- [ ] Products page has category filter, search bar, and sort
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] `.env.local` is in `.gitignore` and NOT committed
- [ ] Code has instructional comments explaining patterns for a beginner developer

## Important Reminders

- **I'm a beginner** — write clear, well-commented code. When you make an architectural choice, add a comment explaining WHY.
- **Always check the PRD** — if you're unsure about a page section, color, layout, or feature, the answer is in `RETROFIT_CREATIONS_PRD.md`.
- **Don't skip the mobile design** — Hailie's customers will be on phones at car shows. Mobile-first is critical.
- **Placeholder data should feel real** — use realistic product names like "Custom 3D Printed Dash Bracket — '69 Camaro", not "Product 1". Use realistic prices. Make it look like a real store even with fake data.
- **The aesthetic matters** — This should look like a premium brand, not a template. Use subtle glow effects on cards, smooth hover transitions, industrial visual motifs. Reference PRD Section 3 for the full design language.
- **Use Context7 for documentation** — When implementing Next.js App Router patterns, Tailwind config, React hooks, or any library usage, use Context7 to fetch current docs before writing code. This prevents using deprecated or outdated APIs.
