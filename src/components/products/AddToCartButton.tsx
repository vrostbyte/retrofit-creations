/*
  AddToCartButton — small client component for the product grid.
  Calls the cart context to add an item, then shows a brief toast.
  Kept as a separate client component so the products page (server) can use it.
*/
"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  slug: string;
  imageUrl?: string;
}

export default function AddToCartButton({
  productId,
  productName,
  productPrice,
  slug,
  imageUrl,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart({ productId, productName, productPrice, slug, imageUrl });
    setAdded(true);
    // Reset back to normal text after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Add ${productName} to cart`}
      className={`flex-1 py-2 px-3 rounded-md text-sm font-heading font-semibold uppercase tracking-wide transition-all duration-200
        ${added
          ? "bg-green-600 text-white"
          : "bg-brand-blue text-white hover:opacity-90"
        }`}
    >
      {added ? "✓ Added!" : "Add to Cart"}
    </button>
  );
}
