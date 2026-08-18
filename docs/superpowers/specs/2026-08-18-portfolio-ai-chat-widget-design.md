# Portfolio AI Chat Widget Design

## Goal

Add Melissa's existing Vercel-hosted AI chat widget to every portfolio page with the same floating launcher and panel behavior already used on the Webflow site.

## Integration

Load the existing widget script once from the shared root layout:

```html
<script
  src="https://portfolio-ai-chat-melissa.vercel.app/widget.js?v=2"
  data-api-base="https://portfolio-ai-chat-melissa.vercel.app"
></script>
```

Use the framework's script component with an explicit stable ID and an after-interactive loading strategy. The root layout is the single owner, so client-side navigation does not add another widget instance.

## Experience

The Vercel widget owns the complete interaction:

- Its existing floating button opens and closes the chat panel.
- Its existing panel, controls, state, and responsive behavior remain unchanged.
- The widget appears on Home, About, component-library, and every case-study page.
- The portfolio does not create a second launcher, iframe, close button, or new-tab link.
- No footer markup changes are required. The script is loaded near the end of the shared document body, matching the effective placement of the Webflow embed.

## Data Flow

After the portfolio becomes interactive, the browser downloads `widget.js` from the Vercel deployment. The script reads `data-api-base`, injects its own launcher and panel, and communicates directly with the existing Vercel app. No API keys, chat data, or new environment variables are added to the portfolio.

## Failure Behavior

If the external script cannot load, the portfolio remains fully usable and simply shows no chat widget. No external fallback is presented, per the approved experience.

## Verification

- Add a rendered-page regression test confirming the root document includes the exact widget source, API base, stable script ID, and after-interactive marker.
- Confirm representative Home and case-study routes inherit the shared root integration.
- Run the full production build, lint, and rendered-page suite.
- In a browser, verify one launcher is present, it opens and closes the existing Vercel panel, and navigation does not create duplicates.
