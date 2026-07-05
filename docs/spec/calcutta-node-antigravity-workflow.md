# Calcutta Node — Antigravity + OpenCode Zen Agent Workflow
### (Send this as your FIRST message to the agent, before the main build spec)

---

## 0. WHY THIS FILE EXISTS

You're building on **Antigravity IDE**, using **OpenCode Zen's free models** in the terminal. Free models differ a lot in speed vs. reasoning quality, and none of them should be trusted to hold the entire project spec in memory at once. This file tells the agent: (1) how to discover what free models it has access to, (2) which *type* of model to switch to for which *type* of task, and (3) to work in small, single-step chunks instead of trying to do everything at once.

---

## 1. STEP ZERO — MODEL DISCOVERY (agent must do this first, before touching any code)

> Agent instructions: Before starting any build step, run `/model` in the terminal. This opens the model picker. Type `free` to filter the list down to free-tier models only. List every free model shown to me (the user) with its name, before we proceed. Do not assume any model name — always check the live list, since available free models change over time.

**Your current free model lineup (as of this build) and how to use each:**

| Model | What it's built for | Use it for |
|---|---|---|
| **North Mini Code Free** | Small, fast, code-specialized | **Fast/light tier** — boilerplate, scaffolding, static UI, repetitive tasks |
| **MiMo V2.5 Free** | General-purpose, multimodal | **Mid-tier** — moderate logic, filters/sorting, admin CRUD flows |
| **Nemotron 3 Ultra Free** (NVIDIA) | Largest of the free endpoints, strong general reasoning | **Strongest/reasoning tier** — auth, payments, search relevance, animation logic |
| **DeepSeek V4 Flash Free** | Despite the "Flash" name, optimized for complex logic and chain-of-thought | **Strongest/reasoning tier (alternate)** — use if Nemotron 3 Ultra is rate-limited, slow, or struggling on a given step; also tool-calling capable, worth trying head-to-head on payment/search steps |

Note: NVIDIA's Nemotron free endpoint is trial-only and logs prompts for their own product improvement (not tied to your identity, per their policy) — and OpenCode notes the other three may also have data retained/used during their free periods. So regardless of which model you're using: never paste real API keys, passwords, or customer data into any prompt.

**General rule of thumb if this lineup changes later:**
- Prefer models labeled **"coder" / "code"** for anything writing actual application logic
- Prefer models with the **largest context window** for steps involving multiple files at once (auth, payments, dashboard state)
- Prefer the **fastest/lightest** model for repetitive, low-risk boilerplate (folder scaffolding, CSS classes, static JSX, seed data entry)
- If a model is labeled "instruct" only (no code specialization), keep it for planning/explaining, not for writing files directly

---

## 2. TASK → MODEL SWITCHING TABLE

Tell the agent to **switch models at the start of each phase** using `/model`, based on this mapping. Update the placeholder names once Step Zero gives you the real list.

| Build Step (from master spec, Section 8) | Task type | Model to switch to |
|---|---|---|
| 1. Folder scaffolding + README/MANUAL generation | Boilerplate, low logic | **North Mini Code Free** |
| 2. Backend: DB connection, User model, Auth (JWT) | Security-sensitive logic | **Nemotron 3 Ultra Free** |
| 3. Navbar/Footer/routing skeleton, static Home page | Static UI, low logic | **North Mini Code Free** |
| 4. Tailwind responsive layout, all static pages | Styling, repetitive | **North Mini Code Free** |
| 5. Wire up Login/Register to backend | Auth logic, state management | **Nemotron 3 Ultra Free** |
| 6. Dashboard skeleton (protected routes, sidebar) | Medium logic, multi-file | **MiMo V2.5 Free** |
| 7. Razorpay integration (UPI/Card/NetBanking sandbox) | High-stakes, multi-file, external API | **Nemotron 3 Ultra Free** (try **DeepSeek V4 Flash Free** as a second opinion if it struggles) |
| 8. Manual Bank Transfer flow | Simple CRUD + admin approval logic | **MiMo V2.5 Free** |
| 9. Crypto gateway integration (sandbox) | External API, medium complexity | **DeepSeek V4 Flash Free** |
| 10. Blog model + seed + search endpoint + debounced search bar | Search/relevance logic | **Nemotron 3 Ultra Free** |
| 11. SEO Tools directory page | Static data + grid UI | **North Mini Code Free** |
| 12. Courses directory + filters | Filter/sort logic, medium | **MiMo V2.5 Free** |
| 13. Pricing page from services.js | Static data + table UI | **North Mini Code Free** |
| 14. All animations (Framer Motion + GSAP) | Visual polish, timing-sensitive | **Nemotron 3 Ultra Free** or **DeepSeek V4 Flash Free** (animation bugs are fiddly to debug with a weak model — try both if one struggles) |
| 15. Final polish: SEO meta, favicon, responsiveness, Lighthouse check | Review/cleanup | **MiMo V2.5 Free**, with you doing a manual pass after |

---

## 3. THE ACTUAL WORKFLOW LOOP (agent follows this for every step)

For each step in the table above, the agent should:

1. State which build step it's starting (e.g., "Starting Step 7: Razorpay integration")
2. Say which model tier that step needs, and prompt you to run `/model` and switch if you haven't already (the agent itself cannot switch models — only you can, from the terminal)
3. Re-read `MANUAL.md` and the relevant `client/src/data/*.js` file before writing any code, so it doesn't drift from the folder structure already agreed
4. Write/edit only the files needed for that one step — no jumping ahead
5. Explain in plain language what it changed and why, in comments and in chat
6. Tell you to test that one feature before moving to the next step
7. Remind you to `git commit` before starting the next step

**Do not let the agent attempt more than one build step per message.** If it tries to do steps 7 through 10 in one go, stop it and ask it to redo just step 7.

---

## 4. WHAT TO DO IF A FREE MODEL STRUGGLES MID-STEP

If the agent produces broken code, contradicts the folder structure, or seems to have "forgotten" the spec:

1. Run `/model` again and switch to whichever free model tested as strongest in Step Zero
2. Re-paste just the relevant section of the master spec (not the whole document) plus a one-line summary of what's broken
3. Ask it to re-read the actual current file(s) with `view`/`cat` before editing again — don't let it guess at what's already there
4. If it still can't fix it after 2 tries, roll back with `git checkout` to your last commit and try a smaller, more specific version of the same request (e.g., "just fix the UPI QR code generation function, don't touch anything else")

---

## 5. SAMPLE FIRST MESSAGE TO PASTE INTO ANTIGRAVITY'S TERMINAL

> "We're building a project called Calcutta Node. Before we write any code: run `/model`, type `free`, and list every free model available to me right now with any details you can see about each (context size, whether it's tagged coder/reasoning/fast). I'll tell you which to use for which type of task. Once I confirm, we'll start with Step 1 from the build order: scaffold the folder structure exactly as specified, and generate MANUAL.md and README.md. Do only this one step, then stop and wait for me to test it."

---

## 6. QUICK REFERENCE CARD (keep this pinned while you work)

- `/model` → open model picker
- Type `free` inside picker → filter to free models only
- **Simple/repetitive task** → fast/light free model
- **Security, payments, search relevance, animation timing** → strongest/reasoning free model
- **One step at a time, always** — never let the agent chain multiple build steps unsupervised
- **Commit after every working step**
- **Re-check against Section 3's folder structure every 2–3 steps**
