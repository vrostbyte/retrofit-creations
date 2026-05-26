/*
  Admin Dashboard — overview stats and recent activity.
*/
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

function StatCard({
  label,
  value,
  href,
  color = "blue",
}: {
  label: string;
  value: number;
  href: string;
  color?: "blue" | "green" | "yellow" | "red";
}) {
  const colorClasses = {
    blue: "bg-brand-blue/10 text-brand-blue",
    green: "bg-green-50 text-green-700",
    yellow: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <Link
      href={href}
      className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-brand-blue/30 transition-colors block"
    >
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${colorClasses[color]}`}
      >
        <span className="font-heading font-bold text-lg">{value}</span>
      </div>
      <p className="font-heading font-semibold text-black uppercase tracking-wide text-sm">
        {label}
      </p>
    </Link>
  );
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch all stats in parallel
  const [
    productsResult,
    pendingQuotesResult,
    ordersResult,
    pendingTestimonialsResult,
    pendingCommunityResult,
    recentQuotesResult,
    recentOrdersResult,
  ] = await Promise.all([
    supabase.from("products").select("id", { count: "exact" }).eq("is_active", true),
    supabase.from("quotes").select("id", { count: "exact" }).eq("status", "pending"),
    supabase.from("orders").select("id", { count: "exact" }).eq("status", "received"),
    supabase.from("testimonials").select("id", { count: "exact" }).eq("is_approved", false),
    supabase.from("community_posts").select("id", { count: "exact" }).eq("is_approved", false),
    supabase
      .from("quotes")
      .select("quote_number, customer_name, service_type, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("orders")
      .select("order_number, customer_name, total, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      received: "bg-blue-100 text-blue-700",
      processing: "bg-amber-100 text-amber-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      pending: "bg-amber-100 text-amber-700",
      in_review: "bg-blue-100 text-blue-700",
      quoted: "bg-purple-100 text-purple-700",
    };
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-heading font-semibold uppercase ${
          colors[status] ?? "bg-gray-100 text-gray-600"
        }`}
      >
        {status.replace("_", " ")}
      </span>
    );
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-black mb-6">
        Dashboard
      </h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Active Products"
          value={productsResult.count ?? 0}
          href="/admin/products"
          color="blue"
        />
        <StatCard
          label="New Quotes"
          value={pendingQuotesResult.count ?? 0}
          href="/admin/quotes"
          color="yellow"
        />
        <StatCard
          label="New Orders"
          value={ordersResult.count ?? 0}
          href="/admin/orders"
          color="green"
        />
        <StatCard
          label="Pending Reviews"
          value={
            (pendingTestimonialsResult.count ?? 0) +
            (pendingCommunityResult.count ?? 0)
          }
          href="/admin/testimonials"
          color="red"
        />
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent quotes */}
        <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8E8E8]">
            <h2 className="font-heading font-semibold text-black uppercase tracking-wide text-sm">
              Recent Quote Requests
            </h2>
            <Link
              href="/admin/quotes"
              className="text-xs text-brand-blue hover:underline font-body"
            >
              View all →
            </Link>
          </div>
          {(recentQuotesResult.data ?? []).length === 0 ? (
            <p className="text-gray-400 font-body text-sm p-5">No quotes yet.</p>
          ) : (
            <div className="divide-y divide-[#E8E8E8]">
              {(recentQuotesResult.data ?? []).map((q) => (
                <div key={q.quote_number} className="px-5 py-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-black font-heading">
                      {q.customer_name}
                    </p>
                    <p className="text-xs text-gray-500 font-body">{q.service_type}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {statusBadge(q.status)}
                    <span className="text-xs text-gray-400 font-body">{q.quote_number}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent orders */}
        <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8E8E8]">
            <h2 className="font-heading font-semibold text-black uppercase tracking-wide text-sm">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs text-brand-blue hover:underline font-body"
            >
              View all →
            </Link>
          </div>
          {(recentOrdersResult.data ?? []).length === 0 ? (
            <p className="text-gray-400 font-body text-sm p-5">No orders yet.</p>
          ) : (
            <div className="divide-y divide-[#E8E8E8]">
              {(recentOrdersResult.data ?? []).map((o) => (
                <div key={o.order_number} className="px-5 py-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-black font-heading">
                      {o.customer_name}
                    </p>
                    <p className="text-xs text-gray-500 font-body">${Number(o.total).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {statusBadge(o.status)}
                    <span className="text-xs text-gray-400 font-body">{o.order_number}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick links for content moderation */}
      {((pendingTestimonialsResult.count ?? 0) > 0 ||
        (pendingCommunityResult.count ?? 0) > 0) && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="font-heading font-semibold text-amber-800 text-sm uppercase tracking-wide mb-2">
            Needs Your Attention
          </p>
          <div className="flex flex-wrap gap-3">
            {(pendingTestimonialsResult.count ?? 0) > 0 && (
              <Link
                href="/admin/testimonials"
                className="text-sm font-body text-amber-700 hover:underline"
              >
                {pendingTestimonialsResult.count} testimonial{pendingTestimonialsResult.count !== 1 ? "s" : ""} awaiting approval
              </Link>
            )}
            {(pendingCommunityResult.count ?? 0) > 0 && (
              <Link
                href="/admin/community"
                className="text-sm font-body text-amber-700 hover:underline"
              >
                {pendingCommunityResult.count} community post{pendingCommunityResult.count !== 1 ? "s" : ""} awaiting approval
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
