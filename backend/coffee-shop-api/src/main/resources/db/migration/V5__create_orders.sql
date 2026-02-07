create table if not exists customer_order (
  id bigserial primary key,
  status varchar(20) not null default 'PLACED',
  total_cents int not null,
  created_at timestamptz not null default now()
);
create table if not exists customer_order_item (
  id bigserial primary key,
  order_id bigint not null references customer_order(id) on delete cascade,
  product_id bigint not null references product(id),
  qty int not null,
  unit_price_cents int not null
);
