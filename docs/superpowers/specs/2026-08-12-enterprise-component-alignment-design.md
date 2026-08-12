# Enterprise Case Study Component Alignment

## Objective

Refactor the Enterprise Search case study to use the established production components documented in `/component-library`, without changing its research copy, chapter order, assets, or visual content.

## Approach

- Replace the hand-authored hero with `CaseStudyHero`, using its existing metadata, back link, eyebrow, title, deck, and Enterprise search art as optional hero media.
- Keep `PortfolioHeader`, `VerticalChapterNav`, `CaseStudySection`, `MetricCard`, `CaseStudyMedia`, and `CaseStudyFigure` in their existing roles.
- Replace inline insight, recommendation, outcome, and quote markup with their corresponding production components where those components produce the same structure: `InsightGrid`, `InsightCard`, `RecommendationList`, `RecommendationCard`, `SimpleContentList`, and `CaseStudyQuote`.
- Preserve all Enterprise-specific CSS classes and supplied content. No new component props, styling variants, dependencies, or content edits are in scope.

## Validation

- Extend the existing rendered-page contract only where needed to prove that Enterprise composes the global components.
- Run the production build and the rendered HTML suite after the refactor.
