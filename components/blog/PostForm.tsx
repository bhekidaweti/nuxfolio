"use client";

import { useState, useEffect } from "react";

interface PostFormProps {
  post?: {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
  };
  onSuccess?: () => void;
}

export default function PostForm({ post, onSuccess }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const method = post ? "PUT" : "POST";
    const url = post ? `/api/posts/${post.id}` : "/api/posts";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, excerpt, content }),
    });

    if (!res.ok) {
      alert("Failed to save post");
      setLoading(false);
      return;
    }

    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setLoading(false);
    if (onSuccess) onSuccess();
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (!post) setSlug(title.trim().toLowerCase().replace(/\s+/g, "-"));
  }, [title, post]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4 border p-6 rounded-md">
      <h2 className="text-xl font-bold">{post ? "Edit Post" : "Create New Post"}</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        placeholder="Excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        rows={2}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        rows={6}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}