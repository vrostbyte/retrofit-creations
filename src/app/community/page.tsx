/*
  Community page — Phase 2A: data loaded from Supabase.
  Light-body theme (PRD v1.2.0).
*/
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CommunityGrid from "@/components/CommunityGrid";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Community — Retrofit Creations",
  description: "Real builds, real customers, real craftsmanship. See what our community is building.",
};

export default async function CommunityPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("community_posts")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <SectionHeading
          title="Community"
          subtitle="Real builds, real customers, real craftsmanship. This is what Retrofit Creations is all about."
        />
        <Button variant="primary" size="sm" href="/contact">Share Your Build →</Button>
      </div>

      <CommunityGrid posts={posts ?? []} />
    </div>
  );
}
