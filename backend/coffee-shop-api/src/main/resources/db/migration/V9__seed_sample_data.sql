-- Insert sample products for the coffee shop
-- Insert sample products for the coffee shop
INSERT INTO product (name, description, price_cents, image_url, active, created_at) VALUES
('Ethiopia Yirgacheffe', 'Floral, citrus, and tea-like notes. Perfect for pour-over brewing.', 890, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1', true, NOW()),
('Colombia Supremo', 'Caramel, cocoa, and balanced flavors. Great for espresso.', 790, 'https://images.unsplash.com/photo-1506086679524-a1f1cd1b5b3e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2', true, NOW()),
('Brazil Santos', 'Chocolate, nutty, and heavy body. Excellent for cold brew.', 750, 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3', true, NOW()),
('Kenya AA', 'Bright, wine-like acidity with blackberry notes. Best drip coffee.', 950, 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4', true, NOW()),
('Indonesia Sumatra', 'Full body with earthy and herbal notes. Ideal for French press.', 820, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5', true, NOW()),
('Peru Organic', 'Balanced with chocolate and spicy notes. Fair trade certified.', 880, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6', true, NOW()),
('Costa Rica Tarrazú', 'Smooth, sweet with chocolate and citrus undertones.', 910, 'https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7', true, NOW()),
('Vietnam Robusta', 'Strong, bold with earthiness. Perfect for espresso blends.', 650, 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=8', true, NOW()),
-- Coffee Equipment
('French Press 34oz', 'Classic stainless steel French press. Makes 4 cups.', 2995, 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=9', true, NOW()),
('Pour Over Dripper', 'Ceramic pour over cone. Fits any cup.', 1299, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=10', true, NOW()),
('Burr Grinder', 'Electric burr grinder with 15 grind settings.', 4999, 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=11', true, NOW()),
('Coffee Scale', 'Digital coffee scale with timer. Perfect for precise brewing.', 2299, 'https://images.unsplash.com/photo-1517263904808-5dc5a1c0f17f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=12', true, NOW()),
('Espresso Machine', 'Semi-automatic espresso machine with steam wand.', 34999, 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=13', true, NOW()),
-- Accessories
('Coffee Filters Pack (100pcs)', 'White paper filters for pour over. 100 count.', 399, 'https://images.unsplash.com/photo-1509460913899-84d8d8b0f3a8?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=14', true, NOW()),
('Coffee Scoop', 'Stainless steel measuring scoop. 1 tbsp capacity.', 599, 'https://images.unsplash.com/photo-1523475496153-3d6ccf9b98f1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=15', true, NOW()),
('Coffee Mug - Ceramic', 'Beautiful ceramic coffee mug. 12oz capacity.', 1299, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=16', true, NOW()),
('Travel Coffee Tumbler', 'Vacuum insulated tumbler. Keeps coffee hot for 6 hours.', 1899, 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=17', true, NOW()),
('Coffee Canister', 'Airtight stainless steel canister for bean storage.', 1599, 'https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=18', true, NOW());
-- Insert test user
INSERT INTO app_user (email, password, first_name, last_name, phone, address, city, zip_code, active, created_at, updated_at) VALUES
('test@example.com', 'password123', 'John', 'Doe', '555-0123', '123 Main St', 'New York', '10001', true, NOW(), NOW()),
('customer@example.com', 'password123', 'Jane', 'Smith', '555-0456', '456 Oak Ave', 'Los Angeles', '90001', true, NOW(), NOW());
