import { NextResponse } from 'next/server';
import { validateContact, type ContactInput } from '@/lib/contact';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: Request) {
  let body: Partial<ContactInput> & { company?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot — real visitors never fill this hidden field.
  if (body.company) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: 'Please check the highlighted fields.', errors }, { status: 422 });
  }

  const enquiry = {
    name: body.name!.trim(),
    phone: body.phone!.trim(),
    email: (body.email ?? '').trim(),
    message: body.message!.trim(),
    topic: body.topic ?? 'General',
  };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[contact] Delivery not configured — enquiry received (dev only):', enquiry);
      return NextResponse.json({ ok: true, simulated: true });
    }
    // Never pretend an enquiry was delivered when it wasn't.
    return NextResponse.json(
      { ok: false, error: `Online enquiries are unavailable right now. Please call us on ${site.phone.display}.` },
      { status: 503 },
    );
  }

  const html = `
    <h2>New enquiry — ${escape(enquiry.topic)}</h2>
    <p><strong>Name:</strong> ${escape(enquiry.name)}</p>
    <p><strong>Phone:</strong> ${escape(enquiry.phone)}</p>
    <p><strong>Email:</strong> ${escape(enquiry.email || '—')}</p>
    <p><strong>Message:</strong><br/>${escape(enquiry.message).replace(/\n/g, '<br/>')}</p>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Carnage Gym Website <onboarding@resend.dev>',
        to: [to],
        reply_to: enquiry.email || undefined,
        subject: `Website enquiry (${enquiry.topic}) — ${enquiry.name}`,
        html,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Delivery failed:', err);
    return NextResponse.json(
      { ok: false, error: `We couldn't send your message. Please try again or call ${site.phone.display}.` },
      { status: 502 },
    );
  }
}
