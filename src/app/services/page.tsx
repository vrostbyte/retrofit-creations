/*
  Services page — light-body theme (PRD v1.2.0).
*/
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const SERVICES = [
  {
    id: "laser-engraving",
    name: "Laser Engraving",
    description: "Custom text, logos, and artwork on virtually any material. Wood, metal, leather, acrylic, glass, and more. If it fits under the machine, we can engrave it.",
    turnaround: "3–7 business days",
    icon: "✦",
    highlights: ["Custom text & logos", "Any flat material", "Photo-quality detail", "Gifts & automotive"],
  },
  {
    id: "3d-printing",
    name: "3D Printing",
    description: "FDM and resin printing for functional parts, prototypes, and custom designs. From small brackets to complex assemblies — printed in the material that best fits your application.",
    turnaround: "5–10 business days",
    icon: "⬡",
    highlights: ["FDM & resin options", "Functional parts", "Multiple materials", "Engineering-grade"],
  },
  {
    id: "cnc-carving",
    name: "CNC Carving",
    description: "Precision carving in wood, plastics, soft metals, and composites. Perfect for signs, panels, decorative pieces, and structural components requiring tight tolerances.",
    turnaround: "7–14 business days",
    icon: "⚙",
    highlights: ["Wood & plastics", "Tight tolerances", "Decorative & structural", "Signs & panels"],
  },
  {
    id: "prototyping",
    name: "Product Prototyping",
    description: "Rapid prototyping for inventors, startups, and hobbyists. Bring your idea as a sketch, CAD file, or concept — we'll help you get to a testable prototype fast.",
    turnaround: "Varies by complexity",
    icon: "◈",
    highlights: ["Sketch to prototype", "CAD design assist", "Fast iteration", "Inventors & startups"],
  },
  {
    id: "custom-auto",
    name: "Custom Automotive Trim & Accessories",
    description: "Replacement and bespoke trim pieces for any vehicle, any year. Interior and exterior. Whether you're restoring a classic or upgrading a modern build, we've got you.",
    turnaround: "7–14 business days",
    icon: "🔧",
    highlights: ["Any make & model", "Interior & exterior", "Classic restorations", "Modern upgrades"],
  },
  {
    id: "bulk-orders",
    name: "Bulk & Custom Orders",
    description: "Volume production runs for businesses, events, and resellers. Car clubs, corporate gifts, vendor merchandise, and promotional items. Pricing scales with quantity.",
    turnaround: "Quote-based timeline",
    icon: "⬛",
    highlights: ["Volume pricing", "Car clubs & events", "Corporate gifts", "Consistent quality"],
  },
  {
    id: "design-consultation",
    name: "Design Consultation",
    description: "Not sure how to get your idea manufactured? We'll work with you from concept to design to production. Collaborative, hands-on, and focused on making it real.",
    turnaround: "Schedule a call",
    icon: "◎",
    highlights: ["Concept to CAD", "Manufacturability review", "Collaborative process", "All experience levels"],
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeading
        title="Our Services"
        subtitle="Precision fabrication across every medium. If you can imagine it, we can build it."
        className="mb-4"
      />
      <p className="text-gray-500 text-sm mb-12 font-body">
        All turnaround times are estimates. Contact us for rush orders or complex projects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES.map((svc) => (
          <Card key={svc.id} className="p-8 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 border border-brand-blue/15 flex items-center justify-center text-2xl flex-shrink-0">
                {svc.icon}
              </div>
              <div>
                <h2 id={svc.id} className="font-heading font-bold text-xl uppercase tracking-wide text-black">
                  {svc.name}
                </h2>
                <span className="text-brand-blue text-xs font-heading uppercase tracking-wider">
                  Est. turnaround: {svc.turnaround}
                </span>
              </div>
            </div>

            <p className="text-[#555555] leading-relaxed font-body">{svc.description}</p>

            <ul className="grid grid-cols-2 gap-y-1.5 gap-x-4">
              {svc.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-gray-700 font-body">
                  <span className="w-1 h-1 rounded-full bg-brand-blue flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-2">
              <Button variant="secondary" size="sm" href={`/contact?service=${svc.id}`}>
                Request a Quote
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center p-10 bg-brand-blue/5 border border-brand-blue/15 rounded-xl">
        <h3 className="font-heading text-2xl font-bold uppercase tracking-widest text-black mb-3">
          Not Sure Which Service You Need?
        </h3>
        <p className="text-[#555555] mb-6 font-body">
          Describe your project and we&apos;ll recommend the right approach.
        </p>
        <Button variant="primary" size="lg" href="/contact">
          Tell Us About Your Project
        </Button>
      </div>
    </div>
  );
}
