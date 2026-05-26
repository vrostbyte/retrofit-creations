-- ============================================================
-- SEED DATA — Retrofit Creations
-- Run this AFTER both migrations are applied.
-- This populates the database with realistic starter content.
-- ============================================================

-- ── Product Categories ──────────────────────────────────────
INSERT INTO product_categories (name, slug, description, display_order) VALUES
  ('Custom Automotive Parts',  'automotive-parts',  'Brackets, trim, knobs, and bespoke components for any vehicle build', 1),
  ('3D Printed Parts',         '3d-printed-parts',  'Functional prototypes and custom parts engineered for fit, function, and form', 2),
  ('Laser Engraved Items',     'laser-engraved',    'Precision engraving on wood, metal, leather, acrylic, and more', 3),
  ('Personalized Gifts',       'personalized-gifts','One-of-a-kind gifts for enthusiasts, collectors, and creators', 4),
  ('Event / Vendor Items',     'event-vendor',      'Custom pieces for car shows, markets, and special events', 5),
  ('Custom Zyn Tins',          'zyn-tins',          'Personalized and custom-designed Zyn tins', 6)
ON CONFLICT (slug) DO NOTHING;

-- ── Products ────────────────────────────────────────────────
INSERT INTO products (name, slug, short_description, description, price, category_id, is_customizable, is_active, is_featured)
VALUES
  (
    'Custom 3D Printed Dash Bracket — ''69 Camaro',
    'custom-dash-bracket-69-camaro',
    'Precision engineered bracket for the 1969 Camaro dash — perfect fitment guaranteed.',
    'Precision engineered dash bracket designed specifically for the 1969 Camaro. Printed in matte black PETG for durability and heat resistance. Perfect fitment guaranteed — or we reprint it. Ideal for upgrading your classic dash without cutting metal.',
    48.00,
    (SELECT id FROM product_categories WHERE slug = 'automotive-parts'),
    false, true, true
  ),
  (
    'Laser Engraved Keychain — V8 Engine Block',
    'laser-engraved-keychain-v8',
    'Solid aluminum keychain with a detailed V8 engine block design. Personalizable.',
    'Laser engraved keychain featuring a detailed V8 engine block design. Made from solid aluminum with a durable anodized finish. Can be personalized with custom text on the back — perfect for car enthusiasts and gearheads.',
    18.00,
    (SELECT id FROM product_categories WHERE slug = 'laser-engraved'),
    true, true, true
  ),
  (
    'Custom Zyn Tin — Car Club Logo',
    'custom-zyn-tin-car-club',
    'Fully custom Zyn tin with your car club logo. Minimum order 1.',
    'Stand out at every meet with a custom Zyn tin featuring your car club''s logo or any design you choose. Laser engraved for a permanent, premium finish. Minimum order of 1 — bulk pricing available for clubs.',
    24.00,
    (SELECT id FROM product_categories WHERE slug = 'zyn-tins'),
    true, true, true
  ),
  (
    '3D Printed Cup Holder Insert — Ford Bronco',
    '3d-printed-cup-holder-insert-bronco',
    'Drop-in cup holder insert for the Ford Bronco center console. Perfect factory fit.',
    'Custom designed to drop perfectly into the Ford Bronco center console cup holder area. Adds organization and a custom touch. Printed in durable ABS. Available in multiple colors — specify at checkout.',
    35.00,
    (SELECT id FROM product_categories WHERE slug = '3d-printed-parts'),
    false, true, false
  ),
  (
    'Laser Engraved Wallet Card — Custom Text',
    'laser-engraved-wallet-card',
    'Slim stainless steel wallet card with any custom text or design.',
    'Slim stainless steel wallet card engraved with any text, logo, or design you choose. Great for business cards, membership cards, or personalized gifts. Measures standard wallet size (85mm x 54mm). Specify your text at checkout.',
    15.00,
    (SELECT id FROM product_categories WHERE slug = 'personalized-gifts'),
    true, true, false
  ),
  (
    '3D Printed Car Show Display Stand',
    'car-show-vendor-display-stand',
    'Professional display stand for car show vendors. Holds business cards and small products.',
    'A clean, professional display stand designed for car show vendors and craft market sellers. Features a tiered design with slots for business cards and space to display small engraved items. Printed in matte black PLA. Great for any booth setup.',
    65.00,
    (SELECT id FROM product_categories WHERE slug = 'event-vendor'),
    false, true, false
  ),
  (
    'Custom 3D Printed Emblem — Muscle Car Style',
    'custom-emblem-muscle-car',
    'Bespoke 3D printed emblem for classic muscle cars. Your design, your vehicle.',
    'Custom designed emblems for classic and modern muscle cars. You provide the design concept — we engineer it for perfect panel fitment and print it in your choice of finish. Available in chrome-look, matte black, body color, and more.',
    42.00,
    (SELECT id FROM product_categories WHERE slug = 'automotive-parts'),
    true, true, true
  ),
  (
    'Laser Engraved Wood Keychain — Custom Name',
    'laser-engraved-wood-keychain',
    'Hand-finished wood keychain with any custom name or short text.',
    'Beautiful laser engraved wood keychain made from premium maple. Enter any name, word, or short phrase at checkout. Each keychain is hand-finished and sealed for durability. A perfect personalized gift for any occasion.',
    14.00,
    (SELECT id FROM product_categories WHERE slug = 'laser-engraved'),
    true, true, false
  ),
  (
    'Custom Zyn Tin — Personalized Design',
    'zyn-tin-custom-design',
    'Send us your design or describe it — we engrave it on a fresh Zyn tin.',
    'The most personalized Zyn tin you can get. Submit any design, logo, text, or artwork and we''ll engrave it precisely on a fresh tin. Great for gifts, personal use, or branding at events. Specify your design in the order notes.',
    22.00,
    (SELECT id FROM product_categories WHERE slug = 'zyn-tins'),
    true, true, false
  ),
  (
    '3D Printed Dash Phone Mount — Universal Fit',
    '3d-printed-phone-mount-dash',
    'Slim, non-damaging phone mount designed to blend with factory dash panels.',
    'A sleek, low-profile phone mount that attaches without drilling or damaging your dash. Designed to blend with factory interior aesthetics. Fits most smartphone sizes. Specify your vehicle make/model at checkout for an optimized fit.',
    28.00,
    (SELECT id FROM product_categories WHERE slug = '3d-printed-parts'),
    false, true, false
  ),
  (
    'Laser Engraved Acrylic Sign — Custom Text',
    'acrylic-laser-engraved-sign',
    'Crisp, professional acrylic sign with any custom text or logo. Great for garages.',
    'High-quality laser engraved acrylic sign perfect for garages, shops, or gifts. Available in multiple sizes and acrylic colors. Specify your text, logo, and preferred size at checkout. Includes mounting hardware.',
    38.00,
    (SELECT id FROM product_categories WHERE slug = 'personalized-gifts'),
    true, true, false
  ),
  (
    '3D Printed Vendor Badge Holder — Event Ready',
    'vendor-badge-holder-event',
    'Professional lanyard badge holder, 3D printed with your brand or event name.',
    'Custom 3D printed badge holders for events, car shows, and vendor booths. Includes a lanyard slot and window for insert cards. Can be printed with your brand name or event logo directly on the holder. Bulk pricing available.',
    18.00,
    (SELECT id FROM product_categories WHERE slug = 'event-vendor'),
    false, true, false
  )
ON CONFLICT (slug) DO NOTHING;

-- ── Testimonials ────────────────────────────────────────────
-- All pre-approved so they appear immediately on the site.
INSERT INTO testimonials (customer_name, customer_email, rating, review_text, project_type, is_approved, is_featured)
VALUES
  (
    'Mike T.', 'mike.t@example.com', 5,
    'Hailie built a custom dash bracket for my ''69 Camaro that fit perfectly on the first print. Insane quality for the price. Will never go anywhere else.',
    'Automotive Part', true, true
  ),
  (
    'Jessica M.', 'jessica.m@example.com', 5,
    'Ordered a laser engraved keychain as a gift and it blew everyone away. The detail was unreal. Fast turnaround too — had it in 4 days.',
    'Laser Engraving', true, true
  ),
  (
    'Carlos D.', 'carlos.d@example.com', 5,
    'Got a custom Zyn tin made with my car club logo. It was the hit of the meetup. Already ordered 20 more for the whole crew.',
    'Custom Zyn Tin', true, true
  ),
  (
    'Tony R.', 'tony.r@example.com', 5,
    'The CNC carved wood sign for my garage turned out incredible. It''s the first thing everyone notices when they walk in.',
    'Personalized Gift', true, false
  ),
  (
    'James R.', 'james.r@example.com', 5,
    'Custom Porsche keychains for our PCA chapter event — 40 pieces, every single one perfect. Hailie communicates great and delivers on time.',
    'Event Order', true, false
  ),
  (
    'Diego V.', 'diego.v@example.com', 5,
    '3D printed turbo bracket for my K-swap. Tight clearances, perfect fitment. I gave her my measurements and she nailed it.',
    'Automotive Part', true, false
  ),
  (
    'Rick M.', 'rick.m@example.com', 5,
    'The laser engraved leather shift boot she made for my ''72 Nova is a work of art. The detail in the SS logo is unbelievable.',
    'Laser Engraving', true, false
  ),
  (
    'Sarah K.', 'sarah.k@example.com', 5,
    'Ordered personalized Christmas gifts for my whole family — engraved cutting boards. Everyone was shocked at how good they looked.',
    'Personalized Gift', true, false
  )
ON CONFLICT DO NOTHING;

-- ── Community Posts ─────────────────────────────────────────
-- All pre-approved so they appear immediately.
INSERT INTO community_posts (title, description, photos, post_type, is_approved, is_featured, submitted_by_name, submitted_by_email)
VALUES
  (
    'Custom 3D Printed Dash — ''69 Camaro',
    'Full custom dash bracket set, printed in matte black PETG to match the interior. Measured from OEM templates, perfect fitment first try. Hailie knocked it out of the park.',
    ARRAY['https://placehold.co/800x600/1a1a1a/0062FF?text=Build+Photo'],
    'showcase', true, true, 'Mike T.', 'mike.t@example.com'
  ),
  (
    'Laser Engraved Center Console — Ford Bronco',
    'Intricate geometric pattern engraved on the factory console lid. The depth and detail are incredible. It looks like it came from the factory.',
    ARRAY['https://placehold.co/800x600/1a1a1a/0062FF?text=Build+Photo'],
    'showcase', true, false, 'Sarah K.', 'sarah.k@example.com'
  ),
  (
    '2025 San Diego Auto Show',
    'Huge turnout at our booth! Met so many amazing builders and enthusiasts from across SoCal. See you at the next one.',
    ARRAY['https://placehold.co/800x600/1a1a1a/0062FF?text=Event+Photo'],
    'event', true, false, 'Retrofit Creations', 'hello@retrofitcreations.com'
  ),
  (
    'Custom Keychain Set — Porsche Club of America',
    'Matching set of 40 laser engraved keychains for our PCA chapter. Every single one came out perfectly. The club was blown away.',
    ARRAY['https://placehold.co/800x600/1a1a1a/0062FF?text=Build+Photo'],
    'featured', true, true, 'James R.', 'james.r@example.com'
  ),
  (
    'Turbo K-Swap Build Brackets — ''88 CRX',
    'Custom fabricated turbo bracket and intercooler mount for a K-swap CRX build. Tight quarters, perfect fitment. This is why you go custom.',
    ARRAY['https://placehold.co/800x600/1a1a1a/0062FF?text=Build+Photo'],
    'build', true, false, 'Diego V.', 'diego.v@example.com'
  ),
  (
    'Engraved Leather Shift Boot — ''72 Nova',
    'Hand-engraved leather shift boot with the Super Sport logo. It''s the kind of detail that makes a restoration complete.',
    ARRAY['https://placehold.co/800x600/1a1a1a/0062FF?text=Build+Photo'],
    'showcase', true, false, 'Rick M.', 'rick.m@example.com'
  )
ON CONFLICT DO NOTHING;
