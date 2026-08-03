# Portfolio Scroll and Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Design Strategist title, one-time Selected Work reveals, a dedicated About Me page, and a direction-aware animated header.

**Architecture:** Keep server-rendered page content and introduce two focused client components: `Reveal` for Intersection Observer-based entry effects and `SiteHeader` for scroll-direction state. Reuse the existing visual tokens and link components on a new `/about` route.

**Tech Stack:** React 19, TypeScript, vinext, CSS, Node test runner

## Global Constraints

- Preserve the established white, `#FEF1FF`, and `#A74EF7` visual system.
- Use “Product Designer · Design Strategist” in the hero.
- Reveal Selected Work content once and respect reduced-motion preferences.
- Keep the About Me teaser on the home page and open `/about` in the same tab.
- Hide the header while scrolling down and reveal it upward with a subtle downward movement and fade.
- Preserve keyboard focus, semantic HTML, responsive behavior, and touch targets.

---

### Task 1: Rendering Contract

**Files:**
- Modify: `site/tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: rendered `/` and `/about` HTML.
- Produces: regression assertions for title, navigation destination, reveal hooks, and About Me content.

- [ ] Add assertions that require “Design Strategist,” `href="/about"`, reveal markers, and a successfully rendered `/about` page.
- [ ] Run the test and confirm it fails because these features are absent.

### Task 2: Reveal and Header Behaviors

**Files:**
- Create: `site/app/components/Reveal.tsx`
- Modify: `site/app/components/SiteHeader.tsx`
- Modify: `site/app/globals.css`

**Interfaces:**
- Produces: `Reveal({ children, delay?, className? })` and direction-aware `SiteHeader`.

- [ ] Add the Intersection Observer reveal component with a no-JavaScript-visible baseline and one-time observation.
- [ ] Convert the header to a client component that ignores small scroll deltas, hides downward, reveals upward, and stays visible while focused.
- [ ] Add fixed-header, reveal, hidden, shown, and reduced-motion styles.

### Task 3: Home and About Pages

**Files:**
- Modify: `site/app/page.tsx`
- Create: `site/app/about/page.tsx`

**Interfaces:**
- Consumes: `Reveal`, `SiteHeader`, `ButtonLink`, portrait asset, and existing project data.
- Produces: updated `/` and new `/about` routes.

- [ ] Update the hero eyebrow title.
- [ ] Wrap the Selected Work heading and each project card in staggered reveal components.
- [ ] Change both About Me links to `/about` without a new-tab target.
- [ ] Build the About Me page with supported positioning, portrait, strengths, profile actions, and a My Work return link.

### Task 4: Verification

**Files:**
- Modify only files implicated by failures.

**Interfaces:**
- Consumes: complete application.
- Produces: passing production build and rendering tests.

- [ ] Run the production build.
- [ ] Run all rendering tests and confirm zero failures.
- [ ] Confirm the existing local preview serves both `/` and `/about`.
