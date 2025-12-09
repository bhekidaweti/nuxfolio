import { supabaseServer } from "@/lib/supabaseServer";

// GET single post
export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const { data, error } = await supabaseServer
      .from("posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// UPDATE
export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await req.json();

    const { title, slug, excerpt, content } = body;

    const { data, error } = await supabaseServer
      .from("posts")
      .update({
        title,
        slug: slug.trim().toLowerCase(),
        excerpt,
        content,
      })
      .eq("id", id);

    if (error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// DELETE
export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const { data, error } = await supabaseServer
      .from("posts")
      .delete()
      .eq("id", id);

    if (error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
