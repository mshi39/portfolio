# AI-Powered Feedback Intelligence Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dedicated, locally linked portfolio case-study page containing the exact fourth-tab `Portfolio` narrative and all 14 specified media placements for the AI-Powered Customer Feedback Intelligence Platform.

**Architecture:** Keep the page as a project-specific server component that composes shared case-study primitives. Refactor the hard-coded chapter navigation into a prop-driven component, add one reusable image/video media primitive, store the authoritative source as typed local data, and keep all Drive files as validated local public assets.

**Tech Stack:** Next.js 16, React 19, TypeScript, native CSS, Node test runner, Vinext, Google Drive connector.

## Global Constraints

- Authoritative content source: Google Doc `Intelligent Feedback Platform`, tab `Portfolio` (`t.cgakox9y3jbx`).
- Preserve all 233 source paragraphs, wording, order, heading relationships, and lists without paraphrasing or silent grammar correction.
- Replace 14 bracketed media instructions with actual media; do not render instruction strings.
- Download and validate all 13 unique Drive assets; render file `10Mv8gWIbIxOvBuJD1n0rKtKwmIxIrDM5` twice.
- Route: `/work/ai-powered-feedback-intelligence-platform`.
- Home card opens the local route in the same tab.
- Follow `docs/superpowers/specs/case-study-design.md` and `docs/superpowers/specs/2026-08-02-feedback-intelligence-case-study-design.md`.
- Reuse the white, `#FEF1FF`, `#A74EF7`, Fredoka, Nunito Sans, rounded, light-theme visual system.
- Exactly one `h1`; semantic headings, lists, figures, captions, videos, and navigation.
- Native videos use `controls`, `playsInline`, and `preload="metadata"`; autoplay remains disabled.
- No horizontal overflow at desktop or mobile widths.
- No new runtime dependency.
- The workspace has no Git repository; do not initialize one or fabricate commit checkpoints.

---

## File Map

- Create `site/app/data/feedbackIntelligenceCaseStudy.ts`: typed, exact source content and 14 ordered media-placement descriptors.
- Create `site/app/work/ai-powered-feedback-intelligence-platform/page.tsx`: project-specific semantic composition.
- Create `site/app/components/case-study/CaseStudyMedia.tsx`: shared image/video renderer.
- Modify `site/app/components/case-study/ChapterNav.tsx`: accept chapter definitions through props.
- Modify `site/app/work/enterprise-search-generative-ai/page.tsx`: pass its existing chapter definitions to the refactored navigation.
- Modify `site/app/data/projects.ts`: local Feedback Intelligence route and authoritative card metadata.
- Modify `site/app/case-study.css`: comparison, pipeline, video, and responsive styles.
- Modify `site/tests/rendered-html.test.mjs`: route, exact-copy, media, semantics, and regression coverage.
- Create local media files under `site/public/portfolio/feedback-intelligence-*`.

---

### Task 1: Add Failing Route, Content, and Media Tests

**Files:**
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: existing `render(path)` test helper.
- Produces: regression contract for the home card, route, nine anchors, exact phrases, 14 media placements, and video attributes.

- [ ] **Step 1: Add the local-card and route test**

Add assertions equivalent to:

```js
test("feedback intelligence card links to the local case study", async () => {
  const { html } = await render("/");
  assert.match(html, /AI-Powered Customer Feedback Intelligence Platform/);
  assert.match(html, /April.*May 2026/);
  assert.match(html, /href="\/work\/ai-powered-feedback-intelligence-platform"/);
});
```

- [ ] **Step 2: Add the case-study structure test**

```js
test("renders the complete feedback intelligence case study", async () => {
  const { response, html } = await render("/work/ai-powered-feedback-intelligence-platform");
  assert.equal(response.status, 200);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
  for (const id of ["opportunity", "workflow-research", "product-architecture", "concept-validation", "feedback-pipeline", "trust-in-ai", "collaboration", "projected-impact", "demonstrated-skills"]) {
    assert.match(html, new RegExp(`id="${id}"`));
    assert.match(html, new RegExp(`href="#${id}"`));
  }
});
```

- [ ] **Step 3: Add exact-source coverage assertions**

Assert these exact phrases render:

```js
for (const phrase of [
  "Redefining an AI meeting concept into an end-to-end system that connects customer insights to product action",
  "Solo UX Designer",
  "35 pain points",
  "17 MVP requirements",
  "more than 20 hours per product-testing program",
  "approximately 3×",
  "How might we create a continuous system that captures customer feedback, turns it into trustworthy intelligence, and connects it to product action?",
  "AI supports synthesis and content generation, while users retain authority over interpretation, prioritization, and execution.",
]) assert.match(html, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
```

- [ ] **Step 4: Add media assertions**

Assert the 14 placement names use `/portfolio/feedback-intelligence-` paths, the shared hero/AI-insight path appears twice, and every `<video>` contains `controls`, `playsInline`, and `preload="metadata"`.

- [ ] **Step 5: Run the test suite to prove the new tests fail**

Run from `site`:

```powershell
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'
.\node_modules\.bin\vinext.cmd build
node --test tests\rendered-html.test.mjs
```

Expected: existing tests pass; new Feedback Intelligence route/card/media tests fail because the route and local link do not exist.

---

### Task 2: Acquire and Validate Every Source Media File

**Files:**
- Create: `site/public/portfolio/feedback-intelligence-thumbnail.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-hero-insights.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-workshop-map.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-user-flow.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-product-models.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-prototype.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-lower-barrier.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-scheduling.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-source-verification.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-central-feedback.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-jira.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-presentation.<ext>`
- Create: `site/public/portfolio/feedback-intelligence-customer-portal.<ext>`

**Interfaces:**
- Consumes: 13 Drive file IDs from the approved specification.
- Produces: local, MIME-validated media paths used by the typed data module.

- [ ] **Step 1: Fetch all 13 unique Drive files through the connected Drive account**

Use `google_drive_fetch` with `download_raw_file=true`. For streamed references, retrieve the authenticated bytes; do not use unauthenticated `drive.usercontent.google.com` links.

- [ ] **Step 2: Determine each real file type**

For every result, record connector `mime_type`, original filename, file size, and extension. Use the real extension in the final local filename. Reject HTML sign-in responses and files whose magic bytes do not match the reported media type.

- [ ] **Step 3: Decode or copy bytes into the public asset area**

Use connector-provided bytes or file references. Keep only one local copy of the shared hero/AI-insight media; the page data references that path in two placements.

- [ ] **Step 4: Validate the local media inventory**

For images, confirm PNG/JPEG/WebP magic bytes and nonzero dimensions. For videos, confirm the declared video MIME type and nonzero file size. Confirm exactly 13 unique local files exist.

- [ ] **Step 5: Stop on any inaccessible asset**

If any connector fetch fails or returns an unsupported file, report its placement label and Drive ID. Do not continue with a placeholder or omission.

---

### Task 3: Make Shared Case-Study Navigation and Media Reusable

**Files:**
- Modify: `site/app/components/case-study/ChapterNav.tsx`
- Create: `site/app/components/case-study/CaseStudyMedia.tsx`
- Modify: `site/app/work/enterprise-search-generative-ai/page.tsx`
- Modify: `site/app/case-study.css`

**Interfaces:**
- Produces: `type Chapter = { id: string; label: string }` and `ChapterNav({ chapters }: { chapters: Chapter[] })`.
- Produces: `CaseStudyMedia({ src, kind, alt, caption }: { src: string; kind: "image" | "video"; alt?: string; caption: string })`.

- [ ] **Step 1: Add a focused component-rendering test contract**

Extend rendered HTML assertions so Enterprise Search still contains its nine existing navigation links and the new page’s media renders as semantic `<figure>` plus `<video>` or image content.

- [ ] **Step 2: Refactor `ChapterNav`**

Replace the hard-coded internal chapter array with exported types and a required `chapters` prop:

```tsx
export type Chapter = { id: string; label: string };

export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  return <nav className="chapter-nav" aria-label="Case study chapters">
    {chapters.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}
  </nav>;
}
```

- [ ] **Step 3: Preserve Enterprise Search behavior**

Define its current nine `id`/`label` pairs in the Enterprise Search page and render `<ChapterNav chapters={enterpriseChapters} />`.

- [ ] **Step 4: Implement `CaseStudyMedia`**

```tsx
import Image from "next/image";

export function CaseStudyMedia({ src, kind, alt = "", caption }: Props) {
  return <figure className={`case-media case-media-${kind}`}>
    <div className="case-media-frame">
      {kind === "video"
        ? <video src={src} controls playsInline preload="metadata">Your browser does not support this video.</video>
        : <Image unoptimized src={src} alt={alt} width={1500} height={900} />}
    </div>
    <figcaption>{caption}</figcaption>
  </figure>;
}
```

Define the `Props` type in the same file with `kind`, `src`, `caption`, and optional `alt`.

- [ ] **Step 5: Add shared media styles**

Use the existing `.case-figure` frame language. Set media width to `100%`, video display to `block`, `aspect-ratio: 16 / 9`, `object-fit: contain`, rounded inner corners, and a dark neutral video background. Preserve captions and responsive behavior.

- [ ] **Step 6: Run the full tests**

Expected: Enterprise Search regression tests pass; Feedback route tests still fail because its page is not yet created.

---

### Task 4: Build Exact Typed Content and Page Composition

**Files:**
- Create: `site/app/data/feedbackIntelligenceCaseStudy.ts`
- Create: `site/app/work/ai-powered-feedback-intelligence-platform/page.tsx`
- Modify: `site/app/case-study.css`
- Modify: `site/app/data/projects.ts`

**Interfaces:**
- Consumes: `Chapter`, `ChapterNav`, `CaseStudySection`, `CaseStudyFigure`, `CaseStudyMedia`, `MetricCard`, `ButtonLink`, and local media paths.
- Produces: successful server-rendered route `/work/ai-powered-feedback-intelligence-platform`.

- [ ] **Step 1: Retrieve the complete authoritative tab content**

Use `google_drive_get_document_text` for tab `t.cgakox9y3jbx`. Preserve all returned paragraphs in index order. Build an in-memory coverage check of `startIndex`, text, named style, and `isListItem`; do not persist connector response metadata into the site.

- [ ] **Step 2: Create typed content data**

Define:

```ts
export type FeedbackContentBlock =
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "media"; key: FeedbackMediaKey };
```

Define `FeedbackMediaKey` as the 14 placement keys, including distinct `hero-video` and `ai-insight-video` keys that resolve to the same local path. Store every source paragraph exactly once as a heading, paragraph, or list item in its source order.

- [ ] **Step 3: Add a mechanical source coverage check during implementation**

Compare the normalized visible strings in the typed data with all non-media source paragraphs. Verify count and order before page composition. Media instructions must account for exactly 14 source paragraphs and content blocks must account for every other paragraph.

- [ ] **Step 4: Compose the hero and overview**

Render the exact title, subtitle, overview paragraphs, projected-impact list, role, timeline, thumbnail, and hero video. Label impact as projected and do not convert projections into achieved results.

- [ ] **Step 5: Compose the nine semantic chapters**

Use the approved anchor IDs and exact source order. Render source headings at `h2`/`h3`, paragraphs as prose, contiguous list items as semantic `<ul>`, and media blocks in their exact instruction positions.

- [ ] **Step 6: Add project-specific layouts without changing copy**

Use a three-option comparison for the product models, an insight grid for the five workflow pain points, a pipeline treatment for the end-to-end capability sections, and outcome/skill grids for the final sections. Each layout must preserve original heading and paragraph order in the DOM.

- [ ] **Step 7: Update the home card**

Change the Feedback Intelligence project title to `AI-Powered Customer Feedback Intelligence Platform`, timeline to `April–May 2026`, and href to `/work/ai-powered-feedback-intelligence-platform`. Preserve the existing summary, tags, preview image, and alt text.

- [ ] **Step 8: Add responsive CSS**

Extend `case-study.css` with `.feedback-*` classes only where shared classes are insufficient. Collapse comparison and pipeline columns under `900px`; make all media width `100%`; prevent page-level horizontal overflow; preserve source order.

- [ ] **Step 9: Run tests to achieve green**

Run the full build and Node tests. Expected: all existing and new tests pass with zero failures.

---

### Task 5: Verify Content, Media, Accessibility, and Responsive Layout

**Files:**
- Verify: all files modified or created in Tasks 1–4

**Interfaces:**
- Consumes: completed route and test suite.
- Produces: evidence-backed completion report.

- [ ] **Step 1: Run the production build and complete test suite fresh**

```powershell
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'
.\node_modules\.bin\vinext.cmd build
node --test tests\rendered-html.test.mjs
```

Expected: exit code `0`, all tests pass, no route compilation errors.

- [ ] **Step 2: Verify every media response locally**

Start the local preview and request each of the 13 unique media URLs. Confirm HTTP `200`, correct `Content-Type`, and nonzero `Content-Length`.

- [ ] **Step 3: Perform desktop live-page checks**

At the desktop viewport, verify title, subtitle, header, sticky chapter navigation, hero media, one middle video, the product comparison, final impact, and footer. Confirm exactly one `h1`, nine case-study sections, 14 media placements, and zero horizontal overflow.

- [ ] **Step 4: Perform mobile live-page checks**

At approximately `390 × 844`, verify chapter navigation remains usable, comparison and pipeline content stack in source order, videos retain controls, text does not clip, and document width equals viewport width.

- [ ] **Step 5: Verify lazy media after scrolling**

Scroll representative image and video placements into view and confirm their natural dimensions or ready state. Do not classify below-fold lazy images as broken before they are requested.

- [ ] **Step 6: Complete the design-guide preflight**

Check color consistency, radius consistency, button contrast, heading hierarchy, reduced motion, focus treatment, alt text, video fallback, local asset paths, and source-copy fidelity against `case-study-design.md`.

- [ ] **Step 7: Report exact evidence**

Report the route, the 13 unique local files/14 placements, test pass count, successful build, desktop/mobile overflow result, and any disclosed source limitations. Do not claim completion without fresh evidence from Steps 1–6.
