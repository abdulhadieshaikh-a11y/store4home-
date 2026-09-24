import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/server/orders';
import { sendNewOrderEmails } from '@/lib/server/orderEmails';
import { getPaymentSettings, instructionsFor } from '@/lib/server/settings';
import { getActiveGateway } from '@/lib/payments/gateways';
import { getSiteUrl } from '@/lib/server/siteUrl';
import { errorResponse, readJson } from '@/lib/server/api';

export const dynamic = 'force-dynamic';

// Places an order. Safe to retry: the client sends the same idempotencyKey for the
// same checkout, and a repeat request returns the original order.
export async function POST(request) {
  const body = await readJson(request);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  let result;
  try {
    result = await createOrder(body);
  } catch (error) {
    return errorResponse(error, 'orders');
  }

  // The order is committed at this point. Email problems are logged in email_log and
  // never turn a placed order into an error for the customer.
  const siteUrl = getSiteUrl(request);
  const { customerEmailSent } = await sendNewOrderEmails(result.order.order_number, { siteUrl });
  const order = result.order;

  let instructions = null;
  if (['bank_transfer', 'easypaisa'].includes(order.payment_method)) {
    try {
      instructions = instructionsFor(order.payment_method, await getPaymentSettings());
    } catch (error) {
      console.error('[orders] could not load payment instructions:', error);
    }
  }

  let paymentRedirectUrl = null;
  if (order.payment_method === 'card' && order.payment_status === 'pending') {
    const gateway = getActiveGateway();
    if (gateway) {
      try {
        const payment = await gateway.createPayment({ order, returnUrl: `${siteUrl}/track-order?id=${order.order_number}&token=${order.tracking_token}` });
        paymentRedirectUrl = payment.redirectUrl;
      } catch (error) {
        console.error('[orders] gateway createPayment failed:', error);
      }
    }
  }

  return NextResponse.json(
    {
      order: {
        orderNumber: order.order_number,
        trackingToken: order.tracking_token,
        createdAt: order.created_at,
        status: order.status,
        paymentMethod: order.payment_method,
        paymentStatus: order.payment_status,
        subtotal: order.subtotal,
        shippingFee: order.shipping_fee,
        total: order.total,
        items: order.items.map((i) => ({
          name: i.name,
          color: i.color,
          quantity: i.quantity,
          unitPrice: i.unit_price,
          lineTotal: i.line_total,
        })),
        shipping: {
          fullName: order.customer_name,
          email: order.customer_email,
          phone: order.customer_phone,
          address: order.shipping_address,
          city: order.shipping_city,
          postalCode: order.shipping_postal_code,
        },
      },
      duplicate: !result.created,
      emailSent: customerEmailSent,
      instructions,
      paymentRedirectUrl,
    },
    { status: result.created ? 201 : 200 },
  );
}
