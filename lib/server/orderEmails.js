import 'server-only';
import { getSql } from './db';
import { getOrderWithItems } from './orders';
import { getNotificationSettings, getOwnerEmail, getPaymentSettings, instructionsFor } from './settings';
import { deliverEmail } from './email/deliver';
import {
  customerOrderConfirmation,
  customerPaymentUpdate,
  customerStatusUpdate,
  ownerNewOrder,
  EMAIL_ORDER_STATUSES,
  EMAIL_PAYMENT_STATUSES,
} from './email/templates';

function trackingUrl(order, siteUrl) {
  if (!siteUrl) return '';
  return `${siteUrl}/track-order?id=${encodeURIComponent(order.order_number)}&token=${order.tracking_token}`;
}

function adminUrl(order, siteUrl) {
  return siteUrl ? `${siteUrl}/admin/orders/${encodeURIComponent(order.order_number)}` : '';
}

async function manualPaymentInstructions(order) {
  if (!['bank_transfer', 'easypaisa'].includes(order.payment_method) || order.payment_status !== 'pending') return null;
  return instructionsFor(order.payment_method, await getPaymentSettings());
}

// Each email kind knows how to (re)build itself from the current order, so a failed
// email can be retried later from the admin order page.
const builders = {
  async order_confirmation(order, { siteUrl }) {
    const instructions = await manualPaymentInstructions(order);
    return { to: order.customer_email, ...customerOrderConfirmation({ order, instructions, trackingUrl: trackingUrl(order, siteUrl) }) };
  },
  async owner_new_order(order, { siteUrl }) {
    const to = await getOwnerEmail();
    return { to, ...ownerNewOrder({ order, adminUrl: adminUrl(order, siteUrl) }) };
  },
  async status_update(order, { siteUrl, meta }) {
    // Rebuild with the status the email was about, even if the order moved on since.
    const view = { ...order, status: meta.status };
    return { to: order.customer_email, ...customerStatusUpdate({ order: view, trackingUrl: trackingUrl(order, siteUrl) }) };
  },
  async payment_update(order, { siteUrl, meta }) {
    const view = { ...order, payment_status: meta.paymentStatus };
    return { to: order.customer_email, ...customerPaymentUpdate({ order: view, trackingUrl: trackingUrl(order, siteUrl) }) };
  },
};

function dedupeKeyFor(order, kind, meta) {
  if (kind === 'status_update') return `order:${order.id}:status:${meta.status}`;
  if (kind === 'payment_update') return `order:${order.id}:payment:${meta.paymentStatus}`;
  return `order:${order.id}:${kind}`;
}

async function send(order, kind, { siteUrl, meta = {} }) {
  const email = await builders[kind](order, { siteUrl, meta });
  return deliverEmail({ dedupeKey: dedupeKeyFor(order, kind, meta), orderId: order.id, kind, meta, ...email });
}

// Called after a new order has been committed. Returns whether the customer email was sent.
export async function sendNewOrderEmails(orderNumber, { siteUrl }) {
  try {
    const order = await getOrderWithItems(orderNumber);
    const settings = await getNotificationSettings();
    const [customer] = await Promise.all([
      send(order, 'order_confirmation', { siteUrl }),
      settings.newOrderEmails ? send(order, 'owner_new_order', { siteUrl }) : null,
    ]);
    // "skipped" means it was already sent by an earlier (retried) request.
    return { customerEmailSent: customer.status === 'sent' || customer.status === 'skipped' };
  } catch (error) {
    console.error('[email] new order emails failed:', error);
    return { customerEmailSent: false };
  }
}

// Called after an admin changes the order status and/or payment status.
export async function sendStatusChangeEmails(orderNumber, changes, { siteUrl }) {
  const results = [];
  try {
    const settings = await getNotificationSettings();
    if (!settings.customerStatusEmails) return results;
    const order = await getOrderWithItems(orderNumber);
    for (const change of changes) {
      if (change.field === 'status' && EMAIL_ORDER_STATUSES.includes(change.to)) {
        results.push({ ...change, ...(await send(order, 'status_update', { siteUrl, meta: { status: change.to } })) });
      }
      if (change.field === 'payment_status' && EMAIL_PAYMENT_STATUSES.includes(change.to)) {
        results.push({ ...change, ...(await send(order, 'payment_update', { siteUrl, meta: { paymentStatus: change.to } })) });
      }
    }
  } catch (error) {
    console.error('[email] status change emails failed:', error);
  }
  return results;
}

// Retries every failed email for one order (admin action).
export async function retryFailedEmails(orderNumber, { siteUrl }) {
  const sql = getSql();
  const order = await getOrderWithItems(orderNumber);
  if (!order) return null;
  const failed = await sql`select kind, meta from email_log where order_id = ${order.id} and status = 'failed' order by id`;
  const results = [];
  for (const row of failed) {
    if (!builders[row.kind]) continue;
    results.push({ kind: row.kind, ...(await send(order, row.kind, { siteUrl, meta: row.meta || {} })) });
  }
  return results;
}
