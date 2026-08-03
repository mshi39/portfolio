# Enterprise Search Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio’s sample brand assets, complete the Enterprise Search home card, and build a full branded case-study route from the Google Doc’s `Portfolio Version` tab and all eleven linked figures.

**Architecture:** Keep project metadata data-driven and add a dedicated case-study content module plus reusable case-study presentation components. Store every final and downloaded image locally under `public/portfolio`, render the long-form route server-side, and reuse the existing header, footer styling, reveal behavior, responsive system, and design tokens.

**Tech Stack:** React 19, TypeScript, vinext, CSS, Google Drive connector, Node test runner

## Global Constraints

- Use `assets/Portfolio Logo.png` and `assets/Home Page Hero Melissa Image.png` as the final shared brand assets.
- Preserve the complete factual narrative, metrics, quotations, recommendations, and outcomes from the `Portfolio Version` tab.
- Include all eleven linked figures; do not hotlink Drive URLs.
- Keep the established white, `#FEF1FF`, and `#A74EF7` visual system.
- Use natural heading letter spacing.
- Preserve keyboard access, semantic structure, reduced-motion behavior, and responsive layouts.
- Do not invent claims, metrics, participants, outcomes, or image interpretations.

---

### Task 1: Rendering Contract and Brand Assets

**Files:**
- Modify: `site/tests/rendered-html.test.mjs`
- Create: `site/public/portfolio/portfolio-logo.png`
- Create: `site/public/portfolio/melissa-hero.png`

**Interfaces:**
- Produces: stable final asset URLs `/portfolio/portfolio-logo.png` and `/portfolio/melissa-hero.png`.

- [ ] Extend rendering tests to require the final logo and portrait paths, revised Enterprise Search title, September–December timeline, and local case-study destination.
- [ ] Run the tests and confirm they fail because the new asset paths and local route are absent.
- [ ] Copy the two approved source assets into `site/public/portfolio` without changing their pixels.
- [ ] Update shared logo and portrait consumers to use the final paths.
- [ ] Update the Enterprise Search project record with its final title, timeline, tags, description, and `/work/enterprise-search-generative-ai` destination.

### Task 2: Acquire and Validate All Research Figures

**Files:**
- Create: `site/public/portfolio/enterprise-search/question-consolidation.*`
- Create: `site/public/portfolio/enterprise-search/survey-analysis-1.*`
- Create: `site/public/portfolio/enterprise-search/survey-analysis-2.*`
- Create: `site/public/portfolio/enterprise-search/survey-analysis-3.*`
- Create: `site/public/portfolio/enterprise-search/trusted-data.*`
- Create: `site/public/portfolio/enterprise-search/ai-adversaries.*`
- Create: `site/public/portfolio/enterprise-search/ai-light-users.*`
- Create: `site/public/portfolio/enterprise-search/ai-power-users.*`
- Create: `site/public/portfolio/enterprise-search/slack-webex-integration.*`
- Create: `site/public/portfolio/enterprise-search/mcp-integration.*`
- Create: `site/public/portfolio/enterprise-search/data-layer-positioning.*`

**Interfaces:**
- Produces: eleven local case-study figure paths with validated image MIME types and dimensions.

- [ ] Download each approved Drive file using the connected Google Drive account.
- [ ] Preserve the returned image format when it is web-compatible; convert only when required for browser delivery.
- [ ] Verify every file opens as an image, has nonzero dimensions, and is assigned to the correct source link.
- [ ] Stop and report the exact source link if any required figure is inaccessible or is not an image.

### Task 3: Case-Study Content and Components

**Files:**
- Create: `site/app/data/enterpriseSearchCaseStudy.ts`
- Create: `site/app/components/case-study/CaseStudyHero.tsx`
- Create: `site/app/components/case-study/CaseStudySection.tsx`
- Create: `site/app/components/case-study/CaseStudyFigure.tsx`
- Create: `site/app/components/case-study/MetricCard.tsx`
- Create: `site/app/components/case-study/QuoteBlock.tsx`
- Create: `site/app/components/case-study/ChapterNav.tsx`
- Create: `site/app/components/case-study/RecommendationCard.tsx`

**Interfaces:**
- Produces: typed case-study content objects and reusable components for metadata, figures, metrics, quotes, chapter links, and recommendations.

- [ ] Transcribe the complete `Portfolio Version` narrative into typed data grouped by the nine approved chapters.
- [ ] Preserve all quotations and attributions while normalizing only broken line separators and punctuation spacing.
- [ ] Define the eleven figure records with local paths, captions, and source-grounded alt text.
- [ ] Implement semantic components that render headings, lists, figures, blockquotes, and recommendation What/Why/Impact content.
- [ ] Ensure components accept content as properties and contain no project-specific fabricated fallback text.

### Task 4: Full Case-Study Route

**Files:**
- Create: `site/app/work/enterprise-search-generative-ai/page.tsx`
- Modify: `site/app/globals.css`

**Interfaces:**
- Consumes: case-study data and components from Task 3.
- Produces: server-rendered `/work/enterprise-search-generative-ai` route.

- [ ] Build the hero with title, framing, role, timeline, methods, organizational context, two outcomes, and enterprise-search artwork.
- [ ] Add sticky chapter navigation with semantic anchors for all nine chapters.
- [ ] Render the full Background, Goals & Methods, Survey Findings, Interviews, Key Insights, Future State, AI Attitudes, Recommendations, and Outcomes narrative.
- [ ] Place all eleven local figures in their approved narrative positions.
- [ ] Render every survey metric, participant detail, quoted insight, AI-attitude segment, recommendation, and final outcome.
- [ ] Add a branded return-to-work call to action and project navigation.
- [ ] Add responsive case-study styles, scroll offsets, figure frames, metric grids, quote treatments, sticky navigation, and reduced-motion handling.

### Task 5: Automated Verification

**Files:**
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: completed home and case-study routes.
- Produces: regression coverage for content completeness and asset wiring.

- [ ] Assert the case-study route returns status 200 and includes one `h1`.
- [ ] Assert all nine chapter anchors and all four recommendation titles render.
- [ ] Assert all eleven local figure paths render.
- [ ] Assert representative metrics `15%`, `30%`, and `87%` render.
- [ ] Assert all final outcomes, including the contextual `2K+ users after release` claim, render.
- [ ] Assert the home page uses final brand assets and the Enterprise Search card uses the local route.
- [ ] Run the production build and complete test suite; fix only failures caused by the implementation.
- [ ] Confirm the local preview returns status 200 for `/` and `/work/enterprise-search-generative-ai`.
