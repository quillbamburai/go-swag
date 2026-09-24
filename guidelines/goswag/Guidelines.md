# Go Swag Plus

Client control plane for warehouse stock and outbound swag. Dense, operational, calm. Rock & Alabaster canvas, Sora headings, Inter body.

## Design philosophy

1. Two hubs, never six tools. Inventory absorbs stock + production; Distribution absorbs claims + shipments.
2. AI proposes; the client commits. No silent spend, substitute, or send.
3. Status lives on the object. Cards update in place after Approve & Order.
4. Tokens come from `styles/theme.css`. Grow that file; do not hardcode colour.

## Tokens

- Source JSON: `tokens/tokens.json`
- CSS: `styles/theme.css`
- Colour roles: `guidelines/goswag/design-tokens/colors.md`
- Type: `guidelines/goswag/design-tokens/typography.md`

## Surfaces

| Build this | File | Prompt |
|---|---|---|
| Shell + header | `app/layout.tsx`, `components/layout/app-header.tsx` | `prompts/00-bootstrap.md` |
| Inventory hub | `components/inventory/*` | `prompts/01-inventory-hub.md` |
| Production drawer | `components/drawers/production-drawer.tsx` | `prompts/02-production-drawer.md` |
| Re-order drawer | `components/drawers/reorder-drawer.tsx` | `prompts/03-reorder-drawer.md` |
| Distribution hub | `components/distribution/*` | `prompts/04-distribution-hub.md` |
| Empty + lead-time | `components/states/*` | `prompts/05-edge-states.md` |

## Task routing

- Styling anything → `styles/theme.css` then colours/type guidelines
- New product UI → inventory hub + empty state
- Anything about factories → production drawer
- Low stock / Stock Up → re-order drawer
- Campaigns, claims, postage, holds → distribution hub

## Key rules

1. Never add a third top-level hub or a six-stage sitemap.
2. Never use raw hex or default Tailwind colour scales.
3. Never execute an order, substitute, or release a held pack without an explicit button.
