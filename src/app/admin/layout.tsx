/*
  Admin Layout — wraps all /admin/* pages.
  Checks that the user is authenticated AND has admin role.
  If not, redirects to the appropriate page.
  Renders the sidebar + main content area.
*/
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin — Retrofit Creations",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/account/login");

  // Check admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        {/* Admin top bar */}
        <div className="border-b border-[#E8E8E8] px-6 py-3 flex items-center justify-between bg-white">
          <p className="text-xs text-gray-400 font-body">
            Logged in as{" "}
            <span className="font-semibold text-gray-600">
              {profile.full_name ?? user.email}
            </span>
            {" "}— Admin
          </p>
        </div>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
