// ============================================================
// TypeScript types for the Retrofit Creations database schema.
// These match the tables created in supabase/migrations/001_initial_schema.sql
// ============================================================

export type UserRole = 'customer' | 'admin'

export type OrderStatus =
  | 'received'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type QuoteStatus =
  | 'pending'
  | 'in_review'
  | 'quoted'
  | 'accepted'
  | 'in_production'
  | 'completed'
  | 'declined'
  | 'cancelled'

export type PostType = 'showcase' | 'event' | 'build' | 'featured'

export type ContactPreference = 'email' | 'phone' | 'text'

// Stored as JSONB in the database
export interface ShippingAddress {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface CustomizationField {
  name: string
  type: 'text' | 'select' | 'number' | 'color'
  options?: string[]
  required: boolean
}

export interface CustomizationOptions {
  fields: CustomizationField[]
}

// ── Profiles ─────────────────────────────────────────────────
export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  shipping_address: ShippingAddress | null
  role: UserRole
  created_at: string
  updated_at: string
}

// ── Product Categories ────────────────────────────────────────
export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  display_order: number
  created_at: string
}

// ── Products ──────────────────────────────────────────────────
export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  compare_at_price: number | null
  category_id: string | null
  is_customizable: boolean
  customization_options: CustomizationOptions | null
  is_active: boolean
  is_featured: boolean
  inventory_note: string | null
  metadata: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

// ── Product Images ─────────────────────────────────────────────
export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt_text: string | null
  display_order: number
  is_primary: boolean
  created_at: string
}

// ── Orders ────────────────────────────────────────────────────
export interface Order {
  id: string
  user_id: string | null
  order_number: string
  status: OrderStatus
  subtotal: number
  shipping_cost: number
  tax: number
  total: number
  shipping_address: ShippingAddress
  square_payment_id: string | null
  square_order_id: string | null
  tracking_number: string | null
  tracking_carrier: string | null
  notes: string | null
  customer_email: string
  customer_name: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  product_price: number
  quantity: number
  customization_data: Record<string, unknown> | null
  line_total: number
  created_at: string
}

// ── Quotes ────────────────────────────────────────────────────
export interface Quote {
  id: string
  user_id: string | null
  quote_number: string
  status: QuoteStatus
  customer_name: string
  customer_email: string
  customer_phone: string | null
  service_type: string
  quantity: number | null
  budget_range: string | null
  deadline: string | null
  description: string
  preferred_contact: ContactPreference
  reference_images: string[] | null
  admin_notes: string | null
  quoted_price: number | null
  quoted_turnaround: string | null
  created_at: string
  updated_at: string
}

// ── Testimonials ──────────────────────────────────────────────
export interface Testimonial {
  id: string
  user_id: string | null
  customer_name: string
  customer_email: string
  customer_photo_url: string | null
  rating: number
  review_text: string
  project_type: string | null
  is_approved: boolean
  is_featured: boolean
  created_at: string
}

// ── Community Posts ───────────────────────────────────────────
export interface CommunityPost {
  id: string
  user_id: string | null
  title: string
  description: string | null
  photos: string[]
  post_type: PostType
  is_approved: boolean
  is_featured: boolean
  submitted_by_name: string
  submitted_by_email: string
  created_at: string
}

// ── Wishlist Items ─────────────────────────────────────────────
export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
}

// ── Joined types used in the UI ───────────────────────────────
// These combine multiple tables into a single object for convenience.

export interface ProductWithDetails extends Product {
  product_categories: ProductCategory | null
  product_images: ProductImage[]
}

export interface OrderWithItems extends Order {
  order_items: OrderItem[]
}
