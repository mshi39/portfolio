# Component Library Production Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the component library with the exact production appearance of both case studies by migrating to one vertical chapter navigation, making cards self-contained, integrating a reusable hero overview, expanding typography foundations, and documenting MetricCard.

**Architecture:** Production components own their visual structures and classes; layout components own only arrangement; route files retain content and grouping. The gallery imports the same production components and adds only neutral containment and documentation metadata.

**Tech Stack:** React 19, Next.js 16/Vinext, TypeScript, CSS, Node test runner

## Global Constraints

- Use self-contained production components; gallery wrappers may contain previews but may not repair their typography, surfaces, or layout.
- Replace every `ChapterRail` and `ChapterNav` API/identity with `VerticalChapterNav`; do not keep compatibility aliases.
- Both case studies use the fixed left vertical navigation on desktop and hide it on mobile.
- Retain `RecommendationList`; preserve all eight Feedback recommendation cards, media, and source order.
- Preserve all case-study copy, media, headings, anchors, accessibility, responsive behavior, and reduced-motion behavior.
- Keep exactly one page-level `h1` in the gallery.
- Add no dependency and do not redesign Home.
- Follow rendered-behavior TDD; source inspection is allowed only for the explicit absence of retired exported API names.

---

### Task 1: Replace case-study navigation with VerticalChapterNav

**Files:**
- Create: `site/app/components/case-study/VerticalChapterNav.tsx`
- Delete: `site/app/components/case-study/ChapterNav.tsx`
- Modify: `site/app/work/ai-powered-feedback-intelligence-platform/page.tsx`
- Modify: `site/app/work/enterprise-search-generative-ai/page.tsx`
- Modify: `site/app/case-study.css`
- Modify: `site/app/component-library/catalog.tsx`
- Modify: `site/app/component-library/component-library.css`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Produces `VerticalChapterNav({ chapters }: { chapters: Array<{ id: string; label: string }> })`.
- Root markup: `<nav className="vertical-chapter-nav" data-component="VerticalChapterNav" aria-label="Case study chapters">`.
- Preserves IntersectionObserver/hash tracking and `aria-current="location"` behavior.
- Both route files consume this interface; no `variant` prop remains.

- [ ] **Step 1: Add failing rendered navigation contracts**

Add tests that render Feedback and Enterprise and assert one `data-component="VerticalChapterNav"` on each route, matching section links, first-link active state, vertical fixed/mobile-hidden CSS, and the absence of `data-component="ChapterRail"`. Add a narrow filesystem assertion that `ChapterNav.tsx` no longer exists and `VerticalChapterNav.tsx` exports the new name after implementation.

```js
test("both case studies use the production vertical chapter navigation", async () => {
  for (const route of [feedbackRoute, enterpriseRoute]) {
    const { html } = await render(route);
    assert.equal((html.match(/data-component="VerticalChapterNav"/g) ?? []).length, 1);
    assert.doesNotMatch(html, /data-component="ChapterRail"/);
    assert.match(html, /aria-current="location"/);
  }
});
```

- [ ] **Step 2: Run RED**

```powershell
node --test --test-name-pattern="both case studies use the production vertical chapter navigation" tests/rendered-html.test.mjs
```

Expected: FAIL because the current routes emit `ChapterRail`/`ChapterNav`.

- [ ] **Step 3: Implement VerticalChapterNav and migrate both routes**

Move the current feedback-rail client logic into `VerticalChapterNav.tsx`, remove variant branching, and update both route imports/usages. Delete the retired component module. Rename production CSS selectors from `.feedback-chapter-nav` to `.vertical-chapter-nav`, preserve connected-line/active/hover/focus/reduced-motion styling, and apply the intermediate-width left gutter to both `.feedback-case-study` and Enterprise `.case-study` layouts without overlapping content.

- [ ] **Step 4: Update the gallery preview and containment**

Replace the `ChapterRail` catalog entry with `VerticalChapterNav`, update its `Use when` description, and contain the fixed preview through gallery-scoped positioning only. Remove retired names from catalog/test inventory.

- [ ] **Step 5: Verify and commit**

```powershell
node --test --test-name-pattern="vertical chapter navigation|component library documents|enterprise search keeps|feedback intelligence uses" tests/rendered-html.test.mjs
node --test tests/rendered-html.test.mjs
npx.cmd eslint app/components/case-study/VerticalChapterNav.tsx app/work/ai-powered-feedback-intelligence-platform/page.tsx app/work/enterprise-search-generative-ai/page.tsx app/component-library tests/rendered-html.test.mjs
```

Run a fresh Vinext build. Commit Task 1 files with `refactor: standardize vertical chapter navigation`.

---

### Task 2: Make InsightCard and RecommendationCard self-contained

**Files:**
- Modify: `site/app/components/case-study/InsightCard.tsx`
- Modify: `site/app/components/case-study/InsightGrid.tsx`
- Modify: `site/app/components/case-study/RecommendationCard.tsx`
- Modify: `site/app/components/case-study/RecommendationList.tsx`
- Modify: `site/app/case-study.css`
- Modify: `site/app/component-library/catalog.tsx`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- `InsightCard({ children, variant? })`, where `variant` is optional `"default" | "highlighted"`; root always includes `insight-card` and may add `insight-card-highlighted`.
- `RecommendationCard` retains `{ sequence, segments, customerCard? }`; its root keeps `recommendation-card` and owns all surface/typography/layout styling.
- `InsightGrid` and `RecommendationList` own grid/list layout only.

- [ ] **Step 1: Add failing self-contained style contracts**

Add rendered/CSS tests requiring `InsightCard` to emit `class="insight-card"` and `RecommendationCard` to emit its production class in gallery and Feedback. Parse their standalone CSS rules and assert exact production background, border, radius, shadow, padding, `h4` family/size/color/line height, paragraph color/size/line height, grid columns, gap, and responsive rules. Ensure these rules do not require `.feedback-case-study` ancestry.

- [ ] **Step 2: Run RED**

```powershell
node --test --test-name-pattern="self-contained case study cards match production" tests/rendered-html.test.mjs
```

Expected: FAIL because InsightCard lacks a class and card styles currently depend on Feedback grid ancestry.

- [ ] **Step 3: Implement component-owned classes and styles**

Add `insight-card` to the component root. Move surface and typography declarations from grid-descendant selectors to `.insight-card`, `.insight-card h4`, and `.insight-card p`. Keep grid column definitions on `InsightGrid` mode classes. Keep highlighted comparison styling as a modifier determined by the route/group renderer.

Consolidate `RecommendationCard` declarations under `.recommendation-card`, `.recommendation-card > span`, `.recommendation-card .feedback-blocks`, `.recommendation-card h4`, and `.recommendation-card p`. Preserve ordered media segment placement and all responsive grid rules. Do not remove `RecommendationList` or any live media.

- [ ] **Step 4: Update gallery previews and verify parity contracts**

Render standalone representative cards in the catalog, with RecommendationCard using text-only segments. Assert Feedback still has eight cards, all planned media, and the existing source-order test passes.

- [ ] **Step 5: Verify and commit**

Run focused card/parity/source-order tests, full suite, scoped lint, and build. Commit with `refactor: make case study cards self contained`.

---

### Task 3: Add HeroOverview, typography foundations, and MetricCard

**Files:**
- Create: `site/app/components/case-study/HeroOverview.tsx`
- Modify: `site/app/components/case-study/CaseStudyHero.tsx`
- Modify: `site/app/components/case-study/MetricCard.tsx`
- Modify: `site/app/work/ai-powered-feedback-intelligence-platform/page.tsx`
- Modify: `site/app/component-library/catalog.tsx`
- Modify: `site/app/component-library/component-library.css`
- Modify: `site/app/case-study.css`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- `HeroOverview({ panels }: { panels: Array<{ heading: string; content: ReactNode }> })` emits `feedback-hero-overview` and `data-component="HeroOverview"`.
- `CaseStudyHero` replaces its generic `overview` node with `overviewPanels?: HeroOverviewPanel[]` and renders `HeroOverview` internally when panels exist.
- `MetricCard({ value, label })` emits `data-component="MetricCard"` while retaining existing markup/classes.
- Gallery `TypeSpecimen` supports the eight required style specimens without rendering additional h1 elements.

- [ ] **Step 1: Add failing HeroOverview, MetricCard, and typography contracts**

Add tests requiring Feedback’s `CaseStudyHero` to contain one `HeroOverview` with two panels in Overview → Projected Impact order; require gallery entries for `HeroOverview` and `MetricCard`; require Enterprise and gallery MetricCard identities; require eight named typography specimens and exactly one gallery h1.

- [ ] **Step 2: Run RED**

```powershell
node --test --test-name-pattern="HeroOverview|MetricCard|typography foundations" tests/rendered-html.test.mjs
```

Expected: FAIL because the named overview and MetricCard identities/catalog entries do not exist and Foundations lacks the full specimen set.

- [ ] **Step 3: Implement HeroOverview and integrate CaseStudyHero**

Create the typed panel component, move ownership of `.feedback-hero-overview` structure into it, and change the Feedback route to pass two ordered panels. Keep exact existing CSS values and responsive collapse. Update the gallery CaseStudyHero example to use the same API and add a separate HeroOverview catalog entry.

- [ ] **Step 4: Expand foundations and document MetricCard**

Add all eight live typography specimens using safe semantic levels and production classes. Add MetricCard identity and a unique catalog entry with representative data. Preserve Enterprise content unchanged.

- [ ] **Step 5: Verify and commit**

Run focused overview/foundation/metric tests, full suite, lint, and build. Commit with `feat: align hero and foundation components`.

---

### Task 4: Catalog audit and live production parity verification

**Files:**
- Modify only when a reproducible defect requires a fix; any fix must receive a focused regression.

**Interfaces:**
- Consumes all components from Tasks 1–3.
- Produces fresh automated and browser evidence of exact live/gallery parity.

- [ ] **Step 1: Run full automated verification**

```powershell
$env:WRANGLER_LOG_PATH="$PWD\.wrangler\logs\build.log"
npx.cmd vinext build
node --test tests/rendered-html.test.mjs
npx.cmd eslint app/component-library app/components app/page.tsx app/work tests/rendered-html.test.mjs
git diff --check 4ee2c25..HEAD
git status --short
```

Expected: build and tests pass, feature lint has no errors, range hygiene is clean.

- [ ] **Step 2: Verify catalog inventory**

On `/component-library`, confirm all names are unique, every description begins `Use when`, `ChapterRail` is absent, `VerticalChapterNav`, `HeroOverview`, and `MetricCard` appear once, `RecommendationList` remains once, and there is exactly one h1.

- [ ] **Step 3: Compare live and gallery computed styles**

At 1200×900, measure representative live/gallery `InsightCard`, text-only `RecommendationCard`, HeroOverview panel, and MetricCard. Compare computed background, border, radius, shadow, padding, display/grid columns/gap, heading family/size/color/line-height, and paragraph styles. Differences outside width imposed by preview containment are defects.

- [ ] **Step 4: Verify navigation and responsive layout**

At 1600×1000, 1200×900, and 901×900, verify Feedback and Enterprise vertical navigation is fixed, centered, active, interactive, and non-overlapping; gallery navigation is contained. At 390×844, verify all vertical navigation is hidden. Measure document `scrollWidth === clientWidth` on Home, Feedback, Enterprise, and gallery at all widths.

- [ ] **Step 5: Verify content/media/accessibility/motion regressions**

Confirm Feedback still renders eight recommendation cards and all media in source order, both case-study copy/anchors remain intact, focus is visible, videos retain required attributes, and forced reduced-motion disables reveal/navigation transitions.

- [ ] **Step 6: Record verification and final review**

Write an ignored task report with exact automated/live evidence, screenshots, warnings, and cleanup. Stop on a real defect, route it through a focused fix/re-review, then request broad final review of the full alignment range.

