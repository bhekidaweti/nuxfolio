import { supabaseServer } from "@/lib/supabaseServer";

// GET all posts
export async function GET() {
  const { data, error } = await supabaseServer
    .from("posts")
    .select("*")
    .order("id", { ascending: false });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify({ data }), { status: 200 });
}

// POST new post
export async function POST(req: Request) {
  const body = await req.json();
  const { title, slug, excerpt, content } = body;

  if (!title || !slug || !content)
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

  const { data, error } = await supabaseServer
    .from("posts")
    .insert([{ title, slug: slug.trim().toLowerCase(), excerpt, content }]);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify({ data }), { status: 200 });
}