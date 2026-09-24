import 'server-only';

// Online payment gateway registry.
//
// No online gateway is connected yet, so the registry is empty and the "Card" option is
// not offered at checkout. To add one (e.g. a Pakistani PSP or Stripe), implement an
// adapter with this shape and add it to `gateways`:
//
//   {
//     id: 'mygateway',                      // used in /api/payments/webhook/mygateway
//     isConfigured: () => Boolean(process.env.MYGATEWAY_SECRET_KEY),
//     // Called after the order row exists. Returns where to send the customer.
//     async createPayment({ order, returnUrl }) {
//       return { redirectUrl, gatewayReference };
//     },
//     // Called by the webhook route with the raw request. MUST verify the gateway's
//     // signature with a server-side secret and throw if it is invalid.
//     async verifyWebhook(request) {
//       return { orderNumber, gatewayReference, outcome: 'paid' | 'failed' | 'cancelled', amount };
//     },
//   }
//
// An order is only ever marked "paid" from a verified webhook (see
// applyVerifiedGatewayResult in lib/server/orders.js) - never because the customer
// returned to the site or clicked a button.
const gateways = [];

export function getGateway(id) {
  return gateways.find((g) => g.id === id) || null;
}

// The gateway selected with PAYMENT_GATEWAY, if its credentials are configured.
export function getActiveGateway() {
  const id = process.env.PAYMENT_GATEWAY;
  if (!id) return null;
  const gateway = getGateway(id);
  return gateway && gateway.isConfigured() ? gateway : null;
}
