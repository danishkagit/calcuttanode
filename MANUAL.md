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
the color tokens in `tailwind.config.js` (see the Brand Identity section
of the build spec) so the rest of the site's gradients/glows stay matched.

## How to change the payment gateway keys
Open `.env` (never commit this file) and update:
RAZORPAY_KEY_ID=, RAZORPAY_KEY_SECRET=, NOWPAYMENTS_API_KEY=

## How to run the project locally
1. cd server && npm install && npm run dev
2. cd client && npm install && npm run dev
3. Visit http://localhost:5173

## How to deploy
Frontend → Vercel (connect GitHub repo, set build command `npm run build`)
Backend → Render.com (connect GitHub repo, add env vars in dashboard)
Database → MongoDB Atlas (already cloud-hosted, just update MONGO_URI)

## Folder map (what lives where)
- MANUAL.md - Manual for editing
- README.md - Technical setup guide  
- .env.example - Environment variables template
- client/ - React frontend with all UI components, data files, and application logic
- server/ - Express backend with APIs, database models, and server configuration
- docs/screenshots/ - Reference screenshots for development team
