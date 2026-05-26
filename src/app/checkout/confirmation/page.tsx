/*
  Order Confirmation page — shown after a successful payment.
  The order number is passed via URL search param: /checkout/confirmation?orderNumber=RC-2026-0001
*/
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") ?? "Your order";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      {/* Success icon */}
      <div className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-widest text-black mb-3">
        Order Received!
      </h1>

      <p className="text-gray-500 font-body text-lg mb-6">
        Thank you for your order. We&apos;re on it.
      </p>

      {/* Order number */}
      <div className="inline-block bg-[#F8F8F8] border border-[#E8E8E8] rounded-xl px-8 py-5 mb-8">
        <p className="text-xs font-heading font-semibold text-gray-400 uppercase tracking-widest mb-1">
          Order Number
        </p>
        <p className="font-heading font-bold text-brand-blue text-2xl tracking-widest">
          {orderNumber}
        </p>
        <p className="text-xs text-gray-400 font-body mt-1">
          Save this for your records
        </p>
      </div>

      {/* What happens next */}
      <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 text-left mb-8">
        <h2 className="font-heading font-semibold text-black text-sm uppercase tracking-widest mb-4">
          What Happens Next
        </h2>
        <ol className="space-y-3">
          {[
            { step: "1", text: "You&apos;ll receive an email confirmation shortly." },
            { step: "2", text: "Hailie will review your order and begin production." },
            { step: "3", text: "You&apos;ll get a shipping notification with tracking info once it ships." },
            { step: "4", text: "Questions? Email us — we respond within 24 hours." },
          ].map(({ step, text }) => (
            <li key={step} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue font-heading font-bold text-xs flex items-center justify-center">
                {step}
              </span>
              <p
                className="text-sm text-gray-600 font-body"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </li>
          ))}
        </ol>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/products"
          className="px-6 py-3 bg-brand-blue text-white font-heading font-bold uppercase tracking-widest text-sm rounded-lg hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
        <Link
          href="/account"
          className="px-6 py-3 border border-[#E8E8E8] text-gray-700 font-heading font-semibold uppercase tracking-widest text-sm rounded-lg hover:border-brand-blue/40 hover:text-brand-blue transition-colors"
        >
          View My Orders
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-[#E8E8E8] text-gray-700 font-heading font-semibold uppercase tracking-widest text-sm rounded-lg hover:border-brand-blue/40 hover:text-brand-blue transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

// useSearchParams requires a Suspense boundary
export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-body">Loading your order…</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
