export const orderStatuses = ['Processing', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

export const orders = [
  {
    id: 'S4H-10482',
    date: '2026-09-14',
    customer: 'Ayesha Raza',
    email: 'ayesha.raza@example.com',
    total: 247.0,
    status: 'Delivered',
    payment: 'Card',
    items: [
      { id: 'p-101', name: 'Amber Ceramic Table Lamp', qty: 1, price: 68 },
      { id: 'p-104', name: 'Linden Linen Duvet Set', qty: 1, price: 96 },
      { id: 'p-403', name: 'Pour-Over Coffee Set', qty: 1, price: 46 },
    ],
    address: '14 Clifton Residency, Karachi, Pakistan',
    tracking: [
      { step: 'Order placed', date: '2026-09-14', done: true },
      { step: 'Confirmed', date: '2026-09-14', done: true },
      { step: 'Shipped', date: '2026-09-15', done: true },
      { step: 'Out for delivery', date: '2026-09-17', done: true },
      { step: 'Delivered', date: '2026-09-17', done: true },
    ],
  },
  {
    id: 'S4H-10483',
    date: '2026-09-16',
    customer: 'Bilal Ahmed',
    email: 'bilal.ahmed@example.com',
    total: 179.0,
    status: 'Shipped',
    payment: 'Cash on Delivery',
    items: [{ id: 'p-201', name: 'Aether Wireless Headphones', qty: 1, price: 179 }],
    address: '22 Model Town, Lahore, Pakistan',
    tracking: [
      { step: 'Order placed', date: '2026-09-16', done: true },
      { step: 'Confirmed', date: '2026-09-16', done: true },
      { step: 'Shipped', date: '2026-09-18', done: true },
      { step: 'Out for delivery', date: '', done: false },
      { step: 'Delivered', date: '', done: false },
    ],
  },
  {
    id: 'S4H-10484',
    date: '2026-09-18',
    customer: 'Sana Malik',
    email: 'sana.malik@example.com',
    total: 118.0,
    status: 'Processing',
    payment: 'Wallet',
    items: [{ id: 'p-304', name: 'Trail Runner Sneakers', qty: 1, price: 118 }],
    address: '7 Gulberg III, Lahore, Pakistan',
    tracking: [
      { step: 'Order placed', date: '2026-09-18', done: true },
      { step: 'Confirmed', date: '', done: false },
      { step: 'Shipped', date: '', done: false },
      { step: 'Out for delivery', date: '', done: false },
      { step: 'Delivered', date: '', done: false },
    ],
  },
  {
    id: 'S4H-10485',
    date: '2026-09-19',
    customer: 'Usman Tariq',
    email: 'usman.tariq@example.com',
    total: 353.0,
    status: 'Confirmed',
    payment: 'Card',
    items: [
      { id: 'p-102', name: 'Belmont Boucle Armchair', qty: 1, price: 349 },
    ],
    address: '3 DHA Phase 5, Karachi, Pakistan',
    tracking: [
      { step: 'Order placed', date: '2026-09-19', done: true },
      { step: 'Confirmed', date: '2026-09-19', done: true },
      { step: 'Shipped', date: '', done: false },
      { step: 'Out for delivery', date: '', done: false },
      { step: 'Delivered', date: '', done: false },
    ],
  },
  {
    id: 'S4H-10486',
    date: '2026-09-12',
    customer: 'Hina Farooq',
    email: 'hina.farooq@example.com',
    total: 149.0,
    status: 'Cancelled',
    payment: 'Card',
    items: [{ id: 'p-401', name: 'Enamel Dutch Oven, 5.5qt', qty: 1, price: 149 }],
    address: '18 F-10 Markaz, Islamabad, Pakistan',
    tracking: [
      { step: 'Order placed', date: '2026-09-12', done: true },
      { step: 'Confirmed', date: '2026-09-12', done: true },
      { step: 'Cancelled', date: '2026-09-13', done: true },
    ],
  },
];

export function getOrder(id) {
  return orders.find((o) => o.id.toLowerCase() === String(id).toLowerCase());
}
