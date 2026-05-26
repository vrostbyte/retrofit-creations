/*
  Square Server-Side Client
  =========================
  Creates the Square client that our API routes use to charge credit cards.

  WHY SERVER-SIDE ONLY:
  The SQUARE_ACCESS_TOKEN is a powerful secret — it can actually charge money.
  It MUST stay on the server and never be sent to the browser.
  This file should only be imported in API routes and Server Actions.

  HOW THE NEW SQUARE SDK WORKS (v44+):
  Square updated their Node.js SDK to use "SquareClient" instead of "Client".
  The API is now: client.payments.create(...)
  instead of the old: client.paymentsApi.createPayment(...)

  Amounts use JavaScript's BigInt because Square works in the smallest currency
  unit (cents) and the numbers can exceed JavaScript's safe integer range for
  large transactions.
*/

import { SquareClient, SquareError } from "square";

// Singleton pattern — create one client instance and reuse it.
// This avoids creating a new connection on every API request.
let squareClientInstance: SquareClient | null = null;

export function getSquareClient(): SquareClient {
  if (!squareClientInstance) {
    squareClientInstance = new SquareClient({
      // The secret access token — only your server can see this
      token: process.env.SQUARE_ACCESS_TOKEN!,
    });
  }
  return squareClientInstance;
}

// Re-export SquareError so API routes can check if an error came from Square
export { SquareError };

// Helper: convert a dollar amount (e.g., 48.00) to cents as BigInt (e.g., 4800n)
// Square requires BigInt because it uses the currency's smallest denomination.
// WHY BIGINT: JavaScript's regular numbers lose precision on very large integers.
// BigInt is an exact integer type with no precision limit.
export function dollarsToCents(dollars: number): bigint {
  return BigInt(Math.round(dollars * 100));
}
