import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Macaney Sustainable Solutions',
  description: 'How Macaney handles information submitted through its website.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-stone-50 px-4 pb-20 pt-28 text-stone-900 sm:px-6 sm:pt-36 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Legal</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-emerald-950 sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-stone-500">Effective October 3, 2026</p>

        <div className="mt-10 space-y-8 text-base leading-7 text-stone-700">
          <section>
            <h2 className="text-xl font-bold text-emerald-950">Information you submit</h2>
            <p className="mt-2">When you use a contact, consultation, or guide request form, we may collect your name, email address, phone or WhatsApp number, country, state, beekeeping details, project interests, message, and campaign referral information.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-emerald-950">How we use it</h2>
            <p className="mt-2">We use submitted information to respond to inquiries, provide requested guides, follow up about relevant Macaney services, and understand how visitors find our website.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-emerald-950">Lead storage and service providers</h2>
            <p className="mt-2">Website lead forms send submissions to Google Apps Script, which records them in Google Sheets for Macaney to manage and respond to inquiries. Lead form submissions are not stored in Supabase. Google processes this information under its own service terms and privacy practices.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-emerald-950">Retention and choices</h2>
            <p className="mt-2">We retain inquiry information for as long as needed to respond and manage our business records. You can ask us to correct or remove your submitted information by contacting <a className="font-semibold text-emerald-800 underline underline-offset-2" href="mailto:support@macaney.com">support@macaney.com</a>.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-emerald-950">Updates</h2>
            <p className="mt-2">We may update this policy as our services or data practices change. The effective date above identifies the latest revision.</p>
          </section>
        </div>
      </article>
    </main>
  );
}