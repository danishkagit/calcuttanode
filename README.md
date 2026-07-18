# Calcutta Node — Digital Agency Ecosystem

Full-stack digital agency ecosystem built by **Danish Shoaib**. Three interconnected surfaces serving one unified brand.

---

## Simplified Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    THE ECOSYSTEM MAP                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  🌐 danish-portfolio (GitHub Pages)                                 │
│  https://danishkagit.github.io/portfolio/                           │
│  ┌──────────────────────────────────────┐                           │
│  │  Personal Portfolio                  │                           │
│  │  → Terminal-themed, Matrix-rain bg   │                           │
│  │  → AI Chat widget (→ API)            │                           │
│  │  → Contact form (→ API, not FormSubmit) │                        │
│  │  → Resume download (→ API)           │                           │
│  │  → Dynamic services (fetched from API)│                          │
│  └──────────┬───────────────────────────┘                           │
│             │ API calls                                              │
│             ▼                                                        │
│  🖥️ Calcutta Node Server (Render)                                   │
│  https://calcuttanode-api.onrender.com                              │
│  ┌──────────────────────────────────────┐                           │
│  │  Express API                         │                           │
│  │  → Auth (/api/auth)                  │                           │
│  │  → Services (/api/services)          │                           │
│  │  → AI Chat (/api/ai)                 │                           │
│  │  → Payments (/api/payments)          │                           │
│  │  → Resume (/api/resume)              │  ← NEW                    │
│  │  → +10 more route modules            │                           │
│  └──────────┬───────────────────────────┘                           │
│             │ Serves                                                   │
│             ▼                                                        │
│  🏢 Calcutta Node Client (Vercel)                                   │
│  https://calcuttanode.vercel.app                                    │
│  ┌──────────────────────────────────────┐                           │
│  │  React 19 SPA                        │                           │
│  │  → Agency website with 20+ pages     │                           │
│  │  → Dashboard, admin panel            │                           │
│  │  → Products, plans, pricing          │                           │
│  │  → Links to portfolio & resume       │  ← CROSS-LINKS ADDED      │
│  └──────────────────────────────────────┘                           │
│                                                                     │
│  📄 Resume.md (Single Source of Truth)                              │
│  → Served via /api/resume/download                                   │
│  → Linked from portfolio hero & agency site                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Cross-Link Map

| From | Link To | Purpose |
|------|---------|---------|
| Portfolio Hero | `Calcutta Node →` | Drives traffic to agency site |
| Portfolio Nav | `Products` | Direct link to digital products |
| Portfolio AI Chat | `/api/ai/chat` | Live AI assistant via agency backend |
| Portfolio Form | `/api/auth/contact` | Contact form via agency (was FormSubmit.co) |
| Agency About page | `View Portfolio` | Shows founder's personal brand |
| Agency Footer | `Founder's Portfolio` | Cross-links back to portfolio |
| Agency Nav (Company) | `Portfolio` + `Resume` | Easy access to founder materials |
| All surfaces | `/api/resume/download` | Centralized resume delivery |

## Quick Start

```bash
# 1. Install dependencies
cd server && npm install
cd ../client && npm install

# 2. Environment variables
cp .env.example server/.env
# Edit server/.env with your own values

# 3. Start backend (Terminal 1)
cd server && npm run dev

# 4. Start frontend (Terminal 2)
cd client && npm run dev

# 5. Open in browser
# http://localhost:5173
```

## Project URLs

| Service | Development | Production |
|---|---|---|
| Frontend (React SPA) | http://localhost:5173 | https://calcuttanode.vercel.app |
| Backend API | http://localhost:5000/api | https://calcuttanode-api.onrender.com/api |
| Portfolio | http://localhost (live server) | https://danishkagit.github.io/portfolio/ |
| MongoDB | mongodb://localhost:27017/calcuttanode | MongoDB Atlas |
| Resume Download | http://localhost:5000/api/resume/download | https://calcuttanode-api.onrender.com/api/resume/download |

## Seed Data

```bash
cd server
npm run seed:blogs     # Populate 20 blog posts
npm run seed:services  # Populate 17 IT services
npm run seed:products  # Populate 8 digital products
npm run seed:plans     # Populate 3 subscription plans
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend (Agency) | React 19, Vite 8, Tailwind CSS v4, Framer Motion |
| Portfolio | Vanilla HTML, CSS, JS — no build step |
| Backend | Node.js, Express.js, Mongoose |
| Database | MongoDB (local dev / Atlas prod) |
| Auth | JWT (access + refresh tokens), bcrypt, Google OAuth |
| Payments | Razorpay + manual bank transfer |
| AI Chat | OpenCode Zen API (multi-model fallback) |
| Hosting | Vercel (frontend) + Render (backend) + GitHub Pages (portfolio) |

## Security

- Never commit `.env` — only commit `.env.example`
- Real API keys, passwords, and secrets go in your local `.env` file only
- `credentials.txt` at `D:\Danish\credentials.txt` — **CRITICAL: delete or move to secure storage**
- See `MANUAL.md` for editing content and configuration

## Changes Made

### `danish-portfolio` (D:\danish-portfolio\)
- Contact form now submits to Calcutta Node API (`/api/auth/contact`) instead of FormSubmit.co
- Added phone field to contact form
- Added resume download button in hero section
- Featured Work section now fetches live data from `/api/services`
- Form submission shows success/error status inline

### `Calcutta Node Server`
- Added `https://danishkagit.github.io` to CORS allowed origins
- Added `/api/resume/download` endpoint serving `Resume.md`
- Added `fileURLToPath` + `path` imports for proper ESM `__dirname`

### `Calcutta Node Client`
- Added Portfolio + Resume links to Navbar Company dropdown
- Added Resume download button in About page founder section
- Footer already links to founder's portfolio
