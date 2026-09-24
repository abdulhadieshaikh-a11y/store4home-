# store4home

A modern, full-stack e-commerce storefront and admin dashboard built with **Next.js 14 (App Router)**, **React**, and **Tailwind CSS**.

## Features

**Storefront**
- Home page with hero, category grid, deals and new arrivals
- Shop page with category filters, price filter, search and sorting
- Product detail pages with image gallery, color variants and related products
- Cart (slide-out drawer + full page) with quantity controls
- Full checkout flow: shipping details -> payment method (Card / Cash on Delivery / Mobile Wallet) -> confirmation
- Order tracking page with a searchable status timeline
- Login, register and account pages

**Admin dashboard** (`/admin`)
- Overview with revenue/orders/customers/products stats, a weekly sales chart and recent orders
- Product management: list, add and edit (with image preview)
- Order management: list with filters, and a full order detail/timeline view
- Customer directory
- Category management
- Store settings (shipping, currency, notifications)

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The admin dashboard is at [http://localhost:3000/admin](http://localhost:3000/admin).

To build for production:

```bash
npm run build
npm run start
```

## Orders, payments, emails and admin notifications

Orders are stored in your **Supabase Postgres** database. The Next.js server connects with a
server-only connection string; nothing database- or email-related is exposed to the browser.

### Setup

1. **Apply the migration** in `supabase/migrations/` to your existing Supabase project
   (Supabase dashboard -> SQL Editor -> paste the file -> Run, or `supabase db push`).
   It only creates new tables (`orders`, `order_items`, `order_status_history`,
   `admin_notifications`, `email_log`, `store_settings`) with Row Level Security enabled and
   no public policies. It never modifies existing tables; if a table with the same name
   already exists it aborts without changing anything.
2. **Set the environment variables** from `.env.example` (locally in `.env.local`, in production
   in Vercel -> Project -> Settings -> Environment Variables).
3. Sign in at `/admin/login` with `ADMIN_PASSWORD`, open **Settings -> Payments & notifications**,
   and fill in your bank / Easypaisa details and the store-owner email.

### How it works

- **Checkout** (`POST /api/orders`): validates input and recalculates prices on the server,
  then writes the order, items, audit history and an admin notification in one transaction.
  Each checkout sends an idempotency key, so double clicks, refreshes and network retries
  return the original order instead of creating a duplicate.
- **Payment methods**: Cash on Delivery is always available. Bank Transfer and Easypaisa are
  offered only once configured in admin settings; their orders start with payment status
  *Pending* until an admin marks them *Paid*. Card payments are hidden until an online gateway
  adapter is added (`lib/payments/gateways.js`); card orders can only be marked paid by a
  signature-verified webhook at `/api/payments/webhook/<provider>`.
- **Order status** (Processing -> Confirmed -> Shipped -> Out for Delivery -> Delivered, or
  Cancelled) and **payment status** (Pending, Paid, Failed, Refunded, Cancelled) are separate.
  Every change is recorded in `order_status_history`.
- **Emails** (Resend): customer confirmation, store-owner new-order alert, customer status
  updates (Confirmed / Shipped / Out for Delivery / Delivered / Cancelled) and payment updates
  (Paid / Failed / Refunded). Every email is logged in `email_log` and sent at most once per
  order and status. A failed email never affects the order; failures show on the admin order
  page with a **Retry** button.
- **Admin notifications**: new orders create a persistent notification shown in the dashboard
  bell (unread count, mark as read, mark all as read). The bell refreshes every 20 seconds.
- **Order tracking** (`/track-order`) needs the order number plus the checkout email, or the
  private link from the confirmation page / email.
- **Admin access**: `/admin` and `/api/admin/*` require signing in with `ADMIN_PASSWORD`
  (signed, HttpOnly session cookie, 12 hours). If the admin variables are not set, the admin
  area stays locked.

## Project structure

```
app/
  (site)/            storefront routes (home, shop, product, cart, checkout, account, etc.)
  admin/              admin dashboard routes
  layout.js           root layout (fonts, cart provider)
components/           shared UI components
components/admin/     admin-only UI components
context/               CartContext, CheckoutContext
data/                  mock data (products, categories, orders, customers)
```
