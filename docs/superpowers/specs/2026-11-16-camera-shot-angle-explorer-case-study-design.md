# Camera Shot Angle Explorer Case Study Design

## Goal

Add a standalone, password-protected Camera Shot Angle Explorer case study at `/work/camera-shot-angle-explorer` without adding it to the home-page project grid.

## Content and structure

Use the established case-study chrome: `PortfolioHeader`, `CaseStudyHero`, `VerticalChapterNav`, `CaseStudySection`, `InsightGrid`, `RecommendationList`, `WorkflowQuestion`, `ActionLink`, and `PortfolioFooter`.

- **Hero:** Title “Camera Shot Angle Explorer”, deck “From imagining a shot to confidently directing it.”, self-initiated project context, AI-native product-design role, and the supplied outcome.
- **Chapters:** The problem; My solution; Key product decisions in V1; Refining V1; V2: Connecting exploration to production; How I used AI; Outcome.
- **Narrative:** Preserve the supplied copy and all table rows. Map product decisions, V1 refinements, V2 decisions, and AI contributions into reusable card/list patterns rather than inventing claims or results.
- **Live product:** Place a `CaseStudyEmbed` directly after the solution framing. It renders the supplied Camera Shot Angle Explorer URL in a lazy iframe with the requested `clipboard-write` permission, a caption, and a separate “Explore the live product ↗” external link.

## Reusable component

Create `CaseStudyEmbed` in `site/app/components/case-study/`.

- It uses the same figure/frame/caption language as `CaseStudyMedia`, but contains an iframe rather than a local image or video.
- Its public props are `src`, `title`, `height`, `caption`, `actionHref`, and `actionLabel`.
- Add a production-backed example to the Case studies portion of the component library with guidance to use it for an interactive external product demo.

## Access and navigation

- Add the route to the established protected-project allowlist so it receives the same password gate as the existing private case studies.
- Do not add a `ProjectPreviewCard`, home-page link, or home-page data entry.
- The case-study’s own back link returns to the selected-work anchor.

## Visual rules

- Reuse the existing pink and white section rhythm and vertical chapter navigation.
- Keep the embedded product responsive, full-width within the standard reading shell, 760px tall on desktop, and vertically compact on smaller viewports.
- Do not create a one-off visual language or duplicate existing card styling.

## Verification

- Add rendered-HTML coverage for the protected route, title, all chapter labels, live iframe source and attributes, external live-product link, and absence from the home-page project grid.
- Build the site and run the rendered HTML test suite.
