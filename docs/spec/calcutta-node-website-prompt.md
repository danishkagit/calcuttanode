# CALCUTTA NODE — Full Website Build Prompt
### (Paste this whole document into Claude Code / Cursor / Aider / OpenCode as the project brief)

---

## 0. HOW TO USE THIS DOCUMENT

This is a **master prompt**. Feed it to your AI coding agent (Claude Code, Cursor, Aider, etc.) in one go, or section by section (Section 1 → Section 12) if the agent struggles with a huge prompt. Ask the agent to **first generate the folder structure and README.md**, then build feature by feature, committing after each working feature.

---

## 1. PROJECT BRIEF (give this to the AI agent verbatim)

> Build a full-stack, animated, production-ready website called **"Calcutta Node"** for an IT services & digital growth agency, using the **MERN stack** (MongoDB, Express.js, React, Node.js). The site must be visually "ultra-level" — smooth scroll-triggered animations, micro-interactions, a modern dark/glassmorphism-friendly design, and fast load times. It must include a public marketing site, a searchable blog engine, curated tool/course directories, a pricing page, and a full user auth + dashboard + wallet + multi-method payment system. Every file must be commented for a non-professional developer to understand and edit later. A root-level `MANUAL.md` (or `README.md`) must explain exactly which file/folder controls which piece of content, and how to change prices, blogs, tools, and courses without touching core logic.

---

## 2. TECH STACK (what to use, and why)

| Layer | Tool | Purpose |
|---|---|---|
| Frontend | **React 18 + Vite** | Fast dev/build, modern React |
| Styling | **Tailwind CSS** | Utility-first, fast to restyle later |
| Animation | **Framer Motion** (page/UI transitions) + **GSAP + ScrollTrigger** (scroll-based hero/section animations) | "Ultra-level" animated feel |
| 3D/extra flair (optional) | **Three.js / React Three Fiber** | Optional animated 3D hero background |
| State management | **Redux Toolkit** or **Zustand** | Dashboard/wallet state |
| Routing | **React Router v6** | SPA navigation |
| Backend | **Node.js + Express.js** | REST API |
| Database | **MongoDB Atlas (free tier)** + **Mongoose** | Data storage |
| Search | **MongoDB Atlas Search** (free tier, Lucene-based) or **Fuse.js** (client-side fallback, fully free, no server cost) | Blog search-as-you-type |
| Auth | **JWT** (access + refresh tokens) + **bcrypt** | Login/Register |
| File/image uploads | **Cloudinary free tier** | Blog images, avatars |
| Email | **Nodemailer + Gmail SMTP** or **Resend (free tier)** | OTP, password reset, contact form |
| Payments — Cards/NetBanking/UPI/QR | **Razorpay** (India-first, supports UPI, NetBanking, Cards, Wallets, and auto-generates UPI QR) — free to integrate, they take a transaction % only | Wallet top-up & service payments |
| Payments — Crypto | **NOWPayments** or **Coinbase Commerce** (both have free/no-monthly-fee plans, take a small % per transaction) | Optional crypto wallet top-up |
| Bank Transfer | Manual — show your bank details + UTR reference upload, admin approves manually | No fee, no gateway needed |
| Hosting (frontend) | **Vercel** (free tier) | React build hosting |
| Hosting (backend) | **Render.com free tier** or **Railway free tier** | Express API hosting |
| Hosting (DB) | **MongoDB Atlas free tier (M0)** | 512MB free forever |
| Domain | Namecheap/Hostinger (only paid item, ~₹700–1000/yr) | calcuttanode.com |
| Version control | **Git + GitHub** | Track changes |
| Process/env management | **dotenv** | Keep secrets out of code |
| Rate limiting/security | **express-rate-limit, helmet, cors, express-validator** | Basic security hygiene |

> ⚠️ Note on crypto payments: crypto payment processing has evolving regulatory requirements in India. Before going live with the crypto option, check current RBI/compliance guidance — this is a business/legal decision, not a coding one.

---

## 2.1 BRAND IDENTITY & COLOR SYSTEM (matches the official Calcutta Node logo — do not substitute other colors)

The logo is a dark hexagon badge with a glowing circuit-board motif — the whole site's palette must be pulled directly from it, not from generic "tech site" blue/purple defaults.

**Core palette (add these as custom Tailwind colors, not one-off hex codes scattered through components):**

| Token name | Hex (approx.) | Where it's from in the logo | Use it for |
|---|---|---|---|
| `background` | `#171A26` | The dark navy-charcoal fill behind the hexagon | Page background, dark-mode base, dashboard shell |
| `surface` | `#20243363` | Slightly lighter than background | Cards, modals, nav bar (with slight transparency for a glass effect) |
| `neon-cyan` | `#2EE6E6` | The glowing turquoise/cyan of "CALCUTTA" and the hexagon's inner edge | Primary accent — headings, active nav links, button text, icon strokes, the circuit-line details |
| `electric-violet` | `#8B3DF7` | The purple/violet outer hexagon border | Secondary accent — borders, hover glows, gradient partner to cyan, "NODE" wordmark tone |
| `text-primary` | `#EAF6F6` | Off-white, for body copy on the dark background | Paragraph text, labels |
| `text-muted` | `#8B93A7` | Softer gray-blue | Secondary text, placeholders, footnotes |

**Signature gradient** (use this exact direction/stops everywhere a "brand gradient" is called for — buttons, active states, hero glow, loading bars):

```css
background: linear-gradient(135deg, #2EE6E6 0%, #8B3DF7 100%);
```

**Neon glow effect** (recreate the logo's glow on key elements — hero heading, primary CTA button hover, active nav item):

```css
text-shadow: 0 0 8px rgba(46, 230, 230, 0.6), 0 0 20px rgba(46, 230, 230, 0.35);
/* swap the rgba to electric-violet (139, 61, 247) for purple-glow variants */
```

**Design rules to give the agent explicitly:**
- Tailwind config must extend `theme.colors` with these exact tokens (`background`, `surface`, `neon-cyan`, `electric-violet`, `text-primary`, `text-muted`) — never hardcode raw hex in component files, always reference the token (e.g., `text-neon-cyan`, `border-electric-violet`)
- Buttons/CTAs: cyan-to-violet gradient background (per the signature gradient above), white or `text-primary` label text, with the neon glow on hover only (keep it subtle at rest, more visible on hover/focus — this keeps it premium rather than gaudy)
- Section dividers, card borders, and the loading/progress states should use thin `electric-violet` or `neon-cyan` lines to echo the logo's circuit-board line-and-node motif — small filled dots at line intersections is a nice subtle callback to the logo's circuit nodes, use sparingly (e.g., section dividers, timeline steps on the About page)
- Keep large body-text areas on `text-primary`/`text-muted` over `background` — never put long paragraphs directly on neon cyan or violet, that's for accents and short labels only, for readability and to avoid looking like a low-effort neon template
- Dashboard and all pages should default to this dark theme — do not build a separate light theme unless you explicitly ask for one later

**Logo file placement:**
- Save the uploaded logo as `client/src/assets/logo.png` (and export an `.svg` version if you can, for crisp scaling in the navbar at small sizes)
- Use it in the Navbar (top-left, moderate size, not stretched) and as the favicon (generate a simplified/cropped version for the small favicon size — the full circuit detail won't read well at 16×16/32×32)
- Note this exact placement in `MANUAL.md` under a new "How to change the logo" entry: *"Replace `client/src/assets/logo.png` with your new file (keep the same filename, or update the import in `Navbar.jsx` and `Footer.jsx` if you rename it)."*

---

## 3. FOLDER STRUCTURE (agent must generate exactly this, and MANUAL.md must reference these paths)

```
calcutta-node/
├── MANUAL.md                      ← "how to change things" guide (Section 9 below)
├── README.md                      ← technical setup guide
├── .env.example
├── client/                        ← React frontend
│   ├── src/
│   │   ├── assets/                ← logos, icons, images
│   │   ├── components/
│   │   │   ├── common/            ← Navbar, Footer, Loader, Button, Card
│   │   │   ├── home/               ← Hero, ServicesGrid, Testimonials
│   │   │   ├── blog/               ← BlogCard, BlogSearchBar, BlogFilterTags
│   │   │   ├── tools/              ← ToolCard, ToolsGrid
│   │   │   ├── courses/            ← CourseCard, CourseFilters
│   │   │   ├── pricing/            ← PricingTable, PricingCard
│   │   │   ├── dashboard/          ← Sidebar, WalletCard, PaymentModal, ServiceOrderCard
│   │   │   └── auth/               ← LoginForm, RegisterForm
│   │   ├── data/                   ← ⭐ EDIT-ME JSON/JS files (Section 9)
│   │   │   ├── services.js         ← all services + prices
│   │   │   ├── blogs.js            ← fallback/seed blog list (real blogs live in DB)
│   │   │   ├── seoTools.js         ← free/open-source SEO & marketing tools list
│   │   │   ├── courses.js          ← seed course list
│   │   │   └── companyInfo.js      ← name, address, email, phone, socials
│   │   ├── pages/                  ← one file per route (Home, Blogs, BlogDetail, Tools, Courses, Pricing, About, Contact, Login, Register, Dashboard)
│   │   ├── context/ or store/       ← Redux/Zustand store (auth, wallet)
│   │   ├── hooks/                  ← useAuth, useFetch, useDebounce (for search)
│   │   ├── utils/                  ← api.js (axios instance), animationVariants.js
│   │   ├── styles/                 ← globals.css, tailwind config
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                         ← Express backend
│   ├── config/
│   │   ├── db.js                   ← MongoDB connection
│   │   └── cloudinary.js
│   ├── models/                     ← User.js, Blog.js, Order.js, Wallet.js, Transaction.js, Service.js
│   ├── routes/                     ← authRoutes.js, blogRoutes.js, serviceRoutes.js, paymentRoutes.js, dashboardRoutes.js
│   ├── controllers/                ← matching *.controller.js per route file — ⭐ business logic lives here
│   ├── middleware/                 ← authMiddleware.js, errorHandler.js, rateLimiter.js
│   ├── utils/                      ← sendEmail.js, generateToken.js
│   ├── seed/                       ← seedBlogs.js, seedTools.js, seedCourses.js (run once to populate DB)
│   ├── server.js
│   └── package.json
└── docs/
    └── screenshots/                ← for your own reference
```

---

## 4. PAGES & FEATURES — FULL SPEC

### 4.1 Home Page
- Animated hero (GSAP scroll-triggered text reveal + subtle particle/gradient background)
- "Services" grid — cards for: Remote IT Support (Windows/Linux/macOS/Android via AnyDesk, TeamViewer, Chrome Remote Desktop), Data Recovery (HDD/SSD/NVMe), Website Development, UI/UX Design, Graphics Design, Digital Marketing, Performance Marketing, Gaming Error Troubleshooting, OS Installation, OS Environment Errors, Network Issues (all OS)
- Trust section (reviews/testimonials — placeholder until you have real ones)
- CTA buttons → Pricing / Contact / Book a Session

### 4.2 Blog System (Navbar → "Blog")
- Search bar at top — as user types, debounce (300ms) → query backend `/api/blogs/search?q=` → backend does MongoDB Atlas Search (or regex fallback) across `title`, `tags`, `content` → **most relevant results shown first** (use Atlas Search's relevance score, or a simple weighted score: title match > tag match > content match)
- **Before any search is typed**: show a default feed sorted by `views` (descending) — i.e., "trending/viral" posts first. Seed this with blog posts about: free internet/computer usage hacks, AnyDesk/TeamViewer tricks, Windows/Linux troubleshooting tips, SEO/marketing tips — tied back to your services.
- Each blog result links to a full `BlogDetail` page.
- Admin-only route (protected, not public) to create/edit/delete blog posts — simple rich text editor (use `react-quill`, free).
- Track `views` count on each blog open (increment in DB) to power the "trending" sort.

### 4.3 SEO & Digital Marketing Tools Directory (Navbar → "Free Tools")
- Animated grid/card layout (stagger animation on scroll, Framer Motion)
- Each card: tool name, logo, one-line description, category tag (SEO / Social Media / Analytics / Design / Content), and a link to the tool
- Data source: `client/src/data/seoTools.js` (see Section 9 for exact format) — pre-fill with genuinely free/open-source tools, e.g.:
  - SEO: Google Search Console, Google Keyword Planner, Ubersuggest (free tier), AnswerThePublic (free tier), Screaming Frog (free up to 500 URLs)
  - Social scheduling: Buffer (free tier), Hootsuite (free tier)
  - Analytics: Google Analytics, Microsoft Clarity
  - Design: Canva (free), GIMP (open source), Figma (free tier)
  - **Verify each tool's current free-tier terms yourself before publishing — free-tier limits change often.**

### 4.4 Free/Paid Courses Directory (Navbar → "Courses")
- Filters (as dropdown/toggle chips, animated): **Price** (Free / Paid), **Certificate** (With / Without), **Rating** (sort), **Language** (English / Hindi / Urdu / Bengali), **Platform** (edX, CS50/Harvard, CodeWithHarry, freeCodeCamp, Coursera, Udemy, YouTube, etc.)
- Data source: `client/src/data/courses.js` — each entry has `{title, platform, price, isFree, hasCertificate, rating, language, link, category}`
- Sort logic default: rating descending, then free-first
- Card layout with platform logo, animated hover-lift effect

### 4.5 Pricing Page
- Service-category tables (Remote Support / Data Recovery / Web Dev / Design / Marketing / Troubleshooting)
- **You must manually research 3–5 competitors within ~30km of Champdani, Hooghly** and set your listed price ₹X below the lowest — the agent cannot browse local shops for you. Leave this as a clearly marked TODO/edit point in `client/src/data/services.js`.
- Show features included per tier (e.g., Basic/Standard/Priority support)

### 4.6 About Us Page
- Story of Calcutta Node, mission, founder note (Danish Shoaib), stylish animated timeline/stat counters

### 4.7 Contact Us Page
- Company: **Calcutta Node**
- Address: 15, Dr. Noorie Lane No. 1, Champdani, Hooghly, West Bengal – 712222
- Email: Dnsh00786@gmail.com
- Phone: 8584885450
- Instagram: danish_shoaib | Facebook: Dan7860
- Embedded Google Map (free, no API key needed for basic iframe embed)
- Contact form → sends email via Nodemailer

### 4.8 Auth (Login/Register)
- Register: name, email, phone, password (bcrypt hashed), optional referral code
- Login: JWT access token (short-lived) + refresh token (httpOnly cookie)
- Forgot password flow via emailed reset link

### 4.9 User Dashboard
- Sidebar nav: Overview, My Orders, Wallet, Book a Service, Profile, Support Tickets
- **Overview**: quick stats (active orders, wallet balance, last activity) — animated counters
- **Wallet**: balance display, "Add Money" button → opens payment modal
- **Payment Modal** — tabs for: UPI (QR code auto-generated via Razorpay), NetBanking, Card, Bank Transfer (manual, shows account details + UTR upload for admin verification), Crypto (NOWPayments/Coinbase widget)
- **Book a Service**: pick service from `services.js` → price auto-fills from wallet or triggers a top-up if insufficient
- **Transaction history** table with status (pending/success/failed)
- Whole dashboard styled with soft shadows, rounded-2xl cards, smooth page transitions (Framer Motion `AnimatePresence`)

---

## 5. DATABASE MODELS (MongoDB / Mongoose — high level)

- `User`: name, email, phone, passwordHash, role (user/admin), walletBalance, createdAt
- `Wallet`/`Transaction`: userId, amount, type (credit/debit), method (upi/card/netbanking/crypto/bank_transfer), status, gatewayRefId, createdAt
- `Order`/`ServiceBooking`: userId, serviceId, priceAtBooking, status (pending/in-progress/completed/cancelled), remoteAccessNotes
- `Blog`: title, slug, content, tags[], category, coverImage, views, createdAt, author
- `Service`: name, category, description, price, features[]

---

## 6. ANIMATION GUIDELINES (tell the agent this explicitly)

- Use **Framer Motion** for: route transitions, card hover/tap states, modal open/close, staggered list reveals
- Use **GSAP + ScrollTrigger** for: hero section scroll-linked animation, section-by-section fade/slide-in as user scrolls
- Keep animations **60fps-safe** — animate `transform` and `opacity` only, avoid animating `width`/`height`/`top`/`left` directly
- Respect `prefers-reduced-motion` media query — disable heavy animation for users who've turned it off (accessibility)
- Keep total JS bundle in mind — lazy-load GSAP/Three.js only on pages that use them (`React.lazy` + code splitting)

---

## 7. SECURITY & CODE QUALITY REQUIREMENTS (tell the agent this explicitly)

- Every `.js`/`.jsx` file must have a **top-of-file comment block** explaining what the file does
- Every function must have a **one-line comment** above it explaining its purpose
- All API routes must validate input (`express-validator`) before touching the DB
- Passwords never stored/logged in plaintext
- `.env` file must hold: `MONGO_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NOWPAYMENTS_API_KEY`, `CLOUDINARY_*`, `EMAIL_USER`, `EMAIL_PASS` — never commit `.env`, only `.env.example` with blank values
- Add `helmet`, `cors` (restricted to your frontend domain), and `express-rate-limit` on auth & payment routes

---

## 8. BUILD ORDER (tell the agent to build in this order, testing after each)

1. Scaffold folder structure + `MANUAL.md` + `README.md`
2. Backend: DB connection, User model, Auth routes (register/login/JWT)
3. Frontend: Navbar, Footer, routing skeleton, Home page (static, no animation yet)
4. Add Tailwind + basic responsive layout for all pages (static content)
5. Wire up Auth (Login/Register pages ↔ backend)
6. Build Dashboard skeleton (protected route, sidebar, wallet UI - no real payments yet)
7. Integrate Razorpay test mode (UPI/Card/NetBanking) in sandbox
8. Integrate manual Bank Transfer flow
9. Integrate crypto gateway (test mode)
10. Build Blog model + seed data + search endpoint + BlogSearchBar (debounced)
11. Build SEO Tools page from `seoTools.js`
12. Build Courses page + filters from `courses.js`
13. Build Pricing page from `services.js`
14. Add all animations (Framer Motion + GSAP) last, once functionality works
15. Final polish: SEO meta tags, favicon, mobile responsiveness pass, Lighthouse performance check

---

## 9. MANUAL.md CONTENT (the agent must generate this file — this is what YOU will read to make changes later)

Tell the agent to create `MANUAL.md` at the project root containing **at minimum** these sections, in plain language:

```markdown
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
[paste the folder structure from Section 3 here]
```

---

## 10. WHAT YOU STILL NEED TO DO YOURSELF (not code — business decisions)

- Research 3–5 local competitors' prices within 30km of Champdani/Hooghly and set your final numbers in `services.js`
- Create real Razorpay, NOWPayments/Coinbase Commerce, Cloudinary, and MongoDB Atlas accounts (all free to sign up) and drop the API keys into `.env`
- Write/collect your first 10–15 real blog posts (or let the agent draft drafts for your review — always fact-check before publishing)
- Take real screenshots/testimonials once you have your first customers
- Double-check current compliance requirements before enabling crypto payments in India

---

## 11. SAMPLE FIRST MESSAGE TO SEND YOUR AI CODING AGENT

> "Read the attached MANUAL/spec (calcutta-node-website-prompt.md). Start with Section 8, Build Order, Step 1: scaffold the full folder structure exactly as in Section 3, and generate the initial MANUAL.md and README.md as described in Section 9. Comment every file. Confirm the structure with me before writing any page logic."

---

## 12. OPTIONAL "AI-POWERED" EXTRA POLISH (nice-to-haves, add later)

- A small on-site chat widget (free: Tawk.to) for instant visitor queries
- An AI FAQ/chatbot on the site using the Anthropic API (Claude) to answer common IT-support questions — you already have API experience from your other projects, this reuses that
- Personalized dashboard greeting ("Good evening, Danish 👋") and service recommendations based on past orders
