/*
  Services page — light-body theme (PRD v1.2.0).
*/
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

/*
  Single shared icon renderer for every service card. Matches the homepage
  category-card icon set (same outline style, same stroke, same brand-blue)
  so the two pages feel like one consistent system.
*/
type IconKey =
  | "sparkles"
  | "cube"
  | "cog"
  | "bulb"
  | "wrench"
  | "stack"
  | "chat";

function ServiceIcon({ name }: { name: IconKey }) {
  const common = {
    className: "w-7 h-7 text-brand-blue",
    fill: "none" as const,
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true,
  };
  switch (name) {
    case "sparkles":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      );
    case "cog":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437" />
        </svg>
      );
    case "stack":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      );
  }
}

const SERVICES: {
  id: string;
  name: string;
  description: string;
  turnaround: string;
  iconKey: IconKey;
  highlights: string[];
}[] = [
  {
    id: "laser-engraving",
    name: "Laser Engraving",
    description: "Custom text, logos, and artwork on virtually any material. Wood, metal, leather, acrylic, glass, and more. If it fits under the machine, we can engrave it.",
    turnaround: "3–7 business days",
    iconKey: "sparkles",
    highlights: ["Custom text & logos", "Any flat material", "Photo-quality detail", "Gifts & automotive"],
  },
  {
    id: "3d-printing",
    name: "3D Printing",
    description: "Functional prototypes and custom parts. From small brackets to complex assemblies — printed in the material that best fits your application.",
    turnaround: "5–10 business days",
    iconKey: "cube",
    highlights: ["Functional parts", "Multiple materials", "Engineering-grade", "Brackets to assemblies"],
  },
  {
    id: "cnc-carving",
    name: "CNC Carving",
    description: "Precision carving in wood, plastics, soft metals, and composites. Perfect for signs, panels, decorative pieces, and structural components requiring tight tolerances.",
    turnaround: "7–14 business days",
    iconKey: "cog",
    highlights: ["Wood & plastics", "Tight tolerances", "Decorative & structural", "Signs & panels"],
  },
  {
    id: "prototyping",
    name: "Product Prototyping",
    description: "Rapid prototyping for inventors, startups, and hobbyists. Bring your idea as a sketch, CAD file, or concept — we'll help you get to a testable prototype fast.",
    turnaround: "Varies by complexity",
    iconKey: "bulb",
    highlights: ["Sketch to prototype", "CAD design assist", "Fast iteration", "Inventors & startups"],
  },
  {
    id: "custom-auto",
    name: "Custom Automotive Trim & Accessories",
    description: "Replacement and bespoke trim pieces for any vehicle, any year. Interior and exterior. Whether you're restoring a classic or upgrading a modern build, we've got you.",
    turnaround: "7–14 business days",
    iconKey: "wrench",
    highlights: ["Any make & model", "Interior & exterior", "Classic restorations", "Modern upgrades"],
  },
  {
    id: "bulk-orders",
    name: "Bulk & Custom Orders",
    description: "Volume production runs for businesses, events, and resellers. Car clubs, corporate gifts, vendor merchandise, and promotional items. Pricing scales with quantity.",
    turnaround: "Quote-based timeline",
    iconKey: "stack",
    highlights: ["Volume pricing", "Car clubs & events", "Corporate gifts", "Consistent quality"],
  },
  {
    id: "design-consultation",
    name: "Design Consultation",
    description: "Not sure how to get your idea manufactured? We'll work with you from concept to design to production. Collaborative, hands-on, and focused on making it real.",
    turnaround: "Schedule a call",
    iconKey: "chat",
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
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 border border-brand-blue/15 flex items-center justify-center flex-shrink-0">
                <ServiceIcon name={svc.iconKey} />
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
