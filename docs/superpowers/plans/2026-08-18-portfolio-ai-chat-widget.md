# Portfolio AI Chat Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Load Melissa's existing Vercel chat widget once on every portfolio page so its own floating launcher and panel work exactly as they do on the Webflow site.

**Architecture:** The shared root layout owns one framework-managed external script. The existing Vercel `widget.js` injects and controls the launcher and panel; the portfolio adds no chat UI or state.

**Tech Stack:** React 19, Next-compatible `next/script`, Vinext, Node test runner

**Spec:** `docs/superpowers/specs/2026-08-18-portfolio-ai-chat-widget-design.md`

## Global Constraints

- Use `https://portfolio-ai-chat-melissa.vercel.app/widget.js?v=2` as the exact script URL.
- Set `data-api-base` to `https://portfolio-ai-chat-melissa.vercel.app`.
- Load once from the shared root layout after the page becomes interactive.
- Do not add a portfolio-owned launcher, iframe, close control, or new-tab fallback.
- Preserve all unrelated uncommitted changes in the working tree.

---

### Task 1: Load the existing chat widget globally

**Files:**
- Modify: `site/app/layout.tsx`
- Create: `site/tests/chat-widget.test.mjs`

**Interfaces:**
- Consumes: Next-compatible `Script` component from `next/script`.
- Produces: one global script element with ID `portfolio-ai-chat-widget`, strategy `afterInteractive`, the exact widget URL, and the exact `data-api-base` value.

- [ ] **Step 1: Write the failing rendered-page test**

Add a test that renders `/`, `/about`, and `/work/resort-trip-planner`, then asserts each complete document includes exactly one script matching:

```js
/<script[^>]+id="portfolio-ai-chat-widget"[^>]+src="https:\/\/portfolio-ai-chat-melissa\.vercel\.app\/widget\.js\?v=2"[^>]+data-api-base="https:\/\/portfolio-ai-chat-melissa\.vercel\.app"/
```

Also assert that no rendered document contains a portfolio-owned chat launcher label or iframe.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
node --test tests/chat-widget.test.mjs
```

Expected: FAIL because the shared root layout does not yet render the widget script.

- [ ] **Step 3: Add the minimal root-layout integration**

Import `Script` from `next/script` and render this after `{children}` inside `<body>`:

```tsx
<Script
  id="portfolio-ai-chat-widget"
  src="https://portfolio-ai-chat-melissa.vercel.app/widget.js?v=2"
  data-api-base="https://portfolio-ai-chat-melissa.vercel.app"
  strategy="afterInteractive"
/>
```

- [ ] **Step 4: Build and verify GREEN**

Run:

```powershell
npx.cmd cross-env WRANGLER_LOG_PATH=.wrangler/wrangler.log vinext build
node --test tests/chat-widget.test.mjs
```

Expected: build succeeds and the focused test passes.

- [ ] **Step 5: Verify the complete repository**

Run:

```powershell
npm.cmd run lint
node --test tests/rendered-html.test.mjs tests/chat-widget.test.mjs
```

Expected: lint exits zero and all rendered-page tests pass.

- [ ] **Step 6: Browser-check the real widget**

Start the local site, open Home, wait for the external widget, and verify exactly one existing Vercel launcher appears. Open and close it using its own button, navigate to a case study, and confirm no duplicate launcher is created.

- [ ] **Step 7: Commit only the widget integration**

```powershell
git add -- site/app/layout.tsx site/tests/chat-widget.test.mjs docs/superpowers/plans/2026-08-18-portfolio-ai-chat-widget.md
git commit -m "Add portfolio AI chat widget"
```

Do not stage unrelated lightbox or résumé changes and do not push.
