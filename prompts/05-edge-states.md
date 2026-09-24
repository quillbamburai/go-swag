# 05 — Edge states

Fill `components/states/empty-onboarding.tsx` and `components/states/lead-time-warning.tsx`.

Empty account (no products):

- Not a blank table
- Two actions: add first product line, import existing inventory manifest
- Create New Product in the header should land here until inventory exists

Lead-time warning:

- Inline in the re-order drawer when factory ready date is after a campaign `eventDate`
- Copy pattern: “Delivery estimated Oct 14 — 3 days after your scheduled Q4 Offsite.”
- Warning does not block Approve & Order
