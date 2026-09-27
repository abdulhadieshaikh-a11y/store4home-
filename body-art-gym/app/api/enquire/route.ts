import { NextResponse } from 'next/server';
import { normalise, validate } from '@/lib/enquiry';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, deliver nothing.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const data = normalise(body);
  const errors = validate(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: 'Please check the highlighted fields.', errors }, { status: 422 });
  }

  const payload = { ...data, source: 'website', receivedAt: new Date().toISOString() };
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;

  try {
    if (webhook) {
      const r = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(`Webhook responded ${r.status}`);
    } else if (resendKey && to) {
      const rows = [
        ['Name', data.name],
        ['Phone', data.phone],
        ['Email', data.email || '—'],
        ['Interested in', data.interest],
        ['Message', data.message || '—'],
      ]
        .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6B4A33"><b>${k}</b></td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`)
        .join('');
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`,
          to: [to],
          reply_to: data.email || undefined,
          subject: `New website enquiry — ${data.name} (${data.interest})`,
          html: `<h2 style="font-family:sans-serif">New enquiry — ${site.name}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
        }),
      });
      if (!r.ok) throw new Error(`Resend responded ${r.status}`);
    } else if (process.env.NODE_ENV !== 'production') {
      console.info('[enquiry] (dev, no delivery configured)', payload);
    } else {
      return NextResponse.json(
        { ok: false, error: `Online enquiries are not connected yet. Please call us on ${site.phone.display}.` },
        { status: 503 },
      );
    }
  } catch (err) {
    console.error('[enquiry] delivery failed', err);
    return NextResponse.json(
      { ok: false, error: `We couldn’t send your enquiry just now. Please try again, or call ${site.phone.display}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
