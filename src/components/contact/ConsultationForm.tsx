'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, ChevronDown, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/services';

const PROJECTS = SERVICES.map(({ name }) => name);

const fieldClass = 'w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-700/10';

export default function ConsultationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', project: '', message: '' });

  useEffect(() => {
    // Query parameters are only available in the browser. Reading them here keeps
    // this otherwise static page safe to prerender during production builds.
    const selectedProject = new URLSearchParams(window.location.search).get('project');
    if (selectedProject && PROJECTS.includes(selectedProject as (typeof PROJECTS)[number])) {
      setForm((current) => ({ ...current, project: selectedProject }));
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: form.name, email: form.email, phone_number: form.phone, country: 'Not provided', state: 'Not provided', hives_count: 'Not provided', project: form.project, message: form.message, source: 'contact-consultation', medium: 'website', campaign: 'direct' }),
      });
      if (!response.ok) throw new Error();
      setStatus('success');
    } catch { setStatus('error'); }
  }

  if (status === 'success') return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[33rem] flex-col items-center justify-center rounded-[1.75rem] bg-emerald-950 p-8 text-center text-white"><span className="flex size-14 items-center justify-center rounded-full bg-emerald-800 text-amber-300"><CheckCircle2 className="size-7" /></span><h2 className="mt-6 font-serif text-3xl font-bold">Request received.</h2><p className="mt-3 max-w-sm leading-7 text-emerald-100">Thank you for reaching out. Our team will review your request and get back to you shortly.</p><button type="button" onClick={() => setStatus('idle')} className="mt-8 text-sm font-bold text-amber-300 transition hover:text-amber-200">Send another request</button></motion.div>;

  return <motion.form id="booking-form" onSubmit={submit} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="scroll-mt-28 rounded-[1.75rem] border border-emerald-900/10 bg-white p-6 shadow-[0_22px_50px_-30px_rgba(6,78,59,0.45)] sm:p-8">
    <div className="mb-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Start a conversation</p><h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-emerald-950">Book a consultation</h2><p className="mt-2 text-sm leading-6 text-stone-600">Tell us what you are building. We will connect you with the right Macaney team member.</p></div>
    <div className="space-y-4">
      <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-stone-600">Full name</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass} placeholder="Your full name" /></label>
      <div className="grid gap-4 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-stone-600">Email address</span><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={fieldClass} placeholder="you@example.com" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-stone-600">Phone number</span><input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={fieldClass} placeholder="+234 800 000 0000" /></label></div>
      <label className="relative block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-stone-600">What can we help with?</span><select required value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className={`${fieldClass} appearance-none pr-10`}><option value="" disabled>Select a project</option>{PROJECTS.map((project) => <option key={project} value={project}>{project}</option>)}</select><ChevronDown className="pointer-events-none absolute bottom-3.5 right-4 size-5 text-emerald-800" /></label>
      <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-stone-600">Special request <span className="normal-case tracking-normal text-stone-400">(optional)</span></span><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className={`${fieldClass} resize-none`} placeholder="A few details about your goals, location, or timeline…" /></label>
    </div>
    {status === 'error' && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">We could not send your request. Please try again or email us directly.</p>}
    <button disabled={status === 'loading'} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-wait disabled:bg-emerald-400"><span>{status === 'loading' ? 'Sending request…' : 'Request a consultation'}</span><Send className="size-4" /></button>
  </motion.form>;
}
