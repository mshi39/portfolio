# Feedback Intelligence Page Refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the Feedback Intelligence case study’s hierarchy, media behavior, navigation, content treatments, and responsive presentation according to the approved August 10 design.

**Architecture:** Extend the reusable navigation and media primitives with typed behavior while scoping visual layout changes to the Feedback Intelligence page. Model special narrative treatments explicitly in the typed content renderer, add one original local workflow illustration, and preserve Enterprise Search behavior through regression coverage.

**Tech Stack:** Next.js 16, React 19, TypeScript, native CSS, IntersectionObserver, Node test runner, Vinext, ImageGen.

## Global Constraints

- Route remains `/work/ai-powered-feedback-intelligence-platform`.
- Desktop chapter navigation is fixed, left-aligned, vertically centered, compact, and active-section aware.
- Chapter navigation is hidden at widths of 900px and below.
- Active chapter is purple, slightly enlarged, keyboard accessible, and marked with `aria-current`.
- Videos autoplay, loop, play inline, remain muted, retain controls, and use metadata preload.
- Remove the header thumbnail but retain the hero video.
- Keep the exact requested Trust in AI replacement sentence and remove the displaced duplicate sentence.
- Preserve content order except for the explicitly requested Workflow Research grouping.
- Reuse the Enterprise Search blockquote and recommendation-card visual language.
- Do not alter Enterprise Search navigation behavior.
- No new runtime dependencies and no horizontal overflow.

---

### Task 1: Add Failing Refinement Contracts

**Files:**
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: existing server-render helper and route HTML.
- Produces: regression contracts for all requested content, semantic, media, and class-level behaviors.

- [ ] Add a test asserting the hero contains no thumbnail image and still contains the hero video.
- [ ] Assert every case-study video includes `autoplay`, `loop`, `muted`, `controls`, `playsinline`, and `preload="metadata"`.
- [ ] Assert the page uses the feedback-specific fixed-rail navigation contract and its mobile-hide CSS contract.
- [ ] Assert Feedback section `h2` strings do not begin with numeric prefixes.
- [ ] Assert Workflow Research renders `Outcome` outside insight articles, the requested highlighted question, and its concluding paragraphs in source order.
- [ ] Assert Concept Validation contains semantic blockquotes and the new local workflow illustration.
- [ ] Assert the exact Trust replacement sentence exists and the removed sentence does not.
- [ ] Assert End-to-End System uses recommendation-style card classes and the final two lists use simple-list classes.
- [ ] Assert the caption spacing and purple `h3` CSS contracts.
- [ ] Run build/tests and confirm the new tests fail for missing behavior.
- [ ] Commit the failing contracts.

---

### Task 2: Generate and Validate the Desired-Workflow Illustration

**Files:**
- Create: `site/public/portfolio/feedback-intelligence-desired-workflow.png`

**Interfaces:**
- Produces: one original, local PNG used by the Concept Validation section.

- [ ] Generate a landscape flat-design workflow illustration using white, `#FEF1FF`, and `#A74EF7`, rounded professional cartoon styling, and a continuous visual flow from customer conversation through capture, trustworthy AI synthesis, human review, prioritization, product execution, and outcome learning.
- [ ] Avoid embedded prose, logos, watermarks, gradients, photorealism, and unrelated decoration.
- [ ] Inspect the generated output for coherent flow, brand fit, legibility, and absence of malformed text.
- [ ] Save the selected PNG under the exact public path and record its intrinsic dimensions.
- [ ] Validate PNG signature, nonzero dimensions, and nonzero size.
- [ ] Commit the asset.

---

### Task 3: Implement Reusable Navigation and Media Behavior

**Files:**
- Modify: `site/app/components/case-study/ChapterNav.tsx`
- Modify: `site/app/components/case-study/CaseStudyMedia.tsx`
- Modify: `site/app/work/enterprise-search-generative-ai/page.tsx`
- Modify: `site/app/case-study.css`

**Interfaces:**
- `ChapterNav` gains a variant/class contract that activates IntersectionObserver behavior only for the Feedback rail.
- `CaseStudyMedia` videos render autoplay/loop/muted by default or through explicit typed props.

- [ ] Run the Task 1 component/media contracts to confirm red.
- [ ] Convert only the active rail path to a client component and track active section IDs with IntersectionObserver.
- [ ] Render `aria-current="location"` on the active link and preserve native anchors.
- [ ] Add scoped fixed-left vertical rail styling, active purple/enlarged styling, reduced-motion handling, and the 900px hide rule.
- [ ] Add autoplay, loop, and muted video behavior while preserving controls, inline playback, preload, and fallback text.
- [ ] Preserve Enterprise Search’s current horizontal sticky navigation through its default variant.
- [ ] Add 12px bottom margin to figure captions and purple styling to case-study `h3` headings.
- [ ] Run focused and full tests to confirm component contracts pass without Enterprise regressions.
- [ ] Commit the reusable behavior.

---

### Task 4: Restructure Feedback Content and Section Presentation

**Files:**
- Modify: `site/app/data/feedback-intelligence.ts`
- Modify: `site/app/work/ai-powered-feedback-intelligence-platform/page.tsx`
- Modify: `site/app/case-study.css`

**Interfaces:**
- Consumes: the new workflow PNG dimensions and reusable component variants.
- Produces: requested semantic structure and visual treatments on the Feedback page.

- [ ] Run Task 1 page-content contracts to confirm they remain red.
- [ ] Remove the hero thumbnail render while keeping its data available for the home card if needed.
- [ ] Remove numeric prefixes from all Feedback section `h2` titles.
- [ ] Split Workflow Research so `Outcome` and the requested paragraph range render outside insight articles; render the exact “How might we...” sentence as the highlighted pull statement.
- [ ] Render Concept Validation quote passages as `.case-quote` blockquotes and place the new desired-workflow image with meaningful alt text and caption.
- [ ] Restyle End-to-End capability groups using recommendation-style card markup and responsive media placement.
- [ ] Apply the exact Trust in AI replacement and remove the duplicate Clear division sentence.
- [ ] Render Projected Impact and Reflection lists with a shared simple single-column list class.
- [ ] Run the full build and tests to green.
- [ ] Commit the page refinements.

---

### Task 5: Final Review and Responsive Verification

**Files:**
- Verify all files changed in Tasks 1–4.

**Interfaces:**
- Produces: evidence-backed completion and integration readiness.

- [ ] Run a fresh Vinext production build and complete Node test suite.
- [ ] Run feature-scoped lint and `git diff --check`.
- [ ] Start the configured site server and confirm the page, original media, and new workflow PNG return HTTP 200 with correct MIME types.
- [ ] At desktop width, verify the fixed left chapter rail remains vertically centered, updates active state while scrolling, does not overlap content, and navigation clicks work.
- [ ] At mobile width around 390×844, verify the chapter navigation is hidden and the page has no horizontal overflow.
- [ ] Verify all videos autoplay-ready, muted, looping, controllable, and inline; confirm representative videos advance and loop where browser policy permits.
- [ ] Verify Workflow Outcome structure, highlighted question, blockquotes, desired workflow image, recommendation-style pipeline cards, Trust copy, and simple lists visually and semantically.
- [ ] Request whole-feature code review and address any Critical or Important findings.
- [ ] Report final route, build/test counts, asset status, desktop/mobile overflow results, and any environment limitation.

