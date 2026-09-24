'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Circle, Loader2, Mail, Phone, RefreshCw } from 'lucide-react';
import { formatRs } from '@/lib/currency';
import { ORDER_STATUSES, PAYMENT_STATUSES, paymentMethodLabel, paymentStatusLabel } from '@/lib/orders';
import StatusBadge from './StatusBadge';
import PaymentStatusBadge from './PaymentStatusBadge';

function dateTime(value) {
  return value ? new Date(value).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }) : '';
}

const EMAIL_KIND_LABELS = {
  order_confirmation: 'Customer order confirmation',
  owner_new_order: 'Store owner new-order alert',
  status_update: 'Customer status update',
  payment_update: 'Customer payment update',
};

function Card({ title, children, action }) {
  return (
    <div className="bg-white border border-line rounded p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-display text-[17px]">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function OrderDetail({ initialOrder }) {
  const [order, setOrder] = useState(initialOrder);
  const [status, setStatus] = useState(initialOrder.status);
  const [paymentStatus, setPaymentStatus] = useState(initialOrder.payment_status);
  const [note, setNote] = useState('');
  const [adminNotes, setAdminNotes] = useState(initialOrder.admin_notes || '');
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState(null);

  const dirty = status !== order.status || paymentStatus !== order.payment_status;
  const failedEmails = order.emails.filter((e) => e.status === 'failed').length;

  async function call(url, options, busyKey) {
    setBusy(busyKey);
    setMessage(null);
    try {
      const response = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Request failed.');
      if (data.order) {
        setOrder(data.order);
        setStatus(data.order.status);
        setPaymentStatus(data.order.payment_status);
      }
      return data;
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
      return null;
    } finally {
      setBusy('');
    }
  }

  async function saveStatus(e) {
    e.preventDefault();
    const body = { note };
    if (status !== order.status) body.status = status;
    if (paymentStatus !== order.payment_status) body.paymentStatus = paymentStatus;
    const data = await call(`/api/admin/orders/${encodeURIComponent(order.order_number)}`, { method: 'PATCH', body: JSON.stringify(body) }, 'status');
    if (!data) return;
    setNote('');
    const sent = data.emails.filter((r) => r.status === 'sent').length;
    const failed = data.emails.filter((r) => r.status === 'failed').length;
    const skipped = data.emails.filter((r) => r.status === 'skipped').length;
    const parts = ['Order updated.'];
    if (sent) parts.push(`${sent} customer email(s) sent.`);
    if (skipped) parts.push(`${skipped} email(s) had already been sent for this status and were not repeated.`);
    if (failed) parts.push(`${failed} email(s) failed - see Emails below to retry.`);
    setMessage({ type: failed ? 'error' : 'ok', text: parts.join(' ') });
  }

  async function saveNotes() {
    const data = await call(
      `/api/admin/orders/${encodeURIComponent(order.order_number)}`,
      { method: 'PATCH', body: JSON.stringify({ adminNotes }) },
      'notes',
    );
    if (data) setMessage({ type: 'ok', text: 'Notes saved.' });
  }

  async function retryEmails() {
    const data = await call(`/api/admin/orders/${encodeURIComponent(order.order_number)}/retry-emails`, { method: 'POST' }, 'retry');
    if (!data) return;
    const sent = data.results.filter((r) => r.status === 'sent').length;
    setMessage({
      type: sent === data.results.length ? 'ok' : 'error',
      text: data.results.length === 0 ? 'No failed emails to retry.' : `${sent} of ${data.results.length} email(s) sent.`,
    });
  }

  return (
    <div>
      <Link href="/admin/orders" className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-600 hover:text-brand mb-5">
        <ArrowLeft size={15} /> Back to orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-[22px]">{order.order_number}</h2>
          <p className="text-ink-400 text-[13.5px]">Placed on {dateTime(order.created_at)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={order.status} />
          <PaymentStatusBadge status={order.payment_status} />
        </div>
      </div>

      {message && (
        <div
          role="status"
          className={`rounded p-4 mb-6 text-[14px] border ${message.type === 'error' ? 'bg-gold-50 border-gold-100 text-gold-700' : 'bg-brand-50 border-brand-100 text-brand'}`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="flex flex-col gap-6 min-w-0">
          <Card title="Items">
            <div className="flex flex-col">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4 text-[14px] py-2.5 border-b border-line last:border-0">
                  <div className="min-w-0">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-[12.5px] text-ink-400">
                      {item.color ? `${item.color} · ` : ''}
                      {item.quantity} &times; {formatRs(item.unit_price)} · {item.product_id}
                    </p>
                  </div>
                  <span className="font-medium shrink-0">{formatRs(item.line_total)}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5 text-[14px] pt-4 mt-2 border-t border-line">
              <div className="flex justify-between text-ink-600"><span>Subtotal</span><span>{formatRs(order.subtotal)}</span></div>
              <div className="flex justify-between text-ink-600">
                <span>Shipping</span><span>{Number(order.shipping_fee) === 0 ? 'Free' : formatRs(order.shipping_fee)}</span>
              </div>
              <div className="flex justify-between text-[15px] font-semibold pt-2 border-t border-line mt-1"><span>Total</span><span>{formatRs(order.total)}</span></div>
            </div>
          </Card>

          <Card title="Fulfillment timeline">
            <div className="flex flex-col">
              {order.timeline.map((step, i) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {step.done ? <CheckCircle2 size={20} className="text-brand shrink-0" /> : <Circle size={20} className="text-ink-200 shrink-0" />}
                    {i < order.timeline.length - 1 && <div className={`w-px flex-1 min-h-[28px] ${step.done ? 'bg-brand' : 'bg-line'}`} />}
                  </div>
                  <div className="pb-6">
                    <p className={`text-[14px] font-medium ${step.done ? 'text-ink' : 'text-ink-400'}`}>{step.step}</p>
                    {step.date && <p className="text-[12px] text-ink-400">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="History">
            <ul className="flex flex-col gap-3 text-[13.5px]">
              {order.history.map((h) => (
                <li key={h.id} className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-line last:border-0 pb-3 last:pb-0">
                  <span>
                    <strong>{h.field === 'status' ? 'Order status' : 'Payment status'}</strong>{' '}
                    {h.from_value ? (
                      <>
                        {h.field === 'status' ? h.from_value : paymentStatusLabel(h.from_value)} &rarr;{' '}
                      </>
                    ) : (
                      'set to '
                    )}
                    {h.field === 'status' ? h.to_value : paymentStatusLabel(h.to_value)}
                    <span className="text-ink-400"> by {h.changed_by}</span>
                    {h.note && <span className="block text-ink-600">{h.note}</span>}
                  </span>
                  <span className="text-[12px] text-ink-400 shrink-0">{dateTime(h.created_at)}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card
            title="Emails"
            action={
              failedEmails > 0 && (
                <button
                  onClick={retryEmails}
                  disabled={busy === 'retry'}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand hover:underline disabled:opacity-60"
                >
                  {busy === 'retry' ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />} Retry failed ({failedEmails})
                </button>
              )
            }
          >
            {order.emails.length === 0 ? (
              <p className="text-[13.5px] text-ink-400">No emails recorded for this order.</p>
            ) : (
              <ul className="flex flex-col gap-3 text-[13.5px]">
                {order.emails.map((e) => (
                  <li key={e.id} className="border-b border-line last:border-0 pb-3 last:pb-0">
                    <div className="flex flex-wrap justify-between gap-2">
                      <span className="font-medium">{EMAIL_KIND_LABELS[e.kind] || e.kind}</span>
                      <span
                        className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${
                          e.status === 'sent' ? 'bg-brand-50 text-brand' : e.status === 'failed' ? 'bg-gold-50 text-gold-700' : 'bg-ink-100 text-ink-600'
                        }`}
                      >
                        {e.status}
                      </span>
                    </div>
                    <p className="text-ink-600 break-all">{e.recipient} · {e.subject}</p>
                    <p className="text-[12px] text-ink-400">
                      {e.sent_at ? `Sent ${dateTime(e.sent_at)}` : `Created ${dateTime(e.created_at)}`} · {e.attempts} attempt(s)
                    </p>
                    {e.status === 'failed' && e.last_error && <p className="text-[12px] text-gold-700 break-words">{e.last_error}</p>}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card title="Update order">
            <form onSubmit={saveStatus} className="flex flex-col gap-3">
              <div>
                <label htmlFor="order-status" className="text-[13px] font-semibold block mb-1.5">Order status</label>
                <select
                  id="order-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[13.5px] outline-none focus:border-brand bg-white"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="payment-status" className="text-[13px] font-semibold block mb-1.5">Payment status</label>
                <select
                  id="payment-status"
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[13.5px] outline-none focus:border-brand bg-white"
                >
                  {PAYMENT_STATUSES.map((s) => (
                    <option key={s} value={s}>{paymentStatusLabel(s)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="status-note" className="text-[13px] font-semibold block mb-1.5">
                  Note <span className="font-normal text-ink-400">(optional, internal)</span>
                </label>
                <input
                  id="status-note"
                  type="text"
                  value={note}
                  maxLength={500}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Payment verified, TCS tracking #"
                  className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[13.5px] outline-none focus:border-brand"
                />
              </div>
              <button
                type="submit"
                disabled={!dirty || busy === 'status'}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-[13.5px] py-2.5 rounded-sm hover:bg-brand-700 transition-colors disabled:opacity-50"
              >
                {busy === 'status' && <Loader2 size={14} className="animate-spin" />} Update
              </button>
              <p className="text-[12px] text-ink-400">The customer is emailed when the order is confirmed, shipped, out for delivery, delivered or cancelled, and when a payment is marked paid, failed or refunded.</p>
            </form>
          </Card>

          <Card title="Customer">
            <p className="text-[14px] font-medium">{order.customer_name}</p>
            <a href={`mailto:${order.customer_email}`} className="flex items-center gap-1.5 text-[13.5px] text-brand hover:underline break-all">
              <Mail size={13} className="shrink-0" /> {order.customer_email}
            </a>
            <a href={`tel:${order.customer_phone}`} className="flex items-center gap-1.5 text-[13.5px] text-brand hover:underline">
              <Phone size={13} className="shrink-0" /> {order.customer_phone}
            </a>
          </Card>

          <Card title="Delivery">
            <p className="text-[14px] text-ink-600 leading-relaxed">
              {order.shipping_address}
              <br />
              {order.shipping_city} {order.shipping_postal_code}
            </p>
            {order.customer_notes && (
              <div className="mt-3 pt-3 border-t border-line">
                <p className="text-[12px] text-ink-400 uppercase tracking-wide mb-1">Customer notes</p>
                <p className="text-[13.5px] text-ink-600 whitespace-pre-line">{order.customer_notes}</p>
              </div>
            )}
          </Card>

          <Card title="Payment">
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[13.5px]">
              <dt className="text-ink-400">Method</dt>
              <dd className="text-right">{paymentMethodLabel(order.payment_method)}</dd>
              <dt className="text-ink-400">Status</dt>
              <dd className="text-right"><PaymentStatusBadge status={order.payment_status} /></dd>
              <dt className="text-ink-400">Amount</dt>
              <dd className="text-right font-medium">{formatRs(order.total)}</dd>
              {order.payment_reference && (
                <>
                  <dt className="text-ink-400">Customer ref.</dt>
                  <dd className="text-right break-all">{order.payment_reference}</dd>
                </>
              )}
              {order.gateway_reference && (
                <>
                  <dt className="text-ink-400">Gateway ref.</dt>
                  <dd className="text-right break-all">{order.payment_gateway} {order.gateway_reference}</dd>
                </>
              )}
              {order.paid_at && (
                <>
                  <dt className="text-ink-400">Paid at</dt>
                  <dd className="text-right">{dateTime(order.paid_at)}</dd>
                </>
              )}
            </dl>
          </Card>

          <Card title="Internal notes">
            <textarea
              rows={3}
              value={adminNotes}
              maxLength={2000}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[13.5px] outline-none focus:border-brand resize-none"
              placeholder="Visible to admins only"
            />
            <button
              onClick={saveNotes}
              disabled={busy === 'notes' || adminNotes === (order.admin_notes || '')}
              className="w-full mt-2 border border-line font-semibold text-[13.5px] py-2.5 rounded-sm hover:border-ink-400 transition-colors disabled:opacity-50"
            >
              Save notes
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
