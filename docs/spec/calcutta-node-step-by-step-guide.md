# Calcutta Node — Complete Step-by-Step Starter Guide (Antigravity IDE)
### Copy-paste prompts included at every step. Do NOT skip ahead.

---

## PART A — ONE-TIME SETUP (before opening Antigravity)

Do these once, outside the IDE:

1. **Install Node.js** (LTS version) if not already installed — check with `node -v` in any terminal.
2. **Create free accounts** (all free-tier, no card needed for most):
   - GitHub — for your repo
   - MongoDB Atlas — free M0 cluster
   - Cloudinary — free tier, for image uploads
   - Razorpay — sign up, get **test mode** API keys first (no real money needed to build)
   - NOWPayments or Coinbase Commerce — only if you plan to wire up crypto now (can skip and add later)
3. **Create a new empty GitHub repo** called `calcutta-node`. Clone it locally.
4. **Open that folder in Antigravity IDE.**
5. **Open the integrated terminal** inside Antigravity.
6. Keep these two files open in a tab for reference while you work:
   - `calcutta-node-website-prompt.md` (the master spec)
   - `calcutta-node-antigravity-workflow.md` (the model-switching workflow)

   Copy both into your project folder as `/docs/spec/` so the agent can also read them directly instead of you re-pasting everything.

```bash
mkdir -p docs/spec
# then drop both .md files into docs/spec/
git add . && git commit -m "chore: add project spec docs"
```

---

## PART B — STEP 0: MODEL DISCOVERY

In the Antigravity terminal, with opencode zen active, paste this exact prompt:

```
We're building a project called Calcutta Node — a MERN stack IT services agency
website. The full spec is in docs/spec/calcutta-node-website-prompt.md and the
model-switching workflow is in docs/spec/calcutta-node-antigravity-workflow.md.
Read both files fully before responding.

Before we write any code: run /model, type "free", and list every free model
available to me right now, along with any visible details (context window size,
whether it's tagged coder/reasoning/fast/instruct). Do not start coding yet —
just report the list back to me.
```

✅ **Checkpoint:** The agent should give you a real list of free model names. Save that list somewhere (a note, or right at the top of `calcutta-node-antigravity-workflow.md`). Pick:
- One **fast/light** model for boilerplate
- One **strongest/reasoning** model for auth, payments, search, animation

Fill these two names into the workflow table (Section 2 of that file) before continuing.

---

## PART C — STEP 1: SCAFFOLDING

**Switch model:** North Mini Code Free (this is pure boilerplate)

```
/model
```
(select your fast/light model)

Then paste:

```
Starting Build Step 1 from the spec: project scaffolding.

Read docs/spec/calcutta-node-website-prompt.md, Section 3 (folder structure)
and Section 9 (MANUAL.md content) carefully.

Generate:
1. The exact folder structure from Section 3 (empty files are fine for now,
   just get the skeleton right)
2. A complete MANUAL.md at the project root, following the template in Section 9
3. A README.md with basic setup instructions (Node install, npm install, npm
   run dev for both client and server)
4. .env.example with all the variable names listed in Section 7 (blank values)

Do ONLY this step. Do not write any actual page logic, components, or backend
code yet. When done, list every file/folder you created so I can verify it
against Section 3 myself.
```

✅ **Checkpoint:** Open the file tree yourself and manually compare it against Section 3. If anything's missing or misnamed, tell the agent exactly what's wrong before moving on.

```bash
git add . && git commit -m "step 1: scaffolding + MANUAL.md + README.md"
```

---

## PART D — STEP 2: BACKEND AUTH (DB + User model + JWT)

**Switch model:** Nemotron 3 Ultra Free (security-sensitive)

```
/model
```

```
Starting Build Step 2: backend database connection, User model, and JWT
auth routes.

Read docs/spec/calcutta-node-website-prompt.md Section 5 (database models)
and Section 7 (security requirements) before writing anything.

Build only:
1. server/config/db.js — MongoDB connection using MONGO_URI from .env
2. server/models/User.js — per Section 5 fields, with bcrypt password hashing
3. server/routes/authRoutes.js + server/controllers/authController.js —
   register, login, refresh-token, and logout endpoints
4. server/middleware/authMiddleware.js — JWT verification middleware
5. Add express-validator input validation on register/login
6. Comment every file per Section 7's commenting requirement

Do not touch the frontend yet. When done, tell me exactly how to test this
with curl or Postman/Thunder Client before we move on.
```

✅ **Checkpoint:** Actually test register + login with the sample requests the agent gives you. Confirm a user appears in MongoDB Atlas before moving on.

```bash
git add . && git commit -m "step 2: backend auth (DB, User model, JWT)"
```

---

## PART E — STEP 3: NAVBAR/FOOTER/ROUTING + STATIC HOME PAGE

**Switch model:** North Mini Code Free

```
Starting Build Step 3: frontend routing skeleton + static Home page.

Read Section 4.1 (Home page) and Section 3 (folder structure) first.

Build:
1. client/src/components/common/Navbar.jsx and Footer.jsx (static, no
   animation yet, just correct nav links to all pages listed in the spec)
2. React Router setup in App.jsx with placeholder routes for: Home, Blogs,
   Tools, Courses, Pricing, About, Contact, Login, Register, Dashboard
3. A static (non-animated) Home.jsx with the services grid listing all
   services from Section 4.1, using dummy content — real prices come later
   from client/src/data/services.js (create that file now with placeholder
   entries per Section 9's format)

No Tailwind styling polish yet, no animation. Just get the structure and
routing working. Tell me the command to run the dev server and check it in
the browser.
```

✅ **Checkpoint:** Run the dev server, click through every nav link, confirm no broken routes.

```bash
git add . && git commit -m "step 3: routing skeleton + static home page"
```

---

## PART F — STEP 4: TAILWIND + RESPONSIVE STATIC PAGES

**Switch model:** North Mini Code Free

```
Starting Build Step 4: Tailwind CSS setup and responsive static layout
for all pages created so far.

Set up Tailwind config per Section 2. Then style Navbar, Footer, and Home
page to be clean and responsive on mobile/tablet/desktop — no animation
yet, just solid, modern static styling (cards, spacing, typography). Create
placeholder static versions of About.jsx and Contact.jsx too, pulling
company info from client/src/data/companyInfo.js (create this file now with
the real details from Section 4.7 of the spec: Calcutta Node, the Champdani
address, email, phone, Instagram, Facebook).

Show me a screenshot-worthy result — check it in browser at mobile width
and desktop width before telling me you're done.
```

✅ **Checkpoint:** Resize your browser window narrow and wide — actually check nothing breaks.

```bash
git add . && git commit -m "step 4: tailwind styling + about/contact static pages"
```

---

## PART G — STEP 5: WIRE UP LOGIN/REGISTER TO BACKEND

**Switch model:** Nemotron 3 Ultra Free

```
Starting Build Step 5: connect Login/Register pages to the backend auth
API built in Step 2.

Build:
1. client/src/utils/api.js — axios instance pointing at the backend
2. client/src/pages/Login.jsx and Register.jsx with real forms
3. Auth state management (per Section 2's tech stack — Redux Toolkit or
   Zustand, your choice, but be consistent) storing the JWT and user info
4. Protected route wrapper component so /dashboard requires login

Test end to end: register a new user, log in, confirm the token is stored
and a protected route redirects to /login when logged out. Walk me through
testing this manually before we continue.
```

✅ **Checkpoint:** Actually register + log in through the browser UI, not just curl. Log out and confirm you're kicked out of `/dashboard`.

```bash
git add . && git commit -m "step 5: login/register wired to backend"
```

---

## PART H — STEP 6: DASHBOARD SKELETON

**Switch model:** MiMo V2.5 Free

```
Starting Build Step 6: dashboard skeleton.

Read Section 4.9 of the spec. Build the dashboard shell only — no real
payments yet:
1. Sidebar nav: Overview, My Orders, Wallet, Book a Service, Profile,
   Support Tickets
2. Each section as its own page/component with placeholder/dummy data
3. Wallet balance shown as a static number for now (real wallet logic
   comes in Step 7-9)

Keep it protected behind the auth wrapper from Step 5.
```

✅ **Checkpoint:** Confirm all sidebar links render their own section without errors.

```bash
git add . && git commit -m "step 6: dashboard skeleton"
```

---

## PART I — STEP 7: RAZORPAY (UPI/CARD/NETBANKING) — SANDBOX

**Switch model:** Nemotron 3 Ultra Free (try DeepSeek V4 Flash Free if it struggles) — do not use North Mini Code Free here

```
Starting Build Step 7: Razorpay integration in TEST/sandbox mode only.

Read Section 4.9 and Section 5 (Wallet/Transaction model) carefully.

Build:
1. server/models/Wallet.js and Transaction.js per Section 5
2. server/routes/paymentRoutes.js + controller — create Razorpay order,
   verify payment signature server-side (never trust the frontend alone)
3. client/src/components/dashboard/PaymentModal.jsx — tabs for UPI
   (auto QR via Razorpay), Card, NetBanking
4. On successful payment, credit the user's walletBalance and log a
   Transaction record

Use Razorpay's official test card/UPI credentials for sandbox testing —
tell me exactly what those are and how to simulate a successful and a
failed payment before we move on. Do NOT use live keys yet.
```

✅ **Checkpoint:** Actually simulate one successful and one failed test payment. Confirm wallet balance updates only on success.

```bash
git add . && git commit -m "step 7: razorpay sandbox integration"
```

---

## PART J — STEP 8: MANUAL BANK TRANSFER FLOW

**Switch model:** MiMo V2.5 Free

```
Starting Build Step 8: manual bank transfer top-up flow.

Build a simple flow: user selects "Bank Transfer" in the payment modal,
sees your bank details (placeholder for now), enters a UTR reference
number, and uploads a screenshot (Cloudinary). This creates a Transaction
with status "pending". Build a simple admin-only page to view pending
bank transfers and manually mark them "approved" (which credits the
wallet) or "rejected".
```

✅ **Checkpoint:** Submit a fake UTR as a test user, then approve it from the admin view, confirm wallet updates.

```bash
git add . && git commit -m "step 8: manual bank transfer flow"
```

---

## PART K — STEP 9: CRYPTO GATEWAY (SANDBOX)

**Switch model:** DeepSeek V4 Flash Free

```
Starting Build Step 9: crypto payment integration (NOWPayments or Coinbase
Commerce — pick whichever has better sandbox/test documentation) for
wallet top-up. Use test/sandbox mode only. Same pattern as Step 7: create
payment intent, verify via webhook, credit wallet on confirmed payment.
Explain how to test this without real crypto.
```

✅ **Checkpoint:** Confirm the sandbox flow completes and credits the wallet correctly. (Remember: check compliance before ever flipping this to live/production.)

```bash
git add . && git commit -m "step 9: crypto payment sandbox integration"
```

---

## PART L — STEP 10: BLOG SYSTEM + SEARCH

**Switch model:** Nemotron 3 Ultra Free

```
Starting Build Step 10: blog model, seed data, and search.

Read Section 4.2 carefully.

Build:
1. server/models/Blog.js per Section 5
2. server/seed/seedBlogs.js with 10-15 starter blog posts about free
   internet/computer hacks, remote-access tricks, troubleshooting tips,
   tied to our services (I'll review/edit the actual text before publishing)
3. Search endpoint — debounced client-side search bar, backend does
   relevance-ranked search across title/tags/content (use MongoDB Atlas
   Search if available, otherwise a weighted regex fallback per Section 4.2)
4. Default (no search typed) view sorted by views descending
5. View counter incrementing on each blog open
6. BlogDetail.jsx page

Tell me exactly how to run the seed script.
```

✅ **Checkpoint:** Run the seed script, confirm blogs appear, test the search bar with a few different queries, confirm default view shows highest-view posts first.

```bash
git add . && git commit -m "step 10: blog system with search"
```

---

## PART M — STEP 11: SEO/MARKETING TOOLS DIRECTORY

**Switch model:** North Mini Code Free

```
Starting Build Step 11: Free Tools directory page.

Read Section 4.3. Create client/src/data/seoTools.js with entries per the
categories listed (SEO, Social, Analytics, Design). Build the animated
grid page (animation comes properly in Step 14 — for now just get a clean
static grid working) with category filter tags.
```

✅ **Checkpoint:** Confirm every tool card link actually opens the right tool.

```bash
git add . && git commit -m "step 11: seo/marketing tools directory"
```

---

## PART N — STEP 12: COURSES DIRECTORY + FILTERS

**Switch model:** MiMo V2.5 Free

```
Starting Build Step 12: Courses directory.

Read Section 4.4. Create client/src/data/courses.js with a starter list
covering edX, CS50/Harvard, CodeWithHarry, freeCodeCamp, and a few others,
across English/Hindi/Urdu/Bengali where genuinely available. Build filter
chips for Price (Free/Paid), Certificate (With/Without), Language, and
sort by rating. Default sort: rating descending, free-first.
```

✅ **Checkpoint:** Test every filter combination once, confirm sorting behaves as expected.

```bash
git add . && git commit -m "step 12: courses directory with filters"
```

---

## PART O — STEP 13: PRICING PAGE

**Switch model:** North Mini Code Free

```
Starting Build Step 13: Pricing page.

Read Section 4.5. Build the pricing tables from client/src/data/services.js
(already has placeholder prices from Step 3 — I will edit the real numbers
myself later per Section 10 of the spec). Group by category, show
included features per tier.
```

✅ **Checkpoint:** Confirm every service category from Section 4.1 has a matching pricing entry.

```bash
git add . && git commit -m "step 13: pricing page"
```

---

## PART P — STEP 14: ALL ANIMATIONS

**Switch model:** Nemotron 3 Ultra Free or DeepSeek V4 Flash Free (fiddly to debug on a weak model)

```
Starting Build Step 14: add all animations now that functionality works.

Read Section 6 carefully — Framer Motion for route transitions, card
hover/tap, modal open/close, staggered reveals; GSAP + ScrollTrigger for
the Home hero and scroll-based section reveals. Respect
prefers-reduced-motion. Lazy-load GSAP so it doesn't bloat pages that
don't use it. Go page by page: Home hero first, then Blogs/Tools/Courses
grid stagger, then dashboard transitions, then pricing/about page reveals.
Show me each page after adding its animation so I can check it feels
smooth, not gimmicky.
```

✅ **Checkpoint:** Go through every page yourself. If anything feels janky or laggy on your actual machine, say so specifically (which page, what feels wrong) rather than "make it better."

```bash
git add . && git commit -m "step 14: animations across all pages"
```

---

## PART Q — STEP 15: FINAL POLISH

**Switch model:** MiMo V2.5 Free, then you do a manual pass

```
Starting Build Step 15: final polish pass.

Add SEO meta tags (title/description per page), favicon, check mobile
responsiveness on every page one more time, and list anything you notice
that looks unfinished or inconsistent across the site.
```

✅ **Checkpoint (you, manually):**
- Run a Lighthouse audit in Chrome DevTools yourself — check Performance, Accessibility, SEO scores
- Click through the entire site on your phone
- Re-read MANUAL.md yourself and confirm you can actually find where to change a price, add a blog, add a tool, and add a course without asking the agent

```bash
git add . && git commit -m "step 15: final polish"
git push
```

---

## PART R — GOING LIVE (after all 15 steps work locally)

1. Switch Razorpay/crypto keys from test → live only after you've tested the full sandbox flow multiple times
2. Deploy backend to Render.com, frontend to Vercel, confirm `.env` vars are set in each platform's dashboard (never commit real `.env`)
3. Point your domain's DNS to Vercel
4. Do one final real ₹1 test transaction yourself before announcing the site publicly
5. Fill in your real competitor-researched prices in `services.js` (Section 10 of the master spec)

---

## QUICK REFERENCE — WHAT TO PASTE WHEN

| Step | Model | What to paste |
|---|---|---|
| 0 | any | Part B prompt |
| 1 | North Mini Code Free | Part C prompt |
| 2 | Nemotron 3 Ultra Free | Part D prompt |
| 3 | North Mini Code Free | Part E prompt |
| 4 | North Mini Code Free | Part F prompt |
| 5 | Nemotron 3 Ultra Free | Part G prompt |
| 6 | MiMo V2.5 Free | Part H prompt |
| 7 | Nemotron 3 Ultra Free (try DeepSeek V4 Flash Free if it struggles) | Part I prompt |
| 8 | MiMo V2.5 Free | Part J prompt |
| 9 | DeepSeek V4 Flash Free | Part K prompt |
| 10 | Nemotron 3 Ultra Free | Part L prompt |
| 11 | North Mini Code Free | Part M prompt |
| 12 | MiMo V2.5 Free | Part N prompt |
| 13 | North Mini Code Free | Part O prompt |
| 14 | Nemotron 3 Ultra Free / DeepSeek V4 Flash Free | Part P prompt |
| 15 | MiMo V2.5 Free + manual | Part Q prompt |

⚠️ These four are free-tier models with data-retention terms noted by OpenCode during their free periods — never paste real API keys, passwords, customer data, or `.env` contents into any prompt.

**Never paste two steps' prompts in the same message. Always commit before moving to the next row.**
