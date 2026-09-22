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

## Order confirmation emails

Order confirmation emails are sent through [Resend](https://resend.com). Copy `.env.example` to `.env.local`, add a Resend API key, and set `RESEND_FROM_EMAIL` to a sender address from a verified Resend domain:

```bash
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=Store4Home <orders@your-verified-domain.com>
```

Without these values, orders can still be placed, but the confirmation page will report that the email could not be sent. For local testing, Resend's `onboarding@resend.dev` sender only delivers to the email address belonging to the Resend account.

## Notes on data

This project ships with realistic mock data (`/data/*.js`) for products, categories, orders and customers, and all product images are served from Unsplash. There is no real backend or database wired up yet:

- The cart persists for the current browser tab (sessionStorage) and clears after checkout.
- Checkout and the admin dashboard's "save" actions demonstrate the full UI flow but don't persist changes — hook them up to your own API/database (e.g. via Next.js Route Handlers, Prisma, or a headless commerce backend) to make them permanent.
- No real payment processor is connected; the payment step is a UI-only selection between Card, Cash on Delivery and Mobile Wallet.
- Prices are displayed in Pakistani Rupees (PKR) using the fixed demo conversion rate in `lib/currency.js`; replace this with live PKR product data before production.

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
