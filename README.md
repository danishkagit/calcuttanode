# Calcutta Node — Technical Setup Guide

Full-stack MERN website for Calcutta Node IT Services & Digital Growth Agency.

## Prerequisites

- **Node.js** (LTS) — check with `node -v`
- **MongoDB Community Server** installed and running locally on port 27017
- **MongoDB Compass** (optional, free GUI for your local database)

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

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| MongoDB | mongodb://localhost:27017/calcuttanode |

## Seed Data

```bash
cd server
npm run seed:blogs   # Populate blog collection
```

## Tech Stack

- **Frontend:** React 19, Vite 8, Tailwind CSS v4, Framer Motion
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Community Server (local)
- **Auth:** JWT (access + refresh tokens), bcrypt
- **Payments:** Razorpay (sandbox), manual bank transfer
- **Search:** Fuse.js (local, no cloud dependency)

## Security

- Never commit `.env` — only commit `.env.example`
- Real API keys, passwords, and secrets go in your local `.env` file only
- See `MANUAL.md` for editing content and configuration
