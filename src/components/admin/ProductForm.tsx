/*
  ProductForm — client component for creating or editing products.
  Used by both /admin/products/new and /admin/products/[id]/edit.
  Calls server actions to persist changes.
*/
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/admin/ImageUpload";
import { createProductAction, updateProductAction } from "@/app/admin/actions";
import type { Product, ProductCategory, ProductImage } from "@/types/database";

interface ProductFormProps {
  categories: ProductCategory[];
  // When editing an existing product, these are pre-filled
  product?: Product;
  existingImages?: ProductImage[];
}

export default function ProductForm({
  categories,
  product,
  existingImages = [],
}: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const isEdit = !!product;

  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    short_description: product?.short_description ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    compare_at_price: product?.compare_at_price?.toString() ?? "",
    category_id: product?.category_id ?? "",
    is_customizable: product?.is_customizable ?? false,
    is_active: product?.is_active ?? true,
    is_featured: product?.is_featured ?? false,
  });

  const [imageUrls, setImageUrls] = useState<string[]>(
    existingImages
      .sort((a, b) => a.display_order - b.display_order)
      .map((img) => img.url)
  );

  const setField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    setField("name", name);
    if (!isEdit || form.slug === "") {
      setField(
        "slug",
        name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .slice(0, 80)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) { setError("Product name is required"); return; }
    if (!form.slug.trim()) { setError("Slug is required"); return; }
    if (!form.price || isNaN(parseFloat(form.price))) { setError("Valid price is required"); return; }

    const data = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      short_description: form.short_description.trim(),
      price: parseFloat(form.price),
      compare_at_price: form.compare_at_price ? parseFloat(form.compare_at_price) : null,
      category_id: form.category_id || null,
      is_customizable: form.is_customizable,
      is_active: form.is_active,
      is_featured: form.is_featured,
      imageUrls,
    };

    startTransition(async () => {
      try {
        if (isEdit && product) {
          await updateProductAction(product.id, data);
        } else {
          await createProductAction(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-body">
          {error}
        </div>
      )}

      {/* Basic info */}
      <section>
        <h2 className="font-heading font-semibold text-black text-sm uppercase tracking-widest mb-4 pb-2 border-b border-[#E8E8E8]">
          Basic Info
        </h2>
        <div className="space-y-4">
          <Input
            label="Product Name"
            name="name"
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Custom 3D Printed Dash Bracket"
            required
          />
          <Input
            label="URL Slug"
            name="slug"
            value={form.slug}
            onChange={(e) => setField("slug", e.target.value)}
            placeholder="custom-3d-printed-dash-bracket"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
              placeholder="48.00"
              required
            />
            <Input
              label="Compare-At Price ($)"
              name="compare_at_price"
              type="number"
              step="0.01"
              min="0"
              value={form.compare_at_price}
              onChange={(e) => setField("compare_at_price", e.target.value)}
              placeholder="Optional — shown as 'Was $XX'"
            />
          </div>
          <div>
            <label className="block text-sm font-heading font-semibold text-black mb-1.5">
              Category
            </label>
            <select
              value={form.category_id}
              onChange={(e) => setField("category_id", e.target.value)}
              className="w-full px-3 py-2.5 border border-[#E8E8E8] rounded-lg text-sm font-body text-black focus:outline-none focus:border-brand-blue/50"
            >
              <option value="">No category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Descriptions */}
      <section>
        <h2 className="font-heading font-semibold text-black text-sm uppercase tracking-widest mb-4 pb-2 border-b border-[#E8E8E8]">
          Descriptions
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-heading font-semibold text-black mb-1.5">
              Short Description
              <span className="text-gray-400 font-normal ml-1">(shown on product cards)</span>
            </label>
            <textarea
              value={form.short_description}
              onChange={(e) => setField("short_description", e.target.value)}
              rows={2}
              placeholder="One or two sentences describing this product..."
              className="w-full px-3 py-2.5 border border-[#E8E8E8] rounded-lg text-sm font-body text-black focus:outline-none focus:border-brand-blue/50 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-heading font-semibold text-black mb-1.5">
              Full Description
              <span className="text-gray-400 font-normal ml-1">(shown on product detail page)</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              rows={5}
              placeholder="Full product description, materials, dimensions, customization options..."
              className="w-full px-3 py-2.5 border border-[#E8E8E8] rounded-lg text-sm font-body text-black focus:outline-none focus:border-brand-blue/50 resize-none"
            />
          </div>
        </div>
      </section>

      {/* Images */}
      <section>
        <h2 className="font-heading font-semibold text-black text-sm uppercase tracking-widest mb-4 pb-2 border-b border-[#E8E8E8]">
          Product Images
        </h2>
        <ImageUpload value={imageUrls} onChange={setImageUrls} />
      </section>

      {/* Options / flags */}
      <section>
        <h2 className="font-heading font-semibold text-black text-sm uppercase tracking-widest mb-4 pb-2 border-b border-[#E8E8E8]">
          Options
        </h2>
        <div className="space-y-3">
          {[
            {
              key: "is_active" as const,
              label: "Active (visible in store)",
              desc: "Uncheck to hide this product without deleting it",
            },
            {
              key: "is_featured" as const,
              label: "Featured (shown on homepage)",
              desc: "Featured products appear in the homepage product section",
            },
            {
              key: "is_customizable" as const,
              label: "Customizable",
              desc: "Shows a 'Customize This' button on the product detail page",
            },
          ].map(({ key, label, desc }) => (
            <label key={key} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form[key]}
                onChange={(e) => setField(key, e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-brand-blue"
              />
              <div>
                <p className="text-sm font-heading font-semibold text-black">{label}</p>
                <p className="text-xs text-gray-500 font-body">{desc}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" size="lg" disabled={isPending}>
          {isPending ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => router.push("/admin/products")}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
