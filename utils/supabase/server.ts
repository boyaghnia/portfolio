import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getSupabaseServerCredentials() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      "";
    return { url, key };
  }

  if (process.env.NEXT_PUBLIC_storage_SUPABASE_URL) {
    const url = process.env.NEXT_PUBLIC_storage_SUPABASE_URL;
    const key =
      process.env.storage_SUPABASE_SERVICE_ROLE_KEY ||
      process.env.storage_SUPABASE_ANON_KEY ||
      process.env.storage_SUPABASE_PUBLISHABLE_KEY ||
      "";
    return { url, key };
  }

  return { url: "", key: "" };
}

const { url: supabaseUrl, key: supabaseKey } = getSupabaseServerCredentials();

export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
