# Feedback Article, Navigation, and Workflow Image Refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add semantic article headings and quote attribution, convert the labeled workflow illustration to true transparency, and restyle the Feedback chapter rail as a connected vertical timeline.

**Architecture:** Extend the existing typed Feedback renderer with article-heading context and explicit quote attribution. Keep the navigation behavior unchanged while replacing only the Feedback rail’s presentation, and create the transparent PNG non-destructively from a chroma-key edit of the approved labeled artwork.

**Tech Stack:** Next.js 16, React 19, TypeScript, native CSS, Node test runner, Vinext, ImageGen, PNG alpha processing.

## Global Constraints

- Scope all heading and rail changes to `/work/ai-powered-feedback-intelligence-platform`.
- Every heading inside a Feedback `<article>` renders as `<h4>` with `color:#17121d` and `font-size:20px`.
- Standalone Outcome remains `<h3>`.
- Each quote includes `<footer><cite>– Splunk Product Manager</cite></footer>` inside its blockquote with no duplicate external attribution.
- Remove only the workflow image’s outer white canvas; preserve the pale-pink backdrop and five labeled stages.
- Preserve workflow image dimensions at 1693×929 and add true alpha transparency.
- Feedback chapter navigation has no container background, border, radius, or shadow.
- A vertical line visually connects every navigation link; the local segment thickens on hover, focus-visible, and active state.
- Preserve fixed positioning, active-section tracking, accessible contrast, reading gutter, and mobile hiding at 900px and below.
- Enterprise Search remains unchanged.
- No new runtime dependencies and no horizontal overflow.

---

### Task 1: Add Failing Semantic and Rail Contracts

**Files:**
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: red contracts for article headings, quote ownership, transparent asset metadata, and connected rail styling.

- [ ] Add assertions that every Feedback article heading is `h4`, no article contains `h3`, and Outcome remains a standalone `h3`.
- [ ] Assert Feedback article `h4` CSS uses 20px and `#17121d`.
- [ ] Assert both quote blockquotes contain footer/cite attribution and no separate attribution paragraph follows them.
- [ ] Add a local PNG validation test that reads the workflow asset, checks 1693×929, an alpha-capable PNG color type, and transparent corner pixels.
- [ ] Assert `.feedback-chapter-nav` has transparent/no panel treatment and a continuous vertical rail with thicker hover/focus/active link segments.
- [ ] Assert Enterprise navigation remains the default variant.
- [ ] Run build/tests and confirm new contracts fail only for missing refinements.
- [ ] Commit the failing contracts.

---

### Task 2: Convert the Workflow Image to True Transparency

**Files:**
- Modify: `site/public/portfolio/feedback-intelligence-desired-workflow.png`

**Interfaces:**
- Produces: a 1693×929 RGBA PNG with transparent outer canvas and preserved artwork.

- [ ] Use the approved labeled image as the edit target and generate a version on one uniform chroma-key background while preserving all five panels, labels, arrows, pale-pink backdrop, and feedback loop.
- [ ] Remove the chroma key with the installed alpha helper using soft matte and despill.
- [ ] Inspect transparent corners, label accuracy, preserved pale-pink backdrop, and edge quality.
- [ ] Validate RGBA/alpha channel, 1693×929 canvas, transparent corners, nonzero visible coverage, and PNG signature.
- [ ] Run the PNG test contract to green.
- [ ] Commit the revised asset.

---

### Task 3: Implement Semantic Article Headings, Quote Attribution, and Connected Rail

**Files:**
- Modify: `site/app/data/feedback-intelligence.ts`
- Modify: `site/app/work/ai-powered-feedback-intelligence-platform/page.tsx`
- Modify: `site/app/case-study.css`

**Interfaces:**
- `BasicBlocks` gains an `articleHeadings?: boolean` option.
- Quote blocks gain `attribution?: string` and render attribution inside `blockquote > footer > cite`.

- [ ] Run Task 1 semantic/CSS contracts to confirm red.
- [ ] Add explicit attribution to the two Concept Validation quote records and remove their standalone attribution paragraphs.
- [ ] Extend `BasicBlocks` so level-3 headings render as `h4` only when `articleHeadings` is true.
- [ ] Pass `articleHeadings` for every `BasicBlocks` instance rendered inside comparison, insight, outcome, trust, and pipeline articles.
- [ ] Render quote attribution inside semantic footer/cite markup.
- [ ] Add scoped Feedback article h4 styling with 20px size, `#17121d`, rounded heading typeface, spacing, and line height.
- [ ] Remove Feedback nav container panel styling; add a continuous vertical line and local link segment using pseudo-elements.
- [ ] Make local link segments thicker on hover, focus-visible, and `aria-current="location"` while preserving active color and size.
- [ ] Preserve mobile hide, desktop gutter, reduced motion, and Enterprise default navigation.
- [ ] Run production build/full tests/feature lint/diff check to green.
- [ ] Commit the semantic and rail refinements.

---

### Task 4: Final Responsive and Accessibility Verification

**Files:**
- Verify all files changed in Tasks 1–3.

**Interfaces:**
- Produces: evidence-backed completion and merge readiness.

- [ ] Run a fresh Vinext build, full Node suite, feature-scoped lint, and range diff check.
- [ ] Verify the workflow PNG returns HTTP 200 as `image/png` and renders with transparent outer canvas over page backgrounds.
- [ ] At desktop widths, confirm the connected rail has no panel, remains fixed and centered, does not overlap content, and thickens the correct local segment on hover/focus/active state.
- [ ] At mobile 390×844, confirm the rail is hidden and the page has zero horizontal overflow.
- [ ] Verify all article headings are visually and semantically `h4`, standalone Outcome remains `h3`, and both speakers are inside their quote blocks.
- [ ] Confirm Enterprise Search navigation and closing panel remain unchanged.
- [ ] Request whole-feature code review and address all Critical or Important findings.
- [ ] Report build/test counts, transparency evidence, desktop/mobile results, and any non-blocking baseline limitation.
