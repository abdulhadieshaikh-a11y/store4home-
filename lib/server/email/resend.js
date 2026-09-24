import 'server-only';
import { createHash } from 'crypto';

// Sends one email through Resend's HTTP API. Server-side only: the API key never
// reaches the browser.
export function getEmailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY || '',
    from: process.env.RESEND_FROM_EMAIL || process.env.EMAIL_FROM || '',
  };
}

export function isEmailConfigured() {
  const { apiKey, from } = getEmailConfig();
  return Boolean(apiKey && from);
}

export async function sendViaResend({ to, subject, html, text, idempotencyKey }) {
  const { apiKey, from } = getEmailConfig();
  if (!apiKey || !from) {
    return { ok: false, error: 'Email is not configured (RESEND_API_KEY / RESEND_FROM_EMAIL missing).' };
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  // Resend de-duplicates requests with the same key for 24 hours, which protects
  // against a double send if we retry after a send that actually succeeded.
  if (idempotencyKey) {
    headers['Idempotency-Key'] = createHash('sha256').update(idempotencyKey).digest('hex');
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers,
      body: JSON.stringify({ from, to: [to], subject, html, text }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = body?.message || body?.error || `HTTP ${response.status}`;
      return { ok: false, error: `Resend rejected the email: ${String(message).slice(0, 300)}` };
    }
    return { ok: true, id: body?.id || null };
  } catch (error) {
    return { ok: false, error: `Could not reach Resend: ${error?.message || error}` };
  }
}
