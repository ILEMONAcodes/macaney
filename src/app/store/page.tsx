'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronRight, Search, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FadeIn from '@/components/animations/FadeIn';
import ProductCard, { formatPrice } from '@/components/store/ProductCard';
import { storeProducts, type StoreCategory } from '@/lib/store/products';
import { siteConfig } from '@/config/site';

const categories: Array<'All products' | StoreCategory> = [
  'All products',
  'Honey & bee products',
  'Hives & equipment',
  'Training & courses',
];

export default function StorePage() {
  const pathname = usePathname();
  const isShopPage = pathname === '/store/shop';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>('All products');

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return storeProducts.filter((product) => {
      const matchesCategory = category === 'All products' || product.category === category;
      const matchesSearch = !search || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  const productQuestionUrl = () => {
    const message = 'Hi Macaney, my name is [Your name] and I am contacting you from [Your location]. I am interested in [Product name] and would like to ask a few questions about it. Could you please share more information, current availability, and delivery options? Thank you.';
    return `${siteConfig.links.whatsappSupport}?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="max-w-full overflow-x-clip bg-white pt-20 text-stone-900">
      {!isShopPage && <>
        <section className="relative isolate overflow-hidden border-b border-emerald-900 bg-emerald-950 px-4 py-10 text-white sm:px-6 sm:py-16 lg:px-8" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), radial-gradient(circle at 85% 80%, rgba(245,158,11,0.20), transparent 30%)', backgroundSize: '54px 54px, 54px 54px, auto' }}>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-950 via-emerald-950/90 to-stone-950/80" />
          <FadeIn className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-xs text-emerald-100/70">
              <Link href="/" className="transition hover:text-white">Home</Link><ChevronRight className="size-3" /><span>Store</span>
            </nav>
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.8fr)] lg:gap-16">
              <div className="max-w-2xl">
                <p className="inline-flex border border-amber-300/30 bg-amber-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Macaney apiary supply</p>
                <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">Tools, training, and <span className="text-amber-300">hive essentials.</span></h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-emerald-100/85 sm:text-lg">Explore trusted beekeeping equipment, raw honey, and practical courses for healthier colonies and more dependable harvests.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/store/shop" className="inline-flex min-h-12 items-center justify-center gap-2 bg-amber-400 px-6 text-sm font-bold text-emerald-950 transition hover:bg-amber-300">Explore all products <ArrowRight className="size-4" /></Link>
                  <a href={productQuestionUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-emerald-300/35 bg-emerald-950/30 px-6 text-sm font-bold text-white transition hover:border-amber-300/60 hover:bg-emerald-900">Ask a product question <ArrowUpRight className="size-4" /></a>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-xl pb-5 pt-2 lg:pb-10">
                <div className="relative aspect-[1.05] overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] border border-amber-300/20 bg-amber-400 shadow-2xl shadow-black/30 transition-transform duration-700 lg:rotate-[-2deg] lg:hover:rotate-0">
                  <img src="/images/beeess.png" alt="Beekeepers inspecting hives at an apiary" className="size-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 border border-white/15 bg-emerald-950/80 p-4 backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-xs">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300">Now displaying</p>
                    <p className="mt-1 text-lg font-bold text-white">Bee-ready equipment</p>
                    <p className="mt-1 text-xs text-emerald-100/75">Curated for your apiary</p>
                  </div>
                </div>
                <div className="absolute -bottom-1 -left-2 border border-emerald-700 bg-emerald-900 px-4 py-3 text-xs font-semibold text-emerald-50 shadow-xl sm:-left-7">Built for the apiary</div>
                <div className="absolute -right-2 top-7 bg-amber-400 px-4 py-3 text-xs font-bold text-emerald-950 shadow-xl sm:-right-7">New stock arrivals</div>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="overflow-hidden border-y border-amber-500 bg-amber-400 py-4 text-emerald-950" aria-label="Product categories">
          <div className="flex w-max animate-[equipment-ticker_26s_linear_infinite] items-center gap-7 whitespace-nowrap hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...categories.slice(1), ...categories.slice(1), ...categories.slice(1), ...categories.slice(1)].map((item, index) => <div key={item + index} className="flex items-center gap-7 text-sm font-extrabold uppercase tracking-[0.14em] sm:text-base"><span>{item}</span><span className="size-2 rounded-full bg-emerald-900" aria-hidden="true" /></div>)}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-5">
            <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Selected for your apiary</p><h2 className="mt-1 text-2xl font-bold">Popular products</h2></div>
            <Link href="/store/shop" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition hover:text-emerald-950">View all products <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {storeProducts.slice(0, 3).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        </section>
      </>}

      {isShopPage && <section id="catalog" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-stone-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Macaney catalog</p><h1 className="mt-1 text-2xl font-bold">Find what your apiary needs</h1></div>
          <p className="text-sm text-stone-500">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</p>
        </div>

        <div className="grid gap-5 py-7 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <aside id="categories" className="scroll-mt-24 border-b border-stone-200 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold"><SlidersHorizontal className="size-4 text-emerald-700" /> Browse by category</div>
            <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:flex-col">
              {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={'flex min-h-11 items-center justify-center border px-3 py-2.5 text-center text-sm transition lg:justify-start lg:text-left ' + (category === item ? 'border-emerald-800 bg-emerald-950 text-white' : 'border-stone-200 bg-white text-stone-700 hover:border-emerald-700')}>{item}</button>)}
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative block max-w-md flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products" className="h-11 w-full border border-stone-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-emerald-700" /></label>
            </div>
            {filteredProducts.length === 0 && <div className="border border-stone-200 bg-stone-50 px-6 py-14 text-center"><h2 className="font-bold">No products found</h2><p className="mt-1 text-sm text-stone-500">Try another category or search term.</p></div>}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
          </div>
        </div>
      </section>}
    </main>
  );
}
