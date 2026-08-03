# Portfolio Scroll and Navigation Enhancement Design

## Objective

Enhance the approved sample portfolio without changing its established branding, page structure, or visual character.

## Hero Positioning

Replace “UX Researcher” in the opening eyebrow title with “Design Strategist.” The full title becomes “Product Designer · Design Strategist.” No other introduction copy changes.

## Selected Work Reveal

Content in the Selected Work section appears as it enters the viewport:

- The section heading and each case-study card begin slightly lower and transparent.
- Each element transitions upward approximately 24 pixels while fading to full opacity.
- Project cards reveal once, with a short stagger based on their grid order.
- Content remains visible after its first reveal and does not replay when scrolling back and forth.
- If JavaScript is unavailable, content remains visible.
- When `prefers-reduced-motion: reduce` is enabled, content appears immediately without transforms or staggered animation.

Use a small client-side reveal component powered by Intersection Observer. The component should apply animation behavior while preserving semantic HTML and the current data-driven project-card structure.

## About Me Navigation

Keep the existing About Me teaser section at the bottom of the home page. Change the top-navigation About Me destination to `/about`, opening in the same browser tab.

Create a dedicated About Me page that reuses the portfolio header, color tokens, typography, button styles, spacing system, and rounded visual language. For this milestone, it should provide a polished introductory page rather than inventing detailed biography claims. It may include:

- A short introduction based only on existing portfolio positioning
- Melissa’s existing portrait
- Professional strengths already stated on the home page
- Resume and LinkedIn actions
- A link back to My Work

The home-page About Me teaser should also link to `/about`.

## Direction-Aware Header

The top navigation is fixed and direction-aware:

- At the top of either page, it is fully visible.
- After meaningful downward scrolling, it slides upward out of view and fades.
- When the user scrolls upward, it reappears with a subtle downward movement and fade.
- Small scroll fluctuations are ignored using a movement threshold to prevent jitter.
- Keyboard focus within the header forces it to remain visible.
- Reduced-motion users receive the visibility change without a sliding animation.

Implement this as a focused client-side header component. Store only transient scroll state; do not use browser storage.

## Accessibility and Validation

- All navigation remains keyboard accessible with visible focus states.
- The About Me route opens in the same tab.
- Hidden header content must not trap focus off-screen.
- Scroll animations must not prevent content access.
- Existing mobile responsiveness, semantic headings, alt text, and touch targets remain intact.
- Automated rendering tests cover the updated title, `/about` destination, dedicated About Me page, and reveal hooks.
- A production build must pass after implementation.
