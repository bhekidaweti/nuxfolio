// app/api/posts/[id]/route.ts
import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseServer";

interface PostBody {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET /api/posts/[id]
export async function GET(
  _req: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const supabase = supabaseService();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("[GET /api/posts/:id] supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: unknown) {
    console.error("[GET /api/posts/:id] unexpected:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}

// PUT /api/posts/[id]
export async function PUT(
  req: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body: PostBody = await req.json();

    const updatePayload: PostBody = {
      ...body,
      ...(body.slug && {
        slug: body.slug.trim().toLowerCase(),
      }),
    };

    const supabase = supabaseService();

    const { data, error } = await supabase
      .from("posts")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[PUT /api/posts/:id] supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: unknown) {
    console.error("[PUT /api/posts/:id] unexpected:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id]
export async function DELETE(
  _req: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const supabase = supabaseService();

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[DELETE /api/posts/:id] supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[DELETE /api/posts/:id] unexpected:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
