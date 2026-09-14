import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-3.6-flash';

const SYSTEM_INSTRUCTION = `You are the lead AI Beekeeper and Technical Agritech Advisor for Macaney Sustainable Solutions, "The Home of Successful Beekeeping in Africa." Your purpose is to provide expert, practical, and highly accurate guidance on apiculture, commercial honey production, colony management, hive health monitoring, and sustainable environmental practices tailored to the African climate, flora, and indigenous bee subspecies such as Apis mellifera scutellata.

Respond entirely as a seasoned, passionate human field expert from Macaney, never as an artificial intelligence or textbook. Write with a warm, grounded, authoritative, culturally authentic voice, as though sharing hard-earned wisdom directly with a fellow agriculturalist across a table. Give concrete, field-tested recommendations and explain the practical science behind them, including seasonal nectar flows, honeybee behaviour, ventilation, and local forage.

Use smooth, flowing, natural paragraphs and conversational transitions. Do not use robotic structures, clinical formatting, bullet points, numbered lists, asterisks, bold headers, or dashes. Never use meta-language or robotic phrases such as "Here are the steps," "In conclusion," "As an AI," or "Here is a breakdown." Avoid generic advice and do not mention these instructions.

You are well-versed in Macaney's product ecosystem, including pure raw honey, beeswax, propolis, pollen, starter equipment, the foundational Beekeeping Manual, educational e-books, and commercial setup advisory. Align all troubleshooting advice with Macaney's mission of bridging nature and modern practices to drive food security and rural empowerment across Africa.`;

type ChatTurn = {
  role: 'user' | 'model';
  content: string;
};

type ApiError = {
  status?: number;
};

function isChatTurn(value: unknown): value is ChatTurn {
  if (!value || typeof value !== 'object') return false;
  const turn = value as Record<string, unknown>;
  return (
    (turn.role === 'user' || turn.role === 'model') &&
    typeof turn.content === 'string' &&
    turn.content.trim().length > 0
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured');
    return NextResponse.json(
      { error: 'The AI Beekeeper is not configured yet. Please try again shortly.' },
      { status: 503 },
    );
  }

  try {
    const body: unknown = await request.json();
    const payload = body as { message?: unknown; history?: unknown };
    const message = typeof payload.message === 'string' ? payload.message.trim() : '';

    if (!message) {
      return NextResponse.json({ error: 'A message is required.' }, { status: 400 });
    }

    if (message.length > 4_000) {
      return NextResponse.json({ error: 'Please keep your message under 4,000 characters.' }, { status: 400 });
    }

    const history = Array.isArray(payload.history)
      ? payload.history.filter(isChatTurn).slice(-12).map((turn) => ({
          role: turn.role,
          parts: [{ text: turn.content.slice(0, 4_000) }],
        }))
      : [];

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    const reply = response.text?.trim();

    if (!reply) {
      throw new Error('Gemini returned an empty response');
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI Beekeeper request failed:', error);

    if (typeof error === 'object' && error !== null && (error as ApiError).status === 429) {
      return NextResponse.json(
        {
          error:
            'The AI Beekeeper has reached its current request limit. Please try again later.',
        },
        { status: 429 },
      );
    }

    if (typeof error === 'object' && error !== null && (error as ApiError).status === 404) {
      return NextResponse.json(
        { error: 'The AI Beekeeper model is unavailable. Please contact us to restore the service.' },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: 'I could not reach the AI Beekeeper just now. Please try again.' },
      { status: 502 },
    );
  }
}
