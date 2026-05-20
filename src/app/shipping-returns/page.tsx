/*
  Shipping & Returns Policy (/shipping-returns).

  Light-body theme: white background, dark text, Inter body / Oswald headings.
  Same structural pattern as /terms — heading + dated, then named sections.
*/
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns — Retrofit Creations",
  description:
    "Retrofit Creations Shipping & Return Policy. Global shipping, 30-day returns on non-custom items, and policy details.",
};

function NamedSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h3 className="font-heading text-base sm:text-lg font-semibold tracking-wide text-black mb-3">
        {title}
      </h3>
      <div className="space-y-4 text-[#333] leading-relaxed font-body text-base">
        {children}
      </div>
    </section>
  );
}

export default function ShippingReturnsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* ── Page header ──────────────────────────────────────────── */}
      <header className="mb-12 border-b border-[#E8E8E8] pb-8">
        <p className="text-brand-blue font-heading text-xs uppercase tracking-[0.2em] mb-3">
          Legal
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest text-black leading-tight mb-4">
          Shipping &amp; Return Policy
        </h1>
        <p className="text-sm text-[#555] font-body">Last updated: May 2026</p>
      </header>

      {/* ── Intro ────────────────────────────────────────────────── */}
      <div className="space-y-4 text-[#333] leading-relaxed font-body text-base">
        <p>
          At Retrofit Creations, we are committed to providing quality products and transparent shipping and return policies for our customers worldwide. Please review the following policies carefully before placing your order.
        </p>
      </div>

      {/* ── Shipping Policy ──────────────────────────────────────── */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black mb-4">
          Shipping Policy
        </h2>
        <div className="space-y-4 text-[#333] leading-relaxed font-body text-base">
          <p>
            Retrofit Creations ships products domestically within the United States and internationally to a wide range of countries. Shipping rates are calculated based on the customer&apos;s shipping destination, package weight, and package dimensions.
          </p>
        </div>

        <NamedSection title="Shipping Carriers &amp; Options">
          <p>
            Customers will be provided with a selection of available shipping carriers and shipping methods during checkout. Available options may vary depending on destination, package size, weight, and current carrier availability. Estimated delivery times are provided by the selected shipping carrier and are not guaranteed by Retrofit Creations.
          </p>
        </NamedSection>

        <NamedSection title="International Shipping &amp; Import Fees">
          <p>
            Retrofit Creations proudly ships globally. Customers are solely responsible for any import duties, customs fees, VAT taxes, brokerage fees, or additional charges imposed by their country or local government. These fees are not included in the product or shipping price unless specifically stated otherwise. Retrofit Creations is not responsible for delays caused by customs processing or international import procedures.
          </p>
        </NamedSection>

        <NamedSection title="Order Processing">
          <p>
            Orders are typically processed in the order they are received. Processing times may vary depending on product availability, production requirements, and order volume. Custom-made or made-to-order products may require additional production time before shipment.
          </p>
        </NamedSection>

        <NamedSection title="Tracking Information">
          <p>
            Once an order has shipped, customers will receive shipment tracking information when available through the selected carrier. It is the customer&apos;s responsibility to ensure that the shipping address provided at checkout is accurate and complete.
          </p>
        </NamedSection>
      </section>

      {/* ── Return Policy ────────────────────────────────────────── */}
      <section className="mt-16 pt-12 border-t border-[#E8E8E8]">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black mb-4">
          Return Policy
        </h2>

        <NamedSection title="Return Policy for Non-Custom Products">
          <p>
            Non-custom and non-personalized items may be returned within 30 days of confirmed delivery. To qualify for a return, the item must be unused, uninstalled, unmodified, and in its original condition without damage or excessive wear. Items that are broken, damaged, altered, or show signs of use may not qualify for a refund or exchange.
          </p>
        </NamedSection>

        <NamedSection title="Return Shipping Costs">
          <p>
            Customers are responsible for all return shipping costs unless the return is the direct result of an error made by Retrofit Creations, such as receiving the wrong item or receiving a defective product due to manufacturing error. We recommend using a trackable shipping service for all returns, as Retrofit Creations is not responsible for lost return shipments.
          </p>
        </NamedSection>

        <NamedSection title="Custom &amp; Personalized Products">
          <p>
            All custom-made, personalized, engraved, modified, or made-to-order items are non-refundable and non-returnable. Due to the unique nature of custom products, all sales for these items are considered final once production has begun.
          </p>
        </NamedSection>

        <NamedSection title="Damaged or Incorrect Orders">
          <p>
            If a customer receives a damaged, defective, or incorrect item, they must contact Retrofit Creations within a reasonable timeframe after delivery with photographs and order details so the issue can be reviewed and resolved.
          </p>
        </NamedSection>
      </section>

      {/* ── Policy Updates ───────────────────────────────────────── */}
      <section className="mt-16 pt-12 border-t border-[#E8E8E8]">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black mb-4">
          Policy Updates
        </h2>
        <div className="space-y-4 text-[#333] leading-relaxed font-body text-base">
          <p>
            Retrofit Creations reserves the right to modify or update these policies at any time without prior notice. Updated policies will be posted on the company website and become effective immediately upon posting.
          </p>
          <p>
            By placing an order with Retrofit Creations, customers acknowledge and agree to the policies outlined above.
          </p>
        </div>
      </section>
    </article>
  );
}
