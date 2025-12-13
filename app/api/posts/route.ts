// app/api/posts/route.ts
import { NextRequest } from "next/server";
import { supabaseService } from "@/lib/supabaseServer";

interface PostBody {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
}

export async function GET() {
  try {
    const supabase = supabaseService();

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[GET /api/posts] supabase error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    console.error("[GET /api/posts] unexpected:", err);
    return new Response(JSON.stringify({ error: err.message || "Unknown" }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PostBody;

    if (!body?.title || !body?.content) {
      return new Response(JSON.stringify({ error: "title and content required" }), { status: 400 });
    }

    // Normalize slug
    body.slug = (body.slug || body.title).trim().toLowerCase();

    const supabase = supabaseService();

    const { data, error } = await supabase.from("posts").insert([body]);

    if (error) {
      console.error("[POST /api/posts] supabase error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 201 });
  } catch (err: any) {
    console.error("[POST /api/posts] unexpected:", err);
    return new Response(JSON.stringify({ error: err.message || "Unknown" }), { status: 500 });
  }
}
