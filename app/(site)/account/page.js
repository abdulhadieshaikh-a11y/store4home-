import Link from 'next/link';
import { orders } from '@/data/orders';
import { formatPKR } from '@/lib/currency';
import { PackageSearch, MapPin, LogOut, User } from 'lucide-react';

export default function AccountPage() {
  const myOrders = orders.slice(0, 3);

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="font-display text-[30px] mb-8">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        <aside className="flex md:flex-col gap-1 overflow-x-auto">
          <a className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm bg-brand-50 text-brand font-semibold text-[14px] whitespace-nowrap">
            <User size={16} /> Overview
          </a>
          <a className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm text-ink-600 hover:bg-ink-50 text-[14px] whitespace-nowrap">
            <PackageSearch size={16} /> Orders
          </a>
          <a className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm text-ink-600 hover:bg-ink-50 text-[14px] whitespace-nowrap">
            <MapPin size={16} /> Addresses
          </a>
          <a className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm text-ink-600 hover:bg-ink-50 text-[14px] whitespace-nowrap">
            <LogOut size={16} /> Log out
          </a>
        </aside>

        <div>
          <div className="bg-white border border-line rounded p-6 mb-8">
            <h2 className="font-display text-[19px] mb-4">Account details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
              <div>
                <p className="text-ink-400 text-[12.5px]">Name</p>
                <p className="font-medium">Ayesha Raza</p>
              </div>
              <div>
                <p className="text-ink-400 text-[12.5px]">Email</p>
                <p className="font-medium">ayesha.raza@example.com</p>
              </div>
            </div>
          </div>

          <h2 className="font-display text-[19px] mb-4">Recent orders</h2>
          <div className="flex flex-col gap-3">
            {myOrders.map((o) => (
              <Link
                key={o.id}
                href={`/track-order?id=${o.id}`}
                className="flex items-center justify-between bg-white border border-line rounded p-4 hover:border-ink-400 transition-colors"
              >
                <div>
                  <p className="text-[14px] font-semibold">{o.id}</p>
                  <p className="text-[12.5px] text-ink-400">{o.date} &middot; {o.items.length} item(s)</p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-semibold">{formatPKR(o.total)}</p>
                  <p className="text-[12.5px] text-brand">{o.status}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
