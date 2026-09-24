'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2, AlertCircle } from 'lucide-react';

function Field({ label, value, onChange, placeholder, type = 'text', hint }) {
  return (
    <div>
      <label className="text-[13px] font-semibold block mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
      />
      {hint && <p className="text-[12px] text-ink-400 mt-1">{hint}</p>}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 text-[14px] py-1 cursor-pointer">
      {label}
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 shrink-0" />
    </label>
  );
}

function Notes({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-[13px] font-semibold block mb-1.5">{label}</label>
      <textarea
        rows={3}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand resize-none"
      />
    </div>
  );
}

// Payment instructions and order-notification settings, stored in the database.
export default function PaymentSettingsForm() {
  const [settings, setSettings] = useState(null);
  const [meta, setMeta] = useState({});
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch('/api/admin/settings', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('failed'))))
      .then((data) => {
        setSettings({ payments: data.payments, notifications: data.notifications });
        setMeta({ emailConfigured: data.emailConfigured, ownerEmailFallback: data.ownerEmailFallback });
      })
      .catch(() => setLoadError('Could not load payment settings. Check the database connection.'));
  }, []);

  function update(section, group, field, value) {
    setSettings((s) => {
      if (!group) return { ...s, [section]: { ...s[section], [field]: value } };
      return { ...s, [section]: { ...s[section], [group]: { ...s[section][group], [field]: value } } };
    });
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Could not save settings.');
      setSettings({ payments: data.payments, notifications: data.notifications });
      setMessage({ type: 'ok', text: 'Payment and notification settings saved.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  }

  if (loadError) {
    return (
      <div role="alert" className="flex items-start gap-2 border border-gold-100 bg-gold-50 text-gold-700 rounded p-4 max-w-[900px] text-[14px]">
        <AlertCircle size={18} className="shrink-0 mt-0.5" /> {loadError}
      </div>
    );
  }
  if (!settings) {
    return (
      <p className="flex items-center gap-2 text-[14px] text-ink-400">
        <Loader2 size={16} className="animate-spin" /> Loading payment settings...
      </p>
    );
  }

  const bank = settings.payments.bank_transfer;
  const ep = settings.payments.easypaisa;
  const n = settings.notifications;

  return (
    <form onSubmit={handleSave} className="max-w-[900px]">
      <h2 className="font-display text-[22px] mb-1">Payments &amp; notifications</h2>
      <p className="text-ink-400 text-[14px] mb-5">
        Cash on Delivery is always available. Bank Transfer and Easypaisa are offered at checkout only when enabled and filled in below.
      </p>

      {!meta.emailConfigured && (
        <div role="alert" className="flex items-start gap-2 border border-gold-100 bg-gold-50 text-gold-700 rounded p-4 mb-6 text-[14px]">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          Email sending is not configured on the server (RESEND_API_KEY / RESEND_FROM_EMAIL). Orders still work, but no emails will be delivered.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
        <div className="bg-white border border-line rounded p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-[18px]">Bank Transfer</h3>
            <Toggle label="Enabled" checked={bank.enabled} onChange={(v) => update('payments', 'bank_transfer', 'enabled', v)} />
          </div>
          <Field label="Bank name" value={bank.bankName} onChange={(v) => update('payments', 'bank_transfer', 'bankName', v)} />
          <Field label="Account title" value={bank.accountTitle} onChange={(v) => update('payments', 'bank_transfer', 'accountTitle', v)} />
          <Field label="Account number" value={bank.accountNumber} onChange={(v) => update('payments', 'bank_transfer', 'accountNumber', v)} />
          <Field label="IBAN" value={bank.iban} onChange={(v) => update('payments', 'bank_transfer', 'iban', v)} />
          <Notes
            label="Payment instructions"
            value={bank.instructions}
            onChange={(v) => update('payments', 'bank_transfer', 'instructions', v)}
            placeholder="e.g. Send a screenshot of the transfer receipt to our WhatsApp number."
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-line rounded p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[18px]">Easypaisa</h3>
              <Toggle label="Enabled" checked={ep.enabled} onChange={(v) => update('payments', 'easypaisa', 'enabled', v)} />
            </div>
            <Field label="Account title" value={ep.accountTitle} onChange={(v) => update('payments', 'easypaisa', 'accountTitle', v)} />
            <Field label="Easypaisa mobile number" type="tel" value={ep.mobileNumber} onChange={(v) => update('payments', 'easypaisa', 'mobileNumber', v)} />
            <Notes
              label="Payment instructions"
              value={ep.instructions}
              onChange={(v) => update('payments', 'easypaisa', 'instructions', v)}
              placeholder="e.g. Share the transaction ID after sending payment."
            />
          </div>

          <div className="bg-white border border-line rounded p-6 flex flex-col gap-3">
            <h3 className="font-display text-[18px] mb-1">Order notifications</h3>
            <Field
              label="Store owner email (new-order alerts)"
              type="email"
              value={n.ownerEmail}
              onChange={(v) => update('notifications', null, 'ownerEmail', v)}
              hint={meta.ownerEmailFallback ? 'If empty, the STORE_OWNER_EMAIL environment variable is used.' : 'Required for new-order emails (or set STORE_OWNER_EMAIL).'}
            />
            <Toggle label="Email the store owner about new orders" checked={n.newOrderEmails} onChange={(v) => update('notifications', null, 'newOrderEmails', v)} />
            <Toggle
              label="Email customers when order / payment status changes"
              checked={n.customerStatusEmails}
              onChange={(v) => update('notifications', null, 'customerStatusEmails', v)}
            />
          </div>
        </div>
      </div>

      {message && (
        <p role="status" className={`mt-5 text-[14px] ${message.type === 'error' ? 'text-gold-700' : 'text-brand'}`}>{message.text}</p>
      )}
      <button
        type="submit"
        disabled={saving}
        className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-[14.5px] px-8 py-3.5 rounded-sm hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save payment settings
      </button>
    </form>
  );
}
