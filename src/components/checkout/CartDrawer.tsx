/*
  CartDrawer — slide-out cart panel from the right side of the screen.
  Opens when the cart icon is clicked or when an item is added.
*/
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart/CartContext";

export default function CartDrawer() {
  const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount, cartOpen, setCartOpen } =
    useCart();

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setCartOpen]);

  // Prevent body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  const total = getCartTotal();
  const count = getCartCount();

  return (
    <>
      {/* Backdrop — clicking it closes the drawer */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300
          ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E8]">
          <h2 className="font-heading font-bold text-black uppercase tracking-widest text-lg">
            Your Cart
            {count > 0 && (
              <span className="ml-2 text-sm font-body text-gray-400 normal-case">
                ({count} {count === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="p-1.5 text-gray-400 hover:text-black transition-colors rounded"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto py-4 px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg
                className="w-16 h-16 text-gray-200 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <p className="text-gray-500 font-body mb-4">Your cart is empty.</p>
              <Link
                href="/products"
                onClick={() => setCartOpen(false)}
                className="text-brand-blue hover:underline font-heading font-semibold text-sm uppercase tracking-wide"
              >
                Browse Products →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3 py-4 border-b border-[#F0F0F0] last:border-0"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-[#F8F8F8] border border-[#E8E8E8] flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info + controls */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={() => setCartOpen(false)}
                      className="block font-heading font-semibold text-black text-sm leading-snug hover:text-brand-blue transition-colors line-clamp-2 mb-2"
                    >
                      {item.productName}
                    </Link>

                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded border border-[#E8E8E8] text-gray-600 hover:border-brand-blue hover:text-brand-blue flex items-center justify-center text-sm disabled:opacity-30 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-heading font-bold text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded border border-[#E8E8E8] text-gray-600 hover:border-brand-blue hover:text-brand-blue flex items-center justify-center text-sm transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Line total + remove */}
                      <div className="flex items-center gap-3">
                        <span className="font-heading font-bold text-black text-sm">
                          ${(item.productPrice * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          aria-label={`Remove ${item.productName}`}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — subtotal + actions */}
        {items.length > 0 && (
          <div className="border-t border-[#E8E8E8] px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-body">Subtotal</span>
              <span className="font-heading font-bold text-black text-lg">
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-body">
              Shipping and taxes calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full py-3 bg-brand-blue text-white text-center font-heading font-bold uppercase tracking-widest text-sm rounded-lg hover:opacity-90 transition-opacity"
            >
              Checkout — ${total.toFixed(2)}
            </Link>
            <button
              onClick={() => setCartOpen(false)}
              className="block w-full py-2 text-center text-sm font-body text-gray-500 hover:text-black transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
