CREATE TABLE app_user (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  address VARCHAR(300),
  city VARCHAR(100),
  zip_code VARCHAR(20),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);
CREATE INDEX idx_user_email ON app_user(email);
CREATE INDEX idx_user_active ON app_user(active);
