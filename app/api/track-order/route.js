import { NextResponse } from 'next/server';
import { findOrderForCustomer } from '@/lib/server/orders';
import { errorResponse, readJson } from '@/lib/server/api';

export const dynamic = 'force-dynamic';

// Customer order lookup: order number + (checkout email OR private tracking token).
export async function POST(request) {
  const body = await readJson(request);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  try {
    const order = await findOrderForCustomer({
      orderNumber: body.orderNumber,
      email: typeof body.email === 'string' ? body.email : '',
      token: typeof body.token === 'string' ? body.token : '',
    });
    // Same response for "no such order" and "wrong email", so order numbers can't be probed.
    if (!order) return NextResponse.json({ error: 'not_found' }, { status: 404 });
    return NextResponse.json({ order });
  } catch (error) {
    return errorResponse(error, 'track-order');
  }
}
