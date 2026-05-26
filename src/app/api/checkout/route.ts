/*
  Checkout API Route — processes payment and creates the order.

  ════════════════════════════════════════════════════════════════
  WHAT THIS DOES (plain English for beginners):
  ════════════════════════════════════════════════════════════════

  1. The browser sends us:
       - sourceId: a one-time token Square gave the customer's browser
       - cartItems: what the customer wants to buy + the prices THEY see
       - shippingInfo: name, email, address
       - idempotencyKey: a unique ID to prevent double-charging

  2. We verify the prices from our OWN database.
     Why? Never trust the client. A clever user could edit the JavaScript
     and claim a $100 product costs $1. We catch that here.

  3. We tell Square: "Charge this token $XX.XX"
     Square charges the customer's card and tells us if it worked.

  4. If payment succeeds, we create an order in our database.

  5. We send back { success: true, orderNumber: "RC-2026-0001" }
     so the browser can show the confirmation page.

  ════════════════════════════════════════════════════════════════
  WHY THIS MUST BE SERVER-SIDE:
  ════════════════════════════════════════════════════════════════

  The SQUARE_ACCESS_TOKEN can charge real money. If we put it in
  browser code (any file with "use client"), any visitor to the site
  could open DevTools, find the token, and use it to charge cards
  on your Square account. By keeping it in an API route (server only),
  the token stays on our server and is never sent to browsers.
*/

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server-admin";
import { getSquareClient, SquareError, dollarsToCents } from "@/lib/square/client";
import { randomUUID } from "crypto";

// Shape of each cart item sent from the browser
interface CartItemPayload {
  productId: string;
  quantity: number;
  submittedPrice: number; // The price the browser CLAIMS the product costs
}

// Shape of the full request body
interface CheckoutPayload {
  sourceId: string; // The Square payment token from the browser
  cartItems: CartItemPayload[];
  shippingInfo: {
    name: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  idempotencyKey: string;
}

export async function POST(request: Request) {
  // ── Step 1: Parse the request ──────────────────────────────
  let body: CheckoutPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request format." },
      { status: 400 }
    );
  }

  const { sourceId, cartItems, shippingInfo, idempotencyKey } = body;

  // Basic validation — make sure required fields are present
  if (!sourceId || !cartItems?.length || !shippingInfo?.email) {
    return NextResponse.json(
      { success: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  // ── Step 2: Verify prices against the database ─────────────
  /*
    SECURITY: Never trust the prices the browser sends.
    We fetch each product from our database and check that the submitted
    price matches. If they don't match, we reject the order.
  */
  const supabase = createAdminClient(); // Service role — bypasses RLS

  const productIds = cartItems.map((i) => i.productId);
  const { data: dbProducts, error: dbError } = await supabase
    .from("products")
    .select("id, name, price, is_active")
    .in("id", productIds);

  if (dbError || !dbProducts) {
    console.error("Failed to fetch products for price verification:", dbError);
    return NextResponse.json(
      { success: false, error: "Could not verify your order. Please try again." },
      { status: 500 }
    );
  }

  // Build a map of productId → DB price for quick lookup
  const priceMap = new Map(dbProducts.map((p) => [p.id, p]));

  // Calculate the TRUE total using database prices
  let verifiedTotalCents = BigInt(0); // BigInt because Square uses cents with BigInt
  const verifiedLineItems: Array<{
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
    lineTotal: number;
  }> = [];

  for (const item of cartItems) {
    const dbProduct = priceMap.get(item.productId);

    if (!dbProduct) {
      return NextResponse.json(
        { success: false, error: `Product not found. Please refresh and try again.` },
        { status: 400 }
      );
    }

    if (!dbProduct.is_active) {
      return NextResponse.json(
        { success: false, error: `"${dbProduct.name}" is no longer available.` },
        { status: 400 }
      );
    }

    const dbPriceCents = dollarsToCents(Number(dbProduct.price));
    const submittedPriceCents = dollarsToCents(item.submittedPrice);

    // SECURITY CHECK: submitted price must match DB price
    if (dbPriceCents !== submittedPriceCents) {
      console.warn(
        `Price mismatch for product ${item.productId}: submitted ${item.submittedPrice}, actual ${dbProduct.price}`
      );
      return NextResponse.json(
        {
          success: false,
          error: `Price for "${dbProduct.name}" has changed. Please refresh and try again.`,
        },
        { status: 409 }
      );
    }

    const itemTotal = Number(dbProduct.price) * item.quantity;
    verifiedTotalCents += dollarsToCents(itemTotal);
    verifiedLineItems.push({
      productId: item.productId,
      productName: dbProduct.name,
      productPrice: Number(dbProduct.price),
      quantity: item.quantity,
      lineTotal: itemTotal,
    });
  }

  // ── Step 3: Charge the card via Square ─────────────────────
  /*
    Now we use our SECRET Square access token (server-only!) to actually
    charge the customer's card. We pass:
      - sourceId: the token Square gave the customer's browser
      - amountMoney: the amount we verified server-side (in cents, as BigInt)
      - idempotencyKey: a unique ID so Square won't double-charge if the
        request is accidentally sent twice (network timeout, retry, etc.)
      - locationId: which Square "store" is processing this payment
  */
  const squareClient = getSquareClient();

  try {
    const paymentResponse = await squareClient.payments.create({
      sourceId, // The one-time token from the browser
      idempotencyKey, // Unique ID to prevent double-charging
      amountMoney: {
        amount: verifiedTotalCents, // Must be BigInt — Square's requirement
        currency: "USD",
      },
      locationId: process.env.SQUARE_LOCATION_ID!,
      note: `Retrofit Creations order — ${shippingInfo.email}`,
      autocomplete: true, // Immediately capture the payment (don't hold for review)
    });

    const payment = paymentResponse.payment;

    // If Square returned no payment object, something went wrong
    if (!payment?.id) {
      throw new Error("Square returned no payment ID");
    }

    // ── Step 4: Create the order in our database ──────────────
    /*
      Payment succeeded! Now we create a permanent record in Supabase.
      We use the admin client so we can insert regardless of who the
      customer is (they might not be logged in).
    */

    // Generate a human-readable order number like "RC-2026-0001"
    const { data: orderNumData } = await supabase.rpc("generate_order_number");
    const orderNumber = orderNumData ?? `RC-${new Date().getFullYear()}-${randomUUID().slice(0, 4).toUpperCase()}`;

    const totalDollars = Number(verifiedTotalCents) / 100;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        status: "received",
        customer_name: shippingInfo.name,
        customer_email: shippingInfo.email,
        shipping_address: shippingInfo.address,
        subtotal: totalDollars,
        shipping_cost: 0,
        tax: 0,
        total: totalDollars,
        square_payment_id: payment.id,
        square_order_id: payment.orderId ?? null,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      // Payment succeeded but we failed to save the order.
      // Log this for manual recovery — customer WAS charged.
      console.error("CRITICAL: Payment succeeded but order creation failed!", {
        paymentId: payment.id,
        orderError,
        email: shippingInfo.email,
      });
      // Still return success so the customer sees a confirmation,
      // but log that we need to manually create the order.
      return NextResponse.json({ success: true, orderNumber, paymentId: payment.id });
    }

    // Create order_items rows (one per product in the cart)
    await supabase.from("order_items").insert(
      verifiedLineItems.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.productName, // Snapshot — won't change if product is edited later
        product_price: item.productPrice, // Snapshot
        quantity: item.quantity,
        line_total: item.lineTotal,
      }))
    );

    // ── Step 5: Return success to the browser ─────────────────
    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: order.id,
    });
  } catch (err) {
    // Handle Square-specific errors (card declined, etc.)
    if (err instanceof SquareError) {
      const squareErrors = err.errors ?? [];
      const firstError = squareErrors[0];

      console.error("Square payment error:", squareErrors);

      // Map Square error codes to friendly messages
      let message = "Payment failed. Please check your card details and try again.";
      if (firstError?.code === "CARD_DECLINED") {
        message = "Your card was declined. Please try a different card.";
      } else if (firstError?.code === "VERIFY_CVV_FAILURE") {
        message = "Invalid CVV code. Please check the 3-digit code on your card.";
      } else if (firstError?.code === "INSUFFICIENT_FUNDS") {
        message = "Insufficient funds. Please try a different card.";
      } else if (firstError?.code === "INVALID_EXPIRATION") {
        message = "Your card's expiration date is invalid.";
      }

      return NextResponse.json({ success: false, error: message }, { status: 402 });
    }

    // Unknown error
    console.error("Checkout API error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
