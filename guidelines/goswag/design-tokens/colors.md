# Colours

Primitive scales live in `styles/theme.css`. Map UI roles to those variables; do not introduce a second palette.

| Role | Variable | Usage |
|---|---|---|
| Canvas | `--color-alabaster-main-50` | App background |
| Surface | `--color-rock-50` | Cards, drawers |
| Text | `--color-rock-main-800` | Primary copy |
| Muted text | `--color-alabaster-500` | Meta, table headers |
| Border | `--color-alabaster-200` | Dividers, card edges |
| Low stock / hold | `--color-fair-pink-600` | Alerts that need action |
| Depletion / warning | `--color-bees-wax-500` | Time risk, lead-time copy |
| In production / healthy | `--color-gin-600` | Positive operational status |
| Logistics / info | `--color-aqua-squeeze-600` | Shipments, tracking |
| Warm accent | `--color-linen-500` | Secondary highlights |

If a role is missing, add `--color-{role}` in `theme.css` pointing at an existing primitive.

```
What are you colouring?
├── Page background → --color-alabaster-main-50
├── Card / drawer → --color-rock-50
├── Primary text → --color-rock-main-800
├── Primary action (Stock Up, Approve) → --color-rock-main-800 on alabaster
├── Danger / missing stock → --color-fair-pink-600
├── Warning / lead time → --color-bees-wax-500
├── Success / in production → --color-gin-600
└── Unsure → --color-alabaster-500
```

DO: `color: var(--color-fair-pink-600)`  
DON'T: `text-red-600` or `#c45b5b`
