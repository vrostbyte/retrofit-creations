/*
  ProductFilters — client component for the Products page.
  Manages category filter, search, and sort by updating URL search params.
  URL params drive the server-side Supabase query, so filters survive refresh.
*/
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import type { ProductCategory } from "@/types/database";

interface ProductFiltersProps {
  categories: ProductCategory[];
  totalCount: number;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-az", label: "Name: A → Z" },
];

export default function ProductFilters({ categories, totalCount }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const activeCategory = searchParams.get("category") ?? "all";
  const activeSort = searchParams.get("sort") ?? "newest";
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");

  // Build a new URL with the updated param while keeping all others
  const createUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "all" || value === "newest") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const qs = params.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [pathname, searchParams]
  );

  const setCategory = (slug: string) => {
    startTransition(() => {
      router.push(createUrl({ category: slug }));
    });
  };

  const setSort = (value: string) => {
    startTransition(() => {
      router.push(createUrl({ sort: value }));
    });
  };

  // Debounce search so we don't navigate on every keystroke
  let searchTimeout: ReturnType<typeof setTimeout>;
  const handleSearch = (value: string) => {
    setSearchValue(value);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      startTransition(() => {
        router.push(createUrl({ search: value || null }));
      });
    }, 400);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="search"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full pl-10 pr-4 py-2.5 border border-[#E8E8E8] rounded-lg text-sm font-body text-black bg-white focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/20"
          />
        </div>

        {/* Sort */}
        <select
          value={activeSort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
          className="px-4 py-2.5 border border-[#E8E8E8] rounded-lg text-sm font-body text-black bg-white focus:outline-none focus:border-brand-blue/50 cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <button
          onClick={() => setCategory("all")}
          className={`px-4 py-2 rounded-full text-sm font-heading font-semibold uppercase tracking-wider border transition-all duration-200
            ${activeCategory === "all"
              ? "bg-brand-blue text-white border-brand-blue"
              : "bg-white text-gray-600 border-[#E8E8E8] hover:border-brand-blue/40 hover:text-brand-blue"
            }`}
        >
          All Products
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-heading font-semibold uppercase tracking-wider border transition-all duration-200
              ${activeCategory === cat.slug
                ? "bg-brand-blue text-white border-brand-blue"
                : "bg-white text-gray-600 border-[#E8E8E8] hover:border-brand-blue/40 hover:text-brand-blue"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 font-body">
        Showing <span className="font-semibold text-black">{totalCount}</span>{" "}
        {totalCount === 1 ? "product" : "products"}
      </p>
    </div>
  );
}
