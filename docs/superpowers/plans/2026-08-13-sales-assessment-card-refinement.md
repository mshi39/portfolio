# Sales Assessment Card Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the Sales Assessment narrative into the portfolio component system with reusable comparison and interim-design cards.

**Architecture:** Add only two production components—`ComparisonTable` and `InterimDesignCard`—with their existing case-study CSS. Compose the Sales Assessment page from existing `InsightCard`, `RecommendationCard`, and media components; showcase the new components in the private component library.

**Tech Stack:** Next.js, React, TypeScript, existing shared CSS, Node rendered-HTML tests.

## Global Constraints

- Preserve Final Draft copy and local media paths.
- Add no dependencies.
- Keep the home thumbnail but remove it from the case-study hero.
- Preserve responsive behavior, video autoplay, and accessible table semantics.

---

### Task 1: Lock the revised page contracts

**Files:**
- Modify: `site/tests/rendered-html.test.mjs`

- [ ] Add a failing route test that asserts no thumbnail appears in the Sales hero, the AI-positioning statement is a workflow question, Issues/Opportunities use a semantic comparison table, five principles and six outcomes use InsightCards, three InterimDesignCards render, and Platform Expansion plus enhancement cards use RecommendationCards.
- [ ] Run `node --test tests/rendered-html.test.mjs` and confirm the Sales contracts fail while baseline tests pass.

### Task 2: Add production-backed reusable components

**Files:**
- Create: `site/app/components/case-study/ComparisonTable.tsx`
- Create: `site/app/components/case-study/InterimDesignCard.tsx`
- Modify: `site/app/case-study.css`
- Modify: `site/app/component-library/page.tsx`
- Modify: `site/app/component-library/component-library.css`

- [ ] Implement a semantic `ComparisonTable` receiving headings and row pairs, using the existing research-table styling.
- [ ] Implement `InterimDesignCard` with a number, title, left-side children, and right-side `CaseStudyMedia` slot.
- [ ] Add component-library previews and short use guidance for both components.
- [ ] Run the focused rendered test and confirm the component assertions turn green.

### Task 3: Compose the Sales Assessment page

**Files:**
- Modify: `site/app/data/sales-assessment-platform.ts`
- Modify: `site/app/work/sales-assessment-platform-ai-integration/page.tsx`

- [ ] Remove the hero thumbnail slot and preserve the existing local home preview.
- [ ] Use `WorkflowQuestion` for the requested introduction statement; supply clean Issues and Opportunities rows to `ComparisonTable`.
- [ ] Render the five principles and six outcome entries using `InsightGrid`/`InsightCard`.
- [ ] Compose the three vision details as numbered `InterimDesignCard`s and use `RecommendationCard` for all Platform Expansion and Additional Design Enhancement entries, preserving media and source order.
- [ ] Run the complete rendered suite, feature lint, and production build.

### Task 4: Verify and commit

**Files:**
- Verify the files above

- [ ] Run `git diff --check`, verify the Sales route and home-card link, and ensure the component-library previews are not public navigation destinations.
- [ ] Commit the refinement on `codex/sales-assessment-platform`.
