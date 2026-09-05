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
        source,
        medium,
        campaign
      }),
    });

    if (!googleResponse.ok) {
      throw new Error('Failed to record lead in Google Sheets');
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