'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/services';

export default function ServicesGrid({ services }: { services: readonly Service[] }) {
  return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map((service, index) => {
    return <motion.article key={service.name} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -7 }} className="group flex min-h-[18rem] flex-col rounded-[1.75rem] border border-emerald-900/10 bg-white p-7 text-emerald-950 shadow-[0_18px_42px_-30px_rgba(6,78,59,0.45)] transition-shadow duration-500 hover:shadow-[0_27px_54px_-28px_rgba(6,78,59,0.7)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-700">0{index + 1} · Macaney service</p>
      <h2 className="mt-3 font-serif text-2xl font-bold leading-tight tracking-tight">{service.name}</h2>
      <p className="mt-4 text-sm leading-6 text-stone-600">{service.description}</p>
      <Link href={`/contact?project=${encodeURIComponent(service.name)}#booking-form`} className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-bold text-emerald-800 transition duration-300 group-hover:gap-3 hover:text-emerald-600">Inquire about this service <ArrowRight className="size-4" /></Link>
    </motion.article>;
  })}</div>;
}
