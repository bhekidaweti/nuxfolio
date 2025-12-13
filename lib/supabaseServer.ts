// lib/supabaseServer.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Request-scoped server client (uses request cookies).
 * Use this in server components / layouts to get session.
 */
export async function supabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get: (name: string) => cookieStore.get(name)?.value,
      // Server components shouldn't mutate cookies here — keep no-op for set/remove
      set: () => {},
      remove: () => {},
    },
  });
}

/**
 * Server client using the service-role key.
 * Use this for admin API endpoints (create/update/delete) so RLS won't block.
 */
export function supabaseService() {
  return createServerClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    // service client doesn't rely on cookies
    cookies: {
      get: () => undefined,
      set: () => {},
      remove: () => {},
    },
  });
}
