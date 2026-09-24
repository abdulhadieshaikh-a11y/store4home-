// Manual payment instructions (Bank Transfer / Easypaisa), as configured by the store admin.
export default function PaymentInstructions({ instructions, amount, orderNumber }) {
  if (!instructions) return null;
  return (
    <div className="text-[14px] text-ink-600 leading-relaxed">
      <p className="font-semibold text-ink mb-3">{instructions.title}</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 mb-3">
        {instructions.lines.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-ink-400">{label}</dt>
            <dd className="font-medium text-ink break-all">{value}</dd>
          </div>
        ))}
      </dl>
      <p>
        Please transfer <strong className="text-ink">{amount}</strong>
        {orderNumber ? (
          <>
            {' '}and use your order number <strong className="text-ink">{orderNumber}</strong> as the payment reference.
          </>
        ) : (
          ' and use your order number (shown after you place the order) as the payment reference.'
        )}{' '}
        Your payment will show as pending until we confirm it.
      </p>
      {instructions.note && <p className="mt-2 whitespace-pre-line">{instructions.note}</p>}
    </div>
  );
}
