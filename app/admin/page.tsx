"use client";

import { useEffect, useState } from "react";
import PostForm from "@/components/blog/PostForm";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Fetch all posts
  const fetchPosts = async () => {
    const res = await fetch("/api/posts", { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch posts");
      return;
    }
    const json = await res.json();
    setPosts(json.data || []);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) fetchPosts();
  };

  // Edit post
  const handleEdit = (post: Post) => setEditingPost(post);

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Post Form */}
      <PostForm
        key={editingPost?.id || "new"} // reset form when switching
        post={editingPost ?? undefined}
        onSuccess={() => {
          fetchPosts();
          setEditingPost(null);
        }}
      />
      {/* List of posts */}
      <div className="mt-10 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Existing Posts</h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded-md flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt || post.content.slice(0, 50)}...</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}