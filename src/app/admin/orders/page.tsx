/*
  Admin Orders — view and update order status and tracking.
*/
import { createClient } from "@/lib/supabase/server";
import { updateOrderStatusAction } from "@/app/admin/actions";
import type { Order } from "@/types/database";

const ORDER_STATUSES = [
  "received", "processing", "shipped", "delivered", "cancelled", "refunded",
];

const statusColor = (status: string) => {
  const map: Record<string, string> = {
    received: "bg-blue-100 text-blue-800",
    processing: "bg-amber-100 text-amber-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-800",
  };
  return map[status] ?? "bg-gray-100 text-gray-800";
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  const allOrders = (orders ?? []) as (Order & { order_items: { product_name: string; quantity: number; line_total: number }[] })[];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-black mb-6">
        Orders
      </h1>

      {allOrders.length === 0 ? (
        <div className="text-center py-20 bg-[#F8F8F8] rounded-xl border border-[#E8E8E8]">
          <p className="text-gray-500 font-body">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {allOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden"
            >
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[#E8E8E8] bg-[#F8F8F8]">
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-black text-sm">
                    {order.order_number}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-heading font-semibold uppercase ${statusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-heading font-bold text-black">
                    ${Number(order.total).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 font-body">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Customer */}
                  <div>
                    <h3 className="font-heading font-semibold text-gray-500 text-xs uppercase tracking-wide mb-2">
                      Customer
                    </h3>
                    <p className="font-heading font-bold text-black">{order.customer_name}</p>
                    <p className="text-sm text-gray-600 font-body">{order.customer_email}</p>
                  </div>

                  {/* Shipping address */}
                  {order.shipping_address && (
                    <div>
                      <h3 className="font-heading font-semibold text-gray-500 text-xs uppercase tracking-wide mb-2">
                        Ship To
                      </h3>
                      <p className="text-sm text-gray-700 font-body">
                        {(order.shipping_address as { street: string; city: string; state: string; zip: string }).street},{" "}
                        {(order.shipping_address as { street: string; city: string; state: string; zip: string }).city},{" "}
                        {(order.shipping_address as { street: string; city: string; state: string; zip: string }).state}{" "}
                        {(order.shipping_address as { street: string; city: string; state: string; zip: string }).zip}
                      </p>
                    </div>
                  )}
                </div>

                {/* Items */}
                {order.order_items?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-heading font-semibold text-gray-500 text-xs uppercase tracking-wide mb-2">
                      Items
                    </h3>
                    <div className="space-y-1 bg-[#F8F8F8] rounded-lg p-3">
                      {order.order_items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm font-body">
                          <span className="text-gray-700">
                            {item.quantity}× {item.product_name}
                          </span>
                          <span className="font-semibold text-black">
                            ${Number(item.line_total).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status update form */}
                <form
                  action={async (formData) => {
                    "use server";
                    const status = formData.get("status") as string;
                    const trackingNumber = formData.get("tracking_number") as string;
                    const trackingCarrier = formData.get("tracking_carrier") as string;
                    await updateOrderStatusAction(
                      order.id,
                      status,
                      trackingNumber || undefined,
                      trackingCarrier || undefined
                    );
                  }}
                  className="pt-4 border-t border-[#E8E8E8] grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  <div>
                    <label className="block text-xs font-heading font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={order.status}
                      className="w-full px-3 py-2 border border-[#E8E8E8] rounded-lg text-sm font-body focus:outline-none focus:border-brand-blue/50"
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Tracking #
                    </label>
                    <input
                      type="text"
                      name="tracking_number"
                      defaultValue={order.tracking_number ?? ""}
                      placeholder="1Z999AA10123456784"
                      className="w-full px-3 py-2 border border-[#E8E8E8] rounded-lg text-sm font-body focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Carrier
                    </label>
                    <input
                      type="text"
                      name="tracking_carrier"
                      defaultValue={order.tracking_carrier ?? ""}
                      placeholder="UPS, USPS, FedEx…"
                      className="w-full px-3 py-2 border border-[#E8E8E8] rounded-lg text-sm font-body focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-blue text-white text-sm font-heading font-semibold uppercase tracking-wide rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Update Order
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
