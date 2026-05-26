/*
  Admin Products — list all products with management actions.
*/
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  toggleProductActiveAction,
  toggleProductFeaturedAction,
  deleteProductAction,
} from "@/app/admin/actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import type { ProductWithDetails } from "@/types/database";

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*, product_categories(*), product_images(*)")
    .order("created_at", { ascending: false });

  const allProducts = (products ?? []) as ProductWithDetails[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-black">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-sm font-heading font-semibold uppercase tracking-wide rounded-lg hover:opacity-90 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </Link>
      </div>

      {allProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#F8F8F8] rounded-xl border border-[#E8E8E8]">
          <p className="text-gray-500 font-body mb-4">No products yet.</p>
          <Link href="/admin/products/new" className="text-brand-blue hover:underline font-body">
            Add your first product →
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8E8E8] bg-[#F8F8F8]">
                <th className="text-left px-4 py-3 font-heading font-semibold text-gray-600 uppercase tracking-wide text-xs">
                  Product
                </th>
                <th className="text-left px-4 py-3 font-heading font-semibold text-gray-600 uppercase tracking-wide text-xs hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 font-heading font-semibold text-gray-600 uppercase tracking-wide text-xs">
                  Price
                </th>
                <th className="text-center px-4 py-3 font-heading font-semibold text-gray-600 uppercase tracking-wide text-xs">
                  Active
                </th>
                <th className="text-center px-4 py-3 font-heading font-semibold text-gray-600 uppercase tracking-wide text-xs hidden lg:table-cell">
                  Featured
                </th>
                <th className="text-right px-4 py-3 font-heading font-semibold text-gray-600 uppercase tracking-wide text-xs">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E8]">
              {allProducts.map((product) => {
                const primaryImage =
                  product.product_images?.find((img) => img.is_primary) ??
                  product.product_images?.[0];

                return (
                  <tr key={product.id} className="hover:bg-[#F8F8F8]/50 transition-colors">
                    {/* Product name + thumbnail */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F8F8F8] border border-[#E8E8E8] flex-shrink-0 overflow-hidden">
                          {primaryImage ? (
                            <img
                              src={primaryImage.url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-heading font-semibold text-black text-sm line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400 font-body">{product.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3 text-gray-600 font-body hidden md:table-cell">
                      {product.product_categories?.name ?? "—"}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 font-heading font-semibold text-black">
                      ${Number(product.price).toFixed(2)}
                    </td>

                    {/* Active toggle */}
                    <td className="px-4 py-3 text-center">
                      <form
                        action={async () => {
                          "use server";
                          await toggleProductActiveAction(product.id, !product.is_active);
                        }}
                      >
                        <button
                          type="submit"
                          title={product.is_active ? "Click to deactivate" : "Click to activate"}
                          className={`inline-flex items-center justify-center w-8 h-5 rounded-full transition-colors ${
                            product.is_active ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`w-3 h-3 bg-white rounded-full shadow transition-transform ${
                              product.is_active ? "translate-x-1.5" : "-translate-x-1.5"
                            }`}
                          />
                        </button>
                      </form>
                    </td>

                    {/* Featured toggle */}
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <form
                        action={async () => {
                          "use server";
                          await toggleProductFeaturedAction(product.id, !product.is_featured);
                        }}
                      >
                        <button
                          type="submit"
                          title={product.is_featured ? "Remove from featured" : "Add to featured"}
                          className={`text-lg leading-none ${
                            product.is_featured ? "text-amber-400" : "text-gray-300 hover:text-amber-300"
                          } transition-colors`}
                        >
                          ★
                        </button>
                      </form>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="px-3 py-1 text-xs font-heading font-semibold uppercase tracking-wide border border-[#E8E8E8] rounded text-gray-600 hover:border-brand-blue/40 hover:text-brand-blue transition-colors"
                        >
                          Edit
                        </Link>
                        <ConfirmDeleteButton
                          action={async () => {
                            "use server";
                            await deleteProductAction(product.id);
                          }}
                          confirmMessage={`Delete "${product.name}"? This cannot be undone.`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
