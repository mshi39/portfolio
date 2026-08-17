# Operations Information Hub Case Study

## Goal

Create a local, hiring-manager-focused portfolio case study for the Operations Information Hub and link the existing Home page card to it.

## Narrative strategy

Restructure the source page around three pivotal design decisions rather than reproducing its full chronological obstacle-and-step format. Preserve the source evidence and outcomes while removing repetition, correcting grammar, and making Melissa's design judgment easier to scan.

The three decisions are:

1. Build stakeholder belief through research-backed visioning.
2. Reframe the product around operators' mental model and end-to-end work.
3. Expand the MVP by exposing overlooked offline inefficiencies.

## Page structure

1. **Hero and overview** — State the 30-plus-tool problem, the centralized hub solution, Melissa's UX Design Lead role, team, employer, timeline, and the strongest product visual.
2. **Impact snapshot** — Highlight more than 10 tools centralized in the MVP, four legacy tools targeted for replacement, training reduced to roughly a 30-minute walkthrough, and positive operator response.
3. **Context** — Explain the fragmented workflows, manual data transfer, unreliable site connectivity, and tablet-first field environment.
4. **Decision 1: Build belief** — Show how storyboards, seven operator interviews, synthesis, and an early end-to-end prototype turned skeptical stakeholders into active supporters.
5. **Decision 2: Design around the operator** — Show two rounds of information-architecture testing, the pad- and run-centric model, advocacy for source-system write-back, and the unified task-response design.
6. **Decision 3: Expand the right scope** — Show how contextual inquiry exposed paper-based well-test tracking and how a design concept moved historical test visualization into the MVP roadmap.
7. **Results and reflection** — Summarize stakeholder confidence, lower training burden, workflow consolidation, and the lesson that field observation can reveal higher-value opportunities than stated requirements alone.
8. **Closing navigation** — Return visitors to selected work.

## Components and styling

Reuse the existing portfolio header, footer, case-study hero, vertical chapter navigation, case-study sections, media, metrics, quotes, insight cards, workflow question, recommendation patterns, and content renderer where appropriate. Reuse `case-study.css` and existing page patterns. Add page-specific styles only when the approved content cannot be expressed clearly with current classes. Do not create new shared components for this page.

The page should feel consistent with the other enterprise case studies: editorial, evidence-led, spacious, and easy to scan. The supplied visuals provide the project-specific character; the surrounding UI remains within the existing component library.

## Content and media

Treat `Portfolio Content/Operations Information Hub.html` as the source of truth. Use only claims supported there. Lightly edit copy for clarity and concision without inventing metrics or responsibilities.

Move the relevant project images from `Portfolio Content/Operations Information Hub_files/` into `site/public/portfolio/operations-hub/` with descriptive filenames. Exclude downloaded scripts, styles, navigation icons, and duplicate branding assets. Preserve source files unless an actual move is safe and clearly desirable; the public folder should contain the production copies used by the page.

Every informative visual receives meaningful alternative text and a caption that explains its role in the design decision. Use intrinsic source dimensions to prevent layout shift.

## Routing

Create `/work/operations-information-hub` and update the existing Operations Information Hub Home page project entry from its external URL to this local route. Keep the card's current thumbnail unless a supplied source visual is clearly better suited and remains legible in the existing crop.

## Accessibility and resilience

- Preserve semantic heading order and anchored chapter navigation.
- Provide useful alternative text and captions for informative images.
- Keep visible keyboard focus and reduced-motion behavior inherited from the component library.
- Avoid communicating chart or prototype meaning through color alone in the surrounding copy.
- Use the existing responsive media behavior and avoid horizontal page overflow.

## Verification

Use a focused rendered-HTML contract that initially fails because the new route and local Home link do not exist. Then implement the smallest change that passes it.

Run the rendered-HTML test suite, lint, and production build. Visually inspect the page at representative desktop and mobile widths, checking content order, navigation, image crops, readable captions, heading hierarchy, and horizontal overflow.

## Out of scope

- Redesigning the Home page card system or shared case-study component library.
- Adding dependencies, a CMS, or new animation infrastructure.
- Reproducing every sentence or every visual from the archived source page.
- Publishing, merging to `main`, pushing, or opening a pull request without explicit instruction.
