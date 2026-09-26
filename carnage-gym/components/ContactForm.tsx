'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { topics, validateContact, type ContactErrors, type ContactInput, type Topic } from '@/lib/contact';
import { site } from '@/lib/site';
import Icon from './Icon';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const empty: ContactInput = { name: '', phone: '', email: '', message: '', topic: 'General' };

export default function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // Pre-select the topic from ?enquiry=membership|visit links.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('enquiry');
    if (q === 'membership') setValues((v) => ({ ...v, topic: 'Membership' }));
    if (q === 'visit') setValues((v) => ({ ...v, topic: 'Visit the gym' }));
  }, []);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
    if (status === 'error') errorRef.current?.focus();
  }, [status]);

  const set = (key: keyof ContactInput, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validateContact(next));
  };

  const blur = (key: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateContact(values));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, phone: true, email: true, message: true });
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setStatus('submitting');
    setServerError('');
    try {
      const honeypot = (e.currentTarget.elements.namedItem('company') as HTMLInputElement | null)?.value ?? '';
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || 'Something went wrong.');
      }
      setStatus('success');
      setValues(empty);
      setTouched({});
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[520px] flex-col justify-between border border-white/15 p-8 outline-none sm:p-12"
      >
        <div>
          <span className="flex h-14 w-14 items-center justify-center bg-chalk text-void">
            <Icon name="check" className="h-6 w-6" />
          </span>
          <p className="label mt-10 text-ash">Enquiry received</p>
          <h3 className="display-md mt-5 text-chalk">
            Message sent.
            <span className="text-outline block">We&rsquo;ll be in touch.</span>
          </h3>
          <p className="lede mt-8 max-w-md">
            Thanks for reaching out to Carnage Gym. The team will get back to you soon. Need an answer right away? Call{' '}
            <a href={site.phone.href} className="text-chalk underline underline-offset-4">
              {site.phone.display}
            </a>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="label mt-12 inline-flex items-center gap-3 self-start text-chalk hover:underline hover:underline-offset-4"
        >
          Send another message <Icon name="arrow" />
        </button>
      </div>
    );
  }

  const submitting = status === 'submitting';
  const fieldProps = (key: keyof ContactInput) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    onBlur: () => blur(key),
    'aria-invalid': touched[key] && errors[key] ? true : undefined,
    'aria-describedby': touched[key] && errors[key] ? `${uid}-${key}-error` : undefined,
    disabled: submitting,
  });

  const ErrorText = ({ k }: { k: keyof ContactInput }) =>
    touched[k] && errors[k] ? (
      <p id={`${uid}-${k}-error`} className="mt-2 flex items-center gap-2 text-xs text-fog">
        <Icon name="alert" className="h-3.5 w-3.5 shrink-0" />
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={submitting} className="relative">
      {status === 'error' && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="mb-10 flex gap-4 border border-white/25 bg-white/[0.03] p-5 text-sm outline-none"
        >
          <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium text-chalk">Your message wasn&rsquo;t sent.</p>
            <p className="mt-1 text-fog">{serverError}</p>
            <a href={site.phone.href} className="label mt-3 inline-flex items-center gap-2 text-chalk">
              <Icon name="phone" className="h-3.5 w-3.5" /> Call {site.phone.display}
            </a>
          </div>
        </div>
      )}

      <fieldset className="mb-12" disabled={submitting}>
        <legend className="label mb-5 text-ash">I&rsquo;m enquiring about</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => {
            const checked = values.topic === t;
            return (
              <label
                key={t}
                className={`label cursor-pointer border px-4 py-3 transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-4 ${
                  checked ? 'border-chalk bg-chalk text-void' : 'border-white/20 text-fog hover:border-white/50 hover:text-chalk'
                }`}
              >
                <input
                  type="radio"
                  name="topic"
                  value={t}
                  checked={checked}
                  onChange={() => setValues((v) => ({ ...v, topic: t as Topic }))}
                  className="sr-only"
                />
                {t}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="label text-ash">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            {...fieldProps('name')}
            type="text"
            autoComplete="name"
            required
            placeholder="Your full name"
            onChange={(e) => set('name', e.target.value)}
            className="field mt-2"
          />
          <ErrorText k="name" />
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className="label text-ash">
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            {...fieldProps('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="0300 1234567"
            onChange={(e) => set('phone', e.target.value)}
            className="field mt-2"
          />
          <ErrorText k="phone" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-email`} className="label text-ash">
            Email <span className="normal-case tracking-normal text-ash/70">(optional)</span>
          </label>
          <input
            {...fieldProps('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            onChange={(e) => set('email', e.target.value)}
            className="field mt-2"
          />
          <ErrorText k="email" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className="label text-ash">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            {...fieldProps('message')}
            rows={5}
            required
            placeholder="Tell us a little about your goals, or ask us anything."
            onChange={(e) => set('message', e.target.value)}
            className="field mt-2 resize-none"
          />
          <ErrorText k="message" />
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ash">* Required. We only use your details to respond to your enquiry.</p>
        <button
          type="submit"
          disabled={submitting}
          className="group relative inline-flex min-h-[56px] items-center whitespace-nowrap justify-center gap-4 overflow-hidden bg-chalk px-9 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-void transition-colors duration-500 ease-expo hover:text-chalk disabled:cursor-wait disabled:opacity-80"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-y-full bg-iron transition-transform duration-500 ease-expo group-hover:translate-y-0 group-disabled:translate-y-full"
          />
          <span className="relative">{submitting ? 'Sending' : 'Send enquiry'}</span>
          {submitting ? (
            <span
              aria-hidden="true"
              className="relative h-4 w-4 animate-spin rounded-full border border-void/30 border-t-void"
            />
          ) : (
            <Icon name="arrow" className="relative h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-1.5" />
          )}
        </button>
      </div>
    </form>
  );
}
