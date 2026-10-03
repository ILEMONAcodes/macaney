import { NextResponse } from 'next/server';

function textOr(value: unknown, fallback = ''): string {
  if (typeof value !== 'string') return fallback;
  return value.trim() || fallback;
}

function reportsFailure(responseText: string): boolean {
  try {
    const result: unknown = JSON.parse(responseText);
    if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
      const response = result as Record<string, unknown>;
      return response.success === false
        || response.ok === false
        || response.status === 'error'
        || response.result === 'error'
        || typeof response.error === 'string';
    }
  } catch {
    return /^\s*(error|exception)\b/i.test(responseText);
  }

  return false;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid lead data' }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const full_name = textOr(input.full_name);
  const email = textOr(input.email);
  const phone_number = textOr(input.phone_number);

  if (!full_name || !email || !phone_number) {
    return NextResponse.json({ error: 'Name, email, and phone number are required' }, { status: 400 });
  }

  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!googleScriptUrl) {
    console.error('Lead capture is unavailable because GOOGLE_SCRIPT_URL is not configured');
    return NextResponse.json(
      { error: 'Lead capture is temporarily unavailable. Please try again later.' },
      { status: 503 },
    );
  }

  const lead = {
    full_name,
    country: textOr(input.country, 'Not provided'),
    state: textOr(input.state, 'Not provided'),
    email,
    phone_number,
    hives_count: textOr(input.hives_count, 'Not provided'),
    project: textOr(input.project),
    message: textOr(input.message),
    source: textOr(input.source, 'direct'),
    medium: textOr(input.medium, 'none'),
    campaign: textOr(input.campaign, 'none'),
  };

  let googleResponse: Response;
  try {
    googleResponse = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
  } catch (error) {
    console.error('Google Apps Script request failed:', error);
    return NextResponse.json(
      { error: 'We could not save your details right now. Please try again shortly.' },
      { status: 502 },
    );
  }

  let responseText: string;
  try {
    responseText = await googleResponse.text();
  } catch (error) {
    console.error('Could not read the Google Apps Script response:', error instanceof Error ? error.name : 'Unknown error');
    return NextResponse.json(
      { error: 'We could not confirm that your details were saved. Please try again shortly.' },
      { status: 502 },
    );
  }

  if (!googleResponse.ok || reportsFailure(responseText)) {
    console.error(`Google Apps Script could not save the lead (HTTP ${googleResponse.status})`);
    return NextResponse.json(
      { error: 'We could not save your details right now. Please try again shortly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, message: 'Lead recorded successfully' });
}
