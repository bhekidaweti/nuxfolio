// app/api/posts/[id]/route.ts
import { NextRequest } from "next/server";
import { supabaseService } from "@/lib/supabaseServer";

interface PostBody {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
}

// GET /api/posts/[id]
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    const supabase = supabaseService();
    const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();

    if (error) {
      console.error("[GET /api/posts/:id] supabase error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    if (!data) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    console.error("[GET /api/posts/:id] unexpected:", err);
    return new Response(JSON.stringify({ error: err.message || "Unknown" }), { status: 500 });
  }
}

// PUT /api/posts/[id]
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    const body = (await req.json()) as PostBody;

    // Normalize slug if provided
    if (body.slug) body.slug = body.slug.trim().toLowerCase();

    const supabase = supabaseService();

    const { data, error } = await supabase.from("posts").update(body).eq("id", id);

    if (error) {
      console.error("[PUT /api/posts/:id] supabase error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    console.error("[PUT /api/posts/:id] unexpected:", err);
    return new Response(JSON.stringify({ error: err.message || "Unknown" }), { status: 500 });
  }
}

// DELETE /api/posts/[id]
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    const supabase = supabaseService();

    const { data, error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("[DELETE /api/posts/:id] supabase error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err: any) {
    console.error("[DELETE /api/posts/:id] unexpected:", err);
    return new Response(JSON.stringify({ error: err.message || "Unknown" }), { status: 500 });
  }
}
