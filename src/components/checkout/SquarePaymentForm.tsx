/*
  SquarePaymentForm — renders Square's secure card input and handles payment.

  HOW SQUARE'S PAYMENT FORM WORKS (step by step):
  ─────────────────────────────────────────────────
  1. This component loads Square's Web Payments SDK in an <iframe>.
  2. The customer types their card number, CVV, and expiry INTO THE IFRAME.
     Their card data never touches our code — it goes directly to Square's servers.
  3. When the customer clicks "Place Order", Square's SDK calls our
     `cardTokenizeResponseReceived` callback with a short-lived "token" —
     a random string like "cnon:aBc123..." that represents the card.
  4. We send that token to our API route at /api/checkout.
  5. Our server uses the token (plus our secret SQUARE_ACCESS_TOKEN) to
     actually charge the card via Square's Payments API.
  6. On success, we redirect to the confirmation page.

  WHY THIS IS SECURE:
  - Card numbers never hit our server — Square handles PCI compliance.
  - The token can only be used once and expires quickly.
  - Our secret access token (that actually charges money) never leaves our server.
*/
"use client";

import { useState } from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";

// The application ID comes from an env var with NEXT_PUBLIC_ prefix,
// which means it's safe to include in browser code. It can only CREATE tokens,
// not charge money — the charging requires the server-side access token.
const APP_ID = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!;
const LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;

interface SquarePaymentFormProps {
  // Dollar total for display and sending to server
  totalAmount: number;
  // Called by the parent with the Square token once we have it
  onTokenReceived: (token: string) => Promise<void>;
  // Whether a payment is currently being processed (show loading state)
  isProcessing: boolean;
  // Set by parent when there's an error to display
  error: string;
}

export default function SquarePaymentForm({
  totalAmount,
  onTokenReceived,
  isProcessing,
  error,
}: SquarePaymentFormProps) {
  const [sqError, setSqError] = useState("");

  return (
    <div>
      <h3 className="font-heading font-semibold text-black text-sm uppercase tracking-widest mb-4">
        Payment Details
      </h3>

      {/* Square's payment form — renders in a secure iframe */}
      <PaymentForm
        applicationId={APP_ID}
        locationId={LOCATION_ID}
        /*
          cardTokenizeResponseReceived fires when Square has created a token
          from the customer's card info. This is our main callback.

          token.token  — the payment token (a random string, not a card number)
          token.errors — if tokenization failed (e.g., invalid card number)
        */
        cardTokenizeResponseReceived={async (token) => {
          setSqError("");

          /*
            TokenResult is a discriminated union:
              - SuccessfulTokenResult: has { token: string }
              - ErrorTokenResult:      has { errors: TokenizationError[] }
            We use 'errors' in token to narrow the type safely.
          */
          if ("errors" in token) {
            // Card tokenization failed (invalid number, expired card, etc.)
            const firstError = (token as { errors: Array<{ message?: string }> }).errors?.[0];
            setSqError(firstError?.message ?? "Card error — please check your details.");
            return;
          }

          // Success path — token.token is guaranteed by the SuccessfulTokenResult type
          const tokenString = (token as { token: string }).token;
          if (!tokenString) {
            setSqError("Unable to process your card. Please try again.");
            return;
          }

          // Hand the token to the parent, which will call our API
          await onTokenReceived(tokenString);
        }}
      >
        {/*
          CreditCard renders Square's secure card input fields.
          The child text becomes the submit button's label.
          We disable it while processing to prevent double-submits.
        */}
        <CreditCard
          style={{
            input: {
              fontSize: "14px",
              fontFamily: "Inter, system-ui, sans-serif",
              color: "#000000",
            },
            ".input-container": {
              borderColor: "#E8E8E8",
              borderRadius: "8px",
            },
            ".input-container.is-focus": {
              borderColor: "#0062FF",
            },
          }}
          buttonProps={{
            isLoading: isProcessing,
            css: {
              backgroundColor: isProcessing ? "#9ab8ff" : "#0062FF",
              color: "#ffffff",
              fontFamily: "Oswald, sans-serif",
              fontWeight: "700",
              fontSize: "14px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "14px 24px",
              borderRadius: "8px",
              width: "100%",
              cursor: isProcessing ? "not-allowed" : "pointer",
              border: "none",
            },
          }}
        >
          {isProcessing ? "Processing…" : `Place Order — $${totalAmount.toFixed(2)}`}
        </CreditCard>
      </PaymentForm>

      {/* Show Square tokenization errors */}
      {sqError && (
        <p className="mt-3 text-sm text-red-600 font-body">{sqError}</p>
      )}

      {/* Show API-level errors (e.g., card declined) from the parent */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-body">
          {error}
        </div>
      )}

      {/* Security reassurance */}
      <p className="mt-3 text-xs text-gray-400 font-body flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        Payments are secured by Square. Your card number is never stored on our servers.
      </p>
    </div>
  );
}
