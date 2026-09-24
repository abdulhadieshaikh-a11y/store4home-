import { NextResponse } from 'next/server';
import {
  getNotificationSettings,
  getPaymentSettings,
  saveNotificationSettings,
  savePaymentSettings,
} from '@/lib/server/settings';
import { isEmailConfigured } from '@/lib/server/email/resend';
import { errorResponse, readJson, requireAdmin } from '@/lib/server/api';

export const dynamic = 'force-dynamic';

async function current() {
  const [payments, notifications] = await Promise.all([getPaymentSettings(), getNotificationSettings()]);
  return {
    payments,
    notifications,
    ownerEmailFallback: process.env.STORE_OWNER_EMAIL ? 'set' : null,
    emailConfigured: isEmailConfigured(),
  };
}

export async function GET(request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    return NextResponse.json(await current());
  } catch (error) {
    return errorResponse(error, 'admin-settings');
  }
}

// Body: { payments?, notifications? }
export async function PUT(request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = await readJson(request);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  try {
    if (body.payments) await savePaymentSettings(body.payments);
    if (body.notifications) {
      try {
        await saveNotificationSettings(body.notifications);
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }
    return NextResponse.json(await current());
  } catch (error) {
    return errorResponse(error, 'admin-settings');
  }
}
