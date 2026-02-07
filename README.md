# ☕ Coffee Hub E-commerce Application

A modern, full-stack e-commerce coffee shop built with:

- **Backend**: Spring Boot 4.0.2, Java 21, PostgreSQL, Flyway
- **Frontend**: Angular 21, TypeScript, Standalone Components
- **Features**: User authentication, shopping cart, order management, admin panel

## Project Structure

```
coffee-shop/
├── backend/
│   └── coffee-shop-api/          # Spring Boot REST API
│       ├── src/main/java/        # Java source code
│       │   └── com/coffeeshop/coffee_shop_api/
│       │       ├── beans/        # Coffee beans management
│       │       ├── products/     # Products management
│       │       ├── orders/       # Orders management
│       │       ├── users/        # User authentication
│       │       └── cart/         # Shopping cart
│       ├── src/main/resources/
│       │   └── db/migration/     # Flyway database migrations
│       └── pom.xml               # Maven configuration
├── frontend/
│   └── coffee-shop-ui/           # Angular application
│       └── src/app/
│           ├── pages/            # Page components
│           │   ├── landing/      # Landing page
│           │   ├── catalog/      # Product catalog
│           │   ├── shopping-cart/# Shopping cart
│           │   ├── checkout/     # Checkout page
│           │   └── auth/         # Login/Register
│           ├── services/         # HTTP services
│           ├── navbar/           # Navigation bar
│           └── admin-products/   # Admin panel
└── docker-compose.yml            # Database configuration

```

## Prerequisites

- **Java 21 LTS** - Already configured in the project
- **Node.js 18+** - For Angular frontend
- **PostgreSQL 13+** - Database (or use Docker)
- **Maven 3.9.11+** - Build tool

## Quick Start

### 1. Database Setup

#### Option A: Using Docker Compose

```bash
docker-compose up -d
```

#### Option B: Manual PostgreSQL Setup

```sql
CREATE DATABASE coffeeshop;
CREATE USER coffeeshop WITH PASSWORD 'coffeeshop';
GRANT ALL PRIVILEGES ON DATABASE coffeeshop TO coffeeshop;
```

### 2. Backend Setup & Run

```bash
cd backend/coffee-shop-api

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The API will be available at: **http://localhost:8080**

### 3. Frontend Setup & Run

```bash
cd frontend/coffee-shop-ui

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at: **http://localhost:4200**

## API Endpoints

### Authentication

- `POST /api/users/register` - Create new account
- `POST /api/users/login` - Login
- `GET /api/users/{id}` - Get user details
- `PUT /api/users/{id}` - Update user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

### Shopping Cart

- `GET /api/cart/{userId}` - Get user's cart
- `POST /api/cart/{userId}/add` - Add item to cart
- `PUT /api/cart/{userId}/item/{cartItemId}` - Update cart item
- `DELETE /api/cart/{userId}/item/{cartItemId}` - Remove from cart
- `DELETE /api/cart/{userId}/clear` - Clear cart

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders/{id}` - Get order details
- `GET /api/orders` - Get all orders

## Sample Data

The database includes pre-populated coffee products. To add more, use the admin panel or direct API calls.

### Sample Product

```json
{
  "name": "Ethiopia Yirgacheffe",
  "description": "Floral, citrus, and tea-like notes. Perfect for pour-over.",
  "priceCents": 890,
  "imageUrl": "https://example.com/image.jpg"
}
```

### Test User Credentials

```
Email: test@example.com
Password: password123
```

Create your own account via the registration page.

## Features

### For Customers

- ✅ Browse coffee products with filters
- ✅ Search and sort functionality
- ✅ Shopping cart management
- ✅ User authentication & profiles
- ✅ Secure checkout process
- ✅ Order history
- ✅ Responsive design

### For Admins

- ✅ Product management (create, update, delete)
- ✅ Inventory management
- ✅ Order tracking
- ✅ User management

## Technology Stack

### Backend

- **Spring Boot 4.0.2** - Framework
- **Java 21** - Runtime
- **Spring Data JPA** - Database ORM
- **Flyway** - Database migrations
- **PostgreSQL** - Database
- **Maven** - Build tool

### Frontend

- **Angular 21** - Framework
- **TypeScript** - Language
- **RxJS** - Reactive library
- **Bootstrap/Custom CSS** - Styling
- **Angular Forms** - Form handling
- **Angular Router** - Routing

## Building & Deployment

### Backend Docker Build

```bash
cd backend/coffee-shop-api
mvn clean package
docker build -t coffee-shop-api .
docker run -p 8080:8080 coffee-shop-api
```

### Frontend Production Build

```bash
cd frontend/coffee-shop-ui
npm run build
# Output in dist/
```

## Database Migrations

Flyway automatically runs migrations on startup. New migrations:

1. Create a SQL file: `V{number}__{description}.sql`
2. Place in: `src/main/resources/db/migration/`
3. Flyway runs automatically on boot

## Security Notes

⚠️ **Important for Production:**

- Enable Spring Security for authentication
- Use JWT tokens instead of session storage
- Implement password hashing (BCrypt)
- Add HTTPS/TLS
- Use environment variables for secrets
- Implement rate limiting
- Add CSRF protection

## Troubleshooting

### Database Connection Failed

```
Check:
- PostgreSQL is running
- Database exists: coffeeshop
- Username/password correct in application.properties
- Port 5433 is accessible (or configured port)
```

### CORS Errors

- CORS is enabled for `*` in development
- Configure specific origins in production:
  ```java
  @CrossOrigin(origins = "https://yourdomain.com")
  ```

### Port Already in Use

```bash
# Backend (change port in application.properties)
# Frontend (specify port)
ng serve --port 4201
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## License

MIT License - Feel free to use for personal or commercial projects

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review API documentation
3. Check Angular/Spring Boot docs
4. Create an issue with details

---

**Happy Coffee Shopping! ☕**
