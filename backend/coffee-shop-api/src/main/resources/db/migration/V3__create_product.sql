CREATE TABLE product (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    price_cents INTEGER NOT NULL,
    image_url VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX idx_product_active ON product(active);
