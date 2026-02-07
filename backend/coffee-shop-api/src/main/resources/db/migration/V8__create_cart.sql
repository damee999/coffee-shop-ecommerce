CREATE TABLE cart_item (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  quantity INT NOT NULL,
  UNIQUE(user_id, product_id)
);
CREATE INDEX idx_cart_user ON cart_item(user_id);
