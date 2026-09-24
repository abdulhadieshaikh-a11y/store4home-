import { NextResponse } from 'next/server';
import { getAvailablePaymentMethods } from '@/lib/server/settings';
import { errorResponse } from '@/lib/server/api';

export const dynamic = 'force-dynamic';

// Payment methods currently offered at checkout, with public payment instructions.
export async function GET() {
  try {
    return NextResponse.json({ methods: await getAvailablePaymentMethods() });
  } catch (error) {
    return errorResponse(error, 'payment-methods');
  }
}
