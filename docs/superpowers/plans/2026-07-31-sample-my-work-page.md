# Sample My Work Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive sample home page for Melissa Shi's portfolio from the supplied HTML content and imagery.

**Architecture:** Create a Sites-compatible React application with a content-driven project list and reusable presentation components. Keep global design tokens and responsive rules in the shared stylesheet, with navigation, buttons, section headings, tags, and project cards represented as focused components.

**Tech Stack:** React, TypeScript, Vite/vinext Sites starter, CSS, Vitest/build validation

## Global Constraints

- Primary background: `#FFFFFF`.
- Secondary highlight: `#FEF1FF`.
- Primary accent: `#A74EF7`.
- The visual style is playful editorial: fun, flat, cartoon-like, rounded, professional, and clean.
- Use supplied portfolio HTML as the source of truth for names, summaries, dates, images, and destinations.
- Build the My Work page only; navigation may expose About Me as a future destination.
- Support responsive layouts, keyboard focus, reduced motion, accessible contrast, and touch targets.
- Do not invent project claims, metrics, employers, awards, or testimonials.

---

### Task 1: Create the Sites application and content model

**Files:**
- Create: `app/page.tsx`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/data/projects.ts`
- Create: `public/portfolio/*`

**Interfaces:**
- Produces: `Project` type and `projects: Project[]` with `title`, `description`, `date`, `tags`, `image`, and `href`.

- [ ] Initialize the Sites application in the workspace and preserve its package scripts and hosting configuration.
- [ ] Copy the supplied portrait, logo, and project thumbnails into `public/portfolio` with readable filenames.
- [ ] Transcribe the supplied home-page project content into `app/data/projects.ts`, correcting only obvious tag spelling.
- [ ] Confirm every local asset path exists and every external project destination matches the supplied HTML.

### Task 2: Build reusable portfolio components

**Files:**
- Create: `app/components/SiteHeader.tsx`
- Create: `app/components/ButtonLink.tsx`
- Create: `app/components/SectionHeading.tsx`
- Create: `app/components/ProjectCard.tsx`
- Create: `app/components/Tag.tsx`

**Interfaces:**
- Consumes: `Project` from `app/data/projects.ts`.
- Produces: `SiteHeader`, `ButtonLink`, `SectionHeading`, `ProjectCard`, and `Tag` React components.

- [ ] Implement a semantic header with logo, My Work active state, About Me destination, and accessible mobile navigation.
- [ ] Implement primary and secondary button-link variants with visible keyboard focus.
- [ ] Implement a reusable section heading with eyebrow, title, and optional supporting copy.
- [ ] Implement tags and a fully linked project card that renders all `Project` fields.
- [ ] Verify repeated project markup exists only inside `ProjectCard`.

### Task 3: Compose and style the My Work page

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: shared components and `projects`.
- Produces: the complete responsive `/` page.

- [ ] Build the introduction hero using the supplied biography, portrait, and Resume, LinkedIn, and Medium links.
- [ ] Add flat decorative shapes and pink highlight fields without obscuring content.
- [ ] Add the Selected Work heading and render project cards from the project array.
- [ ] Add the rounded closing invitation and footer.
- [ ] Implement the design tokens, typography, two-column desktop grid, one-column mobile grid, rounded surfaces, card interactions, and reduced-motion behavior.
- [ ] Update site metadata to describe Melissa's portfolio and remove starter preview content.

### Task 4: Validate the finished sample

**Files:**
- Modify only files implicated by validation failures.

**Interfaces:**
- Consumes: completed application.
- Produces: deployable Sites build.

- [ ] Run the production build and fix compilation failures.
- [ ] Check that every supplied project renders with a title, image, tags, date, summary, and destination.
- [ ] Check semantic headings, alt text, focus visibility, touch-target sizing, and reduced-motion rules in source.
- [ ] Confirm the page has no starter placeholders or invented portfolio claims.
- [ ] Publish through Sites after validation unless hosting is unavailable.
