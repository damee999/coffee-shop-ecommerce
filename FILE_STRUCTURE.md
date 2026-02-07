# Coffee Shop Application - File Structure Guide

## Complete Project Structure

```
coffee-shop/                                          # Project root
│
├── README.md                                         # Main documentation
├── BUILD_SUMMARY.md                                  # Build summary (this file)
├── docker-compose.yml                               # Docker configuration
│
├── backend/
│   └── coffee-shop-api/                             # Spring Boot REST API
│       ├── pom.xml                                  # Maven configuration
│       ├── mvnw                                     # Maven wrapper (Unix)
│       ├── mvnw.cmd                                 # Maven wrapper (Windows)
│       ├── HELP.md                                  # Maven help
│       │
│       └── src/main/
│           ├── java/com/coffeeshop/coffee_shop_api/
│           │   │
│           │   ├── CoffeeShopApiApplication.java    # Main Spring Boot application
│           │   ├── HealthController.java            # Health check endpoint
│           │   │
│           │   ├── beans/                           # Coffee beans management
│           │   │   ├── CoffeeBean.java              # JPA entity
│           │   │   ├── CoffeeBeanRepository.java    # Database repository
│           │   │   ├── CoffeeBeanService.java       # Business logic
│           │   │   ├── CoffeeBeanController.java    # REST controller
│           │   │   ├── CoffeeBeanDto.java           # Data transfer object
│           │   │   ├── CreateCoffeeBeanRequest.java # Request DTO
│           │   │   └── UpdateCoffeeBeanRequest.java # Update DTO
│           │   │
│           │   ├── products/                        # Products management
│           │   │   ├── Product.java                 # JPA entity
│           │   │   ├── ProductRepository.java       # Database repository
│           │   │   ├── ProductService.java          # Business logic
│           │   │   ├── ProductController.java       # REST controller
│           │   │   ├── ProductDto.java              # Data transfer object
│           │   │   ├── CreateProductRequest.java    # Request DTO
│           │   │   └── UpdateProductRequest.java    # Update DTO
│           │   │
│           │   ├── orders/                          # Orders management
│           │   │   ├── CustomerOrder.java           # JPA entity
│           │   │   ├── CustomerOrderItem.java       # Order item entity
│           │   │   ├── CustomerOrderRepository.java # Repository
│           │   │   ├── OrderService.java            # Business logic
│           │   │   ├── OrderController.java         # REST controller
│           │   │   ├── CreateOrderRequest.java      # Request DTO
│           │   │   └── CreateOrderResponse.java     # Response DTO
│           │   │
│           │   ├── users/                           # NEW: User authentication
│           │   │   ├── User.java                    # User entity
│           │   │   ├── UserRepository.java          # Database repository
│           │   │   ├── UserService.java             # Authentication logic
│           │   │   ├── UserController.java          # REST controller
│           │   │   ├── UserDto.java                 # User DTO
│           │   │   ├── RegisterRequest.java         # Registration request
│           │   │   ├── LoginRequest.java            # Login request
│           │   │   └── AuthResponse.java            # Auth response
│           │   │
│           │   ├── cart/                            # NEW: Shopping cart
│           │   │   ├── CartItem.java                # Cart item entity
│           │   │   ├── CartItemRepository.java      # Repository
│           │   │   ├── CartService.java             # Cart logic
│           │   │   ├── CartController.java          # REST controller
│           │   │   ├── CartDto.java                 # Cart DTO
│           │   │   └── CartItemDto.java             # Cart item DTO
│           │   │
│           │   └── common/                          # Shared utilities
│           │       └── (Common utilities)
│           │
│           └── resources/
│               ├── application.properties           # Spring Boot config
│               └── db/migration/                    # Flyway migrations
│                   ├── V1__init.sql                 # Initial schema
│                   ├── V2__create_coffee_bean.sql   # Coffee beans table
│                   ├── V3__create_product.sql       # Products table
│                   ├── V4__create_product_table.sql # Product refinement
│                   ├── V5__create_orders.sql        # Orders table
│                   ├── V6__create_bean_orders.sql   # Bean orders
│                   ├── V7__create_users.sql         # NEW: Users table
│                   ├── V8__create_cart.sql          # NEW: Cart table
│                   └── V9__seed_sample_data.sql     # NEW: Sample data
│
├── frontend/
│   └── coffee-shop-ui/                              # Angular application
│       ├── package.json                             # Node dependencies
│       ├── tsconfig.json                            # TypeScript config
│       ├── tsconfig.app.json                        # App TypeScript config
│       ├── tsconfig.spec.json                       # Test config
│       ├── angular.json                             # Angular CLI config
│       ├── proxy.conf.json                          # Development proxy
│       ├── README.md                                # Frontend README
│       │
│       └── src/
│           ├── index.html                           # HTML entry
│           ├── main.ts                              # Bootstrap
│           ├── styles.css                           # Global styles
│           │
│           └── app/
│               │
│               ├── app.ts                           # Root component
│               ├── app.html                         # Root template
│               ├── app.css                          # Global styles (updated)
│               ├── app.config.ts                    # App configuration
│               ├── app.routes.ts                    # Routing (updated)
│               │
│               ├── navbar/                          # Navigation bar
│               │   ├── navbar.ts                    # Component (updated)
│               │   ├── navbar.html                  # Template (updated)
│               │   └── navbar.css                   # Styles (updated)
│               │
│               ├── services/                        # HTTP services
│               │   ├── auth.service.ts              # NEW: Authentication
│               │   ├── cart.service.ts              # NEW: Shopping cart
│               │   ├── product.service.ts           # NEW: Products
│               │   ├── order.service.ts             # NEW: Orders
│               │   └── beans.service.ts             # Beans service
│               │
│               ├── pages/                           # Page components
│               │   │
│               │   ├── landing/                     # NEW: Landing page
│               │   │   ├── landing.ts               # Component
│               │   │   ├── landing.html             # Template
│               │   │   └── landing.css              # Styles
│               │   │
│               │   ├── catalog/                     # NEW: Product catalog
│               │   │   ├── product-catalog.ts       # Component
│               │   │   ├── product-catalog.html     # Template
│               │   │   └── product-catalog.css      # Styles
│               │   │
│               │   ├── shopping-cart/               # NEW: Shopping cart
│               │   │   ├── shopping-cart.ts         # Component
│               │   │   ├── shopping-cart.html       # Template
│               │   │   └── shopping-cart.css        # Styles
│               │   │
│               │   ├── checkout/                    # NEW: Checkout
│               │   │   ├── checkout.ts              # Component
│               │   │   ├── checkout.html            # Template
│               │   │   └── checkout.css             # Styles
│               │   │
│               │   ├── auth/                        # NEW: Authentication
│               │   │   ├── login.ts                 # Login component
│               │   │   ├── login.html               # Login template
│               │   │   ├── register.ts              # Register component
│               │   │   ├── register.html            # Register template
│               │   │   └── auth.css                 # Auth styles
│               │   │
│               │   ├── beans/                       # Beans page
│               │   │   ├── beans.ts
│               │   │   ├── beans.html
│               │   │   └── beans.css
│               │   │
│               │   ├── cart/                        # Cart page
│               │   │   ├── cart.ts
│               │   │   └── (templates)
│               │   │
│               │   ├── home/                        # Home page
│               │   │   └── home.ts
│               │   │
│               │   ├── menu/                        # Menu page
│               │   │   ├── menu.ts
│               │   │   ├── menu.html
│               │   │   ├── menu.css
│               │   │   └── menu.spec.ts
│               │   │
│               │   ├── orders/                      # Orders page
│               │   │   └── orders.ts
│               │   │
│               │   └── products/                    # Products page
│               │       └── products.ts
│               │
│               ├── admin-products/                  # Admin panel
│               │   ├── admin-products.ts
│               │   ├── admin-products.html
│               │   ├── admin-products.css
│               │   └── admin-products.spec.ts
│               │
│               ├── bean-orders/                     # Bean orders
│               │   └── bean-orders.ts
│               │
│               ├── cart/                            # Cart utilities
│               │   ├── cart.ts
│               │   └── sellable.ts
│               │
│               └── public/                          # Public assets
│                   └── (Static files)
```

## Key Directories Explained

### Backend Directories

| Directory   | Purpose                          |
| ----------- | -------------------------------- |
| `beans/`    | Coffee bean product management   |
| `products/` | General product management       |
| `orders/`   | Customer order management        |
| `users/`    | User profiles and authentication |
| `cart/`     | Shopping cart functionality      |
| `common/`   | Shared utilities and helpers     |

### Frontend Directories

| Directory         | Purpose                             |
| ----------------- | ----------------------------------- |
| `services/`       | HTTP services for API communication |
| `pages/`          | Full page components                |
| `navbar/`         | Navigation component                |
| `admin-products/` | Admin panel for product management  |

## Component Hierarchy

```
App (Root)
├── Navbar
│   ├── Navigation Links
│   ├── Cart Icon
│   └── Auth Links
│
└── Router Outlet
    ├── Landing (/landing)
    ├── Product Catalog (/catalog)
    ├── Shopping Cart (/cart)
    ├── Checkout (/checkout)
    ├── Login (/login)
    ├── Register (/register)
    └── Admin (/admin/products)
```

## Database Schema

```
Tables:
├── coffee_bean           - Coffee bean products
├── product              - General products
├── customer_order       - Customer orders
├── customer_order_item  - Order line items
├── app_user            - User accounts NEW
├── cart_item           - Shopping cart items NEW
└── (indices for performance)
```

## API Routes Structure

```
/api/
├── /users
│   ├── /register        POST    New account
│   ├── /login          POST    Login
│   └── /{id}           GET/PUT User profile
│
├── /products
│   ├── /              GET     List all
│   ├── /{id}          GET     Get one
│   ├── /              POST    Create
│   ├── /{id}          PUT     Update
│   └── /{id}          DELETE  Delete
│
├── /cart
│   ├── /{userId}              GET     Get cart
│   ├── /{userId}/add          POST    Add item
│   ├── /{userId}/item/{id}    PUT     Update
│   ├── /{userId}/item/{id}    DELETE  Remove
│   └── /{userId}/clear        DELETE  Clear
│
└── /orders
    ├── /              POST    Create order
    ├── /{id}          GET     Get order
    └── /              GET     List orders
```

## File Naming Conventions

### Backend

- Entities: `PascalCase.java` (e.g., `User.java`)
- Services: `PascalCaseService.java` (e.g., `UserService.java`)
- Controllers: `PascalCaseController.java` (e.g., `UserController.java`)
- DTOs: `PascalCaseDto.java` (e.g., `UserDto.java`)
- Requests/Responses: `PascalCaseRequest/Response.java`

### Frontend

- Components: `kebab-case.ts` (e.g., `auth.service.ts`)
- Templates: `kebab-case.html`
- Styles: `kebab-case.css`
- Standalone: True (no NgModules)

## Build Artifacts

```
Backend:
└── target/
    ├── classes/           - Compiled Java classes
    ├── coffee-shop-api-0.0.1-SNAPSHOT.jar - Executable JAR
    └── ...

Frontend:
└── dist/
    └── coffee-shop-ui/    - Production build
        ├── index.html
        ├── main.*.js
        ├── styles.*.css
        └── ...
```

---

**This structure is organized for scalability and maintainability!** 🚀
