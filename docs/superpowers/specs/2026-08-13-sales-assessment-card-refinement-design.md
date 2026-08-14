# Sales Assessment Card Refinement

## Goal

Refine the Sales Assessment case study with reusable, production-backed content patterns while preserving the existing portfolio visual language.

## Design

- Remove the Sales Assessment thumbnail from the case-study hero; the local thumbnail remains the home-card image.
- Present the introduction's AI-positioning statement as a dark-purple `WorkflowQuestion`/`CaseStudyQuote` treatment.
- Replace Issues and Opportunities with a reusable two-column `ComparisonTable`, using the existing rounded, bordered Enterprise research-table treatment. The library page documents this component.
- Present the five design principles and six Outcome statements as existing `InsightCard` grids.
- Add `InterimDesignCard` for two-column, numbered in-progress concepts: left-side Before/After copy and right-side media. Document it in the component library.
- Render the Platform Expansion Design Details and the two Additional Design Enhancements with existing `RecommendationCard` components. Their images remain local `CaseStudyMedia` placements.
- Wrap each ordered set of InterimDesignCards and RecommendationCards in `RecommendationList`, including the Product Vision design details.
- Keep the testimony quotation marks and place `- Business Value Advisor` in the quote footer; render the reflection principle in the dark-purple workflow-question treatment.
- Render Final Product Vision as a two-column image-and-copy layout and retain its source-order workflow narrative.

## Constraints

- Reuse the global component-library production CSS and components; do not add dependencies.
- Preserve the approved Final Draft copy, local media paths, source order, auto-playing video behavior, responsive layouts, and accessible semantics.
- Do not change the existing Feedback or Enterprise case-study compositions except for shared component additions that do not alter their rendered styling.

## Verification

- Add rendered-page contracts for thumbnail removal, comparison table, InsightCard grids, InterimDesignCards, and RecommendationCards.
- Build, render tests, lint the changed files, and run diff hygiene checks.

## Quote and Final Vision Refinement

- `CaseStudyQuote` retains its white surface and shared footer typography.
- `WorkflowQuestion` is the only dark-purple quote treatment, with white text. The component-library gallery shows both identities.
- Every Sales Assessment quote except Testimony renders through `WorkflowQuestion`; Testimony remains a sourced `CaseStudyQuote` with footer attribution.
- `Final Product Vision` renders above the split layout. The workflow image and caption occupy the left column; all explanatory copy occupies the right column. Mobile collapses to one column.
