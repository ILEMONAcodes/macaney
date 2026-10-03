import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Macaney Sustainable Solutions',
  description: 'Terms for using the Macaney Sustainable Solutions website.',
};

export default function TermsOfServicePage() {
  return (
    <main className="bg-stone-50 px-4 pb-20 pt-28 text-stone-900 sm:px-6 sm:pt-36 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Legal</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-emerald-950 sm:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-stone-500">Effective October 3, 2026</p>

        <div className="mt-10 space-y-8 text-base leading-7 text-stone-700">
          <section>
            <h2 className="text-xl font-bold text-emerald-950">Using this website</h2>
            <p className="mt-2">You may use this website to learn about Macaney Sustainable Solutions, request consultations or guides, and explore our beekeeping products and services. Provide accurate information when submitting a form, and do not use the site to abuse, disrupt, or unlawfully access our services.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-emerald-950">Information and guidance</h2>
            <p className="mt-2">Website articles, guides, and beekeeping information are provided for general educational purposes. They are not a substitute for advice tailored to your apiary, location, or circumstances. Results depend on local conditions and implementation.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-emerald-950">Products and external services</h2>
            <p className="mt-2">Product availability, descriptions, and prices may change. Some inquiries, purchases, downloads, or community links may be handled by third-party services and are subject to their terms. Any order details and fulfillment terms will be confirmed directly with you.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-emerald-950">Website content</h2>
            <p className="mt-2">Unless otherwise stated, website text, branding, and original materials belong to Macaney Sustainable Solutions. You may use materials for personal reference; do not republish or commercially exploit them without permission.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-emerald-950">Changes and contact</h2>
            <p className="mt-2">We may update these terms or change website content and availability. Continued use after a revision means you accept the updated terms. Questions can be sent to <a className="font-semibold text-emerald-800 underline underline-offset-2" href="mailto:support@macaney.com">support@macaney.com</a>.</p>
          </section>
        </div>
      </article>
    </main>
  );
}