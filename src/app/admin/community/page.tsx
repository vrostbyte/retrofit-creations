/*
  Admin Community — approve, feature, or reject community submissions.
*/
import { createClient } from "@/lib/supabase/server";
import {
  approveCommunityPostAction,
  rejectCommunityPostAction,
  toggleCommunityFeaturedAction,
} from "@/app/admin/actions";
import type { CommunityPost } from "@/types/database";

export default async function AdminCommunityPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("community_posts")
    .select("*")
    .order("created_at", { ascending: false });

  const allPosts = (posts ?? []) as CommunityPost[];
  const pending = allPosts.filter((p) => !p.is_approved);
  const approved = allPosts.filter((p) => p.is_approved);

  const typeColor = (type: string) => {
    const map: Record<string, string> = {
      showcase: "bg-blue-100 text-blue-800",
      event: "bg-purple-100 text-purple-800",
      build: "bg-amber-100 text-amber-800",
      featured: "bg-green-100 text-green-800",
    };
    return map[type] ?? "bg-gray-100 text-gray-800";
  };

  const PostCard = ({ post }: { post: CommunityPost }) => (
    <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden">
      {/* Photos row */}
      {post.photos.length > 0 && (
        <div className="flex gap-1 h-32 overflow-hidden bg-[#F8F8F8]">
          {post.photos.slice(0, 3).map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`${post.title} photo ${i + 1}`}
              className="flex-1 object-cover"
            />
          ))}
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-heading font-bold text-black">{post.title}</h3>
            <p className="text-xs text-gray-500 font-body">
              by {post.submitted_by_name} · {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
          <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-heading font-semibold uppercase ${typeColor(post.post_type)}`}>
            {post.post_type}
          </span>
        </div>

        {post.description && (
          <p className="text-sm text-gray-700 font-body leading-relaxed mb-4 line-clamp-3">
            {post.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 pt-3 border-t border-[#E8E8E8]">
          {!post.is_approved && (
            <form action={async () => { "use server"; await approveCommunityPostAction(post.id); }}>
              <button type="submit" className="px-3 py-1.5 bg-green-600 text-white text-xs font-heading font-semibold uppercase tracking-wide rounded-lg hover:bg-green-700 transition-colors">
                Approve
              </button>
            </form>
          )}

          {post.is_approved && (
            <form action={async () => { "use server"; await toggleCommunityFeaturedAction(post.id, !post.is_featured); }}>
              <button
                type="submit"
                className={`px-3 py-1.5 text-xs font-heading font-semibold uppercase tracking-wide rounded-lg transition-colors ${
                  post.is_featured
                    ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    : "border border-[#E8E8E8] text-gray-600 hover:border-brand-blue/40 hover:text-brand-blue"
                }`}
              >
                {post.is_featured ? "★ Featured" : "Mark Featured"}
              </button>
            </form>
          )}

          <form action={async () => { "use server"; await rejectCommunityPostAction(post.id); }}>
            <button type="submit" className="px-3 py-1.5 border border-red-200 text-red-600 text-xs font-heading font-semibold uppercase tracking-wide rounded-lg hover:bg-red-50 transition-colors">
              {post.is_approved ? "Delete" : "Reject"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-black mb-6">
        Community
      </h1>

      {pending.length > 0 && (
        <section className="mb-8">
          <h2 className="font-heading font-semibold text-amber-700 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            Awaiting Approval ({pending.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pending.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-heading font-semibold text-green-700 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          Approved ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <p className="text-gray-400 font-body text-sm">No approved posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approved.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
