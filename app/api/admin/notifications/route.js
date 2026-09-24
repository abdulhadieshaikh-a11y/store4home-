import { NextResponse } from 'next/server';
import { listNotifications, markAllNotificationsRead, markNotificationsRead } from '@/lib/server/notifications';
import { errorResponse, readJson, requireAdmin } from '@/lib/server/api';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    return NextResponse.json(await listNotifications({ limit: 20 }));
  } catch (error) {
    return errorResponse(error, 'admin-notifications');
  }
}

// Body: { ids: [1, 2] } to mark specific notifications read, or { all: true }.
export async function POST(request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = await readJson(request);
  try {
    if (body?.all === true) await markAllNotificationsRead();
    else await markNotificationsRead(body?.ids);
    return NextResponse.json(await listNotifications({ limit: 20 }));
  } catch (error) {
    return errorResponse(error, 'admin-notifications');
  }
}
