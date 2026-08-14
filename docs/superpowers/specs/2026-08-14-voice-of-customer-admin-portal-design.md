# Voice of the Customer Admin Portal Revamp

## Goal

Create a local portfolio case-study page from the Google Doc's **Portfolio Version** tab and link the existing homepage card to it.

## Structure

Use the established case-study layout with these chapters:

1. Overview and impact
2. Challenge
3. Scope and approach
4. Five design decisions
5. Collaboration and influence
6. Results and reflection

The five decision chapters cover program architecture, program-type guardrails, customer-experience visibility, real-world workflows, and scalable interaction patterns.

## Components and styling

Reuse the existing portfolio header, footer, case-study hero, metadata, vertical chapter navigation, media, metric, quote, insight, recommendation, and content-rendering components. Reuse `case-study.css`; add page-specific styling only if the content cannot be expressed cleanly with existing classes. Do not create new shared components.

## Content and media

Treat only the **Portfolio Version** tab as the content source. Download the linked Google Drive images and videos into `site/public/portfolio/voc-admin/`, give them descriptive filenames, and render them locally with meaningful alt text or captions. Keep the existing homepage thumbnail unless the source provides a clearly intended replacement.

## Routing

Create `/work/voice-of-the-customer-admin-portal-revamp` and update the existing homepage project entry to use that local route.

## Error handling and accessibility

Use native image/video behavior already established by the component library. Include alt text for informative images, captions where context matters, video controls, semantic headings, and reduced-motion behavior inherited from the site.

## Verification

Add a focused rendered-HTML test that fails until the new route and homepage link exist. Then run the project test, lint, and production build. Visually inspect the new page at desktop and mobile widths.
