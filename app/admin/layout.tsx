// app/admin/layout.tsx
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import LogoutButton from "./logout-button"; // client component

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // not logged in
  if (!session?.user?.email) {
    redirect("/login");
  }

  const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const userEmail = (session.user.email || "").trim().toLowerCase();

  if (adminEmail && userEmail !== adminEmail) {
    redirect("/");
  }

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
