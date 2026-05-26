-- ============================================================
-- MIGRATION 001: Initial Schema
-- Retrofit Creations — Supabase / PostgreSQL
-- Run this first to create all application tables.
-- ============================================================

-- ── Utility: auto-update updated_at on any row change ──────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── Sequences for human-readable order/quote numbers ───────
-- These give us IDs like RC-2026-0001 and RCQ-2026-0001
CREATE SEQUENCE IF NOT EXISTS order_number_seq START WITH 1;
CREATE SEQUENCE IF NOT EXISTS quote_number_seq START WITH 1;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'RC-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' ||
         LPAD(nextval('order_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'RCQ-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' ||
         LPAD(nextval('quote_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TABLE: profiles
-- Extends Supabase's built-in auth.users table.
-- When someone signs up, a row is created here with their info.
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       TEXT,
  phone           TEXT,
  avatar_url      TEXT,
  -- JSON blob: { street, city, state, zip, country }
  shipping_address JSONB,
  -- 'customer' is the default; only Hailie has 'admin'
  role            TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: product_categories
-- The 6 product categories (Zyn Tins, Keychains, etc.)
-- display_order controls the order they appear in the UI.
-- ============================================================
CREATE TABLE IF NOT EXISTS product_categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,    -- URL-safe identifier (e.g. "zyn-tins")
  description   TEXT,
  image_url     TEXT,
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: products
-- The main product catalog.
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT NOT NULL,
  slug                  TEXT UNIQUE NOT NULL,     -- Used in the URL: /products/[slug]
  description           TEXT,                     -- Full description on detail page
  short_description     TEXT,                     -- Short blurb on product cards
  price                 DECIMAL(10,2) NOT NULL,
  compare_at_price      DECIMAL(10,2),            -- "Was $XX" strike-through price
  category_id           UUID REFERENCES product_categories(id),
  is_customizable       BOOLEAN DEFAULT FALSE,    -- Can customers request customization?
  -- JSON structure: { fields: [{ name, type, options, required }] }
  customization_options JSONB,
  is_active             BOOLEAN DEFAULT TRUE,     -- FALSE = hidden from store
  is_featured           BOOLEAN DEFAULT FALSE,    -- TRUE = shown on homepage
  inventory_note        TEXT,                     -- Hailie's internal stock notes
  metadata              JSONB,                    -- Flexible extra data if needed
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Index for fast slug lookups (used on every product detail page load)
CREATE INDEX IF NOT EXISTS products_slug_idx ON products(slug);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_active_idx ON products(is_active);
CREATE INDEX IF NOT EXISTS products_featured_idx ON products(is_featured);

-- ============================================================
-- TABLE: product_images
-- Each product can have multiple photos.
-- display_order = 0 is the main/primary image.
-- ============================================================
CREATE TABLE IF NOT EXISTS product_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID REFERENCES products(id) ON DELETE CASCADE,
  url           TEXT NOT NULL,          -- Supabase Storage public URL
  alt_text      TEXT,                   -- Accessibility description
  display_order INTEGER DEFAULT 0,      -- Lower = shown first
  is_primary    BOOLEAN DEFAULT FALSE,  -- TRUE = the main product image
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS product_images_product_idx ON product_images(product_id);

-- ============================================================
-- TABLE: orders
-- Created when a customer completes Square checkout.
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            UUID REFERENCES profiles(id),  -- NULL if guest checkout
  order_number       TEXT UNIQUE NOT NULL,           -- e.g. "RC-2026-0001"
  status             TEXT DEFAULT 'received'
                     CHECK (status IN ('received','processing','shipped','delivered','cancelled','refunded')),
  subtotal           DECIMAL(10,2) NOT NULL,
  shipping_cost      DECIMAL(10,2) DEFAULT 0,
  tax                DECIMAL(10,2) DEFAULT 0,
  total              DECIMAL(10,2) NOT NULL,
  shipping_address   JSONB NOT NULL,
  square_payment_id  TEXT,   -- Square's payment reference ID
  square_order_id    TEXT,   -- Square's order reference ID
  tracking_number    TEXT,
  tracking_carrier   TEXT,
  notes              TEXT,   -- Hailie's internal notes
  customer_email     TEXT NOT NULL,
  customer_name      TEXT NOT NULL,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS orders_user_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_created_idx ON orders(created_at DESC);

-- ============================================================
-- TABLE: order_items
-- Each line item in an order (one row per product per order).
-- We snapshot the name/price at order time so history is accurate
-- even if the product is later edited.
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id            UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id          UUID REFERENCES products(id), -- NULL if product was deleted
  product_name        TEXT NOT NULL,                -- Snapshot at time of order
  product_price       DECIMAL(10,2) NOT NULL,       -- Snapshot at time of order
  quantity            INTEGER NOT NULL DEFAULT 1,
  customization_data  JSONB,                        -- Customer's custom choices
  line_total          DECIMAL(10,2) NOT NULL,       -- product_price * quantity
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS order_items_order_idx ON order_items(order_id);

-- ============================================================
-- TABLE: quotes
-- Custom work requests submitted via the /contact form.
-- Visitors don't need an account to submit a quote.
-- ============================================================
CREATE TABLE IF NOT EXISTS quotes (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES profiles(id),  -- NULL if submitted by a visitor
  quote_number      TEXT UNIQUE NOT NULL,           -- e.g. "RCQ-2026-0001"
  status            TEXT DEFAULT 'pending'
                    CHECK (status IN ('pending','in_review','quoted','accepted','in_production','completed','declined','cancelled')),
  customer_name     TEXT NOT NULL,
  customer_email    TEXT NOT NULL,
  customer_phone    TEXT,
  service_type      TEXT NOT NULL,
  quantity          INTEGER,
  budget_range      TEXT,
  deadline          DATE,
  description       TEXT NOT NULL,
  preferred_contact TEXT DEFAULT 'email'
                    CHECK (preferred_contact IN ('email','phone','text')),
  reference_images  TEXT[],          -- Array of Supabase Storage URLs
  admin_notes       TEXT,            -- Hailie's internal notes
  quoted_price      DECIMAL(10,2),  -- Price Hailie quotes back
  quoted_turnaround TEXT,           -- Estimated turnaround time
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS quotes_status_idx ON quotes(status);
CREATE INDEX IF NOT EXISTS quotes_created_idx ON quotes(created_at DESC);

-- ============================================================
-- TABLE: testimonials
-- Customer reviews. Must be approved by Hailie before they
-- appear on the site.
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES profiles(id),
  customer_name       TEXT NOT NULL,
  customer_email      TEXT NOT NULL,
  customer_photo_url  TEXT,
  rating              INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text         TEXT NOT NULL,
  project_type        TEXT,         -- Tag shown on the testimonial card
  is_approved         BOOLEAN DEFAULT FALSE,  -- Hailie must approve before showing
  is_featured         BOOLEAN DEFAULT FALSE,  -- Featured ones shown on homepage
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS testimonials_approved_idx ON testimonials(is_approved);

-- ============================================================
-- TABLE: community_posts
-- Customer builds and project showcases. Must be approved
-- by Hailie before they appear on the community page.
-- ============================================================
CREATE TABLE IF NOT EXISTS community_posts (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID REFERENCES profiles(id),
  title                TEXT NOT NULL,
  description          TEXT,
  photos               TEXT[] NOT NULL,   -- Array of Supabase Storage URLs
  post_type            TEXT DEFAULT 'showcase'
                       CHECK (post_type IN ('showcase','event','build','featured')),
  is_approved          BOOLEAN DEFAULT FALSE,
  is_featured          BOOLEAN DEFAULT FALSE,
  submitted_by_name    TEXT NOT NULL,
  submitted_by_email   TEXT NOT NULL,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS community_posts_approved_idx ON community_posts(is_approved);

-- ============================================================
-- TABLE: wishlist_items
-- Saved/favorited products per user.
-- The UNIQUE constraint prevents duplicate saves.
-- ============================================================
CREATE TABLE IF NOT EXISTS wishlist_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE INDEX IF NOT EXISTS wishlist_user_idx ON wishlist_items(user_id);
