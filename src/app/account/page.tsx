/*
  Account Dashboard — light-body theme (PRD v1.2.0).
  White/light gray surfaces, dark text, blue accents.
*/
"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

type DashboardSection = "profile" | "orders" | "quotes" | "wishlist" | "community";

const NAV_ITEMS: { id: DashboardSection; label: string; icon: string }[] = [
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "orders", label: "Orders", icon: "📦" },
  { id: "quotes", label: "Quote Requests", icon: "📋" },
  { id: "wishlist", label: "Wishlist", icon: "♡" },
  { id: "community", label: "Community", icon: "🏁" },
];

const PLACEHOLDER_ORDERS = [
  { id: "RC-2026-0001", date: "May 10, 2026", status: "shipped", total: 48.00, items: "Custom Dash Bracket — '69 Camaro" },
  { id: "RC-2026-0002", date: "May 8, 2026", status: "delivered", total: 18.00, items: "Laser Engraved Keychain × 2" },
];

const PLACEHOLDER_QUOTES = [
  { id: "RCQ-2026-0001", date: "May 12, 2026", status: "in_review", service: "Laser Engraving", description: "Custom logo on 20 metal keychains" },
  { id: "RCQ-2026-0002", date: "May 5, 2026", status: "quoted", service: "3D Printing", description: "Replacement dash trim pieces for 1972 Nova" },
];

const STATUS_BADGE: Record<string, "outline" | "warning" | "success" | "default"> = {
  received: "outline", processing: "warning", shipped: "default", delivered: "success",
  pending: "outline", in_review: "warning", quoted: "default", accepted: "success",
  in_production: "warning", completed: "success",
};

function ProfileSection() {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-black">Profile</h2>
      <div className="flex items-center gap-5 p-6 bg-[#F8F8F8] border border-[#E8E8E8] rounded-xl">
        <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-2xl font-heading font-bold text-brand-blue">
          H
        </div>
        <div>
          <p className="font-heading font-bold text-lg uppercase tracking-wide text-black">Hailie Smith</p>
          <p className="text-gray-500 text-sm font-body">hailie@example.com</p>
          <p className="text-gray-400 text-xs font-body mt-1">Member since May 2026</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-[#F8F8F8] border border-[#E8E8E8] rounded-xl">
        {[["Full Name", "Hailie Smith"], ["Email", "hailie@example.com"], ["Phone", "Not set"], ["Shipping Address", "Not set"]].map(([label, value]) => (
          <div key={label}>
            <p className="text-xs font-heading uppercase tracking-wider text-gray-500 mb-1">{label}</p>
            <p className="text-gray-800 font-body text-sm">{value}</p>
          </div>
        ))}
      </div>
      <Button variant="secondary" size="sm">Edit Profile</Button>
    </div>
  );
}

function OrdersSection() {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-black">Order History</h2>
      {PLACEHOLDER_ORDERS.length === 0 ? (
        <p className="text-gray-500 font-body">No orders yet. <Link href="/products" className="text-brand-blue hover:underline">Start shopping</Link>.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {PLACEHOLDER_ORDERS.map((order) => (
            <div key={order.id} className="p-5 bg-[#F8F8F8] border border-[#E8E8E8] rounded-xl flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-heading font-bold text-sm text-black">{order.id}</span>
                  <Badge variant={STATUS_BADGE[order.status] ?? "outline"}>{order.status}</Badge>
                </div>
                <p className="text-gray-600 text-sm font-body truncate">{order.items}</p>
                <p className="text-gray-400 text-xs font-body mt-1">{order.date}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="font-heading font-bold text-black">${order.total.toFixed(2)}</span>
                <Button variant="ghost" size="sm">Details</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function QuotesSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-black">Quote Requests</h2>
        <Button variant="primary" size="sm" href="/contact">New Quote</Button>
      </div>
      <div className="flex flex-col gap-4">
        {PLACEHOLDER_QUOTES.map((quote) => (
          <div key={quote.id} className="p-5 bg-[#F8F8F8] border border-[#E8E8E8] rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-heading font-bold text-sm text-black">{quote.id}</span>
              <Badge variant={STATUS_BADGE[quote.status] ?? "outline"}>{quote.status.replace("_", " ")}</Badge>
              <Badge variant="outline">{quote.service}</Badge>
            </div>
            <p className="text-gray-600 text-sm font-body">{quote.description}</p>
            <p className="text-gray-400 text-xs font-body mt-2">Submitted {quote.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderSection({ title, message }: { title: string; message: string }) {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-black">{title}</h2>
      <div className="p-12 bg-[#F8F8F8] border border-dashed border-[#E8E8E8] rounded-xl text-center">
        <p className="text-gray-500 font-body">{message}</p>
      </div>
    </div>
  );
}

export default function AccountDashboardPage() {
  const [activeSection, setActiveSection] = useState<DashboardSection>("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":   return <ProfileSection />;
      case "orders":    return <OrdersSection />;
      case "quotes":    return <QuotesSection />;
      case "wishlist":  return <PlaceholderSection title="Wishlist" message="Your saved products will appear here. Phase 3 feature." />;
      case "community": return <PlaceholderSection title="Community Profile" message="Your community submissions and profile. Phase 4 feature." />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <nav className="bg-[#F8F8F8] border border-[#E8E8E8] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#E8E8E8]">
              <p className="font-heading font-bold text-sm uppercase tracking-widest text-gray-500">My Account</p>
            </div>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-heading font-semibold uppercase tracking-wider transition-colors text-left
                      ${activeSection === item.id
                        ? "bg-brand-blue/5 text-brand-blue border-r-2 border-brand-blue"
                        : "text-gray-600 hover:bg-brand-blue/5 hover:text-brand-blue"
                      }`}
                  >
                    <span aria-hidden>{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="p-4 border-t border-[#E8E8E8]">
              <Button variant="ghost" size="sm" className="w-full text-gray-500">Sign Out</Button>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="lg:col-span-3">{renderSection()}</main>
      </div>
    </div>
  );
}
