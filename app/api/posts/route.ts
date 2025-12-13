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
    const supabase = supabaseService();

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[GET /api/posts] supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: unknown) {
    console.error("[GET /api/posts] unexpected:", err);
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

    const slug =
      (body.slug ?? body.title)
        .trim()
        .toLowerCase();

    const supabase = supabaseService();

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: body.title,
        slug,
        excerpt: body.excerpt,
        content: body.content,
      })
      .select()
      .single();

    if (error) {
      console.error("[POST /api/posts] supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: unknown) {
    console.error("[POST /api/posts] unexpected:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
