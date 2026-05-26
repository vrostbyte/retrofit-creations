/*
  Root layout — wraps every page.

  Font strategy: next/font/google self-hosts fonts and injects CSS custom
  properties (--font-oswald, --font-inter) onto the <html> element via the
  `variable` option. globals.css then wires those vars into Tailwind's
  @theme so font-heading / font-body utility classes work everywhere.
*/
import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart/CartContext";
import CartDrawer from "@/components/checkout/CartDrawer";

/* Oswald — condensed industrial feel for all headings */
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Inter — clean readable body text */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Retrofit Creations — Built Different. Made to Stand Out.",
  description:
    "Custom fabrication, 3D printing, laser engraving, and CNC services based in San Diego, CA. Built for car enthusiasts and makers who demand the best.",
  keywords: [
    "custom fabrication",
    "3D printing",
    "laser engraving",
    "CNC carving",
    "automotive parts",
    "San Diego",
    "custom car parts",
  ],
  openGraph: {
    title: "Retrofit Creations — Built Different. Made to Stand Out.",
    description:
      "Custom fabrication, 3D printing, laser engraving, and CNC services based in San Diego, CA.",
    type: "website",
    locale: "en_US",
  },
  /*
    Favicons: favicon.ico lives at src/app/favicon.ico and is auto-detected
    by Next.js. The PNG variants live in /public and are referenced below
    for browsers that prefer sized PNGs. Apple touch icon and the PWA
    manifest are also wired up here.
  */
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
      Apply both font variables to <html> so the CSS custom properties
      (--font-oswald, --font-inter) are available globally via var().
    */
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable}`}
    >
      {/* Light body theme (PRD v1.2.0) — header/footer are the only black elements */}
      <body className="min-h-screen flex flex-col bg-white text-black font-body antialiased">
        {/*
          CartProvider wraps everything so any component can call useCart().
          CartDrawer is rendered here (at the root) so it can overlay any page.
        */}
        <CartProvider>
          <Header />
          <CartDrawer />
          {/* Pages render here — flex-1 makes the content fill available space */}
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
