/*
  CartContext — global shopping cart state for the whole app.

  HOW REACT CONTEXT WORKS (for beginners):
  React Context is like a "global variable" that any component in your app can
  read or write, without having to pass it down through props manually.
  Think of it like a bulletin board that every room in the house can see.

  HOW LOCALSTORAGE PERSISTENCE WORKS:
  localStorage is a browser feature that saves data even after the page refreshes.
  We save the cart there so customers don't lose their items if they close the tab.
  Important: localStorage only exists in the browser, NOT on the server — so we
  must be careful to only read it inside a useEffect (which runs client-side only).
*/
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ── Types ─────────────────────────────────────────────────────
// One item in the cart. Each unique product gets its own CartItem.
export interface CartItem {
  productId: string;
  productName: string;
  productPrice: number; // In dollars (e.g., 48.00)
  quantity: number;
  slug: string; // For linking back to the product page
  imageUrl?: string; // Primary product photo if available
}

// Everything the context exposes to the rest of the app
interface CartContextType {
  items: CartItem[];
  // Add a product (increments quantity if it's already in the cart)
  addToCart: (
    product: Omit<CartItem, "quantity">,
    quantity?: number
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number; // Dollar total of everything in the cart
  getCartCount: () => number; // Total number of individual items (for the badge)
  // Drawer open/close state lives here so Header can control it
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

// ── Context ───────────────────────────────────────────────────
// Create the context with null as default — we'll always use the Provider below
const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "rc-cart"; // localStorage key

// ── Provider ──────────────────────────────────────────────────
// Wrap the app in this so all child components can call useCart()
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  // Track whether we've loaded from localStorage yet.
  // We start as "not hydrated" to avoid a flash of empty cart on page load.
  const [hydrated, setHydrated] = useState(false);

  // Step 1 — On mount, read the saved cart from localStorage.
  // useEffect only runs in the browser, never on the server.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // If the stored data is corrupted, just start with an empty cart
    }
    setHydrated(true);
  }, []);

  // Step 2 — Whenever items change, save the new cart to localStorage.
  // We skip this until after the initial hydration so we don't overwrite
  // the saved cart with an empty array on the first render.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage might be unavailable in private browsing — that's fine
    }
  }, [items, hydrated]);

  // ── Cart Actions ────────────────────────────────────────────
  // useCallback memoizes these functions so child components don't re-render
  // unnecessarily every time the parent re-renders.

  const addToCart = useCallback(
    (product: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product.productId);
        if (existing) {
          // Product already in cart — just bump the quantity
          return prev.map((i) =>
            i.productId === product.productId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        // New product — add it to the end of the cart
        return [...prev, { ...product, quantity }];
      });
      // Automatically open the cart drawer so the customer can see what they added
      setCartOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    // Don't allow quantity below 1 — use removeFromCart to delete
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartTotal = useCallback(
    () => items.reduce((sum, i) => sum + i.productPrice * i.quantity, 0),
    [items]
  );

  const getCartCount = useCallback(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────
// Import and call this in any client component to access the cart.
// Example: const { addToCart, items } = useCart()
export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart() must be called inside a <CartProvider>.");
  }
  return ctx;
}
