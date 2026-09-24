import { NextResponse } from 'next/server';
import { getOrderForAdmin } from '@/lib/server/orders';
import { retryFailedEmails } from '@/lib/server/orderEmails';
import { getSiteUrl } from '@/lib/server/siteUrl';
import { errorResponse, requireAdmin } from '@/lib/server/api';

export const dynamic = 'force-dynamic';

export async function POST(request, { params }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const results = await retryFailedEmails(params.orderNumber, { siteUrl: getSiteUrl(request) });
    if (!results) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    return NextResponse.json({ results, order: await getOrderForAdmin(params.orderNumber) });
  } catch (error) {
    return errorResponse(error, 'admin-retry-emails');
  }
}
