'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Settings,
  Store,
  X,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ mobileOpen, onClose }) {
  const pathname = usePathname();

  const content = (
    <>
      <div className="flex items-center justify-between px-6 py-6">
        <Link href="/" className="font-display text-[21px] text-paper">
          store<span className="text-gold">4</span>home
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-ink-300" aria-label="Close menu">
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-[14px] font-medium transition-colors ${
                active ? 'bg-brand text-white' : 'text-ink-200 hover:bg-ink-800 hover:text-paper'
              }`}
            >
              <Icon size={17} /> {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-3 pb-6 pt-8">
        <Link
          href="/"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-[13.5px] font-medium text-ink-300 hover:bg-ink-800 hover:text-paper transition-colors"
        >
          <Store size={16} /> View store
        </Link>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-[240px] bg-ink shrink-0 min-h-screen sticky top-0">
        {content}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/60" onClick={onClose} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-ink flex flex-col">{content}</aside>
        </div>
      )}
    </>
  );
}
