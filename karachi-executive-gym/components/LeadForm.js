'use client';

import { useState } from 'react';
import { site } from '@/lib/site';
import WhatsAppIcon from './WhatsAppIcon';

const interests = [
  'Membership information',
  'Ladies timings',
  'Gents timings',
  'Training options',
  'Visiting the gym',
];

const field =
  'peer w-full border-0 border-b border-white/15 bg-transparent px-0 pb-3 pt-7 text-base text-white placeholder-transparent outline-none transition-colors duration-300 focus:border-accent focus:ring-0';
const label =
  'pointer-events-none absolute left-0 top-7 text-base text-mist transition-all duration-300 ease-premium peer-focus:top-0 peer-focus:text-[0.6875rem] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accent-light peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.6875rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]';

// No backend exists, so the form composes a WhatsApp message instead of pretending to email it.
export default function LeadForm() {
  const [values, setValues] = useState({ name: '', phone: '', interest: interests[0], message: '' });
  const [errors, setErrors] = useState({});

  const update = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!/^[+\d][\d\s-]{6,}$/.test(values.phone.trim())) next.phone = 'Please enter a valid phone number.';
    setErrors(next);
    if (Object.keys(next).length) return;

    const text = [
      `Hello ${site.name},`,
      '',
      `Name: ${values.name.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Interested in: ${values.interest}`,
      values.message.trim() ? `Message: ${values.message.trim()}` : null,
    ]
      .filter((l) => l !== null)
      .join('\n');

    window.open(site.whatsapp.withText(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative border border-line bg-coal p-6 xs:p-8 sm:p-12"
      aria-labelledby="lead-form-title"
    >
      <span className="absolute left-0 top-0 h-px w-24 bg-accent" aria-hidden="true" />
      <h3 id="lead-form-title" className="font-display text-2xl font-bold uppercase text-white sm:text-3xl" style={{ fontStretch: '108%' }}>
        Send an enquiry
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">
        Fill in your details and we will open WhatsApp with your message ready to send.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="relative">
          <input id="lf-name" name="name" type="text" autoComplete="name" placeholder="Your name" value={values.name} onChange={update} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'lf-name-err' : undefined} />
          <label htmlFor="lf-name" className={label}>Your name</label>
          {errors.name ? <p id="lf-name-err" className="mt-2 text-xs text-red-300">{errors.name}</p> : null}
        </div>
        <div className="relative">
          <input id="lf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone number" value={values.phone} onChange={update} className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'lf-phone-err' : undefined} />
          <label htmlFor="lf-phone" className={label}>Phone number</label>
          {errors.phone ? <p id="lf-phone-err" className="mt-2 text-xs text-red-300">{errors.phone}</p> : null}
        </div>
      </div>

      <fieldset className="mt-10">
        <legend className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-mist">I&rsquo;m interested in</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {interests.map((opt) => (
            <label key={opt} className="cursor-pointer">
              <input type="radio" name="interest" value={opt} checked={values.interest === opt} onChange={update} className="peer sr-only" />
              <span className="inline-flex min-h-[40px] items-center border border-white/15 px-4 text-[0.8125rem] text-fog transition-all duration-300 hover:border-white/40 peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="relative mt-10">
        <textarea id="lf-message" name="message" rows={3} placeholder="Message (optional)" value={values.message} onChange={update} className={`${field} resize-none`} />
        <label htmlFor="lf-message" className={label}>Message (optional)</label>
      </div>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <WhatsAppIcon className="h-4 w-4" />
          Send via WhatsApp
        </button>
        <p className="text-xs leading-relaxed text-mist sm:max-w-[15rem] sm:text-right">
          Your details are not stored on this website. Or call{' '}
          <a href={site.phone.href} className="text-white underline-offset-4 hover:underline">{site.phone.display}</a>.
        </p>
      </div>
    </form>
  );
}
