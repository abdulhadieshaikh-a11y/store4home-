import 'server-only';
import { getSql } from './db';
import { getActiveGateway } from '@/lib/payments/gateways';

// Admin-editable settings live in the store_settings table. Nothing here has real
// account details baked in: until the admin fills them in, Bank Transfer and
// Easypaisa are not offered at checkout.
export const DEFAULT_PAYMENT_SETTINGS = {
  bank_transfer: {
    enabled: false,
    bankName: '',
    accountTitle: '',
    accountNumber: '',
    iban: '',
    instructions: '',
  },
  easypaisa: {
    enabled: false,
    accountTitle: '',
    mobileNumber: '',
    instructions: '',
  },
};

export const DEFAULT_NOTIFICATION_SETTINGS = {
  // Falls back to the STORE_OWNER_EMAIL environment variable when empty.
  ownerEmail: '',
  newOrderEmails: true,
  customerStatusEmails: true,
};

const LIMITS = { short: 120, long: 1000 };

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export function sanitizePaymentSettings(input = {}) {
  const bank = input.bank_transfer || {};
  const ep = input.easypaisa || {};
  return {
    bank_transfer: {
      enabled: Boolean(bank.enabled),
      bankName: clean(bank.bankName, LIMITS.short),
      accountTitle: clean(bank.accountTitle, LIMITS.short),
      accountNumber: clean(bank.accountNumber, LIMITS.short),
      iban: clean(bank.iban, LIMITS.short).replace(/\s+/g, ' '),
      instructions: clean(bank.instructions, LIMITS.long),
    },
    easypaisa: {
      enabled: Boolean(ep.enabled),
      accountTitle: clean(ep.accountTitle, LIMITS.short),
      mobileNumber: clean(ep.mobileNumber, LIMITS.short),
      instructions: clean(ep.instructions, LIMITS.long),
    },
  };
}

export function sanitizeNotificationSettings(input = {}) {
  const ownerEmail = clean(input.ownerEmail, 254);
  if (ownerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail)) {
    throw new Error('Store owner email is not a valid email address.');
  }
  return {
    ownerEmail,
    newOrderEmails: input.newOrderEmails !== false,
    customerStatusEmails: input.customerStatusEmails !== false,
  };
}

async function readSetting(key, defaults, sql = getSql()) {
  const [row] = await sql`select value from store_settings where key = ${key}`;
  const value = row?.value || {};
  if (key === 'payments') {
    return {
      bank_transfer: { ...defaults.bank_transfer, ...(value.bank_transfer || {}) },
      easypaisa: { ...defaults.easypaisa, ...(value.easypaisa || {}) },
    };
  }
  return { ...defaults, ...value };
}

async function writeSetting(key, value, sql = getSql()) {
  await sql`
    insert into store_settings (key, value, updated_at)
    values (${key}, ${sql.json(value)}, now())
    on conflict (key) do update set value = excluded.value, updated_at = now()
  `;
}

export function getPaymentSettings(sql) {
  return readSetting('payments', DEFAULT_PAYMENT_SETTINGS, sql);
}

export function getNotificationSettings(sql) {
  return readSetting('notifications', DEFAULT_NOTIFICATION_SETTINGS, sql);
}

export async function savePaymentSettings(input) {
  const value = sanitizePaymentSettings(input);
  await writeSetting('payments', value);
  return value;
}

export async function saveNotificationSettings(input) {
  const value = sanitizeNotificationSettings(input);
  await writeSetting('notifications', value);
  return value;
}

export async function getOwnerEmail(sql) {
  const settings = await getNotificationSettings(sql);
  return settings.ownerEmail || process.env.STORE_OWNER_EMAIL || '';
}

function isBankConfigured(bank) {
  return bank.enabled && bank.accountTitle && (bank.accountNumber || bank.iban);
}

function isEasypaisaConfigured(ep) {
  return ep.enabled && ep.accountTitle && ep.mobileNumber;
}

// Payment instructions for a manual method, as shown to the customer.
export function instructionsFor(method, settings) {
  if (method === 'bank_transfer') {
    const b = settings.bank_transfer;
    return {
      title: 'Bank transfer details',
      lines: [
        b.bankName && ['Bank', b.bankName],
        ['Account title', b.accountTitle],
        b.accountNumber && ['Account number', b.accountNumber],
        b.iban && ['IBAN', b.iban],
      ].filter(Boolean),
      note: b.instructions,
    };
  }
  if (method === 'easypaisa') {
    const e = settings.easypaisa;
    return {
      title: 'Easypaisa payment details',
      lines: [
        ['Account title', e.accountTitle],
        ['Easypaisa number', e.mobileNumber],
      ],
      note: e.instructions,
    };
  }
  return null;
}

// The payment methods customers can choose from right now (public information only).
export async function getAvailablePaymentMethods() {
  const settings = await getPaymentSettings();
  const methods = [{ id: 'cod', instructions: null }];
  if (isBankConfigured(settings.bank_transfer)) {
    methods.push({ id: 'bank_transfer', instructions: instructionsFor('bank_transfer', settings) });
  }
  if (isEasypaisaConfigured(settings.easypaisa)) {
    methods.push({ id: 'easypaisa', instructions: instructionsFor('easypaisa', settings) });
  }
  if (getActiveGateway()) methods.push({ id: 'card', instructions: null });
  return methods;
}
