import { NextResponse } from 'next/server';
import { getOrderForAdmin, saveAdminNotes, updateOrderByAdmin } from '@/lib/server/orders';
import { sendStatusChangeEmails } from '@/lib/server/orderEmails';
import { getSiteUrl } from '@/lib/server/siteUrl';
import { errorResponse, readJson, requireAdmin } from '@/lib/server/api';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const order = await getOrderForAdmin(params.orderNumber);
    if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    return NextResponse.json({ order });
  } catch (error) {
    return errorResponse(error, 'admin-order');
  }
}

// Body: { status?, paymentStatus?, note?, adminNotes? }
export async function PATCH(request, { params }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = await readJson(request);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  try {
    if (typeof body.adminNotes === 'string') {
      if (!(await saveAdminNotes(params.orderNumber, body.adminNotes))) {
        return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
      }
    }

    let emails = [];
    if (body.status !== undefined || body.paymentStatus !== undefined) {
      const result = await updateOrderByAdmin(params.orderNumber, {
        status: body.status,
        paymentStatus: body.paymentStatus,
        note: body.note,
      });
      if (!result) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
      // Only real transitions trigger emails; each (order, status) email is sent at most once.
      if (result.changes.length > 0) {
        emails = await sendStatusChangeEmails(params.orderNumber, result.changes, { siteUrl: getSiteUrl(request) });
      }
    }

    return NextResponse.json({ order: await getOrderForAdmin(params.orderNumber), emails });
  } catch (error) {
    return errorResponse(error, 'admin-order-update');
  }
}
