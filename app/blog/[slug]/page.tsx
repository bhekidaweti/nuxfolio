import { supabase } from "@/lib/supabaseClient";
import Link from "next/link"; 

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  const normalizedSlug = slug.trim().toLowerCase();

  //console.log("[blog] incoming slug:", slug);
  //console.log("[blog] normalized slug:", normalizedSlug);

  const { data: sample, error: sampleErr } = await supabase
    .from("posts")
    .select("id, title, slug")
    .limit(10);

  console.log("[blog] sample rows:", sample);
  if (sampleErr) console.error("[blog] sample error:", sampleErr);

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", normalizedSlug)
    .maybeSingle();

  if (!data && !error) {
    console.log("[blog] exact match returned null, trying ilike fallback…");

    const fallback = await supabase
      .from("posts")
      .select("*")
      .ilike("slug", `%${normalizedSlug}%`)
      .limit(1)
      .maybeSingle();

    //console.log("[blog] fallback result:", fallback);

    if (fallback.error)
      console.error("[blog] fallback error:", fallback.error);

    if (fallback.data)
      return renderPost(fallback.data);
  }


  if (error) {
    console.error("[blog] query error:", error);
    return <p className="text-red-500">Error loading post: {error.message}</p>;
  }
//
  if (!data) {
    console.log("[blog] no post found for slug:", normalizedSlug);
    return <p>Post not found .....</p>;
  }

  return renderPost(data);
}

function renderPost(post: Post) {
  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-4">
      <Link
        href={`/`}
        className="text-blue-600 underline"
        >
        ← Back to posts
      </Link>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-8">
        {post.excerpt || post.content.split(" ").slice(0, 30).join(" ")}...
      </p>
      <article className="prose max-w-none whitespace-pre-wrap">
        {post.content}
      </article>
    </main>
  );
}
