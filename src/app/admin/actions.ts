"use server";
// ============================================================
// Admin Server Actions
// All mutations for the admin panel — product CRUD, status
// updates, approvals. Each action verifies the user is admin
// before making any database changes.
// ============================================================
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Shared helper — throws if the current user isn't an admin
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/account/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");
  return supabase;
}

// ── Products ──────────────────────────────────────────────────

export async function createProductAction(data: {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  compare_at_price: number | null;
  category_id: string | null;
  is_customizable: boolean;
  is_active: boolean;
  is_featured: boolean;
  imageUrls: string[];
}) {
  const supabase = await requireAdmin();

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      name: data.name,
      slug: data.slug,
      description: data.description,
      short_description: data.short_description,
      price: data.price,
      compare_at_price: data.compare_at_price,
      category_id: data.category_id,
      is_customizable: data.is_customizable,
      is_active: data.is_active,
      is_featured: data.is_featured,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (data.imageUrls.length > 0) {
    await supabase.from("product_images").insert(
      data.imageUrls.map((url, i) => ({
        product_id: product.id,
        url,
        display_order: i,
        is_primary: i === 0,
      }))
    );
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProductAction(
  productId: string,
  data: {
    name: string;
    slug: string;
    description: string;
    short_description: string;
    price: number;
    compare_at_price: number | null;
    category_id: string | null;
    is_customizable: boolean;
    is_active: boolean;
    is_featured: boolean;
    imageUrls: string[];
  }
) {
  const supabase = await requireAdmin();

  const { error } = await supabase
    .from("products")
    .update({
      name: data.name,
      slug: data.slug,
      description: data.description,
      short_description: data.short_description,
      price: data.price,
      compare_at_price: data.compare_at_price,
      category_id: data.category_id,
      is_customizable: data.is_customizable,
      is_active: data.is_active,
      is_featured: data.is_featured,
    })
    .eq("id", productId);

  if (error) throw new Error(error.message);

  // Replace images: delete old, insert new
  await supabase.from("product_images").delete().eq("product_id", productId);
  if (data.imageUrls.length > 0) {
    await supabase.from("product_images").insert(
      data.imageUrls.map((url, i) => ({
        product_id: productId,
        url,
        display_order: i,
        is_primary: i === 0,
      }))
    );
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProductAction(productId: string) {
  const supabase = await requireAdmin();
  await supabase.from("products").delete().eq("id", productId);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function toggleProductActiveAction(productId: string, isActive: boolean) {
  const supabase = await requireAdmin();
  await supabase
    .from("products")
    .update({ is_active: isActive })
    .eq("id", productId);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function toggleProductFeaturedAction(productId: string, isFeatured: boolean) {
  const supabase = await requireAdmin();
  await supabase
    .from("products")
    .update({ is_featured: isFeatured })
    .eq("id", productId);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

// ── Quotes ────────────────────────────────────────────────────

export async function updateQuoteStatusAction(
  quoteId: string,
  status: string,
  adminNotes?: string,
  quotedPrice?: number | null,
  quotedTurnaround?: string
) {
  const supabase = await requireAdmin();
  await supabase
    .from("quotes")
    .update({
      status,
      admin_notes: adminNotes ?? undefined,
      quoted_price: quotedPrice ?? undefined,
      quoted_turnaround: quotedTurnaround ?? undefined,
    })
    .eq("id", quoteId);
  revalidatePath("/admin/quotes");
}

// ── Orders ────────────────────────────────────────────────────

export async function updateOrderStatusAction(
  orderId: string,
  status: string,
  trackingNumber?: string,
  trackingCarrier?: string
) {
  const supabase = await requireAdmin();
  await supabase
    .from("orders")
    .update({
      status,
      tracking_number: trackingNumber ?? undefined,
      tracking_carrier: trackingCarrier ?? undefined,
    })
    .eq("id", orderId);
  revalidatePath("/admin/orders");
}

// ── Testimonials ──────────────────────────────────────────────

export async function approveTestimonialAction(testimonialId: string) {
  const supabase = await requireAdmin();
  await supabase
    .from("testimonials")
    .update({ is_approved: true })
    .eq("id", testimonialId);
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
}

export async function rejectTestimonialAction(testimonialId: string) {
  const supabase = await requireAdmin();
  await supabase.from("testimonials").delete().eq("id", testimonialId);
  revalidatePath("/admin/testimonials");
}

export async function toggleTestimonialFeaturedAction(
  testimonialId: string,
  isFeatured: boolean
) {
  const supabase = await requireAdmin();
  await supabase
    .from("testimonials")
    .update({ is_featured: isFeatured })
    .eq("id", testimonialId);
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  revalidatePath("/");
}

// ── Community Posts ───────────────────────────────────────────

export async function approveCommunityPostAction(postId: string) {
  const supabase = await requireAdmin();
  await supabase
    .from("community_posts")
    .update({ is_approved: true })
    .eq("id", postId);
  revalidatePath("/admin/community");
  revalidatePath("/community");
}

export async function rejectCommunityPostAction(postId: string) {
  const supabase = await requireAdmin();
  await supabase.from("community_posts").delete().eq("id", postId);
  revalidatePath("/admin/community");
}

export async function toggleCommunityFeaturedAction(postId: string, isFeatured: boolean) {
  const supabase = await requireAdmin();
  await supabase
    .from("community_posts")
    .update({ is_featured: isFeatured })
    .eq("id", postId);
  revalidatePath("/admin/community");
  revalidatePath("/community");
}
