import { NextResponse } from 'next/server';

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export function isRateLimited(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (current.count >= limit) return true;

  current.count += 1;
  return false;
}

export function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export function isNonEmptyString(value: unknown, maxLength: number) {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength;
}

export function optionalString(value: unknown, maxLength: number) {
  if (value === undefined || value === null || value === '') return '';
  return typeof value === 'string' && value.trim().length <= maxLength ? value.trim() : null;
}

export function isValidEmail(value: unknown) {
  return typeof value === 'string'
    && value.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function readJsonBody(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
