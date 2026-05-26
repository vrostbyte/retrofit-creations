/*
  Admin Testimonials — approve, feature, or reject customer reviews.
*/
import { createClient } from "@/lib/supabase/server";
import {
  approveTestimonialAction,
  rejectTestimonialAction,
  toggleTestimonialFeaturedAction,
} from "@/app/admin/actions";
import StarRating from "@/components/ui/StarRating";
import type { Testimonial } from "@/types/database";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  const allTestimonials = (testimonials ?? []) as Testimonial[];
  const pending = allTestimonials.filter((t) => !t.is_approved);
  const approved = allTestimonials.filter((t) => t.is_approved);

  const TestimonialRow = ({ t }: { t: Testimonial }) => (
    <div className="bg-white border border-[#E8E8E8] rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-heading font-bold text-black">{t.customer_name}</p>
          <p className="text-xs text-gray-500 font-body">{t.customer_email}</p>
          {t.project_type && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-[#F8F8F8] border border-[#E8E8E8] rounded text-xs font-heading text-gray-600">
              {t.project_type}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <StarRating rating={t.rating} size="sm" />
          <span className="text-xs text-gray-400 font-body">
            {new Date(t.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-700 font-body leading-relaxed mb-4">
        &ldquo;{t.review_text}&rdquo;
      </p>

      <div className="flex flex-wrap gap-2 pt-3 border-t border-[#E8E8E8]">
        {!t.is_approved && (
          <form action={async () => { "use server"; await approveTestimonialAction(t.id); }}>
            <button type="submit" className="px-3 py-1.5 bg-green-600 text-white text-xs font-heading font-semibold uppercase tracking-wide rounded-lg hover:bg-green-700 transition-colors">
              Approve
            </button>
          </form>
        )}

        {t.is_approved && (
          <form action={async () => { "use server"; await toggleTestimonialFeaturedAction(t.id, !t.is_featured); }}>
            <button
              type="submit"
              className={`px-3 py-1.5 text-xs font-heading font-semibold uppercase tracking-wide rounded-lg transition-colors ${
                t.is_featured
                  ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  : "border border-[#E8E8E8] text-gray-600 hover:border-brand-blue/40 hover:text-brand-blue"
              }`}
            >
              {t.is_featured ? "★ Featured" : "Mark Featured"}
            </button>
          </form>
        )}

        <form action={async () => { "use server"; await rejectTestimonialAction(t.id); }}>
          <button type="submit" className="px-3 py-1.5 border border-red-200 text-red-600 text-xs font-heading font-semibold uppercase tracking-wide rounded-lg hover:bg-red-50 transition-colors">
            {t.is_approved ? "Delete" : "Reject"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-black mb-6">
        Testimonials
      </h1>

      {/* Pending */}
      {pending.length > 0 && (
        <section className="mb-8">
          <h2 className="font-heading font-semibold text-amber-700 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            Awaiting Approval ({pending.length})
          </h2>
          <div className="space-y-4">
            {pending.map((t) => <TestimonialRow key={t.id} t={t} />)}
          </div>
        </section>
      )}

      {/* Approved */}
      <section>
        <h2 className="font-heading font-semibold text-green-700 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          Approved ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <p className="text-gray-400 font-body text-sm">No approved testimonials yet.</p>
        ) : (
          <div className="space-y-4">
            {approved.map((t) => <TestimonialRow key={t.id} t={t} />)}
          </div>
        )}
      </section>
    </div>
  );
}
