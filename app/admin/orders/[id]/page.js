import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { getOrder } from '@/data/orders';
import { formatPKR } from '@/lib/currency';
import { StatusBadge } from '../../page';

export default function AdminOrderDetail({ params }) {
  const order = getOrder(params.id);
  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/orders" className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-600 hover:text-brand mb-5">
        <ArrowLeft size={15} /> Back to orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-[22px]">{order.id}</h2>
          <p className="text-ink-400 text-[13.5px]">Placed on {order.date}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-line rounded p-6">
            <h3 className="font-display text-[17px] mb-4">Items</h3>
            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-[14px] py-2 border-b border-line last:border-0">
                  <span className="text-ink-600">{item.name} &times; {item.qty}</span>
                  <span className="font-medium">{formatPKR(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[15px] font-semibold pt-4 mt-2 border-t border-line">
              <span>Total</span>
              <span>{formatPKR(order.total)}</span>
            </div>
          </div>

          <div className="bg-white border border-line rounded p-6">
            <h3 className="font-display text-[17px] mb-5">Fulfillment timeline</h3>
            <div className="flex flex-col">
              {order.tracking.map((step, i) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {step.done ? (
                      <CheckCircle2 size={20} className="text-brand shrink-0" />
                    ) : (
                      <Circle size={20} className="text-ink-200 shrink-0" />
                    )}
                    {i < order.tracking.length - 1 && (
                      <div className={`w-px flex-1 min-h-[28px] ${step.done ? 'bg-brand' : 'bg-line'}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`text-[14px] font-medium ${step.done ? 'text-ink' : 'text-ink-400'}`}>{step.step}</p>
                    {step.date && <p className="text-[12px] text-ink-400">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-line rounded p-6">
            <h3 className="font-display text-[17px] mb-4">Customer</h3>
            <p className="text-[14px] font-medium">{order.customer}</p>
            <p className="text-[13.5px] text-ink-400">{order.email}</p>
          </div>
          <div className="bg-white border border-line rounded p-6">
            <h3 className="font-display text-[17px] mb-4">Shipping address</h3>
            <p className="text-[14px] text-ink-600 leading-relaxed">{order.address}</p>
          </div>
          <div className="bg-white border border-line rounded p-6">
            <h3 className="font-display text-[17px] mb-4">Payment</h3>
            <p className="text-[14px] text-ink-600">{order.payment}</p>
          </div>
          <div className="bg-white border border-line rounded p-6">
            <h3 className="font-display text-[17px] mb-3">Update status</h3>
            <select defaultValue={order.status} className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[13.5px] outline-none focus:border-brand bg-white">
              {['Processing', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button className="w-full mt-3 bg-brand text-white font-semibold text-[13.5px] py-2.5 rounded-sm hover:bg-brand-700 transition-colors">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
