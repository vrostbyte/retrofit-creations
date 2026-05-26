/*
  Products page — Phase 2A: data loaded from Supabase.
  Converted from client-side useState filtering to URL-param-based
  server-side filtering. ProductFilters handles the interactive UI.
  Light-body theme (PRD v1.2.0).
*/
import { Suspense } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import StarRating from "@/components/ui/StarRating";
import ProductFilters from "@/components/products/ProductFilters";
import AddToCartButton from "@/components/products/AddToCartButton";
import { createClient } from "@/lib/supabase/server";
import type { ProductWithDetails } from "@/types/database";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
  }>;
}

export const metadata = {
  title: "Products — Retrofit Creations",
  description: "Shop custom 3D printed parts, laser engraved items, Zyn tins, and more.",
};

async function fetchProducts(params: {
  category?: string;
  search?: string;
  sort?: string;
}) {
  const supabase = await createClient();

  // Build the query — select product + category name + images
  let query = supabase
    .from("products")
    .select("*, product_categories(*), product_images(*)")
    .eq("is_active", true);

  // Filter by category if one is selected
  if (params.category && params.category !== "all") {
    const { data: cat } = await supabase
      .from("product_categories")
      .select("id")
      .eq("slug", params.category)
      .single();
    if (cat) query = query.eq("category_id", cat.id);
  }

  // Full-text search across name and description
  if (params.search?.trim()) {
    query = query.or(
      `name.ilike.%${params.search}%,description.ilike.%${params.search}%`
    );
  }

  // Sort order
  switch (params.sort) {
    case "price-asc":
      query = query.order("price", { ascending: true });
      break;
    case "price-desc":
      query = query.order("price", { ascending: false });
      break;
    case "name-az":
      query = query.order("name", { ascending: true });
      break;
    default:
      // "newest" — most recently added first
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) {
    console.error("Products fetch error:", error.message);
    return [];
  }
  return (data ?? []) as ProductWithDetails[];
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Fetch categories and products in parallel
  const [categoriesResult, products] = await Promise.all([
    supabase.from("product_categories").select("*").order("display_order"),
    fetchProducts(params),
  ]);

  const categories = categoriesResult.data ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeading
        title="Our Products"
        subtitle="Precision crafted custom parts, engraved items, and personalized goods — all made to order."
        className="mb-10"
      />

      {/*
        ProductFilters uses useSearchParams() which needs a Suspense boundary.
        The fallback shows a skeleton while the client component hydrates.
      */}
      <Suspense fallback={<div className="h-28 animate-pulse bg-[#F8F8F8] rounded-lg mb-8" />}>
        <ProductFilters categories={categories} totalCount={products.length} />
      </Suspense>

      {/* Product grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 font-body text-lg mb-4">No products found.</p>
          <Button variant="secondary" href="/products">Clear filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const primaryImage =
              product.product_images?.find((img) => img.is_primary) ??
              product.product_images?.[0];

            return (
              <Card key={product.id} className="group flex flex-col">
                {/* Product image placeholder */}
                <div className="aspect-square bg-[#F8F8F8] rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-[#E8E8E8]">
                  {primaryImage ? (
                    <img
                      src={primaryImage.url}
                      alt={primaryImage.alt_text ?? product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <svg
                      className="w-16 h-16 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1">
                  {product.product_categories && (
                    <Badge variant="outline" className="self-start mb-2 text-xs">
                      {product.product_categories.name}
                    </Badge>
                  )}

                  <h3 className="font-heading font-semibold text-black text-sm leading-snug mb-1 line-clamp-2">
                    {product.name}
                  </h3>

                  {product.short_description && (
                    <p className="text-xs text-gray-500 font-body mb-3 line-clamp-2">
                      {product.short_description}
                    </p>
                  )}

                  <div className="flex items-center gap-1 mb-3">
                    <StarRating rating={5} size="sm" />
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#E8E8E8]">
                    <div>
                      <span className="font-heading font-bold text-black text-lg">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.compare_at_price && (
                        <span className="text-xs text-gray-400 line-through ml-2 font-body">
                          ${product.compare_at_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.is_customizable && (
                      <Badge variant="default" className="text-xs">Custom</Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 text-center py-2 px-3 border border-[#E8E8E8] rounded-md text-sm font-heading font-semibold uppercase tracking-wide text-gray-700 hover:border-brand-blue/40 hover:text-brand-blue transition-colors"
                  >
                    Details
                  </Link>
                  <AddToCartButton
                    productId={product.id}
                    productName={product.name}
                    productPrice={Number(product.price)}
                    slug={product.slug}
                    imageUrl={primaryImage?.url}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
