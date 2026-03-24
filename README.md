# Project: Online Book Webstore (SE262 Term Project 2/2025)

## Overview

An online bookstore with two main sections:

1. **Webstore** — Customer-facing storefront for browsing, searching, and purchasing books
2. **Back-office** — Admin panel for shop owners to manage products, categories, and view sales

---

## ⚠ CRITICAL: Existing Front-end Code Rules

> **ALL 27 pages (HTML/CSS/Bootstrap) are already coded from Figma and approved.**
> **60 product images are prepared in `public/images/products/`.**
> **JavaScript logic is implemented in `public/js/`.**
> The front-end is COMPLETE. Back-end integration must preserve it.

### NEVER do these:

- **NEVER rewrite, redesign, or restructure existing HTML/EJS templates** — the layout is final from Figma
- **NEVER change, delete, or reorganize existing CSS** — the visual design is locked
- **NEVER replace Bootstrap components** with alternatives
- **NEVER change file names** in `views/` or `public/` — only rename `.html` → `.ejs`
- **NEVER change color scheme, fonts, spacing, or any visual property**

### ALWAYS do these:

- **ALWAYS read the existing view file first** before adding EJS tags or routes
- **ALWAYS preserve the exact HTML structure** — add EJS tags around existing content, not replace it
- **ALWAYS match the existing code style** (indentation, class naming, structure)
- **ALWAYS test that the page looks identical** after adding EJS tags or connecting routes

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
│   ├── webstore.js           # Storefront: home, products, categories, contact, FAQ
│   ├── auth.js               # Login, Register, Logout (both customer + admin)
│   ├── cart.js               # Cart + Checkout + Payment method
│   ├── account.js            # Profile, Order history, Wishlist, Address book
│   └── backoffice.js         # Admin: dashboard, CRUD categories/products/customers/orders
│
├── controllers/
│   ├── webstoreController.js # Home, all categories, category page, product detail, search, contact, FAQ
│   ├── authController.js     # Login, register, logout logic
│   ├── cartController.js     # Cart CRUD, checkout, payment method
│   ├── accountController.js  # Profile, order history, wishlist, address book
│   └── backofficeController.js # Admin dashboard, category/product/customer/order management
│
├── middleware/
│   ├── authCustomer.js       # Protect customer routes (must login for cart, account, checkout)
│   └── authAdmin.js          # Protect all /backoffice/* routes (admin role only)
│
├── models/                   # Raw SQL query functions (NO ORM)
│   ├── userModel.js          # Customer + Admin users, profile, address book
│   ├── productModel.js       # Products CRUD, search, filter by category
│   ├── categoryModel.js      # Categories CRUD, hide/show
│   ├── cartModel.js          # Cart items CRUD
│   ├── orderModel.js         # Orders, order items, order history
│   └── wishlistModel.js      # Wishlist CRUD
│
├── views/                    # EJS templates (27 pages from Figma)
│   ├── partials/
│   │   ├── navbar.ejs        # Nav: categories dropdown, search bar, cart icon, user menu
│   │   ├── footer.ejs        # Footer links, contact info
│   │   └── productCard.ejs   # Reusable product card (image, name, price, wishlist btn)
│   │
│   ├── webstore/                          # --- STOREFRONT (22 pages) ---
│   │   ├── home.ejs                       # 1.  Homepage — highlighted products, carousel, interactive elements
│   │   ├── allCategories.ejs              # 2.  All Categories — grid of all 5 category cards
│   │   ├── allProducts.ejs                # 3.  All Products — every product across categories
│   │   ├── category-fiction.ejs            # 4.  Fiction category
│   │   ├── category-children.ejs           # 5.  Children category
│   │   ├── category-nonfiction.ejs         # 6.  Non-Fiction category
│   │   ├── category-mystery.ejs            # 7.  Mystery & Thriller category
│   │   ├── category-science.ejs            # 8.  Science & Technology category
│   │   ├── product-detail.ejs              # 9.  Product Detail — images, description, attributes, add to cart
│   │   ├── cart.ejs                       # 10. Shopping Cart — item list, quantities, totals
│   │   ├── contact.ejs                    # 11. Contact — address, map API
│   │   ├── checkout.ejs                   # 12. Checkout — order summary, shipping info
│   │   ├── choosePayment.ejs              # 13. Choose Payment Method — payment options (simulated)
│   │   ├── condition.ejs                  # 14. Terms & Conditions
│   │   ├── orderHistory.ejs               # 15. Order History — past orders list + details
│   │   ├── wishlist.ejs                   # 16. Wishlist — saved products
│   │   ├── addressBook.ejs                # 17. Address Book — manage shipping addresses
│   │   ├── faq.ejs                        # 18. FAQ — accordion Q&A
│   │   ├── login.ejs                      # 19. Login form
│   │   ├── register.ejs                   # 20. Sign Up form
│   │   ├── account.ejs                    # 21. Account Profile — edit name, email, password
│   │   └── search-results.ejs             # 22. Search Results — filtered product list
│   │
│   └── backoffice/                        # --- ADMIN (8 pages) ---
│       ├── login.ejs                      # 1. Admin Login
│       ├── dashboard.ejs                  # 2. Dashboard Overview — sales stats, recent orders
│       ├── categories.ejs                 # 3. Category Management — CRUD + hide/show toggle
│       ├── products.ejs                   # 4. Product Management — list by category
│       ├── inventory.ejs                # 5. Add/Edit Product — form with image upload
│       ├── customers.ejs                  # 6. Customer Management — user list, details
│       ├── orders.ejs                     # 7. Orders Management — order list, status, details
│       └── adminProfile.ejs              # 8. Admin Profile — edit admin account
│
├── public/
│   ├── css/
│   │   └── style.css         # Custom styles (Bootstrap 5 loaded via CDN)
│   ├── js/
│   │   ├── main.js           # Homepage interactivity, search bar, pagination
│   │   ├── cart.js           # Cart add/remove/update, checkout flow
│   │   ├── wishlist.js       # Wishlist add/remove toggle
│   │   ├── account.js        # Profile edit, address book CRUD
│   │   └── backoffice.js     # Admin-side JS (tables, modals, confirmations)
│   └── images/
│       └── products/         # Product image uploads (via multer)
│
├── sql/
│   └── init.sql              # Full schema + seed data (all tables)
│
└── seed/
    └── seedData.js           # Populate: 5 categories × 12+ products, admin + test users
```

### Page Count Summary

| Section      | Pages | Files                                                |
| ------------ | ----- | ---------------------------------------------------------- |
| Webstore     | 22    | Home, All Categories, All Products, 5 Category pages (separate files), Product Detail, Cart, Contact, Checkout, Payment, Condition, Order History, Wishlist, Address Book, FAQ, Login, Register, Account, Search Results |
| Back-office  | 8     | Admin Login, Dashboard, Categories, Products, Inventory, Customers, Orders, Admin Profile |
| **Total**    | **30** | **30 EJS files + 3 partials** |

### Reusable Templates (important for code efficiency)

- **`partials/productCard.ejs`** — The product card component appears on: Home, All Categories, All Products, Category pages, Search Results, and Wishlist. Code it once, include everywhere.
- **`partials/navbar.ejs`** — Appears on every webstore page. Includes category dropdown, search bar, cart badge, user menu.
- **`partials/footer.ejs`** — Appears on every page.
- **Note**: Each category has its own file (`category-fiction.ejs`, `category-children.ejs`, etc.) instead of one shared template. The layout is similar but each file exists separately.

---

## Tech Stack (MANDATORY — do NOT substitute)

> As defined by SE262 course: **HTML, CSS, JavaScript, Bootstrap, jQuery, Node.js, API, Database (MySQL), EJS, and Authentication**
> As defined by SE234 course: **Git, GitHub, Deployment, Docker, Docker-compose**

| Layer          | Technology                                          |
| -------------- | --------------------------------------------------- |
| Markup         | **HTML5** — the foundation of all pages             |
| Styling        | **CSS3** + **Bootstrap 5** (CDN) for responsive layout |
| Client JS      | **JavaScript (ES6+)** + **jQuery** (CDN) for DOM manipulation, AJAX, events |
| Server         | **Node.js + Express.js** for HTTP server and routing |
| Template       | **EJS** — HTML files with embedded JS (`<%= %>` tags), rendered server-side |
| Database       | **MySQL** via `mysql2` package (raw SQL, NO ORM)    |
| Authentication | **express-session** + **bcrypt** for password hashing |
| File Upload    | **multer** for product image uploads                |
| Map API        | **Google Maps API** or **Leaflet.js** (OpenStreetMap) for contact page |
| Containerize   | **Docker + docker-compose** (Node.js + MySQL services) |
| Version Control| **Git + GitHub**                                    |

### How HTML, CSS, JS, and EJS work together

```
┌─────────────────────────────────────────────────────────┐
│  .ejs file = HTML + EJS tags                            │
│                                                         │
│  <!DOCTYPE html>            ← pure HTML                 │
│  <html>                                                 │
│  <head>                                                 │
│    <link rel="stylesheet"                               │
│      href="bootstrap.css">  ← CSS (Bootstrap CDN)      │
│    <link rel="stylesheet"                               │
│      href="/css/style.css"> ← CSS (custom styles)       │
│  </head>                                                │
│  <body>                                                 │
│    <h1><%= product.name %></h1>  ← EJS tag (dynamic)   │
│    <p class="text-primary">      ← Bootstrap class      │
│      <%= product.price %> Baht                          │
│    </p>                                                 │
│                                                         │
│    <script src="jquery.js"></script>  ← jQuery CDN      │
│    <script src="/js/main.js"></script> ← custom JS      │
│  </body>                                                │
│  </html>                                                │
└─────────────────────────────────────────────────────────┘
         │
         │ Express calls res.render("product", data)
         │ EJS engine replaces <%= %> with real values
         ▼
┌─────────────────────────────────────────────────────────┐
│  Final HTML sent to browser                             │
│                                                         │
│  <h1>Harry Potter</h1>     ← pure HTML now              │
│  <p class="text-primary">350 Baht</p>                   │
└─────────────────────────────────────────────────────────┘
```

- **HTML** = โครงสร้างหน้าเว็บ (ทุกไฟล์ .ejs คือ HTML ที่มี EJS tags ปนอยู่)
- **CSS** = จัดรูปแบบ (Bootstrap CDN + `/public/css/style.css` สำหรับ custom styles)
- **JavaScript** = client-side interactivity (jQuery + `/public/js/*.js` สำหรับ pagination, cart, search)
- **EJS** = template layer ที่แทนที่ `<%= %>` ด้วยข้อมูลจริงจาก server ก่อนส่ง HTML ให้ browser

### Critical Constraints

- **NO ORM** — Use raw SQL queries with `mysql2` (prepared statements for security)
- **NO React, Vue, Angular** — Use EJS templates only (which are HTML + embedded JS)
- **NO TypeScript** — Plain JavaScript only
- **NO Tailwind** — Use Bootstrap 5 + custom CSS
- Session-based auth only (no JWT for this project)
- Every `.ejs` file must be valid HTML structure with proper `<!DOCTYPE html>`, `<head>`, `<body>` (or use a layout partial)

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
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Address Book (multiple addresses per user)
CREATE TABLE addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    label VARCHAR(50) DEFAULT 'Home',
    full_name VARCHAR(200) NOT NULL,
    phone VARCHAR(20),
    address_line VARCHAR(500) NOT NULL,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Categories (5 required: Fiction, Children, Non-Fiction, Mystery & Thriller, Science & Tech)
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    category_image VARCHAR(500),
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

-- Wishlist
CREATE TABLE wishlist (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_wish (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
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

-- Orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_id INT,
    total_price DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'credit_card',
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (address_id) REFERENCES addresses(address_id) ON SET NULL
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

-- FAQ (admin can manage Q&A)
CREATE TABLE faqs (
    faq_id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Seed Data Requirements

- **5 book categories (exact names from Figma)**:
  1. Fiction
  2. Children
  3. Non-Fiction
  4. Mystery & Thriller
  5. Science & Technology
- **12+ products per category**: each product must include name, description, price, at least 1 image, and attributes (e.g., format: hardcover/paperback/ebook)
- **1 admin account**: `admin@bookstore.com` / password: `admin123`
- **2 test customer accounts**: with addresses in address book for demo
- **10+ FAQ entries**: common bookstore questions (shipping, returns, payment, etc.)

---

## Webstore Feature Checklist (22 pages)

### Navigation Bar — `partials/navbar.ejs` (on every webstore page)

- [ ] Links to "All Categories" page
- [ ] Dropdown links to each product category (only categories where `is_visible = TRUE`)
- [ ] Shopping basket icon with item count badge
- [ ] Wishlist icon with count badge
- [ ] Contact page link
- [ ] Login/Register or Username dropdown (Profile, Order History, Wishlist, Address Book, Logout)
- [ ] Product search bar (search by product name)

### 1. Homepage — `webstore/home.ejs`

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

### 2. All Categories — `webstore/allCategories.ejs`

- [ ] Display grid of all 5 category cards (image + category name)
- [ ] Each card links to the corresponding category page
- [ ] Only show categories where `is_visible = TRUE`

### 3. All Products — `webstore/allProducts.ejs`

- [ ] Display product list from ALL categories combined
- [ ] **Pagination: max 15 products per page** — use client-side DOM events (jQuery)
- [ ] Each product card links to product detail page

### 4-8. Category Pages — 5 separate files:
- `webstore/category-fiction.ejs`
- `webstore/category-children.ejs`
- `webstore/category-nonfiction.ejs`
- `webstore/category-mystery.ejs`
- `webstore/category-science.ejs`

Each category page:
- [ ] Category name displayed as page title
- [ ] Show PRODUCT LIST filtered by selected category
- [ ] **Pagination: max 15 products per page** — use client-side DOM events (jQuery)
- [ ] Each product card links to product detail page

### 9. Product Detail — `webstore/product-detail.ejs`

- [ ] Product name, description, images (gallery/carousel), price
- [ ] Product attributes selector (e.g., format: hardcover/paperback)
- [ ] Quantity selector
- [ ] "Add to Cart" button (**requires login** — redirect to login if not authenticated)
- [ ] "Add to Wishlist" heart button (toggle on/off)

### 10. Shopping Cart — `webstore/cart.ejs`

- [ ] List of selected products with quantity, attributes, unit price, line total
- [ ] Grand total of all items
- [ ] Ability to update quantity or remove items
- [ ] "Proceed to Checkout" button → goes to checkout page
- [ ] Requires login

### 11. Contact — `webstore/contact.ejs`

- [ ] Shop address displayed
- [ ] **Map API** (Google Maps or Leaflet/OpenStreetMap) showing pin at shop address
- [ ] Contact info: phone, email, business hours

### 12. Checkout — `webstore/checkout.ejs`

- [ ] Order summary (items, quantities, prices)
- [ ] Select shipping address from address book (or add new)
- [ ] "Continue to Payment" button → goes to payment method page
- [ ] Requires login

### 13. Choose Payment Method — `webstore/choosePayment.ejs`

- [ ] Display payment options (Credit Card, Bank Transfer, Cash on Delivery)
- [ ] **NO real payment integration** — selecting a method and clicking "Confirm" completes the order
- [ ] On confirm: creates order record, clears cart, redirects to order success/history
- [ ] Requires login

### 14. Terms & Conditions — `webstore/condition.ejs`

- [ ] Terms of service content
- [ ] Return/refund policy
- [ ] Privacy policy section
- [ ] Mostly static content

### 15. Order History — `webstore/orderHistory.ejs`

- [ ] List of past orders (order ID, date, total, status)
- [ ] Click to expand/view order details (items, quantities, prices)
- [ ] Requires login

### 16. Wishlist — `webstore/wishlist.ejs`

- [ ] List of saved products (image, name, price)
- [ ] "Add to Cart" button per item
- [ ] "Remove from Wishlist" button per item
- [ ] Requires login

### 17. Address Book — `webstore/addressBook.ejs`

- [ ] List of saved addresses with labels (Home, Work, etc.)
- [ ] Add new address form
- [ ] Edit existing address
- [ ] Delete address (with confirmation)
- [ ] Set default address
- [ ] Requires login

### 18. FAQ — `webstore/faq.ejs`

- [ ] Accordion-style Q&A (Bootstrap Accordion component)
- [ ] Data from `faqs` table (or hardcoded if simpler)

### 19-20. Login & Sign Up — `webstore/login.ejs` + `webstore/register.ejs`

- [ ] Login form (email + password)
- [ ] Register form (username, email, password, confirm password)
- [ ] Error messages for invalid credentials / validation
- [ ] Redirect to previous page after login (or homepage)

### 21. Account Profile — `webstore/account.ejs`

- [ ] Display current user info (username, email, phone)
- [ ] Edit profile form (change name, email, phone)
- [ ] Change password form (current + new + confirm)
- [ ] Requires login

### 22. Search Results — `webstore/search-results.ejs`

- [ ] Show products matching search term (search by `product_name` using SQL LIKE)
- [ ] Display search term at top
- [ ] Same product card layout as category page
- [ ] Pagination if results > 15

---

## Back-office Feature Checklist (8 pages)

### 1. Admin Login — `backoffice/login.ejs`

- [ ] Separate login page for admin
- [ ] Only users with `role = 'admin'` can access back-office
- [ ] Middleware `authAdmin` protects all `/backoffice/*` routes

### 2. Dashboard Overview — `backoffice/dashboard.ejs`

- [ ] Summary stats: total orders, total revenue, total customers, total products
- [ ] Recent orders table (last 10-20 orders)
- [ ] Quick links to management pages

### 3. Category Management — `backoffice/categories.ejs`

- [ ] View list of categories sorted by `category_name` ASC
- [ ] Add new category (with optional image)
- [ ] Edit category name
- [ ] Delete category (with confirmation)
- [ ] Toggle **Hide/Show** each category (`is_visible` flag)
  - Hidden categories and their products do NOT appear on webstore

### 4. Product Management — `backoffice/products.ejs`

- [ ] Select category → view products sorted by `product_name` DESC
- [ ] Product table with image thumbnail, name, price, category
- [ ] Quick actions: edit, delete per row

### 5. Add/Edit Product — `backoffice/inventory.ejs`

- [ ] Form: product name, description, price, category (dropdown), attributes (JSON)
- [ ] Image upload via multer (multiple images)
- [ ] Pre-fill form data when editing existing product
- [ ] Validation before submit

### 6. Customer Management — `backoffice/customers.ejs`

- [ ] View list of all customers (username, email, registration date)
- [ ] View customer details (orders, addresses)
- [ ] Search/filter customers

### 7. Orders Management — `backoffice/orders.ejs`

- [ ] View all orders (order ID, customer, total, date, status)
- [ ] View order details (items, quantities, prices, shipping address)
- [ ] Update order status (pending → completed / cancelled)
- [ ] Filter by status

### 8. Admin Profile — `backoffice/adminProfile.ejs`

- [ ] Display admin account info
- [ ] Edit admin profile (name, email)
- [ ] Change password

---

## URL Routing Map

| Method | URL                           | Controller Function              | EJS Template                  | Auth     |
| ------ | ----------------------------- | -------------------------------- | ----------------------------- | -------- |
| GET    | `/`                           | `webstore.home`                  | `webstore/home`               | —        |
| GET    | `/categories`                 | `webstore.allCategories`         | `webstore/allCategories`      | —        |
| GET    | `/products`                   | `webstore.allProducts`           | `webstore/allProducts`        | —        |
| GET    | `/category/fiction`           | `webstore.categoryFiction`       | `webstore/category-fiction`   | —        |
| GET    | `/category/children`          | `webstore.categoryChildren`      | `webstore/category-children`  | —        |
| GET    | `/category/nonfiction`        | `webstore.categoryNonfiction`    | `webstore/category-nonfiction`| —        |
| GET    | `/category/mystery`           | `webstore.categoryMystery`       | `webstore/category-mystery`   | —        |
| GET    | `/category/science`           | `webstore.categoryScience`       | `webstore/category-science`   | —        |
| GET    | `/product/:id`                | `webstore.productDetail`         | `webstore/product-detail`     | —        |
| GET    | `/search?q=`                  | `webstore.search`                | `webstore/search-results`     | —        |
| GET    | `/contact`                    | `webstore.contact`               | `webstore/contact`            | —        |
| GET    | `/condition`                  | `webstore.condition`             | `webstore/condition`          | —        |
| GET    | `/faq`                        | `webstore.faq`                   | `webstore/faq`                | —        |
| GET    | `/auth/login`                 | `auth.loginPage`                 | `webstore/login`              | —        |
| POST   | `/auth/login`                 | `auth.login`                     | (redirect)                    | —        |
| GET    | `/auth/register`              | `auth.registerPage`              | `webstore/register`           | —        |
| POST   | `/auth/register`              | `auth.register`                  | (redirect)                    | —        |
| GET    | `/auth/logout`                | `auth.logout`                    | (redirect)                    | —        |
| GET    | `/cart`                       | `cart.viewCart`                   | `webstore/cart`               | Customer |
| POST   | `/cart/add`                   | `cart.addItem`                   | (redirect/AJAX)               | Customer |
| POST   | `/cart/update`                | `cart.updateItem`                | (redirect/AJAX)               | Customer |
| POST   | `/cart/remove`                | `cart.removeItem`                | (redirect/AJAX)               | Customer |
| GET    | `/checkout`                   | `cart.checkout`                  | `webstore/checkout`           | Customer |
| GET    | `/checkout/payment`           | `cart.choosePayment`             | `webstore/choosePayment`      | Customer |
| POST   | `/checkout/confirm`           | `cart.confirmOrder`              | (redirect to orders)          | Customer |
| GET    | `/account/profile`            | `account.profile`                | `webstore/account`            | Customer |
| POST   | `/account/profile`            | `account.updateProfile`          | (redirect)                    | Customer |
| GET    | `/account/orders`             | `account.orderHistory`           | `webstore/orderHistory`       | Customer |
| GET    | `/account/wishlist`           | `account.wishlist`               | `webstore/wishlist`           | Customer |
| POST   | `/account/wishlist/toggle`    | `account.toggleWishlist`         | (AJAX)                        | Customer |
| GET    | `/account/addresses`          | `account.addressBook`            | `webstore/addressBook`        | Customer |
| POST   | `/account/addresses/add`      | `account.addAddress`             | (redirect)                    | Customer |
| POST   | `/account/addresses/edit/:id` | `account.editAddress`            | (redirect)                    | Customer |
| POST   | `/account/addresses/delete/:id`| `account.deleteAddress`         | (redirect)                    | Customer |
| GET    | `/backoffice/login`           | `auth.adminLoginPage`            | `backoffice/login`            | —        |
| POST   | `/backoffice/login`           | `auth.adminLogin`                | (redirect)                    | —        |
| GET    | `/backoffice`                 | `backoffice.dashboard`           | `backoffice/dashboard`        | Admin    |
| GET    | `/backoffice/categories`      | `backoffice.categories`          | `backoffice/categories`       | Admin    |
| GET    | `/backoffice/products`        | `backoffice.products`            | `backoffice/products`         | Admin    |
| GET    | `/backoffice/inventory`       | `backoffice.inventory`           | `backoffice/inventory`        | Admin    |
| GET    | `/backoffice/inventory/:id`   | `backoffice.inventoryEdit`       | `backoffice/inventory`        | Admin    |
| GET    | `/backoffice/customers`       | `backoffice.customers`           | `backoffice/customers`        | Admin    |
| GET    | `/backoffice/orders`          | `backoffice.orders`              | `backoffice/orders`           | Admin    |
| GET    | `/backoffice/profile`         | `backoffice.adminProfile`        | `backoffice/adminProfile`     | Admin    |

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
- Routes grouped by concern:
  - `/` and `/category/:id` for webstore browsing
  - `/auth` for login/register/logout
  - `/cart` and `/checkout` for shopping flow
  - `/account` for profile, order history, wishlist, address book
  - `/backoffice` for all admin pages
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
- Verify all CRUD operations in back-office (categories, products, customers, orders)
- Verify customer flow: register → login → browse → search → add to cart → checkout → choose payment → order complete
- Verify wishlist: add/remove products, move to cart
- Verify address book: add/edit/delete addresses, set default, use in checkout
- Verify order history: view past orders after purchase
- Verify profile: edit info, change password
- Verify hidden categories do not appear on webstore
- Verify pagination shows exactly 15 items per page
- Verify admin dashboard shows correct stats
- Test on Docker environment before submission

---

## Important Reminders

1. **Pagination must use DOM events** (client-side JS/jQuery), not server-side page params
2. **Products in hidden categories must NOT show** anywhere on the webstore
3. **Customer must be logged in** to add items to cart, wishlist, checkout, view order history, manage addresses
4. **No real payment** — choosing a payment method and clicking confirm just completes the order and clears the cart
5. **Product images** stored in `/public/images/products/` — 60 images already prepared
6. **Map on contact page** must pin the shop's actual address
7. **product_attributes** is JSON — supports things like `{"format": ["hardcover", "paperback", "ebook"]}`
8. The project integrates with **SE234** — must use Git, GitHub, Docker, and docker-compose
9. **Each category has its own file** — `category-fiction.ejs`, `category-children.ejs`, etc. (5 separate files, not 1 shared template)
10. **30 pages total** — 22 webstore + 8 backoffice + 3 partials
11. **Checkout flow is 3 steps**: Cart → Checkout (address) → Choose Payment → Order Complete (redirect to order history)
12. **Front-end code is LOCKED** — all HTML/CSS from Figma is approved. Back-end must add EJS tags without changing layout or styles
