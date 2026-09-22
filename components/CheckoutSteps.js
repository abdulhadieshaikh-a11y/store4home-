'use client';

import { usePathname } from 'next/navigation';
import { Check } from 'lucide-react';

const steps = [
  { key: 'shipping', label: 'Shipping', path: '/checkout' },
  { key: 'payment', label: 'Payment', path: '/checkout/payment' },
  { key: 'confirmation', label: 'Confirmation', path: '/checkout/confirmation' },
];

export default function CheckoutSteps() {
  const pathname = usePathname();
  const activeIndex = steps.findIndex((s) => s.path === pathname);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6 mb-10 max-w-content mx-auto">
      {steps.map((step, i) => {
        const state = i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'pending';
        return (
          <div key={step.key} className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[12.5px] font-semibold shrink-0 ${
                  state === 'done'
                    ? 'bg-brand text-white'
                    : state === 'active'
                    ? 'bg-ink text-white'
                    : 'bg-ink-100 text-ink-400'
                }`}
              >
                {state === 'done' ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-[13.5px] font-medium hidden sm:inline ${state === 'pending' ? 'text-ink-400' : ''}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && <div className="w-8 sm:w-16 h-px bg-line" />}
          </div>
        );
      })}
    </div>
  );
}
