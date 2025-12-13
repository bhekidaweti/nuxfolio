"use client";

import { supabaseBrowser } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = supabaseBrowser(); // get browser client

  async function handleLogout() {
    await supabase.auth.signOut();

    // makes middleware re-evaluate session
    router.refresh();
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="px-10 py-10 border rounded hover:bg-gray-100"
    >
      Logout
    </button>
  );
}
