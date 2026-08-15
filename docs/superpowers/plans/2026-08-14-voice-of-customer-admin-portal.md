# Voice of the Customer Admin Portal Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the local VOC Admin Portal case-study page from the Portfolio Version source and connect its existing homepage card.

**Architecture:** Add one route using the existing case-study components and CSS. Store source copy in one typed data file, download referenced Drive media under one public asset folder, and change only the existing project link.

**Tech Stack:** Next.js 16, React 19, TypeScript, existing CSS and Node test runner.

## Global Constraints

- Reuse existing site components; create no new shared components.
- Treat only the Google Doc's Portfolio Version tab as content authority.
- Store downloaded visuals in `site/public/portfolio/voc-admin/`.
- Keep all work on `codex/voice-of-customer-admin-portal`; do not merge to main.

---

### Task 1: Route contract and homepage link

**Files:**
- Modify: `site/tests/rendered-html.test.mjs`
- Modify: `site/app/data/projects.ts`
- Create: `site/app/work/voice-of-the-customer-admin-portal-revamp/page.tsx`

**Interfaces:**
- Consumes: existing `projects` array and Next.js file routing.
- Produces: `/work/voice-of-the-customer-admin-portal-revamp` and a matching homepage card link.

- [ ] Add assertions that the homepage links the VOC card to the local route and that the new route renders its title, results, chapter navigation, and local media.
- [ ] Run `node --test tests/rendered-html.test.mjs` from `site`; confirm failure because the route does not exist and the card still links externally.
- [ ] Change the existing VOC project `href` to `/work/voice-of-the-customer-admin-portal-revamp`.
- [ ] Add the route using `PortfolioHeader`, `PortfolioFooter`, `CaseStudyHero`, `VerticalChapterNav`, `CaseStudySection`, `CaseStudyMedia`, `MetricCard`, `InsightGrid`, `RecommendationList`, `CaseStudyQuote`, and `ContentBlockRenderer`.

### Task 2: Source content and local media

**Files:**
- Create: `site/app/data/voc-admin-portal.ts`
- Create: `site/public/portfolio/voc-admin/*`
- Modify: `site/app/work/voice-of-the-customer-admin-portal-revamp/page.tsx`

**Interfaces:**
- Produces: typed case-study copy blocks and a media map consumed by the new route.

- [ ] Download each used image or video linked from the Portfolio Version tab with its original bytes and a descriptive filename.
- [ ] Encode the approved source copy into overview, challenge, approach, five decision, collaboration, result, and reflection content groups.
- [ ] Render the content with existing components, local media URLs, meaningful alt text, captions, and video controls.
- [ ] Run `node --test tests/rendered-html.test.mjs`; confirm the focused assertions pass.

### Task 3: Verification

**Files:**
- Modify only if verification exposes a scoped defect.

**Interfaces:**
- Consumes: completed route and assets.
- Produces: verified production output.

- [ ] Run `npm test` from `site` and confirm zero failures.
- [ ] Run `npm run lint` from `site` and confirm zero errors.
- [ ] Run `npm run build` from `site` and confirm exit code 0.
- [ ] Inspect the page at desktop and mobile widths; confirm readable hierarchy, working local media, chapter navigation, homepage routing, and no horizontal overflow.
- [ ] Commit the implementation without merging to main.
