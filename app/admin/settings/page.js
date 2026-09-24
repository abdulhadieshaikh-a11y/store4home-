'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import PaymentSettingsForm from '@/components/admin/PaymentSettingsForm';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 max-w-[900px]">
        <div className="bg-white border border-line rounded p-6">
          <h2 className="font-display text-[18px] mb-5">Store details</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Store name</label>
              <input type="text" defaultValue="store4home" className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand" />
            </div>
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Support email</label>
              <input type="email" defaultValue="support@store4home.com" className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand" />
            </div>
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Support phone</label>
              <input type="tel" defaultValue="+92 300 1234567" className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand" />
            </div>
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Currency</label>
              <select defaultValue="PKR" className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand bg-white">
                <option value="PKR">PKR (Rs)</option>
                <option value="PKR">PKR (Rs.)</option>
                <option value="AED">AED (د.إ)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-line rounded p-6">
            <h2 className="font-display text-[18px] mb-5">Shipping</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[13px] font-semibold block mb-1.5">Flat shipping rate</label>
                <input type="number" defaultValue="8" step="0.01" className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="text-[13px] font-semibold block mb-1.5">Free shipping threshold</label>
                <input type="number" defaultValue="100" step="0.01" className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-line rounded p-6">
            <h2 className="font-display text-[18px] mb-5">Notifications</h2>
            <div className="flex flex-col gap-3">
              {['New order emails', 'Low stock alerts', 'Customer review alerts'].map((label) => (
                <label key={label} className="flex items-center justify-between text-[14px] py-1">
                  {label}
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-[14.5px] py-3.5 rounded-sm hover:bg-brand-700 transition-colors"
          >
            <Save size={16} /> {saved ? 'Settings saved' : 'Save settings'}
          </button>
        </div>
      </form>
      <PaymentSettingsForm />
    </div>
  );
}
