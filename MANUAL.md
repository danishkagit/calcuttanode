# Calcutta Node — Owner's Manual

## How to change prices
Open `client/src/data/services.js`. Each service is one object like:
{ id: "remote-support-basic", name: "...", price: 499, features: [...] }
Just change the `price` number and save. No other file needs touching.

## How to add/edit/remove a blog post
Two ways:
1. (Recommended) Log in as admin at /admin/blogs and use the editor.
2. Manually: open `server/seed/seedBlogs.js`, add an object to the array,
   then run `node seed/seedBlogs.js` once to push it to the database.

## How to add a new SEO/marketing tool to the Free Tools page
Open `client/src/data/seoTools.js` and add:
{ name: "Tool Name", category: "SEO", description: "...", link: "https://...", logo: "/assets/tools/x.png" }

## How to add a new course
Open `client/src/data/courses.js` and add:
{ title, platform, price, isFree, hasCertificate, rating, language, link, category }

## How to change contact info / address / socials
Open `client/src/data/companyInfo.js` — every page pulls from this one file.

## How to change the logo
Replace `client/src/assets/logo.png` with your new file (keep the same
filename, or update the import in `Navbar.jsx` and `Footer.jsx` if you
rename it). If you change the logo's colors significantly, also update
the color tokens in the Tailwind CSS config (see the Brand Identity section
of the build spec) so the rest of the site's gradients/glows stay matched.

## How to change the payment gateway keys
Open `.env` (never commit this file) and update:
RAZORPAY_KEY_ID=, RAZORPAY_KEY_SECRET=, NOWPAYMENTS_API_KEY=

## How to run the project locally
1. Make sure MongoDB Community Server is installed and running as a service
   on your machine (see the Local Setup Guide for install steps)
2. cd server && npm install && npm run dev
3. cd client && npm install && npm run dev
4. Visit http://localhost:5173

## How to view/edit your local database
Open **MongoDB Compass** (free desktop app) and connect to
`mongodb://localhost:27017`. You'll see the `calcuttanode` database with
collections like `users`, `blogs`, `transactions`, etc. — you can browse
and edit documents directly here if needed.

## How to deploy (only when you're ready to go live — optional, not needed for local dev)
Frontend → Vercel (connect GitHub repo, set build command `npm run build`)
Backend → Render.com (connect GitHub repo, add env vars in dashboard)
Database → create a MongoDB Atlas account, migrate your local data over
(via `mongodump`/`mongorestore` or MongoDB Compass's export/import), then
update MONGO_URI in your deployed backend's env vars to point to Atlas
instead of localhost

## Folder map (what lives where)
```
calcutta-node/
├── MANUAL.md                      ← This file
├── README.md                      ← Technical setup guide
├── .env.example
├── client/                        ← React frontend
│   ├── src/
│   │   ├── assets/                ← logos, icons, images
│   │   ├── components/
│   │   │   ├── common/            ← Navbar, Footer, Loader, Button, Card
│   │   │   ├── home/              ← Hero, ServicesGrid, Testimonials
│   │   │   ├── blog/              ← BlogCard, BlogSearchBar, BlogFilterTags
│   │   │   ├── tools/             ← ToolCard, ToolsGrid
│   │   │   ├── courses/           ← CourseCard, CourseFilters
│   │   │   ├── pricing/           ← PricingTable, PricingCard
│   │   │   ├── dashboard/         ← Sidebar, WalletCard, PaymentModal, ServiceOrderCard
│   │   │   └── auth/              ← LoginForm, RegisterForm
│   │   ├── data/                  ← EDIT-ME JSON/JS files
│   │   │   ├── services.js        ← all services + prices
│   │   │   ├── blogs.js           ← fallback/seed blog list
│   │   │   ├── seoTools.js        ← free SEO & marketing tools list
│   │   │   ├── courses.js         ← seed course list
│   │   │   └── companyInfo.js     ← name, address, email, phone, socials
│   │   ├── pages/                 ← one file per route
│   │   ├── context/               ← AuthContext
│   │   ├── hooks/                 ← custom hooks
│   │   ├── utils/                 ← api.js (axios instance)
│   │   ├── styles/                ← globals.css, tailwind config
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
├── server/                        ← Express backend
│   ├── config/
│   │   ├── db.js                  ← MongoDB connection
│   │   └── multerConfig.js        ← local disk upload config
│   ├── models/                    ← User.js, Blog.js, Order.js, Wallet.js, Transaction.js
│   ├── routes/                    ← authRoutes.js, blogRoutes.js, etc.
│   ├── controllers/               ← Business logic per route
│   ├── middleware/                ← authMiddleware.js, errorHandler.js, rateLimiter.js
│   ├── utils/                     ← sendEmail.js, generateToken.js
│   ├── seed/                      ← seedBlogs.js
│   ├── uploads/                   ← local uploaded files (gitignored)
│   ├── server.js
│   └── package.json
└── docs/
    └── spec/                      ← Build specification documents
```
