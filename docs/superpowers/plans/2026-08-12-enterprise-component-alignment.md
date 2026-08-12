# Enterprise Case Study Component Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Enterprise Search case study compose the global production component library while preserving its content and page structure.

**Architecture:** Keep Enterprise page data inline. Replace only duplicated markup with existing `CaseStudyHero`, `CaseStudyMetadata`, `CaseStudyQuote`, `InsightGrid`, `InsightCard`, `RecommendationList`, and `RecommendationCard` components. Reuse the current shared media, section, metric, header, footer, and navigation components unchanged.

**Tech Stack:** Next.js, React, TypeScript, CSS, Node test runner, Vinext.

## Global Constraints

- Reuse existing components and CSS; do not add dependencies or new component variants.
- Preserve Enterprise research copy, chapter IDs/order, asset paths, and route.
- Keep the existing vertical chapter navigation and responsive behavior.

---

### Task 1: Add a rendered composition contract

**Files:**
- Modify: `site/tests/rendered-html.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
test("enterprise search composes global case-study components", async () => {
  const enterprise = await renderRoute("/work/enterprise-search-generative-ai");
  for (const name of ["CaseStudyHero", "CaseStudyMetadata", "CaseStudyQuote", "InsightGrid", "RecommendationList"]) {
    assert.match(enterprise.html, new RegExp(`data-component="${name}"`));
  }
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `node --test --test-name-pattern="enterprise search composes global" tests/rendered-html.test.mjs`

Expected: FAIL because Enterprise still includes duplicate markup.

- [ ] **Step 3: Commit the red contract**

```powershell
git add site/tests/rendered-html.test.mjs
git commit -m "test: cover enterprise component composition"
```

### Task 2: Compose existing global components in Enterprise Search

**Files:**
- Modify: `site/app/work/enterprise-search-generative-ai/page.tsx`
- Test: `site/tests/rendered-html.test.mjs`

- [ ] **Step 1: Replace duplicate hero markup**

```tsx
<CaseStudyHero
  backLink={<Link className="case-back" href="/#selected-work">← Back to selected work</Link>}
  eyebrow="Generative research · Enterprise AI"
  title="Research: Value of Internal Enterprise Search in the Age of Generative AI"
  deck="How research uncovered why employees were leaving a trusted internal search product—and reframed it as the data layer for a new AI ecosystem."
  metadataItems={enterpriseMetadata}
  heroMedia={<div className="case-hero-art">…</div>}
/>
```

- [ ] **Step 2: Replace inline quote, insight, recommendation, and outcome markup**

Use `CaseStudyQuote` for the interview quote, `InsightGrid`/`InsightCard` for the three research insights and five outcomes, and `RecommendationList`/`RecommendationCard` for recommendations. Keep existing `CaseStudyFigure` children and their source order inside recommendation cards.

- [ ] **Step 3: Run the focused test and verify it passes**

Run: `node --test --test-name-pattern="enterprise search composes global" tests/rendered-html.test.mjs`

Expected: PASS.

- [ ] **Step 4: Run the full validation**

Run: `$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'; npx.cmd vinext build; node --test tests/rendered-html.test.mjs`

Expected: build succeeds and all rendered HTML tests pass.

- [ ] **Step 5: Commit the implementation**

```powershell
git add site/app/work/enterprise-search-generative-ai/page.tsx site/tests/rendered-html.test.mjs
git commit -m "refactor: align enterprise search with component library"
```
