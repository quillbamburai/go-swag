# Go Swag Plus — Warehouse & Distribution Dashboard

A design challenge: an operations dashboard for a company that produces, warehouses
and ships branded merchandise on behalf of its clients. Two hubs — **Inventory**,
which tracks what is in the warehouse and what is running out, and **Distribution**,
which tracks what has been shipped and where it went.

**Live:** https://quillbamburai.github.io/go-swag/

---

## The problem

Swag operations fail quietly. Nobody notices a SKU is running low until a campaign
is already short, and by then the lead time on a replacement is longer than the
time left before the event. The interesting design problem is not displaying stock
levels — it is making the *consequence* of a stock level visible early enough to act on.

That shaped the whole dashboard. Every screen answers a question an operations
manager actually has:

- What is about to run out, and what does that break?
- Where is everything going, and is any of it stuck?
- If I re-order now, does it arrive in time?

---

## Decisions

### 1. The layout has no top bar

The obvious structure for a dashboard is a header strip with the logo, search and
account, then content below. I removed it.

The header was spending a full band of vertical space on things that never change —
a logo and an account avatar. On a dashboard, vertical space is the scarcest
resource: it is what decides how many table rows and chart months you can see at
once. The logo moved into the head of the left rail, the profile to its foot, and
search sits directly on the canvas alongside the hub switcher.

The result reads as one open surface rather than a series of bands, and the chart
gained roughly 90px of height — about two more months of data at a glance.

### 2. The main chart carries two dimensions at once

The Distribution chart plots **bars for departments** and **lines for pack types**.
These are genuinely different questions — *who is receiving* versus *what is being
sent* — and forcing them into one encoding would have meant either two charts
competing for the same space, or a filter that hides half the answer.

Bars share one accent colour at descending opacity, so the department series reads
as one group rather than six competing colours. The three pack-type lines are
distinguished by weight and dash, not hue: solid for the series being highlighted,
lighter and dotted for context.

The three curves are not invented. They were taken from vector paths in the Figma
source as cubic Bézier geometry, stored normalised, and sampled to produce the
monthly values. The shape is the source of truth, and the numbers derive from it —
so the chart in code is the same curve that was drawn in the design file.

### 3. Type is a fixed set of roles, not per-component choices

Seven jobs, mapped once to six design-system styles:

| Role | Used for |
|---|---|
| Panel title | FORECAST, WAREHOUSE — section headings |
| Column header | CAMPAIGN, PACKS CLAIMED — table columns |
| Hero figure | One large number per panel |
| Row value | The aligned right-hand column |
| Item name | Product and campaign names |
| Meta | Dates, variants, axis ticks |
| Control | Buttons, tabs, filters |

No component sets a font size, line height or tracking by hand. Adding a panel
means picking roles, not inventing styles — which is why fifteen different panels
across two hubs still read as one product. The large figures use tighter tracking
than the type ramp's default, applied through a token so every hero number matches.

### 4. Colour signals state, never decoration

The palette is deliberately close to greyscale. Colour is reserved for things that
carry meaning: teal for the data itself, amber for a claimed-but-unshipped state,
green and red for delivered and exception. A product card with no colour on it is
a product card with nothing wrong.

This makes the exceptions findable. On the Distribution table, the eye goes
straight to the two red dots in a column of green and blue, which is the entire
point of that table.

### 5. The re-order flow is a process, not a form

The most substantial piece of interaction design here. A low-stock SKU has a
**Stock up** action that opens a tray, and the tray is a four-step process rather
than one long form:

**Order** → **Address** → **Payment** → **Confirmation**

The decision to split it was deliberate. A single screen holding quantity, a sizing
matrix, a delivery address, payment details and a cost breakdown is a wall — the
user cannot tell what is required, what is optional, or how close they are to
finishing. Splitting it means each step asks one question, the progress bar shows
how much is left, and **Back** never loses what was entered.

Inside it:

- **Suggested quantity** derives from 30-day depletion velocity, so the default is
  already the right answer in most cases.
- **The UK sizing matrix** (S 15% / M 35% / L 35% / XL 15%) is fully editable, with
  each cell showing its unit count and the split totalling to 100% so an error is
  visible immediately.
- **Delivery** defaults to the Go Swag warehouse — where stock normally lands and
  is picked into packs from — with office addresses as alternatives and an
  add-new path.
- **Payment** gathers the card and an optional PO reference, then shows the full
  cost with shipping and VAT, a read-back of the delivery address, and the
  lead-time warning, so everything relevant is visible at the moment of commit.
- **Nothing is charged** until the final step. Every step before it is reversible.

On approval the card flips to **Production — 100 units · est. Oct 14**, and the
confirmation carries an order reference, the card used, and the amount charged.

### 6. The lead-time warning is the point of the whole thing

If the factory's ready date falls after a campaign the SKU is committed to, the
tray says so:

> Delivery estimated Oct 14 — 3 days after your scheduled Q4 Onboarding Batch.

It is **advisory, never blocking**. The client may have a reason to order anyway —
splitting the shipment, sourcing the shortfall elsewhere — and a dashboard that
refuses the order would be making an operational decision it is not qualified to
make. It surfaces the conflict and lets the person decide.

This is the feature that justifies the rest of the dashboard. Everything upstream —
depletion velocity, pack membership, campaign dates — exists so this one sentence
can be true.

### 7. Motion explains, it does not decorate

Entry animation on the Distribution charts: bars spring up from the baseline, lines
draw left to right, donuts sweep from twelve o'clock. Each is the shape of its own
data — a bar grows because that is how a quantity accumulates; a line travels left
to right because that is the direction of time on its axis.

The banner approval sequence is the same idea applied to a state change: the button
shows a spinner in place, the message swaps to a confirmation at a fixed height so
nothing jumps, and the banner wipes out left to right while the panels below close
the gap. The animation explains what happened to the thing that was there.

All of it respects `prefers-reduced-motion` — the end state is identical, only the
journey is skipped.

### 8. Hover states are light, matching the surface

The tooltip is a white card with a soft shadow, an optional delta pill in green or
red, and the value set in the display face at the same tight tracking as the
dashboard's large figures. An early dark tooltip was correct by convention and
wrong in context: a heavy dark block on a near-white dashboard reads as an error
state rather than a hover.

---

## Built with

Next.js App Router, TypeScript, and a design system expressed entirely as CSS
variables — colour ramps, type scale, spacing and semantic tokens. Components
reference tokens; no component hard-codes a hex value or a font size.

Designs were measured from Figma rather than approximated, including the Bézier
geometry of the chart curves and the spacing rhythm of the re-order tray. The
build deploys as a static export, since the dashboard is entirely client-side.

---

## What I would do next

**Make the data real.** Everything is mock data shaped to be plausible. The
depletion velocity, pack membership and campaign dates all interlock correctly, but
they are fixtures. The first real integration would test whether the lead-time
warning fires as usefully against live factory dates as it does against these.

**Finish the process set.** Only the Sky Blue Crewneck runs the re-order flow. The
pattern is built to generalise — every low-stock SKU should open the same tray —
and the production drawer and campaign creation flows are specified but not built.

**Resolve the narrow-width layout.** Below roughly 1280px the centred search group
overlaps the hub switcher. The dashboard is designed for desktop operations use and
holds up from 1400px upward, but the breakpoint below that needs the search to
collapse to an icon rather than hold its width.

**Decide the accent colour properly.** The gradient on the primary action was
sampled from a reference rather than drawn from the palette — no violet exists
anywhere else in the system. It either earns a place in the token set or gets
replaced with something that is already there.
