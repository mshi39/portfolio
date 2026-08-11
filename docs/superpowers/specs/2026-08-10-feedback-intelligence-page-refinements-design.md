# Feedback Intelligence Page Refinements Design

## Goal

Refine the AI-Powered Customer Feedback Intelligence Platform case study with clearer content hierarchy, more immersive media, a desktop-focused chapter rail, and visual treatments consistent with the Enterprise Search case study.

## Scope

The work applies to `/work/ai-powered-feedback-intelligence-platform`. Shared components may be improved where behavior is reusable, but the Enterprise Search page must retain its current layout and behavior unless an explicitly shared improvement is harmless.

## Hero and media

- Remove the thumbnail `case-media-image` from the case-study header. Retain the hero video.
- All case-study videos autoplay, loop, play inline, and remain muted as required by browser autoplay policies. Controls remain available for accessibility and user control.
- All figure captions receive 12px bottom margin.
- Add a new locally stored workflow illustration to Concept Validation. It will be a clean, flat, rounded infographic using white, `#FEF1FF`, and `#A74EF7`, showing the desired continuous feedback workflow described by the narrative.

## Chapter navigation

- On screens wider than 900px, present the chapter navigation as a compact vertical rail fixed to the left side of the viewport and centered vertically.
- The rail uses the existing nine chapter labels in a vertical layout.
- An IntersectionObserver-backed client component tracks the section currently in view.
- The active chapter link becomes purple and increases slightly in font size, with a restrained transition.
- Navigation links remain keyboard accessible and preserve native anchor behavior.
- At 900px and below, hide the chapter navigation entirely to protect mobile reading width.
- Scope the new rail presentation to the Feedback Intelligence case study so Enterprise Search retains its current chapter navigation.

## Typography and section titles

- Set all case-study `h3` text to the purple accent color.
- Remove numeric prefixes from the Feedback Intelligence section `h2` titles. Eyebrow numbering may remain because the request applies to section `h2` headings.

## Workflow Research

- Render `Outcome` as a standalone `h3` outside the insight-card `<article>` layout.
- Render the sequence beginning with “The research showed that the real...” through “solely on the initial product concept.” as regular paragraphs beneath Outcome.
- Render the sentence “How might we create a continuous system that captures customer feedback, turns it into trustworthy intelligence, and connects it to product action?” as a highlighted pull statement while preserving the exact wording.

## Concept Validation

- Detect and render quote content as semantic `<blockquote>` elements using the existing Enterprise Search `.case-quote` visual treatment.
- Place the new desired-workflow illustration in this section at the narrative position where it best supports the described future workflow.

## End-to-End System

- Restyle its capability articles to match the Enterprise Search Recommendations cards: white surfaces, border, rounded corners, shadow, compact step marker, content column, and media column when media exists.
- Preserve source order and responsive stacking.

## Trust in AI

- Replace the second introductory sentence with: “I incorporated several trust mechanisms into the concept that positioned AI as a collaborative layer within the workflow rather than an opaque decision-maker.”
- Remove “These decisions positioned AI as a collaborative layer within the workflow rather than an opaque decision-maker.” from the Clear division of responsibility article.

## Projected Impact and Reflection

- Render both lists as simple single-column lists.
- Remove card backgrounds, borders, rounded corners, and grid-card styling.
- Retain readable spacing, list markers, and the existing content order.

## Reusable architecture

- Extend `ChapterNav` with an optional variant or class contract and active-section behavior rather than creating a duplicate navigation implementation.
- Extend `CaseStudyMedia` video behavior through reusable typed props or consistent defaults.
- Keep Feedback-specific content grouping and layout rules within the Feedback page and scoped CSS classes.
- Add a typed media descriptor for the new workflow illustration with its real intrinsic dimensions.

## Accessibility and responsive behavior

- Muted autoplay videos keep visible controls and fallback text.
- Active chapter state is conveyed visually and with `aria-current`.
- Focus-visible treatment remains intact.
- Blockquotes use semantic markup.
- The generated workflow illustration receives meaningful alt text and a caption.
- No page-level horizontal overflow at desktop or mobile widths.
- Respect `prefers-reduced-motion` for navigation transitions and other reveal behavior.

## Verification

- Add regression coverage for header thumbnail removal, video autoplay/loop/muted attributes, unnumbered `h2` titles, updated Trust copy, removed duplicate sentence, blockquote semantics, Workflow Outcome structure, highlighted question, new workflow image, navigation variant/active-state contract, and simple final lists.
- Run a production build and the full rendered-HTML suite.
- Verify the live page at desktop and mobile sizes. Desktop must show the fixed vertical rail and active-section changes; mobile must hide it. Confirm autoplay-ready video attributes, media loading, responsive card stacking, and zero horizontal overflow.
