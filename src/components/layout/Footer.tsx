/*
  Footer — four-column layout matching PRD Section 5.1.

  Columns: Quick Links | Services | Connect (social) | Legal
  Bottom bar: copyright line with current year.

  Social links are placeholder # for now — Hailie will fill in real URLs
  once her Instagram, Facebook, TikTok, and YouTube accounts are created.
*/
import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services#laser-engraving", label: "Laser Engraving" },
  { href: "/services#3d-printing", label: "3D Printing" },
  { href: "/services#cnc-carving", label: "CNC Carving" },
  { href: "/services#prototyping", label: "Prototyping" },
  { href: "/services#custom-auto", label: "Custom Auto" },
  { href: "/services#bulk-orders", label: "Bulk Orders" },
];

const socialLinks = [
  { href: "#", label: "Instagram", icon: "ig" },
  { href: "#", label: "Facebook", icon: "fb" },
  { href: "#", label: "TikTok", icon: "tt" },
  { href: "#", label: "YouTube", icon: "yt" },
  { href: "mailto:hello@retrofitcreations.com", label: "Email Us", icon: "email" },
];

/*
  Legal column — only links to pages that actually exist:
    /terms — Terms of Service (built)
    /shipping-returns — Shipping & Returns Policy (built)
    Privacy Policy is a placeholder href="#" until that document is written.
  Removed: standalone /shipping and /returns links (now combined as one).
*/
const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "#", label: "Privacy Policy" },
];

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      {/*
        Explicit white color + inline style fallback so the column header is
        always visible on the black footer background, even if a global CSS
        rule (or future theme change) tries to repaint headings dark.
      */}
      <h3
        className="font-heading font-semibold text-sm uppercase tracking-widest text-white mb-4"
        style={{ color: "#ffffff" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-gray-400 hover:text-brand-blue transition-colors duration-200"
      >
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-brand-blue/15">
      {/* Main four-column grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          <FooterColumn title="Quick Links">
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Services">
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Connect">
            <ul className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <FooterLink key={link.label} href={link.href} label={link.label} />
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Legal">
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </FooterColumn>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {year} Retrofit Creations LLC. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            San Diego, CA · Built Different. Made to Stand Out.
          </p>
        </div>
      </div>
    </footer>
  );
}
