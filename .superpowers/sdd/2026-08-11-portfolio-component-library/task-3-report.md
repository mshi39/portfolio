# Task 3 Report: Extract and adopt reusable case-study compositions

## Status

DONE

## Interfaces delivered

- `CaseStudyHero({ backLink, eyebrow, title, deck, overview, metadataItems, metadataClassName?, mediaSlots?, className? })` owns the semantic hero structure, preserves `case-hero case-shell feedback-hero` through the configured class, composes metadata and optional media, and emits `data-component="CaseStudyHero"`.
- `CaseStudyMetadata({ items, className? })` renders the existing label/value grid and emits `data-component="CaseStudyMetadata"`.
- `CaseStudyQuote({ children, attribution?, variant? })` renders a semantic blockquote with optional `footer > cite`, preserves `case-quote` and the workflow-question variant class, and emits `data-component="CaseStudyQuote"`.
- `ContentBlockRenderer<TMediaKey>({ blocks, renderMedia, className?, listClassName?, renderList?, articleHeadings? })` renders typed headings, paragraphs, lists, quotes, and media in source order and emits `data-component="ContentBlockRenderer"`.
- `InsightCard({ children })` owns the semantic article and emits `data-component="InsightCard"`.
- `InsightGrid({ mode, groups?, children? })` maps ordered groups into Insight cards, accepts children, preserves all three Feedback grid classes, and emits `data-component="InsightGrid"`.
- `RecommendationCard({ sequence, segments, customerCard? })` owns the article, padded sequence number, ordered segments, optional customer-card class, and emits `data-component="RecommendationCard"`.
- `RecommendationList({ cards })` owns `feedback-pipeline-grid`, maps cards in order, and emits `data-component="RecommendationList"`.
- `SimpleContentList({ items })` always renders valid `ul.simple-list` markup, including for an empty array, and emits `data-component="SimpleContentList"`.
- `ChapterRail({ chapters, variant? })` preserves the former ChapterNav client behavior and emits `data-component="ChapterRail"`; `ChapterNav` remains an alias export.
- The Feedback route visibly composes the production primitives and shared `PortfolioFooter` while retaining all project-specific content lookup, heading detection, slicing, grouping, and media descriptors in the route.

## RED evidence

Command:

```powershell
node --test --test-name-pattern="feedback case study composes production-backed library components" tests/rendered-html.test.mjs
```

Result before implementation: 0 passing, 1 failing. The expected failure was `expected CaseStudyHero to render on Feedback`, because the route did not yet emit the production component identities.

## GREEN, regression, build, and lint evidence

Focused composition command after implementation:

```powershell
node --test --test-name-pattern="feedback case study composes production-backed library components" tests/rendered-html.test.mjs
```

Result: 1 passing, 0 failing.

Fresh Vinext build:

```powershell
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'; & '.\node_modules\.bin\vinext.cmd' build
```

Result: succeeded across all five build stages and all four application routes.

Specified regression command:

```powershell
node --test --test-name-pattern="feedback case study composes|renders the complete feedback intelligence|preserves source order|article headings|concept-validation quotes|desired workflow PNG|chapter navigation|videos" tests/rendered-html.test.mjs
```

Result: 7 passing, 0 failing.

Full rendered suite:

```powershell
node --test tests/rendered-html.test.mjs
```

Result: 35 passing, 0 failing.

Feature-scoped lint:

```powershell
& '.\node_modules\.bin\eslint.cmd' app/components/case-study/CaseStudyHero.tsx app/components/case-study/CaseStudyMetadata.tsx app/components/case-study/CaseStudyQuote.tsx app/components/case-study/ContentBlockRenderer.tsx app/components/case-study/InsightCard.tsx app/components/case-study/InsightGrid.tsx app/components/case-study/RecommendationCard.tsx app/components/case-study/RecommendationList.tsx app/components/case-study/SimpleContentList.tsx app/components/case-study/ChapterNav.tsx app/work/ai-powered-feedback-intelligence-platform/page.tsx
```

Result: 0 errors, 0 warnings.

## Commit

`0b77441` — `refactor: extract case study components`

## Self-review and concerns

- The rendered composition contract checks every required production identity and the meaningful counts: one hero, one metadata grid, one rail, two simple lists, three quotes, and eight recommendation cards split into seven primary cards and one customer card.
- Existing semantic, source-order, media-dimension, video, quote-attribution, heading-level, responsive-rail, and styling tests remain green.
- Feedback-specific chapter indices, named heading detection, content slices, group boundaries, card segmentation, and media records remain in the route; shared modules contain no Feedback copy or heading-name lists.
- No product concerns. The successful Vinext build emitted Node's existing `module.register()` deprecation warning.
