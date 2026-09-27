/** Shared (client + server) validation for the enquiry form. */

export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const LIMITS = { name: 80, phone: 20, email: 120, interest: 60, message: 1200 };

export function normalise(raw: Partial<Record<keyof EnquiryInput, unknown>>): EnquiryInput {
  const s = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  return {
    name: s(raw.name, LIMITS.name),
    phone: s(raw.phone, LIMITS.phone),
    email: s(raw.email, LIMITS.email),
    interest: s(raw.interest, LIMITS.interest),
    message: s(raw.message, LIMITS.message),
  };
}

export function validate(v: EnquiryInput): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (v.name.length < 2) e.name = 'Please enter your name.';
  const digits = v.phone.replace(/\D/g, '');
  if (!v.phone) e.phone = 'Please enter a phone number so we can reach you.';
  else if (!/^[+\d\s()-]+$/.test(v.phone) || digits.length < 10 || digits.length > 15)
    e.phone = 'Please enter a valid phone number, e.g. 0300 1234567.';
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = 'Please enter a valid email address, or leave it blank.';
  if (!v.interest) e.interest = 'Please choose what you are interested in.';
  return e;
}
