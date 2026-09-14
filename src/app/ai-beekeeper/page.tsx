'use client';

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUp, Bot, LoaderCircle, Send, ShieldCheck, Sparkles } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

const starterMessages = [
  'How do I prepare my hives for the dry season?',
  'What signs show a colony may be failing?',
  'How can I improve honey yields sustainably?',
];

const welcomeMessage: Message = {
  id: 'welcome',
  role: 'model',
  content:
    'Welcome to Macaney AI Beekeeper. I can help you make confident, practical decisions about hive management, bee health, honey production, and sustainable apiary growth across Africa. What are you working on today?',
};

export default function AIBeekeeperPage() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  async function sendMessage(event?: FormEvent, suggestedMessage?: string) {
    event?.preventDefault();
    const content = (suggestedMessage ?? input).trim();
    if (!content || isLoading) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-keeper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages.map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || 'Unable to get a response.');
      }

      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: 'model', content: data.reply as string },
      ]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to get a response.');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-emerald-900/15 bg-stone-50 shadow-2xl shadow-emerald-950/10">
        <FadeIn direction="down" className="border-b border-emerald-900/10 bg-emerald-950 px-5 py-5 text-stone-50 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-900/50">
                <Bot aria-hidden="true" className="size-6 text-stone-50" />
              </div>
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-emerald-600/70 bg-emerald-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-100">Macaney intelligence</span>
                  <span className="hidden items-center gap-1 text-xs text-emerald-200 sm:flex"><ShieldCheck className="size-3.5" /> Expert guidance</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight sm:text-xl">AI Beekeeper</h1>
                <p className="text-xs text-emerald-100/75 sm:text-sm">The Home of Successful Beekeeping in Africa</p>
              </div>
            </div>
            <Link href="/" className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-emerald-700 px-3 py-2 text-xs font-semibold text-stone-50 transition hover:bg-emerald-900 sm:text-sm" aria-label="Back to home">
              <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </FadeIn>

        <div className="flex flex-1 flex-col bg-stone-50">
          <div className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8" aria-live="polite">
            <FadeIn delay={0.1} className="mx-auto max-w-3xl">
              <div className="mb-6 flex items-center justify-center gap-2 text-center text-xs font-medium text-stone-500"><Sparkles className="size-3.5 text-emerald-600" /> Practical, African-context beekeeping advice</div>
            </FadeIn>
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div key={message.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} className={`mx-auto flex max-w-3xl gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${message.role === 'user' ? 'bg-stone-900 text-stone-50' : 'bg-emerald-600 text-stone-50'}`}>
                    {message.role === 'user' ? <span className="text-xs font-bold">You</span> : <Bot className="size-4" />}
                  </div>
                  <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${message.role === 'user' ? 'rounded-tr-sm bg-stone-900 text-stone-50' : 'rounded-tl-sm border border-stone-200 bg-stone-50 text-stone-800'}`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && <div className="mx-auto flex max-w-3xl gap-3"><div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-stone-50"><Bot className="size-4" /></div><div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-stone-200 bg-stone-50 px-4 py-4"><span className="size-2 animate-pulse rounded-full bg-emerald-600" /><span className="size-2 animate-pulse rounded-full bg-emerald-600 [animation-delay:150ms]" /><span className="size-2 animate-pulse rounded-full bg-emerald-600 [animation-delay:300ms]" /><span className="ml-1 text-xs text-stone-500">Consulting the hive…</span></div></div>}
            <div ref={endOfMessagesRef} />
          </div>

          {messages.length === 1 && !isLoading && <div className="mx-auto w-full max-w-3xl px-4 pb-3 sm:px-8"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">Try asking</p><div className="flex flex-wrap gap-2">{starterMessages.map((suggestion) => <button key={suggestion} type="button" onClick={() => void sendMessage(undefined, suggestion)} className="rounded-full border border-emerald-900/15 bg-stone-50 px-3 py-2 text-left text-xs text-emerald-950 transition hover:border-emerald-600 hover:bg-emerald-50">{suggestion}</button>)}</div></div>}

          <div className="border-t border-stone-200 bg-stone-50 px-4 py-4 sm:px-8">
            <form onSubmit={(event) => void sendMessage(event)} className="mx-auto flex max-w-3xl items-end gap-3">
              <textarea ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} disabled={isLoading} rows={1} maxLength={4000} placeholder="Ask about your hives, honey harvest, bee health…" className="max-h-32 min-h-12 flex-1 resize-none rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:cursor-not-allowed" aria-label="Your question for the AI Beekeeper" />
              <button type="submit" disabled={!input.trim() || isLoading} className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-stone-50 shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-stone-300" aria-label="Send message">
                {isLoading ? <LoaderCircle className="size-5 animate-spin" /> : <Send className="size-5" />}
              </button>
            </form>
            {error && <p role="alert" className="mx-auto mt-2 max-w-3xl text-xs text-emerald-900">{error}</p>}
            <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-stone-400">AI guidance supports, but does not replace, an on-site assessment of your colonies.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
