/*
  Terms of Service (/terms) — combines two source documents:
    Doc 1: Terms & Conditions of Sale (Global)
    Doc 2: Terms of Service Clauses
  separated by a clear visual divider.

  Light-body theme: white background, dark text, Inter body / Oswald headings.
  Section numbering follows the source documents exactly. Apostrophes are
  escaped as &apos; per the project's react/no-unescaped-entities lint rule.
*/
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Retrofit Creations",
  description:
    "Retrofit Creations Terms of Service, including Terms & Conditions of Sale (Global) and Terms of Service Clauses.",
};

/*
  Small helper components keep section structure consistent and the page
  readable. Headings use Oswald (font-heading) via the global heading
  styles; body paragraphs use Inter (font-body).
*/
function NumberedSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="font-heading text-base sm:text-lg font-semibold tracking-wide text-black mb-3">
        {number}. {title}
      </h3>
      <div className="space-y-4 text-[#333] leading-relaxed font-body text-base">
        {children}
      </div>
    </section>
  );
}

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

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* ── Page header ──────────────────────────────────────────── */}
      <header className="mb-12 border-b border-[#E8E8E8] pb-8">
        <p className="text-brand-blue font-heading text-xs uppercase tracking-[0.2em] mb-3">
          Legal
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest text-black leading-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-[#555] font-body">Last updated: May 2026</p>
      </header>

      {/* ════════════════════════════════════════════════════════════
           DOCUMENT 1 — Terms & Conditions of Sale (Global)
         ════════════════════════════════════════════════════════════ */}
      <section>
        <header className="mb-6">
          <p className="text-xs font-heading uppercase tracking-[0.2em] text-[#777] mb-2">
            Document 1
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black mb-1">
            Retrofit Creations, LLC
          </h2>
          <p className="font-heading text-lg sm:text-xl font-semibold uppercase tracking-wider text-brand-blue">
            Terms &amp; Conditions of Sale (Global)
          </p>
        </header>

        <div className="space-y-4 text-[#333] leading-relaxed font-body text-base">
          <p>
            These Terms &amp; Conditions of Sale (&ldquo;Terms&rdquo;) govern all sales of products by Retrofit Creations, LLC (&ldquo;Retrofit Creations,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) to any purchaser, dealer, distributor, installer, or end user (&ldquo;Customer,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;), regardless of sales channel or destination country.
          </p>
          <p>
            By placing an order, accepting delivery, or using any product, you agree to be bound by these Terms.
          </p>
        </div>

        <NumberedSection number="1" title="Product Nature and Intended Use">
          <p>
            All Retrofit Creations products are designed, manufactured, and sold solely as decorative and cosmetic trim components. Products are non-structural and non-functional with respect to mechanical or safety performance.
          </p>
          <p>
            Products are not designed, tested, certified, or approved for use in engines (internal combustion or electric), braking systems, suspension systems, steering systems, powertrain assemblies, structural or load-bearing applications, or any safety-critical system.
          </p>
          <p>Any use outside the intended decorative purpose constitutes misuse.</p>
        </NumberedSection>

        <NumberedSection number="2" title="Orders and Acceptance">
          <p>
            All quotations and listings are invitations to treat. Orders are offers subject to acceptance by Retrofit Creations. Acceptance occurs upon written confirmation or shipment.
          </p>
          <p>
            We reserve the right to cancel or reject orders due to availability, pricing errors, compliance concerns, or suspected misuse.
          </p>
        </NumberedSection>

        <NumberedSection number="3" title="Pricing, Taxes, and Payment">
          <p>
            Prices are subject to change without notice. Prices exclude taxes, duties, customs fees, and other governmental charges unless expressly stated.
          </p>
          <p>Payment must be received prior to shipment unless otherwise agreed in writing.</p>
        </NumberedSection>

        <NumberedSection number="4" title="Shipping, Delivery, and Risk of Loss">
          <p>
            Delivery dates are estimates only. Risk of loss transfers to the Customer upon transfer to the carrier, except where mandatory law provides otherwise.
          </p>
        </NumberedSection>

        <NumberedSection number="5" title="Inspection and Returns">
          <p>
            Products must be inspected promptly upon receipt. Return authorization is required for all returns. Returned products must be unused and in original condition.
          </p>
        </NumberedSection>

        <NumberedSection number="6" title="Limited Warranty — Decorative Use Only">
          <p>
            Products are warranted to be free from manufacturing defects when used solely for their intended decorative purpose. Warranty is void upon misuse, modification, or prohibited use.
          </p>
          <p>
            All implied warranties are disclaimed to the maximum extent permitted by law. Where disclaimers are restricted, implied warranties are limited to the minimum duration and scope allowed and apply only to decorative use.
          </p>
        </NumberedSection>

        <NumberedSection number="7" title="Limitation of Liability">
          <p>
            To the maximum extent permitted by law, Retrofit Creations shall not be liable for indirect, incidental, special, consequential, or punitive damages.
          </p>
          <p>Total liability shall not exceed the amount paid for the product giving rise to the claim.</p>
        </NumberedSection>

        <NumberedSection number="8" title="Dealer and Installer Obligations">
          <p>
            Dealers and installers must accurately represent products as decorative trim only and must not recommend or install products in prohibited applications.
          </p>
          <p>
            Dealers and installers agree to indemnify Retrofit Creations from claims arising out of misuse, misrepresentation, or improper installation.
          </p>
        </NumberedSection>

        <NumberedSection number="9" title="Export and International Compliance">
          <p>
            Buyers are responsible for compliance with export, import, customs, and regulatory requirements in all jurisdictions.
          </p>
        </NumberedSection>

        <NumberedSection number="10" title="Product Marking and Warnings">
          <p>
            Products may include permanent markings or packaging warnings indicating decorative use only. Local translation of warnings is the responsibility of distributors where required by law.
          </p>
        </NumberedSection>

        <NumberedSection number="11" title="Intellectual Property">
          <p>All intellectual property remains the exclusive property of Retrofit Creations.</p>
        </NumberedSection>

        <NumberedSection number="12" title="Force Majeure">
          <p>
            Retrofit Creations is not liable for delays caused by events beyond its reasonable control.
          </p>
        </NumberedSection>

        <NumberedSection number="13" title="Consumer Rights">
          <p>Nothing in these Terms excludes non-waivable consumer rights under applicable law.</p>
        </NumberedSection>

        <NumberedSection number="14" title="Governing Law">
          <p>
            These Terms shall be governed by the laws applicable in the jurisdiction where Retrofit Creations is organized, subject to mandatory local consumer laws.
          </p>
        </NumberedSection>

        <NumberedSection number="15" title="Severability and Entire Agreement">
          <p>
            If any provision is unenforceable, the remainder shall remain in effect. These Terms constitute the entire agreement regarding sale and use of the products.
          </p>
        </NumberedSection>
      </section>

      {/* ── Visual divider between Doc 1 and Doc 2 ──────────────── */}
      <div className="my-16 flex items-center gap-4" aria-hidden="true">
        <div className="flex-1 h-px bg-[#E8E8E8]" />
        <span className="font-heading text-xs uppercase tracking-[0.3em] text-[#999]">
          Document 2
        </span>
        <div className="flex-1 h-px bg-[#E8E8E8]" />
      </div>

      {/* ════════════════════════════════════════════════════════════
           DOCUMENT 2 — Terms of Service Clauses
         ════════════════════════════════════════════════════════════ */}
      <section>
        <header className="mb-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black">
            Terms of Service Clauses
          </h2>
        </header>

        <NamedSection title="Intellectual Property Rights">
          <p>
            All products, product designs, artwork, engravings, mockups, renderings, digital files, CAD models, scans, photographs, branding, logos, website content, manufacturing methods, concepts, and visual materials created, produced, displayed, or sold by Retrofit Creations remain the sole intellectual property of Retrofit Creations unless otherwise agreed to in writing.
          </p>
          <p>
            No product, design, engraving, file, image, or manufactured item may be copied, reproduced, distributed, modified, resold, reverse engineered, commercially manufactured, or replicated without prior written permission from Retrofit Creations.
          </p>
          <p>
            Retrofit Creations reserves the right to display, photograph, advertise, reproduce, and promote completed custom products and customer projects for marketing, portfolio, social media, website, and promotional purposes unless otherwise agreed to in writing before production begins.
          </p>
        </NamedSection>

        <NamedSection title="Customer-Supplied Files, Designs &amp; Parts">
          <p>
            Customers submitting STL files, CAD files, STEP files, measurements, technical drawings, artwork, photographs, reference materials, or physical parts for scanning, reproduction, modification, or manufacturing acknowledge and agree that:
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-brand-blue">
            <li>The customer is solely responsible for ensuring all submitted files, dimensions, measurements, tolerances, and specifications are accurate and complete.</li>
            <li>Retrofit Creations manufactures products based on the exact specifications, dimensions, files, and/or physical reference items provided by the customer.</li>
            <li>Retrofit Creations is not responsible for inaccuracies, fitment issues, dimensional errors, scaling issues, tolerance stacking, design flaws, material limitations, or functional failures resulting from customer-provided information or reference materials.</li>
            <li>Physical items submitted for scanning or reproduction may contain wear, warping, damage, manufacturing inconsistencies, deformation, shrinkage, age-related changes, or prior modifications that may affect the final manufactured product.</li>
            <li>Retrofit Creations may verify dimensions and tolerances during production; however, the final product will generally reflect the original customer-supplied specifications, scans, or reference materials unless otherwise discussed and approved.</li>
            <li>Customers are responsible for verifying compatibility, intended use, safety, and final application prior to installation or use.</li>
          </ul>
        </NamedSection>

        <NamedSection title="Third-Party Intellectual Property">
          <p>
            By submitting files, logos, trademarks, artwork, products, or reference materials to Retrofit Creations, the customer confirms they own or possess legal authorization to use, reproduce, manufacture, or modify the submitted content.
          </p>
          <p>
            Customers agree not to submit copyrighted, trademarked, patented, or otherwise protected materials without proper authorization.
          </p>
          <p>
            Retrofit Creations assumes no responsibility or liability for copyright infringement, trademark infringement, patent disputes, unauthorized reproductions, or intellectual property violations resulting from customer-submitted content.
          </p>
          <p>
            Retrofit Creations reserves the right to refuse any project, request, design, or reproduction at its sole discretion.
          </p>
        </NamedSection>

        <NamedSection title="Custom Manufacturing &amp; Handmade Variations">
          <p>
            Many products sold by Retrofit Creations are custom-made, made-to-order, hand-finished, laser engraved, 3D printed, CNC machined, scanned, or otherwise individually manufactured.
          </p>
          <p>
            Due to the nature of custom manufacturing processes, minor variations may occur, including but not limited to: engraving depth, finish appearance, material texture, alignment, anodized color tone, surface markings, dimensional tolerances, layer lines, and handmade finishing differences.
          </p>
          <p>These variations are considered normal and are not considered defects.</p>
        </NamedSection>

        <NamedSection title="Automotive Product Disclaimer">
          <p>
            Automotive products manufactured or sold by Retrofit Creations may be intended for off-road, show, restoration, collector, prototype, or custom-use applications only unless otherwise specifically stated.
          </p>
          <p>Customers are responsible for ensuring all products are installed properly and used safely.</p>
          <p>
            Retrofit Creations makes no guarantee that products meet OEM standards, DOT standards, federal regulations, emissions requirements, inspection requirements, or vehicle manufacturer specifications unless explicitly stated in writing.
          </p>
          <p>Customers assume all risks associated with installation and use of automotive products.</p>
        </NamedSection>

        <NamedSection title="Product Fitment Disclaimer">
          <p>
            Vehicle manufacturers, especially vintage and classic vehicle manufacturers, often produced parts with inconsistencies, running changes, and dimensional variations.
          </p>
          <p>
            Customers acknowledge that fitment adjustments, sanding, trimming, shimming, drilling, or finishing may occasionally be required during installation.
          </p>
          <p>
            Retrofit Creations does not guarantee perfect fitment for every application, vehicle, or production variation unless explicitly stated.
          </p>
        </NamedSection>

        <NamedSection title="Limitation of Liability">
          <p>
            To the fullest extent permitted by law, Retrofit Creations shall not be liable for any indirect, incidental, consequential, special, punitive, or exemplary damages arising from the use, misuse, installation, manufacture, reproduction, scanning, modification, or inability to use any product or service.
          </p>
          <p>
            This includes but is not limited to: vehicle damage, mechanical failure, loss of business, lost profits, labor costs, installation costs, shipping damage, personal injury, property damage, data loss, and manufacturing downtime.
          </p>
          <p>
            Maximum liability for any claim related to a product or service shall not exceed the original purchase price paid to Retrofit Creations for that specific item or service.
          </p>
        </NamedSection>

        <NamedSection title="Assumption of Risk">
          <p>
            Customers acknowledge that custom-manufactured products, automotive components, and modified parts may carry inherent risks.
          </p>
          <p>
            By purchasing or using products from Retrofit Creations, customers voluntarily assume all risks associated with installation, operation, modification, transportation, and use.
          </p>
        </NamedSection>

        <NamedSection title="No Warranty">
          <p>
            Unless explicitly stated otherwise in writing, all products and services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied.
          </p>
          <p>
            Retrofit Creations disclaims all implied warranties, including but not limited to: merchantability, fitness for a particular purpose, durability, compatibility, and non-infringement.
          </p>
        </NamedSection>

        <NamedSection title="Right to Refuse Service">
          <p>
            Retrofit Creations reserves the right to refuse, cancel, or discontinue any order, project, design request, reproduction request, or service at any time and for any reason.
          </p>
        </NamedSection>

        <NamedSection title="Digital Files &amp; STL Usage">
          <p>
            Any STL files, CAD files, digital downloads, mockups, renderings, or design files provided by Retrofit Creations are licensed for personal use only unless otherwise agreed to in writing.
          </p>
          <p>
            Customers may not: redistribute files, resell files, share files publicly, commercially manufacture products from provided files, upload files to third-party marketplaces, or claim designs as their own without written permission from Retrofit Creations.
          </p>
        </NamedSection>

        <NamedSection title="Shipping &amp; Damage Claims">
          <p>Customers are responsible for inspecting products upon delivery.</p>
          <p>
            Any shipping damage, missing items, or incorrect orders must be reported within a specified number of days after delivery.
          </p>
          <p>
            Retrofit Creations is not responsible for carrier delays, customs delays, import fees, duties, taxes, or lost packages once shipments have been transferred to the shipping carrier.
          </p>
        </NamedSection>

        <NamedSection title="Governing Law">
          <p>
            These Terms of Service shall be governed by and interpreted under the laws of the State of California, United States, without regard to conflict of law principles.
          </p>
        </NamedSection>
      </section>
    </article>
  );
}
