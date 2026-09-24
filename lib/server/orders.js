import 'server-only';
import { timingSafeEqual } from 'crypto';
import { getSql } from './db';
import { getProduct } from '@/data/products';
import { ORDER_STATUSES, PAYMENT_STATUSES, shippingFor, toPKRAmount, buildTimeline, paymentMethodLabel } from '@/lib/orders';
import { formatRs } from '@/lib/currency';
import { getAvailablePaymentMethods, getPaymentSettings, instructionsFor } from './settings';
import { createNotification } from './notifications';

export class OrderValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OrderValidationError';
  }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9][0-9\s-]{6,19}$/;
const MAX_QTY_PER_LINE = 99;
const MAX_LINES = 50;

function text(value, { field, min = 0, max, required = true }) {
  const v = typeof value === 'string' ? value.trim() : '';
  if (required && v.length < Math.max(min, 1)) throw new OrderValidationError(`Please enter a valid ${field}.`);
  if (v.length > max) throw new OrderValidationError(`${field} is too long.`);
  return v;
}

// --- Validation -----------------------------------------------------------------------

export function validateOrderInput(input) {
  if (!input || typeof input !== 'object') throw new OrderValidationError('Invalid order.');

  if (!UUID_RE.test(String(input.idempotencyKey || ''))) {
    throw new OrderValidationError('Invalid checkout session. Please refresh and try again.');
  }

  const s = input.shipping || {};
  const customer = {
    name: text(s.fullName, { field: 'full name', min: 2, max: 100 }),
    email: text(s.email, { field: 'email address', max: 254 }).toLowerCase(),
    phone: text(s.phone, { field: 'phone number', max: 20 }),
    address: text(s.address, { field: 'street address', min: 5, max: 300 }),
    city: text(s.city, { field: 'city', min: 2, max: 80 }),
    postalCode: text(s.postalCode, { field: 'postal code', min: 3, max: 12 }),
    notes: text(s.notes, { field: 'Delivery notes', max: 500, required: false }) || null,
  };
  if (!EMAIL_RE.test(customer.email)) throw new OrderValidationError('Please enter a valid email address.');
  if (!PHONE_RE.test(customer.phone)) throw new OrderValidationError('Please enter a valid phone number.');
  if (!/^[A-Za-z0-9 -]+$/.test(customer.postalCode)) throw new OrderValidationError('Please enter a valid postal code.');

  if (!Array.isArray(input.items) || input.items.length === 0) throw new OrderValidationError('Your bag is empty.');
  if (input.items.length > MAX_LINES) throw new OrderValidationError('Too many items in one order.');

  // Prices always come from the catalogue on the server, never from the browser.
  const lines = new Map();
  for (const raw of input.items) {
    const product = getProduct(String(raw?.id || ''));
    if (!product) throw new OrderValidationError('One of the products in your bag is no longer available.');
    const qty = Number(raw.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_LINE) {
      throw new OrderValidationError(`Invalid quantity for ${product.name}.`);
    }
    const color = raw.color == null || raw.color === '' ? null : String(raw.color);
    if (color && !(product.colors || []).includes(color)) {
      throw new OrderValidationError(`The selected colour for ${product.name} is not available.`);
    }
    const key = `${product.id}|${color || ''}`;
    const existing = lines.get(key);
    if (existing) {
      existing.qty += qty;
      if (existing.qty > MAX_QTY_PER_LINE) throw new OrderValidationError(`Invalid quantity for ${product.name}.`);
    } else {
      lines.set(key, { product, color, qty });
    }
  }

  const items = [...lines.values()].map(({ product, color, qty }) => {
    const unit = toPKRAmount(product.price);
    return {
      product_id: product.id,
      name: product.name,
      color,
      image: product.images?.[0] || null,
      unit_price: unit,
      quantity: qty,
      line_total: unit * qty,
      baseSubtotal: product.price * qty,
    };
  });

  const baseSubtotal = items.reduce((sum, i) => sum + i.baseSubtotal, 0);
  const subtotal = items.reduce((sum, i) => sum + i.line_total, 0);
  const shippingFee = toPKRAmount(shippingFor(baseSubtotal));

  const paymentMethod = String(input.paymentMethod || '');
  const paymentReference = text(input.paymentReference, { field: 'Payment reference', max: 100, required: false }) || null;

  return {
    idempotencyKey: input.idempotencyKey.toLowerCase(),
    customer,
    items: items.map(({ baseSubtotal: _unused, ...rest }) => rest),
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    paymentMethod,
    paymentReference,
  };
}

// --- Row mapping ----------------------------------------------------------------------

function num(v) {
  return v == null ? v : Number(v);
}

function mapOrder(row) {
  if (!row) return null;
  return { ...row, subtotal: num(row.subtotal), shipping_fee: num(row.shipping_fee), total: num(row.total) };
}

function mapItem(row) {
  return { ...row, unit_price: num(row.unit_price), line_total: num(row.line_total) };
}

// --- Create ---------------------------------------------------------------------------

// Creates the order, its items, the initial audit history and the admin notification in
// one transaction. The idempotency key (unique in the database) makes retries, double
// clicks and refreshes return the original order instead of creating a duplicate.
export async function createOrder(input) {
  const data = validateOrderInput(input);
  const sql = getSql();

  const available = await getAvailablePaymentMethods();
  if (!available.some((m) => m.id === data.paymentMethod)) {
    throw new OrderValidationError('Please choose an available payment method.');
  }

  // Fast path for a retried request (avoids consuming another order number).
  const [already] = await sql`select order_number from orders where idempotency_key = ${data.idempotencyKey}`;
  if (already) return { created: false, order: await getOrderWithItems(already.order_number) };

  const result = await sql.begin(async (tx) => {
    const [order] = await tx`
      insert into orders ${tx({
        idempotency_key: data.idempotencyKey,
        customer_name: data.customer.name,
        customer_email: data.customer.email,
        customer_phone: data.customer.phone,
        shipping_address: data.customer.address,
        shipping_city: data.customer.city,
        shipping_postal_code: data.customer.postalCode,
        customer_notes: data.customer.notes,
        subtotal: data.subtotal,
        shipping_fee: data.shippingFee,
        total: data.total,
        payment_method: data.paymentMethod,
        payment_reference: data.paymentMethod === 'cod' ? null : data.paymentReference,
      })}
      on conflict (idempotency_key) do nothing
      returning *
    `;
    if (!order) return { created: false };

    await tx`insert into order_items ${tx(data.items.map((item) => ({ ...item, order_id: order.id })))}`;
    await tx`
      insert into order_status_history ${tx([
        { order_id: order.id, field: 'status', from_value: null, to_value: order.status, changed_by: 'customer', note: 'Order placed' },
        { order_id: order.id, field: 'payment_status', from_value: null, to_value: order.payment_status, changed_by: 'customer', note: paymentMethodLabel(order.payment_method) },
      ])}
    `;
    await createNotification(tx, {
      type: 'new_order',
      title: `New order ${order.order_number}`,
      message: `${order.customer_name} placed an order for ${formatRs(order.total)} (${paymentMethodLabel(order.payment_method)}).`,
      orderId: order.id,
    });
    return { created: true, orderNumber: order.order_number };
  });

  if (!result.created) {
    const [existing] = await sql`select order_number from orders where idempotency_key = ${data.idempotencyKey}`;
    return { created: false, order: await getOrderWithItems(existing.order_number) };
  }
  return { created: true, order: await getOrderWithItems(result.orderNumber) };
}

// --- Read -----------------------------------------------------------------------------

export async function getOrderWithItems(orderNumber, sql = getSql()) {
  const [row] = await sql`select * from orders where order_number = ${orderNumber}`;
  if (!row) return null;
  const items = await sql`select * from order_items where order_id = ${row.id} order by id`;
  return { ...mapOrder(row), items: items.map(mapItem) };
}

export async function getOrderForAdmin(orderNumber) {
  const sql = getSql();
  const order = await getOrderWithItems(orderNumber, sql);
  if (!order) return null;
  const [history, emails] = await Promise.all([
    sql`select * from order_status_history where order_id = ${order.id} order by created_at, id`,
    sql`select id, kind, recipient, subject, status, attempts, last_error, created_at, sent_at
        from email_log where order_id = ${order.id} order by created_at, id`,
  ]);
  return { ...order, history, emails, timeline: buildTimeline(order, history) };
}

export async function listOrders({ limit = 200 } = {}) {
  const sql = getSql();
  const rows = await sql`
    select o.id, o.order_number, o.created_at, o.customer_name, o.customer_email, o.total,
           o.status, o.payment_method, o.payment_status,
           (select coalesce(sum(quantity), 0) from order_items i where i.order_id = o.id)::int as item_count
    from orders o
    order by o.created_at desc
    limit ${limit}
  `;
  return rows.map(mapOrder);
}

export async function getOrderStats() {
  const sql = getSql();
  const [row] = await sql`
    select count(*)::int as order_count,
           coalesce(sum(total) filter (where status <> 'Cancelled'), 0) as revenue,
           count(*) filter (where status not in ('Delivered', 'Cancelled'))::int as active_count,
           count(*) filter (where payment_status = 'pending' and status <> 'Cancelled')::int as awaiting_payment
    from orders
  `;
  return { ...row, revenue: num(row.revenue) };
}

function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

// Customer-facing lookup. Requires the order number plus either the email used at
// checkout or the private tracking token from the confirmation page / email, so one
// customer cannot look up another customer's order by guessing order numbers.
// Returns only what the customer needs - no address, phone or internal notes.
export async function findOrderForCustomer({ orderNumber, email, token }) {
  const number = String(orderNumber || '').trim().toUpperCase();
  if (!/^S4H-\d{1,12}$/.test(number)) return null;
  const sql = getSql();
  const [row] = await sql`select * from orders where order_number = ${number}`;
  if (!row) return null;

  const emailOk = email && String(email).trim().toLowerCase() === row.customer_email.toLowerCase();
  const tokenOk = token && safeEqual(token, row.tracking_token);
  if (!emailOk && !tokenOk) return null;

  const [items, history] = await Promise.all([
    sql`select name, color, quantity, unit_price, line_total from order_items where order_id = ${row.id} order by id`,
    sql`select field, to_value, created_at from order_status_history where order_id = ${row.id} order by created_at, id`,
  ]);
  const order = mapOrder(row);
  let instructions = null;
  if (order.payment_status === 'pending' && ['bank_transfer', 'easypaisa'].includes(order.payment_method) && order.status !== 'Cancelled') {
    instructions = instructionsFor(order.payment_method, await getPaymentSettings(sql));
  }

  return {
    orderNumber: order.order_number,
    createdAt: order.created_at,
    status: order.status,
    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status,
    subtotal: order.subtotal,
    shippingFee: order.shipping_fee,
    total: order.total,
    items: items.map(mapItem).map((i) => ({ name: i.name, color: i.color, quantity: i.quantity, unitPrice: i.unit_price, lineTotal: i.line_total })),
    timeline: buildTimeline(order, history),
    instructions,
  };
}

// --- Admin updates --------------------------------------------------------------------

// Updates order status and/or payment status, recording each change in the audit history.
// Returns the list of actual changes so callers only notify on real transitions.
export async function updateOrderByAdmin(orderNumber, { status, paymentStatus, note }) {
  if (status !== undefined && !ORDER_STATUSES.includes(status)) throw new OrderValidationError('Invalid order status.');
  if (paymentStatus !== undefined && !PAYMENT_STATUSES.includes(paymentStatus)) {
    throw new OrderValidationError('Invalid payment status.');
  }
  const cleanNote = typeof note === 'string' ? note.trim().slice(0, 500) || null : null;
  const sql = getSql();

  return sql.begin(async (tx) => {
    const [current] = await tx`select * from orders where order_number = ${orderNumber} for update`;
    if (!current) return null;

    const changes = [];
    if (status !== undefined && status !== current.status) {
      changes.push({ field: 'status', from: current.status, to: status });
    }
    if (paymentStatus !== undefined && paymentStatus !== current.payment_status) {
      changes.push({ field: 'payment_status', from: current.payment_status, to: paymentStatus });
    }
    if (changes.length === 0) return { order: mapOrder(current), changes };

    const newStatus = status !== undefined ? status : current.status;
    const newPayment = paymentStatus !== undefined ? paymentStatus : current.payment_status;
    const [updated] = await tx`
      update orders set
        status = ${newStatus},
        payment_status = ${newPayment},
        paid_at = ${newPayment === 'paid' ? current.paid_at || new Date() : current.paid_at},
        updated_at = now()
      where id = ${current.id}
      returning *
    `;
    await tx`
      insert into order_status_history ${tx(
        changes.map((c) => ({ order_id: current.id, field: c.field, from_value: c.from, to_value: c.to, changed_by: 'admin', note: cleanNote })),
      )}
    `;
    return { order: mapOrder(updated), changes };
  });
}

export async function saveAdminNotes(orderNumber, notes) {
  const sql = getSql();
  const value = typeof notes === 'string' ? notes.trim().slice(0, 2000) || null : null;
  const [row] = await sql`update orders set admin_notes = ${value}, updated_at = now() where order_number = ${orderNumber} returning id`;
  return Boolean(row);
}

// --- Online gateway -------------------------------------------------------------------

// Applies a payment result that a gateway adapter has already verified (signature
// checked server-side). This is the only code path that marks card payments as paid.
export async function applyVerifiedGatewayResult({ gatewayId, orderNumber, gatewayReference, outcome, amount }) {
  const map = { paid: 'paid', failed: 'failed', cancelled: 'cancelled' };
  const newStatus = map[outcome];
  if (!newStatus) throw new Error(`Unknown gateway outcome: ${outcome}`);
  const sql = getSql();

  return sql.begin(async (tx) => {
    const [order] = await tx`select * from orders where order_number = ${orderNumber} for update`;
    if (!order || order.payment_method !== 'card') return null;
    if (newStatus === 'paid' && Number(amount) !== Number(order.total)) {
      throw new Error(`Gateway amount ${amount} does not match order total ${order.total} for ${orderNumber}.`);
    }
    if (order.payment_status === newStatus || order.payment_status === 'paid' || order.payment_status === 'refunded') {
      return { order: mapOrder(order), changes: [] };
    }
    const [updated] = await tx`
      update orders set payment_status = ${newStatus}, payment_gateway = ${gatewayId},
        gateway_reference = ${gatewayReference || null},
        paid_at = ${newStatus === 'paid' ? new Date() : null}, updated_at = now()
      where id = ${order.id} returning *
    `;
    await tx`
      insert into order_status_history ${tx({
        order_id: order.id, field: 'payment_status', from_value: order.payment_status, to_value: newStatus,
        changed_by: 'gateway', note: `${gatewayId}${gatewayReference ? ` ${gatewayReference}` : ''}`,
      })}
    `;
    if (newStatus === 'paid') {
      await createNotification(tx, {
        type: 'payment_received',
        title: `Payment received for ${order.order_number}`,
        message: `${formatRs(order.total)} confirmed by ${gatewayId}.`,
        orderId: order.id,
      });
    }
    return { order: mapOrder(updated), changes: [{ field: 'payment_status', from: order.payment_status, to: newStatus }] };
  });
}
