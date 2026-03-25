require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Global middleware: make user + counts available to all templates
const cartModel = require('./models/cartModel');
const wishlistModel = require('./models/wishlistModel');

app.use(async (req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.cartCount = 0;
    res.locals.wishlistCount = 0;

    if (req.session.user) {
        try {
            res.locals.cartCount = await cartModel.getCount(req.session.user.user_id);
            res.locals.wishlistCount = await wishlistModel.getCount(req.session.user.user_id);
        } catch (err) {
            // Silently fail — badge just shows 0
        }
    }
    next();
});

// Routes
const webstoreRoutes = require('./routes/webstore');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const accountRoutes = require('./routes/account');
const backofficeRoutes = require('./routes/backoffice');

app.use('/', webstoreRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', cartRoutes);
app.use('/account', accountRoutes);
app.use('/backoffice', backofficeRoutes);

// 404
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
