import 'server-only';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, verifyAdminSessionToken } from '@/lib/adminSession';
import { DatabaseNotConfiguredError, explainDatabaseError, logDatabaseError } from './db';
import { OrderValidationError } from './orders';

// Defence in depth for admin route handlers (middleware already checks the cookie).
// For state-changing requests also reject cross-site requests by Origin.
export async function requireAdmin(request) {
  const ok = await verifyAdminSessionToken(cookies().get(ADMIN_COOKIE)?.value);
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (request && request.method !== 'GET') {
    const origin = request.headers.get('origin');
    let originHost = null;
    try {
      originHost = origin ? new URL(origin).host : null;
    } catch {
      originHost = 'invalid';
    }
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    if (originHost && originHost !== host) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }
  return null;
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

// Maps known errors to safe responses; never leaks internals to the client.
export function errorResponse(error, context) {
  if (error instanceof OrderValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  if (error instanceof DatabaseNotConfiguredError) {
    console.error(`[${context}] ${error.message}`);
    return NextResponse.json({ error: 'The store is temporarily unavailable. Please try again later.' }, { status: 503 });
  }
  if (error?.name === 'PostgresError' || error?.name === 'DatabaseUnavailableError' || explainDatabaseError(error).hint) {
    logDatabaseError(context, error);
  } else {
    console.error(`[${context}]`, error);
  }
  return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
}
