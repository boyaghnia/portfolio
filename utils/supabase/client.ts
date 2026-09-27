import { createBrowserClient } from "@supabase/ssr";

function getSupabaseBrowserCredentials() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      "";
    return { url, key };
  }

  if (process.env.NEXT_PUBLIC_storage_SUPABASE_URL) {
    const url = process.env.NEXT_PUBLIC_storage_SUPABASE_URL;
    const key =
      process.env.storage_SUPABASE_ANON_KEY ||
      process.env.storage_SUPABASE_PUBLISHABLE_KEY ||
      "";
    return { url, key };
  }

  return { url: "", key: "" };
}

const { url: supabaseUrl, key: supabaseKey } = getSupabaseBrowserCredentials();

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey
  );
