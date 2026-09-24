export const USD_TO_PKR = 280;

export function toPKR(amount) {
  return amount * USD_TO_PKR;
}

export function formatPKR(amount) {
  return `Rs ${Math.round(toPKR(amount)).toLocaleString('en-PK')}`;
}

// Format an amount that is already in PKR (e.g. stored order totals).
export function formatRs(amount) {
  return `Rs ${Math.round(Number(amount) || 0).toLocaleString('en-PK')}`;
}
