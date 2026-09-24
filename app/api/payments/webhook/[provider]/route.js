import { NextResponse } from 'next/server';
import { getGateway } from '@/lib/payments/gateways';
import { applyVerifiedGatewayResult } from '@/lib/server/orders';
import { sendStatusChangeEmails } from '@/lib/server/orderEmails';
import { getSiteUrl } from '@/lib/server/siteUrl';

export const dynamic = 'force-dynamic';

// Server-to-server payment confirmation from an online gateway. The adapter verifies the
// gateway's signature; only then is the order's payment status changed.
export async function POST(request, { params }) {
  const gateway = getGateway(params.provider);
  if (!gateway || !gateway.isConfigured()) {
    return NextResponse.json({ error: 'Unknown payment provider.' }, { status: 404 });
  }

  let event;
  try {
    event = await gateway.verifyWebhook(request);
  } catch (error) {
    console.error(`[payments] ${params.provider} webhook rejected:`, error?.message || error);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  try {
    const result = await applyVerifiedGatewayResult({ gatewayId: gateway.id, ...event });
    if (result?.changes.length) {
      await sendStatusChangeEmails(event.orderNumber, result.changes, { siteUrl: getSiteUrl(request) });
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`[payments] ${params.provider} webhook failed:`, error);
    // Non-2xx so the gateway retries delivery.
    return NextResponse.json({ error: 'Processing failed.' }, { status: 500 });
  }
}
