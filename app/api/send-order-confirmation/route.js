import { NextResponse } from 'next/server';
import { formatPKR } from '@/lib/currency';

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 503 },
    );
  }

  const order = await request.json();
  const recipient = order?.shipping?.email;

  if (!recipient || !order?.id || !Array.isArray(order.items)) {
    return NextResponse.json({ error: 'Invalid order data.' }, { status: 400 });
  }

  const itemRows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${item.name}${item.color ? ` (${item.color})` : ''} x ${item.qty}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:right">${formatPKR(item.price * item.qty)}</td>
        </tr>`,
    )
    .join('');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipient],
        subject: `Order confirmed - ${order.id}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#202020">
            <h1 style="font-size:24px">Order confirmed</h1>
            <p>Hi ${order.shipping.fullName}, thank you for shopping with store4home.</p>
            <p>Your order <strong>${order.id}</strong> has been received.</p>
            <table style="width:100%;border-collapse:collapse;margin:24px 0">${itemRows}</table>
            <p style="font-size:18px"><strong>Total: ${formatPKR(Number(order.total))}</strong></p>
            <p>Payment method: ${order.paymentMethod}</p>
            <p>We will contact you before dispatch.</p>
          </div>`,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Resend email failed:', details);
      return NextResponse.json({ error: 'Email provider rejected the message.' }, { status: 502 });
    }

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error('Email request failed:', error);
    return NextResponse.json({ error: 'Could not connect to the email provider.' }, { status: 502 });
  }
}
