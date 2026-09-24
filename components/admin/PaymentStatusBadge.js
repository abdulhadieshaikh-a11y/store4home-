import { paymentStatusLabel } from '@/lib/orders';

const styles = {
  pending: 'bg-gold-50 text-gold-700',
  paid: 'bg-brand text-white',
  failed: 'bg-ink-100 text-ink-600 ring-1 ring-gold-400',
  refunded: 'bg-ink-100 text-ink-600',
  cancelled: 'bg-ink-100 text-ink-600',
};

export default function PaymentStatusBadge({ status }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-[12px] font-semibold ${styles[status] || 'bg-ink-100 text-ink-600'}`}>
      {paymentStatusLabel(status)}
    </span>
  );
}
