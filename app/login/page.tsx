"use client";

export const dynamic = "force-dynamic";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  // ✅ Create client lazily (NOT at module scope)
  const supabase = useMemo(() => supabaseBrowser(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.refresh();
    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm border rounded p-6 shadow"
      >
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>

        {errorMsg && (
          <p className="text-red-500 text-sm mb-3">{errorMsg}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="border w-full p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="border w-full p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
