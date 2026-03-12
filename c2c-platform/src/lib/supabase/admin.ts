/**
 * Supabase admin client using the service role key.
 * Used in API routes for server-side operations.
 * Not dependent on cookies, so it works reliably in background processing.
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
