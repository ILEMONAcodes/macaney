'use client';

import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import type { StoreProduct } from '@/lib/store/products';

export function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

type ProductCardProps = {
  product: StoreProduct;
  index: number;
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const question = `Hi Macaney, my name is [Your name] and I am contacting you from [Your location]. I am interested in ${product.name} and would like to ask a few questions about it. Could you please share more information, current availability, and delivery options? Thank you.`;

  return (
    <article
      className="group overflow-hidden rounded-xl border border-stone-200 bg-white transition duration-300 sm:hover:-translate-y-1 sm:hover:shadow-lg"
      style={{ animationDelay: String(Math.min(index * 55, 330)) + 'ms' }}
    >
      <div className="relative aspect-[4/4.6] overflow-hidden bg-stone-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-950">
          {product.category}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-emerald-700">Macaney Sustainable Solutions</p>
        <h2 className="mt-2 min-h-12 text-base font-bold leading-6 text-stone-900">{product.name}</h2>
        <p className="mt-2 min-h-12 text-sm leading-5 text-stone-600">{product.description}</p>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-2 border-t border-stone-100 pt-4">
          <span className="text-base font-bold text-emerald-950">{formatPrice(product.price, product.currency)}</span>
          {product.compareAtPrice && <span className="text-sm text-stone-400 line-through">{formatPrice(product.compareAtPrice, product.currency)}</span>}
        </div>
        <a
          href={product.selarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 text-sm font-bold text-white transition hover:bg-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
        >
          Continue to secure checkout <ArrowUpRight className="size-4" />
        </a>
        <a
          href={`${siteConfig.links.whatsappSupport}?text=${encodeURIComponent(question)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-lg px-3 text-sm font-semibold text-emerald-800 underline-offset-4 transition hover:bg-emerald-50 hover:text-emerald-950 hover:underline"
        >
          Ask about this product
        </a>
      </div>
    </article>
  );
}
