export default function StatusBadge({ status }) {
  const styles = {
    Processing: 'bg-gold-50 text-gold-700',
    Confirmed: 'bg-brand-50 text-brand',
    Shipped: 'bg-brand-50 text-brand',
    'Out for Delivery': 'bg-brand-50 text-brand',
    Delivered: 'bg-brand text-white',
    Cancelled: 'bg-ink-100 text-ink-600',
  };
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-[12px] font-semibold ${styles[status] || 'bg-ink-100 text-ink-600'}`}>
      {status}
    </span>
  );
}
