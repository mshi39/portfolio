# Component Library Production Alignment Design

## Objective

Refine the production-backed component library so every documented component reproduces its live portfolio appearance without relying on page-specific or gallery-only wrappers. Apply the same production components to the live case-study pages so the gallery remains the authoritative reusable reference for future portfolio work.

Item 6 from the original feedback is explicitly excluded: `RecommendationList` remains in the system and the live Feedback Intelligence recommendation media remains unchanged.

## Design Direction

Use self-contained production components. Each component owns the class hooks and structure needed to render its production appearance wherever it is placed. The component gallery supplies representative data and neutral containment only; it does not recreate Feedback or Enterprise visual contexts to repair incomplete components.

## Navigation

Replace the `ChapterRail` and `ChapterNav` APIs with one production component named `VerticalChapterNav`.

`VerticalChapterNav` will:

- preserve the fixed, left-side, vertically centered connected-line design currently used by Feedback Intelligence;
- observe the provided section IDs and mark the active link with `aria-current="location"`;
- preserve hover and keyboard-focus segment thickening;
- remain hidden at mobile widths;
- use the same behavior and appearance on Feedback Intelligence and Enterprise Search;
- expose `data-component="VerticalChapterNav"` for rendered documentation and regression tests.

All imports, tests, catalog metadata, CSS selectors, and component identities using `ChapterRail` or `ChapterNav` will migrate to `VerticalChapterNav`. No compatibility alias will remain after the migration, preventing future case studies from choosing the retired horizontal navigation.

The gallery preview will render the actual fixed component inside a bounded demonstration canvas. Gallery-scoped containment may reposition the fixed element within the preview, but it may not redefine its colors, typography, active-state design, or interaction behavior.

## Typography Foundations

Expand the Foundations category with live specimens for every portfolio text style needed to build future pages:

- portfolio display `h1`;
- case-study `h1`;
- section `h2`;
- content `h3`;
- article/card `h4`;
- eyebrow label;
- standard body text;
- muted/supporting body text.

Each specimen will show the semantic/style name, rendered sample, intended use, and the production class or context that supplies its appearance. The gallery maintains exactly one page-level `h1`; heading specimens use safe lower semantic levels plus production typography classes where necessary.

## InsightCard

Make `InsightCard` self-contained and identical to the cards rendered in Feedback Intelligence.

The component will own a stable `insight-card` class in addition to its component identity. That class supplies:

- white background;
- production border, radius, shadow, and padding;
- Feedback article `h4` typography: Fredoka, 20px, `#17121d`, approved line height and spacing;
- production paragraph color, size, and line height;
- `min-width: 0` for responsive shrinkability.

`InsightGrid` remains responsible only for layout and mode-specific column counts. It no longer provides the card’s core surface or typography. Existing highlighted option behavior may add a modifier class without changing the default `InsightCard` contract.

The Feedback page and gallery both render the same `InsightCard`; no Feedback-page wrapper is required for the default card appearance.

## RecommendationCard

Make `RecommendationCard` self-contained and identical to Feedback Intelligence’s end-to-end system cards.

The component will continue to own the `recommendation-card` class and sequence number while its production CSS directly supplies:

- desktop grid structure for sequence, text, and optional media;
- white surface, border, radius, shadow, padding, and gaps;
- sequence-number color and weight;
- `h4` and paragraph typography;
- ordered prose/media segment placement;
- responsive two-column and single-column behavior;
- the existing customer-card modifier.

The gallery will show a representative `RecommendationCard` without media. The live Feedback page retains `RecommendationList`, all eight cards, and their existing ordered media segments. `RecommendationList` remains a layout/composition helper and is not removed.

## CaseStudyHero and HeroOverview

Add a reusable production component named `HeroOverview` and integrate it into the `CaseStudyHero` API.

`HeroOverview` accepts ordered panels. Each panel contains a heading and content node. It owns the exact Feedback Intelligence presentation:

- `feedback-hero-overview` two-column grid with the existing ratio and gap;
- pink panel surfaces;
- production border, radius, and padding;
- Fredoka panel headings and current spacing;
- responsive collapse to one column at the existing breakpoint;
- `data-component="HeroOverview"`.

`CaseStudyHero` accepts either `overviewPanels` data rendered through `HeroOverview` or a `HeroOverview` node through a clearly typed slot; use one canonical route-facing API in implementation. The Feedback page must use that API rather than hand-writing `.feedback-hero-overview` markup. The gallery documents both `CaseStudyHero` and `HeroOverview` as unique components and renders their real production relationship.

## MetricCard

Add the existing Enterprise Search `MetricCard` to the component catalog.

The production component will expose `data-component="MetricCard"` and retain the current Enterprise typography, pink surface, border, radius, spacing, and responsive behavior. The gallery uses representative metric data and the actual production component. Enterprise Search continues using the same component without content changes.

## Catalog Changes

Update the catalog inventory and descriptions:

- remove `ChapterRail`;
- add `VerticalChapterNav`;
- add `HeroOverview`;
- add `MetricCard`;
- retain `RecommendationList` because item 6 was withdrawn;
- update Foundation specimens to show all required heading and body styles;
- update `InsightCard`, `RecommendationCard`, and `CaseStudyHero` previews to exercise their exact production appearance.

Every component retains one unique catalog entry and a visible description beginning `Use when`.

## Responsive and Accessibility Requirements

- Both case-study pages use `VerticalChapterNav` on desktop and hide it on mobile.
- The fixed navigation must not overlap case-study content at supported desktop widths; both pages reserve an appropriate left reading gutter.
- Gallery containment must prevent fixed navigation from escaping its preview or causing horizontal overflow.
- No Home, case-study, or gallery route may have document-level horizontal overflow at 1600px, 1200px, 901px, or 390px widths.
- Active navigation retains `aria-current="location"`; all links retain visible focus treatment.
- Gallery heading specimens must preserve one page-level `h1`.
- Reduced-motion rules continue to disable navigation and reveal transitions.
- Media, quote, list, card, and heading semantics remain unchanged outside the explicitly migrated structures.

## Architecture and Boundaries

- Component-owned visual rules use stable component classes such as `.insight-card`, `.recommendation-card`, and `.hero-overview`/`.feedback-hero-overview` rather than requiring `.feedback-case-study` ancestry.
- Grid components own layout; card components own their surfaces and typography.
- Route files own project content, section definitions, grouping, and media descriptors.
- Gallery CSS owns only documentation layout and containment.
- No new dependency is introduced.

## Verification Strategy

Use test-driven implementation with rendered behavior contracts.

Verification will prove:

- neither rendered output nor source exports contain the retired `ChapterRail`/`ChapterNav` component identity/API;
- Feedback and Enterprise each render `VerticalChapterNav`, update active sections, reserve desktop space, and hide it on mobile;
- Foundations display all eight required typography specimens while the gallery contains one `h1`;
- standalone gallery `InsightCard` and `RecommendationCard` computed styles match their live Feedback counterparts for typography, surface, padding, border, radius, shadow, and layout;
- Feedback’s recommendation media and source order remain unchanged and `RecommendationList` remains present;
- Feedback uses the production `HeroOverview` inside `CaseStudyHero`, and gallery/live computed styles match;
- Enterprise and gallery render the same `MetricCard` component;
- catalog names remain unique and descriptions remain complete;
- full rendered tests, feature lint, and a fresh Vinext build pass;
- live desktop/mobile audits confirm visual parity, navigation behavior, responsive containment, and zero horizontal overflow.

## Out of Scope

- Removing `RecommendationList` or disabling recommendation media.
- Changing case-study content or media.
- Redesigning Home components.
- Adding horizontal chapter-navigation variants.
- Publishing the library separately or adding Storybook.
