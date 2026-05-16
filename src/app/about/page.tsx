/*
  About Us page — light-body theme (PRD v1.2.0).
  Hero: kept dark for dramatic branding effect (acceptable per PRD).
  All body sections: white/light backgrounds.
*/
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const VALUES = [
  { label: "Craftsmanship", description: "Every piece is made with care. We check tolerances, test fits, and won't ship anything we wouldn't use ourselves." },
  { label: "Precision", description: "Laser accuracy isn't a phrase — it's our baseline. From the first micron of the engraver to the final calibration of the printer." },
  { label: "Community", description: "We're car people. We show up to the meets, we know the clubs, and we build for the culture — not just the commerce." },
  { label: "Made to Order", description: "No inventory of generic parts. Every piece is made specifically for you, to your spec, with your name on it." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero — Light Theme (PRD v1.2.1) */}
      <section className="relative py-24 bg-[#F8F8F8] border-b border-[#E8E8E8] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-blue font-heading text-sm uppercase tracking-[0.2em] mb-4">San Diego, CA</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest text-black leading-tight mb-6">
            Built Different.
            <br />
            <span className="text-brand-blue">Made to Stand Out.</span>
          </h1>
          <p className="text-[#555] text-xl leading-relaxed font-body max-w-2xl">
            Retrofit Creations is a custom fabrication operation run by people who are obsessed with cars, craftsmanship, and getting the details exactly right.
          </p>
        </div>
      </section>

      {/* Origin Story — white bg */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <SectionHeading title="Our Story" className="mb-8" />
        <div className="space-y-6 text-[#555555] leading-relaxed font-body text-lg">
          <p>
            Retrofit Creations started in a San Diego garage with a single laser engraver, a 3D printer, and a problem to solve: there was a specific part needed for a personal build that didn&apos;t exist in any catalog. So we made it.
          </p>
          <p>
            The part worked. The fit was perfect. Word got out. A few builds later, what started as a one-time solution had become something real — a fabrication operation where car enthusiasts could get exactly what they needed, made to order, without settling for an off-the-shelf compromise.
          </p>
          <p>
            Today, Retrofit Creations serves customers across the country. The equipment has grown — the CNC, the resin printer, the bigger laser. But the philosophy hasn&apos;t changed: every piece is made with the same care we&apos;d put into our own builds.
          </p>
        </div>
      </section>

      {/* Values — light gray bg */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What We Stand For" centered className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {VALUES.map((v) => (
              <div key={v.label} className="flex gap-4">
                <div className="w-1 bg-brand-blue rounded-full flex-shrink-0 self-stretch" />
                <div>
                  <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-black mb-2">
                    {v.label}
                  </h3>
                  <p className="text-[#555555] leading-relaxed font-body">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop — white bg */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading title="The Workshop" className="mb-6" />
            <div className="space-y-4 text-[#555555] leading-relaxed font-body">
              <p>The shop runs a mix of industrial and hobbyist-grade equipment, chosen for reliability and output quality:</p>
              <ul className="space-y-2 text-sm">
                {["CO₂ laser engraver — 60W, full-bed format", "FDM 3D printer — multi-material, large format", "Resin 3D printer — engineering-grade precision", "CNC router — wood, plastics, soft metals", "Hand tools, heat guns, post-processing station"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Workshop photo placeholder */}
          <div className="aspect-video bg-gray-100 rounded-xl border border-[#E8E8E8] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚙</span>
              </div>
              <span className="text-gray-400 text-sm font-heading uppercase tracking-wider">Workshop Photos</span>
              <p className="text-gray-400 text-xs mt-1">Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — blue-tinted strip */}
      <section className="py-16 bg-brand-blue/5 border-y border-brand-blue/15">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-widest text-black mb-4">
            Ready to Build Something?
          </h2>
          <p className="text-[#555555] mb-8 font-body">
            Tell us what you have in mind. We&apos;ll figure out how to make it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/contact">Get a Quote</Button>
            <Button variant="secondary" size="lg" href="/products">Shop Products</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
