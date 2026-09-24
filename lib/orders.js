// Shared order / payment constants. Safe to import from client and server code.
import { USD_TO_PKR } from './currency';

// The store's existing fulfilment statuses (see data/orders.js), in workflow order.
export const ORDER_STATUSES = ['Processing', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

// Payment status is tracked separately from the order status.
export const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded', 'cancelled'];

export const PAYMENT_STATUS_LABELS = {
  pending: 'Pending',
  paid: 'Paid',
  failed: 'Failed',
  refunded: 'Refunded',
  cancelled: 'Cancelled',
};

export const PAYMENT_METHOD_LABELS = {
  cod: 'Cash on Delivery',
  bank_transfer: 'Bank Transfer',
  easypaisa: 'Easypaisa',
  card: 'Credit / Debit Card',
};

export function paymentMethodLabel(method) {
  return PAYMENT_METHOD_LABELS[method] || method;
}

export function paymentStatusLabel(status) {
  return PAYMENT_STATUS_LABELS[status] || status;
}

// Shipping rule used by the cart and checkout: free over the threshold, otherwise a flat rate.
// Catalogue prices are stored in base units and shown in PKR via lib/currency.js.
export const FREE_SHIPPING_THRESHOLD = 100;
export const FLAT_SHIPPING_RATE = 8;

export function shippingFor(subtotal) {
  return subtotal > FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING_RATE;
}

// Convert a catalogue (base unit) amount to the whole-rupee PKR amount shown to customers.
export function toPKRAmount(amount) {
  return Math.round(amount * USD_TO_PKR);
}

// Fulfilment timeline shown to customers and in the admin, derived from the status history.
const TIMELINE_STEPS = [
  { step: 'Order placed', status: null },
  { step: 'Confirmed', status: 'Confirmed' },
  { step: 'Shipped', status: 'Shipped' },
  { step: 'Out for delivery', status: 'Out for Delivery' },
  { step: 'Delivered', status: 'Delivered' },
];

export function buildTimeline(order, history = []) {
  const fmt = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '');
  const statusChanges = history.filter((h) => h.field === 'status');
  const reachedAt = (status) => statusChanges.find((h) => h.to_value === status)?.created_at;
  const currentIndex = ORDER_STATUSES.indexOf(order.status);

  if (order.status === 'Cancelled') {
    const steps = [{ step: 'Order placed', date: fmt(order.created_at), done: true }];
    ['Confirmed', 'Shipped', 'Out for Delivery'].forEach((status) => {
      const at = reachedAt(status);
      if (at) steps.push({ step: TIMELINE_STEPS.find((s) => s.status === status).step, date: fmt(at), done: true });
    });
    steps.push({ step: 'Cancelled', date: fmt(reachedAt('Cancelled')), done: true });
    return steps;
  }

  return TIMELINE_STEPS.map(({ step, status }) => {
    if (!status) return { step, date: fmt(order.created_at), done: true };
    const done = ORDER_STATUSES.indexOf(status) <= currentIndex;
    return { step, date: done ? fmt(reachedAt(status)) : '', done };
  });
}
