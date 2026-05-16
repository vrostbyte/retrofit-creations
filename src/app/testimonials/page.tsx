/*
  Testimonials page — PRD Section 5.8
  Grid of customer reviews with star ratings, filter by project type, and a review CTA.
*/
"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const PROJECT_TYPES = ["All", "Automotive Part", "Laser Engraving", "3D Printing", "Custom Zyn Tin", "Personalized Gift", "Event Order"];

const TESTIMONIALS = [
  { id: 1, quote: "Hailie built a custom dash bracket for my '69 Camaro that fit perfectly on the first print. Insane quality for the price. Will never go anywhere else.", author: "Mike T.", rating: 5, project: "Automotive Part", initials: "MT" },
  { id: 2, quote: "Ordered a laser engraved keychain as a gift and it blew everyone away. The detail was unreal. Fast turnaround too — had it in 4 days.", author: "Jessica M.", rating: 5, project: "Laser Engraving", initials: "JM" },
  { id: 3, quote: "Got a custom Zyn tin made with my car club logo. It was the hit of the meetup. Already ordered 20 more for the whole crew.", author: "Carlos D.", rating: 5, project: "Custom Zyn Tin", initials: "CD" },
  { id: 4, quote: "The CNC carved wood sign for my garage turned out incredible. It's the first thing everyone notices when they walk in.", author: "Tony R.", rating: 5, project: "Personalized Gift", initials: "TR" },
  { id: 5, quote: "Custom Porsche keychains for our PCA chapter event — 40 pieces, every single one perfect. Hailie communicates great and delivers on time.", author: "James R.", rating: 5, project: "Event Order", initials: "JR" },
  { id: 6, quote: "3D printed turbo bracket for my K-swap. Tight clearances, perfect fitment. I gave her my measurements and she nailed it.", author: "Diego V.", rating: 5, project: "Automotive Part", initials: "DV" },
  { id: 7, quote: "The laser engraved leather shift boot she made for my '72 Nova is a work of art. The detail in the SS logo is unbelievable.", author: "Rick M.", rating: 5, project: "Laser Engraving", initials: "RM" },
  { id: 8, quote: "Ordered personalized Christmas gifts for my whole family — engraved cutting boards. Everyone was shocked at how good they looked.", author: "Sarah K.", rating: 5, project: "Personalized Gift", initials: "SK" },
];

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.project === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeading
        title="Customer Reviews"
        subtitle="Real people, real projects, real results. Don't take our word for it."
        centered
        className="mb-10"
      />

      {/* Filter by project type */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {PROJECT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-heading font-semibold uppercase tracking-wider border transition-all duration-200
              ${activeFilter === type
                ? "bg-brand-blue text-white border-brand-blue"
                : "bg-transparent text-zinc-400 border-brand-blue/20 hover:border-brand-blue/50 hover:text-brand-blue"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Overall rating summary */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 bg-brand-blue/5 border border-brand-blue/20 rounded-xl px-6 py-3">
          <span className="font-heading font-bold text-4xl text-brand-white">5.0</span>
          <div className="text-left">
            <StarRating rating={5} size="lg" />
            <p className="text-zinc-400 text-xs mt-1 font-body">Based on {TESTIMONIALS.length} reviews</p>
          </div>
        </div>
      </div>

      {/* Testimonial grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <Card key={t.id} className="p-6 flex flex-col gap-4">
            <StarRating rating={t.rating} size="md" />
            <blockquote className="text-zinc-300 leading-relaxed font-body italic flex-1">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3 pt-3 border-t border-brand-blue/10">
              {/* Avatar circle */}
              <div className="w-9 h-9 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center flex-shrink-0">
                <span className="font-heading font-bold text-xs text-brand-blue">{t.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-sm uppercase tracking-wide text-brand-white truncate">{t.author}</p>
              </div>
              <Badge variant="outline">{t.project}</Badge>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-zinc-500">
          <p className="font-heading uppercase tracking-widest">No reviews in this category yet.</p>
        </div>
      )}

      {/* Leave a review CTA */}
      <div className="mt-16 text-center p-10 bg-brand-blue/5 border border-brand-blue/20 rounded-xl">
        <h3 className="font-heading text-2xl font-bold uppercase tracking-widest text-brand-white mb-3">
          Had a Great Experience?
        </h3>
        <p className="text-zinc-400 mb-6 font-body">
          Your review helps other enthusiasts find quality fabrication. It means a lot to us.
        </p>
        <Button variant="primary" size="lg" href="/contact">
          Leave a Review
        </Button>
      </div>
    </div>
  );
}
