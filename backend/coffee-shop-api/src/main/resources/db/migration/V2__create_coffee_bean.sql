CREATE TABLE IF NOT EXISTS coffee_bean (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  origin VARCHAR(200) NOT NULL,
  roast VARCHAR(20) NOT NULL,
  tasting_notes VARCHAR(400),
  price_cents INT NOT NULL,
  weight_g INT NOT NULL,
  image_url VARCHAR(500),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_coffee_bean_active ON coffee_bean(active);
CREATE INDEX IF NOT EXISTS idx_coffee_bean_roast ON coffee_bean(roast);
CREATE INDEX IF NOT EXISTS idx_coffee_bean_origin ON coffee_bean(origin);
-- Optional seed data
INSERT INTO coffee_bean (name, origin, roast, tasting_notes, price_cents, weight_g, image_url, active)
VALUES
('Ethiopia Yirgacheffe', 'Ethiopia', 'LIGHT', 'floral, citrus, tea-like', 890, 250, null, true),
('Colombia Supremo', 'Colombia', 'MEDIUM', 'caramel, cocoa, balanced', 790, 250, null, true),
('Brazil Santos', 'Brazil', 'DARK', 'chocolate, nutty, heavy body', 750, 250, null, true);
