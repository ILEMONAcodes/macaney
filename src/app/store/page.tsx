'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronRight, CircleAlert, LoaderCircle, Minus, Package, Plus, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import ProductCard, { formatPrice } from '@/components/store/ProductCard';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { Product } from '@/lib/store/types';

type CartItem = { product: Product; quantity: number };

const categories = ['All equipment', 'Hives & frames', 'Protective wear', 'Harvesting', 'Hand tools'];

function categoryFor(product: Product) {
  const name = product.name.toLowerCase();
  if (name.includes('hive') || name.includes('frame')) return 'Hives & frames';
  if (name.includes('suit') || name.includes('veil') || name.includes('glove')) return 'Protective wear';
  if (name.includes('extractor') || name.includes('honey') || name.includes('filter')) return 'Harvesting';
  return 'Hand tools';
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error: queryError } = await supabase
          .from('products')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });
        if (queryError) throw queryError;
        setProducts((data ?? []) as Product[]);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'We could not load equipment right now.');
      } finally {
        setLoading(false);
      }
    }
    void loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === categories[0] || categoryFor(product) === category;
      const matchesSearch = !search || (product.name + ' ' + product.description).toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }, [category, products, query]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  function addToCart(product: Product) {
    if (product.stock_quantity < 1) return;
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (!existing) return [...current, { product, quantity: 1 }];
      return current.map((item) => item.product.id === product.id
        ? { ...item, quantity: Math.min(item.quantity + 1, product.stock_quantity) }
        : item);
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  }

  function updateQuantity(productId: string, nextQuantity: number) {
    setCart((current) => current.flatMap((item) => {
      if (item.product.id !== productId) return [item];
      if (nextQuantity < 1) return [];
      return [{ ...item, quantity: Math.min(nextQuantity, item.product.stock_quantity) }];
    }));
  }

  function orderViaWhatsApp() {
    const lines = cart.map(({ product, quantity }) => String(quantity) + 'x ' + product.name + ' - ' + formatPrice(product.price * quantity, product.currency));
    const message = 'Hello Macaney, I would like to order:\n' + lines.join('\n') + '\n\nTotal: ' + formatPrice(cartTotal, 'NGN');
    window.open('https://wa.me/2348000000000?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="min-h-screen bg-white pb-20 pt-20 text-stone-900">
      <section className="border-b border-stone-200 bg-emerald-950 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <FadeIn className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-xs text-emerald-100/70">
            <Link href="/" className="transition hover:text-white">Home</Link><ChevronRight className="size-3" /><span>Store</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Macaney supply store</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Equipment that earns its place in the apiary.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-100/85 sm:text-lg">Practical beekeeping tools, selected for safe field work and dependable honey handling in African conditions.</p>
            </div>
            <div className="border-l border-emerald-800 pl-5 text-sm text-emerald-100">
              <p className="font-semibold text-white">Need guidance before you buy?</p>
              <Link href="/ai-beekeeper" className="mt-3 inline-flex items-center gap-2 font-bold text-amber-300 transition hover:text-white">Ask the AI Beekeeper <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-stone-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Shop equipment</p><h2 className="mt-1 text-2xl font-bold">Find the right tools for your colony</h2></div>
          <button type="button" onClick={() => setIsCartOpen(true)} className="inline-flex min-h-11 items-center justify-center gap-2 bg-emerald-700 px-4 text-sm font-bold text-white transition hover:bg-emerald-950" aria-label="Open basket"><ShoppingBag className="size-4" /> Basket <span className="border-l border-emerald-500 pl-2">{cartCount}</span></button>
        </div>

        <div className="grid gap-5 py-7 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <aside className="border-b border-stone-200 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold"><SlidersHorizontal className="size-4 text-emerald-700" /> Browse by category</div>
            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col">
              {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={'shrink-0 border px-3 py-2.5 text-left text-sm transition ' + (category === item ? 'border-emerald-800 bg-emerald-950 text-white' : 'border-stone-200 bg-white text-stone-700 hover:border-emerald-700')}>{item}</button>)}
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative block max-w-md flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search equipment" className="h-11 w-full border border-stone-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-emerald-700" /></label>
              <p className="text-sm text-stone-500">{filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}</p>
            </div>
            {loading && <div className="flex justify-center py-24 text-emerald-700"><LoaderCircle className="size-8 animate-spin" /></div>}
            {error && <div role="alert" className="border border-amber-300 bg-amber-50 p-5 text-sm text-stone-800"><CircleAlert className="mr-2 inline size-4 text-amber-700" />{error}</div>}
            {!loading && !error && filteredProducts.length === 0 && <div className="border border-stone-200 bg-stone-50 px-6 py-14 text-center"><Package className="mx-auto size-7 text-emerald-700" /><h3 className="mt-4 font-bold">No equipment found</h3><p className="mt-1 text-sm text-stone-500">Try another category or search term.</p></div>}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} onAdd={addToCart} onPreview={setSelectedProduct} />)}</div>
          </div>
        </div>
      </section>

      {selectedProduct && <div className="fixed inset-0 z-50 flex items-end bg-stone-950/45 p-0 sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={selectedProduct.name}>
        <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto bg-white sm:grid sm:grid-cols-2">
          <div className="relative aspect-square bg-stone-100 sm:aspect-auto">{selectedProduct.image_url ? <img src={selectedProduct.image_url} alt={selectedProduct.name} className="size-full object-cover" /> : <div className="flex size-full items-center justify-center bg-emerald-950 text-white"><Package className="size-12" /></div>}<button type="button" onClick={() => setSelectedProduct(null)} className="absolute right-3 top-3 flex size-9 items-center justify-center bg-white text-stone-900 shadow-sm" aria-label="Close product preview"><X className="size-4" /></button></div>
          <div className="flex flex-col p-6 sm:p-8"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">Macaney apiary supply</p><h2 className="mt-3 text-2xl font-bold leading-tight">{selectedProduct.name}</h2><p className="mt-4 text-sm leading-6 text-stone-600">{selectedProduct.description}</p><div className="mt-6 border-y border-stone-200 py-4"><p className="text-xl font-bold text-emerald-950">{formatPrice(selectedProduct.price, selectedProduct.currency)}</p><p className="mt-1 text-xs text-stone-500">{selectedProduct.stock_quantity > 0 ? String(selectedProduct.stock_quantity) + ' units currently available' : 'Available on request'}</p></div><button type="button" onClick={() => addToCart(selectedProduct)} disabled={selectedProduct.stock_quantity < 1} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 bg-emerald-700 px-4 text-sm font-bold text-white transition hover:bg-emerald-950 disabled:bg-stone-300"><ShoppingBag className="size-4" /> Add to basket</button></div>
        </div>
      </div>}

      {isCartOpen && <div className="fixed inset-0 z-50 bg-stone-950/45" role="dialog" aria-modal="true" aria-label="Shopping basket" onMouseDown={() => setIsCartOpen(false)}>
        <aside className="ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-5"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Your order</p><h2 className="mt-1 text-xl font-bold">Basket ({cartCount})</h2></div><button type="button" onClick={() => setIsCartOpen(false)} className="flex size-10 items-center justify-center border border-stone-200 text-stone-800 transition hover:border-emerald-700" aria-label="Close basket"><X className="size-4" /></button></div>
          <div className="flex-1 overflow-y-auto px-5 py-4">{cart.length === 0 ? <div className="py-16 text-center"><ShoppingBag className="mx-auto size-8 text-emerald-700" /><p className="mt-4 font-bold">Your basket is empty</p><button type="button" onClick={() => setIsCartOpen(false)} className="mt-4 text-sm font-bold text-emerald-700">Continue shopping</button></div> : <div className="divide-y divide-stone-200">{cart.map(({ product, quantity }) => <div key={product.id} className="flex gap-3 py-4"><div className="size-16 shrink-0 overflow-hidden bg-stone-100">{product.image_url && <img src={product.image_url} alt="" className="size-full object-cover" />}</div><div className="min-w-0 flex-1"><p className="font-bold leading-5 text-stone-900">{product.name}</p><p className="mt-1 text-sm font-semibold text-emerald-950">{formatPrice(product.price, product.currency)}</p><div className="mt-3 flex items-center gap-3"><button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} className="flex size-7 items-center justify-center border border-stone-300" aria-label={'Reduce ' + product.name + ' quantity'}><Minus className="size-3" /></button><span className="w-3 text-center text-sm font-bold">{quantity}</span><button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} className="flex size-7 items-center justify-center border border-stone-300" aria-label={'Increase ' + product.name + ' quantity'}><Plus className="size-3" /></button></div></div></div>)}</div>}</div>
          {cart.length > 0 && <div className="border-t border-stone-200 p-5"><div className="flex items-center justify-between text-sm"><span className="text-stone-600">Order total</span><span className="text-lg font-bold text-emerald-950">{formatPrice(cartTotal, 'NGN')}</span></div><button type="button" onClick={orderViaWhatsApp} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-emerald-700 px-4 text-sm font-bold text-white transition hover:bg-emerald-950">Request order on WhatsApp <ArrowRight className="size-4" /></button></div>}
        </aside>
      </div>}
    </main>
  );
}
