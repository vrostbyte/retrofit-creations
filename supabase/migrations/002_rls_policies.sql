-- ============================================================
-- MIGRATION 002: Row Level Security (RLS) Policies
-- Run this AFTER migration 001.
--
-- RLS means Supabase automatically enforces these rules on
-- every database query — customers can only see their own
-- data, and admins can see everything.
-- ============================================================

-- ── Admin helper function ───────────────────────────────────
-- This function checks if the currently logged-in user is an
-- admin by looking up their role in the profiles table.
-- SECURITY DEFINER means it runs with the privileges of the
-- function creator, bypassing RLS to read profiles safely.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ── Enable RLS on all tables ────────────────────────────────
-- By default, once RLS is enabled, ALL access is denied
-- unless a policy explicitly allows it.
ALTER TABLE profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products          ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images    ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders            ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items       ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes            ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials      ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items    ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PROFILES policies
-- Users can read and update their own profile only.
-- Admins can read all profiles.
-- ============================================================
CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id OR is_admin());

CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- PRODUCT CATEGORIES policies
-- Anyone (including visitors) can read categories.
-- Only admins can create, update, or delete categories.
-- ============================================================
CREATE POLICY "Anyone reads categories"
  ON product_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins manage categories"
  ON product_categories FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- PRODUCTS policies
-- Visitors and customers can read active products.
-- Admins can read all products (including inactive).
-- Only admins can create, update, or delete products.
-- ============================================================
CREATE POLICY "Anyone reads active products"
  ON products FOR SELECT
  USING (is_active = true OR is_admin());

CREATE POLICY "Admins manage products"
  ON products FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- PRODUCT IMAGES policies
-- Same as products: anyone reads, admins manage.
-- ============================================================
CREATE POLICY "Anyone reads product images"
  ON product_images FOR SELECT
  USING (true);

CREATE POLICY "Admins manage product images"
  ON product_images FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- ORDERS policies
-- Customers can read their own orders.
-- Admins can read and update all orders.
-- ============================================================
CREATE POLICY "Users read own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Admins manage orders"
  ON orders FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Orders are created by the server (API route / Server Action)
-- using the service role key, so no INSERT policy needed for users.

-- ============================================================
-- ORDER ITEMS policies
-- Customers can read their own order items (via order ownership).
-- ============================================================
CREATE POLICY "Users read own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR is_admin())
    )
  );

CREATE POLICY "Admins manage order items"
  ON order_items FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- QUOTES policies
-- Anyone (even visitors without an account) can submit a quote.
-- Users can read their own quotes.
-- Admins can read and update all quotes.
-- ============================================================
CREATE POLICY "Anyone submits quotes"
  ON quotes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users read own quotes"
  ON quotes FOR SELECT
  USING (
    (user_id IS NOT NULL AND auth.uid() = user_id) OR is_admin()
  );

CREATE POLICY "Admins manage quotes"
  ON quotes FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- TESTIMONIALS policies
-- Anyone reads approved testimonials.
-- Authenticated users can submit a testimonial.
-- Admins have full control (approve, feature, delete).
-- ============================================================
CREATE POLICY "Anyone reads approved testimonials"
  ON testimonials FOR SELECT
  USING (is_approved = true OR is_admin());

CREATE POLICY "Authenticated users submit testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins manage testimonials"
  ON testimonials FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- COMMUNITY POSTS policies
-- Anyone reads approved posts.
-- Authenticated users can submit posts.
-- Admins have full control (approve, feature, delete).
-- ============================================================
CREATE POLICY "Anyone reads approved community posts"
  ON community_posts FOR SELECT
  USING (is_approved = true OR is_admin());

CREATE POLICY "Authenticated users submit community posts"
  ON community_posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins manage community posts"
  ON community_posts FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- WISHLIST ITEMS policies
-- Users can only manage their own wishlist.
-- ============================================================
CREATE POLICY "Users manage own wishlist"
  ON wishlist_items FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- PROFILES: auto-create profile on signup
-- When a new user registers via Supabase Auth, this trigger
-- automatically creates a matching row in the profiles table.
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
