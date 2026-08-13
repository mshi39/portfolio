# Sales Assessment Platform Case Study Design

## Objective

Create a dedicated, self-contained portfolio case study at `/work/sales-assessment-platform-ai-integration` from the exact content in the **Final Draft** tab of the authoritative Google Doc `1vrwPePb20sFcQkNTf9LSqDf1DqB3gIuFYJo-DdqZjO8`.

## Content Authority

- Preserve the source wording, heading order, list membership, quotations, and stated outcomes exactly.
- Render the 20 source media instructions as local visual placements rather than body copy. One hero video is intentionally used twice.
- Use source headings as chapter navigation labels, with concise labels only where needed for the compact vertical rail.
- Do not add claims, metrics, or narrative not present in Final Draft.

## Route and Integration

- Add the server-rendered route `/work/sales-assessment-platform-ai-integration`.
- Add a local home-page project preview linking to that route.
- Use the existing shared header, back-to-work link, fixed desktop vertical chapter navigation, and responsive mobile behavior.

## Composition

- Use `CaseStudyHero` with the title, subtitle, project-at-a-glance metadata, outcome list, local thumbnail, and local hero video.
- Use `HeroOverview` for the introductory background and goal/outcome content where the existing component structure fits.
- Use `CaseStudySection`, `ContentBlockRenderer`, `CaseStudyMedia`, `CaseStudyQuote`, `WorkflowQuestion`, `InsightCard`, `InsightGrid`, `RecommendationCard`, `MetricCard`, and `SimpleContentList` only where they accurately express the source content.
- Use project-scoped semantic layouts for the current and final workflow diagrams, before/after design comparisons, principle cards, outcome cards, and testimonial where no shared primitive fits without distorting the source.
- Reuse the established white, pale-pink, purple, dark-ink, rounded, flat portfolio visual language. Do not introduce a new component family or dependency.

## Local Media

- Download all 19 unique Drive files referenced by Final Draft into `site/public/portfolio` using stable `sales-assessment-*` filenames.
- Validate each downloaded asset by signature, MIME type, dimensions or duration, and nonzero byte size.
- Use intrinsic image dimensions and the existing `CaseStudyMedia` component. Videos use controls, autoplay, loop, muted playback, `playsInline`, metadata preload, captions, and fallback text, consistent with the existing Feedback case study.

## Accessibility and Responsive Behavior

- One `h1`; semantic source-order `h2`/`h3` hierarchy, figures, captions, lists, blockquotes, and video controls.
- The desktop vertical chapter rail updates its active section; it is hidden on mobile.
- Content and media must remain within the viewport at desktop and mobile widths, with grid layouts collapsing in source order.
- Existing reduced-motion support remains effective.

## Validation

- Add rendered-page contracts for the route, home card, exact source copy/order, chapter links, one `h1`, and every local media placement.
- Verify local asset validity and intrinsic image dimensions.
- Run the full rendered test suite, feature lint, production build, whitespace check, and live desktop/mobile review before completion.
