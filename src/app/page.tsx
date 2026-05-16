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

const categories = [
  { slug: "automotive-parts", label: "Custom Automotive Parts", icon: "🔧", description: "Brackets, trim, knobs, and bespoke components for any build" },
  { slug: "3d-printed-parts", label: "3D Printed Parts", icon: "⚙️", description: "FDM & resin prints engineered for fit, function, and form" },
  { slug: "laser-engraved", label: "Laser Engraved Items", icon: "✦", description: "Precision engraving on wood, metal, leather, acrylic, and more" },
  { slug: "personalized-gifts", label: "Personalized Gifts", icon: "🎁", description: "One-of-a-kind gifts for enthusiasts, collectors, and creators" },
  { slug: "event-vendor", label: "Event / Vendor Items", icon: "🏁", description: "Custom pieces for car shows, markets, and special events" },
  { slug: "zyn-tins", label: "Custom Zyn Tins", icon: "⬡", description: "Personalized and custom-designed Zyn tins" },
];

const services = [
  { slug: "laser-engraving", label: "Laser Engraving", description: "Custom text, logos, and artwork on virtually any material" },
  { slug: "3d-printing", label: "3D Printing", description: "Functional prototypes and custom parts, FDM & resin" },
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
            Custom fabrication, laser engraving, 3D printing, and CNC work — crafted by hand in San Diego, CA for car enthusiasts and makers who settle for nothing less.
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
              <div className="text-3xl mb-4">{cat.icon}</div>
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
