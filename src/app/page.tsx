/*
  Homepage — light-body theme (PRD v1.2.0).
  Hero section: kept dark (dramatic effect, one acceptable dark content section).
  All other sections: white/light backgrounds with black text.
*/
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import StarRating from "@/components/ui/StarRating";

/*
  Single shared icon renderer for every category card. All icons are
  Heroicons-style outline SVGs, identical in size, stroke width, and color
  (#0062FF / brand-blue) so the grid reads as one consistent set.
  iconKey on each category picks which path to draw.
*/
type IconKey = "wrench" | "cube" | "sparkles" | "gift" | "calendar" | "tin";

function CategoryIcon({ name }: { name: IconKey }) {
  const common = {
    className: "w-10 h-10 text-brand-blue",
    fill: "none" as const,
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": true,
  };
  switch (name) {
    case "wrench":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      );
    case "gift":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      );
    case "tin":
      /* Stacked-disks icon reads visually as a tin/puck */
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      );
  }
}

const categories: { slug: string; label: string; iconKey: IconKey; description: string }[] = [
  { slug: "automotive-parts", label: "Custom Automotive Parts", iconKey: "wrench", description: "Brackets, trim, knobs, and bespoke components for any build" },
  { slug: "3d-printed-parts", label: "3D Printed Parts", iconKey: "cube", description: "Functional prototypes and custom parts engineered for fit, function, and form" },
  { slug: "laser-engraved", label: "Laser Engraved Items", iconKey: "sparkles", description: "Precision engraving on wood, metal, leather, acrylic, and more" },
  { slug: "personalized-gifts", label: "Personalized Gifts", iconKey: "gift", description: "One-of-a-kind gifts for enthusiasts, collectors, and creators" },
  { slug: "event-vendor", label: "Event / Vendor Items", iconKey: "calendar", description: "Custom pieces for car shows, markets, and special events" },
  { slug: "zyn-tins", label: "Custom Zyn Tins", iconKey: "tin", description: "Personalized and custom-designed Zyn tins" },
];

const services = [
  { slug: "laser-engraving", label: "Laser Engraving", description: "Custom text, logos, and artwork on virtually any material" },
  { slug: "3d-printing", label: "3D Printing", description: "Functional prototypes and custom parts" },
  { slug: "cnc-carving", label: "CNC Carving", description: "Precision carving in wood, plastics, soft metals, and composites" },
  { slug: "custom-auto", label: "Custom Auto Parts", description: "Replacement and bespoke trim for any vehicle, any year" },
];

const communityPosts = [
  { id: 1, title: "Custom 3D Printed Dash — '69 Camaro", author: "Mike T.", type: "showcase", description: "Full custom dash bracket set, printed in matte black PETG to match the interior. Perfect fitment." },
  { id: 2, title: "Laser Engraved Center Console — Ford Bronco", author: "Sarah K.", type: "showcase", description: "Intricate geometric pattern engraved on the factory console lid. Looks incredible in person." },
  { id: 3, title: "2025 San Diego Auto Show Booth", author: "Retrofit Creations", type: "event", description: "Huge turnout at our booth! Met so many amazing builders and enthusiasts from across SoCal." },
  { id: 4, title: "Custom Keychain Set — Porsche 911", author: "James R.", type: "featured", description: "Matching set of laser engraved keychains for a Porsche club member. They were a hit at the meetup." },
];

const testimonials = [
  { id: 1, quote: "Hailie built a custom dash bracket for my '69 Camaro that fit perfectly on the first print. Insane quality for the price. Will never go anywhere else.", author: "Mike T.", rating: 5, project: "3D Printed Parts" },
  { id: 2, quote: "Ordered a laser engraved keychain as a gift and it blew everyone away. The detail was unreal. Fast turnaround too — had it in 4 days.", author: "Jessica M.", rating: 5, project: "Laser Engraving" },
  { id: 3, quote: "Got a custom Zyn tin made with my car club logo. It was the hit of the meetup. Already ordered 20 more for the whole crew.", author: "Carlos D.", rating: 5, project: "Custom Zyn Tins" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── 1. Hero — Light Theme (PRD v1.2.1) ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#F8F8F8] border-b border-[#E8E8E8]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/RC-Engraving-Logo-transparent.png"
              alt="Retrofit Creations"
              width={280}
              height={100}
              className="w-48 sm:w-64 md:w-72 h-auto object-contain"
              priority
            />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest text-black mb-4 leading-tight">
            Built Different.
            <br />
            <span className="text-brand-blue">Made to Stand Out.</span>
          </h1>
          <p className="font-body text-lg sm:text-xl text-[#555] max-w-2xl mx-auto mb-10 leading-relaxed">
            Custom fabrication, laser engraving, 3D printing, and CNC work crafted by hand in San Diego, CA, for car enthusiasts by car enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/products" className="w-full sm:w-auto">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Shop Products
            </Button>
            <Button variant="primary" size="lg" href="/contact" className="w-full sm:w-auto">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Request Custom Work
            </Button>
            <Button variant="primary" size="lg" href="/community" className="w-full sm:w-auto">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Join the Community
            </Button>
          </div>
        </div>
      </section>

      {/* ── 2. Featured Categories — white bg ────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <SectionHeading
          title="Shop by Category"
          subtitle="From custom automotive parts to personalized gifts — if you can imagine it, we can make it."
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Card key={cat.slug} href={`/products?category=${cat.slug}`} className="p-6 group">
              <div className="mb-4">
                <CategoryIcon name={cat.iconKey} />
              </div>
              <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-black mb-2 group-hover:text-brand-blue transition-colors">
                {cat.label}
              </h3>
              <p className="text-[#555555] text-sm leading-relaxed font-body">{cat.description}</p>
              <div className="mt-4 text-brand-blue text-sm font-heading font-semibold uppercase tracking-wider flex items-center gap-1">
                Browse <span>→</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 3. Services Overview — light gray bg ─────────────────── */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <SectionHeading
            title="What We Do"
            subtitle="Precision craft meets custom design. Every piece made to order."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services#${svc.slug}`}
                className="group p-6 border border-[#E8E8E8] rounded-lg bg-white hover:border-brand-blue/30 hover:shadow-[0_4px_20px_rgba(0,98,255,0.08)] transition-all duration-300"
              >
                <h3 className="font-heading font-bold uppercase tracking-wide text-black mb-2 group-hover:text-brand-blue transition-colors">
                  {svc.label}
                </h3>
                <p className="text-[#555555] text-sm leading-relaxed font-body">{svc.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="secondary" href="/services">View All Services</Button>
          </div>
        </div>
      </section>

      {/* ── 4. Community Showcase — white bg ─────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <SectionHeading
            title="Community Showcase"
            subtitle="Real builds. Real customers. Real craftsmanship."
          />
          <Button variant="ghost" size="sm" href="/community">See All →</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityPosts.map((post) => (
            <Card key={post.id} className="p-5 flex flex-col gap-3">
              <div className="w-full h-40 bg-gray-100 rounded flex items-center justify-center border border-[#E8E8E8]">
                <span className="text-gray-400 text-xs font-heading uppercase tracking-wider">Photo Coming Soon</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant={post.type === "featured" ? "default" : "outline"}>{post.type}</Badge>
                <span className="text-xs text-gray-500 font-body">{post.author}</span>
              </div>
              <h4 className="font-heading font-semibold uppercase tracking-wide text-black text-sm">
                {post.title}
              </h4>
              <p className="text-[#555555] text-xs leading-relaxed font-body line-clamp-2">{post.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 5. Testimonials — light gray bg ──────────────────────── */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <SectionHeading title="What Customers Say" />
            <Button variant="ghost" size="sm" href="/testimonials">Read All Reviews →</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-6 flex flex-col gap-4">
                <StarRating rating={t.rating} size="md" />
                <blockquote className="text-gray-700 text-sm leading-relaxed font-body italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#E8E8E8]">
                  <span className="font-heading font-semibold text-sm uppercase tracking-wide text-black">
                    {t.author}
                  </span>
                  <Badge variant="outline">{t.project}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. About Preview — white bg ──────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <SectionHeading title="Our Story" className="mb-6" />
          <p className="text-[#555555] text-lg leading-relaxed font-body mb-6">
            Retrofit Creations started in a San Diego garage with a laser engraver, a 3D printer, and a passion for custom car culture. What began as making one-off parts for personal builds turned into a full fabrication operation serving enthusiasts across the country.
          </p>
          <p className="text-[#555555] leading-relaxed font-body mb-8">
            Every piece is made to order. No mass production, no cookie-cutter designs. Just precise, thoughtful fabrication for people who care about the details.
          </p>
          <Button variant="secondary" href="/about">Learn More About Us</Button>
        </div>
      </section>

      {/* ── 7. Custom Quote CTA — blue-tinted strip ──────────────── */}
      <section className="py-16 bg-brand-blue/5 border-y border-brand-blue/15">
        <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-widest text-black mb-4">
            Have a Custom Project in Mind?
          </h2>
          <p className="text-[#555555] text-lg mb-8 font-body">
            Tell us what you&apos;re building. We&apos;ll make it happen.
          </p>
          <Button variant="primary" size="lg" href="/contact">Get a Free Quote</Button>
        </div>
      </section>
    </div>
  );
}
