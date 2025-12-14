import { supabaseServer } from "@/lib/supabaseServer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { SquareArrowUpLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const posts = data ?? [];

  if (error)
    return <p className="text-red-500">Failed to load posts: {error.message}</p>;

  if (posts.length === 0) return <p>No posts found.</p>;

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-4">
      <Link href="/" className="mb-6 px-4 py-10 text-white rounded hover:bg-blue-700">
        <SquareArrowUpLeft className="inline-block mr-2" />
        Home page
      </Link>

      <div className="grid gap-6 w-full max-w-4xl">
        {posts.map((post) => {
          const excerpt =
            post.excerpt ||
            post.content
              .replace(/\n/g, " ")
              .split(" ")
              .slice(0, 30)
              .join(" ");

          return (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{excerpt}...</p>
                <Link
                  href={`/blog/${encodeURIComponent(
                    post.slug.trim().toLowerCase()
                  )}`}
                  className="text-blue-600 underline"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
