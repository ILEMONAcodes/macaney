'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/lib/services';

export default function ServicesGrid({ services }: { services: readonly Service[] }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{services.map((service, index) => {
    return <motion.article key={service.name} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -5 }} className="group overflow-hidden rounded-2xl border border-emerald-950/10 bg-white text-emerald-950 shadow-[0_16px_36px_-30px_rgba(6,78,59,0.55)] transition-shadow duration-300 hover:shadow-[0_22px_42px_-25px_rgba(6,78,59,0.5)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-emerald-100">
        <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 20vw" className="object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold tracking-[0.12em] text-emerald-950 backdrop-blur-sm">0{index + 1}</span>
      </div>
      <div className="flex min-h-[13.5rem] flex-col p-5">
        <h2 className="font-serif text-xl font-bold leading-[1.05] tracking-tight">{service.name}</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">{service.description}</p>
        <Link href={`/contact?project=${encodeURIComponent(service.name)}#booking-form`} aria-label={`Inquire about ${service.name}`} className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-sm font-bold text-emerald-800 transition hover:gap-2 hover:text-emerald-600">Learn more <ArrowUpRight className="size-4" /></Link>
      </div>
    </motion.article>;
  })}</div>;
}
