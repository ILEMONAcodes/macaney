import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      full_name,
      country,
      state,
      email,
      phone_number,
      hives_count,
      project,
      message,
      source,
      medium,
      campaign
    } = body;

    // Validate required fields
    if (!email || !phone_number || !full_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!googleScriptUrl) {
      throw new Error('Google Script URL is not configured');
    }

    // Forward the complete payload including lead details and UTM tracking parameters to Google Sheets
    const googleResponse = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name,
        country,
        state,
        email,
        phone_number,
        hives_count,
        project,
        message,
        source,
        medium,
        campaign
      }),
    });

    if (!googleResponse.ok) {
      console.error(
        `Google Apps Script rejected the lead with HTTP ${googleResponse.status} ${googleResponse.statusText}`,
      );
      return NextResponse.json(
        { error: 'We could not save your details right now. Please try again shortly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, message: 'Lead recorded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
