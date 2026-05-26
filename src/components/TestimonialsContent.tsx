/*
  TestimonialsContent — client component for filtering testimonials.
  Receives pre-fetched testimonials from the server and handles
  interactive filter state locally.
*/
"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import type { Testimonial } from "@/types/database";

const PROJECT_TYPES = [
  "All",
  "Automotive Part",
  "Laser Engraving",
  "3D Printing",
  "Custom Zyn Tin",
  "Personalized Gift",
  "Event Order",
];

interface TestimonialsContentProps {
  testimonials: Testimonial[];
}

export default function TestimonialsContent({ testimonials }: TestimonialsContentProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? testimonials
      : testimonials.filter((t) => t.project_type === activeFilter);

  const avgRating =
    testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : "5.0";

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {PROJECT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-heading font-semibold uppercase tracking-wider border transition-all duration-200
              ${
                activeFilter === type
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white text-gray-600 border-[#E8E8E8] hover:border-brand-blue/40 hover:text-brand-blue"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Overall rating summary */}
      <div className="text-center mb-10 p-6 bg-[#F8F8F8] rounded-xl border border-[#E8E8E8]">
        <div className="flex items-center justify-center gap-3 mb-1">
          <span className="font-heading text-4xl font-bold text-black">{avgRating}</span>
          <StarRating rating={5} />
        </div>
        <p className="text-gray-500 font-body text-sm">
          Based on {testimonials.length} verified customer reviews
        </p>
      </div>

      {/* Testimonial grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 font-body py-12">
          No reviews found for this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((t) => (
            <Card key={t.id} className="flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  {t.customer_photo_url ? (
                    <img
                      src={t.customer_photo_url}
                      alt={t.customer_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-heading font-bold text-brand-blue text-sm">
                      {t.customer_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-heading font-semibold text-black text-sm">{t.customer_name}</p>
                  {t.project_type && (
                    <Badge variant="outline" className="mt-1 text-xs">{t.project_type}</Badge>
                  )}
                </div>
              </div>
              <StarRating rating={t.rating} className="mb-3" />
              <p className="text-gray-600 font-body text-sm leading-relaxed flex-1">
                &ldquo;{t.review_text}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* Leave a review CTA */}
      <div className="text-center p-8 bg-[#F8F8F8] rounded-xl border border-[#E8E8E8]">
        <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-black mb-2">
          Had a Great Experience?
        </h3>
        <p className="text-gray-500 font-body mb-4">
          We&apos;d love to hear about your project. Share your story with the community.
        </p>
        <Button variant="primary" href="/contact">Leave a Review →</Button>
      </div>
    </>
  );
}
