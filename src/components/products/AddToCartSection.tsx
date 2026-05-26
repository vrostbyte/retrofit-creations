/*
  AddToCartSection — client component for the product detail page.

  Handles quantity selection and the Add to Cart / Customize This buttons.
  These need to be a Client Component because they use state (useState).
  Phase 2 will wire the Add to Cart action to actual cart state.
*/
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface AddToCartSectionProps {
  isCustomizable: boolean;
  // Reserved for Phase 2B cart wiring
  productId?: string;
  productName?: string;
  productPrice?: number;
}

export default function AddToCartSection({ isCustomizable }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);

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
            className="w-10 h-10 rounded border border-[#E8E8E8] text-gray-600 hover:border-brand-blue hover:text-brand-blue
              flex items-center justify-center transition-colors text-lg font-medium bg-white"
          >
            −
          </button>
          <span className="w-10 text-center font-heading font-bold text-black text-lg" aria-live="polite">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-10 h-10 rounded border border-[#E8E8E8] text-gray-600 hover:border-brand-blue hover:text-brand-blue
              flex items-center justify-center transition-colors text-lg font-medium bg-white"
          >
            +
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="primary" size="lg" className="flex-1">
          Add to Cart
        </Button>
        {isCustomizable && (
          <Button variant="secondary" size="lg" href="/contact" className="flex-1">
            Customize This
          </Button>
        )}
      </div>
    </div>
  );
}
