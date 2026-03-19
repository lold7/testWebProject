# Project: Online Book Webstore (SE262 Term Project 2/2025)

## Overview

An online bookstore with two main sections:

1. **Webstore** — Customer-facing storefront for browsing, searching, and purchasing books
2. **Back-office** — Admin panel for shop owners to manage products, categories, and view sales

---

## Architecture

```
online-book-webstore/
├── app.js                    # Express entry point
├── package.json
├── .env                      # Environment variables (DB, session secret, port)
├── docker-compose.yml        # MySQL + Node.js containers
├── Dockerfile
├── CLAUDE.md
│
├── config/
│   └── db.js                 # MySQL connection pool (mysql2)
│
├── routes/
│   ├── webstore.js           # Customer-facing routes
│   ├── backoffice.js         # Admin routes (CRUD)
│   └── auth.js               # Login / Register / Logout
│
├── controllers/
│   ├── webstoreController.js
│   ├── backofficeController.js
│   └── authController.js
│
├── middleware/
│   ├── authCustomer.js       # Protect customer routes (must login to add to cart)
│   └── authAdmin.js          # Protect back-office routes
│
├── models/                   # Raw SQL query functions (NO ORM)
│   ├── userModel.js
│   ├── productModel.js
│   ├── categoryModel.js
│   ├── cartModel.js
│   └── orderModel.js
│
├── views/                    # EJS templates
│   ├── partials/
│   │   ├── navbar.ejs        # Nav: All Products, Categories, Cart, Contact
│   │   └── footer.ejs
│   │
│   ├── webstore/
│   │   ├── home.ejs          # Highlighted products + interactive elements
│   │   ├── allProducts.ejs   # All products with pagination (15/page)
│   │   ├── category.ejs      # Products filtered by category
│   │   ├── search.ejs        # Search results
│   │   ├── productDetail.ejs # Single product view + add to cart
│   │   ├── cart.ejs          # Shopping basket
│   │   ├── contact.ejs       # Address + Map API
│   │   ├── login.ejs
│   │   └── register.ejs
│   │
│   └── backoffice/
│       ├── login.ejs
│       ├── dashboard.ejs     # Sales history overview
│       ├── categories.ejs    # CRUD categories + hide/show toggle
│       ├── products.ejs      # CRUD products by category
│       └── productForm.ejs   # Add/Edit product form
│
├── public/
│   ├── css/
│   │   └── style.css         # Custom styles (Bootstrap is loaded via CDN)
│   ├── js/
│   │   ├── main.js           # Homepage interactivity, search, pagination
│   │   ├── cart.js           # Cart interactions
│   │   └── backoffice.js     # Admin-side JS
│   └── images/
│       └── products/         # Product image uploads
│
├── sql/
│   └── init.sql              # Full schema + seed data
│
└── seed/
    └── seedData.js           # Script to populate 5 categories × 12+ products
```

---

## Tech Stack (MANDATORY — do NOT substitute)

| Layer          | Technology                                          |
| -------------- | --------------------------------------------------- |
| Server         | **Node.js + Express.js**                            |
| Template       | **EJS** (server-side rendering, NOT React/Vue/etc.) |
| Database       | **MySQL** via `mysql2` package                      |
| Styling        | **Bootstrap 5** (CDN) + custom CSS                  |
| Client JS      | **jQuery** (CDN) + vanilla JavaScript               |
| Authentication | **express-session** + **bcrypt** for passwords      |
| File Upload    | **multer** for product images                       |
| Map            | **Google Maps API** or **Leaflet.js** (OpenStreetMap) |
| Containerize   | **Docker + docker-compose** (Node.js + MySQL)       |
| Version Control| **Git + GitHub**                                    |

### Critical Constraints

- **NO ORM** — Use raw SQL queries with `mysql2` (prepared statements for security)
- **NO React, Vue, Angular** — Use EJS templates only
- **NO TypeScript** — Plain JavaScript only
- **NO Tailwind** — Use Bootstrap 5 + custom CSS
- Session-based auth only (no JWT for this project)

---

## Database Schema

```sql
CREATE DATABASE IF NOT EXISTS bookstore;
USE bookstore;

-- Users (customers + admin)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories (5+ required)
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products (12+ per category required)
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    product_price DECIMAL(10, 2) NOT NULL,
    product_images JSON,
    product_attributes JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

-- Shopping Cart
CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    selected_attributes JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- Orders (sales history)
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('completed', 'cancelled') DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    selected_attributes JSON,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

---

## Seed Data Requirements

- **5 book categories minimum**: e.g., Fiction, Non-Fiction, Science & Technology, Children's Books, Comics & Manga
- **12+ products per category**: each product must include name, description, price, at least 1 image, and attributes (e.g., format: hardcover/paperback/ebook)
- **1 admin account**: `admin@bookstore.com` / password: `admin123`
- **2 test customer accounts** for demo purposes

---

## Webstore Feature Checklist

### Navigation Bar (on every page)

- [ ] Links to "All Products" page
- [ ] Dropdown links to each product category (only categories where `is_visible = TRUE`)
- [ ] Shopping basket icon with item count badge
- [ ] Contact page link
- [ ] Login/Register or Username + Logout (if logged in)
- [ ] Product search bar (search by product name)

### Homepage

- [ ] Highlighted/featured products section (e.g., bestsellers, new arrivals, staff picks)
- [ ] **5+ interactive techniques** — choose from:
  1. Image carousel/slider (Bootstrap Carousel)
  2. Hover effects on product cards (CSS transitions / jQuery)
  3. Scroll-triggered animations (fade-in on scroll)
  4. Dynamic product tabs (switch categories without page reload)
  5. Countdown timer for deals/promotions
  6. Toast notifications
  7. Modal quick-view for products
- [ ] **2+ Bootstrap components** — e.g., Carousel, Cards, Accordion, Tabs, Modal

### All Products Page

- [ ] Display product list (cards with image, name, price)
- [ ] **Pagination: max 15 products per page** — use client-side DOM events (jQuery) to manage pagination, NOT server-side query params
- [ ] Each product card links to product detail page

### Category Page

- [ ] Show products filtered by selected category
- [ ] Same product list layout as All Products page

### Search Results Page

- [ ] Show products matching search term (search by `product_name` using SQL LIKE)
- [ ] Same product list layout

### Product Detail Page

- [ ] Product name, description, images, price
- [ ] Product attributes selector (e.g., format: hardcover/paperback)
- [ ] Quantity selector
- [ ] "Add to Cart" button (**requires login** — redirect to login if not authenticated)

### Shopping Basket

- [ ] List of selected products with quantity, attributes, unit price, line total
- [ ] Grand total of all items
- [ ] Ability to update quantity or remove items
- [ ] "Purchase" button → clears cart, creates order record, shows completion message
- [ ] **NO real payment integration** — assume payment is made on click

### Contact Page

- [ ] Shop address displayed
- [ ] **Map API** (Google Maps or Leaflet/OpenStreetMap) showing pin at shop address

---

## Back-office Feature Checklist

### Admin Authentication

- [ ] Separate login page for admin
- [ ] Only users with `role = 'admin'` can access back-office
- [ ] Middleware to protect all `/backoffice/*` routes

### Category Management

- [ ] View list of categories sorted by `category_name` ASC
- [ ] Add new category
- [ ] Edit category name
- [ ] Delete category (with confirmation)
- [ ] Toggle **Hide/Show** each category (`is_visible` flag)
  - Hidden categories and their products do NOT appear on webstore

### Product Management

- [ ] Select category → view products sorted by `product_name` DESC
- [ ] Add product (with image upload via multer)
- [ ] Edit product information
- [ ] Delete product (with confirmation)

### Sales History (Dashboard)

- [ ] View list of completed orders
- [ ] Order details: customer name, products, quantities, total price, date

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (with nodemon)
npm run dev

# Start production server
npm start

# Run seed script (populate categories + products)
npm run seed

# Docker
docker-compose up --build      # Start MySQL + Node.js
docker-compose down            # Stop containers
```

---

## Code Style Guidelines

- Use `const` and `let`, never `var`
- Use `async/await` for all database queries, never raw callbacks
- Use prepared statements (`?` placeholders) for ALL SQL queries — never concatenate user input
- EJS partials for reusable components (navbar, footer, product cards)
- Routes grouped by concern: `/` for webstore, `/backoffice` for admin, `/auth` for login/register
- Error handling: try/catch in every controller, display user-friendly error pages
- All form inputs must have server-side validation
- Use `bcrypt` with salt rounds = 10 for password hashing
- Session config: `httpOnly: true`, `secure: false` (dev), `maxAge: 24h`

---

## Git Workflow

- Commit after completing each feature (do NOT ask before committing)
- Commit message format: `feat: <description>` / `fix: <description>` / `style: <description>`
- Branch strategy: `main` for stable, `dev` for development
- Push to GitHub after each major feature

---

## Docker Configuration

```yaml
# docker-compose.yml structure
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: bookstore
    ports:
      - "3306:3306"
    volumes:
      - ./sql/init.sql:/docker-entrypoint-initdb.d/init.sql
      - db_data:/var/lib/mysql

  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DB_HOST: db
      DB_USER: root
      DB_PASSWORD: rootpassword
      DB_NAME: bookstore
      SESSION_SECRET: your-secret-key
    volumes:
      - .:/app
      - /app/node_modules

volumes:
  db_data:
```

---

## .env Template

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=bookstore
SESSION_SECRET=change-this-to-random-string
```

---

## Testing Approach

- Manual testing per feature after each commit
- Verify all CRUD operations in back-office
- Verify customer flow: register → login → browse → search → add to cart → purchase
- Verify hidden categories do not appear on webstore
- Verify pagination shows exactly 15 items per page
- Test on Docker environment before submission

---

## Important Reminders

1. **Pagination must use DOM events** (client-side JS/jQuery), not server-side page params
2. **Products in hidden categories must NOT show** anywhere on the webstore
3. **Customer must be logged in** to add items to cart
4. **No real payment** — purchase button just completes the order and clears the cart
5. **Product images** stored in `/public/images/products/` and served statically
6. **Map on contact page** must pin the shop's actual address
7. **product_attributes** is JSON — supports things like `{"format": ["hardcover", "paperback", "ebook"]}`
8. The project integrates with **SE234** — must use Git, GitHub, Docker, and docker-compose
