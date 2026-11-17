# Camera Shot Angle Explorer Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a protected Camera Shot Angle Explorer case study using the established portfolio components, with an interactive live-product embed and no home-page project card.

**Architecture:** Add a generic `CaseStudyEmbed` component that shares the existing case-media frame and caption language while rendering a lazy external iframe and action link. Compose the new route from existing case-study primitives, protect it through the established proxy allowlist, and document the production component in the component library.

**Tech Stack:** React, Vinext, TypeScript, CSS, Node test runner.

**Spec:** `docs/superpowers/specs/2026-11-16-camera-shot-angle-explorer-case-study-design.md`

## Global Constraints

- Use the attached `Pasted text.txt` as the authoritative wording; do not paraphrase, correct, summarize, or invent claims, results, metadata, or quotes.
- Route: `/work/camera-shot-angle-explorer`; it must not be added to `site/app/data/projects.ts` or rendered as a home-page `ProjectPreviewCard`.
- Preserve the existing password gate for private case studies.
- The live demo source is `https://camera-shot-angle-explorer.vercel.app/`; iframe height is `760`, loading is `lazy`, and allowed capability is `clipboard-write`.
- Reuse established case-study styling and components; create only the generic embed primitive needed for external interactive media.

## Review Focus

- The iframe must remain contained at narrow viewports without horizontal page overflow; Task 1 adds responsive CSS and source-level assertions.
- The embedded page might deny framing; the visible external live-product link remains available; Task 1 asserts that link.
- The new path must use the same gate as private case studies; Task 3 extends the gate test’s route list.
- Source wording must not be shortened during component mapping; Task 3 asserts representative exact paragraphs and every table row.
- The homepage must remain unchanged; Task 3 asserts that its rendered HTML has no Camera Shot Angle Explorer reference.

### Task 1: Add the reusable interactive embed component

**Files:**
- Create: `site/app/components/case-study/CaseStudyEmbed.tsx`
- Modify: `site/app/case-study.css`
- Modify: `site/app/component-library/catalog.tsx`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: `CaseStudyEmbed({ src, title, height, caption, actionHref, actionLabel })`, a semantic figure with a lazy iframe, caption, and external action link.
- Consumes: existing case-media CSS tokens and component-library catalog conventions.

- [ ] **Step 1: Write the failing rendered-component test**

Add a test that imports and renders `CaseStudyEmbed`, then asserts its `data-component`, iframe `src`, `title`, `height`, `loading="lazy"`, `allow="clipboard-write"`, caption, and external link.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test --test-name-pattern="interactive case-study embed" tests/rendered-html.test.mjs`

Expected: FAIL because `CaseStudyEmbed` does not exist.

- [ ] **Step 3: Implement the reusable embed and production-backed library preview**

Create the component with the specified prop interface, add it to the Case studies component-library catalog, and add responsive `.case-media-embed iframe` styling that preserves the 760px desktop height and avoids narrow-screen overflow.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `node --test --test-name-pattern="interactive case-study embed" tests/rendered-html.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add site/app/components/case-study/CaseStudyEmbed.tsx site/app/case-study.css site/app/component-library/catalog.tsx site/tests/rendered-html.test.mjs
git commit -m "Add reusable interactive case-study embed"
```

### Task 2: Compose the Camera Shot Angle Explorer case study

**Files:**
- Create: `site/app/work/camera-shot-angle-explorer/page.tsx`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `CaseStudyEmbed` from Task 1, plus the existing hero, section, navigation, card, and footer components.
- Produces: a server-rendered case study at `/work/camera-shot-angle-explorer` with source-order content and chapter anchors.

- [ ] **Step 1: Write the failing route-content test**

Add a test that renders the new route and asserts exactly one `h1`, all seven chapter anchors, the supplied live demo URL, the “Explore the live product ↗” action, and representative exact source wording from each narrative table and outcome.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test --test-name-pattern="Camera Shot Angle Explorer" tests/rendered-html.test.mjs`

Expected: FAIL because the route does not exist.

- [ ] **Step 3: Implement the source-faithful page**

Create the page using `CaseStudyHero`, `VerticalChapterNav`, `CaseStudySection`, `WorkflowQuestion`, `InsightGrid`, `RecommendationList`, `CaseStudyEmbed`, and the shared footer. Render all supplied prose and table rows in source order without adding a project card or modifying `site/app/data/projects.ts`.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `node --test --test-name-pattern="Camera Shot Angle Explorer" tests/rendered-html.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add site/app/work/camera-shot-angle-explorer/page.tsx site/tests/rendered-html.test.mjs
git commit -m "Add Camera Shot Angle Explorer case study"
```

### Task 3: Protect and validate the route

**Files:**
- Modify: `site/proxy.ts`
- Modify: `site/tests/rendered-html.test.mjs`
- Modify: `site/tests/vercel-password-gate.test.mjs`

**Interfaces:**
- Consumes: route from Task 2 and the existing protected-project lists.
- Produces: the same password-gated access contract as existing private case studies.

- [ ] **Step 1: Write failing gate and homepage-exclusion tests**

Add the new route to protected-project test lists and assert unauthenticated access returns the branded password gate. Add a home-page assertion that it contains no Camera Shot Angle Explorer text or route.

- [ ] **Step 2: Run the focused tests to verify they fail**

Run: `node --test --test-name-pattern="protected case studies|Camera Shot Angle Explorer" tests/rendered-html.test.mjs tests/vercel-password-gate.test.mjs`

Expected: FAIL because the new route is not on the proxy allowlist.

- [ ] **Step 3: Add the route to the protected-project allowlist**

Update `site/proxy.ts` only; leave the homepage projects data untouched.

- [ ] **Step 4: Run focused tests to verify they pass**

Run: `node --test --test-name-pattern="protected case studies|Camera Shot Angle Explorer" tests/rendered-html.test.mjs tests/vercel-password-gate.test.mjs`

Expected: PASS.

- [ ] **Step 5: Run full validation and commit**

Run: `$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'; npx.cmd vinext build; node --test tests/rendered-html.test.mjs tests/vercel-password-gate.test.mjs`

Expected: build succeeds and all tests pass.

```bash
git add site/proxy.ts site/tests/rendered-html.test.mjs site/tests/vercel-password-gate.test.mjs
git commit -m "Protect Camera Shot Angle Explorer case study"
```
