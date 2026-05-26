/*
  CommunityGrid — client component for filtering community posts.
  Receives pre-fetched posts from the server and handles filter state locally.
*/
"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import type { CommunityPost } from "@/types/database";

const FILTER_TABS = [
  { label: "All", value: "all" },
  { label: "Showcase", value: "showcase" },
  { label: "Featured Builds", value: "featured" },
  { label: "Events", value: "event" },
  { label: "Builds", value: "build" },
];

const badgeVariant = (type: string) => {
  if (type === "featured") return "default" as const;
  if (type === "event") return "warning" as const;
  return "outline" as const;
};

interface CommunityGridProps {
  posts: CommunityPost[];
}

export default function CommunityGrid({ posts }: CommunityGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? posts
      : posts.filter((p) => p.post_type === activeFilter);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-4 py-2 rounded-full text-sm font-heading font-semibold uppercase tracking-wider border transition-colors
              ${
                activeFilter === tab.value
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white text-gray-600 border-[#E8E8E8] hover:border-brand-blue/40 hover:text-brand-blue"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-body">
          No posts in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((post) => (
            <Card key={post.id} className="flex flex-col">
              {/* Photo */}
              {post.photos[0] && (
                <div className="aspect-video bg-[#F8F8F8] rounded-lg overflow-hidden mb-4 -mx-1">
                  <img
                    src={post.photos[0]}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 mb-2">
                <Badge variant={badgeVariant(post.post_type)}>
                  {post.post_type === "featured"
                    ? "Featured"
                    : post.post_type === "event"
                    ? "Event"
                    : post.post_type === "build"
                    ? "Build"
                    : "Showcase"}
                </Badge>
                {post.is_featured && (
                  <span className="text-amber-400 text-sm" title="Featured">★</span>
                )}
              </div>

              <h3 className="font-heading font-semibold text-black mb-1">{post.title}</h3>
              <p className="text-sm text-gray-500 font-body mb-2">by {post.submitted_by_name}</p>
              {post.description && (
                <p className="text-sm text-gray-600 font-body leading-relaxed flex-1 line-clamp-3">
                  {post.description}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Submission CTA */}
      <div className="text-center p-8 bg-[#F8F8F8] rounded-xl border border-[#E8E8E8]">
        <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-black mb-2">
          Have a Build to Share?
        </h3>
        <p className="text-gray-500 font-body mb-4">
          Show off your project to the Retrofit Creations community. Submit your photos and story
          and we&apos;ll feature it here.
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-brand-blue text-white font-heading font-semibold text-sm uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity"
        >
          Submit Your Build →
        </a>
      </div>
    </>
  );
}
