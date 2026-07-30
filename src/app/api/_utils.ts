import { NextResponse } from 'next/server';

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const redisRestUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisRestToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

async function redisCommand<T>(command: string, ...args: Array<string | number>): Promise<T> {
  if (!redisRestUrl || !redisRestToken) {
    throw new Error('Redis REST rate limit backend is not configured');
  }

  const response = await fetch(redisRestUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${redisRestToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([command, ...args]),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Redis REST command failed with ${response.status}`);
  }

  const data = await response.json() as { result: T };
  return data.result;
}

function isLocallyRateLimited(key: string, limit: number, windowMs: number) {
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

export async function isRateLimited(key: string, limit = 5, windowMs = 60_000) {
  const redisKey = `rate-limit:${key}`;

  if (redisRestUrl && redisRestToken) {
    try {
      const count = await redisCommand<number>('INCR', redisKey);
      if (count === 1) {
        await redisCommand<number>('PEXPIRE', redisKey, windowMs);
      }

      return count > limit;
    } catch (error) {
      console.error('Remote rate limit backend failed:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  return isLocallyRateLimited(key, limit, windowMs);
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
