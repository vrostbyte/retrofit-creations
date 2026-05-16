/*
  Product Detail page — /products/[slug]

  Shows: image gallery, name, price, description, quantity selector,
  Add to Cart + Customize This buttons, related products.

  Note: In Next.js 16, params is a Promise — must be awaited.
  This page uses static placeholder data for Phase 1.
*/
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import StarRating from "@/components/ui/StarRating";
import SectionHeading from "@/components/ui/SectionHeading";
import AddToCartSection from "@/components/products/AddToCartSection";

/* Minimal product lookup — Phase 2 will fetch from Supabase by slug */
const PRODUCT_DATA: Record<string, {
  name: string;
  price: number;
  category: string;
  description: string;
  isCustomizable: boolean;
  rating: number;
  reviews: number;
}> = {
  "custom-dash-bracket-69-camaro": {
    name: "Custom 3D Printed Dash Bracket — '69 Camaro",
    price: 48.00,
    category: "Automotive Parts",
    description: "Precision engineered dash bracket designed specifically for the 1969 Camaro. Printed in matte black PETG for durability and heat resistance. Perfect fitment guaranteed — or we reprint it.",
    isCustomizable: false,
    rating: 5,
    reviews: 12,
  },
  "laser-engraved-keychain-v8": {
    name: "Laser Engraved Keychain — V8 Engine Block",
    price: 18.00,
    category: "Laser Engraved",
    description: "Laser engraved keychain featuring a detailed V8 engine block design. Made from solid aluminum with a durable anodized finish. Can be personalized with custom text on the back.",
    isCustomizable: true,
    rating: 5,
    reviews: 34,
  },
};

const RELATED_PRODUCTS = [
  { slug: "laser-engraved-keychain-v8", name: "Laser Engraved Keychain — V8 Engine Block", price: 18.00 },
  { slug: "custom-emblem-muscle-car", name: "Custom 3D Printed Emblem — Muscle Car Style", price: 42.00 },
  { slug: "3d-printed-phone-mount-dash", name: "3D Printed Dash Phone Mount — Universal Fit", price: 28.00 },
];

/* Next.js 16: params is a Promise — use explicit type until next dev generates global helpers */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  /* Look up the product — fallback to generic placeholder if slug not in our static set */
  const product = PRODUCT_DATA[slug] ?? {
    name: decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    price: 35.00,
    category: "Custom Parts",
    description: "This is a custom fabricated product. Contact us for full details or to request a specific configuration.",
    isCustomizable: true,
    rating: 5,
    reviews: 0,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-zinc-500 font-body">
        <ol className="flex items-center gap-2">
          <li><a href="/products" className="hover:text-brand-blue transition-colors">Products</a></li>
          <li aria-hidden>/</li>
          <li className="text-zinc-300 truncate max-w-[200px]">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ── Left: Image Gallery ─────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Main image */}
          <div className="w-full aspect-square bg-zinc-900 rounded-lg border border-brand-blue/15 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border border-brand-blue/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-zinc-600 text-sm font-heading uppercase tracking-wider">Product Photo</span>
              <p className="text-zinc-700 text-xs mt-1">Coming Soon</p>
            </div>
          </div>
          {/* Thumbnail strip */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-20 h-20 bg-zinc-900 rounded border border-brand-blue/10 flex-shrink-0" />
            ))}
          </div>
        </div>

        {/* ── Right: Product Info ──────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="outline" className="mb-3">{product.category}</Badge>
            <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide text-brand-white leading-tight mb-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} size="md" />
              <span className="text-zinc-400 text-sm font-body">{product.reviews} review{product.reviews !== 1 ? "s" : ""}</span>
            </div>
            <div className="text-3xl font-heading font-bold text-brand-white">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <div className="h-px bg-brand-blue/15" />

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-2">Description</h2>
            <p className="text-zinc-300 leading-relaxed font-body">{product.description}</p>
          </div>

          {product.isCustomizable && (
            <div className="p-4 bg-brand-blue/5 border border-brand-blue/20 rounded-lg">
              <p className="text-sm text-brand-blue font-heading font-semibold uppercase tracking-wider mb-1">
                Customizable
              </p>
              <p className="text-zinc-400 text-sm font-body">
                This item can be personalized. Click &quot;Customize This&quot; to specify your options, or contact us to discuss your vision.
              </p>
            </div>
          )}

          {/* Quantity + Add to Cart — client component for interactivity */}
          <AddToCartSection isCustomizable={product.isCustomizable} />

          <div className="h-px bg-brand-blue/15" />

          <div className="text-sm text-zinc-500 font-body space-y-1">
            <p>✓ Made to order — ships within 5-10 business days</p>
            <p>✓ Ships worldwide from San Diego, CA</p>
            <p>✓ Questions? <a href="/contact" className="text-brand-blue hover:underline">Contact us</a></p>
          </div>
        </div>
      </div>

      {/* ── Related Products ──────────────────────────────────── */}
      <div className="mt-20">
        <SectionHeading title="Related Products" className="mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {RELATED_PRODUCTS.filter((r) => r.slug !== slug).slice(0, 3).map((rel) => (
            <Card key={rel.slug} href={`/products/${rel.slug}`} className="p-4 flex flex-col gap-3">
              <div className="w-full h-32 bg-zinc-900 rounded border border-brand-blue/10 flex items-center justify-center">
                <span className="text-zinc-600 text-xs font-heading uppercase">Photo</span>
              </div>
              <h3 className="font-heading font-semibold uppercase tracking-wide text-brand-white text-sm leading-snug">
                {rel.name}
              </h3>
              <span className="font-heading font-bold text-brand-white">${rel.price.toFixed(2)}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
