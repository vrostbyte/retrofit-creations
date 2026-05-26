/*
  Testimonials page — Phase 2A: data loaded from Supabase.
  Light-body theme (PRD v1.2.0).
*/
import { Suspense } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import TestimonialsContent from "@/components/TestimonialsContent";

export const metadata = {
  title: "Customer Reviews — Retrofit Creations",
  description: "See what our customers say about our custom fabrication, 3D printing, and laser engraving work.",
};

export default async function TestimonialsPage() {
  const supabase = await createClient();

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeading
        title="Customer Reviews"
        subtitle="Real people, real projects, real results. Don't take our word for it."
        centered
        className="mb-10"
      />
      <Suspense fallback={<div className="h-48 animate-pulse bg-[#F8F8F8] rounded-lg" />}>
        <TestimonialsContent testimonials={testimonials ?? []} />
      </Suspense>
    </div>
  );
}
