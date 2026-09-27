import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const createClient = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  function getSupabaseCredentials() {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key =
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
      if (url && key) return { url, key };
    }

    if (process.env.NEXT_PUBLIC_storage_SUPABASE_URL) {
      const url = process.env.NEXT_PUBLIC_storage_SUPABASE_URL;
      const key =
        process.env.storage_SUPABASE_ANON_KEY ||
        process.env.storage_SUPABASE_PUBLISHABLE_KEY;
      if (url && key) return { url, key };
    }

    return { url: null, key: null };
  }

  const { url: supabaseUrl, key: supabaseKey } = getSupabaseCredentials();

  // If Supabase credentials are not configured, do not crash the website
  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // Refresh auth session
    await supabase.auth.getUser();
  } catch (error) {
    // Gracefully ignore session refresh errors to prevent site downtime
    console.error("Middleware Supabase session update error:", error);
  }

  return supabaseResponse;
};
