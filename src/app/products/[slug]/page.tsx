/*
  Product Detail page — Phase 2A: data loaded from Supabase.
  Light-body theme (PRD v1.2.0).
*/
import { notFound } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import SectionHeading from "@/components/ui/SectionHeading";
import AddToCartSection from "@/components/products/AddToCartSection";
import { createClient } from "@/lib/supabase/server";
import type { ProductWithDetails } from "@/types/database";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pre-generate pages for all active products at build time.
// Uses the plain Supabase client (no cookies) since generateStaticParams
// runs at build time without an HTTP request context.
export async function generateStaticParams() {
  const { createClient: createBuildTimeClient } = await import("@supabase/supabase-js");
  const supabase = createBuildTimeClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("products")
    .select("slug")
    .eq("is_active", true);
  return (data ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("name, short_description")
    .eq("slug", slug)
    .single();

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — Retrofit Creations`,
    description: product.short_description ?? undefined,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch the product with its category and images
  const { data: product } = await supabase
    .from("products")
    .select("*, product_categories(*), product_images(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!product) notFound();

  const p = product as ProductWithDetails;

  // Sort images: primary first
  const sortedImages = [...(p.product_images ?? [])].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return a.display_order - b.display_order;
  });

  // Fetch related products (same category, exclude this product)
  const { data: related } = p.category_id
    ? await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("category_id", p.category_id)
        .eq("is_active", true)
        .neq("id", p.id)
        .limit(4)
    : { data: [] };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500 font-body">
          <li><Link href="/" className="hover:text-brand-blue">Home</Link></li>
          <li className="text-gray-300">/</li>
          <li><Link href="/products" className="hover:text-brand-blue">Products</Link></li>
          {p.product_categories && (
            <>
              <li className="text-gray-300">/</li>
              <li>
                <Link
                  href={`/products?category=${p.product_categories.slug}`}
                  className="hover:text-brand-blue"
                >
                  {p.product_categories.name}
                </Link>
              </li>
            </>
          )}
          <li className="text-gray-300">/</li>
          <li className="text-black font-medium">{p.name}</li>
        </ol>
      </nav>

      {/* Main product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        {/* Image gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square bg-[#F8F8F8] rounded-xl border border-[#E8E8E8] overflow-hidden flex items-center justify-center">
            {sortedImages[0] ? (
              <img
                src={sortedImages[0].url}
                alt={sortedImages[0].alt_text ?? p.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-24 h-24 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={0.75}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            )}
          </div>

          {/* Thumbnail strip */}
          {sortedImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {sortedImages.map((img, i) => (
                <div
                  key={img.id}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    i === 0 ? "border-brand-blue" : "border-[#E8E8E8]"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt_text ?? `${p.name} photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          {p.product_categories && (
            <Badge variant="outline" className="self-start mb-3">
              {p.product_categories.name}
            </Badge>
          )}

          <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-black mb-3 leading-tight">
            {p.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={5} />
            <span className="text-sm text-gray-500 font-body">Premium quality, made to order</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-heading text-4xl font-bold text-black">
              ${p.price.toFixed(2)}
            </span>
            {p.compare_at_price && (
              <span className="text-xl text-gray-400 line-through font-body">
                ${p.compare_at_price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          {p.description && (
            <p className="text-gray-600 font-body leading-relaxed mb-6">
              {p.description}
            </p>
          )}

          {/* Add to cart / customization section */}
          <AddToCartSection
            productId={p.id}
            productName={p.name}
            productPrice={p.price}
            isCustomizable={p.is_customizable}
          />

          {/* Custom work CTA */}
          {p.is_customizable && (
            <div className="mt-4 p-4 bg-[#F8F8F8] border border-[#E8E8E8] rounded-lg">
              <p className="text-sm text-gray-600 font-body">
                <span className="font-semibold text-black">Need something unique?</span>{" "}
                This product can be fully customized. Reach out and we'll make exactly what you need.
              </p>
              <Link
                href="/contact"
                className="inline-block mt-2 text-sm font-heading font-semibold text-brand-blue hover:underline uppercase tracking-wide"
              >
                Request Custom Work →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related && related.length > 0 && (
        <section aria-label="Related products">
          <SectionHeading
            title="You Might Also Like"
            className="mb-8"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((rel) => {
              const relWithDetails = rel as ProductWithDetails;
              const relImage = relWithDetails.product_images?.find(img => img.is_primary) ?? relWithDetails.product_images?.[0];
              return (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group"
                >
                  <div className="aspect-square bg-[#F8F8F8] rounded-lg border border-[#E8E8E8] overflow-hidden mb-2 flex items-center justify-center group-hover:border-brand-blue/30 transition-colors">
                    {relImage ? (
                      <img
                        src={relImage.url}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                    )}
                  </div>
                  <p className="font-heading font-semibold text-black text-sm line-clamp-2 group-hover:text-brand-blue transition-colors">
                    {rel.name}
                  </p>
                  <p className="font-heading text-brand-blue font-bold text-sm mt-0.5">
                    ${rel.price.toFixed(2)}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
