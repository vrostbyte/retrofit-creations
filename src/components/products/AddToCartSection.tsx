/*
  AddToCartSection — client component for the product detail page.
  Phase 2B: now wired to CartContext to actually add items.
*/
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useCart } from "@/lib/cart/CartContext";

interface AddToCartSectionProps {
  isCustomizable: boolean;
  productId: string;
  productName: string;
  productPrice: number;
  slug: string;
  imageUrl?: string;
}

export default function AddToCartSection({
  isCustomizable,
  productId,
  productName,
  productPrice,
  slug,
  imageUrl,
}: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ productId, productName, productPrice, slug, imageUrl }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      <div>
        <label className="block text-sm font-heading font-semibold uppercase tracking-widest text-gray-600 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-10 h-10 rounded border border-[#E8E8E8] text-gray-600 hover:border-brand-blue hover:text-brand-blue flex items-center justify-center transition-colors text-lg font-medium bg-white"
          >
            −
          </button>
          <span className="w-10 text-center font-heading font-bold text-black text-lg" aria-live="polite">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-10 h-10 rounded border border-[#E8E8E8] text-gray-600 hover:border-brand-blue hover:text-brand-blue flex items-center justify-center transition-colors text-lg font-medium bg-white"
          >
            +
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-3 px-6 rounded-lg font-heading font-bold uppercase tracking-widest text-sm transition-all duration-200
            ${added
              ? "bg-green-600 text-white"
              : "bg-brand-blue text-white hover:opacity-90"
            }`}
        >
          {added ? "✓ Added to Cart!" : "Add to Cart"}
        </button>
        {isCustomizable && (
          <Button variant="secondary" size="lg" href="/contact" className="flex-1">
            Customize This
          </Button>
        )}
      </div>
    </div>
  );
}
