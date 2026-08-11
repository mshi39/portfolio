# Portfolio Component Library Design

## Objective

Create a production-backed component library from the unique patterns on the Home and AI-Powered Feedback Intelligence pages. Refactor both pages to consume the shared components, then document the exact same production components on an unlinked `/component-library` route inside the existing site application.

The library will become the source of reusable UI for future portfolio case studies. It will not duplicate production markup solely for documentation.

## Core Principles

- The gallery imports and renders the same components used by portfolio pages.
- Component names describe purpose rather than a single page or piece of content.
- Components expose typed, focused props and retain semantic HTML.
- Existing visual branding, responsive behavior, motion, accessibility, and content order remain unchanged unless explicitly required by extraction.
- Page-specific data and content stay outside reusable presentation components.
- The gallery is accessible directly at `/component-library` but is not linked from the public header, footer, or portfolio content.
- Existing uncommitted content, dependency, and approved styling changes are preserved.

## Component Inventory

### Foundations

The gallery begins with live reference samples for the existing design tokens rather than creating React components for values that are already CSS variables.

- `BrandColorSwatch` — Gallery-only sample used to document a named portfolio color and its value.
- `TypeSpecimen` — Gallery-only sample used to demonstrate the production display and body typography hierarchy.
- `SurfaceTokenSample` — Gallery-only sample used to demonstrate production corner radii, borders, and shadows.

### Shared Navigation and Actions

- `PortfolioHeader` — Use as the persistent primary navigation for portfolio and case-study pages. It preserves scroll-direction visibility behavior and active-page state.
- `ActionLink` — Use for primary and secondary calls to action that navigate to internal or external destinations.
- `ChapterRail` — Use for case-study section navigation. It supports the existing horizontal sticky variant and Feedback Intelligence’s fixed connected-rail variant.
- `ScrollCue` — Use at the end of an introductory hero to direct visitors to the next major section.

### Home Components

- `PortfolioHero` — Use for the portfolio’s opening introduction, professional positioning, calls to action, and portrait composition.
- `PortraitStage` — Use when presenting a portrait with the branded decorative shapes used in the Home hero.
- `SectionIntro` — Use to introduce a major page section with an eyebrow, title, and optional description.
- `ProjectPreviewCard` — Use for clickable case-study previews with project metadata and visual treatment.
- `ContactCallout` — Use for a high-emphasis closing invitation with supporting text and calls to action.
- `PortfolioFooter` — Use as the consistent closing footer across portfolio and case-study pages.
- `ScrollReveal` — Use when content should enter with the approved scroll-triggered reveal motion and reduced-motion fallback.

### Case-Study Components

- `CaseStudyHero` — Use at the start of a case study for the back link, category eyebrow, title, deck, optional overview panels, metadata, and hero media slots.
- `CaseStudyMetadata` — Use for compact role, timeline, or other labeled project facts inside a case-study hero.
- `CaseStudySection` — Use for anchored case-study chapters with eyebrow, title, tone, and consistent section spacing.
- `CaseStudyMedia` — Use for responsive images or autoplaying, looping videos with captions and correct intrinsic dimensions.
- `CaseStudyQuote` — Use for participant or stakeholder quotations with optional speaker attribution nested in the quote.
- `WorkflowQuestion` — Use for a highlighted “How might we…” or equivalent framing question. It extends the quote presentation with the dark-purple emphasis treatment.
- `ContentBlockRenderer` — Use to render typed headings, paragraphs, lists, quotes, and media in exact source order without embedding project content in UI components.
- `InsightCard` — Use for a concise finding, option, outcome, or trust mechanism presented as a rounded content card.
- `InsightGrid` — Use to arrange related `InsightCard` items responsively while preserving their source order.
- `RecommendationCard` — Use for numbered end-to-end capabilities or recommendations with ordered prose and optional media segments.
- `RecommendationList` — Use to arrange `RecommendationCard` components in the established responsive case-study pattern.
- `SimpleContentList` — Use for plain single-column impact, reflection, or skills lists without card surfaces.

## Architecture and File Boundaries

Reusable production components live under `site/app/components/` with case-study-specific components under `site/app/components/case-study/`. Page files retain project content selection, chapter slicing, and data composition, but delegate visual structures to shared components.

The Feedback Intelligence page’s current private render helpers will be extracted into typed production components where they represent reusable display patterns. Project-specific grouping rules and indices remain in the page or its data module so generic components do not learn Feedback Intelligence copy.

Gallery metadata will live in a focused component-catalog module. Each catalog entry contains:

- unique component name;
- short “Use when…” description;
- category;
- live example renderer.

The `/component-library` page will use a small gallery shell that is visually separate from the public portfolio experience but inherits the same CSS tokens. It will provide a page title, short purpose statement, category navigation, and one documented live example per unique component. Gallery-only documentation wrappers will be visually neutral so they do not masquerade as production components.

## Refactoring Boundaries

The Home page will compose `PortfolioHeader`, `PortfolioHero`, `SectionIntro`, `ProjectPreviewCard`, `ContactCallout`, `PortfolioFooter`, and `ScrollReveal` without changing its visible content or order.

The Feedback Intelligence page will compose `PortfolioHeader`, `CaseStudyHero`, `ChapterRail`, `CaseStudySection`, `ContentBlockRenderer`, `InsightGrid`, `RecommendationList`, and `PortfolioFooter`. Existing media descriptors, source-order guarantees, chapter anchors, quote attribution, video behavior, and mobile navigation behavior remain intact.

Existing names may be preserved through compatibility exports only when doing so avoids an unsafe all-at-once migration. The final Home, Feedback Intelligence, and gallery routes must consume the production-backed components rather than duplicate their markup.

## Responsive and Accessibility Requirements

- The component gallery must work at desktop and mobile widths without horizontal page overflow.
- Gallery category navigation must be keyboard accessible and may wrap rather than becoming a portfolio-style chapter rail.
- Every example retains production semantics: one page-level `h1`, ordered heading levels, descriptive links, image alternative text, video controls and fallback text, semantic figures and captions, nested quote attribution, and visible focus states.
- Motion examples respect the existing reduced-motion rules.
- The Feedback Intelligence `ChapterRail` remains hidden on mobile, while the default case-study navigation retains its existing behavior.
- Production components must not depend on gallery-only CSS or metadata.

## Error and Edge Handling

- Optional component regions render only when corresponding props exist, leaving no empty wrappers.
- Lists and grids accept empty collections without invalid HTML; page composition should omit empty examples from production pages.
- Image variants require intrinsic width, height, and alternative text at the type level.
- Video variants preserve autoplay, loop, muted, controls, inline playback, preload metadata, and fallback text.
- Internal and external action destinations retain the current link behavior rather than introducing a new routing abstraction.

## Verification Strategy

Use test-driven implementation. Add or extend rendered-route contracts before each extraction so the tests fail for the missing component or gallery behavior, then make the smallest production change that passes.

Verification must cover:

- `/component-library` renders successfully and is absent from public navigation;
- every documented component has one unique name and a non-empty “Use when…” description;
- gallery examples import production components rather than copied markup;
- Home and Feedback Intelligence preserve their content, structure, links, media, anchors, and key CSS contracts after refactoring;
- responsive gallery and both refactored routes have no horizontal overflow at representative desktop and mobile widths;
- keyboard focus, heading hierarchy, quotes, images, video attributes, and reduced-motion behavior remain correct;
- the full rendered-HTML suite and a fresh production build pass.

## Out of Scope

- Publishing the component library as a separate package.
- Adding Storybook or another component-documentation dependency.
- Linking the gallery from the public portfolio.
- Refactoring the Enterprise Search page beyond safe shared-component compatibility required to keep it working.
- Redesigning production components, changing portfolio copy, or adding new component variants without a demonstrated current use.

