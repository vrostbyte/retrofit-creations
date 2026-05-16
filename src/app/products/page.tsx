/*
  Products page — browse and filter the full product catalog.

  Features (PRD 5.3):
    • Category filter bar
    • Search bar
    • Sort dropdown
    • Responsive product grid

  All data is hardcoded for Phase 1. Phase 2 will fetch from Supabase.
  The filter/search/sort state is managed client-side on this page.
*/
"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import StarRating from "@/components/ui/StarRating";

const CATEGORIES = [
  { slug: "all", label: "All Products" },
  { slug: "zyn-tins", label: "Custom Zyn Tins" },
  { slug: "laser-engraved", label: "Laser Engraved" },
  { slug: "automotive-parts", label: "Automotive Parts" },
  { slug: "event-vendor", label: "Event / Vendor" },
  { slug: "personalized-gifts", label: "Personalized Gifts" },
  { slug: "3d-printed", label: "3D Printed Parts" },
];

type SortKey = "popular" | "newest" | "price-asc" | "price-desc" | "name-az";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-az", label: "Name: A → Z" },
];

/* Realistic placeholder products — will be replaced by Supabase data in Phase 2 */
const PRODUCTS = [
  { slug: "custom-dash-bracket-69-camaro", name: "Custom 3D Printed Dash Bracket — '69 Camaro", price: 48.00, category: "automotive-parts", rating: 5, reviews: 12, isCustomizable: false },
  { slug: "laser-engraved-keychain-v8", name: "Laser Engraved Keychain — V8 Engine Block", price: 18.00, category: "laser-engraved", rating: 5, reviews: 34, isCustomizable: true },
  { slug: "custom-zyn-tin-car-club", name: "Custom Zyn Tin — Car Club Logo", price: 24.00, category: "zyn-tins", rating: 5, reviews: 22, isCustomizable: true },
  { slug: "3d-printed-cup-holder-insert-bronco", name: "3D Printed Cup Holder Insert — Ford Bronco", price: 35.00, category: "3d-printed", rating: 4, reviews: 8, isCustomizable: false },
  { slug: "laser-engraved-wallet-card", name: "Laser Engraved Wallet Card — Custom Text", price: 15.00, category: "personalized-gifts", rating: 5, reviews: 41, isCustomizable: true },
  { slug: "car-show-vendor-display-stand", name: "3D Printed Car Show Display Stand", price: 65.00, category: "event-vendor", rating: 4, reviews: 7, isCustomizable: false },
  { slug: "custom-emblem-muscle-car", name: "Custom 3D Printed Emblem — Muscle Car Style", price: 42.00, category: "automotive-parts", rating: 5, reviews: 19, isCustomizable: true },
  { slug: "laser-engraved-wood-keychain", name: "Laser Engraved Wood Keychain — Custom Name", price: 14.00, category: "laser-engraved", rating: 5, reviews: 56, isCustomizable: true },
  { slug: "zyn-tin-custom-design", name: "Custom Zyn Tin — Personalized Design", price: 22.00, category: "zyn-tins", rating: 4, reviews: 15, isCustomizable: true },
  { slug: "3d-printed-phone-mount-dash", name: "3D Printed Dash Phone Mount — Universal Fit", price: 28.00, category: "3d-printed", rating: 4, reviews: 11, isCustomizable: false },
  { slug: "acrylic-laser-engraved-sign", name: "Laser Engraved Acrylic Sign — Custom Text", price: 38.00, category: "personalized-gifts", rating: 5, reviews: 29, isCustomizable: true },
  { slug: "vendor-badge-holder-event", name: "3D Printed Vendor Badge Holder — Event Ready", price: 18.00, category: "event-vendor", rating: 4, reviews: 6, isCustomizable: false },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    switch (sort) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "name-az":    list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "newest":     list.reverse(); break;
      /* popular — default order (by reviews desc) */
      default:           list.sort((a, b) => b.reviews - a.reviews);
    }

    return list;
  }, [activeCategory, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeading
        title="Products"
        subtitle="Custom fabricated pieces for enthusiasts who demand the best."
        className="mb-10"
      />

      {/* ── Filters Bar ────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-heading font-semibold uppercase tracking-wider transition-all duration-200 border
                ${activeCategory === cat.slug
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-transparent text-zinc-400 border-brand-blue/20 hover:border-brand-blue/50 hover:text-brand-blue"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search + Sort row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full bg-zinc-900 text-brand-white border border-brand-blue/20 rounded-md px-4 py-2.5 pl-10
                placeholder-zinc-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-sm"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort products"
            className="bg-zinc-900 text-brand-white border border-brand-blue/20 rounded-md px-4 py-2.5 text-sm
              focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors appearance-none cursor-pointer min-w-[180px]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="text-zinc-500 text-sm mb-6 font-body">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "all" && ` in ${CATEGORIES.find(c => c.slug === activeCategory)?.label}`}
      </p>

      {/* ── Product Grid ────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          <p className="font-heading uppercase tracking-widest text-lg mb-2">No products found</p>
          <p className="text-sm">Try a different category or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const categoryLabel = CATEGORIES.find(c => c.slug === product.category)?.label ?? product.category;
            return (
              <Card key={product.slug} className="flex flex-col overflow-hidden">
                {/* Product image placeholder */}
                <div className="w-full h-48 bg-zinc-900 flex items-center justify-center border-b border-brand-blue/10 relative">
                  <div className="text-center">
                    <div className="w-12 h-12 border border-brand-blue/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-zinc-600 font-heading uppercase tracking-wider">Photo Coming Soon</span>
                  </div>
                  {product.isCustomizable && (
                    <span className="absolute top-2 left-2 text-[10px] bg-brand-blue/20 text-brand-blue border border-brand-blue/30 px-2 py-0.5 rounded font-heading uppercase tracking-wider">
                      Customizable
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1 gap-2">
                  <Badge variant="outline">{categoryLabel}</Badge>
                  <h3 className="font-heading font-semibold uppercase tracking-wide text-brand-white text-sm leading-snug flex-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <StarRating rating={product.rating} size="sm" />
                    <span className="text-zinc-500 text-xs">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-heading font-bold text-lg text-brand-white">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="secondary" size="sm" href={`/products/${product.slug}`} className="flex-1 text-xs">
                      View
                    </Button>
                    <Button variant="primary" size="sm" className="flex-1 text-xs">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
