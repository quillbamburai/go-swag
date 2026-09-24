# Go Swag Plus Dashboard

Director-first pipeline: iPad → Cursor → v0 MCP → v0 canvas → repo refactor → Figma MCP.

Product spec is the PDF. Workflow spec is `brief/Director-First_Design_Engineering_Workflow.md`. CSS starts in `tokens/tokens.json` → `styles/theme.css`. Stubs are the file contract.

Start here: **`V0.md`**, then run prompts **00 → 05** in order. Drop sketches in `design-context/`.

```
V0.md                          rules for every v0 pass
brief/                         product PDF + director-first workflow
design-context/                iPad sketches, moodboards, screenshots
tokens/tokens.json             colour + type source
styles/theme.css               CSS variables (grow this)
guidelines/goswag/             brand routing for the model
prompts/                       paste-ready v0 passes
  00-bootstrap.md
  01-inventory-hub.md
  02-production-drawer.md
  03-reorder-drawer.md
  04-distribution-hub.md
  05-edge-states.md
app/                           Plus shell
lib/                           types + spec mock data
components/
  layout/                      global header
  inventory/                   warehouse hub
  distribution/                logistics hub
  drawers/                     re-order, production, pack hold
  states/                      empty + lead-time
```
