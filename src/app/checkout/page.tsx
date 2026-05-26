/*
  Checkout page — collects shipping info and processes payment via Square.
  This is a client component because it needs CartContext (localStorage-based).
*/
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { createClient } from "@/lib/supabase/client";
import SquarePaymentForm from "@/components/checkout/SquarePaymentForm";
import type { ShippingAddress } from "@/types/database";

// US states for the dropdown
const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const emptyForm: ShippingForm = {
  firstName: "", lastName: "", email: "", phone: "",
  street: "", city: "", state: "CA", zip: "", country: "US",
};

function isFormValid(f: ShippingForm) {
  return (
    f.firstName.trim() && f.lastName.trim() && f.email.trim() &&
    f.street.trim() && f.city.trim() && f.state && f.zip.trim()
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const [shipping, setShipping] = useState<ShippingForm>(emptyForm);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [formErrors, setFormErrors] = useState<Partial<ShippingForm>>({});

  const total = getCartTotal();

  // If cart is empty, redirect to products
  useEffect(() => {
    if (items.length === 0) {
      router.replace("/products");
    }
  }, [items, router]);

  // Pre-fill shipping from the user's profile if they're logged in
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, shipping_address")
        .eq("id", user.id)
        .single();

      if (profile) {
        const nameParts = (profile.full_name ?? "").split(" ");
        const addr = profile.shipping_address as ShippingAddress | null;
        setShipping((prev) => ({
          ...prev,
          firstName: nameParts[0] ?? "",
          lastName: nameParts.slice(1).join(" ") ?? "",
          email: user.email ?? "",
          street: addr?.street ?? "",
          city: addr?.city ?? "",
          state: addr?.state ?? "CA",
          zip: addr?.zip ?? "",
          country: addr?.country ?? "US",
        }));
      }
    });
  }, []);

  const setField = (field: keyof ShippingForm, value: string) =>
    setShipping((prev) => ({ ...prev, [field]: value }));

  // Validate required fields before allowing payment
  const validateForm = (): boolean => {
    const errors: Partial<ShippingForm> = {};
    if (!shipping.firstName.trim()) errors.firstName = "Required";
    if (!shipping.lastName.trim()) errors.lastName = "Required";
    if (!shipping.email.trim()) errors.email = "Required";
    if (!shipping.street.trim()) errors.street = "Required";
    if (!shipping.city.trim()) errors.city = "Required";
    if (!shipping.zip.trim()) errors.zip = "Required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /*
    onTokenReceived is called by SquarePaymentForm after Square tokenizes the card.
    At this point we have:
      - The payment token (from Square)
      - The cart items (from context)
      - The shipping form data
    We send all of this to our API route to process the payment server-side.
  */
  const onTokenReceived = async (token: string) => {
    // Validate shipping form first — don't proceed if it's incomplete
    if (!validateForm()) return;

    setIsProcessing(true);
    setPaymentError("");

    try {
      /*
        Send to our API route which will:
        1. Verify product prices against the database
        2. Charge the card using Square's server-side API
        3. Create the order in Supabase
        4. Return the order number
      */
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: token, // The Square payment token
          cartItems: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            submittedPrice: item.productPrice, // Server will verify this
          })),
          shippingInfo: {
            name: `${shipping.firstName} ${shipping.lastName}`.trim(),
            email: shipping.email,
            phone: shipping.phone,
            address: {
              street: shipping.street,
              city: shipping.city,
              state: shipping.state,
              zip: shipping.zip,
              country: shipping.country,
            },
          },
          // Include a unique key to prevent double-charging if the request is retried.
          // Timestamp + random suffix is good enough for our volume.
          idempotencyKey: `checkout-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setPaymentError(result.error ?? "Payment failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Payment succeeded! Clear the cart and go to the confirmation page.
      clearCart();
      router.push(`/checkout/confirmation?orderNumber=${result.orderNumber}`);
    } catch {
      setPaymentError("Something went wrong. Please check your connection and try again.");
      setIsProcessing(false);
    }
  };

  if (items.length === 0) return null; // Will redirect via useEffect

  // Reusable field component
  const Field = ({
    label, field, type = "text", required = false, half = false,
  }: {
    label: string; field: keyof ShippingForm; type?: string; required?: boolean; half?: boolean;
  }) => (
    <div className={half ? "flex-1 min-w-0" : "w-full"}>
      <label className="block text-xs font-heading font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
        {label}{required && <span className="text-brand-blue ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={shipping[field]}
        onChange={(e) => setField(field, e.target.value)}
        required={required}
        className={`w-full px-3 py-2.5 border rounded-lg text-sm font-body text-black focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/20 transition-colors
          ${formErrors[field] ? "border-red-400" : "border-[#E8E8E8]"}`}
      />
      {formErrors[field] && (
        <p className="mt-1 text-xs text-red-600 font-body">{formErrors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500 font-body">
          <li><Link href="/" className="hover:text-brand-blue">Home</Link></li>
          <li className="text-gray-300">/</li>
          <li><Link href="/products" className="hover:text-brand-blue">Products</Link></li>
          <li className="text-gray-300">/</li>
          <li className="text-black font-medium">Checkout</li>
        </ol>
      </nav>

      <h1 className="font-heading text-3xl font-bold uppercase tracking-widest text-black mb-10">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ── Left: Order Summary ────────────────────────────── */}
        <div>
          <h2 className="font-heading font-semibold text-black text-sm uppercase tracking-widest mb-5 pb-2 border-b border-[#E8E8E8]">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-lg bg-[#F8F8F8] border border-[#E8E8E8] flex-shrink-0 overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold text-black text-sm line-clamp-2">{item.productName}</p>
                  <p className="text-xs text-gray-500 font-body mt-0.5">Qty: {item.quantity}</p>
                </div>

                <p className="font-heading font-bold text-black text-sm flex-shrink-0">
                  ${(item.productPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-[#E8E8E8] pt-4 space-y-2">
            <div className="flex justify-between text-sm font-body text-gray-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-body text-gray-600">
              <span>Shipping</span>
              <span className="text-gray-400 italic">Calculated after order</span>
            </div>
            <div className="flex justify-between text-sm font-body text-gray-600">
              <span>Tax</span>
              <span className="text-gray-400 italic">Included</span>
            </div>
            <div className="flex justify-between font-heading font-bold text-black text-lg border-t border-[#E8E8E8] pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Edit cart link */}
          <Link
            href="/products"
            className="inline-block mt-4 text-sm text-brand-blue hover:underline font-body"
          >
            ← Edit cart
          </Link>
        </div>

        {/* ── Right: Shipping + Payment ──────────────────────── */}
        <div>
          {/* Shipping info */}
          <h2 className="font-heading font-semibold text-black text-sm uppercase tracking-widest mb-5 pb-2 border-b border-[#E8E8E8]">
            Shipping Information
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex gap-3">
              <Field label="First Name" field="firstName" required half />
              <Field label="Last Name" field="lastName" required half />
            </div>
            <Field label="Email Address" field="email" type="email" required />
            <Field label="Phone (optional)" field="phone" type="tel" />
            <Field label="Street Address" field="street" required />
            <div className="flex gap-3">
              <Field label="City" field="city" required half />
              <div className="flex-1 min-w-0">
                <label className="block text-xs font-heading font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                  State<span className="text-brand-blue ml-0.5">*</span>
                </label>
                <select
                  value={shipping.state}
                  onChange={(e) => setField("state", e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#E8E8E8] rounded-lg text-sm font-body text-black focus:outline-none focus:border-brand-blue/50"
                >
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <Field label="ZIP Code" field="zip" required half />
              <div className="flex-1 min-w-0">
                <label className="block text-xs font-heading font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Country</label>
                <input
                  type="text"
                  value="US"
                  readOnly
                  className="w-full px-3 py-2.5 border border-[#E8E8E8] rounded-lg text-sm font-body text-gray-400 bg-[#F8F8F8]"
                />
              </div>
            </div>
          </div>

          {/* Square payment form */}
          <SquarePaymentForm
            totalAmount={total}
            onTokenReceived={onTokenReceived}
            isProcessing={isProcessing}
            error={paymentError}
          />
        </div>
      </div>
    </div>
  );
}
