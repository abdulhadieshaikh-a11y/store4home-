import 'server-only';
import { formatRs } from '@/lib/currency';
import { paymentMethodLabel, paymentStatusLabel } from '@/lib/orders';

// Email templates. Every value that came from a customer or admin is HTML-escaped.
// Layout is a single 600px table with inline styles so it renders in mobile clients.

const BRAND = '#1F4B43';
const INK = '#16211D';
const MUTED = '#6B7A6E';
const LINE = '#E4E1D8';
const PAPER = '#F7F6F2';

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Karachi',
  });
}

function layout({ preheader, heading, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};">
<span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${LINE};border-radius:8px;">
      <tr><td style="padding:22px 24px;border-bottom:1px solid ${LINE};font-family:Georgia,'Times New Roman',serif;font-size:22px;color:${INK};">
        store<span style="color:#C98A2C;">4</span>home
      </td></tr>
      <tr><td style="padding:24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:${INK};">
        <h1 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:normal;color:${INK};">${escapeHtml(heading)}</h1>
        ${body}
      </td></tr>
      <tr><td style="padding:16px 24px;border-top:1px solid ${LINE};font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${MUTED};">
        You are receiving this email because of an order placed at store4home.
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function button(href, label) {
  if (!href) return '';
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0;"><tr><td style="background:${BRAND};border-radius:4px;">
    <a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">${escapeHtml(label)}</a>
  </td></tr></table>`;
}

function detailRows(rows) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;font-size:14px;">
    ${rows
      .map(
        ([label, value]) => `<tr>
        <td style="padding:6px 12px 6px 0;color:${MUTED};vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
        <td style="padding:6px 0;text-align:right;vertical-align:top;word-break:break-word;">${escapeHtml(value)}</td>
      </tr>`,
      )
      .join('')}
  </table>`;
}

function itemsTable(order) {
  const rows = order.items
    .map(
      (item) => `<tr>
      <td style="padding:10px 8px 10px 0;border-bottom:1px solid ${LINE};vertical-align:top;">
        ${escapeHtml(item.name)}${item.color ? `<br><span style="color:${MUTED};font-size:13px;">${escapeHtml(item.color)}</span>` : ''}
        <br><span style="color:${MUTED};font-size:13px;">${escapeHtml(item.quantity)} &times; ${escapeHtml(formatRs(item.unit_price))}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${LINE};text-align:right;vertical-align:top;white-space:nowrap;">${escapeHtml(formatRs(item.line_total))}</td>
    </tr>`,
    )
    .join('');

  const shipping = Number(order.shipping_fee) === 0 ? 'Free' : formatRs(order.shipping_fee);
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;font-size:14px;">
    <tr><th align="left" style="padding:0 0 8px;color:${MUTED};font-weight:normal;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Item</th>
        <th align="right" style="padding:0 0 8px;color:${MUTED};font-weight:normal;font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Amount</th></tr>
    ${rows}
    <tr><td style="padding:10px 0 4px;color:${MUTED};">Subtotal</td><td style="padding:10px 0 4px;text-align:right;">${escapeHtml(formatRs(order.subtotal))}</td></tr>
    <tr><td style="padding:4px 0;color:${MUTED};">Shipping</td><td style="padding:4px 0;text-align:right;">${escapeHtml(shipping)}</td></tr>
    <tr><td style="padding:10px 0 0;border-top:1px solid ${LINE};font-weight:bold;font-size:16px;">Total</td>
        <td style="padding:10px 0 0;border-top:1px solid ${LINE};text-align:right;font-weight:bold;font-size:16px;">${escapeHtml(formatRs(order.total))}</td></tr>
  </table>`;
}

function instructionsBlock(order, instructions) {
  if (!instructions) return '';
  return `<div style="margin:20px 0;padding:16px;border:1px solid ${LINE};border-radius:6px;background:${PAPER};">
    <p style="margin:0 0 8px;font-weight:bold;">${escapeHtml(instructions.title)}</p>
    ${detailRows(instructions.lines)}
    <p style="margin:8px 0 0;font-size:14px;">Please transfer <strong>${escapeHtml(formatRs(order.total))}</strong> and use your order number <strong>${escapeHtml(order.order_number)}</strong> as the payment reference. Your payment will show as pending until we confirm it.</p>
    ${instructions.note ? `<p style="margin:8px 0 0;font-size:14px;white-space:pre-line;">${escapeHtml(instructions.note)}</p>` : ''}
  </div>`;
}

function itemsText(order) {
  return order.items
    .map((i) => `- ${i.name}${i.color ? ` (${i.color})` : ''} x ${i.quantity} @ ${formatRs(i.unit_price)} = ${formatRs(i.line_total)}`)
    .join('\n');
}

function totalsText(order) {
  return [
    `Subtotal: ${formatRs(order.subtotal)}`,
    `Shipping: ${Number(order.shipping_fee) === 0 ? 'Free' : formatRs(order.shipping_fee)}`,
    `Total: ${formatRs(order.total)}`,
  ].join('\n');
}

function instructionsText(order, instructions) {
  if (!instructions) return '';
  return [
    '',
    instructions.title,
    ...instructions.lines.map(([k, v]) => `${k}: ${v}`),
    `Please transfer ${formatRs(order.total)} and use ${order.order_number} as the payment reference.`,
    instructions.note || '',
  ].join('\n');
}

// --- Customer: order confirmation -----------------------------------------------------

export function customerOrderConfirmation({ order, instructions, trackingUrl }) {
  const subject = `Order confirmed - ${order.order_number}`;
  const html = layout({
    preheader: `Thanks for your order ${order.order_number}.`,
    heading: 'Thank you for your order',
    body: `
      <p style="margin:0 0 12px;">Hi ${escapeHtml(order.customer_name)}, we have received your order and will be in touch before dispatch.</p>
      ${detailRows([
        ['Order number', order.order_number],
        ['Order date', formatDate(order.created_at)],
        ['Payment method', paymentMethodLabel(order.payment_method)],
        ['Payment status', paymentStatusLabel(order.payment_status)],
        ['Order status', order.status],
      ])}
      ${instructionsBlock(order, instructions)}
      ${itemsTable(order)}
      <p style="margin:16px 0 4px;color:${MUTED};font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Delivering to</p>
      <p style="margin:0;font-size:14px;">${escapeHtml(order.customer_name)}<br>${escapeHtml(order.shipping_address)}<br>${escapeHtml(order.shipping_city)} ${escapeHtml(order.shipping_postal_code)}<br>${escapeHtml(order.customer_phone)}</p>
      ${button(trackingUrl, 'Track your order')}
    `,
  });
  const text = [
    `Hi ${order.customer_name}, thank you for your order.`,
    '',
    `Order number: ${order.order_number}`,
    `Order date: ${formatDate(order.created_at)}`,
    `Payment method: ${paymentMethodLabel(order.payment_method)}`,
    `Payment status: ${paymentStatusLabel(order.payment_status)}`,
    `Order status: ${order.status}`,
    instructionsText(order, instructions),
    '',
    itemsText(order),
    '',
    totalsText(order),
    '',
    `Delivering to: ${order.shipping_address}, ${order.shipping_city} ${order.shipping_postal_code}`,
    trackingUrl ? `Track your order: ${trackingUrl}` : '',
  ].join('\n');
  return { subject, html, text };
}

// --- Store owner: new order -----------------------------------------------------------

export function ownerNewOrder({ order, adminUrl }) {
  const subject = `New order ${order.order_number} - ${formatRs(order.total)} (${paymentMethodLabel(order.payment_method)})`;
  const html = layout({
    preheader: `${order.customer_name} placed order ${order.order_number}.`,
    heading: 'New order received',
    body: `
      ${detailRows([
        ['Order number', order.order_number],
        ['Placed', new Date(order.created_at).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })],
        ['Order status', order.status],
        ['Payment method', paymentMethodLabel(order.payment_method)],
        ['Payment status', paymentStatusLabel(order.payment_status)],
        ['Total', formatRs(order.total)],
      ])}
      <p style="margin:16px 0 4px;color:${MUTED};font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Customer</p>
      <p style="margin:0;font-size:14px;">${escapeHtml(order.customer_name)}<br>${escapeHtml(order.customer_email)}<br>${escapeHtml(order.customer_phone)}</p>
      <p style="margin:16px 0 4px;color:${MUTED};font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Delivery address</p>
      <p style="margin:0;font-size:14px;">${escapeHtml(order.shipping_address)}<br>${escapeHtml(order.shipping_city)} ${escapeHtml(order.shipping_postal_code)}</p>
      ${order.customer_notes ? `<p style="margin:16px 0 4px;color:${MUTED};font-size:12px;text-transform:uppercase;letter-spacing:.5px;">Customer notes</p><p style="margin:0;font-size:14px;white-space:pre-line;">${escapeHtml(order.customer_notes)}</p>` : ''}
      ${itemsTable(order)}
      ${button(adminUrl, 'Open order in dashboard')}
    `,
  });
  const text = [
    `New order ${order.order_number}`,
    `Order status: ${order.status}`,
    `Payment: ${paymentMethodLabel(order.payment_method)} (${paymentStatusLabel(order.payment_status)})`,
    `Total: ${formatRs(order.total)}`,
    '',
    `Customer: ${order.customer_name}`,
    `Email: ${order.customer_email}`,
    `Phone: ${order.customer_phone}`,
    `Address: ${order.shipping_address}, ${order.shipping_city} ${order.shipping_postal_code}`,
    order.customer_notes ? `Notes: ${order.customer_notes}` : '',
    '',
    itemsText(order),
    '',
    totalsText(order),
    adminUrl ? `\nOpen in dashboard: ${adminUrl}` : '',
  ].join('\n');
  return { subject, html, text };
}

// --- Customer: order status change ----------------------------------------------------

const STATUS_COPY = {
  Confirmed: { heading: 'Your order is confirmed', line: 'Good news - your order has been confirmed and is being prepared.' },
  Shipped: { heading: 'Your order has shipped', line: 'Your order has left our warehouse and is on its way to you.' },
  'Out for Delivery': { heading: 'Your order is out for delivery', line: 'Your order is out for delivery and should reach you soon. Please keep your phone nearby.' },
  Delivered: { heading: 'Your order has been delivered', line: 'Your order has been delivered. We hope you enjoy it - thank you for shopping with us.' },
  Cancelled: { heading: 'Your order has been cancelled', line: 'Your order has been cancelled. If you have already paid, we will contact you about your refund. Reply to this email if you have any questions.' },
};

// Statuses that trigger a customer email. "Processing" is the initial state.
export const EMAIL_ORDER_STATUSES = Object.keys(STATUS_COPY);

export function customerStatusUpdate({ order, trackingUrl }) {
  const copy = STATUS_COPY[order.status];
  const subject = `${copy.heading} - ${order.order_number}`;
  const html = layout({
    preheader: copy.line,
    heading: copy.heading,
    body: `
      <p style="margin:0 0 12px;">Hi ${escapeHtml(order.customer_name)}, ${escapeHtml(copy.line.charAt(0).toLowerCase() + copy.line.slice(1))}</p>
      ${detailRows([
        ['Order number', order.order_number],
        ['Order status', order.status],
        ['Payment method', paymentMethodLabel(order.payment_method)],
        ['Payment status', paymentStatusLabel(order.payment_status)],
        ['Total', formatRs(order.total)],
      ])}
      ${itemsTable(order)}
      ${button(trackingUrl, 'Track your order')}
    `,
  });
  const text = [
    `Hi ${order.customer_name},`,
    copy.line,
    '',
    `Order number: ${order.order_number}`,
    `Order status: ${order.status}`,
    `Payment: ${paymentMethodLabel(order.payment_method)} (${paymentStatusLabel(order.payment_status)})`,
    `Total: ${formatRs(order.total)}`,
    trackingUrl ? `\nTrack your order: ${trackingUrl}` : '',
  ].join('\n');
  return { subject, html, text };
}

// --- Customer: payment status change --------------------------------------------------

const PAYMENT_COPY = {
  paid: { heading: 'Payment received', line: 'We have received your payment. Thank you!' },
  failed: {
    heading: 'We could not confirm your payment',
    line: 'We were unable to confirm your payment for this order. Please reply to this email or contact us so we can help.',
  },
  refunded: { heading: 'Your refund has been processed', line: 'Your payment for this order has been refunded.' },
};

export const EMAIL_PAYMENT_STATUSES = Object.keys(PAYMENT_COPY);

export function customerPaymentUpdate({ order, trackingUrl }) {
  const copy = PAYMENT_COPY[order.payment_status];
  const subject = `${copy.heading} - ${order.order_number}`;
  const html = layout({
    preheader: copy.line,
    heading: copy.heading,
    body: `
      <p style="margin:0 0 12px;">Hi ${escapeHtml(order.customer_name)}, ${escapeHtml(copy.line.charAt(0).toLowerCase() + copy.line.slice(1))}</p>
      ${detailRows([
        ['Order number', order.order_number],
        ['Payment method', paymentMethodLabel(order.payment_method)],
        ['Payment status', paymentStatusLabel(order.payment_status)],
        ['Amount', formatRs(order.total)],
        ['Order status', order.status],
      ])}
      ${button(trackingUrl, 'View your order')}
    `,
  });
  const text = [
    `Hi ${order.customer_name},`,
    copy.line,
    '',
    `Order number: ${order.order_number}`,
    `Payment status: ${paymentStatusLabel(order.payment_status)}`,
    `Amount: ${formatRs(order.total)}`,
    trackingUrl ? `\nView your order: ${trackingUrl}` : '',
  ].join('\n');
  return { subject, html, text };
}
