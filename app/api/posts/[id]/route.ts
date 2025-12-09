import { supabaseServer } from "@/lib/supabaseServer";

// ✅ Get single post by id
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {

    const {id} = params;
    const { data, error } = await supabaseServer
      .from("posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// ✅ Update a post
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const {id} = params;
    const { title, slug, excerpt, content } = await req.json();    
    const { data, error } = await supabaseServer
      .from("posts")
      .update({ title, slug: slug.trim().toLowerCase(), excerpt, content })
      .eq("id", id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// ✅ Delete a post
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const {id} = params;
    const { data, error } = await supabaseServer
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}