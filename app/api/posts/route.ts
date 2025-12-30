// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseServer";

interface PostBody {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
}

export async function GET() {
  try {
    const { data, error } = await supabaseService()
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body: PostBody = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "title and content required" },
        { status: 400 }
      );
    }

    const slug = (body.slug ?? body.title)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    const { data, error } = await supabaseService()
      .from("posts")
      .insert({
        title: body.title,
        slug,
        excerpt: body.excerpt ?? "",
        content: body.content,
        image_url: null, // ✅ explicit & safe
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
