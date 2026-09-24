# 00 — Bootstrap the Plus shell

Follow `V0.md`. Do not invent routes or a marketing landing page.

Build:

1. Next.js App Router app that already matches this repo tree.
2. Load Sora (headings) and Inter (body). Import `app/globals.css` (it pulls `styles/theme.css`).
3. Implement `components/layout/app-header.tsx`:
   - Title: Go Swag Plus
   - Hub switcher: Inventory & Restocks | Distribution & Dispatches
   - Buttons: + Create New Product, + New Campaign / Event (buttons may be inert this pass)
4. `app/page.tsx` holds hub state. Default to Inventory. Render `InventoryHub` or `DistributionHub`. If there is no inventory yet, show `EmptyOnboarding` instead of the inventory list.
5. Use `lib/mock-data.ts` / `lib/types.ts`. Do not replace spec example copy.
6. Colours and type only via CSS variables. If you need a semantic token, add it to `styles/theme.css` and use it.

Done when the header and hub switch render on a Rock & Alabaster canvas with Sora/Inter. Hubs may still be empty shells.
