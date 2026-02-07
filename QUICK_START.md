# ☕ Coffee Hub - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Check

- ✅ Java 21 LTS installed (already confirmed)
- ✅ Node.js 18+ installed
- ✅ PostgreSQL running or Docker available
- ✅ Maven 3.9.11+ (or use mvnw included)

## Step 1: Start the Database

### Option A: Docker (Recommended)

```bash
# From project root
docker-compose up -d

# Verify it's running
docker ps
```

### Option B: Manual PostgreSQL

```sql
-- Connect to PostgreSQL and run:
CREATE DATABASE coffeeshop;
CREATE USER coffeeshop WITH PASSWORD 'coffeeshop';
GRANT ALL PRIVILEGES ON DATABASE coffeeshop TO coffeeshop;
```

## Step 2: Start the Backend API

```bash
cd backend/coffee-shop-api

# Option A: Maven (If installed)
mvn spring-boot:run

# Option B: Maven wrapper (No installation needed)
./mvnw spring-boot:run  # Linux/Mac
mvnw.cmd spring-boot:run # Windows
```

**Wait for the message**: `Started CoffeeShopApiApplication in X.XXX seconds`

✅ **Backend running at**: http://localhost:8080

## Step 3: Start the Frontend

```bash
# In a new terminal
cd frontend/coffee-shop-ui

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

**Wait for the message**: `✔ Compiled successfully. ✔ Build complete.`

✅ **Frontend running at**: http://localhost:4200

## Step 4: Open in Browser

1. Open http://localhost:4200 in your browser
2. Click "Start Shopping" or "Sign Up"

## 🔑 Test Credentials

### Already Created Users:

```
Email: test@example.com
Password: password123

Email: customer@example.com
Password: password123
```

### Or Create Your Own:

1. Click "Sign Up" on the navbar
2. Fill in your information
3. Account is created immediately

## 📝 Sample Data

Your database comes pre-loaded with:

- ✅ 20+ coffee products
- ✅ 10+ equipment items
- ✅ 5+ accessories
- ✅ 2 test users

## 🎯 What to Try

### As a Customer:

1. **Browse Products** - Click "Catalog"
2. **Search & Filter** - Use the sidebar filters
3. **Sort Products** - Sort by price or name
4. **Add to Cart** - Click "Add to Cart" on any product
5. **View Cart** - Click cart icon (🛒)
6. **Checkout** - Click "Proceed to Checkout"
7. **Place Order** - Fill shipping info and order
8. **See Success** - Confirmation message appears

### Admin Features:

- Go to `/admin/products` to manage products
- Create, update, delete products
- Manage inventory

## 🔧 Useful Commands

### Backend

```bash
# Build project
mvn clean install

# Run tests
mvn test

# View dependencies
mvn dependency:tree

# Clean build directory
mvn clean
```

### Frontend

```bash
# Build for production
npm run build

# Run tests
npm test

# Format code
npm run prettier

# Output in dist/coffee-shop-ui/
```

## 🐛 Troubleshooting

### "Connection refused" error

```
Problem: Database not running
Solution: docker-compose up -d
          OR check PostgreSQL is running
```

### "Port 8080 already in use"

```
Problem: Another app using port 8080
Solution: Kill process or change port in:
          backend/src/main/resources/application.properties
          Change: server.port=8080 to 8081 (etc)
```

### "Port 4200 already in use"

```
Problem: Another app using port 4200
Solution: ng serve --port 4201
```

### npm packages not found

```
Solution: npm cache clean --force
          rm -rf node_modules package-lock.json
          npm install
```

### Build errors after changes

```
Backend: mvn clean install
Frontend: rm -rf dist && npm run build
```

## 📱 Test Different Screen Sizes

### In Chrome DevTools:

1. Press F12 or Right-click → Inspect
2. Click responsive design mode (Ctrl+Shift+M)
3. Test at different breakpoints:
   - Desktop: 1920px
   - Tablet: 768px
   - Mobile: 375px

## 🔍 API Testing

### Test Backend API with cURL:

```bash
# Get all products
curl http://localhost:8080/api/products

# Register user
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get user cart
curl http://localhost:8080/api/cart/1

# Add to cart
curl -X POST http://localhost:8080/api/cart/1/add \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 1
  }'
```

### Or use Postman:

1. Download Postman
2. Import requests
3. Test each endpoint

## 📊 Database Inspection

### Connect to database directly:

```bash
# Using psql
psql -h localhost -p 5433 -U coffeeshop -d coffeeshop

# View tables
\dt

# View products
SELECT * FROM product LIMIT 5;

# View users
SELECT * FROM app_user;

# View cart items
SELECT * FROM cart_item;
```

## 🚀 Production Build

### Frontend Production Build:

```bash
cd frontend/coffee-shop-ui
npm run build
# Output: dist/coffee-shop-ui/
# Deploy to: Nginx, Apache, Firebase, Vercel, etc.
```

### Backend Production Build:

```bash
cd backend/coffee-shop-api
mvn clean package -DskipTests
# Output: target/coffee-shop-api-0.0.1-SNAPSHOT.jar
# Run: java -jar target/coffee-shop-api-*.jar
```

## 📚 Documentation

| Document            | Purpose                     |
| ------------------- | --------------------------- |
| `README.md`         | Main project documentation  |
| `BUILD_SUMMARY.md`  | What was built and features |
| `FILE_STRUCTURE.md` | Complete file organization  |
| `QUICK_START.md`    | This quick start guide      |

## 🎉 You're Ready!

Your Coffee Hub e-commerce application is ready to use!

### Next Steps:

1. ✅ Start the database
2. ✅ Start the backend
3. ✅ Start the frontend
4. ✅ Open http://localhost:4200
5. ✅ Test the application
6. ✅ Customize and enhance

### Want to Customize?

- Change colors in `app.css` and component CSS files
- Add new products via admin panel
- Modify product catalog in database
- Add more features as needed

## 💡 Pro Tips

1. **Hot Reload**: Frontend automatically reloads on file changes
2. **Backend Changes**: Need to restart (`mvn spring-boot:run`)
3. **Clear Cache**: Use Ctrl+Shift+Delete in browser
4. **Check Console**: Browser DevTools shows errors
5. **Network Tab**: See API calls in DevTools Network tab

## 🆘 Need Help?

1. Check troubleshooting section above
2. Review documentation files
3. Check Java/Spring Boot logs
4. Check browser console (F12)
5. Check that ports 8080, 4200, 5433 are free

## 🎊 Enjoy Your Coffee Shop!

Happy selling! ☕

---

**Questions?** Check the full [README.md](README.md) for comprehensive documentation.
