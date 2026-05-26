/*
  Admin Edit Product — pre-filled form to update an existing product.
*/
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import type { ProductWithDetails } from "@/types/database";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProductPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const [productResult, categoriesResult] = await Promise.all([
    supabase
      .from("products")
      .select("*, product_images(*)")
      .eq("id", id)
      .single(),
    supabase.from("product_categories").select("*").order("display_order"),
  ]);

  if (!productResult.data) notFound();

  const product = productResult.data as ProductWithDetails;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/products"
          className="text-gray-400 hover:text-brand-blue transition-colors"
          aria-label="Back to products"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-black">
          Edit Product
        </h1>
      </div>

      <ProductForm
        categories={categoriesResult.data ?? []}
        product={product}
        existingImages={product.product_images ?? []}
      />
    </div>
  );
}
