CREATE TABLE bean_order (
  id BIGSERIAL PRIMARY KEY,
  total_cents INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE bean_order_item (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES bean_order(id) ON DELETE CASCADE,
  bean_id BIGINT NOT NULL REFERENCES coffee_bean(id),
  qty INT NOT NULL,
  unit_price_cents INT NOT NULL
);
CREATE INDEX idx_bean_order_created_at ON bean_order(created_at);
CREATE INDEX idx_bean_order_item_order_id ON bean_order_item(order_id);
CREATE INDEX idx_bean_order_item_bean_id ON bean_order_item(bean_id);
