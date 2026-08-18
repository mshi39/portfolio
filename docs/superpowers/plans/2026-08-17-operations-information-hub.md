# Operations Information Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local, hiring-manager-focused Operations Information Hub case study and connect its existing Home page card to the new route.

**Architecture:** Add one route composed entirely from the existing case-study component library, with project copy and media descriptors kept in that route because no second consumer exists. Copy only the relevant archived visuals into a descriptive public asset folder, update the existing project data entry, and protect the route plus Home link through the rendered-HTML integration test.

**Tech Stack:** Next.js 15, React 19, TypeScript, existing CSS component library, Node test runner.

## Global Constraints

- Treat `Portfolio Content/Operations Information Hub.html` as the source of truth; do not invent metrics or responsibilities.
- Reuse existing shared case-study components and `case-study.css`; create no new shared component or dependency.
- Store production images under `site/public/portfolio/operations-hub/` with descriptive filenames and intrinsic dimensions.
- Preserve semantic heading order, meaningful image alternative text, captions, keyboard focus, reduced-motion behavior, and responsive media behavior.
- Keep the existing Home card thumbnail unless a source image is demonstrably better in the current crop.
- Do not publish, merge to `main`, push, or open a pull request without explicit instruction.

---

### Task 1: Protect the new route and Home navigation contract

**Files:**
- Modify: `site/tests/rendered-html.test.mjs`
- Modify: `site/app/data/projects.ts`

**Interfaces:**
- Consumes: the existing `projects` array and the test suite's `renderPath()` helper.
- Produces: a Home card whose `href` is `/work/operations-information-hub`, plus a rendered-route contract for that path.

- [ ] **Step 1: Write the failing route and navigation test**

Add one test using the existing rendered-HTML helper and assertion style:

```js
test("Operations Information Hub has a local case study and Home link", async () => {
  const home = await renderPath("/");
  const caseStudy = await renderPath("/work/operations-information-hub");

  assert.match(home, /href="\/work\/operations-information-hub"/);
  assert.match(caseStudy, /<h1[^>]*>Operations Information Hub<\/h1>/);
  assert.match(caseStudy, /Build stakeholder belief/);
  assert.match(caseStudy, /Design around the operator/);
  assert.match(caseStudy, /Expand the right scope/);
});
```

The production mutation this catches is deletion or misrouting of the local case study, including a regression back to the archived external URL.

- [ ] **Step 2: Run the focused test and verify the correct failure**

Run from `site/`:

```bash
node --test --test-name-pattern="Operations Information Hub" tests/rendered-html.test.mjs
```

Expected: FAIL because `/work/operations-information-hub` does not exist and the Home entry still points to `melissashi.com`.

- [ ] **Step 3: Change only the Home project destination**

In the existing Operations Information Hub object in `site/app/data/projects.ts`, replace the external `href` with:

```ts
href: "/work/operations-information-hub"
```

Do not change the title, description, dates, tags, thumbnail, or alt text in this task.

- [ ] **Step 4: Re-run the focused test and preserve the expected route failure**

Run:

```bash
node --test --test-name-pattern="Operations Information Hub" tests/rendered-html.test.mjs
```

Expected: FAIL only because the case-study route is still missing; the Home link assertion passes.

- [ ] **Step 5: Commit the navigation contract**

```bash
git add site/tests/rendered-html.test.mjs site/app/data/projects.ts
git commit -m "test: define operations hub route contract"
```

---

### Task 2: Add the production media set

**Files:**
- Create: `site/public/portfolio/operations-hub/vision-storyboards.png`
- Create: `site/public/portfolio/operations-hub/first-hub-concept.png`
- Create: `site/public/portfolio/operations-hub/interview-synthesis.jpg`
- Create: `site/public/portfolio/operations-hub/operator-day-in-the-life.jpg`
- Create: `site/public/portfolio/operations-hub/first-end-to-end-prototype.jpg`
- Create: `site/public/portfolio/operations-hub/information-architecture-round-one.jpg`
- Create: `site/public/portfolio/operations-hub/information-architecture-round-two.jpg`
- Create: `site/public/portfolio/operations-hub/source-tool-integration-options.jpg`
- Create: `site/public/portfolio/operations-hub/task-response-prototype.jpg`
- Create: `site/public/portfolio/operations-hub/task-response-options.jpg`
- Create: `site/public/portfolio/operations-hub/final-task-design.jpg`
- Create: `site/public/portfolio/operations-hub/first-well-test-trend.jpg`
- Create: `site/public/portfolio/operations-hub/final-well-test-trend.jpg`

**Interfaces:**
- Consumes: the 13 project visuals in `Portfolio Content/Operations Information Hub_files/`, matched in source order to Figures 1–13.
- Produces: stable public URLs under `/portfolio/operations-hub/` for Task 3.

- [ ] **Step 1: Verify the source-order mapping before copying**

Use the image references in `Operations Information Hub.html` to confirm that Figures 1–13 map to the source files in page order. Record no scripts, styles, menu icons, or portfolio logo in the production set.

- [ ] **Step 2: Copy and rename the 13 informative images**

Copy the matched files into `site/public/portfolio/operations-hub/` using the exact filenames above. Preserve the original image bytes and archived source files; no format conversion or destructive move is needed.

- [ ] **Step 3: Verify dimensions and file count**

Run a read-only image-dimension check and confirm exactly 13 files exist. Expected dimensions must match their source images; zero-byte files or accidental 44×36 menu icons fail this check.

- [ ] **Step 4: Commit the media**

```bash
git add site/public/portfolio/operations-hub
git commit -m "assets: add operations hub case study visuals"
```

---

### Task 3: Build the case-study route from existing components

**Files:**
- Create: `site/app/work/operations-information-hub/page.tsx`

**Interfaces:**
- Consumes: `PortfolioHeader`, `PortfolioFooter`, `CaseStudyHero`, `CaseStudyMedia`, `CaseStudyQuote`, `CaseStudySection`, `InsightCard`, `InsightGrid`, `MetricCard`, `RecommendationCard`, `RecommendationList`, `VerticalChapterNav`, and `WorkflowQuestion` from the existing component library; the 13 public media URLs from Task 2.
- Produces: the Next.js page component for `/work/operations-information-hub` and page metadata.

- [ ] **Step 1: Define metadata, chapters, and typed media descriptors**

Create `page.tsx` with:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioFooter } from "../../components/PortfolioFooter";
import { PortfolioHeader } from "../../components/PortfolioHeader";
import { CaseStudyHero } from "../../components/case-study/CaseStudyHero";
import { CaseStudyMedia } from "../../components/case-study/CaseStudyMedia";
import { CaseStudyQuote } from "../../components/case-study/CaseStudyQuote";
import { CaseStudySection } from "../../components/case-study/CaseStudySection";
import { InsightCard } from "../../components/case-study/InsightCard";
import { InsightGrid } from "../../components/case-study/InsightGrid";
import { MetricCard } from "../../components/case-study/MetricCard";
import { RecommendationCard } from "../../components/case-study/RecommendationCard";
import { RecommendationList } from "../../components/case-study/RecommendationList";
import { VerticalChapterNav } from "../../components/case-study/VerticalChapterNav";
import { WorkflowQuestion } from "../../components/case-study/WorkflowQuestion";

export const metadata: Metadata = {
  title: "Operations Information Hub — Melissa Shi",
  description: "Designing a centralized operations hub around field operators' mental models and end-to-end workflows.",
};

const chapters = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "build-belief", label: "Build belief" },
  { id: "operator-model", label: "Operator model" },
  { id: "expand-scope", label: "Expand scope" },
  { id: "results", label: "Results" },
];
```

Add a local `media` record containing each URL, source width, source height, meaningful alt text, and a decision-oriented caption. Keep this record in `page.tsx`; a separate data layer has no second consumer.

- [ ] **Step 2: Compose the hero and impact overview**

Use `CaseStudyHero` with the exact public-facing content contract:

```tsx
<CaseStudyHero
  backLink={<Link className="case-back" href="/#selected-work">← Back to work</Link>}
  eyebrow="Enterprise operations · UX design · User research"
  title="Operations Information Hub"
  deck="Bringing more than 30 fragmented field tools into one operator-centered workflow."
  overviewPanels={[
    { heading: "Problem", content: <p>Operators moved between siloed tools and manually transferred data to complete daily surveillance and optimization work.</p> },
    { heading: "Solution", content: <p>A tablet-first hub organized information around operator responsibilities and connected data with the actions needed to complete the work.</p> },
  ]}
  metadataItems={[
    { label: "My role", value: "UX Design Lead" },
    { label: "Team", value: "Senior UX Designer, Senior Service Designer, UX Designer" },
    { label: "Employer", value: "ExxonMobil Information Technology" },
    { label: "Timeline", value: "May 2021–December 2022" },
  ]}
  mediaSlots={<CaseStudyMedia kind="image" src="/portfolio/operations-hub/first-hub-concept.png" alt="Early concept for the centralized operations information hub" width={879} height={511} caption="An early concept made the central-hub vision tangible for business stakeholders." />}
/>
```

Start `overview` with four existing `MetricCard` components: `30+` tools in the original landscape, `10+` centralized in the MVP, `4` applications replaced or targeted for replacement, and `~30 min` walkthrough needed by most operators.

- [ ] **Step 3: Compose context and the three decision chapters**

Use concise prose and existing components in this order:

1. `context`: an `InsightGrid` for fragmented tools, isolated data, unstable connectivity, and poor software experience; close with the operator day-in-the-life media.
2. `build-belief`: vision storyboards, seven interviews, synthesis, early prototype, and the stakeholder quotation. Use a `WorkflowQuestion` framing how design could make an abstract platform credible before development.
3. `operator-model`: two IA rounds, pad/run findings, source-tool integration options, the read-only prototype finding, write-back advocacy, task-response alternatives, and final task design. Use `RecommendationList` for the progression so the decision sequence remains scannable.
4. `expand-scope`: contextual inquiry, the paper well-test problem, first trend concept, stakeholder feedback, and final trend design. Explain color-blind-friendly differentiation, selectable data series, table view, accepted/rejected shading, and tooltips without claiming Melissa alone delivered team work.

Use this source-supported quotation in `build-belief`:

```tsx
<CaseStudyQuote speaker="Operations stakeholder">
  “I haven’t been this happy since my first child was born. I have been dreaming of this for the last 10 years.”
</CaseStudyQuote>
```

- [ ] **Step 4: Compose results and closing navigation**

The `results` section must state, without adding unsupported causality, that the work:

- re-established stakeholder confidence and enabled continued support;
- aligned navigation with pad- and run-centric operator thinking;
- influenced the team to support write-back where APIs allowed;
- reduced training from the weeks often reported for earlier tools to roughly a 30-minute walkthrough;
- moved well-test history visualization into the release-one roadmap.

Close with the existing `PortfolioFooter`; do not create a page-specific footer or navigation component.

- [ ] **Step 5: Run the focused test and verify it passes**

Run:

```bash
node --test --test-name-pattern="Operations Information Hub" tests/rendered-html.test.mjs
```

Expected: PASS with the Home link, route heading, and all three decision headings rendered.

- [ ] **Step 6: Commit the route**

```bash
git add site/app/work/operations-information-hub/page.tsx
git commit -m "feat: add operations information hub case study"
```

---

### Task 4: Verify production quality and make only evidence-driven corrections

**Files:**
- Modify if required by observed defects: `site/app/work/operations-information-hub/page.tsx`
- Modify only if existing components cannot express the approved layout: `site/app/case-study.css`

**Interfaces:**
- Consumes: the completed route, existing test suite, lint configuration, and production build.
- Produces: a verified desktop/mobile case study with no new dependency or unnecessary shared abstraction.

- [ ] **Step 1: Run the full rendered-HTML suite**

Run from `site/`:

```bash
npm test
```

Expected: all tests pass with zero failures.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: exit code 0 with no lint errors.

- [ ] **Step 3: Run the production build**

```bash
npm run build
```

Expected: exit code 0 and `/work/operations-information-hub` included in the generated route output.

- [ ] **Step 4: Inspect desktop and mobile rendering**

Run the local site and inspect `/work/operations-information-hub` at approximately 1440×900 and 390×844. Verify:

- the hero and impact are understandable before scrolling deeply;
- the six chapter links reach unique sections;
- all 13 images load without distortion and captions remain readable;
- the three pivotal decision titles are visually dominant and in source order;
- no horizontal page overflow occurs;
- focus indicators remain visible;
- the mobile layout preserves heading hierarchy and usable media sizing.

- [ ] **Step 5: Correct only observed defects and repeat the proving command**

Prefer copy or composition changes inside `page.tsx`. Touch `case-study.css` only for an observed page defect that existing classes cannot solve. After any correction, repeat the specific failing check plus `npm test`.

- [ ] **Step 6: Review the final diff and commit verification corrections**

```bash
git diff --check
git status --short
git diff --stat main...HEAD
git add site/app/work/operations-information-hub/page.tsx site/app/case-study.css
git commit -m "fix: refine operations hub case study presentation"
```

Skip the final commit when visual inspection requires no correction. Leave the branch local and unmerged.
