'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

const titles = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/products/add': 'Add Product',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/categories': 'Categories',
  '/admin/settings': 'Settings',
};

function resolveTitle(pathname) {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith('/admin/products/') && pathname.endsWith('/edit')) return 'Edit Product';
  if (pathname.startsWith('/admin/orders/')) return 'Order Details';
  return 'Dashboard';
}

export default function AdminShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-paper">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0">
        <AdminTopbar title={resolveTitle(pathname)} onMenu={() => setMobileOpen(true)} />
        <div className="px-5 sm:px-8 py-7">{children}</div>
      </div>
    </div>
  );
}
