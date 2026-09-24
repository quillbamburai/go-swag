# 01 — Inventory & Restocks hub

Fill `components/inventory/inventory-hub.tsx` and `components/inventory/product-card.tsx`.

Each card must show, on one surface:

- Thumbnail placeholder, SKU name, variant
- Warehouse qty (e.g. 10 Available in Warehouse)
- AI depletion badge when `depletionDays` is set
- Pending restock line when inbound units exist
- **Stock Up** → later wired to `ReorderDrawer`
- **See Status** → later wired to `ProductionDrawer`

Low-stock cards are the loudest element. After a successful re-order, the same card must be able to show In Production (100 units — Est. Oct 14) without navigating away.

Do not add extra inventory sub-pages.
