/*
  Admin Quotes — view and manage all custom quote requests.
*/
import { createClient } from "@/lib/supabase/server";
import { updateQuoteStatusAction } from "@/app/admin/actions";
import type { Quote } from "@/types/database";

const STATUS_OPTIONS = [
  "pending", "in_review", "quoted", "accepted",
  "in_production", "completed", "declined", "cancelled",
];

const statusColor = (status: string) => {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    in_review: "bg-blue-100 text-blue-800",
    quoted: "bg-purple-100 text-purple-800",
    accepted: "bg-green-100 text-green-800",
    in_production: "bg-indigo-100 text-indigo-800",
    completed: "bg-gray-100 text-gray-800",
    declined: "bg-red-100 text-red-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return map[status] ?? "bg-gray-100 text-gray-800";
};

export default async function AdminQuotesPage() {
  const supabase = await createClient();

  const { data: quotes } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });

  const allQuotes = (quotes ?? []) as Quote[];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-black mb-6">
        Quote Requests
      </h1>

      {allQuotes.length === 0 ? (
        <div className="text-center py-20 bg-[#F8F8F8] rounded-xl border border-[#E8E8E8]">
          <p className="text-gray-500 font-body">No quote requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {allQuotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden"
            >
              {/* Quote header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[#E8E8E8] bg-[#F8F8F8]">
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-black text-sm">
                    {quote.quote_number}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-heading font-semibold uppercase ${statusColor(quote.status)}`}
                  >
                    {quote.status.replace("_", " ")}
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-body">
                  {new Date(quote.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer info */}
                  <div>
                    <h3 className="font-heading font-semibold text-gray-500 text-xs uppercase tracking-wide mb-2">
                      Customer
                    </h3>
                    <p className="font-heading font-bold text-black">{quote.customer_name}</p>
                    <p className="text-sm text-gray-600 font-body">{quote.customer_email}</p>
                    {quote.customer_phone && (
                      <p className="text-sm text-gray-600 font-body">{quote.customer_phone}</p>
                    )}
                    <p className="text-xs text-gray-400 font-body mt-1">
                      Preferred contact: {quote.preferred_contact}
                    </p>
                  </div>

                  {/* Project details */}
                  <div>
                    <h3 className="font-heading font-semibold text-gray-500 text-xs uppercase tracking-wide mb-2">
                      Project
                    </h3>
                    <p className="text-sm font-semibold text-black font-body">{quote.service_type}</p>
                    {quote.quantity && (
                      <p className="text-sm text-gray-600 font-body">Qty: {quote.quantity}</p>
                    )}
                    {quote.budget_range && (
                      <p className="text-sm text-gray-600 font-body">Budget: {quote.budget_range}</p>
                    )}
                    {quote.deadline && (
                      <p className="text-sm text-gray-600 font-body">
                        Needed by: {new Date(quote.deadline).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4">
                  <h3 className="font-heading font-semibold text-gray-500 text-xs uppercase tracking-wide mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-gray-700 font-body leading-relaxed bg-[#F8F8F8] p-3 rounded-lg">
                    {quote.description}
                  </p>
                </div>

                {/* Reference images */}
                {quote.reference_images && quote.reference_images.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-heading font-semibold text-gray-500 text-xs uppercase tracking-wide mb-2">
                      Reference Images
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {quote.reference_images.map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-brand-blue hover:underline font-body"
                        >
                          Image {i + 1} →
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admin actions form */}
                <form
                  action={async (formData) => {
                    "use server";
                    const status = formData.get("status") as string;
                    const adminNotes = formData.get("admin_notes") as string;
                    const quotedPriceStr = formData.get("quoted_price") as string;
                    const quotedTurnaround = formData.get("quoted_turnaround") as string;
                    await updateQuoteStatusAction(
                      quote.id,
                      status,
                      adminNotes || undefined,
                      quotedPriceStr ? parseFloat(quotedPriceStr) : null,
                      quotedTurnaround || undefined
                    );
                  }}
                  className="mt-4 pt-4 border-t border-[#E8E8E8] grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  <div>
                    <label className="block text-xs font-heading font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={quote.status}
                      className="w-full px-3 py-2 border border-[#E8E8E8] rounded-lg text-sm font-body focus:outline-none focus:border-brand-blue/50"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Quoted Price ($)
                    </label>
                    <input
                      type="number"
                      name="quoted_price"
                      step="0.01"
                      min="0"
                      defaultValue={quote.quoted_price ?? ""}
                      placeholder="Enter your price"
                      className="w-full px-3 py-2 border border-[#E8E8E8] rounded-lg text-sm font-body focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Turnaround Time
                    </label>
                    <input
                      type="text"
                      name="quoted_turnaround"
                      defaultValue={quote.quoted_turnaround ?? ""}
                      placeholder="e.g. 5-7 business days"
                      className="w-full px-3 py-2 border border-[#E8E8E8] rounded-lg text-sm font-body focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Admin Notes (internal)
                    </label>
                    <input
                      type="text"
                      name="admin_notes"
                      defaultValue={quote.admin_notes ?? ""}
                      placeholder="Your internal notes..."
                      className="w-full px-3 py-2 border border-[#E8E8E8] rounded-lg text-sm font-body focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-blue text-white text-sm font-heading font-semibold uppercase tracking-wide rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
