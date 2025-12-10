import { NextRequest, NextResponse } from "next/server";
import type { Params } from "next/dist/server/request/params";
import { supabaseServer } from "@/lib/supabaseServer";

// GET single post
export async function GET(
  _req: NextRequest,
  context: { params: Params }
) {
  try {
    const { id } = context.params;

    const { data, error } = await supabaseServer
      .from("posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// UPDATE
export async function PUT(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const body = await req.json();
    const { id } = context.params;

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
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  _req: NextRequest,
  context: { params: Params }
) {
  try {
    const { id } = context.params;

    const { data, error } = await supabaseServer
      .from("posts")
      .delete()
      .eq("id", id);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
