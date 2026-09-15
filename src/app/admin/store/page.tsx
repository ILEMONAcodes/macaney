'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Edit3, LoaderCircle, LogOut, PackagePlus, ShieldCheck, Trash2 } from 'lucide-react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { Product, ProductInput } from '@/lib/store/types';

const emptyProduct: ProductInput = {
  name: '', description: '', price: 0, currency: 'NGN', stock_quantity: 0, status: 'active', image_url: '',
};

function productSlug(name: string) {
  return `${name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-6)}`;
}

export default function AdminStorePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductInput>(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadAdminState() {
    setChecking(true);
    setError('');
    try {
      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsAdmin(false); return; }
      const { data: profile, error: profileError } = await supabase.from('profiles').select('is_store_admin').eq('id', user.id).single();
      if (profileError) throw profileError;
      if (!profile?.is_store_admin) {
        setIsAdmin(false);
        setError('This account is signed in but has not been granted store administrator access.');
        return;
      }
      setIsAdmin(true);
      const { data, error: productError } = await supabase.from('products').select('*').order('updated_at', { ascending: false });
      if (productError) throw productError;
      setProducts((data ?? []) as Product[]);
    } catch (stateError) {
      setIsAdmin(false);
      setError(stateError instanceof Error ? stateError.message : 'Unable to verify administrator access.');
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => { void loadAdminState(); }, []);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setBusy(true); setError(''); setMessage('');
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      setPassword('');
      await loadAdminState();
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Sign-in failed.');
    } finally { setBusy(false); }
  }

  async function saveProduct(event: FormEvent) {
    event.preventDefault();
    setBusy(true); setError(''); setMessage('');
    try {
      const supabase = getSupabaseBrowserClient();
      const payload = { ...form, image_url: form.image_url || null, currency: form.currency.toUpperCase() };
      const request = editingId
        ? supabase.from('products').update(payload).eq('id', editingId)
        : supabase.from('products').insert({ ...payload, slug: productSlug(payload.name) });
      const { error: saveError } = await request;
      if (saveError) throw saveError;
      setMessage(editingId ? 'Equipment listing updated.' : 'Equipment listing added to inventory.');
      setForm(emptyProduct); setEditingId(null);
      await loadAdminState();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'We could not save this listing.');
    } finally { setBusy(false); }
  }

  async function removeProduct(product: Product) {
    if (!window.confirm(`Remove “${product.name}” from the store? This cannot be undone.`)) return;
    setBusy(true); setError(''); setMessage('');
    try {
      const { error: deleteError } = await getSupabaseBrowserClient().from('products').delete().eq('id', product.id);
      if (deleteError) throw deleteError;
      setProducts((current) => current.filter((item) => item.id !== product.id));
      setMessage('Equipment listing removed.');
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'We could not remove this listing.');
    } finally { setBusy(false); }
  }

  function editProduct(product: Product) {
    setEditingId(product.id);
    setForm({ name: product.name, description: product.description, price: product.price, currency: product.currency, stock_quantity: product.stock_quantity, status: product.status, image_url: product.image_url ?? '' });
    setMessage(''); setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function signOut() {
    await getSupabaseBrowserClient().auth.signOut();
    setIsAdmin(false); setProducts([]); setMessage(''); setError('');
  }

  if (checking) return <main className="flex min-h-screen items-center justify-center bg-stone-50 pt-20 text-emerald-600"><LoaderCircle className="size-8 animate-spin" /></main>;

  if (!isAdmin) return (
    <main className="min-h-screen bg-stone-50 px-4 pb-16 pt-28 sm:px-6">
      <section className="mx-auto max-w-md rounded-3xl border border-emerald-900/15 bg-stone-100 p-7 shadow-xl shadow-emerald-950/10">
        <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-emerald-950 text-stone-50"><ShieldCheck className="size-6" /></div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">Macaney operations</p>
        <h1 className="mt-2 text-2xl font-bold text-stone-900">Store administration</h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">Sign in with the Supabase account that has been approved to manage Macaney equipment.</p>
        <form onSubmit={signIn} className="mt-6 space-y-4">
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Admin email" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-600" />
          <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-600" />
          <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-stone-50 transition hover:bg-emerald-900 disabled:bg-stone-400">{busy && <LoaderCircle className="size-4 animate-spin" />} Secure sign in</button>
        </form>
        {error && <p role="alert" className="mt-4 text-sm text-emerald-950">{error}</p>}
      </section>
    </main>
  );

  return (
    <main className="min-h-screen bg-stone-50 px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-emerald-900/15 pb-6">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">Macaney operations</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">Equipment inventory</h1><p className="mt-2 text-sm text-stone-600">Keep the catalogue accurate, useful and ready for your customers.</p></div>
          <button onClick={() => void signOut()} className="inline-flex items-center gap-2 rounded-xl border border-emerald-900/20 px-3 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-stone-100"><LogOut className="size-4" /> Sign out</button>
        </header>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
          <section className="rounded-3xl border border-emerald-900/15 bg-stone-100 p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-emerald-950"><PackagePlus className="size-5" /><h2 className="font-bold">{editingId ? 'Edit equipment' : 'Add equipment'}</h2></div>
            <form onSubmit={saveProduct} className="space-y-4">
              <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Product name" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-600" />
              <textarea required minLength={10} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Practical product description" rows={4} className="w-full resize-y rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-600" />
              <input value={form.image_url ?? ''} onChange={(event) => setForm({ ...form, image_url: event.target.value })} type="url" placeholder="Product image URL (optional)" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-600" />
              <div className="grid gap-3 sm:grid-cols-2"><input required min="0" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} type="number" placeholder="Price" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-600" /><input required min="0" value={form.stock_quantity} onChange={(event) => setForm({ ...form, stock_quantity: Number(event.target.value) })} type="number" placeholder="Stock quantity" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-600" /></div>
              <div className="grid gap-3 sm:grid-cols-2"><input required maxLength={3} value={form.currency} onChange={(event) => setForm({ ...form, currency: event.target.value })} placeholder="Currency" className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm uppercase outline-none focus:border-emerald-600" /><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as Product['status'] })} className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"><option value="active">Active</option><option value="draft">Draft</option></select></div>
              <div className="flex flex-col gap-3 sm:flex-row"><button disabled={busy} className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-stone-50 transition hover:bg-emerald-900 disabled:bg-stone-400">{editingId ? 'Save changes' : 'Add listing'}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyProduct); }} className="rounded-xl border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700">Cancel</button>}</div>
            </form>
            {message && <p className="mt-4 flex items-center gap-2 text-sm text-emerald-900"><CheckCircle2 className="size-4" />{message}</p>}
            {error && <p role="alert" className="mt-4 text-sm text-emerald-950">{error}</p>}
          </section>
          <section className="overflow-hidden rounded-3xl border border-emerald-900/15 bg-stone-100">
            <div className="border-b border-emerald-900/10 px-5 py-5 sm:px-6"><h2 className="font-bold text-stone-900">Current catalogue</h2><p className="mt-1 text-sm text-stone-600">{products.length} equipment {products.length === 1 ? 'listing' : 'listings'} in inventory</p></div>
            <div className="divide-y divide-stone-200">{products.map((product) => <div key={product.id} className="flex items-center gap-4 px-5 py-4 sm:px-6"><div className="size-14 shrink-0 overflow-hidden rounded-xl bg-emerald-900">{product.image_url && <img src={product.image_url} alt="" className="size-full object-cover" />}</div><div className="min-w-0 flex-1"><p className="truncate font-bold text-stone-900">{product.name}</p><p className="mt-1 text-xs text-stone-600">{product.currency} {product.price.toLocaleString()} · {product.stock_quantity} in stock · {product.status}</p></div><div className="flex gap-2"><button onClick={() => editProduct(product)} className="rounded-lg p-2 text-emerald-900 transition hover:bg-emerald-900/10" aria-label={`Edit ${product.name}`}><Edit3 className="size-4" /></button><button disabled={busy} onClick={() => void removeProduct(product)} className="rounded-lg p-2 text-emerald-900 transition hover:bg-emerald-900/10" aria-label={`Delete ${product.name}`}><Trash2 className="size-4" /></button></div></div>)}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
