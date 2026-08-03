# AI-Powered Customer Feedback Intelligence Case Study Design

## Objective

Create a dedicated portfolio case-study page for `AI-Powered Customer Feedback Intelligence Platform` using the exact narrative and media instructions from the Google Doc `Intelligent Feedback Platform`, fourth tab `Portfolio` (`t.cgakox9y3jbx`). The page must follow `case-study-design.md` and share the Enterprise Search page’s visual language and reusable components.

## Source Authority

The `Portfolio` tab is the factual and copy authority. Preserve its 233 paragraphs, wording, order, heading relationships, lists, role, timeline, projected metrics, product decisions, and outcomes.

Do not paraphrase or silently correct source copy. Replace bracketed media instructions with the referenced media at those exact narrative positions. Do not render the bracketed instruction text.

## Route and Home Card

- Route: `/work/ai-powered-feedback-intelligence-platform`
- Home-card title: `AI-Powered Customer Feedback Intelligence Platform`
- Role: `Solo UX Designer`
- Timeline: `April–May 2026`
- Card destination: the local route, opened in the same tab

Retain the existing source-grounded card summary, tags, preview artwork, and alt text unless the authoritative tab provides a direct replacement.

## Page Structure

The hero uses the exact title and subtitle from the source, followed by Overview, Projected Impact, My Role, Timeline, the thumbnail, and the hero video.

The sticky chapter navigation uses these anchors:

1. `opportunity` — The Opportunity
2. `workflow-research` — Mapping the Real Customer-Feedback Workflow
3. `product-architecture` — Defining the Right Product Architecture
4. `concept-validation` — Validating Product Direction Through Design
5. `feedback-pipeline` — Designing an End-to-End Feedback Intelligence Pipeline
6. `trust-in-ai` — Building Trust into the AI Experience
7. `collaboration` — Collaboration and Influence
8. `projected-impact` — Projected Impact
9. `demonstrated-skills` — What This Project Demonstrated

All source paragraphs and lists remain in their original order within these sections.

## Media Inventory

The source contains 14 required placements representing 13 unique Drive files:

1. Thumbnail image — `116Tmkc_Tg7Jvxu4BtinCHVLFrLSTnv_D`
2. Hero video — `10Mv8gWIbIxOvBuJD1n0rKtKwmIxIrDM5`
3. Workshop Miro board — `1dS3IVuqkWVD6pZvuyFkjcKCE_djvsCcb`
4. Full user-flow map — `17npGjc_PQgMbvbPdJ5C8OwVLcDZO7dHQ`
5. Product-model comparison — `1k2hvKp7D8fTTCptKgOTyR57Nc2NKPMjJ`
6. Prototype video — `1zRTVv9g3lUGR2deDsiGGZWq6YCb-YHQW`
7. Lower-barrier video — `1hINrdblRwCqlwN2-55EW3VPOss7aM6Kx`
8. Scheduling experience — `1KNbiUpOBMbuzdFgt1MqZmJdDnBTeAQ1L`
9. AI-generated insight experience — reuse `10Mv8gWIbIxOvBuJD1n0rKtKwmIxIrDM5`
10. Source-verification interaction — `15MOTFhMrbRcQu8ZajVV54njZkdTlQvOY`
11. Central-feedback video — `13NgIONyN_LtKuigr4sImqrDE13L9nflK`
12. Insight-to-Jira workflow — `1ajxBYPR012MqkGxgX7bBc0CTIhBEzsP_`
13. AI presentation-generation flow — `16B7NqHIcczM-eWVlIPUJ_m68zOLwrG3s`
14. Customer-portal video — `1wtRlbrU2PN_cxkGpF2TTd0ew2ojurDGd`

Download every unique asset locally, validate its MIME type and bytes, and render the shared hero/AI-insight file in both source-specified locations. Images use `CaseStudyFigure`; videos use a reusable `CaseStudyMedia` component with native controls, `playsInline`, metadata preloading, caption, and fallback text.

If any file is inaccessible or unsupported, stop and report the exact file before silently omitting or substituting it.

## Component Changes

- Refactor `ChapterNav` to accept project-specific chapter definitions while preserving Enterprise Search behavior.
- Reuse `CaseStudySection`, `CaseStudyFigure`, `MetricCard`, `SiteHeader`, `ButtonLink`, and existing case-study styles.
- Add `CaseStudyMedia` for image/video framing when the existing figure component is insufficient.
- Add a focused comparison layout for the three product models.
- Add a pipeline layout for the end-to-end capability sections.
- Keep page composition project-specific; do not build an over-generalized document renderer.

## Visual and Responsive Treatment

Use the same white, pink, purple, Fredoka, Nunito Sans, rounded geometry, soft shadows, sticky navigation, and long-form spacing as Enterprise Search. Apply visual variety through prose, metrics, option comparison, process sections, media, and outcome layouts without rewriting the source.

Multi-column layouts collapse in source order. Videos and diagrams stay within the viewport. Sticky navigation must not obscure anchored headings. The page must have no horizontal overflow at desktop, tablet, or mobile widths.

## Accessibility

- Exactly one `h1`
- Ordered `h2` and `h3` hierarchy derived from the source
- Semantic sections, lists, figures, captions, and videos
- Descriptive alt text and captions grounded in the source instruction and visible asset
- Keyboard-accessible native video controls
- Visible focus treatment and WCAG 2.2 AA contrast
- Reduced-motion support for reveal behavior

## Validation

Add rendering tests before implementation that fail until the feature exists. Verify:

- The home card points to the local route in the same tab.
- The case-study route returns successfully.
- One `h1` and all nine chapter anchors render.
- Exact source phrases and all source lists are present.
- `Solo UX Designer`, `April–May 2026`, `35 pain points`, `17 MVP requirements`, `more than 20 hours`, and `approximately 3×` render.
- All 14 required media placements use local paths.
- The duplicated hero/AI-insight asset renders twice.
- Video elements have controls and `playsInline`.
- The full existing test suite and production build pass.
- Live desktop and mobile checks show loaded media, correct reading order, and no horizontal overflow.
