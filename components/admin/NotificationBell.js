'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell, CheckCheck, ShoppingCart, CreditCard } from 'lucide-react';

// Polling interval for new notifications. Notifications are stored in the database,
// so they survive refreshes; polling makes new orders appear without reloading.
const POLL_MS = 20000;

function timeAgo(value) {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return 'just now';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return new Date(value).toLocaleDateString();
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ items: [], unread: 0 });
  const [error, setError] = useState(false);
  const ref = useRef(null);

  // After a failure, back off (up to 5 minutes) instead of retrying every 20 seconds:
  // repeated failed database logins keep Supabase's connection block in place.
  const retryAt = useRef(0);
  const failures = useRef(0);

  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/notifications', { cache: 'no-store' });
      if (!response.ok) throw new Error('failed');
      setData(await response.json());
      setError(false);
      failures.current = 0;
      retryAt.current = 0;
    } catch (e) {
      setError(true);
      failures.current += 1;
      retryAt.current = Date.now() + Math.min(POLL_MS * 2 ** failures.current, 5 * 60 * 1000);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() >= retryAt.current) load();
    }, POLL_MS);
    const onFocus = () => {
      if (Date.now() >= retryAt.current) load();
    };
    window.addEventListener('focus', onFocus);
    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', onFocus);
    };
  }, [load]);

  useEffect(() => {
    if (!open) return undefined;
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  async function mark(body) {
    try {
      const response = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (response.ok) setData(await response.json());
    } catch (e) {
      /* keep current state; next poll will refresh */
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => {
          setOpen((o) => !o);
          if (!open) load();
        }}
        className="relative focus-ring rounded p-1.5 hover:bg-ink-50"
        aria-label={`Notifications${data.unread ? ` (${data.unread} unread)` : ''}`}
        aria-expanded={open}
      >
        <Bell size={19} />
        {data.unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-gold text-white text-[10.5px] font-bold rounded-full flex items-center justify-center">
            {data.unread > 99 ? '99+' : data.unread}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-[64px] sm:top-full sm:mt-2 sm:w-[360px] bg-white border border-line rounded shadow-lg z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line">
            <p className="font-semibold text-[14px]">
              Notifications {data.unread > 0 && <span className="text-ink-400 font-normal">({data.unread} unread)</span>}
            </p>
            <button
              onClick={() => mark({ all: true })}
              disabled={data.unread === 0}
              className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand hover:underline disabled:text-ink-400 disabled:no-underline"
            >
              <CheckCheck size={14} /> Mark all as read
            </button>
          </div>
          <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto">
            {error && data.items.length === 0 && (
              <p className="px-4 py-8 text-center text-[13.5px] text-ink-400">Could not load notifications.</p>
            )}
            {!error && data.items.length === 0 && (
              <p className="px-4 py-8 text-center text-[13.5px] text-ink-400">No notifications yet.</p>
            )}
            {data.items.map((n) => {
              const Icon = n.type === 'payment_received' ? CreditCard : ShoppingCart;
              const unread = !n.read_at;
              const content = (
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${unread ? 'bg-brand-50 text-brand' : 'bg-ink-50 text-ink-400'}`}>
                    <Icon size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-[13.5px] ${unread ? 'font-semibold' : 'font-medium text-ink-600'}`}>{n.title}</p>
                    <p className="text-[12.5px] text-ink-600 break-words">{n.message}</p>
                    <p className="text-[11.5px] text-ink-400 mt-0.5">{timeAgo(n.created_at)}</p>
                  </div>
                  {unread && <span className="w-2 h-2 bg-gold rounded-full mt-1.5 shrink-0" aria-label="Unread" />}
                </div>
              );
              return (
                <div key={n.id} className={`border-b border-line last:border-0 ${unread ? 'bg-brand-50/40' : ''}`}>
                  {n.order_number ? (
                    <Link
                      href={`/admin/orders/${n.order_number}`}
                      onClick={() => {
                        if (unread) mark({ ids: [n.id] });
                        setOpen(false);
                      }}
                      className="block px-4 py-3 hover:bg-ink-50"
                    >
                      {content}
                    </Link>
                  ) : (
                    <button onClick={() => unread && mark({ ids: [n.id] })} className="block w-full text-left px-4 py-3 hover:bg-ink-50">
                      {content}
                    </button>
                  )}
                  {unread && (
                    <div className="px-4 pb-2 -mt-1 text-right">
                      <button onClick={() => mark({ ids: [n.id] })} className="text-[12px] text-brand font-semibold hover:underline">
                        Mark as read
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
