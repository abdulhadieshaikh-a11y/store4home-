'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Lock } from 'lucide-react';

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || 'Could not sign in.');
        return;
      }
      const next = searchParams.get('next');
      // Only allow redirects back into the admin area.
      window.location.assign(next && next.startsWith('/admin') && !next.startsWith('//') ? next : '/admin');
    } catch (err) {
      setError('Connection problem. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-x py-16 md:py-24 flex justify-center">
      <div className="w-full max-w-[400px]">
        <Link href="/" className="block text-center font-display text-[24px] mb-8">
          store<span className="text-gold">4</span>home
        </Link>
        <div className="bg-white border border-line rounded p-7">
          <h1 className="font-display text-[24px] mb-1.5 flex items-center gap-2">
            <Lock size={20} className="text-brand" /> Admin sign in
          </h1>
          <p className="text-ink-400 text-[14px] mb-6">Enter the store administrator password.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="admin-password" className="text-[13px] font-semibold block mb-1.5">Password</label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
              />
            </div>
            {error && <p role="alert" className="text-[13.5px] text-gold-700">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-[14.5px] py-3.5 rounded-sm hover:bg-brand-700 transition-colors disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />} Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
