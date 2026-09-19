'use client';

import { Share2 } from 'lucide-react';

export default function ShareButton({ title }: { title: string }) {
  async function share() {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
  }

  return <button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm transition hover:border-emerald-700 hover:bg-emerald-50"><Share2 className="size-4" />Share</button>;
}
