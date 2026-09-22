'use client';

import { Menu, Bell, Search } from 'lucide-react';

export default function AdminTopbar({ title, onMenu }) {
  return (
    <div className="sticky top-0 z-30 bg-paper border-b border-line">
      <div className="flex items-center justify-between gap-4 px-5 sm:px-8 h-[68px]">
        <div className="flex items-center gap-3">
          <button onClick={onMenu} className="lg:hidden focus-ring rounded p-1.5" aria-label="Open menu">
            <Menu size={20} />
          </button>
          <h1 className="font-display text-[21px]">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-white border border-line rounded-full px-3.5 py-2 w-[220px]">
            <Search size={15} className="text-ink-400 shrink-0" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none text-[13.5px] px-2 w-full placeholder:text-ink-400" />
          </div>
          <button className="relative focus-ring rounded p-1.5 hover:bg-ink-50" aria-label="Notifications">
            <Bell size={19} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
          </button>
          <div className="flex items-center gap-2.5 pl-2 border-l border-line">
            <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-[13px] font-semibold">
              A
            </div>
            <span className="hidden sm:inline text-[13.5px] font-medium">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
