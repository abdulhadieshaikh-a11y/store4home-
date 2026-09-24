-- store4home: persistent orders, payments, admin notifications, email log, store settings.
--
-- Purely additive: this migration only CREATEs new objects. It never drops, truncates
-- or alters existing tables. It uses plain CREATE TABLE (not IF NOT EXISTS) on purpose:
-- if a table with the same name already exists in your project, the whole migration
-- fails inside its transaction and nothing is changed, instead of silently running
-- against a table with a different shape.
--
-- Access model: the Next.js server connects with the database connection string
-- (server-side only). Row Level Security is enabled with NO policies, so the Supabase
-- public API (anon / authenticated keys) cannot read or write these tables.

begin;

create sequence order_number_seq start with 10500;

create table orders (
  id                 uuid primary key default gen_random_uuid(),
  order_number       text not null unique default ('S4H-' || nextval('order_number_seq')::text),
  idempotency_key    uuid not null unique,
  tracking_token     text not null default replace(gen_random_uuid()::text, '-', ''),

  customer_name      text not null,
  customer_email     text not null,
  customer_phone     text not null,
  shipping_address   text not null,
  shipping_city      text not null,
  shipping_postal_code text not null,
  customer_notes     text,

  currency           text not null default 'PKR',
  subtotal           numeric(12, 2) not null check (subtotal >= 0),
  shipping_fee       numeric(12, 2) not null check (shipping_fee >= 0),
  total              numeric(12, 2) not null check (total >= 0),

  -- Order (fulfilment) status and payment status are deliberately separate fields.
  status             text not null default 'Processing'
                     check (status in ('Processing', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled')),
  payment_method     text not null
                     check (payment_method in ('cod', 'bank_transfer', 'easypaisa', 'card')),
  payment_status     text not null default 'pending'
                     check (payment_status in ('pending', 'paid', 'failed', 'refunded', 'cancelled')),
  -- Transaction ID / reference the customer gives for a manual transfer (bank / Easypaisa).
  payment_reference  text,
  -- Online gateway fields, populated only by server-side verification (webhook).
  payment_gateway    text,
  gateway_reference  text,
  paid_at            timestamptz,

  admin_notes        text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index orders_created_at_idx on orders (created_at desc);
create index orders_status_idx on orders (status);
create index orders_customer_email_idx on orders (lower(customer_email));

create table order_items (
  id          bigserial primary key,
  order_id    uuid not null references orders (id) on delete cascade,
  product_id  text not null,
  name        text not null,
  color       text,
  image       text,
  unit_price  numeric(12, 2) not null check (unit_price >= 0),
  quantity    integer not null check (quantity > 0),
  line_total  numeric(12, 2) not null check (line_total >= 0)
);

create index order_items_order_id_idx on order_items (order_id);

-- Audit trail for order status and payment status changes.
create table order_status_history (
  id          bigserial primary key,
  order_id    uuid not null references orders (id) on delete cascade,
  field       text not null check (field in ('status', 'payment_status')),
  from_value  text,
  to_value    text not null,
  note        text,
  changed_by  text not null check (changed_by in ('customer', 'admin', 'system', 'gateway')),
  created_at  timestamptz not null default now()
);

create index order_status_history_order_id_idx on order_status_history (order_id, created_at);

create table admin_notifications (
  id          bigserial primary key,
  type        text not null,
  title       text not null,
  message     text not null,
  order_id    uuid references orders (id) on delete cascade,
  read_at     timestamptz,
  created_at  timestamptz not null default now()
);

create index admin_notifications_created_at_idx on admin_notifications (created_at desc);
create index admin_notifications_unread_idx on admin_notifications (created_at desc) where read_at is null;

-- One row per logical email. dedupe_key is unique so the same email
-- (e.g. "order 123 / status Shipped / customer") is never sent twice.
create table email_log (
  id                  bigserial primary key,
  dedupe_key          text not null unique,
  order_id            uuid references orders (id) on delete cascade,
  kind                text not null,
  meta                jsonb not null default '{}'::jsonb,
  recipient           text not null,
  subject             text not null,
  status              text not null default 'pending' check (status in ('pending', 'sent', 'failed')),
  attempts            integer not null default 0,
  provider_message_id text,
  last_error          text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  sent_at             timestamptz
);

create index email_log_order_id_idx on email_log (order_id);

-- Admin-editable settings (payment instructions, notification email).
create table store_settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table orders               enable row level security;
alter table order_items          enable row level security;
alter table order_status_history enable row level security;
alter table admin_notifications  enable row level security;
alter table email_log            enable row level security;
alter table store_settings       enable row level security;

commit;
