# Melissa Shi Portfolio Design Guide

## 1. Design Direction

The portfolio uses a **playful editorial** direction: friendly, flat, and cartoon-like without losing the clarity expected of a senior product and UX designer. Large type, rounded geometry, bright purple accents, and soft pink section breaks create personality. A disciplined grid, concise copy, and generous white space keep the work professional.

The experience should feel:

- Fun, warm, and optimistic
- Confident rather than childish
- Clean, spacious, and easy to scan
- Tactile through simple shapes and subtle motion
- Focused on Melissa's work and outcomes

Reference-inspired principles:

- Use large, high-impact hero messaging and distinct content bands.
- Give project imagery enough scale to communicate before users read.
- Mix clean editorial structure with occasional irregular, cartoon-like shapes.
- Use rounded cards and controls consistently.
- Keep decorative elements flat and purposeful; avoid visual clutter.

## 2. Site Structure

The finished portfolio has two primary destinations:

1. **My Work** — Home page with Melissa's introduction followed by clickable case-study previews.
2. **About Me** — Personal story, design philosophy, experience, and ways to connect.

The first testing milestone builds only the My Work page. Case-study cards may link to the existing published case studies until local case-study pages are created.

## 3. Color System

### Core colors

| Token | Value | Use |
| --- | --- | --- |
| `--color-canvas` | `#FFFFFF` | Primary page background and card surfaces |
| `--color-pink` | `#FEF1FF` | Large highlights, section bands, image backdrops, and visual breaks |
| `--color-purple` | `#A74EF7` | Primary actions, active states, links, key tags, and illustrations |
| `--color-purple-dark` | `#7832B5` | Hover states and accessible text on pale surfaces |
| `--color-ink` | `#17121D` | Headings and primary body copy |
| `--color-muted` | `#665E6B` | Supporting copy, metadata, and secondary labels |
| `--color-line` | `#E9DFF0` | Borders, separators, and inactive pills |

### Usage balance

- White: approximately 65% of the page.
- Pink: approximately 25%, used in large calm fields rather than tiny accents.
- Purple: approximately 10%, reserved for emphasis and interaction.
- Use dark ink for most text. Purple body copy should be rare.
- Never place small white text on pink. Use dark ink instead.

## 4. Typography

Use a rounded display face for headings and a highly readable sans serif for supporting text.

- **Display:** `Fredoka`, fallback `Arial Rounded MT Bold`, `Arial`, sans-serif.
- **Body/UI:** `Nunito Sans`, fallback `Segoe UI`, `Arial`, sans-serif.
- Hero heading: 64–84 px desktop, 44–56 px tablet, 38–46 px mobile; line-height 0.98–1.05.
- Page/section heading: 42–56 px desktop, 32–40 px mobile; line-height 1.05–1.12.
- Card title: 24–32 px; line-height 1.12–1.2.
- Body: 17–20 px; line-height 1.55–1.7.
- Metadata and tags: 12–14 px; line-height 1.3–1.45; medium or semibold weight.

Headlines may use tight tracking and selective purple or pink-backed phrases. Avoid all-caps headings. All caps are acceptable only for small eyebrow labels.

## 5. Layout and Spacing

- Maximum content width: 1200 px.
- Desktop page gutters: 48–64 px.
- Tablet gutters: 32 px.
- Mobile gutters: 20 px.
- Use an 8 px spacing base with common steps of 8, 12, 16, 24, 32, 48, 64, 96, and 128 px.
- Major sections should have 96–128 px vertical padding on desktop and 64–80 px on mobile.
- The project grid uses two columns on desktop and one column below approximately 800 px.
- Alternate project emphasis through imagery and color fields, not inconsistent card structures.

## 6. Navigation

The navigation is light, compact, and persistent at the top of the page.

- Left: Melissa's existing logo in a rounded home link.
- Right: `My Work` and `About Me`.
- Active destination uses purple type with a soft pink rounded background or a short purple underline.
- Desktop link hit area: at least 44 px high.
- Mobile navigation collapses to a rounded menu button and an easy-to-dismiss panel.
- The header may become a subtly elevated white pill when the page scrolls, but should not dominate the hero.

## 7. My Work Page

### Hero introduction

The opening viewport introduces Melissa before presenting projects.

- Use the exact introduction content from the supplied portfolio HTML, with light copyediting only where needed for readability.
- Lead with “Hi there, I'm Melissa Shi.”
- Emphasize Melissa's name and the phrase “AI-powered enterprise SaaS products” using purple and/or a soft pink highlight shape.
- Arrange the text and Melissa's existing 3D portrait in a balanced split composition on desktop.
- Place the portrait on an oversized soft pink organic or rounded field with small flat decorative shapes.
- Include rounded links for Resume, LinkedIn, and Medium.
- Add a clear downward cue or “Explore my work” link.

### Case-study introduction

Start the work section with a concise heading such as “Selected work” and one line explaining the focus on complex enterprise and AI-powered experiences.

### Case-study previews

Use the projects and descriptions in the supplied home-page HTML. Each preview is a single large clickable card containing:

- Project thumbnail
- Project title
- One-sentence description
- Date or date range
- Two to four concise category tags
- A clear “View case study” affordance

Cards use a white surface, 24–32 px radius, and a restrained border or soft purple-tinted shadow. Project images sit in a large rounded media frame, usually on a pink field. Tags use pill shapes. Correct obvious spelling issues in tags, such as “Design,” “Product Design,” and “Professional Work.”

Card hover/focus behavior:

- Raise by 4–6 px.
- Deepen the shadow slightly.
- Shift the image no more than 2% in scale.
- Animate the arrow or link by 4–6 px.
- Use a visible purple focus ring for keyboard users.

### Closing invitation

End with a full-width soft pink rounded panel inviting visitors to learn more or connect. Keep the copy brief and provide an About Me or contact-oriented action.

## 8. About Me Page

Although not part of the first testing page, its future design should remain consistent:

- Personal introduction and portrait-led hero
- Short professional story
- Design principles or strengths presented as rounded illustrated cards
- Experience timeline or selected credentials
- Personal interests to add warmth
- Resume and LinkedIn actions

The page should feel more personal than My Work while using the same navigation, color tokens, type system, spacing, and interaction patterns.

## 9. Shape and Illustration Language

- Primary radius: 24 px for cards and large containers.
- Large feature radius: 32–48 px.
- Button/pill radius: 999 px.
- Use flat circles, stars, sparkles, dots, soft blobs, and simple line doodles sparingly.
- Decorative shapes should frame content or guide attention, never cover essential text.
- Prefer CSS shapes and existing visual assets. Do not add generic stock photography.
- Avoid gradients unless extremely subtle; the core visual language is flat color.
- Avoid glassmorphism, heavy textures, exaggerated shadows, and faux-3D UI.

## 10. Buttons and Links

### Primary button

- Purple fill, white text, pill shape.
- Minimum height: 48 px.
- Horizontal padding: 22–28 px.
- Hover: darken to `#7832B5` and rise 2 px.

### Secondary button

- White or pink fill, dark text, 2 px purple or pale-purple border.
- Hover: soft pink fill and purple text.

### Text links

- Dark ink or purple with a visible underline or arrow.
- Never rely on color alone to indicate interactivity.

## 11. Motion

Motion should feel buoyant but controlled.

- Standard duration: 180–260 ms.
- Larger entrance motion: up to 450 ms.
- Use smooth ease-out curves.
- Favor small vertical lifts, gentle scale changes, and simple decorative rotations.
- Avoid constant looping animation near reading content.
- Respect `prefers-reduced-motion` by disabling nonessential transforms and transitions.

## 12. Responsive Behavior

- Preserve the visual hierarchy rather than shrinking the desktop layout uniformly.
- Stack the hero with copy before the portrait on mobile.
- Keep the primary introduction visible without requiring horizontal scrolling.
- Collapse the project grid to one column.
- Keep card media at a stable aspect ratio to prevent layout shifts.
- Allow tags to wrap naturally.
- Ensure navigation, buttons, and card links remain comfortable for touch.

## 13. Accessibility and Quality

- Target WCAG 2.2 AA contrast for text and controls.
- Use one semantic `h1`, followed by ordered `h2` and `h3` headings.
- Provide descriptive alt text for meaningful portfolio imagery and empty alt text for decoration.
- Ensure every interactive state works with keyboard, touch, and pointer input.
- Use visible focus indicators.
- Keep text embedded in images out of the critical content path.
- Maintain comfortable line lengths of approximately 55–75 characters for body copy.
- Avoid animation that causes unexpected layout movement.

## 14. Testing-Page Acceptance Criteria

The sample My Work page is successful when:

- It opens with Melissa's introduction and existing portrait.
- It contains the case-study previews from the supplied home-page HTML.
- Each project card is clearly clickable and preserves its destination.
- White, `#FEF1FF`, and `#A74EF7` visibly define the page hierarchy.
- The result feels playful, flat, rounded, cartoon-like, clean, and professional.
- The page works at desktop, tablet, and mobile widths.
- Keyboard focus, motion preferences, contrast, and touch targets are handled.
- Navigation visibly supports both My Work and About Me, even if About Me is a later page.

## 15. Content Integrity

- Use the supplied HTML as the source of truth for project names, summaries, dates, imagery, and outbound destinations.
- Preserve Melissa's professional positioning around AI-powered enterprise SaaS, complex workflows, research, and scalable product design.
- Apply minor grammar and tag-label corrections without inventing project claims or metrics.
- Do not add fabricated testimonials, employers, awards, or results.
