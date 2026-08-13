# Sales Assessment Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a self-contained Sales Assessment Platform case study from the Final Draft Google Doc tab with every referenced visual hosted locally.

**Architecture:** A typed project-content module preserves the 234 source paragraphs and translates 20 media instructions into 19 stable local assets. One project-specific route composes existing case-study components, and a home card exposes the local route.

**Tech Stack:** Next.js/Vinext, React, TypeScript, existing case-study components, CSS, Node test runner, authenticated Google Drive connector.

## Global Constraints

- Preserve exact Final Draft wording, source order, list membership, quotations, and outcomes.
- Download all 19 unique source-linked Drive assets to `site/public/portfolio`; do not render Drive URLs in production.
- Reuse existing case-study components and visual tokens; add no dependency or speculative abstraction.
- Render one `h1`, a desktop vertical chapter rail, a mobile-hidden rail, semantic local media, and video controls/autoplay/loop/muted/playsInline behavior.

---

### Task 1: Local media manifest and files

**Files:**
- Create: `site/public/portfolio/sales-assessment-*`
- Modify: `site/tests/rendered-html.test.mjs`

**Consumes:** 20 Final Draft Drive instructions (19 unique IDs).

**Produces:** validated local images/videos and a media contract.

- [ ] **Step 1: Write a failing local-media test**

```js
test("sales assessment media is local", async () => {
  const { html } = await render("/work/sales-assessment-platform-ai-integration");
  assert.match(html, /\/portfolio\/sales-assessment-hero\.mp4/);
  assert.doesNotMatch(html, /drive\.google\.com/);
});
```

- [ ] **Step 2: Prove red**

Run: `node --test --test-name-pattern='sales assessment media is local' tests/rendered-html.test.mjs`

Expected: FAIL because the route does not exist.

- [ ] **Step 3: Fetch and validate Drive files**

Fetch the Final Draft asset IDs using the authenticated Drive connector, materialize them as stable `sales-assessment-*` paths, and validate each by signature, MIME type, nonzero bytes, plus intrinsic image dimensions or video duration.

- [ ] **Step 4: Commit the asset set**

Run: `git add site/public/portfolio/sales-assessment-* site/tests/rendered-html.test.mjs; git commit -m "assets: add sales assessment media"`

### Task 2: Source data, local route, and home card

**Files:**
- Create: `site/app/data/sales-assessment-platform.ts`
- Create: `site/app/work/sales-assessment-platform-ai-integration/page.tsx`
- Modify: `site/app/page.tsx`
- Modify: `site/tests/rendered-html.test.mjs`

**Consumes:** Task 1 local asset paths and Final Draft source content.

**Produces:** the case-study route and selected-work preview.

- [ ] **Step 1: Write a failing exact-content route test**

```js
test("sales assessment preserves Final Draft", async () => {
  const { html } = await render("/work/sales-assessment-platform-ai-integration");
  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert.match(html, /The platform contained AI—but it wasn't truly designed around AI\./);
  assert.match(html, /AI output quality starts before generation\./);
});
```

- [ ] **Step 2: Prove red**

Run: `node --test --test-name-pattern='sales assessment preserves Final Draft' tests/rendered-html.test.mjs`

Expected: FAIL because the route and typed source data do not exist.

- [ ] **Step 3: Create typed source-order data**

Add title, subtitle, metadata, chapters, prose, lists, quotes, workflow labels, outcome cards, and all 20 media placements. Exclude bracketed instructions from visible copy and represent them only as media descriptors.

- [ ] **Step 4: Compose with production components**

Use `PortfolioHeader`, `CaseStudyHero`, `HeroOverview`, `VerticalChapterNav`, `CaseStudySection`, `ContentBlockRenderer`, `CaseStudyMedia`, `CaseStudyQuote`, `WorkflowQuestion`, `InsightGrid`, `InsightCard`, `RecommendationCard`, `MetricCard`, and `SimpleContentList` where they match source semantics. Keep current/final workflow and before/after layouts project-scoped.

- [ ] **Step 5: Add the home card and prove green**

Run: `node --test --test-name-pattern='sales assessment' tests/rendered-html.test.mjs`

Expected: PASS for route, one `h1`, exact copy, home link, chapter anchors, and all local asset references.

- [ ] **Step 6: Commit composition**

Run: `git add site/app/data/sales-assessment-platform.ts site/app/work/sales-assessment-platform-ai-integration/page.tsx site/app/page.tsx site/tests/rendered-html.test.mjs; git commit -m "feat: add sales assessment case study"`

### Task 3: Scoped styling and final validation

**Files:**
- Modify: `site/app/case-study.css`
- Modify: `site/tests/rendered-html.test.mjs`

**Consumes:** Task 2 semantic markup.

**Produces:** responsive, visually consistent workflow/comparison/outcome layouts.

- [ ] **Step 1: Write a failing media/rail behavior test**

```js
test("sales assessment has semantic media and vertical navigation", async () => {
  const { html } = await render("/work/sales-assessment-platform-ai-integration");
  assert.match(html, /data-component="VerticalChapterNav"/);
  assert.match(html, /<video[^>]*controls[^>]*autoPlay[^>]*loop[^>]*muted[^>]*playsInline/);
});
```

- [ ] **Step 2: Prove red and add minimal project CSS**

Run the focused test, then add only `sales-assessment-*` rules for source-order workflow, before/after, and outcome layouts. Use `minmax(0,1fr)` and `min-width:0`; collapse grids at existing breakpoints.

- [ ] **Step 3: Run complete verification**

Run: `$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'; npx.cmd vinext build; node --test tests/rendered-html.test.mjs; npx.cmd eslint app/work/sales-assessment-platform-ai-integration/page.tsx tests/rendered-html.test.mjs; git diff --check`

Expected: build and tests pass, scoped lint is clean, and whitespace validation has no output.

- [ ] **Step 4: Live review and commit**

Verify desktop and 390px mobile hero, rail, media, videos, outcomes, focus treatment, and zero page overflow. Then run: `git add site/app/case-study.css site/tests/rendered-html.test.mjs; git commit -m "style: complete sales assessment presentation"`.

## Plan Review

- Task 1 covers source-linked assets; Task 2 covers exact source content, route, component composition, and home integration; Task 3 covers presentation, responsive behavior, automated verification, and live review.
- The plan contains no unresolved scope or implementation placeholders.
