# Square Payment Integration — Setup Guide

> **For:** Josh & Hailie
> **Purpose:** Step-by-step guide to set up Square for payment processing on the Retrofit Creations website.
> **Difficulty:** Beginner-friendly. No prior Square experience needed.

---

## What Square Does for Us

Square handles all the money. When a customer enters their credit card on your site, Square securely processes the payment so you never have to touch or store credit card numbers yourself. This is both a legal and security requirement — you never want raw card data on your own servers.

Here's the flow in plain English:

```
Customer clicks "Buy Now"
    → Square's payment form collects the card info (on THEIR secure servers)
    → Square gives us a one-time "token" (a random string, not the card number)
    → We send that token to Square's API and say "charge this person $X"
    → Square charges the card and tells us if it worked
    → We save the order and send a confirmation email
```

The key concept: **your website never sees the actual credit card number.** Square handles all the scary parts.

---

## Step 1: Create a Square Account

If Hailie already has a Square account for the business (like for a Square POS terminal), use that same account.

1. Go to [https://squareup.com](https://squareup.com)
2. Sign up or log in with the Retrofit Creations business account
3. Complete any business verification Square asks for (business name, address, bank info for payouts)

> **NOTE:** You can do all the development and testing WITHOUT completing business verification. But you'll need it done before you can accept real payments.

---

## Step 2: Access the Developer Dashboard

This is where you get the credentials (secret keys) that let your website talk to Square.

1. Go to [https://developer.squareup.com](https://developer.squareup.com)
2. Log in with the same Square account from Step 1
3. You'll land on the **Developer Console**

---

## Step 3: Create an Application

An "application" in Square's world is just a container for the credentials your website will use.

1. In the Developer Console, click **"+" or "Create Application"**
2. Name it: **"Retrofit Creations Website"**
3. Click **Create**
4. Click on the application name to open its settings

---

## Step 4: Get Your Sandbox Credentials (For Testing)

The **Sandbox** is Square's test environment. It uses fake money so you can test everything without charging real cards.

1. At the top of the application page, make sure **"Sandbox"** is selected (not "Production")
2. Go to the **Credentials** page in the left menu
3. You'll see these values — copy them somewhere safe:

| Credential | What It Is | Where It Goes |
|-----------|-----------|---------------|
| **Sandbox Application ID** | Starts with `sandbox-sq0idb-...` | `NEXT_PUBLIC_SQUARE_APPLICATION_ID` in `.env.local` |
| **Sandbox Access Token** | Starts with `EAAAl...` (long string) | `SQUARE_ACCESS_TOKEN` in `.env.local` |

4. Now get your **Location ID:**
   - In the left menu, click **Locations**
   - You'll see a default location (Square creates one automatically)
   - Copy the **Location ID** — it looks like: `L8GZ7...`
   - This goes in `SQUARE_LOCATION_ID` in `.env.local`

---

## Step 5: Set Up a Sandbox Test Account (Optional but Recommended)

This gives you a fake Square Dashboard to see test transactions from the seller's perspective.

1. In the Developer Console left menu, click **Sandbox test accounts**
2. Click **"+ New sandbox test account"**
3. Name it: **"Retrofit Test Store"**
4. Country: **United States**
5. Check **"Automatically create authorizations for all my current apps"**
6. Click **Create**
7. Click **"Square Dashboard"** next to the test account to open the sandbox seller view

> **TIP:** Keep the Sandbox Dashboard tab open while testing. You can see test payments appear in real-time.

---

## Step 6: Fill In Your .env.local File

In your project folder, your `.env.local` file should have these Square values:

```env
# Square — Sandbox (Development)
SQUARE_ACCESS_TOKEN=EAAAl...your_sandbox_access_token_here
SQUARE_APPLICATION_ID=sandbox-sq0idb-...your_sandbox_app_id_here
SQUARE_LOCATION_ID=L...your_location_id_here
NEXT_PUBLIC_SQUARE_APPLICATION_ID=sandbox-sq0idb-...same_as_above
SQUARE_ENVIRONMENT=sandbox
```

**Why is the Application ID listed twice?** The `NEXT_PUBLIC_` version is visible to the browser (the customer's device) — it's safe to expose because it can only be used to create payment tokens, not charge cards. The regular `SQUARE_APPLICATION_ID` stays on the server. The `SQUARE_ACCESS_TOKEN` is the secret one — it NEVER goes to the browser.

---

## Step 7: Test Credit Card Numbers

When testing in the Sandbox, use these fake card numbers:

| Card | Number | Result |
|------|--------|--------|
| **Visa (success)** | `4532 0123 4567 8901` | Payment succeeds |
| **Mastercard (success)** | `5412 1234 5678 9012` | Payment succeeds |
| **Visa (decline)** | `4000 0000 0000 0002` | Payment is declined |
| **Any CVV** | `111` | Works for all test cards |
| **Any Expiry** | Any future date, e.g., `12/29` | Works for all test cards |
| **Any ZIP** | `12345` | Works for all test cards |

> **IMPORTANT:** These only work in Sandbox mode. Real cards won't work in Sandbox, and test cards won't work in Production.

---

## Step 8: When You're Ready for Real Payments (Launch Day)

When the site is ready to go live and accept real money:

1. Go to the Developer Console
2. Switch from **Sandbox** to **Production** at the top
3. Copy the **Production** credentials:
   - Production Application ID (starts with `sq0idp-...`)
   - Production Access Token
4. Get the Production Location ID from the Locations page
5. Update your `.env.local` (and Vercel environment variables):

```env
# Square — Production (Live)
SQUARE_ACCESS_TOKEN=your_production_access_token
SQUARE_APPLICATION_ID=sq0idp-...your_production_app_id
SQUARE_LOCATION_ID=your_production_location_id
NEXT_PUBLIC_SQUARE_APPLICATION_ID=sq0idp-...same_as_above
SQUARE_ENVIRONMENT=production
```

6. In Vercel, add these same variables in **Settings → Environment Variables**
7. Redeploy

> **DO NOT** switch to production until the site is fully tested in Sandbox.

---

## How the Code Uses These Credentials

Here's a simplified picture of what the code does with these keys:

**Frontend (customer's browser):**
```
react-square-web-payments-sdk uses NEXT_PUBLIC_SQUARE_APPLICATION_ID
    → Loads Square's secure card input form
    → Customer types card info INTO SQUARE'S FORM (not ours!)
    → Square returns a payment "token" (random string)
    → Our code sends that token to our server
```

**Backend (our Next.js server):**
```
Our /api/checkout route receives the token
    → Uses SQUARE_ACCESS_TOKEN to call Square's Payments API
    → Says "charge $X using this token"
    → Square processes the payment
    → Returns success or failure
    → We create the order in Supabase and email the customer
```

**The important security boundary:** The `SQUARE_ACCESS_TOKEN` (the powerful one) only lives on the server. The customer's browser never sees it. The `NEXT_PUBLIC_SQUARE_APPLICATION_ID` (the safe one) can be in the browser because it can only create tokens, not charge money.

---

## Packages We Use

These get installed by the CLI tools during project setup:

| Package | Purpose |
|---------|---------|
| `react-square-web-payments-sdk` | React components for the payment form (card input, Apple Pay, Google Pay) |
| `square` | Square's official Node.js SDK for server-side API calls (charging cards, managing orders) |

---

## Troubleshooting

**"Payment form won't load"**
- Check that `NEXT_PUBLIC_SQUARE_APPLICATION_ID` is set and starts with `sandbox-sq0idb-`
- Check that you're not blocking Square's scripts with an ad blocker
- Make sure the Location ID is correct

**"Payment declined" on test card**
- You might be using the decline test number (`4000 0000 0000 0002`) — try `4532 0123 4567 8901`
- Check that the CVV is `111` and expiry is a future date

**"UNAUTHORIZED" error on server**
- The `SQUARE_ACCESS_TOKEN` is wrong or expired
- Make sure you're using Sandbox credentials with `SQUARE_ENVIRONMENT=sandbox`
- Check you copied the full token (they're long)

**"I can't find my Location ID"**
- Developer Console → your app → Locations (left menu)
- If no locations show, you may need to go to the Sandbox Dashboard and set up a location there first

---

## Quick Reference: All Square Env Vars

```env
# REQUIRED — Server-side (NEVER expose to browser)
SQUARE_ACCESS_TOKEN=           # The powerful key — processes payments
SQUARE_LOCATION_ID=            # Which Square "store" to charge to

# REQUIRED — Client-side (safe for browser)
NEXT_PUBLIC_SQUARE_APPLICATION_ID=  # Loads the payment form

# REQUIRED — Configuration
SQUARE_ENVIRONMENT=sandbox     # "sandbox" for testing, "production" for real money
```
