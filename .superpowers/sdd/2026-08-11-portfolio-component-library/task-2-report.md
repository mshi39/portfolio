# Task 2 Report: Extract and adopt Home components

## Status

DONE

## Files and interfaces delivered

- `site/app/components/PortfolioHero.tsx` — `PortfolioHero({ eyebrow, title, lede, note, actions, portrait, scrollCue })` owns the existing `section.hero.shell` structure and emits `data-component="PortfolioHero"`.
- `site/app/components/PortraitStage.tsx` — `PortraitStage({ src, alt, width, height, priority?, ariaLabel? })` owns the portrait stage decorations and image, retains `portrait-stage`, and emits `data-component="PortraitStage"`.
- `site/app/components/SectionIntro.tsx` — `SectionIntro({ id?, eyebrow, title, description? })` retains the section-heading structure, uses the provided heading ID, and emits `data-component="SectionIntro"`.
- `site/app/components/ProjectPreviewCard.tsx` — `ProjectPreviewCard({ project, index })` retains the Project card markup, links, images, tags, tones, and emits `data-component="ProjectPreviewCard"` on its article.
- `site/app/components/ContactCallout.tsx` — `ContactCallout({ eyebrow, title, body, actions })` owns the existing contact section/card and emits `data-component="ContactCallout"`.
- `site/app/components/ScrollReveal.tsx` — `ScrollReveal({ children, delay?, className? })` preserves the client IntersectionObserver and reduced-motion behavior and emits `data-component="ScrollReveal"`.
- `site/app/components/ProjectCard.tsx`, `Reveal.tsx`, and `SectionHeading.tsx` — compatibility aliases to `ProjectPreviewCard`, `ScrollReveal`, and `SectionIntro`.
- `site/app/page.tsx` — Home now composes the production component library while retaining its copy, assets, order, links, classes, motion, and semantics.
- `site/tests/rendered-html.test.mjs` — adds the rendered `home composes production-backed library components` contract.

## RED evidence

Command:

```powershell
node --test --test-name-pattern="home composes production-backed library components" tests/rendered-html.test.mjs
```

Result: 0 passing, 1 failing. The test failed as expected at `expected PortfolioHero to render on Home`, because the rendered Home markup did not yet include `data-component="PortfolioHero"`.

## GREEN and regression verification

Build completed successfully with the Windows-compatible invocation:

```powershell
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'; & '.\node_modules\.bin\vinext.cmd' build
```

Specified regression command:

```powershell
node --test --test-name-pattern="home composes production-backed library components|server-renders Melissa's My Work page|home page uses final brand assets|feedback intelligence card links" tests/rendered-html.test.mjs
```

Result: 4 passing, 0 failing.

Full rendered suite:

```powershell
node --test tests/rendered-html.test.mjs
```

Result: 34 passing, 0 failing.

Task-file lint command:

```powershell
& '.\node_modules\.bin\eslint.cmd' app/page.tsx app/components/PortfolioHero.tsx app/components/PortraitStage.tsx app/components/SectionIntro.tsx app/components/ProjectPreviewCard.tsx app/components/ContactCallout.tsx app/components/ScrollReveal.tsx app/components/ProjectCard.tsx app/components/Reveal.tsx app/components/SectionHeading.tsx
```

Result: 0 errors.

## Commit

`b086592` — `refactor: extract home portfolio components`

## Self-review and concerns

- The Home-level test exercises rendered component identities and the user-visible structure: exactly one h1, portrait source/dimensions, professional links, selected-work anchor, all seven projects, contact copy, and footer copy.
- The route owns all Home copy and composes the components through typed props and children; compatibility exports retain the former component names for other consumers.
- No product concerns. Full TypeScript and repository-wide lint remain blocked by pre-existing Cloudflare worker globals and internal-link lint findings outside Task 2; the production build, focused rendered regressions, full rendered suite, and Task 2 file lint all pass.
