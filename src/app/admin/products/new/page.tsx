/*
  Admin New Product — form to create a product.
*/
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";

export default async function AdminNewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("product_categories")
    .select("*")
    .order("display_order");

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
          Add New Product
        </h1>
      </div>

      <ProductForm categories={categories ?? []} />
    </div>
  );
}
