# Task 1 Report: Establish production component names and shared chrome

## Status

DONE

## Files changed and interfaces delivered

- `site/app/components/ActionLink.tsx` — `ActionLink({ href, children, variant? })` preserves primary and secondary button-link behavior and identifies its root anchor with `data-component="ActionLink"`.
- `site/app/components/PortfolioHeader.tsx` — `PortfolioHeader({ current? })` preserves the existing header scroll visibility, focus behavior, brand, navigation, and active state, and identifies its root header with `data-component="PortfolioHeader"`.
- `site/app/components/PortfolioFooter.tsx` — `PortfolioFooter()` owns the unchanged two-paragraph footer markup and identifies its root footer with `data-component="PortfolioFooter"`.
- `site/app/components/ScrollCue.tsx` — `ScrollCue({ href, children })` owns the scroll-cue anchor and decorative down arrow and identifies its root anchor with `data-component="ScrollCue"`.
- `site/app/components/ButtonLink.tsx` — compatibility export: `ActionLink as ButtonLink`.
- `site/app/components/SiteHeader.tsx` — compatibility export: `PortfolioHeader as SiteHeader`.
- `site/app/about/page.tsx` and `site/app/work/enterprise-search-generative-ai/page.tsx` — migrated to the production component names.
- `site/tests/rendered-html.test.mjs` — added the shared-chrome rendered behavior contract.

## Red test

Command:

```powershell
node --test --test-name-pattern="production shared chrome has stable component-library names" tests/rendered-html.test.mjs
```

Result: 0 passing, 1 failing. It failed as expected because the rendered Home header did not yet emit `data-component="PortfolioHeader"`.

## Green verification

Build command:

```powershell
npx.cmd cross-env WRANGLER_LOG_PATH=.wrangler/wrangler.log vinext build
```

Result: succeeded.

Focused command:

```powershell
node --test --test-name-pattern="production shared chrome has stable component-library names" tests/rendered-html.test.mjs
```

Result: 1 passing.

Specified regression command:

```powershell
node --test --test-name-pattern="production shared chrome|server-renders the dedicated About Me page|server-renders the complete enterprise search case study" tests/rendered-html.test.mjs
```

Result: 3 passing.

Full rendered suite:

```powershell
node --test tests/rendered-html.test.mjs
```

Result: 33 passing.

## Commit

`3a96e2d` — `refactor: name shared portfolio components`

## Self-review and concerns

- The rendered test verifies the shared component identities while retaining behavior assertions for the brand link, primary navigation, both button variants, and the exact visible footer copy.
- Home and Feedback remain on their compatibility component names as required; only About and Enterprise were migrated.
- No product concerns. The Windows shell required `npx.cmd cross-env` for the build because direct `npm` invocation is blocked by local PowerShell policy and `npm.cmd` does not interpret the package script's POSIX-style environment assignment.
