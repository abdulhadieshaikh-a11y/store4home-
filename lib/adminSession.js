// Admin session cookie: "v1.<expiresAtMs>.<hmac>" signed with ADMIN_SESSION_SECRET.
// Uses Web Crypto so it works both in middleware (Edge runtime) and route handlers.
// No secret values live in this file; they are read from server environment variables.

export const ADMIN_COOKIE = 's4h_admin';
export const ADMIN_SESSION_SECONDS = 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || '';
  return secret.length >= 32 ? secret : null;
}

export function isAdminAuthConfigured() {
  return Boolean(getSecret() && process.env.ADMIN_PASSWORD);
}

function toBase64Url(buffer) {
  let binary = '';
  new Uint8Array(buffer).forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toBase64Url(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createAdminSessionToken() {
  const secret = getSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured (min 32 characters).');
  const payload = `v1.${Date.now() + ADMIN_SESSION_SECONDS * 1000}`;
  return `${payload}.${await hmac(payload, secret)}`;
}

export async function verifyAdminSessionToken(token) {
  const secret = getSecret();
  if (!secret || !token) return false;
  const parts = String(token).split('.');
  if (parts.length !== 3 || parts[0] !== 'v1') return false;
  const expiresAt = Number(parts[1]);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  const expected = await hmac(`${parts[0]}.${parts[1]}`, secret);
  return constantTimeEqual(expected, parts[2]);
}

// Compares the submitted password with ADMIN_PASSWORD without leaking timing information.
export async function checkAdminPassword(password) {
  const secret = getSecret();
  const expected = process.env.ADMIN_PASSWORD;
  if (!secret || !expected || typeof password !== 'string') return false;
  const [a, b] = await Promise.all([hmac(password, secret), hmac(expected, secret)]);
  return constantTimeEqual(a, b);
}
