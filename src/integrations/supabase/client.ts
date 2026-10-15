import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function createOptionalClient() {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim();
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) return null;
  try {
    const parsed = new URL(url);
    if (!["https:", "http:"].includes(parsed.protocol)) return null;
    return createClient<Database>(url, key, {
      auth: {
        storage: sessionStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
      // A disconnected backend must not hold the frontend indefinitely.
      global: {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            signal: AbortSignal.any([
              ...(init?.signal ? [init.signal] : []),
              AbortSignal.timeout(8000),
            ]),
          }),
      },
    });
  } catch {
    return null;
  }
}

// No fake endpoint or credentials: a missing configuration means frontend preview.
export const supabase = createOptionalClient();
