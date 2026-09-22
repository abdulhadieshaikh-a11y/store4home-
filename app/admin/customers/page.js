import Image from 'next/image';
import { Search, Mail } from 'lucide-react';
import { customers } from '@/data/customers';
import { formatPKR } from '@/lib/currency';

export default function AdminCustomersPage() {
  return (
    <div>
      <div className="flex items-center bg-white border border-line rounded-full px-4 py-2.5 w-full sm:w-[280px] mb-6">
        <Search size={15} className="text-ink-400 shrink-0" />
        <input type="text" placeholder="Search customers..." className="bg-transparent outline-none text-[13.5px] px-2 w-full placeholder:text-ink-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {customers.map((c) => (
          <div key={c.id} className="bg-white border border-line rounded p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-ink-100 shrink-0">
                <Image src={c.avatar} alt={c.name} fill sizes="44px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-[14.5px] font-semibold truncate">{c.name}</p>
                <p className="text-[12.5px] text-ink-400 truncate flex items-center gap-1">
                  <Mail size={11} /> {c.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-line text-center">
              <div>
                <p className="text-[15px] font-semibold">{c.orders}</p>
                <p className="text-[11.5px] text-ink-400">Orders</p>
              </div>
              <div>
                <p className="text-[15px] font-semibold">{formatPKR(c.spent)}</p>
                <p className="text-[11.5px] text-ink-400">Spent</p>
              </div>
              <div>
                <p className="text-[15px] font-semibold">{c.joined.slice(0, 4)}</p>
                <p className="text-[11.5px] text-ink-400">Joined</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
