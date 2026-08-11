# Portfolio Component Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-backed `/component-library` route and refactor the Home and Feedback Intelligence pages to consume the documented reusable components.

**Architecture:** Keep page-specific data selection and grouping in route files while moving reusable visual structures into typed components under `site/app/components/`. The gallery imports those production components through a typed catalog and adds only neutral documentation wrappers and foundation specimens.

**Tech Stack:** React 19, Next.js 16/Vinext, TypeScript, CSS, Node test runner

## Global Constraints

- The gallery imports and renders the same components used by portfolio pages.
- Component names describe purpose rather than a single page or piece of content.
- Existing visual branding, responsive behavior, motion, accessibility, and content order remain unchanged unless explicitly required by extraction.
- Page-specific data and content stay outside reusable presentation components.
- The gallery is accessible directly at `/component-library` but is not linked from the public header, footer, or portfolio content.
- Existing uncommitted content, dependency, and approved styling changes are preserved.
- Do not add Storybook or another component-documentation dependency.
- Do not redesign production components or change portfolio copy.

---

### Task 1: Establish production component names and shared chrome

**Files:**
- Create: `site/app/components/ActionLink.tsx`
- Create: `site/app/components/PortfolioHeader.tsx`
- Create: `site/app/components/PortfolioFooter.tsx`
- Create: `site/app/components/ScrollCue.tsx`
- Modify: `site/app/components/ButtonLink.tsx`
- Modify: `site/app/components/SiteHeader.tsx`
- Modify: `site/app/about/page.tsx`
- Modify: `site/app/work/enterprise-search-generative-ai/page.tsx`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: `ActionLink({ href, children, variant? })`, `PortfolioHeader({ current? })`, `PortfolioFooter()`, and `ScrollCue({ href, children })`.
- Compatibility: `ButtonLink` re-exports `ActionLink`; `SiteHeader` re-exports `PortfolioHeader` until all existing consumers migrate safely.

- [ ] **Step 1: Add failing naming and shared-chrome contracts**

Add a test that asserts rendered Home/About/Enterprise routes expose stable `data-component` identities for the shared production components and retain the existing brand link, primary navigation, action styles, and footer copy.

```js
test("production shared chrome has stable component-library names", async () => {
  const { html } = await render("/");
  assert.match(html, /data-component="PortfolioHeader"/);
  assert.match(html, /data-component="ActionLink"/);
  assert.match(html, /data-component="PortfolioFooter"/);
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run from `site`:

```powershell
node --test --test-name-pattern="production shared chrome has stable component-library names" tests/rendered-html.test.mjs
```

Expected: FAIL because the production-named modules do not exist.

- [ ] **Step 3: Implement production names and compatibility exports**

Create typed components using the existing markup and behavior. Compatibility modules contain exports only:

```tsx
export { ActionLink as ButtonLink } from "./ActionLink";
export { PortfolioHeader as SiteHeader } from "./PortfolioHeader";
```

`PortfolioFooter` owns the exact existing two-paragraph footer markup. `ScrollCue` owns the existing anchor and decorative arrow.

- [ ] **Step 4: Migrate About and Enterprise shared chrome and verify GREEN**

Update imports to production names without changing rendered copy or layout. Run:

```powershell
node --test --test-name-pattern="production shared chrome|server-renders the dedicated About Me page|server-renders the complete enterprise search case study" tests/rendered-html.test.mjs
```

Expected: all selected tests PASS.

- [ ] **Step 5: Commit Task 1 files only**

```powershell
git add site/app/components/ActionLink.tsx site/app/components/PortfolioHeader.tsx site/app/components/PortfolioFooter.tsx site/app/components/ScrollCue.tsx site/app/components/ButtonLink.tsx site/app/components/SiteHeader.tsx site/app/about/page.tsx site/app/work/enterprise-search-generative-ai/page.tsx site/tests/rendered-html.test.mjs
git commit -m "refactor: name shared portfolio components"
```

---

### Task 2: Extract and adopt Home components

**Files:**
- Create: `site/app/components/PortfolioHero.tsx`
- Create: `site/app/components/PortraitStage.tsx`
- Create: `site/app/components/SectionIntro.tsx`
- Create: `site/app/components/ProjectPreviewCard.tsx`
- Create: `site/app/components/ContactCallout.tsx`
- Create: `site/app/components/ScrollReveal.tsx`
- Modify: `site/app/components/ProjectCard.tsx`
- Modify: `site/app/components/Reveal.tsx`
- Modify: `site/app/components/SectionHeading.tsx`
- Modify: `site/app/page.tsx`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- `PortfolioHero` accepts `eyebrow`, `title`, `highlight`, `lede`, `note`, `actions`, `portrait`, and `scrollCue` props.
- `PortraitStage` requires `{ src, alt, width, height }`.
- `SectionIntro` accepts `{ id?, eyebrow, title, description? }`.
- `ProjectPreviewCard` consumes the existing `Project` data plus `index`.
- `ContactCallout` accepts eyebrow, title, body, and `ReactNode` actions.
- `ScrollReveal` preserves `{ children, delay?, className? }`.
- Compatibility modules re-export `ProjectPreviewCard`, `ScrollReveal`, and `SectionIntro` under their prior names.

- [ ] **Step 1: Add failing Home production-component contracts**

Assert the rendered Home route exposes the production component identities and retains one `h1`, the portrait dimensions, all three professional actions, the selected-work anchor, project-card count, contact callout, and footer.

```js
test("home composes production-backed library components", async () => {
  const { html } = await render("/");
  for (const name of ["PortfolioHero", "PortraitStage", "SectionIntro", "ProjectPreviewCard", "ContactCallout", "PortfolioFooter", "ScrollReveal"]) {
    assert.match(html, new RegExp(`data-component="${name}"`));
  }
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

```powershell
node --test --test-name-pattern="home composes production-backed library components" tests/rendered-html.test.mjs
```

Expected: FAIL because Home still owns its section markup.

- [ ] **Step 3: Implement typed Home components**

Move existing markup without rewriting copy. Keep `PortfolioHero` compositional by accepting action nodes and portrait props; do not embed Melissa-specific text in the component. Preserve existing CSS class names so visual output does not change.

- [ ] **Step 4: Refactor Home and verify GREEN**

Replace page-owned visual structures with the new components. Run:

```powershell
node --test --test-name-pattern="home composes production-backed library components|server-renders Melissa's My Work page|home page uses final brand assets|feedback intelligence card links" tests/rendered-html.test.mjs
```

Expected: all selected tests PASS with unchanged rendered Home content.

- [ ] **Step 5: Commit Task 2 files only**

```powershell
git add site/app/components/PortfolioHero.tsx site/app/components/PortraitStage.tsx site/app/components/SectionIntro.tsx site/app/components/ProjectPreviewCard.tsx site/app/components/ContactCallout.tsx site/app/components/ScrollReveal.tsx site/app/components/ProjectCard.tsx site/app/components/Reveal.tsx site/app/components/SectionHeading.tsx site/app/page.tsx site/tests/rendered-html.test.mjs
git commit -m "refactor: extract home portfolio components"
```

---

### Task 3: Extract and adopt reusable case-study compositions

**Files:**
- Create: `site/app/components/case-study/CaseStudyHero.tsx`
- Create: `site/app/components/case-study/CaseStudyMetadata.tsx`
- Create: `site/app/components/case-study/CaseStudyQuote.tsx`
- Create: `site/app/components/case-study/ContentBlockRenderer.tsx`
- Create: `site/app/components/case-study/InsightCard.tsx`
- Create: `site/app/components/case-study/InsightGrid.tsx`
- Create: `site/app/components/case-study/RecommendationCard.tsx`
- Create: `site/app/components/case-study/RecommendationList.tsx`
- Create: `site/app/components/case-study/SimpleContentList.tsx`
- Modify: `site/app/components/case-study/ChapterNav.tsx`
- Modify: `site/app/work/ai-powered-feedback-intelligence-platform/page.tsx`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Rename-compatible export: `ChapterRail` uses the existing `{ chapters, variant? }` contract and `ChapterNav` remains a compatibility alias.
- `CaseStudyHero` accepts back-link, eyebrow, title, deck, overview nodes, metadata items, and optional media.
- `CaseStudyMetadata` accepts `items: Array<{ label: string; value: string }>`.
- `CaseStudyQuote` accepts `{ children, attribution?, variant?: "default" | "workflow-question" }`.
- `ContentBlockRenderer<TMediaKey>` accepts typed content blocks, a `renderMedia(key, index)` callback, optional class name, optional list class, and article-heading mode.
- `InsightGrid` accepts `mode` plus ordered groups; it renders one `InsightCard` per group.
- `RecommendationList` accepts ordered groups and a segment renderer; each `RecommendationCard` preserves prose/media source order.
- `SimpleContentList` accepts `items: string[]`.

- [ ] **Step 1: Add failing case-study component contracts**

Assert the rendered Feedback route exposes stable production component identities for `CaseStudyHero`, `ChapterRail`, `ContentBlockRenderer`, `InsightGrid`, `RecommendationList`, and `PortfolioFooter` while retaining its existing semantic output.

```js
test("feedback case study composes production-backed library components", async () => {
  const { html } = await render("/work/ai-powered-feedback-intelligence-platform");
  for (const name of ["CaseStudyHero", "ChapterRail", "ContentBlockRenderer", "InsightGrid", "RecommendationList", "PortfolioFooter"]) {
    assert.match(html, new RegExp(`data-component="${name}"`));
  }
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

```powershell
node --test --test-name-pattern="feedback case study composes production-backed library components" tests/rendered-html.test.mjs
```

Expected: FAIL because the route still owns private renderer functions and hero markup.

- [ ] **Step 3: Implement presentation components without project copy**

Move reusable markup into typed files. Keep Feedback-specific heading detection, chapter indices, option boundaries, and content slices in the route. `ContentBlockRenderer` receives the project’s `renderMedia` callback and maps blocks in their original order.

- [ ] **Step 4: Refactor Feedback and verify all case-study invariants**

Run:

```powershell
node --test --test-name-pattern="feedback case study composes|renders the complete feedback intelligence|preserves source order|article headings|concept-validation quotes|desired workflow PNG|chapter navigation|videos" tests/rendered-html.test.mjs
```

Expected: all selected tests PASS, including exact content ordering, media placement, heading semantics, quote attribution, rail behavior, and autoplay video attributes.

- [ ] **Step 5: Commit Task 3 files only**

```powershell
git add site/app/components/case-study site/app/work/ai-powered-feedback-intelligence-platform/page.tsx site/tests/rendered-html.test.mjs
git commit -m "refactor: extract case study components"
```

---

### Task 4: Build the unlinked production component gallery

**Files:**
- Create: `site/app/component-library/catalog.tsx`
- Create: `site/app/component-library/page.tsx`
- Create: `site/app/component-library/component-library.css`
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- `CatalogEntry` is `{ name: string; description: string; category: CatalogCategory; preview: ReactNode }`.
- `CatalogCategory` is one of `"Foundations" | "Navigation & actions" | "Home" | "Case studies" | "Utility"`.
- Every description starts with `Use when` and every name is unique.
- Gallery-only `BrandColorSwatch`, `TypeSpecimen`, and `SurfaceTokenSample` stay inside the component-library folder.

- [ ] **Step 1: Add failing gallery-route and catalog contracts**

Add rendered tests that require HTTP-successful `/component-library`, one `h1`, all five category anchors, unique component names, non-empty `Use when` descriptions, live examples, and absence of `/component-library` from Home/About/Feedback navigation.

```js
test("component library documents each production component once", async () => {
  const { html } = await render("/component-library");
  const names = [...html.matchAll(/data-component-name="([^"]+)"/g)].map((match) => match[1]);
  assert.ok(names.length >= 20);
  assert.equal(new Set(names).size, names.length);
  assert.equal((html.match(/data-component-description="Use when [^"]+"/g) ?? []).length, names.length);
});
```

- [ ] **Step 2: Run gallery tests and confirm RED**

```powershell
node --test --test-name-pattern="component library" tests/rendered-html.test.mjs
```

Expected: FAIL because the route and catalog do not exist.

- [ ] **Step 3: Implement catalog and gallery shell**

Create a typed catalog that imports production components and supplies representative data. The page maps catalog categories and entries into neutral `<section>` and `<article>` documentation wrappers. Use local production assets only. Do not put gallery links in `PortfolioHeader` or `PortfolioFooter`.

- [ ] **Step 4: Add responsive, focus, and reduced-motion gallery CSS**

Use `.component-library-*` selectors only. The gallery shell uses the portfolio variables, a wrapping category nav, bounded preview canvases, `overflow-wrap:anywhere` for labels, visible `:focus-visible`, and one-column mobile layout. Production component selectors remain in existing global styles.

- [ ] **Step 5: Run gallery and route regression tests**

```powershell
node --test --test-name-pattern="component library|server-renders Melissa's My Work page|renders the complete feedback intelligence|enterprise search" tests/rendered-html.test.mjs
```

Expected: all selected tests PASS and public navigation contains no component-library link.

- [ ] **Step 6: Commit Task 4 files only**

```powershell
git add site/app/component-library site/tests/rendered-html.test.mjs
git commit -m "feat: add production component library"
```

---

### Task 5: Full automated and live responsive verification

**Files:**
- Modify only if a failing verification exposes a real component-library defect.

**Interfaces:**
- Consumes: all production routes and components from Tasks 1–4.
- Produces: evidence that the refactor and gallery are ready for future case studies.

- [ ] **Step 1: Run fresh production build and full tests**

From `site` on Windows:

```powershell
$env:WRANGLER_LOG_PATH="$PWD\.wrangler\logs\build.log"
npx.cmd vinext build
node --test tests/rendered-html.test.mjs
```

Expected: build exit code 0 and all tests PASS with zero failures.

- [ ] **Step 2: Run feature-scoped lint and diff hygiene**

```powershell
npx.cmd eslint app/component-library app/components app/page.tsx app/work/ai-powered-feedback-intelligence-platform/page.tsx tests/rendered-html.test.mjs
git diff --check
```

Expected: no new lint errors in feature files. If whole-tree diff hygiene reports a pre-existing user-edit warning, isolate and report it without modifying user content.

- [ ] **Step 3: Verify live desktop behavior**

Start the configured Vinext server and inspect Home, Feedback Intelligence, and `/component-library` at 1600×1000, 1200×900, and 901×900. Confirm no horizontal page overflow; existing Home and Feedback layouts remain visually unchanged; the gallery shows all five categories; live previews fit their canvases; keyboard focus is visible; the Feedback rail remains fixed and active.

- [ ] **Step 4: Verify live mobile behavior**

Inspect the same routes at 390×844. Confirm no horizontal page overflow; gallery categories and examples stack to one column; gallery navigation wraps; Feedback rail is hidden; media, cards, buttons, and headings remain within the viewport.

- [ ] **Step 5: Verify semantic and motion behavior**

Confirm one page-level `h1` on each route, ordered headings, semantic figures/captions, nested quote attribution, image alternative text, all case-study videos autoplay/loop/muted/controls/playsInline, and reveal motion disables under reduced-motion preference.

- [ ] **Step 6: Review final range and record completion**

```powershell
git status --short
git log --oneline --decorate -8
git diff --stat <starting-commit>..HEAD
git diff --check <starting-commit>..HEAD
```

Expected: only approved component-library, refactor, test, and documentation files appear in the implementation range; user-owned uncommitted changes remain present and unaltered.
