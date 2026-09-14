'use client';

import { createBrowserClient } from '@supabase/ssr';

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error('Supabase is not configured. Add the public Supabase URL and publishable key to your environment.');
  }

  return createBrowserClient(url, publishableKey);
}
