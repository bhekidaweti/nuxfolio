// lib/posts.ts
import { supabaseService } from "@/lib/supabaseServer";

export async function getAllPosts() {
  const supabase = supabaseService();
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("[getAllPosts] supabase error:", error);
    return [];
  }
  return data;
}
