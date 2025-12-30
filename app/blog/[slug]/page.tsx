import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const decodedSlug = decodeURIComponent(params.slug)
    .trim()
    .toLowerCase();

  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (error || !data) {
    notFound();
  }

  const html = marked.parse(data.content);

  return (
    <main className="min-h-screen flex flex-col items-center py-20 px-4">
      <Link href="/blog" className="text-blue-600 underline mb-4">
        ← Back to posts
      </Link>
	  
	{data.image_url && (
		<img
			src={data.image_url}
			alt={data.title}
			className="mb-8 rounded-lg max-h-[420px] object-cover"
		/>
	)}


      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      <p className="text-gray-600 mb-8">
        {data.excerpt || data.content.split(" ").slice(0, 30).join(" ")}...
      </p>

      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
