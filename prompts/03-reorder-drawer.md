# 03 — Low Stock → Re-Order drawer

Fill `components/drawers/reorder-drawer.tsx` and wire **Stock Up** on the hoodie card.

Required:

- Suggested qty from 30-day depletion velocity (mock is fine; show the number)
- UK sizing matrix S 15% / M 35% / L 35% / XL 15%, every cell editable
- Unit price, total cost, Est. Ready Oct 14
- **Approve & Order** is the only commit. No auto-charge.
- On approve: close drawer; hoodie card becomes In Production (100 units — Est. Oct 14)
- If the Q4 Offsite date is before Oct 14, show `LeadTimeWarning` inside the drawer: “Delivery estimated Oct 14 — 3 days after your scheduled Q4 Offsite.” Client can still approve.
