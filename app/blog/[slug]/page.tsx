import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";


export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ REQUIRED in Next.js 15
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug)
    .trim()
    .toLowerCase();

  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (error || !data) {
    return <p>Post not found.</p>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-20 px-4">
      <Link href="/blog" className="text-blue-600 underline mb-4">
        ← Back to posts
      </Link>

      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      <p className="text-gray-600 mb-8">
        {data.excerpt || data.content.split(" ").slice(0, 30).join(" ")}...
      </p>

      <article className="prose max-w-none whitespace-pre-wrap">
        {data.content}
      </article>
    </main>
  );
}
