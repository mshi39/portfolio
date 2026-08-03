# Portfolio Case Study Design Guide

## Purpose

This guide defines the shared design, content, component, media, interaction, accessibility, and validation standards for every portfolio case study. Each case study may have its own narrative structure and media mix, but all pages must feel like part of the same Melissa Shi portfolio.

The guide is both a reusable page specification and a consistency contract. Project-specific facts belong in each project’s authoritative source and implementation, not in this generic guide.

## Source Authority and Content Fidelity

Every case study must identify one authoritative content source, such as a named Google Doc tab. Preserve the source’s project title, claims, metrics, dates, role, quotations, decisions, recommendations, outcomes, and narrative order.

When the user requests exact source content:

- Render the source wording without paraphrasing, summarizing, or silently correcting grammar.
- Preserve list membership and heading relationships.
- Convert bracketed media instructions into real media placements; do not display the instructions as body copy.
- Preserve repeated media placements when the source intentionally references the same asset in more than one context.
- Do not introduce unsupported claims or reinterpret projected metrics as measured outcomes.

Project-specific metadata, chapters, media, and validation phrases must be documented in the implementation plan for that project.

## Route and Home-Card Integration

Each case study uses a stable local route under `/work/<project-slug>` and is server-rendered. Its corresponding home-page card links to the local route in the same tab. External project cards retain their existing behavior.

The home card must use the authoritative project title, timeline, summary, tags, image, and accessible alt text.

## Shared Visual Language

All case studies reuse the portfolio’s established design system:

- White primary background
- Pale pink `#FEF1FF` for large highlights and visual breaks
- Purple `#A74EF7` as the primary accent
- Existing dark ink, muted text, line, shadow, and focus tokens
- Fredoka display typography and Nunito Sans body typography
- Flat, playful, cartoon-influenced styling with professional restraint
- Large rounded geometry, consistent corner radii, soft shadows, and generous spacing
- One light page theme without inverted section themes

Heading letter spacing remains at the font default. Decorative treatments must not compete with research or design artifacts.

## Page Architecture

### Shared header and return path

Use the direction-aware shared site header. Include a clear return link to selected work near the beginning and a return-to-work call to action at the end.

### Hero

Every hero contains:

- A concise project-category eyebrow
- One `h1` with the authoritative project title
- The source’s project framing or subtitle
- Metadata for role, timeline, methods or project type, and organizational context when available
- High-value impact highlights clearly labeled as measured, observed, or projected
- A prominent source-provided hero image or video when available

The hero must establish the project without compressing or rewriting the source narrative.

### Chapter navigation

Use a sticky chapter navigation derived from the project’s actual source structure. Desktop and large tablet layouts use a compact sticky rail. Mobile layouts use a horizontally scrollable or wrapped list that does not cover content.

The navigation is supplementary: the complete article remains sequential and understandable without it. Anchored headings use scroll offset so the navigation and site header do not obscure them.

### Narrative sections

Map source chapters to semantic sections rather than forcing every project into the same chapter names. Preserve the source order and heading hierarchy while applying shared presentation patterns.

Use visual variety appropriate to the content:

- Prose sections for context, reasoning, and outcomes
- Metric cards for concise quantitative highlights
- Comparison layouts for options and trade-offs
- Insight grids for bounded findings
- Styled quotations for source-provided participant or stakeholder quotes
- Process or pipeline layouts for connected stages
- Recommendation or decision layouts for structured What, Why, and Impact content
- Outcome grids for distinct results or projected effects

Do not turn every paragraph into a card or component. Long-form reading rhythm takes priority.

## Reusable Components

Reuse shared site components and focused case-study primitives wherever possible:

- `SiteHeader`
- `ButtonLink`
- `Reveal`
- `CaseStudySection`
- `CaseStudyFigure`
- `CaseStudyMedia`
- `MetricCard`
- `QuoteBlock`
- `ChapterNav`
- `ComparisonCard`
- `RecommendationCard`

Components must accept project-specific content through props. Chapter navigation must accept a chapter definition rather than hard-code one case study’s anchors. Media components must support images and locally hosted video while providing consistent captions, framing, and responsive behavior.

Keep narrative content separate from shared presentation when practical. Avoid a fully generic renderer when project-specific composition communicates the story more clearly.

## Media Requirements

Treat every image and video explicitly linked by the authoritative source as required unless the user excludes it.

- Download Drive assets into the site’s public portfolio asset area; do not hotlink private or session-bound URLs.
- Use stable, readable, project-prefixed filenames.
- Preserve each source-specified placement, including intentional reuse of one asset.
- Validate the actual file type and bytes rather than trusting a filename or link label.
- Images use intrinsic dimensions, descriptive alt text, and a visible source-grounded caption.
- Videos use native controls, `playsInline`, preload metadata, a visible caption, and an accessible fallback link or text.
- Autoplay is disabled unless the source or user explicitly requires it.
- Media frames use the shared rounded white or pink treatment and prevent layout shift.

If a required linked file is unavailable, unsupported, or cannot be downloaded by the connected account, stop before silently omitting it and report the exact asset.

## Interaction and Motion

- Preserve the header’s direction-aware reveal behavior.
- Use restrained one-time fly-up reveals for major sections and media where they support reading progression.
- Respect `prefers-reduced-motion`.
- Avoid motion that obscures source content or delays access to long-form text.
- Keep videos user-controlled.
- Ensure sticky elements do not compete with the global header or each other.

## Accessibility and Semantics

- Use exactly one `h1`.
- Maintain ordered `h2` and `h3` hierarchy based on the source.
- Use semantic lists, figures, figcaptions, videos, blockquotes, navigation, and sections.
- Provide descriptive alt text grounded in visible media and nearby source context.
- Ensure all interactive elements work with keyboard input and have visible focus treatment.
- Target WCAG 2.2 AA contrast for text and controls.
- Do not rely on color alone to convey status, option selection, impact type, or sequence.

## Responsive Behavior

The complete case study must work at desktop, tablet, and mobile widths.

- Multi-column layouts collapse to one column in source order.
- Comparison and outcome grids preserve labels and relationships when stacked.
- Chapter navigation remains readable without covering page content.
- Large diagrams and screenshots scale within the viewport without horizontal page overflow.
- Video controls remain usable on narrow screens.
- Hero text, metadata, and media maintain a clear reading order.

## Validation

Every new case study requires automated rendering tests and a production build. Tests must verify:

- The local route returns successfully.
- The home card uses the correct local route and metadata.
- Exactly one `h1` renders.
- Every required chapter anchor and navigation target renders.
- Exact source phrases, lists, metrics, role, timeline, decisions, and outcomes are present.
- Every required media placement is referenced, including deliberate repeated placements.
- Images and videos use local asset paths.
- Semantic headings, figures, captions, lists, and video controls render.
- The page has no horizontal overflow at desktop and mobile widths.

Run a successful production build and the complete test suite after all changes. Complete a live visual review of the hero, representative middle chapters, media loading, final outcomes, and responsive layout before reporting completion.
