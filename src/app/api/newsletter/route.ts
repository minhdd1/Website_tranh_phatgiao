import { NextResponse } from 'next/server';
import { badRequest, getClientIp, isRateLimited, isValidEmail, readJsonBody } from '../_utils';

const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL || '';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`newsletter:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await readJsonBody(request);
    if (!body || typeof body !== 'object') {
      return badRequest('Invalid JSON body');
    }

    const email = (body as Record<string, unknown>).email;
    if (!isValidEmail(email)) {
      return badRequest('A valid email is required');
    }

    if (!googleSheetsUrl) {
      return NextResponse.json({ error: 'Subscription service is not configured' }, { status: 503 });
    }

    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'newsletter',
        email: String(email).trim().toLowerCase(),
        created_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('Newsletter upstream failed:', response.status);
      return NextResponse.json({ error: 'Subscription service unavailable' }, { status: 502 });
    }

    const resData = await response.json();
    if (!resData.success) {
      console.error('Newsletter upstream rejected request');
      return NextResponse.json({ error: 'Subscription could not be saved' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('API Newsletter Route Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
