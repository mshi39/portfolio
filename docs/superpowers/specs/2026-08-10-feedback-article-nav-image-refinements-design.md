# Feedback Article, Navigation, and Workflow Image Refinements

## Goal

Improve the Feedback Intelligence case study’s semantic heading hierarchy, quote attribution, workflow-image integration, and desktop chapter-rail styling without changing its content order or responsive behavior.

## Article headings

- Apply this behavior only to the Feedback Intelligence page.
- Every heading rendered inside an `<article>` becomes a semantic `<h4>`.
- Article `h4` elements use `#17121d`, a 20px font size, the existing rounded heading typeface, and appropriate line height and spacing.
- Standalone headings outside articles retain their current semantic level. In particular, Outcome remains an `h3`.
- Implement the distinction through a context-aware content-rendering option rather than duplicating or rewriting the typed content data.

## Quote attribution

- Each Concept Validation quotation and its following `– Splunk Product Manager` attribution become one semantic `<blockquote>` unit.
- The quote text remains the primary blockquote content.
- Render the speaker inside the blockquote as `<footer><cite>– Splunk Product Manager</cite></footer>`.
- Remove the separate attribution paragraphs so the speaker is not duplicated outside the quote.
- Preserve the exact two corrected quote texts and their order.

## Workflow image transparency

- Edit `feedback-intelligence-desired-workflow.png` using the labeled five-stage source image.
- Remove only the outer white canvas and convert it to true alpha transparency.
- Preserve the pale-pink rounded workflow backdrop, the five labeled frames, arrows, characters, icons, and bottom feedback loop.
- Keep the current 1693×929 dimensions unless transparent-edge processing requires a non-destructive equivalent canvas.
- Validate an alpha channel, transparent corners/background, intact labels, and absence of white edge halos.

## Chapter navigation rail

- Scope styling to `.feedback-chapter-nav`; Enterprise Search retains its default chapter navigation.
- Remove the rail container’s background, border, rounded panel treatment, and shadow/backdrop effects.
- Add one continuous vertical line that visually connects all chapter links.
- Each link receives a local line segment or marker aligned to the shared rail.
- On hover, focus-visible, and active state, the corresponding local segment becomes thicker. Active-section color, enlargement, IntersectionObserver behavior, and `aria-current="location"` remain intact.
- Keep the rail fixed at the left side and vertically centered on screens wider than 900px.
- Keep the rail hidden at 900px and below.
- Preserve the verified reading gutter and no-overlap behavior across intermediate desktop widths.
- Respect reduced-motion preferences.

## Reusable architecture

- Extend `BasicBlocks` with an article-heading context option that maps level-3 headings to `h4` only inside article content.
- Add an optional attribution field to quote content, or pair the known quote and attribution blocks mechanically before rendering. Prefer explicit typed attribution so quote ownership remains clear.
- Keep navigation interaction in the existing reusable component; the visual rail remains a Feedback-specific variant.

## Accessibility

- Article headings follow the page hierarchy instead of skipping or visually impersonating levels.
- Quote speakers are semantically associated with their quotations.
- Rail hover behavior has equivalent focus-visible and active treatment.
- Rail markers do not replace readable link text.
- The transparent PNG retains meaningful existing alt text and caption.

## Verification

- Add rendered-HTML tests proving all Feedback article headings are `h4`, styled at 20px and `#17121d`, while standalone Outcome remains `h3`.
- Assert each quote contains its speaker footer/cite and no separate speaker paragraph follows it.
- Validate the workflow PNG has alpha transparency at outer corners while retaining 1693×929 dimensions and the labeled artwork.
- Assert the Feedback rail has no container background/border and uses a connected vertical-line treatment with thicker hover/focus/active segments.
- Run the production build and full test suite.
- Verify the live page at desktop and mobile widths for rail alignment, content overlap, image transparency, quote appearance, heading hierarchy, and zero horizontal overflow.
