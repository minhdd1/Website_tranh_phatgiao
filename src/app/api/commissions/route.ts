import { NextResponse } from 'next/server';
import {
  badRequest,
  getClientIp,
  isNonEmptyString,
  isRateLimited,
  isValidEmail,
  optionalString,
  readJsonBody,
} from '../_utils';
import { type ArtworkCategory } from '@/types';

const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL || '';
const allowedArtworkTypes: ArtworkCategory[] = ['silk-painting', 'sculptural-painting', 'buddhist-art', 'commissioned'];

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (await isRateLimited(`commission:${ip}`, 3, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await readJsonBody(request);
    if (!body || typeof body !== 'object') {
      return badRequest('Invalid JSON body');
    }

    const data = body as Record<string, unknown>;
    const phone = optionalString(data.phone, 50);

    if (!isNonEmptyString(data.name, 120)) return badRequest('Name is required');
    if (!isValidEmail(data.email)) return badRequest('A valid email is required');
    if (phone === null) return badRequest('Phone is too long');
    if (!isNonEmptyString(data.country, 120)) return badRequest('Country is required');
    if (!allowedArtworkTypes.includes(data.artwork_type as ArtworkCategory)) return badRequest('Invalid artwork type');
    if (!isNonEmptyString(data.dimensions, 120)) return badRequest('Dimensions are required');
    if (!isNonEmptyString(data.budget, 120)) return badRequest('Budget is required');
    if (!isNonEmptyString(data.message, 3000)) return badRequest('Message is required');

    const payload = {
      type: 'commission',
      name: String(data.name).trim(),
      email: String(data.email).trim().toLowerCase(),
      phone,
      country: String(data.country).trim(),
      artwork_type: data.artwork_type,
      dimensions: String(data.dimensions).trim(),
      budget: String(data.budget).trim(),
      message: String(data.message).trim(),
      created_at: new Date().toISOString(),
    };

    if (!googleSheetsUrl) {
      return NextResponse.json({ error: 'Submission service is not configured' }, { status: 503 });
    }

    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Commission submission upstream failed:', response.status);
      return NextResponse.json({ error: 'Submission service unavailable' }, { status: 502 });
    }

    const resData = await response.json();
    if (!resData.success) {
      console.error('Commission submission upstream rejected request');
      return NextResponse.json({ error: 'Submission could not be saved' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Inquiry received successfully' });
  } catch (error) {
    console.error('API Commission Route Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
