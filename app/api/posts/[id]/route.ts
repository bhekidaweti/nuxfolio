// app/api/posts/[id]/route.ts

import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabaseServer";
import { uploadBlogImage } from "@/lib/uploadBlogImage";

/* =========================
   GET /api/posts/[id]
========================= */
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const { data, error } = await supabaseService()
      .from("posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("[GET] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error("[GET] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =========================
   PUT /api/posts/[id]
========================= */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const formData = await req.formData();

    const title = formData.get("title")?.toString().trim();
    const slug = formData.get("slug")?.toString().trim();
    const excerpt = formData.get("excerpt")?.toString() ?? "";
    const content = formData.get("content")?.toString().trim();
    const image = formData.get("image") as File | null;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug and content are required" },
        { status: 400 }
      );
    }

    let image_url: string | undefined;

    if (image && image.size > 0) {
      image_url = await uploadBlogImage(image, slug);
    }

    const updateData: Record<string, any> = {
      title,
      slug,
      excerpt,
      content,
    };

    if (image_url) {
      updateData.image_url = image_url;
    }

    const { error } = await supabaseService()
      .from("posts")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error("[PUT] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[PUT] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE /api/posts/[id]
========================= */
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const { error } = await supabaseService()
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[DELETE] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[DELETE] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
