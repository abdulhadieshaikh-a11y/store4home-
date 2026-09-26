/** Shared validation for the enquiry form — used on both client and server. */

export const topics = ['General', 'Membership', 'Visit the gym'] as const;
export type Topic = (typeof topics)[number];

export type ContactInput = {
  name: string;
  phone: string;
  email: string;
  message: string;
  topic: Topic;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactInput>): ContactErrors {
  const errors: ContactErrors = {};
  const name = (input.name ?? '').trim();
  const phone = (input.phone ?? '').trim();
  const email = (input.email ?? '').trim();
  const message = (input.message ?? '').trim();
  const digits = phone.replace(/\D/g, '');

  if (name.length < 2) errors.name = 'Please enter your name.';
  else if (name.length > 80) errors.name = 'Please keep your name under 80 characters.';

  if (!phone) errors.phone = 'Please enter a phone number so we can reach you.';
  else if (!/^[+\d\s()-]+$/.test(phone) || digits.length < 10 || digits.length > 15)
    errors.phone = 'Please enter a valid phone number, e.g. 0300 1234567.';

  if (email && !EMAIL.test(email)) errors.email = 'Please enter a valid email address.';

  if (message.length < 10) errors.message = 'Please add a short message (at least 10 characters).';
  else if (message.length > 2000) errors.message = 'Please keep your message under 2,000 characters.';

  if (input.topic && !(topics as readonly string[]).includes(input.topic)) errors.topic = 'Please choose a topic.';

  return errors;
}
