'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { Button, ButtonLink } from '@/components/ui/Button';
import { enquiryInterests } from '@/lib/content';
import { LIMITS, normalise, validate, type EnquiryErrors, type EnquiryInput } from '@/lib/enquiry';
import { site } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const empty: EnquiryInput = { name: '', phone: '', email: '', interest: '', message: '' };

export default function EnquiryForm({ defaultInterest = '', submitLabel = 'Enquire now' }: { defaultInterest?: string; submitLabel?: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<EnquiryInput>({ ...empty, interest: defaultInterest });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryInput, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);

  const id = (k: string) => `${uid}-${k}`;

  const set = (k: keyof EnquiryInput, v: string) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k]) setErrors(validate(normalise(next)));
  };

  const blur = (k: keyof EnquiryInput) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(normalise(values)));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = normalise(values);
    const errs = validate(data);
    setErrors(errs);
    setTouched({ name: true, phone: true, email: true, interest: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus('submitting');
    setServerError('');
    try {
      const company = (formRef.current?.elements.namedItem('company') as HTMLInputElement | null)?.value ?? '';
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, company }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: EnquiryErrors };
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.error || 'Something went wrong.');
      }
      setStatus('success');
      setValues({ ...empty, interest: defaultInterest });
      setTouched({});
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Something went wrong.');
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  if (status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="keyline-dark relative border border-iron-900/20 p-8 text-center outline-none sm:p-12">
        <svg viewBox="0 0 64 64" className="mx-auto h-16 w-16 text-ember-500" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="32" cy="32" r="30" />
          <circle cx="32" cy="32" r="25" strokeOpacity=".4" />
          <path d="M20 33l8 8 16-18" strokeWidth="3" strokeLinecap="square" />
        </svg>
        <h3 className="display-md mt-6 text-iron-900">Enquiry received.</h3>
        <p className="mx-auto mt-4 max-w-sm font-serif text-lg italic text-iron-700">
          Thank you — the team will be in touch soon. For anything urgent, call the front desk.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={site.phone.href} variant="dark" arrow={false}>
            Call {site.phone.display}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="font-label text-[0.75rem] uppercase tracking-label text-iron-700 underline underline-offset-4 hover:text-ember-600"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const err = (k: keyof EnquiryInput) => (touched[k] ? errors[k] : undefined);
  const submitting = status === 'submitting';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={id('note')} className="relative">
      {status === 'error' ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 flex gap-4 border-l-4 border-ember-600 bg-ember-600/10 p-4 text-iron-900 outline-none"
        >
          <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-ember-600" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 7v6M12 16.5v.5" />
          </svg>
          <div>
            <p className="font-label text-xs uppercase tracking-label text-ember-700">Not sent</p>
            <p className="mt-1">{serverError}</p>
            <a href={site.phone.href} className="mt-2 inline-block font-label text-xs uppercase tracking-label text-iron-900 underline underline-offset-4">
              Call {site.phone.display}
            </a>
          </div>
        </div>
      ) : null}

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <Field id={id('name')} label="Name" required error={err('name')}>
          <input
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            required
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            onBlur={() => blur('name')}
            aria-invalid={!!err('name')}
            aria-describedby={err('name') ? id('name-err') : undefined}
            className="field"
            placeholder="Your full name"
          />
        </Field>

        <Field id={id('phone')} label="Phone" required error={err('phone')}>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            required
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
            onBlur={() => blur('phone')}
            aria-invalid={!!err('phone')}
            aria-describedby={err('phone') ? id('phone-err') : undefined}
            className="field"
            placeholder="03XX XXXXXXX"
          />
        </Field>

        <Field id={id('email')} label="Email" hint="Optional" error={err('email')}>
          <input
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            onBlur={() => blur('email')}
            aria-invalid={!!err('email')}
            aria-describedby={err('email') ? id('email-err') : undefined}
            className="field"
            placeholder="you@example.com"
          />
        </Field>

        <Field id={id('interest')} label="Interested in" required error={err('interest')}>
          <div className="relative">
            <select
              id={id('interest')}
              name="interest"
              required
              value={values.interest}
              onChange={(e) => set('interest', e.target.value)}
              onBlur={() => blur('interest')}
              aria-invalid={!!err('interest')}
              aria-describedby={err('interest') ? id('interest-err') : undefined}
              className={`field cursor-pointer appearance-none pr-8 ${values.interest ? '' : 'text-iron-500/70'}`}
            >
              <option value="" disabled>
                Choose one
              </option>
              {enquiryInterests.map((o) => (
                <option key={o} value={o} className="text-iron-900">
                  {o}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 12 8" className="pointer-events-none absolute right-1 top-1/2 h-2 w-3 -translate-y-1/2 text-iron-700" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M1 1l5 5 5-5" />
            </svg>
          </div>
        </Field>

        <div className="sm:col-span-2">
          <Field id={id('message')} label="Message" hint="Optional" error={err('message')}>
            <textarea
              id={id('message')}
              name="message"
              rows={4}
              maxLength={LIMITS.message}
              value={values.message}
              onChange={(e) => set('message', e.target.value)}
              onBlur={() => blur('message')}
              className="field resize-y"
              placeholder="Tell us about your goals, or ask us anything."
            />
          </Field>
        </div>
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p id={id('note')} className="max-w-xs text-sm text-iron-600">
          Fields marked <span className="text-ember-600">*</span> are required. We only use your details to reply to your enquiry.
        </p>
        <Button type="submit" variant="dark" disabled={submitting} aria-busy={submitting} arrow={!submitting} className="w-full sm:w-auto">
          {submitting ? (
            <span className="inline-flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="2.5" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" />
              </svg>
              Sending…
            </span>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label flex items-baseline justify-between">
        <span>
          {label}
          {required ? <span className="ml-1 text-ember-600" aria-hidden>*</span> : null}
        </span>
        {hint ? <span className="normal-case tracking-normal text-iron-500">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="mt-2 text-sm text-ember-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
