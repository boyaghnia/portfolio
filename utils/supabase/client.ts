import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_storage_SUPABASE_URL ||
  "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.storage_SUPABASE_PUBLISHABLE_KEY ||
  process.env.storage_SUPABASE_ANON_KEY ||
  "";

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!
  );
