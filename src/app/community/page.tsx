/*
  Community page — showcases customer projects, events, and builds.
  PRD Section 5.5
*/
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const POSTS = [
  { id: 1, type: "showcase", title: "Custom 3D Printed Dash — '69 Camaro", author: "Mike T.", description: "Full custom dash bracket set, printed in matte black PETG to match the interior. Measured from OEM templates, perfect fitment first try. Hailie knocked it out of the park." },
  { id: 2, type: "showcase", title: "Laser Engraved Center Console — Ford Bronco", author: "Sarah K.", description: "Intricate geometric pattern engraved on the factory console lid. The depth and detail are incredible. It looks like it came from the factory." },
  { id: 3, type: "event", title: "2025 San Diego Auto Show", author: "Retrofit Creations", description: "Huge turnout at our booth! Met so many amazing builders and enthusiasts from across SoCal. See you at the next one." },
  { id: 4, type: "featured", title: "Custom Keychain Set — Porsche Club of America", author: "James R.", description: "Matching set of 40 laser engraved keychains for our PCA chapter. Every single one came out perfectly. The club was blown away." },
  { id: 5, type: "build", title: "Turbo K-Swap Build Brackets — '88 CRX", author: "Diego V.", description: "Custom fabricated turbo bracket and intercooler mount for a K-swap CRX build. Tight quarters, perfect fitment. This is why you go custom." },
  { id: 6, type: "showcase", title: "Engraved Leather Shift Boot — '72 Nova", author: "Rick M.", description: "Hand-engraved leather shift boot with the Super Sport logo. It's the kind of detail that makes a restoration complete." },
  { id: 7, type: "event", title: "Barrio Logan Car Show — March 2025", author: "Retrofit Creations", description: "Incredible atmosphere at Barrio Logan. Live music, amazing cars, and great conversations with the community. Can't wait to be back." },
  { id: 8, type: "build", title: "Custom Center Cap Set — '63 Impala Lowrider", author: "Luis A.", description: "6 matching custom center caps with engraved family crest design. This is the kind of project that reminds us why we do what we do." },
];

const badgeVariant = (type: string) => {
  if (type === "featured") return "default" as const;
  if (type === "event") return "warning" as const;
  return "outline" as const;
};

export default function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <SectionHeading
          title="Community"
          subtitle="Real builds, real customers, real craftsmanship. This is what Retrofit Creations is all about."
        />
        <Button variant="primary" size="sm" href="/contact">
          Share Your Build →
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Showcase", "Featured Builds", "Events"].map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 rounded-full text-sm font-heading font-semibold uppercase tracking-wider border transition-colors
              border-brand-blue/20 text-zinc-400 hover:border-brand-blue/50 hover:text-brand-blue first:bg-brand-blue first:text-white first:border-brand-blue"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Masonry-style grid (CSS columns) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {POSTS.map((post) => (
          <div key={post.id} className="break-inside-avoid">
            <Card className="p-5 flex flex-col gap-3">
              {/* Photo placeholder */}
              <div
                className="w-full bg-zinc-900 rounded border border-brand-blue/10 flex items-center justify-center"
                style={{ height: `${140 + (post.id % 3) * 60}px` }}
              >
                <span className="text-zinc-600 text-xs font-heading uppercase tracking-wider">
                  {post.type === "event" ? "Event Photo" : "Project Photo"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant={badgeVariant(post.type)}>{post.type}</Badge>
                <span className="text-zinc-500 text-xs font-body">{post.author}</span>
              </div>
              <h3 className="font-heading font-semibold uppercase tracking-wide text-brand-white text-sm">
                {post.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-body">{post.description}</p>
            </Card>
          </div>
        ))}
      </div>

      {/* Submit CTA */}
      <div className="mt-16 text-center p-10 bg-brand-blue/5 border border-brand-blue/20 rounded-xl">
        <h3 className="font-heading text-2xl font-bold uppercase tracking-widest text-brand-white mb-3">
          Got a Build to Show Off?
        </h3>
        <p className="text-zinc-400 mb-6 font-body max-w-lg mx-auto">
          Share your project with the community. Submit photos and a description — if we feature it, you&apos;ll get credit and a shoutout.
        </p>
        <Button variant="primary" size="lg" href="/contact">
          Submit Your Project
        </Button>
      </div>
    </div>
  );
}
