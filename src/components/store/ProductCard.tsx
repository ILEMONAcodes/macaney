'use client';

import { Eye, PackageCheck, Plus } from 'lucide-react';
import type { Product } from '@/lib/store/types';

export function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

type ProductCardProps = {
  product: Product;
  index: number;
  onAdd: (product: Product) => void;
  onPreview: (product: Product) => void;
};

export default function ProductCard({ product, index, onAdd, onPreview }: ProductCardProps) {
  const inStock = product.stock_quantity > 0;

  return (
    <article
      className="group overflow-hidden border border-stone-200 bg-white transition duration-300 sm:hover:-translate-y-1 sm:hover:shadow-lg"
      style={{ animationDelay: String(Math.min(index * 55, 330)) + 'ms' }}
    >
      <div className="relative aspect-[4/4.6] overflow-hidden bg-stone-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-emerald-950 text-stone-50">
            <PackageCheck className="size-12" />
          </div>
        )}
        <span className={'absolute left-3 top-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ' + (inStock ? 'bg-white text-emerald-950' : 'bg-stone-900 text-white')}>
          {inStock ? 'In stock' : 'On request'}
        </span>
        <button
          type="button"
          onClick={() => onPreview(product)}
          className="absolute bottom-3 right-3 flex size-10 items-center justify-center bg-white text-emerald-950 opacity-100 shadow-sm transition hover:bg-emerald-600 hover:text-white focus:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          aria-label={'View ' + product.name}
        >
          <Eye className="size-4" />
        </button>
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-emerald-700">Macaney apiary supply</p>
        <h2 className="mt-2 min-h-12 text-base font-bold leading-6 text-stone-900">{product.name}</h2>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <span className="text-base font-bold text-emerald-950">{formatPrice(product.price, product.currency)}</span>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="flex size-9 shrink-0 items-center justify-center bg-emerald-700 text-white transition hover:bg-emerald-950 disabled:cursor-not-allowed disabled:bg-stone-300"
            disabled={!inStock}
            aria-label={'Add ' + product.name + ' to basket'}
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
