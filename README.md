# Project: Online Book Webstore — FRONT-END (SE262 Term Project 2/2025)

> **This file is for FRONT-END development only.**
> For the full-stack version (Express + MySQL + EJS), see the full-stack CLAUDE.md.

---

## ⚠ CRITICAL: Existing Code Rules

> **ALL 27 pages are already coded from Figma and approved.**
> **60 product images are already prepared in `public/images/products/`.**
> Claude Code's job is to ADD functionality, NOT redesign.

### NEVER do these:

- **NEVER rewrite, redesign, or restructure existing HTML** — the layout is final and approved from Figma
- **NEVER change, delete, or reorganize existing CSS classes or styles** — the visual design is locked
- **NEVER replace Bootstrap components** with alternatives — keep exact same components
- **NEVER change file names or folder structure** — everything is in place
- **NEVER remove existing HTML elements** — only add new attributes, classes, or wrappers if needed for JS/EJS
- **NEVER swap out product images or placeholder content** unless specifically asked
- **NEVER change color scheme, fonts, spacing, or any visual property**

### ALWAYS do these:

- **ALWAYS read the existing file first** before making any changes
- **ALWAYS preserve the exact HTML structure** — add JS/EJS on top of what exists
- **ALWAYS match the existing code style** (indentation, naming, class conventions)
- **ALWAYS add JavaScript in separate files** in `public/js/` — not inline in HTML
- **ALWAYS keep `<!-- MOCK: xxx -->` comments** intact (or convert them to EJS tags when doing EJS conversion)
- **ALWAYS test that the page still looks identical** after adding JS or EJS tags

### What you CAN do:

- Add `id` or `data-*` attributes to existing HTML elements (for JS to hook into)
- Add new `<script>` tags at the bottom of HTML files
- Create new `.js` files in `public/js/`
- Add small CSS additions in `public/css/style.css` (e.g., `.active` states, transition classes) — but never modify existing rules
- Add EJS tags (`<%= %>`, `<% %>`) around existing hardcoded data when converting to EJS
- Add `<%- include() %>` to replace copy-pasted navbar/footer
- Add new HTML elements only if required for functionality (e.g., toast container, modal for confirmation) — must match existing style

## Current Project Status

- **HTML/CSS**: ✅ Complete — all 27 pages coded from Figma, approved
- **Images**: ✅ Complete — 60 product images in `public/images/products/`
- **JavaScript**: ⚠ Minimal — basic structure exists, needs full logic
- **EJS conversion**: ❌ Not started — will do after JS is complete
- **Back-end (Express/MySQL)**: ❌ Not started — separate team, timing uncertain

## Goals (in order)

1. **Phase A**: Add all JavaScript logic to make pages functional (cart, pagination, wishlist, search, form validation, interactive elements)
2. **Phase B**: Convert HTML → EJS and prepare for back-end integration

---

## Architecture (Front-end Only — mirrors full-stack structure)

> โครงสร้างนี้ตรงกับ CLAUDE.md (เวอร์ชันรวม) ทุกประการ
> ตอน handoff แค่เปลี่ยนนามสกุล `.html` → `.ejs` — ไม่ต้องแก้ relative path ใดๆ

```
bookstore-frontend/
├── CLAUDE-FRONTEND.md         # This file
│
├── views/                     # ตรงกับ views/ ในเวอร์ชันรวม
│   ├── partials/              # Reusable HTML snippets (จะกลายเป็น EJS partials)
│   │   ├── navbar.html        # Navigation bar — copy into every page for now
│   │   ├── footer.html        # Footer — copy into every page for now
│   │   └── productCard.html   # Single product card — reference template
│   │
│   ├── webstore/                          # --- STOREFRONT (22 pages) ---
│   │   ├── home.html                      # 1.  Homepage — carousel, highlights, interactive
│   │   ├── allCategories.html             # 2.  All Categories — grid of 5 category cards
│   │   ├── allProducts.html               # 3.  All Products — every product across categories
│   │   ├── category-fiction.html           # 4.  Fiction category
│   │   ├── category-children.html          # 5.  Children category
│   │   ├── category-nonfiction.html        # 6.  Non-Fiction category
│   │   ├── category-mystery.html           # 7.  Mystery & Thriller category
│   │   ├── category-science.html           # 8.  Science & Technology category
│   │   ├── product-detail.html             # 9.  Product Detail — gallery, attributes, add to cart
│   │   ├── cart.html                      # 10. Shopping Cart — item list, quantities, total
│   │   ├── contact.html                   # 11. Contact — address + Map API
│   │   ├── checkout.html                  # 12. Checkout — order summary, address selection
│   │   ├── choosePayment.html             # 13. Payment Method selection
│   │   ├── condition.html                 # 14. Terms & Conditions
│   │   ├── orderHistory.html              # 15. Order History — past orders list
│   │   ├── wishlist.html                  # 16. Wishlist — saved products
│   │   ├── addressBook.html               # 17. Address Book — manage addresses
│   │   ├── faq.html                       # 18. FAQ — accordion Q&A
│   │   ├── login.html                     # 19. Login form
│   │   ├── register.html                  # 20. Sign Up form
│   │   ├── account.html                   # 21. Account Profile
│   │   └── search-results.html            # 22. Search Results
│   │
│   └── backoffice/                        # --- ADMIN (8 pages) ---
│       ├── login.html                     # 1. Admin Login
│       ├── dashboard.html                 # 2. Dashboard Overview
│       ├── categories.html                # 3. Category Management
│       ├── products.html                  # 4. Product Management
│       ├── inventory.html                 # 5. Add/Edit Product (Inventory)
│       ├── customers.html                 # 6. Customer Management
│       ├── orders.html                    # 7. Orders Management
│       └── adminProfile.html              # 8. Admin Profile
│
├── public/                    # ตรงกับ public/ ในเวอร์ชันรวม
│   ├── css/
│   │   ├── style.css          # Global custom styles
│   │   ├── home.css           # Homepage-specific styles (optional)
│   │   └── admin.css          # Admin pages styles (optional)
│   │
│   ├── js/
│   │   ├── main.js            # Homepage interactivity, search bar
│   │   ├── pagination.js      # Client-side pagination (DOM events, 15 items/page)
│   │   ├── cart.js            # Cart add/remove/update (mock, no server)
│   │   ├── wishlist.js        # Wishlist toggle (mock, no server)
│   │   ├── account.js         # Profile/address book interactions
│   │   └── admin.js           # Admin-side JS (tables, modals, confirmations)
│   │
│   └── images/
│       ├── products/          # Product images (use placeholder images for now)
│       ├── banners/           # Homepage banners/carousel images
│       ├── categories/        # Category card images
│       └── logo.png           # Store logo
│
└── mock-data/                 # Optional: JSON files for mock data (ไม่มีในเวอร์ชันรวม)
    ├── products.json           # All 60+ products
    ├── categories.json         # 5 categories
    └── orders.json             # Sample orders for order history
```

### Relative Path Convention (สำคัญมาก!)

ทุกไฟล์ใน `views/webstore/` และ `views/backoffice/` ให้อ้าง CSS, JS, images ด้วย path นี้:

```html
<!-- ใน views/webstore/home.html หรือ views/backoffice/dashboard.html -->
<link href="../../public/css/style.css" rel="stylesheet">
<script src="../../public/js/main.js"></script>
<img src="../../public/images/products/harry-potter.jpg">

<!-- link ไปหน้าอื่นใน webstore -->
<a href="product-detail.html">View Detail</a>
<a href="cart.html">Cart</a>

<!-- link ไปหน้า login (อยู่ folder เดียวกัน) -->
<a href="login.html">Login</a>

<!-- link ข้าม folder (webstore ↔ backoffice) -->
<a href="../backoffice/dashboard.html">Admin</a>
```

> **ทำไม `../../public/`?** — เพราะ views/webstore/ อยู่ลึก 2 ชั้นจาก root
> ตอนเชื่อม Express จริง, Express จะ serve `/public` เป็น static folder
> แล้ว back-end จะเปลี่ยน path เป็น `/css/style.css`, `/js/main.js`
> แต่ระหว่างนี้ `../../public/css/style.css` เปิดใน browser ตรงๆ ได้เลย

### Handoff Conversion (สิ่งที่ back-end จะทำ)

```
ขั้นตอนที่ 1: เปลี่ยนนามสกุล
  views/webstore/home.html      →  views/webstore/home.ejs        ✅ แค่ rename
  views/backoffice/dashboard.html → views/backoffice/dashboard.ejs ✅ แค่ rename
  views/partials/navbar.html    →  views/partials/navbar.ejs      ✅ แค่ rename

ขั้นตอนที่ 2: แก้ path (ทำครั้งเดียว find & replace ทุกไฟล์)
  ../../public/css/style.css    →  /css/style.css                 ✅ find & replace
  ../../public/js/main.js       →  /js/main.js                    ✅ find & replace
  ../../public/images/          →  /images/                       ✅ find & replace

ขั้นตอนที่ 3: เพิ่ม EJS tags (ตาม <!-- MOCK: xxx --> comments)
  Harry Potter                  →  <%= product.product_name %>
  350 Baht                      →  <%= product.product_price %> Baht

ขั้นตอนที่ 4: เปลี่ยน navbar/footer จาก copy-paste เป็น include
  (copy-pasted navbar code)     →  <%- include('../partials/navbar') %>
```

---

## Tech Stack (Front-end Only)

> As defined by SE262: **HTML, CSS, JavaScript, Bootstrap, jQuery**

| Layer      | Technology                                              |
| ---------- | ------------------------------------------------------- |
| Markup     | **HTML5** — semantic elements (`<header>`, `<main>`, `<nav>`, `<section>`) |
| Styling    | **CSS3** + **Bootstrap 5.3** (CDN) for responsive grid and components |
| JavaScript | **ES6+ vanilla JS** + **jQuery 3.x** (CDN) for DOM manipulation |
| Icons      | **Bootstrap Icons** (CDN) or **Font Awesome** (CDN) |
| Map        | **Leaflet.js** (CDN) + OpenStreetMap for contact page |

### CDN Links (use in every HTML page `<head>`)

```html
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

<!-- Custom CSS (relative path from views/webstore/ or views/backoffice/) -->
<link href="../../public/css/style.css" rel="stylesheet">

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- Custom JS (relative path from views/webstore/ or views/backoffice/) -->
<script src="../../public/js/main.js"></script>
```

### Critical Constraints

- **NO React, Vue, Angular, Svelte** — Plain HTML + jQuery only
- **NO TypeScript** — Plain JavaScript only
- **NO Tailwind** — Use Bootstrap 5 utility classes + custom CSS
- **NO npm / build tools** — Everything via CDN, open `.html` files directly in browser
- **NO server needed** — All pages must work by opening the file in a browser
- Every page must be **responsive** (mobile, tablet, desktop) using Bootstrap grid
- Follow Figma design as closely as possible

---

## Mock Data Convention

Since there is no back-end yet, all data is hardcoded in HTML.
Use consistent naming so the back-end team can easily find and replace with EJS tags later.

### Product data format

```html
<!-- MOCK: product -->
<div class="card product-card">
  <img src="../../public/images/products/harry-potter.jpg" class="card-img-top" alt="Harry Potter">
  <div class="card-body">
    <h5 class="card-title">Harry Potter and the Philosopher's Stone</h5>
    <p class="text-muted">J.K. Rowling</p>
    <p class="product-price fw-bold">350 Baht</p>
    <a href="product-detail.html" class="btn btn-primary btn-sm">View Detail</a>
  </div>
</div>
```

### Category data format

```html
<!-- MOCK: category -->
<div class="col">
  <div class="card category-card">
    <img src="../../public/images/categories/fiction.jpg" class="card-img-top" alt="Fiction">
    <div class="card-body text-center">
      <h5>Fiction</h5>
      <p class="text-muted">24 books</p>
    </div>
  </div>
</div>
```

### Comment convention for back-end handoff

Add `<!-- MOCK: xxx -->` comments around hardcoded data so the back-end team knows where to add EJS tags:

```html
<!-- MOCK: product-list (will become forEach loop) -->
<div class="row">
  <!-- MOCK: product -->
  <div class="col-md-4">...</div>
  <!-- MOCK: product -->
  <div class="col-md-4">...</div>
  <!-- MOCK: product -->
  <div class="col-md-4">...</div>
</div>
<!-- END MOCK: product-list -->
```

```html
<!-- MOCK: user-greeting (will become if/else) -->
<span>Hi, สมชาย</span>
<a href="#">Logout</a>
<!-- END MOCK: user-greeting -->
```

---

## Categories & Products (Mock Data)

### 5 Book Categories

| #  | Category Name         | Minimum Products |
| -- | --------------------- | ---------------- |
| 1  | Fiction               | 12               |
| 2  | Children              | 12               |
| 3  | Non-Fiction           | 12               |
| 4  | Mystery & Thriller    | 12               |
| 5  | Science & Technology  | 12               |

### Product Attributes

Each product should show:
- `product_name` — Book title
- `product_description` — 2-3 sentence summary
- `product_price` — In Baht (integer, e.g. 350)
- `product_images` — At least 1 image (use placeholder if no real image: https://placehold.co/300x400)
- `product_attributes` — Format options: Hardcover / Paperback / E-book
- `author` — Author name
- `category` — Which category it belongs to

---

## Page-by-Page Requirements & Figma Notes

### Components (reusable across pages)

#### Navbar — `views/partials/navbar.html`
- [ ] Brand logo + store name (links to home)
- [ ] "All Categories" link
- [ ] Category dropdown (Fiction, Children, Non-Fiction, Mystery & Thriller, Sci & Tech)
- [ ] Search bar (text input + search button)
- [ ] Wishlist icon with badge count
- [ ] Cart icon with badge count
- [ ] User dropdown: Profile, Order History, Wishlist, Address Book, Logout
- [ ] For now, show **logged-in state** (with username). Create a separate version or comment block for logged-out state (Login / Register buttons)
- [ ] **Responsive**: hamburger menu on mobile

#### Footer — `views/partials/footer.html`
- [ ] Store info, quick links, social media icons
- [ ] Copyright notice

#### Product Card — `views/partials/productCard.html`
- [ ] Product image
- [ ] Product name (truncate if too long)
- [ ] Author name
- [ ] Price
- [ ] Wishlist heart icon (toggle on/off with JS)
- [ ] "View Detail" or clickable card → product-detail.html

---

### Webstore Pages (22 pages)

#### 1. Homepage — `views/webstore/home.html`
- [ ] Hero banner / carousel (Bootstrap Carousel) — at least 3 slides
- [ ] Featured/highlighted products section (e.g., "Bestsellers", "New Arrivals")
- [ ] Category showcase (quick links to each category)
- [ ] **5+ interactive techniques** (SE262 requirement):
  1. Bootstrap Carousel for hero banner
  2. Hover effects on product cards (scale up, shadow)
  3. Scroll-triggered fade-in animations (use jQuery `.animate()` or CSS `IntersectionObserver`)
  4. Dynamic tabs to switch product sections (jQuery `.show()/.hide()` or Bootstrap Tabs)
  5. Modal quick-view for a product (Bootstrap Modal)
  6. (bonus) Toast notification when adding to cart
  7. (bonus) Countdown timer for a promotional deal
- [ ] **2+ Bootstrap components** (SE262 requirement): Carousel + Cards + (Tabs or Accordion or Modal)

#### 2. All Categories — `views/webstore/allCategories.html`
- [ ] Grid of 5 category cards (image + name + product count)
- [ ] Each card links to corresponding category page (e.g., `category-fiction.html`)

#### 3. All Products — `views/webstore/allProducts.html`
- [ ] Display product list from ALL categories combined
- [ ] Same product card layout as category pages
- [ ] **Pagination: max 15 products per page** — client-side DOM events

#### 4-8. Category Pages — 5 separate files:
- `views/webstore/category-fiction.html`
- `views/webstore/category-children.html`
- `views/webstore/category-nonfiction.html`
- `views/webstore/category-mystery.html`
- `views/webstore/category-science.html`

Each category page:
- [ ] Page title showing category name
- [ ] Product grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- [ ] **15 products maximum per page view**
- [ ] **Pagination using client-side DOM events** (SE262 requirement):
  - Load ALL products into HTML (hidden)
  - Use jQuery to show only 15 at a time
  - Pagination buttons: Previous / 1 / 2 / 3 / Next
  - Clicking a page button hides current 15, shows next 15
  - Do NOT reload the page or use URL params
- [ ] At least 12 products per category

#### 9. Product Detail — `views/webstore/product-detail.html`
- [ ] Product image gallery (main image + thumbnails, click to switch)
- [ ] Product name, author, description
- [ ] Price (prominent)
- [ ] Attribute selector: format (Hardcover / Paperback / E-book) — use radio buttons or button group
- [ ] Quantity selector (+ / - buttons with number input)
- [ ] "Add to Cart" button (style as primary)
- [ ] "Add to Wishlist" heart button (toggle)
- [ ] Related products section at bottom (4 product cards)

#### 10. Cart — `views/webstore/cart.html`
- [ ] Table/list of cart items: image thumbnail, name, format, unit price, quantity (editable), line total
- [ ] Quantity +/- buttons that update line total with jQuery
- [ ] Remove item button (× icon)
- [ ] Grand total that updates when quantity changes
- [ ] "Continue Shopping" button → back to home or categories
- [ ] "Proceed to Checkout" button → checkout.html

#### 11. Contact — `views/webstore/contact.html`
- [ ] Store name, address, phone, email, business hours
- [ ] **Map**: Leaflet.js + OpenStreetMap showing pin at store address
- [ ] Contact form (name, email, message, submit button) — form doesn't need to actually send
```html
<!-- Leaflet CSS & JS (add to <head>) -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

#### 12. Checkout — `views/webstore/checkout.html`
- [ ] Order summary (items from cart with quantities and prices)
- [ ] Shipping address selection (radio buttons with 2-3 mock addresses)
- [ ] "Add New Address" mini-form (or link to address book)
- [ ] Order total
- [ ] "Continue to Payment" button → choosePayment.html

#### 13. Choose Payment — `views/webstore/choosePayment.html`
- [ ] Payment options as selectable cards:
  - Credit / Debit Card (mock form: card number, expiry, CVV)
  - Bank Transfer (show bank details)
  - Cash on Delivery
- [ ] Order total displayed
- [ ] "Confirm Order" button → show success message or redirect to orderHistory.html
- [ ] **No real payment** — just UI

#### 14. Terms & Conditions — `views/webstore/condition.html`
- [ ] Terms of service content
- [ ] Return/refund policy
- [ ] Privacy policy section
- [ ] Mostly static content

#### 15. Order History — `views/webstore/orderHistory.html`
- [ ] List of past orders: order #, date, total, status badge (Completed / Pending)
- [ ] Click to expand → show order items (Bootstrap Collapse or Accordion)
- [ ] Mock 3-5 orders with different statuses

#### 16. Wishlist — `views/webstore/wishlist.html`
- [ ] Grid of saved products (same card layout as product list)
- [ ] "Add to Cart" button per item
- [ ] "Remove" button per item (× or trash icon)
- [ ] Empty state: "Your wishlist is empty" message with link to browse

#### 17. Address Book — `views/webstore/addressBook.html`
- [ ] List of saved addresses as cards (label, full name, address, phone)
- [ ] "Default" badge on one address
- [ ] "Edit" and "Delete" buttons per address
- [ ] "Add New Address" button → shows form (inline or modal)
- [ ] Mock 2-3 addresses

#### 18. FAQ — `views/webstore/faq.html`
- [ ] Bootstrap Accordion with 8-10 questions
- [ ] Topics: shipping, returns, payment methods, account, order tracking
- [ ] Click question to expand answer

#### 19-20. Login & Register — `views/webstore/login.html` + `views/webstore/register.html`
- [ ] Login: email + password inputs, "Login" button, "Don't have an account? Register" link
- [ ] Register: username + email + password + confirm password, "Register" button
- [ ] Client-side validation with jQuery (check empty fields, email format, password match)
- [ ] Error messages styled with Bootstrap `.alert-danger`

#### 21. Account Profile — `views/webstore/account.html`
- [ ] Display: username, email, phone (mock data)
- [ ] "Edit Profile" form: name, email, phone (pre-filled)
- [ ] "Change Password" section: current password, new password, confirm
- [ ] "Save" button per section

#### 22. Search Results — `views/webstore/search-results.html`
- [ ] "Search results for: [search term]" heading
- [ ] Product grid (same layout as category page)
- [ ] Mock 5-8 results
- [ ] Empty state: "No results found for [term]" with suggestions

---

### Back-office Pages (8 pages)

#### 1. Admin Login — `views/backoffice/login.html`
- [ ] Email + password form, "Login" button
- [ ] Different styling from customer login (darker theme or sidebar layout)

#### 2. Dashboard — `views/backoffice/dashboard.html`
- [ ] Admin sidebar navigation (links to all admin pages)
- [ ] Stat cards: Total Orders, Total Revenue, Total Customers, Total Products
- [ ] Recent orders table (last 5-10 orders)
- [ ] Mock data for stats and orders

#### 3. Category Management — `views/backoffice/categories.html`
- [ ] Admin sidebar
- [ ] Table: category name, product count, visibility toggle (switch), actions (Edit/Delete)
- [ ] "Add Category" button → modal or inline form
- [ ] Edit button → editable row or modal
- [ ] Delete button → Bootstrap confirmation modal
- [ ] Visibility toggle → Bootstrap switch (on/off)

#### 4. Product Management — `views/backoffice/products.html`
- [ ] Admin sidebar
- [ ] Category filter dropdown at top
- [ ] Table: thumbnail, product name, price, category, actions (Edit/Delete)
- [ ] "Add Product" button → links to inventory.html
- [ ] Mock 10-15 products in table

#### 5. Add/Edit Product — `views/backoffice/inventory.html`
- [ ] Admin sidebar
- [ ] Form: product name, description (textarea), price, category (dropdown), format attributes (checkboxes)
- [ ] Image upload area (drag & drop or file input with preview)
- [ ] "Save Product" button
- [ ] For "Edit" mode, form is pre-filled with mock data

#### 6. Customer Management — `views/backoffice/customers.html`
- [ ] Admin sidebar
- [ ] Table: username, email, registration date, order count
- [ ] Search/filter input
- [ ] Click row → expand to show customer details
- [ ] Mock 8-10 customers

#### 7. Orders Management — `views/backoffice/orders.html`
- [ ] Admin sidebar
- [ ] Filter by status: All / Pending / Completed / Cancelled
- [ ] Table: order #, customer, total, date, status badge, actions
- [ ] Click row → expand to show order items
- [ ] Status dropdown to change order status (mock, no server)
- [ ] Mock 10+ orders with mixed statuses

#### 8. Admin Profile — `views/backoffice/adminProfile.html`
- [ ] Admin sidebar
- [ ] Profile info (name, email, role)
- [ ] Edit form + change password (same layout as customer profile)

---

## Phase A: JavaScript Logic (ทำตอนนี้)

> **Reminder**: ห้ามแก้ HTML structure หรือ CSS ที่มีอยู่
> เพิ่มแค่ JS files ใน `public/js/` และเพิ่ม `id`/`data-*` attributes บน HTML elements ที่จำเป็น
> ถ้าต้องเพิ่ม CSS เล็กน้อย (เช่น .active state) ให้เพิ่มต่อท้าย `public/css/style.css` เท่านั้น ห้ามแก้ rule เดิม

### JS Files to create/complete:

#### `public/js/pagination.js` — Client-side Pagination (SE262 requirement)
- ใช้กับ: allProducts, category-fiction, category-children, category-nonfiction, category-mystery, category-science, search-results
- Load ALL product cards ไว้ใน HTML แล้วใช้ jQuery show/hide
- แสดงครั้งละ 15 items ตามที่ SE262 กำหนด
- สร้างปุ่ม Previous / 1 / 2 / 3 / Next แบบ dynamic
- Highlight หน้าปัจจุบัน
- **ห้าม** reload หน้าหรือใช้ URL params
```javascript
$(document).ready(function () {
    const itemsPerPage = 15;
    const $items = $('.product-card');       // ← ตรวจสอบ class ที่ใช้จริงในโค้ดก่อน
    const $pagination = $('#pagination');     // ← ต้องมี container ใน HTML
    const totalPages = Math.ceil($items.length / itemsPerPage);
    let currentPage = 1;

    function showPage(page) {
        $items.hide();
        $items.slice((page - 1) * itemsPerPage, page * itemsPerPage).show();
        currentPage = page;
        renderPagination();
    }

    function renderPagination() {
        // สร้างปุ่มตามจำนวนหน้า, highlight currentPage
        // ใช้ Bootstrap pagination component ที่มีอยู่แล้วใน HTML
    }

    showPage(1);
    // NOTE: อ่าน HTML ที่มีอยู่ก่อน เพื่อดูว่า pagination container ใช้ class/id อะไร
});
```

#### `public/js/cart.js` — Shopping Cart (localStorage)
- ใช้กับ: product-detail (add to cart), cart (view/edit), navbar (badge count)
- เก็บข้อมูลใน localStorage เพื่อ persist ข้าม page
- Functions ที่ต้องมี:
  - `addToCart(productId, name, price, image, quantity, attributes)` — เพิ่มสินค้า
  - `removeFromCart(index)` — ลบสินค้า
  - `updateQuantity(index, newQty)` — แก้จำนวน → คำนวณ line total + grand total ใหม่
  - `getCart()` — return array ของ cart items
  - `clearCart()` — ล้างตะกร้า (หลัง checkout)
  - `getCartCount()` — return จำนวน items (สำหรับ badge บน navbar)
  - `getCartTotal()` — return ราคารวม
- cart.html: render cart items จาก localStorage, ปุ่ม +/- update ได้ real-time
- product-detail.html: ปุ่ม "Add to Cart" → เพิ่มสินค้าพร้อม attributes (format) ที่เลือก
- navbar: cart badge count update ทุกหน้า
- **Toast notification** เมื่อเพิ่มสินค้าสำเร็จ (ใช้ Bootstrap Toast ที่มีอยู่ หรือเพิ่ม toast container ถ้ายังไม่มี)

#### `public/js/wishlist.js` — Wishlist (localStorage)
- ใช้กับ: product-detail, productCard (heart icon), wishlist page
- Functions ที่ต้องมี:
  - `toggleWishlist(productId, name, price, image)` — เพิ่ม/ลบ toggle
  - `isInWishlist(productId)` — return boolean
  - `getWishlist()` — return array
  - `removeFromWishlist(productId)` — ลบ
- Heart icon toggle: filled (♥) = in wishlist, outline (♡) = not in wishlist
- wishlist.html: render items จาก localStorage, ปุ่ม "Add to Cart" + "Remove"
- navbar: wishlist badge count update ทุกหน้า

#### `public/js/search.js` — Product Search
- ใช้กับ: navbar search bar → search-results.html
- จับ form submit → redirect ไป search-results.html?q=xxx
- search-results.html: อ่าน query param → filter product cards ด้วย jQuery (match product name)
- แสดง "Search results for: [term]" + จำนวนผลลัพธ์
- ถ้าไม่เจอ → แสดง empty state

#### `public/js/checkout.js` — Checkout Flow
- ใช้กับ: checkout.html, choosePayment.html
- checkout.html: ดึง cart items จาก localStorage → render order summary
- เลือก address → เก็บใน sessionStorage
- choosePayment.html: เลือก payment method → "Confirm" → clearCart() → redirect to orderHistory or success message

#### `public/js/account.js` — Account Pages
- ใช้กับ: profile, addressBook, orderHistory
- addressBook.html: CRUD addresses ใน localStorage (add/edit/delete, set default)
- account.html: client-side form validation (ยังไม่ส่งจริง)
- orderHistory.html: ดึง completed orders จาก localStorage (เก็บตอน checkout confirm)

#### `public/js/main.js` — Homepage & Global
- ใช้กับ: home.html + ทุกหน้า
- Homepage interactive techniques (5+ ตามที่ SE262 กำหนด):
  1. Carousel — อาจมี Bootstrap JS อยู่แล้ว, ตรวจสอบว่าทำงานได้
  2. Hover effects — อาจทำด้วย CSS แล้ว, เพิ่ม JS ถ้าต้องการ
  3. Scroll animations — fade-in on scroll (IntersectionObserver or jQuery)
  4. Dynamic tabs — switch product sections
  5. Modal quick-view — คลิก product → แสดง modal
- navbar: cart badge + wishlist badge update on page load
- search bar: submit handler

#### `public/js/validation.js` — Form Validation
- ใช้กับ: login, register, account, addressBook, inventory (admin)
- Client-side validation ด้วย jQuery:
  - Empty field check
  - Email format check
  - Password match (register)
  - Min/max length
- แสดง error ด้วย Bootstrap `.alert-danger` หรือ `.invalid-feedback`

#### `public/js/admin.js` — Admin Interactions
- ใช้กับ: ทุกหน้าใน views/backoffice/
- Delete confirmation: Bootstrap Modal → confirm → ลบ row จาก DOM
- Category hide/show toggle: Bootstrap Switch → toggle visibility
- Product table: filter by category dropdown
- Order status change: dropdown → update badge color
- ทั้งหมดเป็น client-side mock (ยังไม่ส่ง server)

### JS Implementation Rules

- **อ่าน HTML ที่มีอยู่ก่อนเสมอ** → ดูว่า element ใช้ class/id อะไร แล้ว hook เข้าไป
- **ห้ามเปลี่ยน class หรือ id ที่มีอยู่** → ถ้าต้องการ hook point ใหม่ ให้เพิ่ม `data-*` attribute
- ใช้ jQuery `$('.selector').on('click', ...)` ไม่ใช่ inline `onclick=""`
- ใช้ `const` / `let` ไม่ใช่ `var`
- ทุก function ที่ใช้ข้าม page (cart, wishlist) ต้อง export ผ่าน global object หรือเรียกใน `$(document).ready()`

---

## Phase B: HTML → EJS Conversion (ทำหลัง Phase A หรือเมื่อ back-end พร้อม)

> **Reminder**: ห้ามแก้ HTML structure หรือ CSS — แค่เพิ่ม EJS tags เข้าไป

### Step-by-step conversion process:

#### Step 1: Rename files
```bash
# Rename ทุกไฟล์จาก .html → .ejs (ไม่แก้เนื้อหา)
cd views/webstore && for f in *.html; do mv "$f" "${f%.html}.ejs"; done
cd ../backoffice && for f in *.html; do mv "$f" "${f%.html}.ejs"; done
cd ../partials && for f in *.html; do mv "$f" "${f%.html}.ejs"; done
```

#### Step 2: Fix static asset paths
```bash
# Find & replace ทุกไฟล์ (ทำครั้งเดียว)
# เปลี่ยน relative paths → absolute paths สำหรับ Express static serving
../../public/css/  →  /css/
../../public/js/   →  /js/
../../public/images/  →  /images/
```

#### Step 3: Replace navbar/footer copies with includes
```ejs
<!-- ลบ copy-pasted navbar code ทั้งก้อน แล้วแทนด้วย: -->
<%- include('../partials/navbar') %>

<!-- ลบ copy-pasted footer code ทั้งก้อน แล้วแทนด้วย: -->
<%- include('../partials/footer') %>
```

#### Step 4: Replace mock data with EJS tags

ตาม `<!-- MOCK: xxx -->` comments ที่ทำไว้:

```ejs
<!-- BEFORE (mock data) -->
<!-- MOCK: product-list -->
<div class="card">
  <img src="/images/products/harry-potter.jpg">
  <h3>Harry Potter</h3>
  <p>350 Baht</p>
</div>

<!-- AFTER (EJS) -->
<% products.forEach(product => { %>
<div class="card">
  <img src="/images/products/<%= product.product_images[0] %>">
  <h3><%= product.product_name %></h3>
  <p><%= product.product_price %> Baht</p>
</div>
<% }); %>
```

#### Step 5: Add dynamic navbar elements
```ejs
<!-- ใน partials/navbar.ejs -->

<!-- Category dropdown: เปลี่ยนจาก hardcoded เป็น loop -->
<% categories.forEach(cat => { %>
  <li><a class="dropdown-item" href="/category/<%= cat.category_id %>"><%= cat.category_name %></a></li>
<% }); %>

<!-- User menu: เปลี่ยนจาก hardcoded เป็น if/else -->
<% if (user) { %>
  <span>Hi, <%= user.username %></span>
  <a href="/auth/logout">Logout</a>
<% } else { %>
  <a href="/auth/login">Login</a>
<% } %>

<!-- Cart badge -->
<span class="badge"><%= cartCount || 0 %></span>
```

#### Step 6: Conversion guide per page

| Page | What to convert | EJS tags needed |
|------|----------------|-----------------|
| home | Featured products | `forEach` loop over highlighted products |
| allCategories | Category grid | `forEach` loop over categories |
| allProducts | Product list | `forEach` products across all categories |
| category-*.html (5 files) | Product list + title | `forEach` products + `<%= category.category_name %>` |
| product-detail | All product info | `<%= product.xxx %>` for every field |
| cart | Cart items | `forEach` cart items (now from session, not localStorage) |
| checkout | Order summary + addresses | `forEach` items + `forEach` addresses |
| choosePayment | Order total | `<%= orderTotal %>` |
| condition | Almost nothing | `<%- include %>` only |
| orderHistory | Orders list | `forEach` orders + nested `forEach` items |
| wishlist | Saved products | `forEach` wishlist items |
| addressBook | Address list | `forEach` addresses |
| account | User info | `<%= user.xxx %>` prefill form |
| search-results | Results + term | `<%= searchTerm %>` + `forEach` results |
| login/register | Error messages only | `<% if (error) { %><%= error %><% } %>` |
| contact | Almost nothing | `<%- include %>` only |
| faq | Q&A list | `forEach` faqs (or keep hardcoded) |
| Admin pages | CRUD lists | `forEach` loops + form prefills |

---

## Data Field Names (agreed with back-end team)

Use these exact names so conversion is a simple find & replace:

| Entity    | Fields                                                                          |
| --------- | ------------------------------------------------------------------------------- |
| User      | `user_id`, `username`, `email`, `phone`, `role`                                 |
| Category  | `category_id`, `category_name`, `category_image`, `is_visible`                  |
| Product   | `product_id`, `category_id`, `product_name`, `product_description`, `product_price`, `product_images`, `product_attributes` |
| Cart Item | `cart_item_id`, `product_id`, `quantity`, `selected_attributes`                  |
| Order     | `order_id`, `user_id`, `total_price`, `payment_method`, `status`, `created_at`  |
| Address   | `address_id`, `label`, `full_name`, `phone`, `address_line`, `city`, `province`, `postal_code`, `is_default` |
| Wishlist  | `wishlist_id`, `user_id`, `product_id`                                          |
| FAQ       | `faq_id`, `question`, `answer`                                                  |

---

## Code Style

- **Read existing code first** — match indentation, naming, class conventions exactly
- Use semantic HTML5: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- Use Bootstrap grid: `container` → `row` → `col-*` for layout
- Use Bootstrap utility classes for spacing: `mt-3`, `mb-4`, `p-3`, `gap-3`
- New CSS additions go at the END of `public/css/style.css` — never modify existing rules
- All interactive behavior in separate `.js` files in `public/js/` (not inline `onclick`)
- jQuery for DOM manipulation: `$('.selector').on('click', ...)` pattern
- Use `const` and `let`, never `var`
- Keep JavaScript modular: one file per feature area

---

## Git Workflow

- Commit after completing each JS feature or EJS conversion (do NOT ask before committing)
- Commit message format:
  - `feat(js): add cart localStorage logic`
  - `feat(js): add pagination to category page`
  - `feat(ejs): convert product-detail to EJS`
  - `fix(js): cart total calculation`
- Push to GitHub after each major feature

---

## Development Order (recommended)

### Phase A: JavaScript
1. `cart.js` + `wishlist.js` — core data layer (localStorage)
2. `main.js` — navbar badge updates, homepage interactivity
3. `pagination.js` — category/search page pagination
4. `search.js` — search functionality
5. `checkout.js` — checkout flow
6. `account.js` — address book, order history
7. `validation.js` — form validation
8. `admin.js` — admin page interactions

### Phase B: EJS Conversion
1. Partials first (navbar, footer) — biggest impact, affects all pages
2. Static pages (contact, faq, login) — easiest conversion
3. Product pages (category pages, product-detail, search-results) — main loops
4. Cart + checkout flow — switch from localStorage to session
5. Account pages — connect to user session
6. Admin pages — CRUD with DB data
